import PDFDocument from "pdfkit";
import type { SeoAuditJob, SeoAuditResult } from "@shared/schema";

/**
 * Generates a professional PDF report for an SEO audit
 * @param job - The SEO audit job
 * @param results - Array of audit results for all pages
 * @returns Buffer containing the PDF document
 */
export async function generateAuditPdf(
  job: SeoAuditJob,
  results: SeoAuditResult[]
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      // Collect PDF chunks
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Colors
      const colors = {
        primary: "#2563eb",
        danger: "#dc2626",
        warning: "#f59e0b",
        success: "#16a34a",
        text: "#1f2937",
        lightText: "#6b7280",
      };

      // Header
      doc
        .fontSize(24)
        .fillColor(colors.primary)
        .text("SEO Audit Report", { align: "center" });

      doc.moveDown(0.5);

      doc
        .fontSize(12)
        .fillColor(colors.lightText)
        .text(`Generated: ${new Date(job.createdAt).toLocaleString()}`, {
          align: "center",
        });

      if (job.completedAt) {
        doc.text(`Completed: ${new Date(job.completedAt).toLocaleString()}`, {
          align: "center",
        });
      }

      doc.moveDown(1.5);

      // Draw a horizontal line
      doc
        .strokeColor(colors.lightText)
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(1);

      // SUMMARY SECTION
      doc.fontSize(18).fillColor(colors.text).text("Summary", { underline: true });

      doc.moveDown(0.5);

      const totalIssues = calculateTotalIssues(results);
      const criticalIssues = calculateCriticalIssues(results);

      doc.fontSize(12).fillColor(colors.text);
      doc.text(`Total Pages Scanned: ${job.scannedPages || 0}`);
      doc.text(`Total Issues Found: ${totalIssues}`);
      doc.fillColor(colors.danger).text(`Critical Issues: ${criticalIssues}`);

      if (job.errorCount && job.errorCount > 0) {
        doc.fillColor(colors.warning).text(`Pages with Errors: ${job.errorCount}`);
      }

      doc.moveDown(1.5);

      // ISSUES BY CATEGORY
      doc.fontSize(18).fillColor(colors.text).text("Issues by Category", { underline: true });

      doc.moveDown(0.5);

      const categoryStats = calculateCategoryStats(results);

      doc.fontSize(12).fillColor(colors.text);

      if (categoryStats.missingTitles > 0) {
        doc
          .fillColor(colors.danger)
          .text(`Missing Meta Titles: ${categoryStats.missingTitles} pages`);
      }

      if (categoryStats.missingDescriptions > 0) {
        doc
          .fillColor(colors.danger)
          .text(`Missing Meta Descriptions: ${categoryStats.missingDescriptions} pages`);
      }

      if (categoryStats.duplicateTitles > 0) {
        doc
          .fillColor(colors.warning)
          .text(`Duplicate Meta Titles: ${categoryStats.duplicateTitles} pages`);
      }

      if (categoryStats.duplicateDescriptions > 0) {
        doc
          .fillColor(colors.warning)
          .text(`Duplicate Meta Descriptions: ${categoryStats.duplicateDescriptions} pages`);
      }

      if (categoryStats.missingH1 > 0) {
        doc
          .fillColor(colors.danger)
          .text(`Missing H1 Tags: ${categoryStats.missingH1} pages`);
      }

      if (categoryStats.multipleH1 > 0) {
        doc
          .fillColor(colors.warning)
          .text(`Multiple H1 Tags: ${categoryStats.multipleH1} pages`);
      }

      if (categoryStats.imagesWithoutAlt > 0) {
        doc
          .fillColor(colors.warning)
          .text(`Images Without Alt Text: ${categoryStats.imagesWithoutAlt} images`);
      }

      if (categoryStats.brokenLinks > 0) {
        doc
          .fillColor(colors.danger)
          .text(`Broken Links: ${categoryStats.brokenLinks} links`);
      }

      if (categoryStats.notMobileFriendly > 0) {
        doc
          .fillColor(colors.warning)
          .text(`Not Mobile Friendly: ${categoryStats.notMobileFriendly} pages`);
      }

      doc.moveDown(1.5);

      // PAGE DETAILS SECTION
      doc.fontSize(18).fillColor(colors.text).text("Page Details", { underline: true });

      doc.moveDown(0.5);

      // Only show pages with issues
      const pagesWithIssues = results.filter(hasIssues);

      if (pagesWithIssues.length === 0) {
        doc
          .fontSize(12)
          .fillColor(colors.success)
          .text("No issues found! All pages passed the SEO audit.");
      } else {
        // Loop through pages with issues
        pagesWithIssues.forEach((result, index) => {
          // Check if we need a new page
          if (doc.y > 650) {
            doc.addPage();
          }

          doc.fontSize(14).fillColor(colors.primary).text(`${index + 1}. ${result.pageTitle || result.url}`);

          doc.moveDown(0.3);

          doc.fontSize(10).fillColor(colors.lightText).text(result.url, {
            link: result.url,
            underline: true,
          });

          doc.moveDown(0.5);

          doc.fontSize(11).fillColor(colors.text);

          // List all issues for this page
          const issues = getPageIssues(result);
          issues.forEach((issue) => {
            const color = issue.severity === "critical" ? colors.danger : colors.warning;
            doc.fillColor(color).text(`• ${issue.message}`);
          });

          doc.moveDown(1);
        });
      }

      // Footer
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc
          .fontSize(10)
          .fillColor(colors.lightText)
          .text(
            `Page ${i + 1} of ${pageCount}`,
            50,
            doc.page.height - 50,
            { align: "center" }
          );
      }

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Calculate total number of issues across all pages
 */
