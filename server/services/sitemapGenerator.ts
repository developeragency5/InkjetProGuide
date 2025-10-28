import type { SitemapConfig } from "@shared/schema";
import type { IStorage } from "../storage";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Generates a sitemap XML string based on configuration and storage data
 * @param config - Sitemap configuration with flags for what to include
 * @param storage - Storage interface to fetch data
 * @param baseUrl - Base URL for the site (e.g., https://example.com)
 * @returns XML string conforming to sitemap.org protocol
 */
export async function generateSitemap(
  config: SitemapConfig,
  storage: IStorage,
  baseUrl: string
): Promise<string> {
  const urls: SitemapUrl[] = [];
  const currentDate = new Date().toISOString().split('T')[0]; // Format: 2025-10-28
  
  // Remove trailing slash from baseUrl if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // Static pages - always included
  const staticPages = [
    { path: '/', priority: '1.0' },
    { path: '/products', priority: '0.9' },
    { path: '/about', priority: '0.7' },
    { path: '/contact', priority: '0.7' },
    { path: '/help', priority: '0.8' },
    { path: '/cart', priority: '0.5' },
    { path: '/account', priority: '0.5' },
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${cleanBaseUrl}${page.path}`,
      lastmod: currentDate,
      changefreq: config.changefreq,
      priority: page.priority,
    });
  });

  // Include products if enabled
  if (config.includeProducts) {
    const products = await storage.getAllProducts();
    products.forEach(product => {
      urls.push({
        loc: `${cleanBaseUrl}/products/${product.slug}`,
        lastmod: currentDate,
        changefreq: config.changefreq,
        priority: config.priority.toString(),
      });
    });
  }

  // Include categories if enabled
  if (config.includeCategories) {
    const products = await storage.getAllProducts();
    // Get unique categories from products
    const uniqueCategories = new Set(products.map(p => p.category));
    const categories = Array.from(uniqueCategories);
    
    categories.forEach(category => {
      // Create URL-friendly slug from category name
      const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
      urls.push({
        loc: `${cleanBaseUrl}/products/category/${categorySlug}`,
        lastmod: currentDate,
        changefreq: config.changefreq,
        priority: '0.8',
      });
    });
  }

  // Include content pages if enabled
  if (config.includePages) {
    const contentPages = await storage.getAllContentPages();
    contentPages
      .filter(page => page.isPublished)
      .forEach(page => {
        urls.push({
          loc: `${cleanBaseUrl}/${page.slug}`,
          lastmod: currentDate,
          changefreq: config.changefreq,
          priority: config.priority.toString(),
        });
      });
  }

  // Generate XML
  return generateSitemapXml(urls);
}

/**
 * Generates XML string from sitemap URLs
 * @param urls - Array of sitemap URL objects
 * @returns Valid sitemap XML string
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlEntries = urls.map(url => {
    return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
}

/**
 * Escapes special XML characters
 * @param str - String to escape
 * @returns Escaped string safe for XML
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
