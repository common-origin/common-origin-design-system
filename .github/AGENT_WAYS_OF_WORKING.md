# Common Origin — Agent Ways of Working

> This document defines HOW agents should reason and work — not what the rules are (see AGENT_CONSTITUTION.md), but the process principles that prevent the most common failure modes.
> Read this after reading AGENT_CONSTITUTION.md. Apply these principles throughout every task.

---

## The Six Failure Modes This Document Prevents

| Failure mode | How it happens | Prevented by |
|---|---|---|
| Hallucinated APIs | Agent invents prop names or token names that don't exist | Principle 1: Read before write |
| Scope creep | Agent fixes unrelated issues in the same PR | Principle 2: One PR, one problem |
| Wrong visual decisions | Agent applies a reference system pattern without checking the codebase | Principle 3: Evidence-based decisions |
| Build failures | Agent pushes code without running validation | Principle 4: Mandatory validation gate |
| Documentation drift | Component changes without tests/docs updating | Principle 2: Docs are part of the scope |
| Confident wrong decisions | Agent guesses under uncertainty | Principle 5: Explicit uncertainty protocol |

---

## Principle 1 — Read Before Write

**Before modifying or referencing any file, component, prop, or token: read the source first. No assumptions.**

### Specifically:

**Before using any prop name:**
Read the component's TypeScript interface in the `.tsx` file. Confirm the exact prop name, type, and whether it is optional or required. Do not assume a prop exists because it seems logical.

**Before using any token:**
Open `src/styles/tokens.json` and locate the exact token path. Verify it exists. Verify the semantic level is correct (base vs semantic vs component). Do not construct a token name from memory.

**Before touching any exported component:**
Read `src/index.ts` to understand what is currently exported and how. Any change to an exported interface is a potential breaking change.

**Before writing new tests:**
Read the existing `ComponentName.test.tsx` file. Match its import style, describe block structure, `it` description conventions, and query patterns exactly. Consistency across tests is important for maintainability.

**Before writing new documentation:**
Read the existing `ComponentName.docs.tsx` file. Check `src/lib/componentsData.ts` to understand how the component is registered. Match the `ComponentDocumentation` object structure from existing examples (Button, Chip, ProgressBar are the reference implementations).

### Why this matters:
The most common agent failure in this codebase is using a prop name that sounds right but doesn't exist, or a token path that is slightly wrong. Both pass TypeScript if the type is `string`, and only fail at runtime. Reading the source eliminates this category of error entirely.

---

## Principle 2 — One PR, One Problem

**Each PR solves exactly one named problem stated in the originating issue. Scope never expands beyond that.**

### What this means in practice:

At the start of every task, before writing a single line of code:
1. State the exact problem to be solved (copy it from the issue)
2. List the specific files you expect to modify
3. Do not modify any file not on that list unless it is directly required by the named problem

### When you discover other issues:
You will discover other things that could be improved. This is expected and valuable. Handle them by:
- Leaving a comment on the PR: "Noticed: [description of issue] — not in scope for this PR, recommend a separate issue"
- **Never** silently fixing an unrelated issue in the same branch

### Documentation and tests are part of the scope:
If a component's implementation changes, updating `ComponentName.docs.tsx` and `ComponentName.test.tsx` is not out of scope — it is required. Documentation drift is not a separate problem; it is the same problem.

### Why this matters:
A PR that solves one problem can be reviewed, approved, and reverted cleanly. A PR that solves three problems is harder to reason about, harder to revert if one of the three is wrong, and harder to explain in a changelog.

---

## Principle 3 — Evidence-Based Decisions

**Every visual, structural, or naming decision must be traceable to a source. If it can't be traced, it can't be made with confidence.**

### The three acceptable sources of evidence:

1. **An existing pattern in this codebase** — if Button does it this way, another interactive component should do it the same way
2. **A rule explicitly stated in a brand context file** — BRAND_IDENTITY.md, VISUAL_DESIGN_LANGUAGE.md, DESIGN_NORTH_STAR.md, or AGENT_CONSTITUTION.md
3. **A clear parallel in the live Common Origin site** — the site is ground truth; if it does it, the system should align with it

### When none of the three apply:
Do not make the decision. Apply Principle 5 (uncertainty protocol).

