create extension if not exists "pg_cron" with schema "pg_catalog";

create type "public"."foot" as enum ('left', 'right', 'both');

create type "public"."match_response_status" as enum ('pending', 'join', 'decline');

create type "public"."match_status" as enum ('pending', 'confirmed', 'ended', 'cancelled', 'completed');

create type "public"."measurement_type" as enum ('si', 'us');

create type "public"."notification_type" as enum ('match', 'group', 'user', 'general');

create type "public"."player_position" as enum ('goalkeeper', 'defender', 'midfielder', 'forward');

create type "public"."sex" as enum ('male', 'female');

create type "public"."user_role" as enum ('admin', 'user', 'owner');


  create table "public"."goals" (
    "id" uuid not null default gen_random_uuid(),
    "match_id" uuid not null,
    "scorer_id" uuid not null,
    "assist_id" uuid,
    "minute" integer,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."goals" enable row level security;


  create table "public"."group_join_requests" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "user_id" uuid not null,
    "status" text not null default 'pending'::text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."group_join_requests" enable row level security;


  create table "public"."group_memberships" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "group_id" uuid not null,
    "joined_at" timestamp with time zone not null default now(),
    "role" public.user_role not null default 'user'::public.user_role,
    "removed" boolean not null default false,
    "removed_at" timestamp with time zone
      );


alter table "public"."group_memberships" enable row level security;


  create table "public"."group_teams" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "name" text not null,
    "color" text not null default '#000000'::text,
    "created_at" timestamp with time zone default now(),
    "is_active" boolean default true,
    "deleted_at" timestamp with time zone
      );


alter table "public"."group_teams" enable row level security;


  create table "public"."groups" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "join_code" text not null,
    "creator_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "picture_url" text,
    "country" text,
    "badge" text,
    "foreground_color" text,
    "background_color" text
      );


alter table "public"."groups" enable row level security;


  create table "public"."match_participants" (
    "id" uuid not null default gen_random_uuid(),
    "match_id" uuid not null,
    "user_id" uuid not null,
    "is_playing" boolean not null default true,
    "position" public.player_position,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."match_participants" enable row level security;


  create table "public"."match_responses" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "match_id" uuid,
    "user_id" uuid,
    "status" text default 'pending'::text,
    "payment_made" boolean default false,
    "availability" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "team_id" uuid,
    "voted" boolean not null default false,
    "disabled" boolean not null default false
      );


alter table "public"."match_responses" enable row level security;


  create table "public"."match_votes" (
    "id" uuid not null default gen_random_uuid(),
    "match_id" uuid not null,
    "voter_id" uuid not null,
    "player_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."match_votes" enable row level security;


  create table "public"."matches" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "creator_id" uuid not null,
    "title" text,
    "description" text,
    "match_date" timestamp with time zone not null,
    "venue" text,
    "potm_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "status" public.match_status not null default 'pending'::public.match_status,
    "match_time" time without time zone,
    "teamA_id" uuid not null,
    "teamB_id" uuid not null,
    "teamA_score" smallint not null default '0'::smallint,
    "teamB_score" smallint not null default '0'::smallint,
    "a_side" smallint,
    "points_awarded" boolean default false,
    "ended_at" timestamp with time zone
      );


alter table "public"."matches" enable row level security;


  create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "type" public.notification_type,
    "title" text,
    "message" text,
    "read" boolean not null default false,
    "link" text,
    "user_id" uuid,
    "group_id" uuid
      );


alter table "public"."notifications" enable row level security;


  create table "public"."player_group_stats" (
    "id" uuid not null default gen_random_uuid(),
    "membership_id" uuid,
    "goals" integer default 0,
    "assists" integer default 0,
    "matches_played" integer default 0,
    "matches_won" integer default 0,
    "matches_lost" integer default 0,
    "rating" numeric(7,2),
    "points" numeric(7,2),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "matches_drawn" smallint not null default '0'::smallint
      );


alter table "public"."player_group_stats" enable row level security;


  create table "public"."player_team_memberships" (
    "id" uuid not null default gen_random_uuid(),
    "team_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."player_team_memberships" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "username" text,
    "role" public.user_role not null default 'user'::public.user_role,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "position" text,
    "full_name" text,
    "other_name" text,
    "country" text,
    "county_state_city" text,
    "bio" text,
    "rating" smallint not null default '0'::smallint,
    "points" smallint not null default '0'::smallint,
    "matches_played" smallint not null default '0'::smallint,
    "goals" smallint not null default '0'::smallint,
    "matches_won" smallint not null default '0'::smallint,
    "assist" smallint default '0'::smallint,
    "potm" smallint not null default '0'::smallint,
    "dob" date,
    "height" smallint,
    "weight" smallint,
    "sex" public.sex,
    "foot" public.foot,
    "profile_url" text,
    "measurement_system" public.measurement_type not null default 'si'::public.measurement_type
      );


alter table "public"."profiles" enable row level security;


  create table "public"."push_subscriptions" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "user_id" uuid not null,
    "endpoint" text not null,
    "p256dh" text not null,
    "auth" text not null,
    "created_at" timestamp with time zone default now()
      );


CREATE UNIQUE INDEX goals_pkey ON public.goals USING btree (id);

CREATE UNIQUE INDEX group_join_requests_pkey ON public.group_join_requests USING btree (id);

CREATE UNIQUE INDEX group_memberships_pkey ON public.group_memberships USING btree (id);

CREATE UNIQUE INDEX group_memberships_user_id_group_id_key ON public.group_memberships USING btree (user_id, group_id);

CREATE UNIQUE INDEX group_teams_pkey ON public.group_teams USING btree (id);

CREATE UNIQUE INDEX groups_code_key ON public.groups USING btree (join_code);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE INDEX idx_goals_match_id ON public.goals USING btree (match_id);

CREATE INDEX idx_goals_scorer_id ON public.goals USING btree (scorer_id);

CREATE INDEX idx_group_memberships_group_id ON public.group_memberships USING btree (group_id);

CREATE INDEX idx_group_memberships_user_id ON public.group_memberships USING btree (user_id);

CREATE INDEX idx_groups_code ON public.groups USING btree (join_code);

