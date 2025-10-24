import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { insertUserSchema } from "@shared/schema";
import memorystore from "memorystore";

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
      secret: process.env.SESSION_SECRET || "injetproguide-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
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
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
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
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: "Error logging in" });
        }
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

  // Cart routes
  app.get("/api/cart", requireAuth, async (req, res) => {
    try {
      const items = await storage.getCartItems(req.user!.id);
      res.json({ items });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/cart", requireAuth, async (req, res) => {
    try {
      const { productId, quantity = 1 } = req.body;
      const item = await storage.addToCart(req.user!.id, productId, quantity);
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/cart/:id", requireAuth, async (req, res) => {
    try {
      const { quantity } = req.body;
      await storage.updateCartItem(req.params.id, quantity);
      res.json({ message: "Cart updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/cart/:id", requireAuth, async (req, res) => {
    try {
      await storage.removeCartItem(req.params.id);
      res.json({ message: "Item removed" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Wishlist routes
  app.get("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const items = await storage.getWishlistItems(req.user!.id);
      res.json({ items });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const { productId } = req.body;
      const item = await storage.addToWishlist(req.user!.id, productId);
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/wishlist/:productId", requireAuth, async (req, res) => {
    try {
      await storage.removeFromWishlist(req.user!.id, req.params.productId);
      res.json({ message: "Removed from wishlist" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", requireAuth, async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(400).json({ message: "Stripe is not configured. Please use Cash on Delivery." });
      }

      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-11-20.acacia",
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

  // Order routes
  app.post("/api/orders", requireAuth, async (req, res) => {
    try {
      const { email, shippingAddress, shippingCity, shippingState, shippingZip, shippingPhone, shippingMethod, paymentMethod } = req.body;

      // Get cart items
      const cartItems = await storage.getCartItems(req.user!.id);
      
      if (cartItems.length === 0) {
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
          userId: req.user!.id,
          status: "in_process",
          total: total.toString(),
          paymentMethod,
          shippingMethod: shippingMethod || "standard",
          email,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingZip,
          shippingPhone,
        },
        orderItemsData as any
      );

      // Clear cart
      await storage.clearCart(req.user!.id);

      // Send confirmation email (simulated - in production use email service)
      console.log(`[EMAIL] Order confirmation sent to ${email}`);
      console.log(`  Order #${order.id}`);
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
      res.json(order);
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

  const httpServer = createServer(app);

  return httpServer;
}