### The precedence rule:
Existing codebase patterns take precedence over reference system patterns (Stripe, Shopify, Vercel, GitHub). If Stripe does something differently from how this codebase does it, that is interesting — but it does not automatically mean this codebase should change. The question is: "Is the Stripe approach demonstrably better, and is it consistent with the Common Origin brand?" Only propose the change if the answer to both is yes.

### Why this matters:
Agent decisions made without evidence introduce inconsistency. A component that "looks better" according to the agent's training data may not look right in the context of Common Origin. Evidence grounds every decision in the actual system.

---

## Principle 4 — Mandatory Pre-PR Validation Gate

**No PR is raised until ALL of the following pass in the CI environment. No exceptions.**

```bash
# Step 1: Type safety
npm run typecheck
# Expected: zero errors

# Step 2: Tests
npm test
# Expected: zero failures, all suites pass

# Step 3: Package build
npm run build:package
# Expected: successful build, dist/ updated

# Step 4: Path alias check (for any modified component)
cat dist/components/[ModifiedComponentName]/index.d.ts
# Expected: no @/ path aliases in the output
```

### Why each step matters:

- `typecheck` — catches prop type mismatches, wrong token path types, missing exports
- `npm test` — catches functional regressions and accessibility violations (`jest-axe`)
- `build:package` — confirms the component works in the published package form, not just in the dev environment
- Path alias check — `@/` aliases work in the dev Next.js environment but break in the published package's `.d.ts` files; this is the most common silent breakage in this codebase

### If validation fails:
Fix the failure before raising the PR. A PR with failing tests or a broken build is not an acceptable deliverable.

---

## Principle 5 — Explicit Uncertainty Protocol

**When a decision cannot be made with confidence: do not guess. Document the uncertainty explicitly.**

### Two places uncertainty must be documented:

**In the code (at the exact location of uncertainty):**
```typescript
// TODO: [Specific question for reviewer]
// e.g.: TODO: Should this use semantic.spacing.component.md or semantic.spacing.component.lg?
// The component's padding looks correct with md but lg matches the Button component.
```

**In the PR description (under "Open Questions"):**
```
## Open Questions

1. [Specific question]: [Context explaining why this decision could not be made confidently]
   Options considered: [A] [B]
   Recommendation if you have one: [or "No strong preference"]
```

### What counts as uncertainty:

- A visual decision where you cannot find a matching pattern in the codebase or brand files
- A token choice where two tokens seem equally appropriate
- An API decision where the right prop name or type is ambiguous
- Any case where the "right" answer depends on information you don't have access to

### What does NOT count as uncertainty:

- Cases where the brand context files give a clear answer — apply it
- Cases where the existing codebase has an identical pattern — follow it
- Cases where the AGENT_CONSTITUTION.md says "never" — obey it

### Why this matters:
The reviewer (the repository owner) has context that the agent does not have. An open question in a PR is a collaboration — it is the agent handing the right decision to the right person. This produces better outcomes than confident wrong decisions.

---

## Working Example: How These Principles Apply Together

**Scenario:** An agent is asked to improve the hover state of the `Chip` component.

**Step 1 (Principle 1 — Read before write):**
- Read `src/components/atoms/Chip/Chip.tsx` — understand the existing props, styled-components structure, and current hover implementation
- Read `src/styles/tokens.json` — find the relevant colour tokens for hover states
- Read `src/components/atoms/Button/Button.tsx` — Button is the reference for interactive states; hover should be consistent

**Step 2 (Principle 2 — One PR, one problem):**
- The problem is: "Chip hover state"
- Scope: `Chip.tsx`, `Chip.test.tsx`, `Chip.docs.tsx` — these three files only
- If a different issue is noticed in Chip (e.g. a token is hardcoded), note it in the PR as a separate finding, don't fix it here

**Step 3 (Principle 3 — Evidence-based):**
- Check: what does Button's hover state do? Match that pattern.
- Check: is there a rule in VISUAL_DESIGN_LANGUAGE.md about hover states? (Yes: subtle, no new colours, consistent radius)
- Check: does the live site Chip behaviour show a specific hover pattern? If yes, match it.

**Step 4 (Principle 4 — Validation gate):**
- After implementing: `npm run typecheck && npm test && npm run build:package`
- Check `dist/components/Chip/index.d.ts` — no `@/` aliases

**Step 5 (Principle 5 — Uncertainty protocol):**
- If the exact hover opacity/colour is unclear: add a `// TODO:` comment and an open question in the PR
- Do not guess at the value and ship it as if confident