CREATE INDEX idx_match_participants_match_id ON public.match_participants USING btree (match_id);

CREATE INDEX idx_match_participants_user_id ON public.match_participants USING btree (user_id);

CREATE INDEX idx_match_votes_match_id ON public.match_votes USING btree (match_id);

CREATE INDEX idx_matches_group_id ON public.matches USING btree (group_id);

CREATE UNIQUE INDEX match_participants_match_id_user_id_key ON public.match_participants USING btree (match_id, user_id);

CREATE UNIQUE INDEX match_participants_pkey ON public.match_participants USING btree (id);

CREATE UNIQUE INDEX match_responses_match_id_user_id_key ON public.match_responses USING btree (match_id, user_id);

CREATE UNIQUE INDEX match_responses_pkey ON public.match_responses USING btree (id);

CREATE UNIQUE INDEX match_votes_match_id_voter_id_key ON public.match_votes USING btree (match_id, voter_id);

CREATE UNIQUE INDEX match_votes_pkey ON public.match_votes USING btree (id);

CREATE UNIQUE INDEX matches_pkey ON public.matches USING btree (id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE UNIQUE INDEX player_group_stats_membership_id_unique ON public.player_group_stats USING btree (membership_id);

CREATE UNIQUE INDEX player_group_stats_pkey ON public.player_group_stats USING btree (id);

CREATE UNIQUE INDEX player_team_memberships_pkey ON public.player_team_memberships USING btree (id);

CREATE UNIQUE INDEX player_team_memberships_team_id_user_id_key ON public.player_team_memberships USING btree (team_id, user_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX push_subscriptions_endpoint_key ON public.push_subscriptions USING btree (endpoint);

CREATE UNIQUE INDEX push_subscriptions_pkey ON public.push_subscriptions USING btree (id);

CREATE UNIQUE INDEX unique_join_request ON public.group_join_requests USING btree (user_id, group_id);

CREATE UNIQUE INDEX unique_user_group ON public.group_memberships USING btree (user_id, group_id);

alter table "public"."goals" add constraint "goals_pkey" PRIMARY KEY using index "goals_pkey";

alter table "public"."group_join_requests" add constraint "group_join_requests_pkey" PRIMARY KEY using index "group_join_requests_pkey";

alter table "public"."group_memberships" add constraint "group_memberships_pkey" PRIMARY KEY using index "group_memberships_pkey";

alter table "public"."group_teams" add constraint "group_teams_pkey" PRIMARY KEY using index "group_teams_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."match_participants" add constraint "match_participants_pkey" PRIMARY KEY using index "match_participants_pkey";

alter table "public"."match_responses" add constraint "match_responses_pkey" PRIMARY KEY using index "match_responses_pkey";

alter table "public"."match_votes" add constraint "match_votes_pkey" PRIMARY KEY using index "match_votes_pkey";

alter table "public"."matches" add constraint "matches_pkey" PRIMARY KEY using index "matches_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."player_group_stats" add constraint "player_group_stats_pkey" PRIMARY KEY using index "player_group_stats_pkey";

alter table "public"."player_team_memberships" add constraint "player_team_memberships_pkey" PRIMARY KEY using index "player_team_memberships_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."push_subscriptions" add constraint "push_subscriptions_pkey" PRIMARY KEY using index "push_subscriptions_pkey";

alter table "public"."goals" add constraint "goals_assist_id_fkey" FOREIGN KEY (assist_id) REFERENCES auth.users(id) not valid;

alter table "public"."goals" validate constraint "goals_assist_id_fkey";

alter table "public"."goals" add constraint "goals_assist_id_fkey1" FOREIGN KEY (assist_id) REFERENCES public.profiles(id) not valid;

alter table "public"."goals" validate constraint "goals_assist_id_fkey1";

alter table "public"."goals" add constraint "goals_match_id_fkey" FOREIGN KEY (match_id) REFERENCES public.matches(id) ON DELETE CASCADE not valid;

alter table "public"."goals" validate constraint "goals_match_id_fkey";

alter table "public"."goals" add constraint "goals_minute_check" CHECK (((minute >= 0) AND (minute <= 120))) not valid;

alter table "public"."goals" validate constraint "goals_minute_check";

alter table "public"."goals" add constraint "goals_scorer_id_fkey" FOREIGN KEY (scorer_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."goals" validate constraint "goals_scorer_id_fkey";

alter table "public"."goals" add constraint "goals_scorer_id_fkey1" FOREIGN KEY (scorer_id) REFERENCES public.profiles(id) not valid;

alter table "public"."goals" validate constraint "goals_scorer_id_fkey1";

alter table "public"."group_join_requests" add constraint "fk_user" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."group_join_requests" validate constraint "fk_user";

alter table "public"."group_join_requests" add constraint "group_join_requests_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_join_requests" validate constraint "group_join_requests_group_id_fkey";

alter table "public"."group_join_requests" add constraint "group_join_requests_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text]))) not valid;

alter table "public"."group_join_requests" validate constraint "group_join_requests_status_check";

alter table "public"."group_join_requests" add constraint "group_join_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."group_join_requests" validate constraint "group_join_requests_user_id_fkey";

alter table "public"."group_join_requests" add constraint "unique_join_request" UNIQUE using index "unique_join_request";

alter table "public"."group_memberships" add constraint "fk_user" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."group_memberships" validate constraint "fk_user";

alter table "public"."group_memberships" add constraint "group_memberships_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_memberships" validate constraint "group_memberships_group_id_fkey";

alter table "public"."group_memberships" add constraint "group_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."group_memberships" validate constraint "group_memberships_user_id_fkey";

alter table "public"."group_memberships" add constraint "group_memberships_user_id_group_id_key" UNIQUE using index "group_memberships_user_id_group_id_key";

alter table "public"."group_memberships" add constraint "unique_user_group" UNIQUE using index "unique_user_group";

alter table "public"."group_teams" add constraint "group_teams_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_teams" validate constraint "group_teams_group_id_fkey";

alter table "public"."groups" add constraint "groups_code_key" UNIQUE using index "groups_code_key";

alter table "public"."groups" add constraint "groups_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."groups" validate constraint "groups_creator_id_fkey";

alter table "public"."match_participants" add constraint "match_participants_match_id_fkey" FOREIGN KEY (match_id) REFERENCES public.matches(id) ON DELETE CASCADE not valid;

alter table "public"."match_participants" validate constraint "match_participants_match_id_fkey";

alter table "public"."match_participants" add constraint "match_participants_match_id_user_id_key" UNIQUE using index "match_participants_match_id_user_id_key";

alter table "public"."match_participants" add constraint "match_participants_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."match_participants" validate constraint "match_participants_user_id_fkey";

alter table "public"."match_responses" add constraint "match_responses_match_id_fkey" FOREIGN KEY (match_id) REFERENCES public.matches(id) ON DELETE CASCADE not valid;

alter table "public"."match_responses" validate constraint "match_responses_match_id_fkey";

alter table "public"."match_responses" add constraint "match_responses_match_id_user_id_key" UNIQUE using index "match_responses_match_id_user_id_key";

alter table "public"."match_responses" add constraint "match_responses_status_check" CHECK ((status = ANY (ARRAY['accepted'::text, 'declined'::text, 'pending'::text]))) not valid;

alter table "public"."match_responses" validate constraint "match_responses_status_check";

alter table "public"."match_responses" add constraint "match_responses_team_id_fkey" FOREIGN KEY (team_id) REFERENCES public.group_teams(id) not valid;

alter table "public"."match_responses" validate constraint "match_responses_team_id_fkey";

alter table "public"."match_responses" add constraint "match_responses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."match_responses" validate constraint "match_responses_user_id_fkey";

alter table "public"."match_votes" add constraint "match_votes_match_id_fkey" FOREIGN KEY (match_id) REFERENCES public.matches(id) ON DELETE CASCADE not valid;

alter table "public"."match_votes" validate constraint "match_votes_match_id_fkey";

alter table "public"."match_votes" add constraint "match_votes_match_id_voter_id_key" UNIQUE using index "match_votes_match_id_voter_id_key";

alter table "public"."match_votes" add constraint "match_votes_player_id_fkey" FOREIGN KEY (player_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."match_votes" validate constraint "match_votes_player_id_fkey";

alter table "public"."match_votes" add constraint "match_votes_voter_id_fkey" FOREIGN KEY (voter_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."match_votes" validate constraint "match_votes_voter_id_fkey";

alter table "public"."matches" add constraint "matches_a_side_check" CHECK ((a_side > 0)) not valid;

alter table "public"."matches" validate constraint "matches_a_side_check";

alter table "public"."matches" add constraint "matches_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."matches" validate constraint "matches_creator_id_fkey";

alter table "public"."matches" add constraint "matches_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE not valid;

alter table "public"."matches" validate constraint "matches_group_id_fkey";

alter table "public"."matches" add constraint "matches_potm_id_fkey" FOREIGN KEY (potm_id) REFERENCES auth.users(id) not valid;

alter table "public"."matches" validate constraint "matches_potm_id_fkey";

alter table "public"."matches" add constraint "matches_teamA_id_fkey" FOREIGN KEY ("teamA_id") REFERENCES public.group_teams(id) not valid;

alter table "public"."matches" validate constraint "matches_teamA_id_fkey";

alter table "public"."matches" add constraint "matches_teamA_score_check" CHECK (("teamA_score" >= 0)) not valid;

alter table "public"."matches" validate constraint "matches_teamA_score_check";

alter table "public"."matches" add constraint "matches_teamB_id_fkey" FOREIGN KEY ("teamB_id") REFERENCES public.group_teams(id) not valid;

alter table "public"."matches" validate constraint "matches_teamB_id_fkey";

alter table "public"."matches" add constraint "matches_teamB_score_check" CHECK (("teamB_score" >= 0)) not valid;

alter table "public"."matches" validate constraint "matches_teamB_score_check";

alter table "public"."notifications" add constraint "notifications_group_id_fkey" FOREIGN KEY (group_id) REFERENCES public.groups(id) not valid;

alter table "public"."notifications" validate constraint "notifications_group_id_fkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."player_group_stats" add constraint "player_group_stats_membership_id_fkey" FOREIGN KEY (membership_id) REFERENCES public.group_memberships(id) ON DELETE CASCADE not valid;

alter table "public"."player_group_stats" validate constraint "player_group_stats_membership_id_fkey";

alter table "public"."player_group_stats" add constraint "player_group_stats_membership_id_unique" UNIQUE using index "player_group_stats_membership_id_unique";

alter table "public"."player_team_memberships" add constraint "player_team_memberships_team_id_fkey" FOREIGN KEY (team_id) REFERENCES public.group_teams(id) ON DELETE CASCADE not valid;

alter table "public"."player_team_memberships" validate constraint "player_team_memberships_team_id_fkey";

alter table "public"."player_team_memberships" add constraint "player_team_memberships_team_id_user_id_key" UNIQUE using index "player_team_memberships_team_id_user_id_key";

alter table "public"."player_team_memberships" add constraint "player_team_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."player_team_memberships" validate constraint "player_team_memberships_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_position_check" CHECK ((length("position") <= 50)) not valid;

alter table "public"."profiles" validate constraint "profiles_position_check";

alter table "public"."push_subscriptions" add constraint "push_subscriptions_endpoint_key" UNIQUE using index "push_subscriptions_endpoint_key";

alter table "public"."push_subscriptions" add constraint "push_subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."push_subscriptions" validate constraint "push_subscriptions_user_id_fkey";

alter table "public"."push_subscriptions" add constraint "push_subscriptions_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."push_subscriptions" validate constraint "push_subscriptions_user_id_fkey1";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.award_match_points()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    r RECORD;
    pts INT;
    member_id UUID;
BEGIN
    -- Only run when status becomes 'completed'
    IF NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed' THEN

        -- loop over top 3 players
        FOR r IN
            WITH vote_counts AS (
                SELECT
                    player_id,
                    COUNT(*) AS votes
                FROM match_votes
                WHERE match_id = NEW.id
                GROUP BY player_id
            ),
            ranked AS (
                SELECT
                    player_id,
                    votes,
                    DENSE_RANK() OVER (ORDER BY votes DESC) AS rank
                FROM vote_counts
            )
            SELECT * FROM ranked WHERE rank <= 3
        LOOP
            -- convert rank → points
            CASE r.rank
                WHEN 1 THEN pts := 3;
                WHEN 2 THEN pts := 2;
                WHEN 3 THEN pts := 1;
                ELSE pts := 0;
            END CASE;

            -- find the player's membership_id for this group
            SELECT id INTO member_id
            FROM group_memberships
            WHERE group_id = NEW.group_id
              AND user_id = r.player_id
            LIMIT 1;

            -- safety check
            IF member_id IS NULL THEN
                RAISE WARNING 'No membership found for player % in group %', r.player_id, NEW.group_id;
                CONTINUE;
            END IF;

            -- insert or update stats
            update player_group_stats
            set
            points = coalesce(player_group_stats.points, 0) + pts
            where player_group_stats.membership_id = member_id;
         
        END LOOP;

    END IF;

    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.award_match_points_and_ratings()
 RETURNS trigger
 LANGUAGE plpgsql
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
    else
      earned_points := earned_points - floor(conceded / 5);
    end if;

    earned_points := earned_points + floor(scored / 5) * 2;

     -- RATING CALCULATION
    goal_diff := scored - conceded;

    -- Determine player rating
    if (select rating from player_group_stats where membership_id = r.membership_id) is null then
      new_rating := 10 + (goal_diff::numeric / 10);
    else
      new_rating := (select rating from player_group_stats where membership_id = r.membership_id)
                    + (goal_diff::numeric / 10);
    end if;

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

CREATE OR REPLACE FUNCTION public.can_access_group(p_user_id uuid, p_group_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM group_memberships
    WHERE group_id = p_group_id
      AND user_id = p_user_id
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.complete_ended_matches()
 RETURNS void
 LANGUAGE sql
AS $function$
  update matches
  set status = 'completed'
  where status = 'ended'
    and ended_at <= now() - interval '2 hours';
$function$
;

CREATE OR REPLACE FUNCTION public.create_default_teams()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.group_teams (group_id, name, color)
  values
    (new.id, 'Team A', '#FF3B30'),
    (new.id, 'Team B', '#34C759');
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_player_stats_on_join()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO player_group_stats (membership_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.generate_group_code()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$DECLARE
  code TEXT;
  exists_code BOOLEAN;
BEGIN
  LOOP
    code := LPAD(floor(random() * 900000 + 100000)::TEXT, 6, '0');
    SELECT EXISTS(SELECT 1 FROM public.groups WHERE groups.join_code = code) INTO exists_code;
    IF NOT exists_code THEN
      EXIT;
    END IF;
  END LOOP;
  RETURN code;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_top_potm(match uuid)
 RETURNS TABLE(player_id uuid, username text, full_name text, votes integer)
 LANGUAGE plpgsql
 STABLE
AS $function$
begin
  return query
    select 
      mv.player_id, 
      p.username, 
      p.full_name, 
      count(*)::int as votes
    from match_votes mv
    join profiles p on p.id = mv.player_id
    where mv.match_id = match
    group by mv.player_id, p.username, p.full_name
    order by votes desc
    limit 3;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_top_voted_players(matchid uuid)
 RETURNS TABLE(voted_player_id uuid, full_name text, player_position text, profile_url text, votes bigint, rank bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    WITH vote_counts AS (
        SELECT 
            mv.player_id,
            p.full_name,
            p.position,
            p.profile_url,
            COUNT(*) AS votes_count
        FROM match_votes mv
        JOIN profiles p ON p.id = mv.player_id
        WHERE mv.match_id = matchId
        GROUP BY mv.player_id, p.full_name, p.position, p.profile_url
    ),
    ranked AS (
        SELECT 
            vc.player_id,
            vc.full_name,
            vc.position,
            vc.profile_url,
            vc.votes_count,
            DENSE_RANK() OVER (ORDER BY votes DESC) AS rank
        FROM vote_counts vc
    )
    SELECT 
        r.player_id,  -- ⬅️ Qualified the column with the alias 'r'
        r.full_name,        -- ⬅️ Qualified the column with the alias 'r'
        r.position,  -- ⬅️ Qualified the column with the alias 'r'
        r.profile_url,      -- ⬅️ Qualified the column with the alias 'r'
        r.votes_count,             -- ⬅️ Qualified the column with the alias 'r'
        r.rank
    FROM ranked r           -- ⬅️ Added the alias 'r' to the CTE
    WHERE r.rank <= 3
    ORDER BY r.rank, r.votes_count DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_accumulated_group_stats(user_id uuid)
 RETURNS TABLE(total_matches_played integer, total_matches_won integer, total_matches_lost integer, total_goals integer, avg_rating double precision, avg_points double precision)
 LANGUAGE sql
AS $function$
    SELECT 
        COALESCE(SUM(pgs.matches_played),0) AS total_matches_played,
    COALESCE(SUM(pgs.matches_won),0)    AS total_matches_won,
    COALESCE(SUM(pgs.matches_lost),0)   AS total_matches_lost,
        COALESCE(SUM(pgs.goals),0)   AS total_goals,
    COALESCE(AVG(pgs.rating),0)         AS avg_rating,
    COALESCE(AVG(pgs.points),0)         AS avg_points
    FROM player_group_stats pgs
    JOIN group_memberships gm
        ON gm.id = pgs.membership_id
    WHERE gm.user_id = user_id;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_match_cancelled()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only run when match.status has been updated to 'cancelled'
  IF NEW.status = 'cancelled' AND OLD.status IS DISTINCT FROM NEW.status THEN
    
    UPDATE match_responses
    SET disabled = TRUE
    WHERE match_id = NEW.id;

  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_group()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO group_memberships (group_id, user_id, role)
  VALUES (NEW.id, NEW.creator_id, 'owner');
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$BEGIN
  INSERT INTO public.profiles (id, username, dob, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'givenName', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'dob')::date, CURRENT_DATE),
    'user'
  );
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.increment_team_score(match_id uuid, team_id uuid, increment_value integer DEFAULT 1)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  update matches
  set "teamA_score" = "teamA_score" + increment_value
  where id = match_id and "teamA_id" = team_id;

  update matches
  set "teamB_score" = "teamB_score" + increment_value
  where id = match_id and "teamB_id" = team_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_match_responses()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  -- Insert a "pending" match response for every member of the group
  INSERT INTO match_responses (match_id, user_id, status, created_at)
  SELECT 
    NEW.id AS match_id,
    gm.user_id,
    'pending' AS status,
    NOW() AS created_at
  FROM group_memberships gm
  WHERE gm.group_id = NEW.group_id
  -- prevent duplicates if a response already exists for that user & match
  AND NOT EXISTS (
    SELECT 1
    FROM match_responses mr
    WHERE mr.match_id = NEW.id
      AND mr.user_id = gm.user_id
  );

  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.is_user_in_group(u uuid, g uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 
    from group_memberships
    where user_id = u and group_id = g
  );
$function$
;

CREATE OR REPLACE FUNCTION public.notify_group_members()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare
  member record;
begin
  for member in
    select user_id
    from group_memberships
    where group_id = new.group_id
  loop
    insert into notifications (user_id, group_id, type, title, message, link)
    values (
      member.user_id,
      new.group_id,
      'match',
      'New Match Created',
      'A new match has been created in your group!',
      concat('/match/', new.id)
    );
  end loop;

  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.notify_group_members_on_match_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare
  member record;
begin
  -- Only notify if score or status changed
  if (old.match_date <> new.match_date
      or old.match_time <> new.match_time
      or old.venue <> new.venue) then

    for member in
      select user_id
      from group_memberships
      where group_id = new.group_id
    loop
      insert into notifications (user_id, group_id, type, title, message, link)
      values (
        member.user_id,
        new.group_id,
        'match',
        'Match Updated',
        'The match in your group has been updated!',
        concat('https://liga-app.com/match/', new.id)
      );
    end loop;

  end if;

  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.set_group_code()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$BEGIN
  IF NEW.join_code IS NULL OR NEW.join_code = '000000' THEN
    NEW.join_code := public.generate_group_code();
  END IF;
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."goals" to "anon";

grant insert on table "public"."goals" to "anon";

grant references on table "public"."goals" to "anon";

grant select on table "public"."goals" to "anon";

grant trigger on table "public"."goals" to "anon";

grant truncate on table "public"."goals" to "anon";

grant update on table "public"."goals" to "anon";

grant delete on table "public"."goals" to "authenticated";

grant insert on table "public"."goals" to "authenticated";

grant references on table "public"."goals" to "authenticated";

grant select on table "public"."goals" to "authenticated";

grant trigger on table "public"."goals" to "authenticated";

grant truncate on table "public"."goals" to "authenticated";

grant update on table "public"."goals" to "authenticated";

grant delete on table "public"."goals" to "service_role";

grant insert on table "public"."goals" to "service_role";

grant references on table "public"."goals" to "service_role";

grant select on table "public"."goals" to "service_role";

grant trigger on table "public"."goals" to "service_role";

grant truncate on table "public"."goals" to "service_role";

grant update on table "public"."goals" to "service_role";

grant delete on table "public"."group_join_requests" to "anon";

grant insert on table "public"."group_join_requests" to "anon";

grant references on table "public"."group_join_requests" to "anon";

grant select on table "public"."group_join_requests" to "anon";

grant trigger on table "public"."group_join_requests" to "anon";

grant truncate on table "public"."group_join_requests" to "anon";

grant update on table "public"."group_join_requests" to "anon";

grant delete on table "public"."group_join_requests" to "authenticated";

grant insert on table "public"."group_join_requests" to "authenticated";

grant references on table "public"."group_join_requests" to "authenticated";

grant select on table "public"."group_join_requests" to "authenticated";

grant trigger on table "public"."group_join_requests" to "authenticated";

grant truncate on table "public"."group_join_requests" to "authenticated";

grant update on table "public"."group_join_requests" to "authenticated";

grant delete on table "public"."group_join_requests" to "service_role";

grant insert on table "public"."group_join_requests" to "service_role";

grant references on table "public"."group_join_requests" to "service_role";

grant select on table "public"."group_join_requests" to "service_role";

grant trigger on table "public"."group_join_requests" to "service_role";

grant truncate on table "public"."group_join_requests" to "service_role";

grant update on table "public"."group_join_requests" to "service_role";

grant delete on table "public"."group_memberships" to "anon";

grant insert on table "public"."group_memberships" to "anon";

grant references on table "public"."group_memberships" to "anon";

grant select on table "public"."group_memberships" to "anon";

grant trigger on table "public"."group_memberships" to "anon";

grant truncate on table "public"."group_memberships" to "anon";

grant update on table "public"."group_memberships" to "anon";

grant delete on table "public"."group_memberships" to "authenticated";

grant insert on table "public"."group_memberships" to "authenticated";

grant references on table "public"."group_memberships" to "authenticated";

grant select on table "public"."group_memberships" to "authenticated";

grant trigger on table "public"."group_memberships" to "authenticated";

grant truncate on table "public"."group_memberships" to "authenticated";

grant update on table "public"."group_memberships" to "authenticated";

grant delete on table "public"."group_memberships" to "service_role";

grant insert on table "public"."group_memberships" to "service_role";

grant references on table "public"."group_memberships" to "service_role";

grant select on table "public"."group_memberships" to "service_role";

grant trigger on table "public"."group_memberships" to "service_role";

grant truncate on table "public"."group_memberships" to "service_role";

grant update on table "public"."group_memberships" to "service_role";

grant delete on table "public"."group_teams" to "anon";

grant insert on table "public"."group_teams" to "anon";

grant references on table "public"."group_teams" to "anon";

grant select on table "public"."group_teams" to "anon";

grant trigger on table "public"."group_teams" to "anon";

grant truncate on table "public"."group_teams" to "anon";

grant update on table "public"."group_teams" to "anon";

grant delete on table "public"."group_teams" to "authenticated";

grant insert on table "public"."group_teams" to "authenticated";

grant references on table "public"."group_teams" to "authenticated";

grant select on table "public"."group_teams" to "authenticated";

grant trigger on table "public"."group_teams" to "authenticated";

grant truncate on table "public"."group_teams" to "authenticated";

grant update on table "public"."group_teams" to "authenticated";

grant delete on table "public"."group_teams" to "service_role";

grant insert on table "public"."group_teams" to "service_role";

grant references on table "public"."group_teams" to "service_role";

grant select on table "public"."group_teams" to "service_role";

grant trigger on table "public"."group_teams" to "service_role";

grant truncate on table "public"."group_teams" to "service_role";

grant update on table "public"."group_teams" to "service_role";

grant delete on table "public"."groups" to "anon";

grant insert on table "public"."groups" to "anon";

grant references on table "public"."groups" to "anon";

grant select on table "public"."groups" to "anon";

grant trigger on table "public"."groups" to "anon";

grant truncate on table "public"."groups" to "anon";

grant update on table "public"."groups" to "anon";

grant delete on table "public"."groups" to "authenticated";

grant insert on table "public"."groups" to "authenticated";

grant references on table "public"."groups" to "authenticated";

grant select on table "public"."groups" to "authenticated";

grant trigger on table "public"."groups" to "authenticated";

grant truncate on table "public"."groups" to "authenticated";

grant update on table "public"."groups" to "authenticated";

grant delete on table "public"."groups" to "service_role";

grant insert on table "public"."groups" to "service_role";

grant references on table "public"."groups" to "service_role";

grant select on table "public"."groups" to "service_role";

grant trigger on table "public"."groups" to "service_role";

grant truncate on table "public"."groups" to "service_role";

grant update on table "public"."groups" to "service_role";

grant delete on table "public"."match_participants" to "anon";

grant insert on table "public"."match_participants" to "anon";

grant references on table "public"."match_participants" to "anon";

grant select on table "public"."match_participants" to "anon";

grant trigger on table "public"."match_participants" to "anon";

grant truncate on table "public"."match_participants" to "anon";

grant update on table "public"."match_participants" to "anon";

grant delete on table "public"."match_participants" to "authenticated";

grant insert on table "public"."match_participants" to "authenticated";

grant references on table "public"."match_participants" to "authenticated";

grant select on table "public"."match_participants" to "authenticated";

grant trigger on table "public"."match_participants" to "authenticated";

grant truncate on table "public"."match_participants" to "authenticated";

grant update on table "public"."match_participants" to "authenticated";

grant delete on table "public"."match_participants" to "service_role";

grant insert on table "public"."match_participants" to "service_role";

grant references on table "public"."match_participants" to "service_role";

grant select on table "public"."match_participants" to "service_role";

grant trigger on table "public"."match_participants" to "service_role";

grant truncate on table "public"."match_participants" to "service_role";

grant update on table "public"."match_participants" to "service_role";

grant delete on table "public"."match_responses" to "anon";

grant insert on table "public"."match_responses" to "anon";

grant references on table "public"."match_responses" to "anon";

grant select on table "public"."match_responses" to "anon";

grant trigger on table "public"."match_responses" to "anon";

grant truncate on table "public"."match_responses" to "anon";

grant update on table "public"."match_responses" to "anon";

grant delete on table "public"."match_responses" to "authenticated";

grant insert on table "public"."match_responses" to "authenticated";

grant references on table "public"."match_responses" to "authenticated";

grant select on table "public"."match_responses" to "authenticated";

grant trigger on table "public"."match_responses" to "authenticated";

grant truncate on table "public"."match_responses" to "authenticated";

grant update on table "public"."match_responses" to "authenticated";

grant delete on table "public"."match_responses" to "service_role";

grant insert on table "public"."match_responses" to "service_role";

grant references on table "public"."match_responses" to "service_role";

grant select on table "public"."match_responses" to "service_role";

grant trigger on table "public"."match_responses" to "service_role";

grant truncate on table "public"."match_responses" to "service_role";

grant update on table "public"."match_responses" to "service_role";

grant delete on table "public"."match_votes" to "anon";

grant insert on table "public"."match_votes" to "anon";

grant references on table "public"."match_votes" to "anon";

grant select on table "public"."match_votes" to "anon";

grant trigger on table "public"."match_votes" to "anon";

grant truncate on table "public"."match_votes" to "anon";

grant update on table "public"."match_votes" to "anon";

grant delete on table "public"."match_votes" to "authenticated";

grant insert on table "public"."match_votes" to "authenticated";

grant references on table "public"."match_votes" to "authenticated";

grant select on table "public"."match_votes" to "authenticated";

grant trigger on table "public"."match_votes" to "authenticated";

grant truncate on table "public"."match_votes" to "authenticated";

grant update on table "public"."match_votes" to "authenticated";

grant delete on table "public"."match_votes" to "service_role";

grant insert on table "public"."match_votes" to "service_role";

grant references on table "public"."match_votes" to "service_role";

grant select on table "public"."match_votes" to "service_role";

grant trigger on table "public"."match_votes" to "service_role";

grant truncate on table "public"."match_votes" to "service_role";

grant update on table "public"."match_votes" to "service_role";

grant delete on table "public"."matches" to "anon";

grant insert on table "public"."matches" to "anon";

grant references on table "public"."matches" to "anon";

grant select on table "public"."matches" to "anon";

grant trigger on table "public"."matches" to "anon";

grant truncate on table "public"."matches" to "anon";

grant update on table "public"."matches" to "anon";

grant delete on table "public"."matches" to "authenticated";

grant insert on table "public"."matches" to "authenticated";

grant references on table "public"."matches" to "authenticated";

grant select on table "public"."matches" to "authenticated";

grant trigger on table "public"."matches" to "authenticated";

grant truncate on table "public"."matches" to "authenticated";

grant update on table "public"."matches" to "authenticated";

grant delete on table "public"."matches" to "service_role";

grant insert on table "public"."matches" to "service_role";

grant references on table "public"."matches" to "service_role";

grant select on table "public"."matches" to "service_role";

grant trigger on table "public"."matches" to "service_role";

grant truncate on table "public"."matches" to "service_role";

grant update on table "public"."matches" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."player_group_stats" to "anon";

grant insert on table "public"."player_group_stats" to "anon";

grant references on table "public"."player_group_stats" to "anon";

grant select on table "public"."player_group_stats" to "anon";

grant trigger on table "public"."player_group_stats" to "anon";

grant truncate on table "public"."player_group_stats" to "anon";

grant update on table "public"."player_group_stats" to "anon";

grant delete on table "public"."player_group_stats" to "authenticated";

grant insert on table "public"."player_group_stats" to "authenticated";

grant references on table "public"."player_group_stats" to "authenticated";

grant select on table "public"."player_group_stats" to "authenticated";

grant trigger on table "public"."player_group_stats" to "authenticated";

grant truncate on table "public"."player_group_stats" to "authenticated";

grant update on table "public"."player_group_stats" to "authenticated";

grant delete on table "public"."player_group_stats" to "service_role";

grant insert on table "public"."player_group_stats" to "service_role";

grant references on table "public"."player_group_stats" to "service_role";

grant select on table "public"."player_group_stats" to "service_role";

grant trigger on table "public"."player_group_stats" to "service_role";

grant truncate on table "public"."player_group_stats" to "service_role";

grant update on table "public"."player_group_stats" to "service_role";

grant delete on table "public"."player_team_memberships" to "anon";

grant insert on table "public"."player_team_memberships" to "anon";

grant references on table "public"."player_team_memberships" to "anon";

grant select on table "public"."player_team_memberships" to "anon";

grant trigger on table "public"."player_team_memberships" to "anon";

grant truncate on table "public"."player_team_memberships" to "anon";

grant update on table "public"."player_team_memberships" to "anon";

grant delete on table "public"."player_team_memberships" to "authenticated";

grant insert on table "public"."player_team_memberships" to "authenticated";

grant references on table "public"."player_team_memberships" to "authenticated";

grant select on table "public"."player_team_memberships" to "authenticated";

grant trigger on table "public"."player_team_memberships" to "authenticated";

grant truncate on table "public"."player_team_memberships" to "authenticated";

grant update on table "public"."player_team_memberships" to "authenticated";

grant delete on table "public"."player_team_memberships" to "service_role";

grant insert on table "public"."player_team_memberships" to "service_role";

grant references on table "public"."player_team_memberships" to "service_role";

grant select on table "public"."player_team_memberships" to "service_role";

grant trigger on table "public"."player_team_memberships" to "service_role";

grant truncate on table "public"."player_team_memberships" to "service_role";

grant update on table "public"."player_team_memberships" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."push_subscriptions" to "anon";

grant insert on table "public"."push_subscriptions" to "anon";

grant references on table "public"."push_subscriptions" to "anon";

grant select on table "public"."push_subscriptions" to "anon";

grant trigger on table "public"."push_subscriptions" to "anon";

grant truncate on table "public"."push_subscriptions" to "anon";

grant update on table "public"."push_subscriptions" to "anon";

grant delete on table "public"."push_subscriptions" to "authenticated";

grant insert on table "public"."push_subscriptions" to "authenticated";

grant references on table "public"."push_subscriptions" to "authenticated";

grant select on table "public"."push_subscriptions" to "authenticated";

grant trigger on table "public"."push_subscriptions" to "authenticated";

grant truncate on table "public"."push_subscriptions" to "authenticated";

grant update on table "public"."push_subscriptions" to "authenticated";

grant delete on table "public"."push_subscriptions" to "service_role";

grant insert on table "public"."push_subscriptions" to "service_role";

grant references on table "public"."push_subscriptions" to "service_role";

grant select on table "public"."push_subscriptions" to "service_role";

grant trigger on table "public"."push_subscriptions" to "service_role";

grant truncate on table "public"."push_subscriptions" to "service_role";

grant update on table "public"."push_subscriptions" to "service_role";


  create policy "Allow admins and owners to manage goals"
  on "public"."goals"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((m.group_id = gm.group_id)))
  WHERE ((m.id = goals.match_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))))
with check ((EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((m.group_id = gm.group_id)))
  WHERE ((m.id = goals.match_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Group members can view goals"
  on "public"."goals"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((m.group_id = gm.group_id)))
  WHERE ((m.id = goals.match_id) AND (gm.user_id = auth.uid())))));



  create policy "Admins can update join requests"
  on "public"."group_join_requests"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_join_requests.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['owner'::public.user_role, 'admin'::public.user_role]))))));



  create policy "Admins can view group join requests"
  on "public"."group_join_requests"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_join_requests.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['owner'::public.user_role, 'admin'::public.user_role]))))));



  create policy "Users can create join requests"
  on "public"."group_join_requests"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can view own join requests"
  on "public"."group_join_requests"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Admins or owners can insert members into their own groups"
  on "public"."group_memberships"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.group_memberships m
  WHERE ((m.group_id = group_memberships.group_id) AND (m.user_id = auth.uid()) AND (m.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Members can view memberships in their groups"
  on "public"."group_memberships"
  as permissive
  for select
  to authenticated
using (public.is_user_in_group(auth.uid(), group_id));



  create policy "Owners and admins can update group memberships"
  on "public"."group_memberships"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_memberships.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['owner'::public.user_role, 'admin'::public.user_role]))))))
