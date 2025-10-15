---
title: 'A quick look at Design Tokens'
tag: 'design'
labels: ["Design tokens", "Design systems"]
excerpt: 'When trying to solve the challenge of a consistent customer experienece throughout their journey with your brand or company, design tokens can act as a foundation for the solution that brings it all together.'
coverImage: '/assets/blog/design-tokens/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: 'Ollie Macky'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/blog/design-tokens/cover.jpg'
---

A design token represents a small, repeated design decision. Tokens store style values, such as colors and fonts, allowing them to be applied consistently across designs, code, tools and platforms.

Using design tokens instead of hardcoded values streamlines the work of building, maintaining and scaling products within a design system.

---

## Key concepts

- Tokens are created in a platform-agnostic format so they can be used across our product suite.
- There are three kinds (tiers) of tokens: **core**, **semantic**, and **component**.
- Tokens are visually displayed in our Figma Foundations file.
- The source of truth for tokens exisits in this repo. 
- Our designers pull tokens from this repo and use them in Figma.

## What is a design token?

A design token represents a small, repeated design decision. Multiple design tokens make up a design system's visual style. Tokens replace static values, such as hex codes for color, with self-explanatory names.

A PaperCut design token consists of two parts:

- a code-like name, such as `core.color.brand.600`
- an associated value, such as `#ffffff`

The token’s value can be one of several things: a color, a typeface, a measurement, or even another token.

![](/assets/blog/design-tokens/token-structure.jpg 'Demonstrating how a token is structured')

Design tokens meaningfully connect style choices (or design decisions) that would otherwise lack a clear relationship.
For example, if a designer's mock-ups and an engineer's implementation both reference the same token called `semantic.color.background.brand.default`, then design and engineering can be confident that the same color will be used in both places. This consistency remains in place even when the color value assigned to a token gets updated.

![](/assets/blog/design-tokens/design-token-usage.jpg 'Using a design token in desing tools and code')

## Why are tokens important?

Tokens enable a design system to have a single source of truth. They provide a kind of repository for recording and tracking style choices and changes.

When using tokens for design and implementation, style updates will propagate consistently through an entire product or suite of products, removing the requirement to change every value where the style appears.

Because tokens are reusable and purpose-driven, they can define system-wide updates to themes and contexts for use. For example, tokens can be used to systematically apply a high-contrast color scheme for improved visibility or to change the type scale to better suit marketing content.

## How does the naming convention work?

Effective token names improve and sustain a team’s shared understanding of visual style through design, code, and other interdisciplinary handoffs. Terms matter. As we make things, we must be able to browse and search tools to quickly recognize and recall the purposeful decisions we’ve made. Not just in code and documentation, but in design tools too.

We have created a token naming tool to help users and maintainers of the design system. This spreadsheet brings structure to the naming convention and allows us to have a reference for why a token is named the way it is.

![](/assets/blog/design-tokens/design-token-naming.jpg 'Naming structure of a Design Token')

Naming is hard so here are some pointers on how the schema works:

- Tiers are split down the page: **core**, then **semantic**, and finally **component** (see below).
- Tokens are broken up horizontally into a naming pattern via groups.
- Groups: **namespace**, **object**, **base**, and **modifier**.
- Within groups, there are levels (see image above).

The options for each level in the tool are available in the dropdown select format. This ensures the naming terms we use are uniform in nature, and helps users and maintainers to work with a level of predictability when searching for tokens in their tool/platform of choice.

## Token tiers

In the PDS, we take a semantic approach to naming our design tokens and use a tier system to organize them:

- **Core tokens** - these store raw values to make them reusable in semantic tokens. Their names should reflect the values they store and represent.
- **Semantic tokens** - these reference core tokens and suggest their intended use. Semantic token names should only reference what the token is intended to be used for, and never reference the value. Semantic tokens have a high level of abstraction. A typical name could be <code>--core-color-background</code> or <code>--semantic-shadow-heavy-s</code>.
- **Component tokens** - these reference semantic tokens for use with a specific component. They also allow users (Product Designers, Developers) to overwrite properties within the scope of the component without affecting the semantic or core tokens in the tiers below.