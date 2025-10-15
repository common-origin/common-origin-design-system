---
title: 'How we used MUI to create a High Contrast theme'
tag: 'design'
labels: ["Design systems", "Theming", "Tokens", "Material MUI"]
excerpt: 'We set out to expand our Design System component library beyond the default theme, by creating a high-contrast theme for users with vision impairments.'
coverImage: '/assets/blog/mui-theming/cover.jpg'
date: '2024-10-21T05:35:07.322Z'
author:
  name: 'Ollie Macky'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/blog/mui-theming/cover.jpg'
---

## Implementing a High-Contrast Theme in Our Design System

This week, we successfully added a high-contrast theme to our Design System. The journey began with fixing a long-standing issue: MUI theming wasn’t functioning as expected. Specifically, custom breakpoints from our design tokens weren’t adjusting at the correct viewport widths, which was odd considering everything else was working smoothly.

Although the issue had been on our radar for a while, it wasn’t a priority since we hadn't needed anything beyond the default theme—until now.

The fix itself was relatively simple. It turned out that the way we were implementing the `ThemeProvider` wrapper had become incompatible with our current Storybook version. After a quick update, everything started working as intended.

This fix was part of *Constructival*, a yearly hackathon at PaperCut. It was my first time participating, and I saw it as the perfect opportunity to explore how our system could evolve. With just two days to experiment, it was a refreshing break from the typical focus on supporting business goals, bug fixes, and sprint priorities. Hackathons allow us to step back and think about new ideas and features that might otherwise be out of reach.

The challenge was exciting: develop a high-contrast UI theme for our component library to enhance accessibility for users with vision impairments, like blurred vision. This theme would be available for all PaperCut products using our component library but is primarily aimed at improving end-user interfaces.

## Why this matters:  
Globally, 2.2 billion people have some form of visual impairment, including common conditions like myopia, presbyopia, and cataracts. Many users with visual impairments face difficulties with:

- Low-contrast UIs that are hard to read
- Small or unclear text and icons
- Navigating interfaces due to subtle color contrasts

Our high-contrast theme addresses these issues by improving text-background contrast, enhancing readability, and making navigation clearer—all while maintaining design consistency through tokens.

Companies like Microsoft, Apple, and Google already offer high-contrast modes to improve accessibility (e.g., Windows' High-Contrast mode and macOS/iOS's Increased Contrast settings). Our goal was to demonstrate how our Design System could enhance user experiences in a similar way.

## Key Takeaways from the Project:
- **Speed:** We tested how quickly we could deliver value with the system in a short timeframe.
- **Accessibility at Scale:** We explored the broader impact our Design System can have in making our products accessible to users with impairments.
- **Stakeholder Buy-In:** This project allowed us to show stakeholders that our Design System is maturing and delivering on its investment by solving real-world problems.

## The technical side:
The proof of concept was to build and publish the theme using design tokens, which then define the MUI theme. Since our MUI theming hadn’t been fully functional, we had primarily been styling components using our custom design tokens library and Emotion Styled.

To get started, I created a new theme in Figma, building on some recent product layouts. I introduced a new mode in Figma variables called `highContrast`, adjusting the values to ensure strong contrast without overwhelming the design. We focused more on enhancing contrast than changing colors, sticking to one palette and darkening status colors for better legibility.

Once the design looked good, it was time to manually update our tokens library with the new values (we haven’t fully streamlined our token flow from design to development yet). After the tokens were published, we updated the npm package for `pcds-react` and began building the high-contrast MUI theme.

Our token library isn’t tied one-to-one with MUI’s theming system because we wanted to keep it platform-agnostic. This gives us the flexibility to switch frameworks or even expand to native mobile apps if needed. However, our tokens still worked well with MUI, and I created a new `highContrast` theme using the recently published tokens. The MUI theme switching mechanism made testing the new theme seamless.

## Next Steps:
We'll soon be testing the high-contrast theme on one of our end-user portals built with our component library. If all goes well, we plan to release it to end-users by the end of October.