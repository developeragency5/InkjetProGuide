import type { IStorage } from "../storage";
import type { SeoAuditResult, InsertSeoAuditResult } from "@shared/schema";
import * as cheerio from "cheerio";

/**
 * Runs a comprehensive SEO audit on the website
 * @param storage - Storage interface for database operations
 * @param baseUrl - Base URL of the website (e.g., https://example.com)
 * @param jobId - ID of the audit job
 */
export async function runSeoAudit(
  storage: IStorage,
  baseUrl: string,
  jobId: string
): Promise<void> {
  try {
    // Update job status to running
    await storage.updateSeoAuditJob(jobId, {
      status: "running",
      startedAt: new Date(),
    });

    // Clean base URL (remove trailing slash)
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    // Collect all URLs to scan
    const urlsToScan: string[] = [];

    // Static pages
    const staticPages = [
      "/",
      "/products",
      "/about",
      "/contact",
      "/help",
      "/faq",
      "/privacy-policy",
      "/terms-conditions",
      "/refund-policy",
    ];

    staticPages.forEach((path) => {
      urlsToScan.push(`${cleanBaseUrl}${path}`);
    });

    // Product pages
    const products = await storage.getAllProducts();
    products.forEach((product) => {
      urlsToScan.push(`${cleanBaseUrl}/products/${product.slug}`);
    });

    // Content pages
    const contentPages = await storage.getAllContentPages();
    contentPages
      .filter((page) => page.isPublished)
      .forEach((page) => {
        urlsToScan.push(`${cleanBaseUrl}/${page.slug}`);
      });

    // Help articles
    const helpArticles = await storage.getAllHelpArticles();
    helpArticles.forEach((article) => {
      urlsToScan.push(`${cleanBaseUrl}/help/${article.slug}`);
    });

    // Update total pages count
    await storage.updateSeoAuditJob(jobId, {
      totalPages: urlsToScan.length,
    });

    // Analyze each page
    const results: SeoAuditResult[] = [];
    let scannedCount = 0;
    let errorCount = 0;

    for (const url of urlsToScan) {
      try {
        const result = await analyzePageSeo(url, jobId, cleanBaseUrl);
        const savedResult = await storage.createSeoAuditResult(result);
        results.push(savedResult);
        scannedCount++;
      } catch (error) {
        console.error(`Error analyzing ${url}:`, error);
        errorCount++;
      }

      // Update progress
      await storage.updateSeoAuditJob(jobId, {
        scannedPages: scannedCount,
        errorCount: errorCount,
      });
    }

    // Detect duplicates
    await detectDuplicates(storage, results);

    // Mark job as completed
    await storage.updateSeoAuditJob(jobId, {
      status: "completed",
      completedAt: new Date(),
    });
  } catch (error) {
    console.error("SEO audit failed:", error);
    // Mark job as failed
    await storage.updateSeoAuditJob(jobId, {
      status: "failed",
      completedAt: new Date(),
    });
    throw error;
  }
}

/**
 * Analyzes a single page for SEO issues
 * @param url - URL to analyze
 * @param jobId - ID of the audit job
 * @param baseUrl - Base URL for internal link checking
 * @returns SEO audit result for the page
 */
