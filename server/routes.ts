import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Return empty arrays for any remaining API calls (for backward compatibility)
  app.get("/api/products", (_req, res) => {
    res.json([]);
  });

  app.get("/api/wishlist", (_req, res) => {
    res.json({ items: [] });
  });

  app.get("/api/cart", (_req, res) => {
    res.json({ items: [], total: "0.00" });
  });

  app.get("/api/seo-settings", (_req, res) => {
    res.json([]);
  });

  // Newsletter subscription (just acknowledge, no storage)
  app.post("/api/newsletter/subscribe", (_req, res) => {
    res.json({ success: true, message: "Thank you for subscribing!" });
  });

  // Contact form (just acknowledge, no storage)
  app.post("/api/contact", (_req, res) => {
    res.json({ success: true, message: "Thank you for your message!" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
