---
title: 'PaperCut Design Tokens'
tag: 'portfolio'
labels: ["Design Ops", "FE Development", "Design systems", "UI design", "Architecture"]
excerpt: 'An ongoing initiative to lay the foundations for the PaperCut Design System, enabling design decisions to be shared among all products, platforms and frameworks.'
coverImage: '/assets/portfolio/papercut-design-tokens/cover.jpg'
date: '2022-10-04T05:35:07.322Z'
author:
  name: 'Ollie'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/portfolio/papercut-design-tokens/cover.jpg'
---
## Establishing PaperCut’s Design Token System: Standardizing UI Across Products
### Project Overview
After successfully delivering the Website Design System for PaperCut, I transitioned into the Product Development team to implement design system practices across our broader product suite. The project aimed to create a robust design token system that would increase efficiency, ensure UI consistency, and align design and engineering teams under a unified visual language. My research drew from established design systems like Salesforce, Carbon, and Material to implement tokens as foundational UI elements, reducing friction for users and partners and accelerating product delivery.

### Challenges & Goals
Creating a scalable design token system presented unique challenges, particularly around token organization, naming, and the management of a single source of truth. To address these, I set out to develop a comprehensive token architecture and a naming taxonomy that would work across the organization. Key goals included:

- Streamlining design and development handoffs
- Supporting various branded interfaces with minimal code changes
- Establishing a source of truth to manage tokens centrally for consistent adoption

### Research & Inspiration
Researching best practices from systems like Salesforce’s and Material Design’s helped shape our approach. One especially influential source was Nathan Curtis’s framework for tiered design tokens, as outlined in his article Naming Tokens in Design Systems. Curtis’s structure organizes tokens into Base, Semantic, and Component tiers, providing a clear hierarchy that aligns with PaperCut’s goals of improving cross-team alignment and simplifying design updates across platforms.

![PaperCut Tokens System - token structure](/assets/blog/design-tokens/token-structure.jpg "PaperCut Tokens System - token structure")
*PaperCut Tokens System - token structure*

### Process & Approach

#### 1. Token Naming Taxonomy
The naming taxonomy I implemented followed a structured hierarchy inspired by Curtis’s system. Tokens are organized into Horizontal Groups (core, semantic, component), with Namespace, Object, Base, and Modifier categories that streamline navigation across design, code, and documentation tools. This clear naming approach has allowed our teams to adopt tokens more easily and improved overall consistency in UI design.

![PaperCut Tokens System - naming taxonomy](/assets/portfolio/papercut-design-tokens/tokens-1.jpg "PaperCut Tokens System - naming taxonomy")
*PaperCut Tokens System - naming taxonomy*

#### 2. Source of Truth
Managing a centralized source of truth for tokens is crucial for seamless integration and consistency. Initially created in Figma, tokens are validated and stored in a dedicated repository, then transformed using Style Dictionary and published to Storybook and our internal NPM package manager. Figma Tokens serves as a bridge, allowing designers to work with components in Figma while handling complexity behind the scenes, thus enabling designers to remain focused on user-centric challenges.

![PaperCut Tokens System - source of truth](/assets/blog/design-tokens/cover.jpg 'PaperCut Tokens System - source of truth')
*PaperCut Tokens System - source of truth*

####  3. Token Storage & Distribution
Tokens are stored in three primary locations, with our Tokens Repository serving as the source of truth:

  - Design Tools (Figma): Styled as variables documented in the Foundations library
  - Tokens Studio (Figma Tokens): JSON format pulled from the `pcds-tokens` repository
  - pcds-tokens Repository: Manages storage, transformation, and publication of tokens for component libraries and development environments

### Solutions & Key Features
The design token system at PaperCut allows for rapid scalability and consistent styling across our products. This tiered approach to tokens supports UI theming and adaptation across React component libraries and has laid the groundwork for eventual expansion to other platforms, including mobile apps and embedded devices. By aligning brand, product, marketing, and engineering under one visual language, the token system fosters cross-team trust and reduces the friction often encountered during handoffs.

### Outcomes & Impact
The introduction of design tokens has positively impacted product development timelines by simplifying updates and enhancing consistency across branded interfaces. As a result, various teams, from Product Development to Marketing, can now adopt accessible colors, typography, and component layouts quickly. Our phased rollout has allowed for careful monitoring, enabling stakeholder confidence and allowing for easy scaling of the token system across other platforms and products in the future.

![PaperCut Design Tokens - adoption of tokens across the business is a difficult task](/assets/blog/design-tokens/tokens-1.jpg 'PaperCut Design Tokens - adoption of tokens across the business is a difficult task')

### Reflection & Learnings
Establishing PaperCut’s design token system has underscored the importance of centralized standards and the need for a clear, accessible taxonomy to enhance cross-functional collaboration. The project has strengthened my expertise in building scalable token systems and my ability to streamline complex design and development processes across large organizations.

### Next Steps
Future plans include expanding the design token system to support new platforms, such as embedded devices and mobile applications, and refining the integration between design-to-development token flows. These efforts will ensure PaperCut’s design system continues to evolve to meet user needs across our expanding digital ecosystem.