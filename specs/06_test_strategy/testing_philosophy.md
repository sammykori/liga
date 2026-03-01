# TESTING_PHILOSOPHY.md

## Liga – Testing Philosophy & Strategy

Liga is a structured competitive football system.

Testing is not about covering everything.
Testing is about protecting:

- Business integrity
- User critical paths
- Permissions
- Data consistency
- State transitions
- Role-based actions
- UI reliability

We test what can break the product.

We do **not** test every visual detail or trivial line of code.

---

# 1. Core Testing Philosophy

### 1.1 We Test What Matters

We prioritise:

- Critical user journeys
- Points & rating integrity
- Role-based permissions
- Match lifecycle correctness
- Notification triggers
- Loading / empty / error states

We do NOT aim for 100% coverage.
We aim for **meaningful coverage**.

---

### 1.2 Liga is Deterministic

If:

- A match ends 10–5
- A player wins
- Votes are cast

The system must ALWAYS produce the same output.

Tests ensure this determinism.

---

# 2. Testing Architecture (Vitest Projects)

Your configuration defines 4 layers:

- unit
- component
- integration
- browser (Playwright)

Each has a specific purpose.

---

# 3. Unit Tests (Node Environment)

Location:

```plaintext
__tests__/unit/
```

### Purpose:

Test pure logic only.

No DOM.
No Supabase.
No network.

### Must Cover:

- Points calculation
- Rating calculation
- Bonus (POTM) logic
- Goal difference logic
- Match status transitions
- Availability ordering
- Permission guards (pure logic functions)

### Should NOT Cover:

- JSX rendering
- Styling
- Animations
- Supabase calls

Unit tests protect business rules.

---

# 4. Component Tests (jsdom)

Location:

```plaintext
__tests__/comp/
```

### Purpose:

Test UI behaviour in isolation.

Render components.
Mock hooks.

### Must Cover:

- Loading states
- Empty states
- Success states
- Error states
- Role-based UI rendering
- Disabled buttons for unauthorized users
- Vote button disabled for self
- Confirm match visible only to admin
- Leaderboard sorting behaviour
- Match status label rendering

### Should NOT Cover:

- Internal implementation details
- Tailwind classes
- Framer Motion animations

We test behaviour, not styling.

---

# 5. Integration Tests (jsdom)

Location:

```plaintext
__tests__/int/
```

### Purpose:

Test feature flows with real Supabase interactions (mocked or test DB).

Focus on user critical paths.

---

## 5.1 Critical Paths That MUST Be Tested

### Joining a Group via Link

Flow:

1. User clicks join link
2. Request created
3. Admin receives notification
4. Admin approves
5. User becomes group member

Must validate:

- Request exists
- Membership created
- Role assigned correctly
- Notification generated

---

### Approving / Declining Join Request

Must validate:

- Approve → membership created
- Decline → request removed
- Only admin can approve
- Non-admin cannot approve

---

### Creating a Group

Must validate:

- Creator becomes super-admin
- Join code generated
- Group appears in feed
- Leaderboard initializes correctly

---

### Updating a Group

Must validate:

- Only admin can edit
- Name updates correctly
- Admin toggling works
- Removing a user works

---

### Creating a Match

Must validate:

- Only admin can create
- All group members notified
- Match status = Pending
- Availability tracking starts

---

### Updating a Match

Must validate:

- Only admin can update
- Status transitions valid
- No regression in status

---

### Match Close Flow

Must validate:

- FPS awarded
- Ratings updated
- Status changes to Result
- Voting opens

---

### Voting Flow

Must validate:

- Cannot vote for self
- Cannot vote twice
- Voting closes automatically
- BPS awarded correctly

---

### Push Notifications

Must validate:

- Join request triggers notification
- Match created triggers notification
- Match updated triggers notification
- Voting open triggers notification

Test existence and correctness of notification entries.

---

### Permission Testing

For each sensitive action:

- Owner
- Admin
- Normal user

Must validate:

- Owner privileges
- Admin privileges
- User restrictions
- Unauthorized actions rejected

Never assume permissions work.

Test them.

---

# 6. Browser Tests (Playwright)

Location:

```plaintext
__tests__/browser/
```

### Purpose:

Test real-world flows in Chromium.

Only test the most important flows:

1. Full group join flow
2. Full match lifecycle
3. Voting flow
4. Leaderboard update after match
5. Permission denial UI behaviour

Do NOT write dozens of browser tests.

Keep them minimal and high value.

---

# 7. State Testing Requirements

Every data-driven component must be tested for:

- Loading state
- Empty state
- Success state
- Error state

If a component fetches data, it must handle all four states.

Tests must verify each state explicitly.

---

# 8. Error Handling Philosophy

Errors must:

- Show a visible UI message
- Not silently fail
- Not break layout
- Not leave stale state

Integration tests must simulate:

- Supabase error responses
- Network failures
- Permission denials

---

# 9. TanStack Query Testing

All mutations must:

- Invalidate relevant queries
- Not leave stale leaderboard
- Rollback optimistic updates on error

Integration tests must verify:

- Query invalidation works
- UI updates reflect backend state

---

# 10. What We Do NOT Test

We do NOT test:

- Tailwind class names
- Exact CSS values
- Framer Motion transitions
- shadcn internals
- Third-party library behaviour
- Generated Supabase types

We test our logic and flows.

---

# 11. Coverage Goals

We aim for:

- High coverage in calculation logic
- Moderate coverage in integration flows
- Minimal but meaningful browser tests

Coverage % is secondary to:

- Protecting core flows
- Preventing regression in scoring
- Protecting permission boundaries

---

# 12. Regression Protection

If a bug is found:

1. Write a failing test
2. Fix the bug
3. Ensure test passes
4. Prevent reoccurrence

Never fix without test coverage.

---

# 13. Testing Mindset

When writing a test, ask:

- Could this break production?
- Would this corrupt points or ratings?
- Could this allow unauthorized actions?
- Would this confuse users?
- Does this affect leaderboard integrity?

If yes → test it.

If not → probably unnecessary.

---

# 14. Definition of Testing Done

A feature is stable when:

- Critical path tested
- Permissions validated
- Error handling verified
- Points & ratings protected
- No lint errors
- No TypeScript errors
- No console errors

---

# 15. Final Philosophy

Liga is a competitive system.

If scoring breaks,
trust breaks.

If permissions break,
integrity breaks.

If state handling breaks,
UX breaks.

Testing protects:

- Competitive fairness
- Data consistency
- User trust
- Engineering confidence

We test what matters.
We ship what is stable.
We do not over-test noise.
