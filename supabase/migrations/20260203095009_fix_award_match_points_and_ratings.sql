CREATE OR REPLACE FUNCTION public.award_match_points_and_ratings()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare
  team_a_score int;
  team_b_score int;
  team_a_id uuid;
  team_b_id uuid;
  r record;
  earned_points int;
  team_result text;
  conceded int;
  scored int;
  goal_diff int;
  new_rating numeric;
begin
  -- Get match scores and team IDs
  select m."teamA_score", m."teamB_score", m."teamA_id", m."teamB_id"
  into team_a_score, team_b_score, team_a_id, team_b_id
  from matches m
  where m.id = new.id;

  -- Loop through all responses for this match
  for r in
    select mr.*, gm.id as membership_id
    from match_responses mr
    join group_memberships gm 
      on gm.user_id = mr.user_id 
     and gm.group_id = (select group_id from matches where id = new.id)
    where mr.match_id = new.id 
      and mr.team_id is not null
  loop
    earned_points := 0;

    -- Base: played
    earned_points := earned_points + 2;

    -- Determine team result
    if team_a_score = team_b_score then
      team_result := 'draw';
    elsif (r.team_id = team_a_id and team_a_score > team_b_score) 
       or (r.team_id = team_b_id and team_b_score > team_a_score) then
      team_result := 'win';
    else
      team_result := 'loss';
    end if;

    -- Add points by result
    if team_result = 'win' then
      earned_points := earned_points + 3;
    elsif team_result = 'draw' then
      earned_points := earned_points + 1;
    end if;

    -- Scoring logic
    if r.team_id = team_a_id then
      scored := team_a_score;
      conceded := team_b_score;
    else
      scored := team_b_score;
      conceded := team_a_score;
    end if;

    -- Defensive & scoring bonuses
    if conceded < 5 then
      earned_points := earned_points + 2;
    end if;
      
    earned_points := earned_points - floor(coalesce(conceded, 0) / 5);

    earned_points := earned_points + floor(coalesce(scored, 0) / 5) * 2;

     -- RATING CALCULATION
    goal_diff := scored - conceded;

    -- Determine player rating
    select coalesce(rating, 10)
    into new_rating
    from player_group_stats
    where membership_id = r.membership_id;

    new_rating := new_rating + (goal_diff::numeric / 10);

    RAISE NOTICE 'Attempting update for membership_id %, earned_points %, new_rating %', r.membership_id, earned_points, new_rating;

    insert into debug_logs (msg)
    values (
    'Updating membership ' || r.membership_id ||
    ' points ' || earned_points ||
    ' rating ' || new_rating
    );


    -- Update player stats
    update player_group_stats
    set
      points = coalesce(player_group_stats.points, 0) + earned_points,
      rating = new_rating,
      matches_played = coalesce(matches_played, 0) + 1,
      matches_won = coalesce(matches_won, 0) + case when team_result = 'win' then 1 else 0 end,
      matches_drawn = coalesce(matches_drawn, 0) + case when team_result = 'draw' then 1 else 0 end,
      matches_lost = coalesce(matches_lost, 0) + case when team_result = 'loss' then 1 else 0 end
    where membership_id = r.membership_id;
  end loop;

  update matches
  set points_awarded = true
  where id = new.id;

  return new;
end;$function$
;

ALTER FUNCTION public.award_match_points_and_ratings()
OWNER TO postgres;