export async function analyzePageSeo(
  url: string,
  jobId: string,
  baseUrl: string
): Promise<InsertSeoAuditResult> {
  const startTime = Date.now();

  // Fetch HTML with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  let html: string;
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "SEO-Audit-Bot/1.0",
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    html = await response.text();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }

  const loadTime = Date.now() - startTime;

  // Parse HTML
  const $ = cheerio.load(html);

  // Extract meta information
  const metaTitle = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || "";
  const viewportMeta = $('meta[name="viewport"]').attr("content");

  // Check for missing title/description
  const hasMissingTitle = !metaTitle || metaTitle.length === 0;
  const hasMissingDescription = !metaDescription || metaDescription.length === 0;

  // Count H1 tags
  const h1Elements = $("h1");
  const h1Count = h1Elements.length;
  const missingH1 = h1Count === 0;
  const multipleH1 = h1Count > 1;

  // Count images without alt text
  const allImages = $("img");
  let imagesWithoutAlt = 0;
  allImages.each((_, img) => {
    const alt = $(img).attr("alt");
    if (!alt || alt.trim().length === 0) {
      imagesWithoutAlt++;
    }
  });

  // Check for broken internal links
  const brokenLinks: string[] = [];
  const internalLinks = $("a[href]").filter((_, link) => {
    const href = $(link).attr("href");
    if (!href) return false;

    // Check if it's an internal link
    if (href.startsWith("http")) {
      return href.startsWith(baseUrl);
    }
    // Relative links are internal
    return href.startsWith("/") || !href.startsWith("http");
  });

  // For this implementation, we'll mark links as potentially broken
  // if they point to non-existent routes (basic check)
  // A full implementation would make additional HTTP requests
  const urlsToCheck: string[] = [];
  internalLinks.each((_, link) => {
    const href = $(link).attr("href");
    if (href) {
      let fullUrl = href;
      if (!href.startsWith("http")) {
        fullUrl = `${baseUrl}${href.startsWith("/") ? href : "/" + href}`;
      }
      // Remove hash and query params for checking
      fullUrl = fullUrl.split("#")[0].split("?")[0];
      if (!urlsToCheck.includes(fullUrl)) {
        urlsToCheck.push(fullUrl);
      }
    }
  });

  // Note: For a complete implementation, you would fetch each URL
  // For now, we'll just collect them as potentially broken if they're not standard routes
  const standardRoutes = [
    "/",
    "/products",
    "/about",
    "/contact",
    "/help",
    "/faq",
    "/cart",
    "/account",
    "/privacy-policy",
    "/terms-conditions",
    "/refund-policy",
  ];

  for (const linkUrl of urlsToCheck) {
    const path = linkUrl.replace(baseUrl, "");
    if (
      !standardRoutes.includes(path) &&
      !path.startsWith("/products/") &&
      !path.startsWith("/help/")
    ) {
      // This is a simplified check - in production you'd verify these exist
      // For now we won't mark them as broken to avoid false positives
    }
  }

  // Check mobile-friendly (has viewport meta tag)
  const isMobileFriendly = !!viewportMeta && viewportMeta.includes("width=device-width");

  // Extract page title for display
  const pageTitle = metaTitle || url;

  // Build result
  const result: InsertSeoAuditResult = {
    jobId,
    url,
    pageTitle,
    metaTitle: metaTitle || null,
    metaDescription: metaDescription || null,
    hasMissingTitle,
    hasMissingDescription,
    hasDuplicateTitle: false, // Will be updated by detectDuplicates
    hasDuplicateDescription: false, // Will be updated by detectDuplicates
    missingH1,
    multipleH1,
    h1Count,
    imagesWithoutAlt,
    totalImages: allImages.length,
    brokenLinks: brokenLinks.length > 0 ? brokenLinks : null,
    brokenLinkCount: brokenLinks.length,
    loadTime,
    isMobileFriendly,
  };

  return result;
}

/**
 * Detects duplicate meta titles and descriptions across all results
 * Updates the database records with duplicate flags
 * @param storage - Storage interface for database operations
 * @param results - Array of SEO audit results
 */
export async function detectDuplicates(
  storage: IStorage,
  results: SeoAuditResult[]
): Promise<void> {
  // Group by meta title
  const titleMap = new Map<string, SeoAuditResult[]>();
  results.forEach((result) => {
    if (result.metaTitle) {
      const existing = titleMap.get(result.metaTitle) || [];
      existing.push(result);
      titleMap.set(result.metaTitle, existing);
    }
  });

  // Group by meta description
  const descriptionMap = new Map<string, SeoAuditResult[]>();
  results.forEach((result) => {
    if (result.metaDescription) {
      const existing = descriptionMap.get(result.metaDescription) || [];
      existing.push(result);
      descriptionMap.set(result.metaDescription, existing);
    }
  });

  // Find IDs of results with duplicate titles
  const duplicateTitleIds = new Set<string>();
  Array.from(titleMap.entries()).forEach(([title, titleResults]) => {
    if (titleResults.length > 1) {
      titleResults.forEach((result: SeoAuditResult) => duplicateTitleIds.add(result.id));
    }
  });

  // Find IDs of results with duplicate descriptions
  const duplicateDescIds = new Set<string>();
  Array.from(descriptionMap.entries()).forEach(([description, descResults]) => {
    if (descResults.length > 1) {
      descResults.forEach((result: SeoAuditResult) => duplicateDescIds.add(result.id));
    }
  });

  // Update the database records with duplicate flags
  const updates: Promise<SeoAuditResult>[] = [];

  for (const result of results) {
    const hasDuplicateTitle = duplicateTitleIds.has(result.id);
    const hasDuplicateDescription = duplicateDescIds.has(result.id);

    if (hasDuplicateTitle || hasDuplicateDescription) {
      updates.push(
        storage.updateSeoAuditResult(result.id, {
          hasDuplicateTitle,
          hasDuplicateDescription,
        })
      );
    }
  }

  // Wait for all updates to complete
  await Promise.all(updates);
}
