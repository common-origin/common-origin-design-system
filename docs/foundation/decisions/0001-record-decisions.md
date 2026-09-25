# 0001. Record significant decisions

- **Status:** Accepted
- **Date:** 2026-09-25
- **Decided by:** Ollie (owner)
- **Principles:** P4, P5, P7

## Context

A review in September 2026 found that the brand and agent guidance in `.github/` contradicted the shipped system in several places: button variants, blue usage, heading weights, motion, and the background colour. Those documents were all added in a single commit on 2026-04-26 ("chore: add Copilot agent ecosystem"), and several of their rules had no recorded source; the owner didn't recognise where some came from.

Without a record of why things are the way they are, neither people nor agents can tell a deliberate exception from drift. Agents would either "fix" shipped behaviour (breaking consumers) or ignore the rules (making them meaningless).

## Decision

- The `docs/foundation/` directory is the source of truth for purpose, users, brand, principles, and visual rules.
- Significant decisions are recorded here, one file per decision, using the template in the [index](README.md).
- A decision is significant if it changes a principle or visual rule, a public API, the token structure, or the build and distribution approach.
- Visual rules carry one of five statuses so aspiration is never mistaken for fact: **Enforced**, **Target**, **Exception** (must link to a decision), **Guideline**, and **Open question** (must link to an issue; don't act on it). Definitions are in the [foundation README](../README.md#rule-status).

## Consequences

- Pull requests that change visual behaviour cite a principle or decision.
- The four `.github/` brand documents (brand identity, visual design language, product ecosystem, north star) were replaced by the foundation. The remaining `.github/` guidance points to it; other inaccuracies in those documents (for example in `MAIN_INSTRUCTIONS.md` and `TOKEN_MANAGEMENT.md`) still need fixing.
- Where a rule can be checked automatically (hard-coded colours, durations, z-index), prefer a test or lint rule over prose.
