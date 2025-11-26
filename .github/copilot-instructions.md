# ZuraWebTools AI Coding Instructions

## Project Overview
ZuraWebTools is a React + TypeScript SPA providing free web tools (text processing, calculators, color utilities, developer tools). Built with Vite, Tailwind CSS v4, and deployed as a static site with SEO-first architecture.

## Architecture

### Client-Side Routing (No React Router)
- **Custom routing** via `window.history.pushState()` in `App.tsx`
- All components receive `navigateTo: (page: Page) => void` prop for navigation
- Route matching happens in `App.tsx` `renderPage()` function
- Pattern: `navigateTo('/tool-slug')` triggers history state change + re-render

**Adding a new route:**
1. Add route match in `App.tsx` `renderPage()`:
   ```tsx
   if (path === 'your-tool-slug') {
       return <YourTool navigateTo={navigateTo} />;
   }
   ```
2. Update tool registration in `data/tools.tsx`

### Data Architecture
- **Central tool registry:** `data/tools.tsx` exports `toolCategories: Category[]`
- **Blog posts:** `data/posts.tsx` exports `posts: Post[]`
- **Type definitions:** Import `Tool`, `Category` from `data/tools.tsx` (NOT `components/types.ts`)
- All tools must be registered in `toolCategories` to appear in navigation/listings

## Tool Development Pattern

### Standard Tool Component Structure
```tsx
import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface YourToolProps {
  navigateTo: (page: Page) => void;
}

const YourTool: React.FC<YourToolProps> = ({ navigateTo }) => {
  // SEO setup in useEffect
  useEffect(() => {
    document.title = "Tool Name - Description | ZuraWebTools";
    // Set meta tags, Open Graph, Twitter Card, Schema.org JSON-LD
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Tool UI */}
      <RelatedTools currentToolPath="/your-tool-slug" navigateTo={navigateTo} />
    </div>
  );
};

export default YourTool;
```

### SEO Requirements (Critical)
Every tool component MUST set in `useEffect`:
- `document.title` with descriptive, keyword-rich title
- Meta description (150-160 chars)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Canonical link (`<link rel="canonical">`)
- Structured data (JSON-LD) with `@type: "WebPage"` and `@type: "SoftwareApplication"`

**Example meta implementation:** See `components/tools/JSONFormatterValidator.tsx` lines 17-92

## Styling & UI Conventions

### Tailwind CSS v4
- Uses PostCSS plugin (`@tailwindcss/postcss`)
- Custom brand colors: `text-brand-blue` (defined in PostCSS config)
- Gradient backgrounds: `bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50`
- Tool cards use inline gradient styles via `gradientColors: { from, to }` prop

### Icon Pattern
SVG icons defined inline with:
- `<linearGradient>` for colorful gradients
- Unique `id` attributes (e.g., `toolGrad1`, `toolGrad2`)
- ARIA labels (`aria-labelledby`, `<title>`)

## Environment & Build

### Development
```bash
npm run dev          # Starts Vite dev server on localhost:3000
```

### API Key Configuration
- Gemini API key required for AI features (e.g., WordCounter readability analysis)
- Set `GEMINI_API_KEY` in `.env.local` (not committed)
- Vite config injects as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`
- Usage: `new GoogleGenAI({ apiKey: process.env.API_KEY as string })`

### Build & Deploy
```bash
npm run build        # Outputs to dist/ folder (static site)
npm run preview      # Preview production build locally
```

**Deployment:** Static site, deploy `dist/` to any CDN/hosting (Netlify, Vercel, etc.)

## Special Utilities

### IndexNow Integration (`utils/indexNow.ts`)
- Auto-notifies search engines when pages are updated
- **Usage:** Call `notifyIndexNow('/tool-slug')` after tool page loads
- Skips in development (localhost check)
- Rate-limited per session (uses `Set<string>`)

### Sitemap Generation (`scripts/generate-sitemap.ts`)
- **Manual run:** `npx ts-node-esm scripts/generate-sitemap.ts`
- Outputs `sitemap.xml` with all static pages, categories, tools, and blog posts
- Auto-imports tool/post data from `data/` files

## Key Files Reference

- **`App.tsx`**: Main routing logic, search functionality, page rendering
- **`data/tools.tsx`**: Tool registry with categories, icons, descriptions
- **`data/posts.tsx`**: Blog post content (React components in `content` field)
- **`vite.config.ts`**: Build config with code splitting (`vendor` + `tools` chunks)
- **`components/ToolCard.tsx`**: Reusable tool card with gradient styling
- **`components/Header.tsx`**: Navigation with dropdown for tool categories

## Common Tasks

### Adding a New Tool
1. Create component in `components/tools/YourTool.tsx` following tool pattern
2. Add route in `App.tsx` `renderPage()` function
3. Register in `data/tools.tsx` under appropriate category
4. Import component in `App.tsx` imports section
5. Create icon SVG with gradient (follow existing icon patterns)
6. Add SEO metadata in component `useEffect`
7. Test navigation and mobile responsiveness

### Adding a New Category
1. Update `toolCategories` array in `data/tools.tsx`
2. Create category icon SVG component
3. Add route handler in `App.tsx` for category page (handled by `CategoryPage` component)

### Debugging Tips
- **Route not working?** Check `App.tsx` `renderPage()` has exact path match
- **Tool not appearing in lists?** Verify registration in `data/tools.tsx`
- **SEO tags not showing?** Check browser DevTools → Elements → `<head>`
- **API errors in prod?** Ensure `.env.local` has valid `GEMINI_API_KEY`

## Code Style
- Use functional components with TypeScript
- Props interfaces: `YourComponentProps` with explicit types
- Avoid inline styles except for gradient backgrounds
- Use semantic HTML with ARIA labels for accessibility
- Keep components under 600 lines (split into sub-components if larger)
