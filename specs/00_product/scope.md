# Liga – Product Scope & Technical Specification

## 1. Product Overview

**Liga** is a football social management app built for non-professional players.
This app is designed to be mobile-first. It is also a PWA.

It allows users to:

- Create football groups
- Organise matches
- Track player availability
- Manage teams and results
- Vote for Player of the Match (POTM)
- Calculate points and ratings
- View leaderboards

The goal is to digitise grassroots football coordination and introduce competitive tracking through structured scoring and ratings.

---

# 2. Technical Stack

- **Frontend:** Next.js (App Router)
- **Backend / Database:** Supabase (Postgres + Auth + RLS + Realtime)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Language:** TypeScript
- **Testing:** Vitest
- **Notifications:** In-app feed + push notifications + optional email
- **Auth Provider:** Email & Password

---

# 3. Core Concepts (Domain Model)

## 3.1 User

A registered individual.

### Required Fields

- full_name
- username
- other_name (optional)
- dob
- foot (left | right | both)
- height
- weight
- sex (male | female)
- bio (optional)
- country
- county_state_city
- position
- measurement_system (si | us)
- profile_url (optional)

### Rules

- All fields except profile picture are mandatory.
- On first login, user must complete profile before accessing app.
- Users authenticate via Email & Password.

---

## 3.2 Group

A football group managed by users.

### Properties

- id
- name
- join_code (unique 6-digit random code)
- created_by
- created_at

### Roles

- owner (group creator)
- admin
- user

### Rules

- Group creator becomes owner.
- Only admins can:
    - Accept join requests
    - Create matches
    - Edit group
    - Promote/demote admins
    - Remove users

- If owner leaves:
    1. Oldest admin becomes owner.
    2. If no admins → user with most matches played becomes owner.

- Leaving group removes user membership but preserves stats.

---

## 3.3 Group Membership

Relationship between user and group.

Fields (via `group_memberships` and `player_group_stats`):

- user_id
- group_id
- role (owner | admin | user)
- joined_at
- matches_played
- matches_won
- matches_drawn
- matches_lost
- goals
- assists
- points
- rating
- potm_count (derived)

---

## 3.4 Match

A scheduled football fixture within a group.

### Match Fields

- id
- group_id
- match_date
- match_time
- venue
- a_side (e.g. 5, 7, 11)
- teamA_id
- teamB_id
- creator_id
- status
- teamA_score
- teamB_score
- points_awarded
- potm_id
- ended_at
- created_at
- updated_at

---

# 4. Match Status Lifecycle

Match statuses:

| Status    | Color | Meaning                   |
| --------- | ----- | ------------------------- |
| pending   | Amber | Waiting for availability  |
| confirmed | Green | Teams selected            |
| ended     | Black | Match ended (Voting open) |
| completed | Grey  | Voting closed             |
| cancelled | Red   | Match cancelled           |

### State Flow

```
pending → confirmed → ended → completed
            ↓
        cancelled
```

### Rules

- Only admins can create matches.
- All group members receive notification when match is created.
- Availability list is ordered by first confirmation.
- If user changes to unavailable → removed from position.
- If re-confirms → added to bottom.

---

# 5. Match Participation

## 5.1 Availability

Users respond to match with:

- available (boolean)
- payment_status (paid | unpaid)

Availability determines team selection eligibility.

---

## 5.2 Team Selection

Admin selects available players into:

- Team A
- Team B

Once sufficient players are available:

- Admin confirms match.
- Teams are locked.
- Match moves to Confirmed.

---

# 6. Match Completion

When admin ends match:

1. Enter final score
2. Update goal events (scorer + assist)
3. Status → ended
4. Immediately award Fixture Points (FPS)
5. Open POTM voting (1 hour)

After 1 hour:

- Status → completed
- Award Bonus Points (BPS)

---

# 7. Points System

## 7.1 Fixture Points (FPS)

Awarded immediately after match ends.

| Action             | Points             |
| ------------------ | ------------------ |
| Played match       | 2                  |
| Winning team       | 3                  |
| Draw               | 1                  |
| Conceded < 5 goals | 2                  |
| Every 5 conceded   | -1 (e.g., 10 = -2) |
| Every 5 scored     | 2                  |

---

## 7.2 Bonus Points (BPS)

Awarded after voting closes.

| Rank     | Points |
| -------- | ------ |
| 1st POTM | 3      |
| 2nd POTM | 2      |
| 3rd POTM | 1      |

Rules:

- Cannot vote for yourself.
- Only players selected in match can vote.
- Vote cannot be changed once submitted.

---

# 8. Player Rating System

Base rating number starts at:

```
rating_number = 100
display_rating = rating_number / 10
```

### Plus-Minus Calculation

```
margin = abs(team_score - opponent_score)

if player_team == winning_team:
    rating_number += margin
else:
    rating_number -= margin
```

Then:

```
display_rating = rating_number / 10
```

Example:

- Start = 100
- Team wins by 5
- New rating_number = 105
- Display rating = 10.5

This accumulates across matches.

---

# 9. Leaderboard

Sortable by:

- Username (default)
- Points
- Rating
- Matches Played

### Columns

- Rank
- Username
- Latest (last match points)
- Total
- MP
- W
- D
- L
- POTM
- GF
- GA
- GD
- Last 3

Leaderboard is group-specific.

---

# 10. Notifications / Feed

Global feed across all groups user belongs to.

Includes:

- New users added
- New matches created
- Match updates
- Voting open countdown
- Achievements
- Admin edits
- POTM results

Notifications are event-driven.

---

# 11. Navigation Structure

Main Tabs:

1. Home (Feed)
2. Leaderboard
3. Notifications
4. Profile

Additional:

- Menu page (Settings, About, FAQ)
- Match details page
- POTM voting page
- Group settings page

---

# 12. Security & RLS

Supabase Row Level Security enforced.

Examples:

- Users can only see groups they belong to.
- Only admins can create/edit matches.
- Only match players can vote.
- Users cannot vote twice.
- Users cannot vote for themselves.

---

# 13. Edge Cases

- Admin leaves group
- Match cancelled after confirmations
- Player leaves group but historical stats remain
- Voting closes automatically after 1 hour
- Insufficient players → match remains pending
- Realtime updates for match state changes

---

# 14. Testing Requirements (Vitest)

Must cover:

- Points calculation logic
- Rating calculation logic
- Match status transitions
- Availability ordering logic
- Voting restrictions
- Super-admin reassignment
- RLS policy behaviour (integration tests)

---

# 15. Realtime Requirements

Use Supabase realtime for:

- Match updates
- Availability updates
- Voting countdown
- Leaderboard refresh
- Notifications

---

# 16. Performance Considerations

- Leaderboard should use aggregated queries.
- Avoid recalculating stats on every render.
- Use database triggers for:
    - Points calculation
    - Rating updates
    - Voting close automation

- Use indexed fields:
    - group_id
    - match_id
    - user_id

---

# 17. Future Expansion Considerations

- Multiple leagues per group
- Season resets
- Transfer system
- AI match summaries
- Match highlights
- Public group discovery

---

# 18. Product Philosophy

Liga should feel:

- Competitive
- Social
- Structured
- Data-driven
- Fair
- Realtime

The app must maintain:

- Clear role hierarchy
- Transparent scoring
- Immutable match history
- Clean UX for grassroots football players
