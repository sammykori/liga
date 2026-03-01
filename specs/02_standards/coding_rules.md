# CODING_RULES.md

## Liga – Engineering & Stability Rules

This document defines the **non-negotiable engineering standards** for Liga during the testing and stabilisation phase.

Liga must behave like a financial system:

- Deterministic
- Traceable
- Type-safe
- Idempotent
- Database-driven

This phase prioritises **correctness over speed**.

---

# 1. Core Principle

**Database is the source of truth.**

- No UI-derived scoring logic
- No duplicated business rules across layers
- No silent recalculations
- All points and ratings must be reproducible

---

# 2. Tech Stack Constraints

- Next.js (App Router)
- Supabase (Postgres + RLS + Realtime)
- TypeScript (strict mode enabled)
- TanStack Query
- shadcn/ui components
- Tailwind CSS
- Zustand
- Framer Motion (subtle animations only)
- Vitest for testing

---

# 3. TypeScript Rules (Strict Mode Required)

### Required:

- `"strict": true`
- No `any`
- No `@ts-ignore`
- No unsafe casting
- No non-null assertions (`!`) unless justified
- All Supabase types must be generated

### After every schema change:

```bash
npm run gen:types
```

Generated types must live in:

```
src/types/database.ts
```

All database calls must use these types.

---

# 4. File & Naming Conventions

### Components

- PascalCase filenames
- One component per file

Example:

```
LeaderboardTable.tsx
MatchCard.tsx
```

### Hooks

- Prefixed with `use`
- One responsibility per hook

Example:

```
useMatches.ts
useCloseMatch.ts
```

### Utility Logic

All scoring and rating logic must live in:

```
src/lib/calculations/
```

Never embed calculation logic inside components.

---

# 5. UI Rules

### Theme

- Neutral mostly (black / white / grey)
- No excessive color usage
- Status labels may use semantic colors
- Keep UI minimal and clean

### Components

- Must use shadcn/ui primitives
- No raw HTML unless necessary

### Animations

- Framer Motion allowed only for:
    - opacity
    - slight y-axis transitions

- No complex motion
- Do not test animations directly

---

# 6. Testing Rules (Mandatory)

Testing is not optional.

We enforce 3 layers:

---

## Layer 1 – Pure Logic Tests (Highest Priority)

All scoring and rating logic must be fully unit tested.

Location:

```
__tests__/unit/
```

Must test:

- Fixture points calculation
- Rating calculation
- POTM bonus allocation
- Edge cases (large scores, 0–0 draws, etc.)
- Cumulative updates
- No floating precision errors

Business logic coverage must be comprehensive.

---

## Layer 2 – Supabase Integration Tests

Location:

```
__tests__/int/
```

Must validate:

- Match close flow
- Points awarded correctly
- Ratings updated correctly
- Voting opens & closes correctly
- No double point awarding
- Super-admin reassignment logic
- Voting cannot occur twice
- User cannot vote for self

Database triggers must be idempotent.

---

## Layer 3 – UI Behaviour Tests

Using Vitest + Testing Library.

Must test:

- Leaderboard renders correct sorting
- Match status labels render correctly
- Availability ordering updates correctly
- Confirm match visible only to admins
- Vote button disabled for self
- Query invalidation works

Do not snapshot entire pages blindly.
Snapshot only stable, deterministic UI blocks.

---

# 7. TanStack Query Rules

All hooks must:

- Be strictly typed
- Handle loading state
- Handle error state
- Invalidate relevant queries on mutation
- Rollback optimistic updates on error

No stale state allowed.

After match close:

- Leaderboard query must invalidate
- Match query must invalidate
- Player stats must refresh

---

# 8. Database Safety Rules

Must enforce:

- Unique vote per user per match
- Check constraint: cannot vote for self
- Prevent match status regression
- Prevent duplicate point awarding
- Preserve historical match data

All scoring triggers must be idempotent.

---

# 9. Points & Rating Consistency Rules

The following must always hold true:

### Rule 1

Leaderboard total = sum(FPS + BPS)

### Rule 2

Latest column = last match points

### Rule 3

Display rating = rating_number / 10

### Rule 4

Ratings update based on goal difference only

No recalculating from frontend.

---

# 10. CI & Local Commands

After ANY change:

```bash
npm run gen:types
npm run lint
npm run type-check
npm run test
```

Pull requests must fail if:

- Lint errors exist
- Type errors exist
- Tests fail

No exceptions.

---

# 11. Refactoring Rules

When refactoring:

1. Extract business logic to pure functions
2. Write tests first
3. Refactor
4. Ensure tests pass
5. Verify integration tests
6. Run lint and type check

Never refactor without tests in place.

---

# 12. Prohibited Practices

- No business logic inside components
- No recalculating leaderboard in UI
- No duplicated scoring logic
- No manual mutation of derived fields
- No untyped Supabase responses
- No silent catch blocks
- No console errors in production

---

# 13. Definition of Done

A feature or change is complete only when:

- All related logic has unit tests
- Integration tests pass
- UI behaviour verified
- No TypeScript errors
- No ESLint errors
- No runtime console errors
- Supabase types regenerated

---

# 14. Engineering Philosophy

Liga is not a casual app.

It is a structured competitive system.

Treat:

- Points like money
- Ratings like credit scores
- Leaderboard like financial statements

Correctness is more important than speed.
