---
title: 'How to safely deprecate Design Tokens using Style Dictionary'
tag: 'design'
labels: ["Design systems", "Design Tokens", "Style Dictionary"]
excerpt: 'One of the many challenges with maintaining a sizable Design Token library used by multiple products and formats, is what happens when you want to remove a design token.'
coverImage: '/assets/blog/deprecating-design-tokens/cover.jpg'
date: '2024-11-12T05:35:07.322Z'
author:
  name: 'Ollie Macky'
  picture: '/assets/blog/authors/co-author.png'
ogImage:
  url: '/assets/blog/deprecating-design-tokens/cover.jpg'
---

## Understanding the risks of removing Design Tokens

One of the many challenges with maintaining a sizable Design Token library, is what happens when you want to remove a Design Token.

If you remove a Design Token from the library, and it’s no longer available downstream, any code referencing it will no longer work, and this could have serious implications.

In some cases, it's hard to find where the Design Tokens have been used, and if the organization has numerous repositories, it can be difficult to track this information down.

Aside from the obvious issue where it will break the UI, it significantly erodes trust in the your team and the Design System, and that's hard to get back once it's gone.

### Safety first
Employing versioning of your Design Token library is key to unlocking some safety measures when managing token migration. This allows users of the token library to revert to a previous version if you encounter issues you have inadvertently published, but maybe just as importantly, you can take token migration one step at a time.

#### Let's look at some key steps we can take:
1. **Setup** - Identify the tokens you are migrating and make sure you have defined the naming shape clearly so it doesn’t clash with your current naming structure.
2. **Add new tokens to the libary** - Add your new tokens to the library, whether it's in Figma as variables or the codebase as JSON.
3. **Publish!** - Publish your Design Tokens package so the new tokens are now available (alongside the old ones).
3. **Swap old for new** - Where the old tokens are used, say in your component library for instance, you can now start the migration. Find and replace the old tokens with the new ones.
4. **Check for any last instances** - Make sure that you have checked in all the places you can to swap over the old tokens to the new ones.
5. **Remove deprecated tokens from library** - Once the sunset period has ended for the tokens being replaced, it's time to remove them from the tokens library.

## Using Style Dictionary to communicate token state
In our stack, like many others, we are using [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to transform and process our Design Tokens into the various formats and languages we need. Using Style Dictionary, you can manage deprecated tokens effectively by adding custom attributes and then creating transforms or actions that handle them. 

This allows you to communicate and document what stage your token is at, whether it is in fact deprecated, and even insert some guidelines for the developer outlining the token to replace it with.

Here’s a couple of ideas for adding attributes to mark tokens as deprecated using Style Dictionary:
### 1. Add a "deprecated" attribute in your tokens JSON/YAML File
   In your token definition, you can add an attribute like `deprecated` to the token’s metadata. This will help Style Dictionary recognize and process deprecated tokens separately. Here’s an example:

   ```json
   {
     "color": {
       "primary": {
         "value": "#0077CC",
         "attributes": {
           "deprecated": true,
           "replacement": "color.brand.primary"
         }
       },
       "brand": {
         "primary": {
           "value": "#0055AA"
         }
       }
     }
   }
   ```

   In this example, `color.primary` is marked as deprecated, and an attribute `replacement` is added to indicate the suggested replacement.

### 2. Create a custom filter for deprecated token 

   To target deprecated tokens in your build, you can create a custom filter in your Style Dictionary configuration. This filter will identify tokens with the `deprecated` attribute:

   ```javascript
   const StyleDictionary = require("style-dictionary");

   StyleDictionary.registerFilter({
     name: 'isDeprecated',
     matcher: function (token) {
       return token.attributes && token.attributes.deprecated === true;
     }
   });
   ```

   With this filter, you can generate separate outputs or reports that specifically list deprecated tokens.

### 3. Define custom transform or format to highlight deprecation

   You can create a custom format that highlights or documents deprecated tokens. For instance, you could prefix them with "⚠️ DEPRECATED" in comments:

   ```javascript
   StyleDictionary.registerFormat({
     name: 'json/deprecatedTokens',
     formatter: function (dictionary) {
       return JSON.stringify(
         dictionary.allProperties.filter((token) => token.attributes && token.attributes.deprecated),
         null,
         2
       );
     }
   });
   ```

   This format will generate a JSON output with only deprecated tokens. You can then use this file for tracking or creating migration documentation.

### 4. Apply the filter and format in your build config

   In your `style-dictionary.config.js`, apply the `isDeprecated` filter and `json/deprecatedTokens` format to generate a separate file listing deprecated tokens:

   ```javascript
   module.exports = {
     source: ["path/to/tokens/**/*.json"],
     platforms: {
       deprecated: {
         transformGroup: "js",
         buildPath: "build/tokens/",
         files: [
           {
             destination: "deprecated-tokens.json",
             format: "json/deprecatedTokens",
             filter: "isDeprecated"
           }
         ]
       }
     }
   };
   ```

### 5. Use actions to alert or log deprecated tokens

   You can also set up custom actions in Style Dictionary to output warnings or log deprecated tokens during the build process:

   ```javascript
   StyleDictionary.registerAction({
     name: "logDeprecated",
     do: (dictionary) => {
       dictionary.allProperties.forEach((token) => {
         if (token.attributes && token.attributes.deprecated) {
           console.warn(`Token "${token.name}" is deprecated. Use "${token.attributes.replacement}" instead.`);
         }
       });
     },
     undo: () => {}
   });
   ```

   Add the `logDeprecated` action to your build pipeline, and it will warn about deprecated tokens each time you run the build.

### Let's recap

If you and/or your team are using Style Dictionary to format your Design Tokens, these are some solid options you could try to help maintain your code cleanly, and migrate tokens transparently for your end users.

1. **Add a `deprecated` attribute** to tokens in the source file.
2. **Create a filter** to target deprecated tokens.
3. **Define custom formats** to document or highlight deprecated tokens.
4. **Set up custom actions** to log or alert about deprecated tokens.

This setup keeps your token library clean and helps ensure deprecated tokens are documented and tracked for future updates!