with check ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_memberships.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['owner'::public.user_role, 'admin'::public.user_role]))))));



  create policy "Admins or owners can delete teams"
  on "public"."group_teams"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_teams.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Admins or owners can insert teams"
  on "public"."group_teams"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_teams.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Admins or owners can update teams"
  on "public"."group_teams"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_teams.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Members can view group teams"
  on "public"."group_teams"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = group_teams.group_id) AND (gm.user_id = auth.uid())))));



  create policy "Admins or owners can update group details"
  on "public"."groups"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = groups.id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Anyone can find group by join_code"
  on "public"."groups"
  as permissive
  for select
  to public
using (true);



  create policy "Authenticated insert group row"
  on "public"."groups"
  as permissive
  for insert
  to authenticated
with check ((creator_id = auth.uid()));



  create policy "select_groups"
  on "public"."groups"
  as permissive
  for select
  to authenticated
using (((creator_id = auth.uid()) OR public.can_access_group(auth.uid(), id)));



  create policy "Group members can view participants"
  on "public"."match_participants"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((m.group_id = gm.group_id)))
  WHERE ((m.id = match_participants.match_id) AND (gm.user_id = auth.uid())))));



  create policy "Allow group members to insert their own match response"
  on "public"."match_responses"
  as permissive
  for insert
  to public
