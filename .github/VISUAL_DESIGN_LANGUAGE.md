# Common Origin — Visual Design Language

> This document defines the precise visual rules that govern every design decision in this system.
> Read this in full before making any change that affects appearance, spacing, colour, typography, or interaction.
> When in doubt: refer to the live Common Origin personal site as ground truth.

---

## Core Principle

**Colour belongs to content. The UI chrome is monochrome.**

The most defining visual rule of Common Origin: colourful content (photography, album artwork, generative art) is set against a monochrome, near-invisible UI. The interface steps back. The work speaks.

This is not just an aesthetic preference — it is the brand's fundamental visual argument.

---

## Colour System

### Background
- **Default page background:** warm off-white `~#F8F8F8` (never pure `#FFFFFF`, never coloured)
- The slight warmth prevents the harshness of pure white against photography and dark content
- Never use a coloured background on any page, section, or component chrome

### Text
| Role | Token | Value | Usage |
|---|---|---|---|
| Primary text | `color.text.default` | `#212529` | All body copy, headings, labels |
| Subdued/secondary | `color.text.subdued` | `#495057` | Metadata, dates, supporting copy, breadcrumbs |
| Disabled | `color.text.disabled` | `#adb5bd` | Inactive states |
| Inverse | `color.text.inverse` | `#ffffff` | Text on dark/black fills |
| Interactive | `color.text.interactive` | `#0265DC` | Links and interactive affordance only |

**Critical:** Never use pure `#000000` in component styles. `#212529` is the darkest value for UI elements. Pure black (`#000000`) is reserved exclusively for the Common Origin logo.

### Active and Selected States
**The most important UI pattern in this system:**

> Active, selected, and primary CTA states use solid black fill (`#212529`) with white text (`#ffffff`).

This pattern appears consistently across:
- Primary buttons ("Listen now", "See what's in the gallery")
- Selected filter chips ("All", active filter)
- Sidebar navigation active item
- Active tab indicators

This is not one of several options — it is the system's single answer to "what does selected look like?"

### Status Colours (Semantic Use Only)
Status colours are for communication, never decoration.

| Semantic | Token | Value |
|---|---|---|
| Success | `color.text.success` | `#007A4D` |
| Error | `color.text.error` | `#D31510` |
| Warning | `color.text.warning` | `#B14C00` |
| Info/Interactive | `color.text.interactive` | `#0265DC` |

