// FIX: Add a new file `scripts/generate-sitemap.ts` to automate sitemap creation.
import fs from 'fs';
import path from 'path';
// FIX: Import fileURLToPath to resolve __dirname in an ES module environment.
import { fileURLToPath } from 'url';

// Mock React to allow importing TSX files in a Node environment.
// This prevents errors from JSX syntax.
// FIX: Replace 'global' with 'globalThis' for broader compatibility.
(globalThis as any).React = {
    createElement: () => null,
};

// IMPORTANT: This script uses ES Modules (import/export).
// You need to run it with a tool that supports them, like ts-node-esm.
// Example command: `npx ts-node-esm scripts/generate-sitemap.ts`
// Ensure you have 'ts-node' and 'typescript' installed as dev dependencies.
import { toolCategories } from '../data/tools';
import { posts } from '../data/posts';

// FIX: Define __dirname for ES module scope, as it is not available by default.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = () => {
    const baseUrl = 'https://zurawebtools.com';
    const today = new Date().toISOString().split('T')[0];

    const staticPages = [
        { url: '', priority: '1.00', changefreq: 'daily' },
        { url: '/tools', priority: '0.90', changefreq: 'weekly' },
        { url: '/blog', priority: '0.80', changefreq: 'weekly' },
        { url: '/about', priority: '0.70', changefreq: 'monthly' },
        { url: '/contact', priority: '0.70', changefreq: 'monthly' },
        { url: '/privacy', priority: '0.50', changefreq: 'yearly' },
        { url: '/terms', priority: '0.50', changefreq: 'yearly' },
    ];

    const urls: string[] = [];

    // 1. Add static pages
    staticPages.forEach(page => {
        urls.push(`
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    });

    // 2. Add tool category pages
    toolCategories.forEach(category => {
        urls.push(`
  <url>
    <loc>${baseUrl}/${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`);
    });
    
    // 3. Add individual tool pages
    toolCategories.forEach(category => {
        category.tools.forEach(tool => {
            urls.push(`
  <url>
    <loc>${baseUrl}/${tool.link}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.90</priority>
  </url>`);
        });
    });

    // 4. Add blog post pages
    posts.forEach(post => {
        urls.push(`
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>`);
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

    const sitemapPath = path.resolve(__dirname, '../sitemap.xml');
    
    try {
        fs.writeFileSync(sitemapPath, sitemapContent.trim());
        console.log(`✅ Sitemap successfully generated at ${sitemapPath}`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
    }
};

generateSitemap();