with check (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((gm.group_id = m.group_id)))
  WHERE ((m.id = match_responses.match_id) AND (gm.user_id = auth.uid()))))));



  create policy "Allow group members to view match responses"
  on "public"."match_responses"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((gm.group_id = m.group_id)))
  WHERE ((m.id = match_responses.match_id) AND (gm.user_id = auth.uid())))));



  create policy "Allow members to update their own response, and admins/owners t"
  on "public"."match_responses"
  as permissive
  for update
  to public
using ((((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((gm.group_id = m.group_id)))
  WHERE ((m.id = match_responses.match_id) AND (gm.user_id = auth.uid()))))) OR (EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((gm.group_id = m.group_id)))
  WHERE ((m.id = match_responses.match_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role])))))));



  create policy "Allow service role insert"
  on "public"."match_responses"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Group members can view votes"
  on "public"."match_votes"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((m.group_id = gm.group_id)))
  WHERE ((m.id = match_votes.match_id) AND (gm.user_id = auth.uid())))));



  create policy "Users can vote on matches"
  on "public"."match_votes"
  as permissive
  for insert
  to public
with check (((auth.uid() = voter_id) AND (EXISTS ( SELECT 1
   FROM (public.matches m
     JOIN public.group_memberships gm ON ((m.group_id = gm.group_id)))
  WHERE ((m.id = match_votes.match_id) AND (gm.user_id = auth.uid()))))));



  create policy "Admins or owners can create matches"
  on "public"."matches"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = matches.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Admins or owners can update matches"
  on "public"."matches"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = matches.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))))
