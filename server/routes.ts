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

  // Order routes
  app.post("/api/orders", requireAuth, async (req, res) => {
    try {
      const { shippingAddress, shippingCity, shippingState, shippingZip, shippingPhone, paymentMethod } = req.body;

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
      const shipping = subtotal >= 50 ? 0 : 9.99;
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
          status: "pending",
          total: total.toString(),
          paymentMethod,
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

  const httpServer = createServer(app);

  return httpServer;
}
