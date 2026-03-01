# Active Task: Verify Player of the Match (POTM) Bonus Points Assignment

## Status: ✅ COMPLETE

## Objective

Ensure that the database trigger `award_potm_points_on_complete` correctly calculates and awards bonus points based on vote rankings when a match is marked as `completed`.

## Results

### Test 1: Awards 3/2/1 bonus points to POTM ranks 1st/2nd/3rd ✅

- A received 2 votes (rank 1) → +3 points
- B received 1 vote (rank 2) → +2 points
- C received 1 vote (rank 2 tied via DENSE_RANK) → +2 points
- D received 0 votes → +0 points

### Test 2: Tied 1st place both receive 3 bonus points ✅

- A received 2 votes (tied rank 1) → +3 points
- B received 2 votes (tied rank 1) → +3 points
- C received 0 votes → +0 points
- D received 0 votes → +0 points

## Files

- `__tests__/int/potm_bonus_points.int.test.ts` — POTM bonus integration tests
- `__tests__/int/match_result_points.int.test.ts` — renamed from `supabase_trigger.int.test.ts`
