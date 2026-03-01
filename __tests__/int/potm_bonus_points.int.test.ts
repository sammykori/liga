import { describe, test, expect, beforeAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const SUPABASE_URL = process.env.SUPABASE_LOCAL_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

describe('Supabase Database Trigger: award_match_points (POTM bonus)', () => {
    const profileA = '11111111-1111-1111-1111-111111111111';
    const profileB = '22222222-2222-2222-2222-222222222222';
    const profileC = '33333333-3333-3333-3333-333333333333';
    const profileD = '44444444-4444-4444-4444-444444444444';

    let groupId: string;
    let teamAId: string;
    let teamBId: string;
    let membershipIds: Record<string, string>;

    beforeAll(async () => {
        // Seed auth users C & D on local (A & B already seeded from previous test)
        for (const u of [
            { id: profileC, email: 'c@test.com' },
            { id: profileD, email: 'd@test.com' },
        ]) {
            const { error } = await supabase.auth.admin.createUser({
                user_metadata: {},
                email: u.email,
                password: 'password123',
                email_confirm: true,
                // @ts-ignore — id is supported but not in all type versions
                id: u.id,
            });
            if (error && !error.message.includes('already been registered')) throw error;
        }

        const { error: pErr } = await supabase.from('profiles').upsert([
            { id: profileA, username: 'potm_player_a', full_name: 'Player A' },
            { id: profileB, username: 'potm_player_b', full_name: 'Player B' },
            { id: profileC, username: 'potm_player_c', full_name: 'Player C' },
            { id: profileD, username: 'potm_player_d', full_name: 'Player D' },
        ]);
        if (pErr) throw pErr;

        const code = `P${Math.floor(Math.random() * 900000) + 100000}`;
        const { data: group, error: gErr } = await supabase.from('groups').insert({
            name: 'POTM Test Group', join_code: code, creator_id: profileA,
        }).select().single();
        if (gErr) throw gErr;
        groupId = group.id;

        await supabase.from('group_memberships').insert([
            { user_id: profileB, group_id: groupId, role: 'user' },
            { user_id: profileC, group_id: groupId, role: 'user' },
            { user_id: profileD, group_id: groupId, role: 'user' },
        ]);

        const { data: memberships } = await supabase.from('group_memberships')
            .select('id, user_id').eq('group_id', groupId);
        membershipIds = {};
        for (const m of memberships!) membershipIds[m.user_id] = m.id;

        await supabase.from('player_group_stats')
            .update({ points: 0, rating: 10, matches_played: 0, matches_won: 0, matches_lost: 0, matches_drawn: 0 })
            .in('membership_id', Object.values(membershipIds));

        const { data: teams } = await supabase.from('group_teams')
            .select('id, name').eq('group_id', groupId);
        teamAId = teams!.find(t => t.name === 'Team A')!.id;
        teamBId = teams!.find(t => t.name === 'Team B')!.id;
    });

    /** Helper: creates a match and ends it (2-1). Returns match ID in 'ended' state. */
    async function createEndedMatch(): Promise<string> {
        const { data: match, error: mErr } = await supabase.from('matches').insert({
            group_id: groupId, match_date: new Date().toISOString(),
            teamA_id: teamAId, teamB_id: teamBId, a_side: 5,
            creator_id: profileA, status: 'pending', teamA_score: 0, teamB_score: 0,
        }).select().single();
        if (mErr) throw mErr;

        await supabase.from('match_responses').update({ team_id: teamAId, availability: true, status: 'accepted' }).match({ match_id: match.id, user_id: profileA });
        await supabase.from('match_responses').update({ team_id: teamAId, availability: true, status: 'accepted' }).match({ match_id: match.id, user_id: profileC });
        await supabase.from('match_responses').update({ team_id: teamBId, availability: true, status: 'accepted' }).match({ match_id: match.id, user_id: profileB });
        await supabase.from('match_responses').update({ team_id: teamBId, availability: true, status: 'accepted' }).match({ match_id: match.id, user_id: profileD });

        await supabase.from('matches').update({ status: 'ended', teamA_score: 2, teamB_score: 1 }).eq('id', match.id);

        return match.id;
    }

    /** Snapshot current points for all players */
    async function getPoints(): Promise<Record<string, number>> {
        const { data } = await supabase.from('player_group_stats')
            .select('membership_id, points').in('membership_id', Object.values(membershipIds));
        const pts: Record<string, number> = {};
        for (const s of data!) pts[s.membership_id!] = Number(s.points);
        return pts;
    }

    test('Awards 3/2/1 bonus points to POTM ranks 1st/2nd/3rd', async () => {
        const matchId = await createEndedMatch();

        // Insert votes: A=2 (1st), B=1 (2nd), C=1 (tied 2nd), D=0
        const { error: vErr } = await supabase.from('match_votes').insert([
            { match_id: matchId, voter_id: profileA, player_id: profileA },
            { match_id: matchId, voter_id: profileB, player_id: profileA },
            { match_id: matchId, voter_id: profileC, player_id: profileB },
            { match_id: matchId, voter_id: profileD, player_id: profileC },
        ]);
        if (vErr) throw vErr;

        // Snapshot AFTER ended (match-result points already applied), BEFORE completed
        const pointsBefore = await getPoints();

        // Transition ended -> completed (triggers POTM bonus)
        const { error } = await supabase.from('matches').update({ status: 'completed' }).eq('id', matchId);
        if (error) throw error;

        const pointsAfter = await getPoints();

        const delta = (pid: string) => pointsAfter[membershipIds[pid]] - pointsBefore[membershipIds[pid]];

        expect(delta(profileA)).toBe(3); // rank 1 -> +3
        expect(delta(profileB)).toBe(2); // rank 2 -> +2
        expect(delta(profileC)).toBe(2); // rank 2 tied (DENSE_RANK) -> +2
        expect(delta(profileD)).toBe(0); // no votes -> no bonus
    });

    test('Tied 1st place both receive 3 bonus points', async () => {
        const matchId = await createEndedMatch();

        // Insert votes: A=2 (tied 1st), B=2 (tied 1st), C=0, D=0
        const { error: vErr } = await supabase.from('match_votes').insert([
            { match_id: matchId, voter_id: profileA, player_id: profileB },
            { match_id: matchId, voter_id: profileB, player_id: profileA },
            { match_id: matchId, voter_id: profileC, player_id: profileA },
            { match_id: matchId, voter_id: profileD, player_id: profileB },
        ]);
        if (vErr) throw vErr;

        const pointsBefore = await getPoints();

        await supabase.from('matches').update({ status: 'completed' }).eq('id', matchId);

        const pointsAfter = await getPoints();

        const delta = (pid: string) => pointsAfter[membershipIds[pid]] - pointsBefore[membershipIds[pid]];

        expect(delta(profileA)).toBe(3); // tied rank 1 -> +3
        expect(delta(profileB)).toBe(3); // tied rank 1 -> +3
        expect(delta(profileC)).toBe(0); // 0 votes -> no bonus
        expect(delta(profileD)).toBe(0); // 0 votes -> no bonus
    });
});