with check ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.group_id = matches.group_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Group members can view matches"
  on "public"."matches"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.group_memberships
  WHERE ((group_memberships.group_id = matches.group_id) AND (group_memberships.user_id = auth.uid())))));



  create policy "User can update their own notifications"
  on "public"."notifications"
  as permissive
  for update
  to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can select their own notifications"
  on "public"."notifications"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



  create policy "Admins or owners can update player stats"
  on "public"."player_group_stats"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.group_memberships m
  WHERE ((m.id = player_group_stats.membership_id) AND (m.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role])) AND (m.user_id = auth.uid())))));



  create policy "Members can view stats of their group"
  on "public"."player_group_stats"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.group_memberships m
  WHERE ((m.id = player_group_stats.membership_id) AND ((m.user_id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM public.group_memberships gm
          WHERE ((gm.group_id = m.group_id) AND (gm.user_id = auth.uid())))))))));



  create policy "admin or owner can insert player stats"
  on "public"."player_group_stats"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.group_memberships gm
  WHERE ((gm.id = player_group_stats.membership_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Admins or owners can assign players to teams"
  on "public"."player_team_memberships"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM (public.group_teams gt
     JOIN public.group_memberships gm ON ((gm.group_id = gt.group_id)))
  WHERE ((gt.id = player_team_memberships.team_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Admins or owners can remove players from teams"
  on "public"."player_team_memberships"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (public.group_teams gt
     JOIN public.group_memberships gm ON ((gm.group_id = gt.group_id)))
  WHERE ((gt.id = player_team_memberships.team_id) AND (gm.user_id = auth.uid()) AND (gm.role = ANY (ARRAY['admin'::public.user_role, 'owner'::public.user_role]))))));



  create policy "Members can view player team memberships"
  on "public"."player_team_memberships"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (public.group_teams gt
     JOIN public.group_memberships gm ON ((gm.group_id = gt.group_id)))
  WHERE ((gt.id = player_team_memberships.team_id) AND (gm.user_id = auth.uid())))));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view all profiles"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER on_group_join AFTER INSERT ON public.group_memberships FOR EACH ROW EXECUTE FUNCTION public.create_player_stats_on_join();

