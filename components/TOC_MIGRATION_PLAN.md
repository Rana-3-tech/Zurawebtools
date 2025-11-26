# TOC Migration Plan - All Tools

## ✅ Completed
- [x] CollegeGPACalculator.tsx - Full TOC with 7 sections

## 🎯 High Priority (Education/Exam Tools)

### 1. BerkeleyGPACalculator.tsx
**Status:** ⏳ Pending  
**Sections to Add:**
```typescript
const tocSections: TOCSection[] = [
  {
    id: 'calculator',
    emoji: '🎓',
    title: 'Calculator',
    subtitle: 'Calculate GPA',
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-indigo-50',
    hoverBorder: 'border-indigo-400',
    hoverText: 'text-indigo-600'
  },
  {
    id: 'examples',
    emoji: '📝',
    title: 'Examples',
    subtitle: 'Sample GPAs',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    hoverBorder: 'border-green-400',
    hoverText: 'text-green-600'
  },
  {
    id: 'benefits',
    emoji: '⭐',
    title: 'Benefits',
    subtitle: 'Why Berkeley',
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-pink-50',
    hoverBorder: 'border-purple-400',
    hoverText: 'text-purple-600'
  },
  {
    id: 'how-to-use',
    emoji: '📖',
    title: 'How to Use',
    subtitle: 'Step-by-step',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-amber-50',
    hoverBorder: 'border-orange-400',
    hoverText: 'text-orange-600'
  },
  {
    id: 'use-cases',
    emoji: '💡',
    title: 'Use Cases',
    subtitle: 'Common scenarios',
    gradientFrom: 'from-cyan-50',
    gradientTo: 'to-blue-50',
    hoverBorder: 'border-cyan-400',
    hoverText: 'text-cyan-600'
  },
  {
    id: 'faq',
    emoji: '❓',
    title: 'FAQs',
    subtitle: 'Get answers',
    gradientFrom: 'from-violet-50',
    gradientTo: 'to-purple-50',
    hoverBorder: 'border-violet-400',
    hoverText: 'text-violet-600'
  }
];
```

**Required Changes:**
1. Add `import TableOfContents, { TOCSection } from '../TableOfContents';`
2. Add tocSections array in component
3. Add `<TableOfContents sections={tocSections} />` after main calculator
4. Add `scroll-mt-24` class to all section divs
5. Add `<style>{html { scroll-behavior: smooth; }}</style>`

---

### 2. ISACGPA.tsx
**Status:** ⏳ Pending  
**Sections to Add:**
```typescript
const tocSections: TOCSection[] = [
  {
    id: 'calculator',
    emoji: '🎓',
    title: 'Calculator',
    subtitle: 'ISAC GPA',
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
    id: 'about',
    emoji: 'ℹ️',
    title: 'About ISAC',
    subtitle: 'Understanding',
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-pink-50',
    hoverBorder: 'border-purple-400',
    hoverText: 'text-purple-600'
  },
  {
    id: 'faq',
    emoji: '❓',
    title: 'FAQs',
    subtitle: 'Common questions',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-amber-50',
    hoverBorder: 'border-orange-400',
    hoverText: 'text-orange-600'
  }
];
```

---

### 3. SATScoreCalculator.tsx
**Status:** ⏳ Pending  
**Sections to Add:**
```typescript
const tocSections: TOCSection[] = [
  {
    id: 'calculator',
    emoji: '📊',
    title: 'Calculator',
    subtitle: 'SAT Score',
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-indigo-50',
    hoverBorder: 'border-indigo-400',
    hoverText: 'text-indigo-600'
  },
  {
    id: 'score-ranges',
    emoji: '📈',
    title: 'Score Ranges',
    subtitle: 'Understanding',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    hoverBorder: 'border-green-400',
    hoverText: 'text-green-600'
  },
  {
    id: 'guide',
    emoji: '📖',
    title: 'Guide',
    subtitle: 'How to use',
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-pink-50',
    hoverBorder: 'border-purple-400',
    hoverText: 'text-purple-600'
  },
  {
    id: 'tips',
    emoji: '💡',
    title: 'Tips',
    subtitle: 'Improve score',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-amber-50',
    hoverBorder: 'border-orange-400',
    hoverText: 'text-orange-600'
  },
  {
    id: 'faq',
    emoji: '❓',
    title: 'FAQs',
    subtitle: 'Get answers',
    gradientFrom: 'from-cyan-50',
    gradientTo: 'to-blue-50',
    hoverBorder: 'border-cyan-400',
    hoverText: 'text-cyan-600'
  }
];
```

