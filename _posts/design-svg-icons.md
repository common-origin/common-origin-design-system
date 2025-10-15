---
title: 'How to export seamless SVG Icons from Figma'
tag: 'design'
labels: ["Design systems", "Icons", "Figma"]
excerpt: 'Over recent years, it’s been quite a challenge to find a seamless method of designing and exporting Icons from Figma, so the end product in code to look exactly like the ones you designed. This article is about how I figured this all out, and how easy it is for you to do the same.'
coverImage: '/assets/blog/svg-icons/cover.jpg'
date: '2023-12-12T05:35:07.322Z'
author:
  name: 'Ollie Macky'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/blog/svg-icons/cover.jpg'
---

## What is the problem?

We have been in the process of creating the foundations for our Product Design System at PaperCut this year, and one of the key pillars to any UI, and Design System for that matter, is an Icon library.

After running a proof of concept design system last year for how this might work, from design to dev to production, it became clear that icons and how you connect both ends of the process was a lot harder to execute than I expected.

I love Figma as much as the next designer, but I have always found its SVG export process to be inaccurate. At times, it was hard to even figure out why the SVG was rendering the way it was after exporting, but as it goes with anything you can't figure out yourself, a little bit of research was required.

## Our requirements

Our approach had a few requirements that I think will need to be called out before I go into how we executed each step.

- All icon artwork needed to be converted into a single `<path>` string so it could be imported into an SVG Icon react component. Icons as tokens! (More about that later)
- Icons need to be flattened, meaning the SVG has no live strokes or shapes. This is to avoid unintended issues in browser behavior when scaling icons, while also giving us the freedom to use multiple sizes of the same icon element.
- We use the [Streamline library](https://www.streamlinehq.com/) for our icons, so these are imported into Figma from the Streamline plugin as an SVG.
- Removal of `clip-path` or `fill-rule` attributes from the SVG element is a must. This can cause more unintended issues in the way browsers display the icons. The values of these attributes determine which part of the icon is filled and which is transparent, and can be edited using a simple tool in Figma.
- As much as possible, we are trying to optimize for **speed**. Secondly, we want this process to be as simple as possible for Designers to run through on their own.

## How we did it

**1. Drop your SVG icon into your Figma file**

In your Figma file, open up (or run/add it if you haven't got it yet) the [Streamline plugin](https://www.figma.com/community/plugin/852192486284901337). You can drag and drop your icons directly from here into your layout. You should be able to adjust the settings in the plugin so you are importing it in the correct size, with the stroke already outlined.

![](/assets/blog/svg-icons/svg-icons-1.jpg 'Using Streamline for icons in Figma')

**2. Outline stroke, flatten**

Once you have your icon imported, double-check the stroke is outlined.

![](/assets/blog/svg-icons/svg-icons-2.jpg 'Checking for outlining of stroke in Figma')

Once confirmed, you want to flatten the icon by right clicking on the icon and selecting 'Flatten' from the menu, or using the *union* boolean operation to merge all of the layers into a single one.

![](/assets/blog/svg-icons/svg-icons-3.jpg 'Flatten the icon into one layer')

**3. Uncheck 'Clip content'**

There is quite a lot of extra code we can get rid of when exporting the SVG at this point. We want to remove any unnecessary groups, `<def>` tags, and in some cases `<clipPath>` elements used by Figma to create the *frame* that contains the icon. Uncheck the 'Clip content' checkbox when you have the icon frame highlighted. This will reduce the extra code that is exported with the SVG.

**4. Fixing the fill**

The last thing to do is remove the `fill-rule` and `clip-rule` attributes from the SVG. In my testing of this process, I could never really understand why there were irregularities and inconsistencies when a part of the icon that was supposed to be transparent, was filled or vice versa. This is because of how the algorithm is defined in the `fill-rule` attribute - ultimately this determines which is the inside part of an SVG shape. We want the value of the attribute to be `non-zero` which means your icon will export with the same appearance as you have designed it.

Thankfully there are a couple of plugins that can help speed up and simplify this process.

[Fill-rule Editor](https://www.figma.com/community/plugin/771155994770327940): this plugin allows you to remove any fill-rule instances where the value is `evenodd`, which causes the inconsistent appearances of SVGs mentioned above. All you need to do is simply click on the path that is filled, and this will reverse the direction of the arrows on that path, thus removing the filled area. Once you're done, just close the plugin and continue.

![](/assets/blog/svg-icons/svg-icons-4.jpg 'Using the Fill-rule Editor plugin to edit the icon’s fill')

[SVG Export](https://www.figma.com/community/plugin/814345141907543603): this amazing plugin uses SVGO under the hood for its optimization, similar to the website I have been using for this sort of work called [SVGOMG](jakearchibald.github.io/svgomg/). This is the last step in the process to remove any remaining `clip-rule` attributes and tidying up the code. It's great to have a play around with to see what this actually does to your SVG code.

![](/assets/blog/svg-icons/svg-icons-5.jpg 'Using SVG Export plugin to export icons from Figma')

## Icons as tokens

Once the icons have gone through the above process, we can now export the SVG. Occasionally, the exported SVG code has multiple paths, so the easy solution is to manually add them all to the same path so you end up with a single element holding all of the information. *Tip:* Make sure to add a space between the different paths you have added. 

You shouldn't see any difference in the appearance of the icon, and this means you can use the single string as a token. 

Once you have an icon as a token, it's really easy to import this into your Icon react component.