CREATE TRIGGER create_default_teams_trigger AFTER INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION public.create_default_teams();

CREATE TRIGGER on_group_created AFTER INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION public.handle_new_group();

CREATE TRIGGER trigger_set_group_code BEFORE INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION public.set_group_code();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER award_points_after_match_end AFTER UPDATE ON public.matches FOR EACH ROW WHEN (((new.status = 'ended'::public.match_status) AND (old.status IS DISTINCT FROM 'ended'::public.match_status) AND (new.points_awarded = false))) EXECUTE FUNCTION public.award_match_points_and_ratings();

CREATE TRIGGER award_potm_points_on_complete AFTER UPDATE ON public.matches FOR EACH ROW WHEN (((new.status = 'completed'::public.match_status) AND (old.status IS DISTINCT FROM 'completed'::public.match_status))) EXECUTE FUNCTION public.award_match_points();

CREATE TRIGGER create_match_responses AFTER INSERT ON public.matches FOR EACH ROW EXECUTE FUNCTION public.insert_match_responses();

CREATE TRIGGER match_cancelled_trigger AFTER UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.handle_match_cancelled();

CREATE TRIGGER match_updated_notify AFTER UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.notify_group_members_on_match_update();

CREATE TRIGGER on_match_created AFTER INSERT ON public.matches FOR EACH ROW EXECUTE FUNCTION public.notify_group_members();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Anyone can read avatars 1pmf6kr_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'profile_pictures'::text));



  create policy "Users can delete their own avatars 1pmf6kr_0"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'profile_pictures'::text) AND (owner = auth.uid())));



  create policy "Users can insert their own avatars 1pmf6kr_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'profile_pictures'::text) AND (owner = auth.uid())));



  create policy "Users can read their own avatars 1pmf6kr_0"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'profile_pictures'::text) AND (owner = auth.uid())));



  create policy "Users can update their own avatars 1pmf6kr_0"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'profile_pictures'::text) AND (owner = auth.uid())));