function calculateTotalIssues(results: SeoAuditResult[]): number {
  let total = 0;

  results.forEach((result) => {
    if (result.hasMissingTitle) total++;
    if (result.hasMissingDescription) total++;
    if (result.hasDuplicateTitle) total++;
    if (result.hasDuplicateDescription) total++;
    if (result.missingH1) total++;
    if (result.multipleH1) total++;
    if (result.imagesWithoutAlt) total += result.imagesWithoutAlt;
    if (result.brokenLinkCount) total += result.brokenLinkCount;
    if (!result.isMobileFriendly) total++;
  });

  return total;
}

/**
 * Calculate critical issues (high priority)
 */
function calculateCriticalIssues(results: SeoAuditResult[]): number {
  let critical = 0;

  results.forEach((result) => {
    if (result.hasMissingTitle) critical++;
    if (result.hasMissingDescription) critical++;
    if (result.missingH1) critical++;
    if (result.brokenLinkCount) critical += result.brokenLinkCount;
  });

  return critical;
}

/**
 * Calculate statistics by category
 */
function calculateCategoryStats(results: SeoAuditResult[]) {
  const stats = {
    missingTitles: 0,
    missingDescriptions: 0,
    duplicateTitles: 0,
    duplicateDescriptions: 0,
    missingH1: 0,
    multipleH1: 0,
    imagesWithoutAlt: 0,
    brokenLinks: 0,
    notMobileFriendly: 0,
  };

  results.forEach((result) => {
    if (result.hasMissingTitle) stats.missingTitles++;
    if (result.hasMissingDescription) stats.missingDescriptions++;
    if (result.hasDuplicateTitle) stats.duplicateTitles++;
    if (result.hasDuplicateDescription) stats.duplicateDescriptions++;
    if (result.missingH1) stats.missingH1++;
    if (result.multipleH1) stats.multipleH1++;
    if (result.imagesWithoutAlt) stats.imagesWithoutAlt += result.imagesWithoutAlt;
    if (result.brokenLinkCount) stats.brokenLinks += result.brokenLinkCount;
    if (!result.isMobileFriendly) stats.notMobileFriendly++;
  });

  return stats;
}

/**
 * Check if a page has any issues
 */
function hasIssues(result: SeoAuditResult): boolean {
  return (
    result.hasMissingTitle ||
    result.hasMissingDescription ||
    result.hasDuplicateTitle ||
    result.hasDuplicateDescription ||
    result.missingH1 ||
    result.multipleH1 ||
    (result.imagesWithoutAlt || 0) > 0 ||
    (result.brokenLinkCount || 0) > 0 ||
    !result.isMobileFriendly
  );
}

/**
 * Get all issues for a specific page
 */
function getPageIssues(result: SeoAuditResult): Array<{ severity: string; message: string }> {
  const issues: Array<{ severity: string; message: string }> = [];

  if (result.hasMissingTitle) {
    issues.push({
      severity: "critical",
      message: "Missing meta title",
    });
  }

  if (result.hasMissingDescription) {
    issues.push({
      severity: "critical",
      message: "Missing meta description",
    });
  }

  if (result.hasDuplicateTitle) {
    issues.push({
      severity: "warning",
      message: "Duplicate meta title found on other pages",
    });
  }

  if (result.hasDuplicateDescription) {
    issues.push({
      severity: "warning",
      message: "Duplicate meta description found on other pages",
    });
  }

  if (result.missingH1) {
    issues.push({
      severity: "critical",
      message: "Missing H1 tag",
    });
  }

  if (result.multipleH1) {
    issues.push({
      severity: "warning",
      message: `Multiple H1 tags found (${result.h1Count} total)`,
    });
  }

  if (result.imagesWithoutAlt && result.imagesWithoutAlt > 0) {
    issues.push({
      severity: "warning",
      message: `${result.imagesWithoutAlt} image(s) without alt text (out of ${result.totalImages} total)`,
    });
  }

  if (result.brokenLinkCount && result.brokenLinkCount > 0) {
    issues.push({
      severity: "critical",
      message: `${result.brokenLinkCount} broken link(s) detected`,
    });
  }

  if (!result.isMobileFriendly) {
    issues.push({
      severity: "warning",
      message: "Page is not mobile-friendly (missing viewport meta tag)",
    });
  }

  if (result.loadTime && result.loadTime > 3000) {
    issues.push({
      severity: "warning",
      message: `Slow load time: ${(result.loadTime / 1000).toFixed(2)}s`,
    });
  }

  return issues;
}