---

## 📝 Text Processing Tools

### 4. WordCounter.tsx
**Status:** ⏳ Pending  
**Existing Sections:** Has FAQ section
**Add TOC Sections:**
- 📊 Counter (id: counter)
- ✨ Features (id: features)
- 📖 How to Use (id: how-to)
- ❓ FAQ (id: faq) ✅ Already exists

---

### 5. CaseConverter.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🔤 Converter (id: converter)
- 📖 How to Use (id: how-to)
- 💡 Use Cases (id: use-cases)
- ❓ FAQ (id: faq)

---

### 6. RemoveExtraSpaces.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- ✂️ Tool (id: tool)
- 📖 Guide (id: guide)
- ❓ FAQ (id: faq)

---

### 7. LoremIpsumGenerator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 📝 Generator (id: generator)
- 📖 How to Use (id: how-to)
- 💡 Use Cases (id: use-cases)

---

## 🎨 Color & Design Tools

### 8. HexToRGBConverter.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🎨 Converter (id: converter)
- 📖 Guide (id: guide)
- 💡 Examples (id: examples)

---

### 9. ShadowCSSGenerator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- ✨ Generator (id: generator)
- 📖 How to Use (id: how-to)
- 💡 Presets (id: presets)

---

### 10. AccessibleColorContrastChecker.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🎨 Checker (id: checker)
- ♿ Guidelines (id: guidelines)
- 📖 How to Use (id: how-to)

---

### 11. ColorHarmonyChecker.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🌈 Checker (id: checker)
- 🎨 Harmony Types (id: harmony)
- ❓ FAQ (id: faq)

---

## 🔧 Developer Tools

### 12. JSONFormatterValidator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🔧 Tool (id: tool)
- 📖 Features (id: features)
- 💡 Use Cases (id: use-cases)

---

### 13. CodeSimilarityChecker.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🔍 Checker (id: checker)
- 📊 Metrics (id: metrics)
- 📖 Guide (id: guide)

---

## 🧮 Calculation Tools

### 14. PercentageChangeCalculator.tsx
**Status:** ⏳ Pending  
**Existing:** Has FAQ section
**Add TOC Sections:**
- 🧮 Calculator (id: calculator)
- 📖 How to Use (id: how-to)
- 💡 Examples (id: examples)
- ❓ FAQ (id: faq) ✅

---

### 15. TimeDifferenceCalculator.tsx
**Status:** ⏳ Pending  
**Existing:** Has FAQ section
**Add TOC Sections:**
- 📅 Calculator (id: calculator)
- 📖 How to Use (id: how-to)
- ❓ FAQ (id: faq) ✅

---

### 16. FillDirtCalculator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🏗️ Calculator (id: calculator)
- 📖 Guide (id: guide)
- 💡 Tips (id: tips)

---

### 17. PowerToMassRatioCalculator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- ⚡ Calculator (id: calculator)
- 📖 Understanding (id: about)
- 💡 Applications (id: applications)

---

## 🎵 Specialty Tools

### 18. AudiobookSpeedCalculator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🎧 Calculator (id: calculator)
- 📖 How to Use (id: how-to)
- 💡 Tips (id: tips)

---

### 19. ReverbCalculator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🎵 Calculator (id: calculator)
- 📖 Understanding (id: about)
- ⚙️ Parameters (id: parameters)

---

### 20. QuiltBackingCalculator.tsx
**Status:** ⏳ Pending  
**Add TOC Sections:**
- 🧵 Calculator (id: calculator)
- 📖 Guide (id: guide)
- 💡 Tips (id: tips)

---

