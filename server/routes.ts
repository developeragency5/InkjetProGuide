import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { sitemapConfig } from "@shared/schema";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { 
  insertUserSchema, 
  insertNewsletterSubscriberSchema,
  insertSitemapConfigSchema,
  insertRobotsTxtConfigSchema,
} from "@shared/schema";
import memorystore from "memorystore";
import { generateSitemap } from "./services/sitemapGenerator";
import { runSeoAudit } from "./services/seoAuditService";
import { generateAuditPdf } from "./services/pdfReportGenerator";
import { eq } from "drizzle-orm";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

const MemoryStore = memorystore(session);

// Extend Express Request to include user
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
    }
  }
}

// Extend session to include admin authentication
declare module 'express-session' {
  interface SessionData {
    adminAuthenticated?: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "inkjetproguide-secret-key-change-in-production",
      resave: false,
      saveUninitialized: true, // Allow guest sessions
      store: new MemoryStore({
        checkPeriod: 86400000, // 24 hours
      }),
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Passport configuration
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Invalid email or password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Middleware to check if user is authenticated
  const requireAuth = (req: Request, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    next();
  };

  // Middleware to check if admin is authenticated
  const requireAdmin = (req: Request, res: any, next: any) => {
    if (!req.session.adminAuthenticated) {
      return res.status(401).json({ message: "Admin authentication required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Log in the user
      req.login(user, async (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        
        // Migrate guest cart and wishlist to new user account
        const sessionId = req.session.id;
        await storage.migrateGuestCart(sessionId, user.id);
        await storage.migrateGuestWishlist(sessionId, user.id);
        
        const { password, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ message: "Error during login" });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      req.login(user, async (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: "Error logging in" });
        }
        
        // Migrate guest cart and wishlist to authenticated user
        const sessionId = req.session.id;
        await storage.migrateGuestCart(sessionId, user.id);
        await storage.migrateGuestWishlist(sessionId, user.id);
        
        const { password, ...userWithoutPassword } = user;
        return res.json({ user: userWithoutPassword });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated() && req.user) {
      const { password, ...userWithoutPassword } = req.user as any;
      return res.json(userWithoutPassword);
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  app.patch("/api/user/profile", requireAuth, async (req, res) => {
    try {
      const { name, email } = req.body;
      
      // Check if email is already used by another user
      if (email !== req.user!.email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser && existingUser.id !== req.user!.id) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }

      const updatedUser = await storage.updateUserProfile(req.user!.id, { name, email });
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/user/password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // Verify current password
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await storage.updateUserPassword(req.user!.id, hashedPassword);
      res.json({ message: "Password updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin authentication routes
  const ADMIN_PASSWORD = "admin1000$";

  app.post("/api/admin/login", (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === ADMIN_PASSWORD) {
        req.session.adminAuthenticated = true;
        return res.json({ success: true, message: "Admin authenticated successfully" });
      }
      
      res.status(401).json({ message: "Invalid admin password" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.adminAuthenticated = false;
    res.json({ message: "Admin logged out successfully" });
  });

  app.get("/api/admin/check", (req, res) => {
    if (req.session.adminAuthenticated) {
      return res.json({ authenticated: true });
    }
    res.json({ authenticated: false });
  });

  // Admin product management routes
  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin product image upload routes
  app.post("/api/admin/products/upload", requireAdmin, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/admin/products/images", requireAdmin, async (req, res) => {
    try {
      if (!req.body.imageURL) {
        return res.status(400).json({ error: "imageURL is required" });
      }

      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.imageURL,
        {
          owner: "admin",
          visibility: "public",
        },
      );

      res.status(200).json({
        objectPath: objectPath,
      });
    } catch (error: any) {
      console.error("Error setting product image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve public uploaded product images
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // Admin order management routes
  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      const { status, trackingNumber } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status, trackingNumber);
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin customers route
  app.get("/api/admin/customers", requireAdmin, async (req, res) => {
    try {
      const customers = await storage.getAllCustomers();
      res.json(customers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin analytics route
  app.get("/api/admin/analytics", requireAdmin, async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin SEO settings routes
  app.get("/api/admin/seo-settings", requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllSeoSettings();
      res.json(settings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/seo-settings/:id", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.getSeoSettingByPage(req.params.id);
      if (!setting) {
        return res.status(404).json({ message: "SEO setting not found" });
      }
      res.json(setting);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/seo-settings", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.createSeoSetting(req.body);
      res.json(setting);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/seo-settings/:id", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.updateSeoSetting(req.params.id, req.body);
      res.json(setting);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/admin/seo-settings/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteSeoSetting(req.params.id);
      res.json({ message: "SEO setting deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin content pages routes
  app.get("/api/admin/content-pages", requireAdmin, async (req, res) => {
    try {
      const pages = await storage.getAllContentPages();
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/content-pages/:id", requireAdmin, async (req, res) => {
    try {
      const page = await storage.getContentPage(req.params.id);
      if (!page) {
        return res.status(404).json({ message: "Content page not found" });
      }
      res.json(page);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/admin/content-pages", requireAdmin, async (req, res) => {
    try {
      const page = await storage.createContentPage(req.body);
      res.json(page);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/content-pages/:id", requireAdmin, async (req, res) => {
    try {
      const page = await storage.updateContentPage(req.params.id, req.body);
      res.json(page);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/admin/content-pages/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteContentPage(req.params.id);
      res.json({ message: "Content page deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin sitemap configuration routes
  app.get("/api/admin/sitemap/config", requireAdmin, async (req, res) => {
    try {
      let config = await storage.getSitemapConfig();
      
      // Create default config if it doesn't exist
      if (!config) {
        config = await storage.createOrUpdateSitemapConfig({
          enabled: true,
          includeProducts: true,
          includeCategories: true,
          includePages: true,
          changefreq: "weekly",
          priority: "0.8",
        });
      }
      
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/admin/sitemap/config", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSitemapConfigSchema.parse(req.body);
      const config = await storage.createOrUpdateSitemapConfig(validatedData);
      res.json(config);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin sitemap generation routes
  app.get("/api/admin/sitemap/preview", requireAdmin, async (req, res) => {
    try {
      let config = await storage.getSitemapConfig();
      
      if (!config) {
        config = await storage.createOrUpdateSitemapConfig({
          enabled: true,
          includeProducts: true,
          includeCategories: true,
          includePages: true,
          changefreq: "weekly",
          priority: "0.8",
        });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const xml = await generateSitemap(config, storage, baseUrl);
      
      res.json({ xml });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/sitemap/generate", requireAdmin, async (req, res) => {
    try {
      let config = await storage.getSitemapConfig();
      
      if (!config) {
        config = await storage.createOrUpdateSitemapConfig({
          enabled: true,
          includeProducts: true,
          includeCategories: true,
          includePages: true,
          changefreq: "weekly",
          priority: "0.8",
        });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      await generateSitemap(config, storage, baseUrl);
      
      // Update lastGenerated timestamp
      const now = new Date();
      await db
        .update(sitemapConfig)
        .set({ lastGenerated: now, updatedAt: now })
        .where(eq(sitemapConfig.id, config.id));
      
      res.json({ 
        success: true, 
        message: "Sitemap generated successfully",
        lastGenerated: now.toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin robots.txt configuration routes
  app.get("/api/admin/robots-txt/config", requireAdmin, async (req, res) => {
    try {
      let config = await storage.getRobotsTxtConfig();
      
      // Create default config if it doesn't exist
      if (!config) {
        const defaultContent = `# Robots.txt configuration for InkjetProGuide
User-agent: *
Allow: /

# Disallow admin and API endpoints
Disallow: /admin
Disallow: /api

# Sitemap location
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`;

        config = await storage.createOrUpdateRobotsTxtConfig({
          content: defaultContent,
        });
      }
      
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/admin/robots-txt/config", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertRobotsTxtConfigSchema.parse(req.body);
      const config = await storage.createOrUpdateRobotsTxtConfig(validatedData);
      res.json(config);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Admin SEO audit routes
  app.post("/api/admin/seo-audit/start", requireAdmin, async (req, res) => {
    try {
      // Create a new audit job
      const job = await storage.createSeoAuditJob();
      
      // Get base URL from request
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      // Run the audit asynchronously (fire and forget)
      runSeoAudit(storage, baseUrl, job.id).catch((error) => {
        console.error("SEO audit failed:", error);
      });
      
      // Return the job immediately
      res.json({
        jobId: job.id,
        status: job.status,
        message: "SEO audit started successfully",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/seo-audit/jobs", requireAdmin, async (req, res) => {
    try {
      const jobs = await storage.getAllSeoAuditJobs();
      res.json(jobs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/seo-audit/jobs/:id", requireAdmin, async (req, res) => {
    try {
      const job = await storage.getSeoAuditJob(req.params.id);
      
      if (!job) {
        return res.status(404).json({ message: "Audit job not found" });
      }
      
      // If job is completed, include results
      let results = null;
      if (job.status === "completed") {
        results = await storage.getSeoAuditResults(job.id);
      }
      
      res.json({
        job,
        results,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/seo-audit/jobs/:id/results", requireAdmin, async (req, res) => {
    try {
      const job = await storage.getSeoAuditJob(req.params.id);
      
      if (!job) {
        return res.status(404).json({ message: "Audit job not found" });
      }
      
      const results = await storage.getSeoAuditResults(job.id);
      
      // Calculate summary statistics
      const summary = {
        totalPages: job.scannedPages || 0,
        totalIssues: 0,
        criticalIssues: 0,
        warnings: 0,
        categories: {
          missingTitles: 0,
          missingDescriptions: 0,
          duplicateTitles: 0,
          duplicateDescriptions: 0,
          missingH1: 0,
          multipleH1: 0,
          imagesWithoutAlt: 0,
          brokenLinks: 0,
          notMobileFriendly: 0,
        },
      };
      
      results.forEach((result) => {
        // Count issues
        if (result.hasMissingTitle) {
          summary.totalIssues++;
          summary.criticalIssues++;
          summary.categories.missingTitles++;
        }
        if (result.hasMissingDescription) {
          summary.totalIssues++;
          summary.criticalIssues++;
          summary.categories.missingDescriptions++;
        }
        if (result.hasDuplicateTitle) {
          summary.totalIssues++;
          summary.warnings++;
          summary.categories.duplicateTitles++;
        }
        if (result.hasDuplicateDescription) {
          summary.totalIssues++;
          summary.warnings++;
          summary.categories.duplicateDescriptions++;
        }
        if (result.missingH1) {
          summary.totalIssues++;
          summary.criticalIssues++;
          summary.categories.missingH1++;
        }
        if (result.multipleH1) {
          summary.totalIssues++;
          summary.warnings++;
          summary.categories.multipleH1++;
        }
        if (result.imagesWithoutAlt && result.imagesWithoutAlt > 0) {
          summary.totalIssues += result.imagesWithoutAlt;
          summary.warnings += result.imagesWithoutAlt;
          summary.categories.imagesWithoutAlt += result.imagesWithoutAlt;
        }
        if (result.brokenLinkCount && result.brokenLinkCount > 0) {
          summary.totalIssues += result.brokenLinkCount;
          summary.criticalIssues += result.brokenLinkCount;
          summary.categories.brokenLinks += result.brokenLinkCount;
        }
        if (!result.isMobileFriendly) {
          summary.totalIssues++;
          summary.warnings++;
          summary.categories.notMobileFriendly++;
        }
      });
      
      res.json({
        job,
        results,
        summary,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/seo-audit/jobs/:id/pdf", requireAdmin, async (req, res) => {
    try {
      const job = await storage.getSeoAuditJob(req.params.id);
      
      if (!job) {
        return res.status(404).json({ message: "Audit job not found" });
      }
      
      if (job.status !== "completed") {
        return res.status(400).json({ 
          message: "Cannot generate PDF for incomplete audit job" 
        });
      }
      
      const results = await storage.getSeoAuditResults(job.id);
      
      // Generate PDF
      const pdfBuffer = await generateAuditPdf(job, results);
      
      // Set response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition", 
        `attachment; filename="seo-audit-report-${job.id}.pdf"`
      );
      res.setHeader("Content-Length", pdfBuffer.length);
      
      // Send PDF buffer
      res.send(pdfBuffer);
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Error generating PDF report: " + error.message });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Cart routes (support both authenticated and guest users)
  app.get("/api/cart", async (req, res) => {
    try {
      const userId = req.isAuthenticated() ? req.user!.id : undefined;
      const sessionId = req.session.id;
      console.log(`[CART] GET - userId: ${userId}, sessionId: ${sessionId}`);
      const items = await storage.getCartItems(userId, sessionId);
      console.log(`[CART] Retrieved ${items.length} items`);
      res.json({ items });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
      const userId = req.isAuthenticated() ? req.user!.id : undefined;
      const sessionId = req.session.id;
      console.log(`[CART] POST - Adding product ${productId}, userId: ${userId}, sessionId: ${sessionId}`);
      const item = await storage.addToCart(userId, sessionId, productId, quantity);
      console.log(`[CART] Added item ${item.id}`);
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      await storage.updateCartItem(req.params.id, quantity);
      res.json({ message: "Cart updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeCartItem(req.params.id);
      res.json({ message: "Item removed" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Wishlist routes (support both authenticated and guest users)
  app.get("/api/wishlist", async (req, res) => {
    try {
      const userId = req.isAuthenticated() ? req.user!.id : undefined;
      const sessionId = req.session.id;
      const items = await storage.getWishlistItems(userId, sessionId);
      res.json({ items });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.isAuthenticated() ? req.user!.id : undefined;
      const sessionId = req.session.id;
      const item = await storage.addToWishlist(userId, sessionId, productId);
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/wishlist/:productId", async (req, res) => {
    try {
      const userId = req.isAuthenticated() ? req.user!.id : undefined;
      const sessionId = req.session.id;
      await storage.removeFromWishlist(userId, sessionId, req.params.productId);
      res.json({ message: "Removed from wishlist" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe payment route for creating payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(400).json({ message: "Stripe is not configured. Please use Cash on Delivery." });
      }

      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-09-30.clover",
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Order routes (support both authenticated and guest users)
  app.post("/api/orders", async (req, res) => {
    try {
      const { email, customerName, shippingAddress, shippingCity, shippingState, shippingZip, shippingPhone, shippingMethod, paymentMethod } = req.body;
      const userId = req.isAuthenticated() ? req.user!.id : undefined;
      const sessionId = req.session.id;

      console.log(`[ORDER] Creating order - userId: ${userId}, sessionId: ${sessionId}`);

      // Get cart items
      const cartItems = await storage.getCartItems(userId, sessionId);
      
      console.log(`[ORDER] Cart items count: ${cartItems.length}`);
      
      if (cartItems.length === 0) {
        console.log(`[ORDER] ERROR: Cart is empty for userId: ${userId}, sessionId: ${sessionId}`);
        return res.status(400).json({ message: "Cart is empty" });
      }

      // Calculate total
      const subtotal = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0
      );
      
      // Calculate shipping based on method
      let shipping = 0;
      if (shippingMethod === "express") {
        shipping = 19.99;
      } else if (shippingMethod === "overnight") {
        shipping = 39.99;
      }
      // standard is free (0)
      
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      // Create order items
      const orderItemsData = cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity,
      }));

      // Create order
      const order = await storage.createOrder(
        {
          userId,
          sessionId,
          status: "in_process",
          total: total.toString(),
          paymentMethod,
          shippingMethod: shippingMethod || "standard",
          email,
          customerName,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingZip,
          shippingPhone,
        },
        orderItemsData as any
      );

      // Clear cart
      await storage.clearCart(userId, sessionId);

      // Send confirmation email (simulated - in production use email service)
      console.log(`[EMAIL] Order confirmation sent to ${email}`);
      console.log(`  Order #${order.id}`);
      console.log(`  Customer: ${customerName || 'Guest'}`);
      console.log(`  Total: $${total.toFixed(2)}`);
      console.log(`  Shipping Method: ${shippingMethod}`);
      console.log(`  Payment Method: ${paymentMethod}`);

      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getUserOrders(req.user!.id);
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order || order.userId !== req.user!.id) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Guest order lookup endpoint - lookup by order ID only
  app.post("/api/orders/lookup", async (req, res) => {
    try {
      const { orderId } = req.body;
      
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
      
      const order = await storage.getOrder(orderId.trim());
      
      if (!order) {
        return res.status(404).json({ message: "Order not found. Please check your order ID and try again." });
      }
      
      res.json({ order });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Comparison routes
  app.post("/api/comparisons", requireAuth, async (req, res) => {
    try {
      const { insertSavedComparisonSchema } = await import("@shared/schema");
      const validatedData = insertSavedComparisonSchema.parse(req.body);
      
      const comparison = await storage.saveComparison(validatedData);
      res.json(comparison);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/comparisons", requireAuth, async (req, res) => {
    try {
      const comparisons = await storage.getUserComparisons(req.user!.id);
      res.json(comparisons);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/comparisons/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteComparison(req.params.id);
      res.json({ message: "Comparison deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Help article routes
  app.get("/api/help/articles", async (req, res) => {
    try {
      const articles = await storage.getAllHelpArticles();
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/help/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getHelpArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/help/category/:category", async (req, res) => {
    try {
      const articles = await storage.getHelpArticlesByCategory(req.params.category);
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/help/articles/:id/feedback", async (req, res) => {
    try {
      const { helpful } = req.body;
      if (typeof helpful !== 'boolean') {
        return res.status(400).json({ message: "helpful field must be a boolean" });
      }
      await storage.recordHelpArticleFeedback(req.params.id, helpful);
      res.json({ message: "Feedback recorded successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // FAQ routes
  app.get("/api/faqs", async (req, res) => {
    try {
      const { category } = req.query;
      let faqs;
      
      if (category && typeof category === 'string') {
        faqs = await storage.getFaqsByCategory(category);
      } else {
        faqs = await storage.getAllFaqs();
      }
      
      res.json(faqs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/faqs/:id", async (req, res) => {
    try {
      const faq = await storage.getFaq(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      
      await storage.incrementFaqViews(req.params.id);
      res.json(faq);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/faqs/:id/feedback", async (req, res) => {
    try {
      const { helpful } = req.body;
      if (typeof helpful !== 'boolean') {
        return res.status(400).json({ message: "helpful field must be a boolean" });
      }
      await storage.recordFaqFeedback(req.params.id, helpful);
      res.json({ message: "Feedback recorded successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Ink cartridge routes
  app.get("/api/ink-cartridges", async (req, res) => {
    try {
      const cartridges = await storage.getAllInkCartridges();
      res.json(cartridges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/ink-cartridges/printer/:printerModel", async (req, res) => {
    try {
      const cartridges = await storage.getCartridgesByPrinter(req.params.printerModel);
      res.json(cartridges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/ink-cartridges/:id", async (req, res) => {
    try {
      const cartridge = await storage.getInkCartridge(req.params.id);
      if (!cartridge) {
        return res.status(404).json({ message: "Cartridge not found" });
      }
      res.json(cartridge);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Newsletter subscription route
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validationResult = insertNewsletterSubscriberSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: validationResult.error.errors[0]?.message || "Invalid email address"
        });
      }

      // Normalize email to lowercase to prevent duplicates
      const email = validationResult.data.email.toLowerCase().trim();

      // Check if email is already subscribed
      const isSubscribed = await storage.isEmailSubscribed(email);
      if (isSubscribed) {
        return res.status(409).json({ 
          message: "This email is already subscribed to our newsletter" 
        });
      }

      await storage.subscribeToNewsletter(email);
      res.json({ 
        message: "Successfully subscribed to our newsletter! Check your inbox for exclusive deals."
      });
    } catch (error: any) {
      // Handle database constraint violations
      if (error.code === '23505') {
        return res.status(409).json({ 
          message: "This email is already subscribed to our newsletter" 
        });
      }
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  });

  // Public sitemap.xml route
  app.get("/sitemap.xml", async (req, res) => {
    try {
      let config = await storage.getSitemapConfig();
      
      // Check if sitemap is enabled
      if (!config || !config.enabled) {
        return res.status(404).send("Sitemap not available");
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const xml = await generateSitemap(config, storage, baseUrl);
      
      // Set proper content-type for XML
      res.set('Content-Type', 'text/xml');
      res.send(xml);
    } catch (error: any) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
