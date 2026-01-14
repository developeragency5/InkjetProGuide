import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(), // SEO-friendly URL slug
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  images: text("images").array(),
  category: text("category").notNull(),
  stock: integer("stock").notNull().default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  specifications: text("specifications").notNull(),
  features: text("features").array().notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  mpn: text("mpn"), // Manufacturer Part Number (Product Number) - for printers only
  ecwidProductId: text("ecwid_product_id"), // Ecwid store product ID for linking
  // SEO fields
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cart items table  
export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: text("session_id"),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Wishlist items table
export const wishlistItems = pgTable("wishlist_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: text("session_id"),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: text("session_id"),
  status: text("status").notNull().default("pending"),
  trackingNumber: text("tracking_number"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  shippingMethod: text("shipping_method").notNull().default("standard"),
  email: text("email").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: text("shipping_city").notNull(),
  shippingState: text("shipping_state").notNull(),
  shippingZip: text("shipping_zip").notNull(),
  shippingPhone: text("shipping_phone").notNull(),
  customerName: text("customer_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: varchar("product_id").notNull().references(() => products.id),
  productName: text("product_name").notNull(),
  productPrice: decimal("product_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Product reviews table
export const productReviews = pgTable("product_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  helpful: integer("helpful").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Saved comparisons table
export const savedComparisons = pgTable("saved_comparisons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  productIds: text("product_ids").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Help articles table
export const helpArticles = pgTable("help_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  description: text("description").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  videoUrl: text("video_url"),
  relatedArticles: text("related_articles").array(),
  helpful: integer("helpful").notNull().default(0),
  notHelpful: integer("not_helpful").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// FAQs table
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  helpful: integer("helpful").notNull().default(0),
  notHelpful: integer("not_helpful").notNull().default(0),
  views: integer("views").notNull().default(0),
  relatedQuestions: text("related_questions").array(),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ink Cartridges table
export const inkCartridges = pgTable("ink_cartridges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cartridgeNumber: text("cartridge_number").notNull(), // e.g., "63", "910"
  cartridgeName: text("cartridge_name").notNull(), // Full name
  color: text("color").notNull(), // Black, Cyan, Magenta, Yellow, Tri-color
  type: text("type").notNull(), // Original, Compatible, Remanufactured
  pageYield: integer("page_yield").notNull(), // Average pages per cartridge
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compatiblePrinters: text("compatible_printers").array().notNull(), // Array of printer model names
  isXL: boolean("is_xl").notNull().default(false), // Standard or XL/High Yield
  shelfLife: text("shelf_life"), // e.g., "24 months"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SEO Settings table - for managing page-level SEO
export const seoSettings = pgTable("seo_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  page: text("page").notNull().unique(), // e.g., "home", "products", "about", "contact"
  title: text("title").notNull(),
  description: text("description").notNull(),
  keywords: text("keywords").array(),
  canonicalUrl: text("canonical_url"),
  robotsIndex: boolean("robots_index").notNull().default(true), // index/noindex
  robotsFollow: boolean("robots_follow").notNull().default(true), // follow/nofollow
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterCard: text("twitter_card").default("summary_large_image"), // summary, summary_large_image, app, player
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Sitemap Configuration table
export const sitemapConfig = pgTable("sitemap_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  enabled: boolean("enabled").notNull().default(true),
  includeProducts: boolean("include_products").notNull().default(true),
  includeCategories: boolean("include_categories").notNull().default(true),
  includePages: boolean("include_pages").notNull().default(true),
  changefreq: text("changefreq").notNull().default("weekly"), // always, hourly, daily, weekly, monthly, yearly, never
  priority: decimal("priority", { precision: 2, scale: 1 }).notNull().default("0.8"),
  lastGenerated: timestamp("last_generated"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Robots.txt Configuration table
export const robotsTxtConfig = pgTable("robots_txt_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SEO Audit Jobs table
export const seoAuditJobs = pgTable("seo_audit_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  status: text("status").notNull().default("pending"), // pending, running, completed, failed
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  totalPages: integer("total_pages").default(0),
  scannedPages: integer("scanned_pages").default(0),
  errorCount: integer("error_count").default(0),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SEO Audit Results table
export const seoAuditResults = pgTable("seo_audit_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull().references(() => seoAuditJobs.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  pageTitle: text("page_title"),
  // Meta issues
  hasMissingTitle: boolean("has_missing_title").default(false),
  hasMissingDescription: boolean("has_missing_description").default(false),
  hasDuplicateTitle: boolean("has_duplicate_title").default(false),
  hasDuplicateDescription: boolean("has_duplicate_description").default(false),
  // Content issues
  missingH1: boolean("missing_h1").default(false),
  multipleH1: boolean("multiple_h1").default(false),
  h1Count: integer("h1_count").default(0),
  // Image issues
  imagesWithoutAlt: integer("images_without_alt").default(0),
  totalImages: integer("total_images").default(0),
  // Link issues
  brokenLinks: text("broken_links").array(),
  brokenLinkCount: integer("broken_link_count").default(0),
  // Performance
  loadTime: integer("load_time"), // in milliseconds
  // Mobile
  isMobileFriendly: boolean("is_mobile_friendly").default(true),
  // Raw data
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Content Pages table - for managing editable content
export const contentPages = pgTable("content_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(), // URL slug
  title: text("title").notNull(),
  content: text("content").notNull(), // Rich text/HTML content
  category: text("category").notNull(), // e.g., "page", "blog", "guide"
  isPublished: boolean("is_published").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  orders: many(orders),
  savedComparisons: many(savedComparisons),
}));

export const productsRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  orderItems: many(orderItems),
  reviews: many(productReviews),
}));

export const productReviewsRelations = relations(productReviews, ({ one }) => ({
  product: one(products, {
    fields: [productReviews.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [productReviews.userId],
    references: [users.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  user: one(users, {
    fields: [wishlistItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [wishlistItems.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const savedComparisonsRelations = relations(savedComparisons, ({ one }) => ({
  user: one(users, {
    fields: [savedComparisons.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
}).extend({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertWishlistItemSchema = createInsertSchema(wishlistItems).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
  createdAt: true,
});

export const insertProductReviewSchema = createInsertSchema(productReviews).omit({
  id: true,
  createdAt: true,
  helpful: true,
}).extend({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters"),
  comment: z.string().min(20, "Review must be at least 20 characters"),
});

export const insertSavedComparisonSchema = createInsertSchema(savedComparisons).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(3, "Comparison name must be at least 3 characters"),
  productIds: z.array(z.string()).min(2, "Must compare at least 2 products").max(4, "Maximum 4 products can be compared"),
});

export const insertHelpArticleSchema = createInsertSchema(helpArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  helpful: true,
  notHelpful: true,
}).extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  helpful: true,
  notHelpful: true,
  views: true,
}).extend({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
});

export const insertInkCartridgeSchema = createInsertSchema(inkCartridges).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export const insertSeoSettingSchema = createInsertSchema(seoSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  page: z.string().min(1, "Page identifier is required"),
  title: z.string().min(10, "Title must be at least 10 characters").max(60, "Title should not exceed 60 characters"),
  description: z.string().min(50, "Description must be at least 50 characters").max(160, "Description should not exceed 160 characters"),
});

export const insertContentPageSchema = createInsertSchema(contentPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
});

export const insertSitemapConfigSchema = createInsertSchema(sitemapConfig).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastGenerated: true,
});

export const insertRobotsTxtConfigSchema = createInsertSchema(robotsTxtConfig).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  content: z.string().min(1, "Robots.txt content is required"),
});

export const insertSeoAuditJobSchema = createInsertSchema(seoAuditJobs).omit({
  id: true,
  createdAt: true,
  startedAt: true,
  completedAt: true,
  totalPages: true,
  scannedPages: true,
  errorCount: true,
  pdfUrl: true,
});

export const insertSeoAuditResultSchema = createInsertSchema(seoAuditResults).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type WishlistItem = typeof wishlistItems.$inferSelect;
export type InsertWishlistItem = z.infer<typeof insertWishlistItemSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type ProductReview = typeof productReviews.$inferSelect;
export type InsertProductReview = z.infer<typeof insertProductReviewSchema>;
export type SavedComparison = typeof savedComparisons.$inferSelect;
export type InsertSavedComparison = z.infer<typeof insertSavedComparisonSchema>;
export type HelpArticle = typeof helpArticles.$inferSelect;
export type InsertHelpArticle = z.infer<typeof insertHelpArticleSchema>;
export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type InkCartridge = typeof inkCartridges.$inferSelect;
export type InsertInkCartridge = z.infer<typeof insertInkCartridgeSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type SeoSetting = typeof seoSettings.$inferSelect;
export type InsertSeoSetting = z.infer<typeof insertSeoSettingSchema>;
export type ContentPage = typeof contentPages.$inferSelect;
export type InsertContentPage = z.infer<typeof insertContentPageSchema>;
export type SitemapConfig = typeof sitemapConfig.$inferSelect;
export type InsertSitemapConfig = z.infer<typeof insertSitemapConfigSchema>;
export type RobotsTxtConfig = typeof robotsTxtConfig.$inferSelect;
export type InsertRobotsTxtConfig = z.infer<typeof insertRobotsTxtConfigSchema>;
export type SeoAuditJob = typeof seoAuditJobs.$inferSelect;
export type InsertSeoAuditJob = z.infer<typeof insertSeoAuditJobSchema>;
export type SeoAuditResult = typeof seoAuditResults.$inferSelect;
export type InsertSeoAuditResult = z.infer<typeof insertSeoAuditResultSchema>;
