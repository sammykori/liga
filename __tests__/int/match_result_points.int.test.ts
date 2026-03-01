import { describe, test, expect, beforeAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const SUPABASE_URL = process.env.SUPABASE_LOCAL_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

describe('Supabase Database Trigger: award_match_points_and_ratings', () => {
    let testGroupId: string;
    let teamAId: string;
    let teamBId: string;
    let profileAId: string;
    let profileBId: string;
    let membershipAId: string;
    let membershipBId: string;

    beforeAll(async () => {
        // 1. Profiles (IDs pre-seeded in auth.users via SQL)
        profileAId = '11111111-1111-1111-1111-111111111111';
        profileBId = '22222222-2222-2222-2222-222222222222';

        await supabase.from('profiles').upsert([
            { id: profileAId, username: 'player_a', full_name: 'Player A' },
            { id: profileBId, username: 'player_b', full_name: 'Player B' }
        ]);

        // 2. Create Group (Triggers handle_new_group -> membership for A)
        const uniqueCode = `T${Math.floor(Math.random() * 900000) + 100000}`;
        const { data: group, error: gError } = await supabase.from('groups').insert({
            name: 'Test Trigger Group',
            join_code: uniqueCode,
            creator_id: profileAId
        }).select().single();
        if (gError) throw gError;
        testGroupId = group.id;

        // 3. Create Membership for Player B
        await supabase.from('group_memberships').insert([
            { user_id: profileBId, group_id: testGroupId, role: 'user' }
        ]);

        // Fetch Membership IDs
        const { data: memberships } = await supabase.from('group_memberships').select('id, user_id').eq('group_id', testGroupId);
        membershipAId = memberships!.find(m => m.user_id === profileAId)!.id;
        membershipBId = memberships!.find(m => m.user_id === profileBId)!.id;

        // 4. Reset Stats
        await supabase.from('player_group_stats').update({ points: 0, rating: 10, matches_played: 0, matches_won: 0, matches_lost: 0, matches_drawn: 0 }).in('membership_id', [membershipAId, membershipBId]);

        // 5. Teams (Triggers create_default_teams_trigger)
        const { data: teams } = await supabase.from('group_teams').select('id, name').eq('group_id', testGroupId);
        teamAId = teams!.find(t => t.name === 'Team A')!.id;
        teamBId = teams!.find(t => t.name === 'Team B')!.id;
    });

    test('Trigger awards correct points and ratings for a 10-0 Match result', async () => {
        // 1. Create Match (Triggers create_match_responses)
        const { data: match, error: matchError } = await supabase.from('matches').insert({
            group_id: testGroupId,
            match_date: new Date().toISOString(),
            teamA_id: teamAId,
            teamB_id: teamBId,
            a_side: 5,
            creator_id: profileAId,
            status: 'pending',
            teamA_score: 0,
            teamB_score: 0
        }).select().single();
        if (matchError) throw matchError;

        // 2. Assign Teams in already-created Match Responses
        const { error: updateRErrorA } = await supabase.from('match_responses')
            .update({ team_id: teamAId, availability: true, status: 'accepted' })
            .match({ match_id: match.id, user_id: profileAId });
        if (updateRErrorA) throw updateRErrorA;

        const { error: updateRErrorB } = await supabase.from('match_responses')
            .update({ team_id: teamBId, availability: true, status: 'accepted' })
            .match({ match_id: match.id, user_id: profileBId });
        if (updateRErrorB) throw updateRErrorB;

        // 3. Update Match to ENDED with score 10-0
        const { error: updateError } = await supabase.from('matches')
            .update({ status: 'ended', teamA_score: 10, teamB_score: 0 })
            .eq('id', match.id);
        if (updateError) throw updateError;

        // 4. VERIFY RESULTS
        const { data: stats } = await supabase.from('player_group_stats')
            .select('*')
            .in('membership_id', [membershipAId, membershipBId]);
        
        const statA = stats!.find(s => s.membership_id === membershipAId)!;
        const statB = stats!.find(s => s.membership_id === membershipBId)!;

        // Player A (Winner): 2(play) + 3(win) + 2(CS) + 4(scored 10) = 11 pts
        // Player B (Loser): 2(play) + 0(loss) + 0(CS) - 2(penalty 10) = 0 pts
        expect(statA.points).toBe(11);
        expect(statB.points).toBe(0);

        // Margin 10 = +1.0 for A, -1.0 for B
        expect(Number(statA.rating)).toBe(11); // 10 + 1.0
        expect(Number(statB.rating)).toBe(9);  // 10 - 1.0
    });

    test('Trigger awards correct points and ratings for a 1-1 Draw', async () => {
        // 1. Create Match
        const { data: match, error: matchError } = await supabase.from('matches').insert({
            group_id: testGroupId,
            match_date: new Date().toISOString(),
            teamA_id: teamAId,
            teamB_id: teamBId,
            a_side: 5,
            creator_id: profileAId,
            status: 'pending',
            teamA_score: 0,
            teamB_score: 0
        }).select().single();
        if (matchError) throw matchError;

        // 2. Assign Teams
        await supabase.from('match_responses').update({ team_id: teamAId, availability: true, status: 'accepted' }).match({ match_id: match.id, user_id: profileAId });
        await supabase.from('match_responses').update({ team_id: teamBId, availability: true, status: 'accepted' }).match({ match_id: match.id, user_id: profileBId });

        // Get current stats
        const { data: beforeStats } = await supabase.from('player_group_stats').select('*').in('membership_id', [membershipAId, membershipBId]);
        const beforeA = beforeStats!.find(s => s.membership_id === membershipAId)!;
        const beforeB = beforeStats!.find(s => s.membership_id === membershipBId)!;

        // 3. Update Match to ENDED with score 1-1
        await supabase.from('matches').update({ status: 'ended', teamA_score: 1, teamB_score: 1 }).eq('id', match.id);

        // 4. VERIFY RESULTS
        // Player A: 2(play) + 1(draw) + 2(CS < 5) + 0(scored < 5) = 5 pts
        // Player B: 2(play) + 1(draw) + 2(CS < 5) + 0(scored < 5) = 5 pts
        
        const { data: afterStats } = await supabase.from('player_group_stats').select('*').in('membership_id', [membershipAId, membershipBId]);
        const afterA = afterStats!.find(s => s.membership_id === membershipAId)!;
        const afterB = afterStats!.find(s => s.membership_id === membershipBId)!;

        expect(Number(afterA.points) - Number(beforeA.points)).toBe(5);
        expect(Number(afterB.points) - Number(beforeB.points)).toBe(5);

        // Rating: Goal diff 0 = +0
        expect(Number(afterA.rating)).toBe(Number(beforeA.rating));
        expect(Number(afterB.rating)).toBe(Number(beforeB.rating));
    });
});
