# 0002. Five Button variants; `emphasis` sits above `primary`

- **Status:** Accepted
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P1, P4, P7

## Context

The April 2026 brand documents stated a "binary" button system: solid black or outlined, with no other fills. The shipped `Button` has five variants — `primary`, `secondary`, `naked`, `emphasis`, `danger` — and the docs site documents them. The binary rule had no known source, and enforcing it would remove variants used by A2UI and Meal Agent.

## Decision

The live `Button` component is the source of truth. The binary rule is discarded.

| Variant | Role |
|---|---|
| `emphasis` | Blue fill. A call to action one level **above** primary — a brand moment or something that must be highlighted beyond the primary action. Use sparingly: at most one per view. |
| `primary` | Near-black fill. The main action in a context. |
| `secondary` | Light grey fill. Supporting actions. |
| `naked` | Transparent. Low-emphasis, inline, and toolbar actions. |
| `danger` | Red fill. Destructive actions. |

## Consequences

- The binary rule has been removed from the `.github/` guidance and agent definitions.
- Button docs should describe `emphasis` as sitting above `primary` in the hierarchy.
- Button's corner radius (`sm`, 4px) is also taken from the live component; the earlier "6px minimum" and "~8px" claims are dropped.
