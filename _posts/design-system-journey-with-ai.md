---
title: 'Design System journey with AI'
tag: 'design'
labels: ["Design systems", "Theming", "Tokens"]
excerpt: 'A deep dive into building a scalable, accessible, and token-driven design system—covering tokens, icons, styles, architecture, documentation, testing, accessibility, and key learnings from the journey.'
coverImage: '/assets/blog/mui-theming/cover.jpg'
date: '2025-09-15T00:00:00.000Z'
author:
  name: 'Ollie Macky'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/blog/mui-theming/cover.jpg'
---

## 1. Design tokens: the foundation

- **Establishing a single source of truth:**  
  Together, we created a unified token system for all design values—spacing, color, and typography. This eliminated inconsistencies and made it easy for us to update the look and feel of the product from one place.

- **Organizing for scalability:**  
  We structured tokens into `base`, `component`, and `semantic` groups, with a clear directory layout. This organization made it simple for us to add new tokens and ensured the system could grow with our needs.

- **Automating consistency with Style Dictionary:**  
  By integrating Style Dictionary, we automated the transformation and export of tokens to CSS, JSON, and TypeScript. This guaranteed that every part of our system—code, styles, and documentation—used the same values, reducing errors and manual work.

- **Ensuring type safety and reliability:**  
  We added TypeScript definitions and validation scripts to catch mistakes early and provide autocompletion. This improved our confidence and reduced bugs related to token usage.

- **Driving adoption through refactoring:**  
  We systematically updated all components to use tokens instead of hardcoded values or utility classes. This migration improved maintainability and made it possible for us to implement theming and design updates rapidly across the system.

- **Supporting learning and onboarding:**  
  We created comprehensive documentation and live examples to help us understand and use tokens effectively, speeding up our own onboarding and collaboration.

## 2. Migrating to token-driven components and styled-components

- **Moving beyond utility classes:**  
  We transitioned away from Tailwind CSS to unlock greater flexibility and maintainability for our project. This shift allowed us to fully leverage our token system and avoid the limitations of utility-first styling.

- **Enabling dynamic, themeable components:**  
  By adopting styled-components, we empowered our components to use tokens dynamically and respond to props and themes. This made it easy for us to implement design changes and support multiple themes without rewriting styles.

- **Standardizing and future-proofing the codebase:**  
  Refactoring our core components to use tokens for all visual properties ensured consistency and made the codebase easier for us to maintain. This work laid the foundation for atomic design, advanced theming, and rapid iteration.


## 3. Establishing atomic design and component structure

- **Building for clarity and reuse:**  
  We adopted atomic design principles, organizing our components into `atoms`, `molecules`, and `organisms`. This structure made it easy for us to find, reuse, and extend components as our system grew.

- **Making navigation and maintenance effortless:**  
  We gave each component its own folder with clear entry points for code, tests, and (later) documentation. This consistency reduced our onboarding time and made the codebase approachable for us at any stage.

- **Streamlining imports and exports:**  
  By standardizing all index files to use `export * from './Component'`, we simplified imports and reduced the risk of missing or inconsistent exports across our project.

## 4. Building a scalable icon system with SVG path tokens

- **Centralising icons as SVG path tokens:**  
  We developed a system where all icons are defined as SVG path tokens in a central JSON file. This allows us to manage, update, and extend our icon library from a single source of truth.

- **Creating the Icon component:**  
  We built a flexible Icon component that consumes these SVG path tokens, rendering icons dynamically based on their name and supporting semantic sizing and colour. This was a major improvement over static SVG imports.

- **Benefits of the SVG path token approach:**  
  This system makes it easy for us to add or update icons without touching component code, ensures consistency across the design system, and enables advanced features like theming and accessibility. It also reduces bundle size by only including the icons we actually use.

- **Integrating icons throughout the system:**  
  With this approach, we can use icons in any component (such as Button, Dropdown, and more) simply by referencing their token name, making our UI more expressive and maintainable.

## 5. Implementing comprehensive component testing

- **Catching issues before they reach us:**  
  We introduced a robust testing strategy using Jest and React Testing Library. This ensured that every component was tested for rendering, props, and user interactions, catching bugs early and preventing regressions before they could affect our work.

- **Empowering safe and confident development:**  
  With dedicated `.test.tsx` files for each component, we could refactor and extend the system without fear of breaking existing functionality. The tests acted as a safety net and living documentation for expected behavior.

- **Supporting quality and reliability at scale:**  
  Comprehensive test coverage enabled us to rapidly iterate and scale our design system, while maintaining a high standard of quality and reliability for everything we built together.

## 6. Creating a unified component documentation system

- **Designing for clarity and discoverability:**  
  We recognised the need for clear, accessible documentation to make our design system truly usable. To solve this, we developed a custom documentation template for every component, ensuring that usage, props, and examples were always up to date and easy to find.

- **Automating with docgen and component data:**  
  We built a docgen system that extracts and structures documentation from each component into a consistent format. This data-driven approach powers our documentation pages, making it easy for us to update or extend documentation as the system evolves.

- **Bringing it all together in a live demo page:**  
  We created a comprehensive demo page that showcases every component, complete with live examples, prop tables, accessibility notes, and usage guidelines. This page is powered by our component data and docgen output, ensuring everything stays in sync.

- **Reusable documentation templates:**  
  Our documentation template is used in every component's `.docs.tsx` file, providing a consistent structure for examples, accessibility, and best practices. This makes it easy for us to add new components or update existing ones without reinventing the wheel.

## 7. Enhancing the system for a modern Next.js/Vercel stack

- **SEO and meta optimisation:**  
  We implemented a robust SEO and meta optimisation system, ensuring every page and component is discoverable and shareable. This is especially important for Next.js and Vercel deployments, where server-side rendering and static generation can maximise our reach and performance.

- **Error boundaries and error reporting:**  
  We added comprehensive error boundary utilities to catch and report errors gracefully. This improves reliability and makes debugging easier, both in development and in production on Vercel.

- **Performance monitoring and image optimisation:**  
  We introduced performance utilities and image preloading/optimisation, helping us deliver a faster, more responsive experience. These enhancements leverage Next.js features and Vercel's global CDN for optimal asset delivery.

- **Markdown and content utilities:**  
  We built markdown-to-HTML conversion and content helpers, making it easy to manage and render rich content throughout the system. This supports the dynamic content needs of a modern Next.js site.

- **Centralised configuration and style logic:**  
  We centralised configuration and style utilities, making it easier to manage global settings and style logic in one place—an essential practice for maintainable Next.js/Vercel projects.
