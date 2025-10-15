# Simple SEO Usage Examples

## 🎯 How to Use (No SEO Skills Required)

### 1. **One-Time Setup** (lib/seoConfig.ts)
```typescript
export const SITE_CONFIG = {
  name: 'Common Origin',
  domain: 'commonorigin.dev', // ← Change this to your domain
  email: 'hello@commonorigin.dev', // ← Change this to your email
  twitter: '@commonorigin', // ← Change this to your Twitter (or remove line)
}
```

### 2. **Automatic Usage** (No work needed)

**For Release Pages:**
```tsx
// Before: Complex SEO setup
<SEOHead config={generateMusicReleaseSEO({...lots of config})} />

// After: Dead simple
<AutoSEO 
  title={release.title}
  description={release.excerpt}
  image={release.coverImage}
  type="music"
  path={`/releases/${release.slug}`}
/>
```

**For Portfolio Pages:**
```tsx
<AutoSEO 
  title={project.title}
  description={project.excerpt}
  image={project.coverImage}
  type="article"
  path={`/posts/${project.slug}`}
/>
```

**For Regular Pages:**
```tsx
// Music page
<AutoSEO title="Music Releases" path="/music" />

// Portfolio page  
<AutoSEO title="Design Portfolio" path="/portfolio" />

// Home page (uses all defaults)
<AutoSEO />
```

## 🤖 What Happens Automatically

### ✅ **Never Need to Manage:**
- Meta descriptions (generated from your content)
- Open Graph tags (auto-generated)
- Twitter Cards (auto-configured)
- Structured data (JSON-LD automatically created)
- Image optimization for social sharing
- Canonical URLs (auto-generated)
- Sitemap updates (when you add new content)
- Music-specific SEO tags

### ✅ **Content-Based SEO:**
- Release titles → Automatic SEO titles
- Cover images → Automatic social sharing images  
- Excerpts → Automatic meta descriptions
- Dates → Automatic sitemap priorities
- Artist names → Automatic keywords

### ✅ **Smart Defaults:**
- Missing description? → Auto-generated from content
- No image? → Uses default site image
- No excerpt? → Creates one from title + site info

## 📝 Content Guidelines (For Best SEO)

### **In Your Markdown Files:**
```markdown
---
title: 'Desire Path EP'  # ← Good descriptive title
excerpt: 'Five tracks exploring ambient soundscapes and organic textures'  # ← This becomes meta description
coverImage: '/assets/releases/desire-path.jpg'  # ← Social sharing image
artist: 'Cern'  # ← Artist info for SEO
date: '2023-12-01'  # ← For sitemap priority
---
```

### **What Makes Good SEO Content:**
- **Descriptive titles** (not just "New Release")
- **Compelling excerpts** (becomes meta description)
- **High-quality cover images** (for social sharing)
- **Consistent naming** (helps with search rankings)

## 🎛️ Advanced Options (Optional)

If you want more control later:

```tsx
<AutoSEO 
  title="Custom Page Title"
  description="Custom description for this specific page"
  image="/custom-image.jpg"
  noindex={true}  // Hide from search engines
  canonicalUrl="https://example.com/custom-canonical"  // Custom canonical
/>
```

## 🔧 Maintenance Required

### **One-Time Setup (5 minutes):**
1. Update `SITE_CONFIG` with your domain/email/social
2. Replace default OG image with your branded image
3. Done!

### **Ongoing (Automatic):**
- ✅ Add new releases → SEO automatically generated
- ✅ Add new portfolio items → SEO automatically generated  
- ✅ Update content → SEO automatically updates
- ✅ Sitemap → Updates automatically
- ✅ Social sharing → Works automatically

### **Never Need to Do:**
- Write meta descriptions for each page
- Configure Open Graph tags
- Set up Twitter Cards
- Manage structured data
- Update sitemaps
- Optimize social sharing images

## 🎯 Summary

**Before:** Complex SEO setup for each page
**After:** Add `<AutoSEO />` and it handles everything

**Maintenance:** ~5 minutes one-time setup, then 100% automatic

**SEO Knowledge Required:** None! Just write good content titles and descriptions.