### 21. FabricCostingTool.tsx
**Status:** ⏳ Pending  
**Existing:** Has How to Use and FAQ
**Add TOC Sections:**
- 🧶 Tool (id: tool)
- 📖 How to Use (id: how-to) ✅
- 💡 Examples (id: examples)
- ❓ FAQ (id: faq) ✅

---

### 22. SnowDayCalculator.tsx
**Status:** ⏳ Pending  
**Existing:** Has How to Use and FAQ sections
**Add TOC Sections:**
- ❄️ Calculator (id: calculator)
- 📖 How to Use (id: how-to) ✅
- 🎯 Accuracy (id: accuracy)
- ❓ FAQ (id: faq) ✅

---

## 📋 Implementation Checklist

For each tool, follow these steps:

### Step 1: Import Component
```typescript
import TableOfContents, { TOCSection } from '../TableOfContents';
```

### Step 2: Define TOC Sections
Add inside component (after state declarations):
```typescript
const tocSections: TOCSection[] = [
  // ... sections from above
];
```

### Step 3: Add Smooth Scroll CSS
Add in JSX return (after opening div):
```tsx
<style>{`
  html {
    scroll-behavior: smooth;
  }
`}</style>
```

### Step 4: Add TOC Component
Place after main calculator/tool interface:
```tsx
{/* Table of Contents */}
<TableOfContents sections={tocSections} />
```

### Step 5: Add Section IDs
For each content section:
```tsx
<div id="section-id" className="... scroll-mt-24">
  <h2>Section Title</h2>
  {/* Content */}
</div>
```

### Step 6: Update Schema.org (if exists)
If tool has WebPage schema, add hasPart:
```typescript
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Tool Name",
  "url": "https://zurawebtools.com/tool-slug",
  "hasPart": [
    { "@type": "WebPageElement", "name": "Section 1", "url": "...#section-id-1" },
    { "@type": "WebPageElement", "name": "Section 2", "url": "...#section-id-2" },
    // Match TOC sections
  ]
};
```

---

## 🎯 Priority Order

**Week 1:** GPA Tools (3 tools)
- BerkeleyGPACalculator
- ISACGPA  
- SATScoreCalculator

**Week 2:** Popular Tools (5 tools)
- WordCounter
- JSONFormatterValidator
- CaseConverter
- RemoveExtraSpaces
- LoremIpsumGenerator

**Week 3:** Color & Developer Tools (6 tools)
- HexToRGBConverter
- ShadowCSSGenerator
- AccessibleColorContrastChecker
- ColorHarmonyChecker
- CodeSimilarityChecker

**Week 4:** Calculation & Specialty Tools (9 tools)
- PercentageChangeCalculator
- TimeDifferenceCalculator
- FillDirtCalculator
- PowerToMassRatioCalculator
- AudiobookSpeedCalculator
- ReverbCalculator
- QuiltBackingCalculator
- FabricCostingTool
- SnowDayCalculator

---

## 📊 Progress Tracker

**Total Tools:** 23  
**Completed:** 1 (CollegeGPACalculator) ✅  
**Remaining:** 22  
**Progress:** 4.3%

**Target:** Complete all tools within 4 weeks for maximum SEO impact.

---

## 🚀 Expected SEO Benefits

After completing all tools:
- ✅ Consistent TOC navigation across entire site
- ✅ 15-25% CTR boost from rich results
- ✅ Better time on page (easier navigation)
- ✅ Featured snippet eligibility for all tools
- ✅ Improved mobile UX
- ✅ Professional, polished user experience
- ✅ Schema.org compliance for Google

---

## 💡 Tips for Fast Implementation

1. **Copy-paste pattern** from CollegeGPACalculator
2. **Adjust emoji and colors** per tool theme
3. **Match section IDs** with existing content
4. **Test smooth scroll** after each tool
5. **Verify mobile responsive** (320px to 1920px)
6. **Check schema validation** in Google's Rich Results Test
7. **Commit frequently** with clear messages

---

## 🔗 Resources

- **Component:** `components/TableOfContents.tsx`
- **Usage Guide:** `components/TOC_USAGE_GUIDE.md`
- **Example:** `components/tools/CollegeGPACalculator.tsx`
- **Color Themes:** See TOC_USAGE_GUIDE.md "Available Gradient Colors"
