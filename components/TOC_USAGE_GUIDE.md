# Table of Contents (TOC) Usage Guide

## Overview
Reusable TOC component jo easily kisi bhi tool mein add ho sakta hai without code duplication.

## Installation Steps

### 1. Import Component
```tsx
import TableOfContents, { TOCSection } from '../TableOfContents';
```

### 2. Define TOC Sections
Component ke andar (useState ke baad) sections define karein:

```tsx
const tocSections: TOCSection[] = [
  {
    id: 'examples',              // Section ka ID (scroll target)
    emoji: '📝',                 // Display emoji
    title: 'Examples',           // Button title
    subtitle: 'Sample use',      // Subtitle text
    gradientFrom: 'from-blue-50',   // Tailwind gradient start
    gradientTo: 'to-indigo-50',     // Tailwind gradient end
    hoverBorder: 'border-indigo-400', // Hover border color
    hoverText: 'text-indigo-600'      // Hover text color
  },
  // Add more sections...
];
```

### 3. Add Section IDs
Har content section mein `id` aur `scroll-mt-24` class add karein:

```tsx
<div id="examples" className="bg-white rounded-2xl shadow-xl p-6 mb-8 scroll-mt-24">
  <h2>Quick Examples</h2>
  {/* Content */}
</div>
```

### 4. Use Component
Calculator ke baad aur content sections se pehle add karein:

```tsx
{/* After calculator */}
<TableOfContents sections={tocSections} />

{/* Content sections */}
<div id="examples" className="...scroll-mt-24">...</div>
```

## Schema.org Integration

Tool ke metadata mein WebPage schema add karein for SEO:

```typescript
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Tool Name - Description",
  "url": "https://zurawebtools.com/tool-slug",
  "hasPart": [
    { "@type": "WebPageElement", "name": "Section 1", "url": "...#section-id-1" },
    { "@type": "WebPageElement", "name": "Section 2", "url": "...#section-id-2" },
    // Match with TOC sections
  ]
};

scriptTag.textContent = JSON.stringify([schema, webPageSchema]);
```

## Available Gradient Colors

### Blue Theme
```tsx
gradientFrom: 'from-blue-50', gradientTo: 'to-indigo-50'
hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600'
```

### Purple Theme
```tsx
gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50'
hoverBorder: 'border-purple-400', hoverText: 'text-purple-600'
```

### Green Theme
```tsx
gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50'
hoverBorder: 'border-green-400', hoverText: 'text-green-600'
```

### Orange Theme
```tsx
gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50'
hoverBorder: 'border-orange-400', hoverText: 'text-orange-600'
```

### Cyan Theme
```tsx
gradientFrom: 'from-cyan-50', gradientTo: 'to-blue-50'
hoverBorder: 'border-cyan-400', hoverText: 'text-cyan-600'
```

### Red Theme
```tsx
gradientFrom: 'from-red-50', gradientTo: 'to-rose-50'
hoverBorder: 'border-red-400', hoverText: 'text-red-600'
```

### Violet Theme
```tsx
gradientFrom: 'from-violet-50', gradientTo: 'to-purple-50'
hoverBorder: 'border-violet-400', hoverText: 'text-violet-600'
```

### Teal Theme
```tsx
gradientFrom: 'from-teal-50', gradientTo: 'to-cyan-50'
hoverBorder: 'border-teal-400', hoverText: 'text-teal-600'
```

### Yellow Theme
```tsx
gradientFrom: 'from-yellow-50', gradientTo: 'to-amber-50'
hoverBorder: 'border-yellow-400', hoverText: 'text-yellow-600'
```

## Recommended Section Structure

Common sections for most tools:

1. **Examples** (📝) - Sample calculations
2. **Benefits** (⭐) - Why use this tool
3. **How to Use** (📖) - Step-by-step guide
4. **Use Cases** (💡) - Common scenarios
5. **About** (ℹ️) - Understanding the concept
6. **Resources** (🔗) - External links
7. **FAQ** (❓) - Common questions

## Complete Example

```tsx
import React, { useState } from 'react';
import TableOfContents, { TOCSection } from '../TableOfContents';

const MyTool: React.FC<MyToolProps> = ({ navigateTo }) => {
  // ... state declarations

  const tocSections: TOCSection[] = [
    {
      id: 'examples',
      emoji: '📝',
      title: 'Examples',
      subtitle: 'Try these',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'guide',
      emoji: '📖',
      title: 'Guide',
      subtitle: 'How to use',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQ',
      subtitle: 'Get answers',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12 px-4">
      <style>{`html { scroll-behavior: smooth; }`}</style>
      
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1>Tool Title</h1>
        </div>

        {/* Tool Calculator */}
        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 mb-8 scroll-mt-24">
          {/* Tool UI */}
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Content Sections */}
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 mb-8 scroll-mt-24">
          <h2>Examples</h2>
          {/* Content */}
        </div>

        <div id="guide" className="bg-white rounded-2xl shadow-xl p-6 mb-8 scroll-mt-24">
          <h2>How to Use</h2>
          {/* Content */}
        </div>

        <div id="faq" className="bg-white rounded-2xl shadow-xl p-6 mb-8 scroll-mt-24">
          <h2>FAQ</h2>
          {/* Content */}
        </div>

        {/* Related Tools */}
        <RelatedTools currentSlug="tool-slug" relatedSlugs={[...]} navigateTo={navigateTo} />
      </div>
    </div>
  );
};
```

## SEO Benefits

✅ **Rich Results Eligibility** - TOC increases chances of featured snippets  
✅ **Better CTR** - Jump links in search results (15-25% CTR boost)  
✅ **Improved UX** - Easy navigation increases time on page  
✅ **Mobile Friendly** - Responsive grid adapts to all screen sizes  
✅ **Schema Markup** - Proper structured data for search engines  

## Testing Checklist

- [ ] Smooth scroll working (no glitches)
- [ ] All section IDs match TOC config
- [ ] Mobile responsive (2 cols → 3 → 4)
- [ ] Hover effects working
- [ ] Schema.org hasPart array matches sections
- [ ] scroll-mt-24 on all content sections
- [ ] html { scroll-behavior: smooth; } CSS added

## Migration Path

**Existing Tools ke liye:**

1. TableOfContents component import karein
2. tocSections array define karein
3. Purana TOC HTML replace karein with `<TableOfContents sections={tocSections} />`
4. Section IDs verify karein
5. Test karein mobile aur desktop par

**Code reduction:** ~60 lines → 2 lines per tool!