**Anti-patterns to reject:**
- Coloured backgrounds on non-status elements
- Gradient fills anywhere in UI chrome
- Decorative colour (colour that doesn't communicate meaning)
- Coloured borders on non-status elements
- Blue, green, red, or orange used as brand expression — these are status signals only

---

## Typography

### The Core Typographic Gesture
**Heavy heading weight / normal body weight** — the dramatic contrast between these is the brand's typographic signature.

This is not optional. A medium-weight heading is a brand violation.

### Type Scale
| Role | Weight | Notes |
|---|---|---|
| Page titles | 800–900 (Extra Bold / Black) | Maximum weight, largest scale — dominant visual anchor |
| Section headings | 800 | Still very heavy — never below 700 for display headings |
| Sub-labels, categories | 400–500, small scale | Maximum contrast with headings |
| Body copy | 400 (Regular) | Comfortable line-height, good measure (not too wide) |
| Code / token labels | 400, monospace | Light background pill, small — readable but visually quiet |

### Typography Rules
1. **Hierarchy through weight and scale only** — never through colour. Never use a coloured heading.
2. **Heading weight is non-negotiable** — if you reduce heading weight, you reduce the brand.
3. **Body copy is not decorative** — comfortable, readable, unhurried.
4. **Monospace elements** (code, token names) use a light pill/badge background — present but quiet.
5. The Inter typeface is used for all UI text. The logo uses a distinct rounded geometric sans that is not part of the component system.

---

## Interactive Elements (Button System)

### The Binary Rule
**Buttons have exactly two states: solid black fill, or outlined with no fill. No other fills.**

| Variant | Appearance | Usage |
|---|---|---|
| Primary / Active | Solid `#212529` fill, white text, ~8px radius | CTAs, primary actions, active/selected states |
| Secondary / Default | Outlined, no fill, `#212529` border and text, same radius | Navigation, back links, secondary actions |

**Examples from the live site:**
- "Listen now" → solid black fill (primary)
- "Back to all Art" → outlined (secondary)
- "See what's in the gallery" → outlined (secondary)
- "All" filter chip when active → solid black fill (same as primary)

**Rules:**
- All interactive elements share the same border-radius — never mix sharp and rounded in the same UI context
- No hover fill changes that introduce new colours
- No gradient fills on buttons at any state
- Disabled state: reduced opacity only, no fill change

---

## Cards and Containers

- **Image border-radius:** generous, approximately 12–16px — noticeably larger than small component radius
- The image container IS the card — no separate background fill behind images
- **Shadow:** very subtle elevation only (`box-shadow: 0 1px 3px rgba(0,0,0,0.08)` at most) — no heavy or layered shadows
- Off-white page backgrounds do not need card wrappers — content breathes directly on the page
- Never add a coloured background to a card

---

## Layout and Spacing

### Signature Layout Pattern
The editorial two-column asymmetric layout — narrow content column left, large image right — is a recurring signature:
- Content: approximately 25–30% width
- Image: approximately 65–70% width
- Generous gap between columns

This pattern communicates the brand's editorial character. Use it for feature content wherever appropriate.

### Spacing Philosophy
- Base unit: 0.25rem
- Whitespace is generous — space creates calm, not empty gaps
- Never compress content to fit more on screen — Common Origin is not information-dense by default (exception: data products like A2UI which define their own density)
- Components handle their own density individually — no system-wide density props

---

## Navigation

### Top Navigation
- Logo mark at left, plain text links at right
- No backgrounds, no separators, no borders in the nav bar
- Active nav item: subtle weight or underline change only — **never a background fill in top navigation**
- Keep navigation visually silent — it serves wayfinding, not visual interest

### Sidebar Navigation (Design System and Data Products)
- Active item: solid black fill + white text inverse (same active pattern as everywhere else)
- Collapsible sections with minimal expand/collapse indicators
- Never use coloured backgrounds or badges in sidebar navigation

---

## Motion

**Subtle, purposeful, non-decorative.**

| Rule | Value |
|---|---|
| Maximum duration | 300ms |
| Typical duration | 150–200ms |
| Entrance animations | Never — elements do not animate in |
| Decorative animations | Never — motion is not used for visual interest |
| Acceptable uses | Hover state transitions, sidebar expand/collapse, filter chip selection, focus rings |
| Easing | ease-in-out or custom cubic-bezier — never linear (feels mechanical) |

The brand's motion language says: *things respond, they don't perform*.

---

## Reference Systems

These systems inform the quality ceiling, not the identity. Common Origin has its own identity — these references answer "how polished should this be?"

| System | What to take from it |
|---|---|
| **Stripe** | Component polish, interaction precision, modern feel, micro-detail quality |
| **Shopify** | Monochrome simplicity, restraint in colour use, product-focused clarity |
| **Vercel** | Technical monochrome confidence, minimal chrome, developer-facing precision |
| **GitHub** | Utility-first clarity, accessible patterns, practical component hierarchy |

**Important:** Existing codebase patterns always take precedence over reference system patterns. If Stripe does something differently from how this codebase does it, check whether the change is genuinely an improvement before proposing it.

---

## Anti-Patterns

A complete list of visual decisions that must never be made:

- Coloured backgrounds on page sections, cards, or component chrome
- Gradient fills anywhere in the UI
- Decorative use of status colours (blue, red, green, orange as brand expression)
- Medium-weight headings used as display headings
- Hierarchy established through colour (e.g. a coloured heading)
- Heavy or layered box shadows
- Entrance or scroll-triggered animations
- Mix of sharp and rounded corners in the same UI context
- Pure `#000000` in component styles (logo only)
- Pure `#FFFFFF` as the page background (use warm off-white)
- Borders on non-status elements that are anything other than very subtle grey
