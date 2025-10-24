import { 
  users, 
  products, 
  cartItems, 
  wishlistItems, 
  orders, 
  orderItems,
  type User, 
  type InsertUser, 
  type Product,
  type CartItem,
  type WishlistItem,
  type Order,
  type OrderItem,
  type InsertOrder,
  type InsertOrderItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;

  // Cart operations
  getCartItems(userId: string): Promise<any[]>;
  addToCart(userId: string, productId: string, quantity: number): Promise<CartItem>;
  updateCartItem(itemId: string, quantity: number): Promise<void>;
  removeCartItem(itemId: string): Promise<void>;
  clearCart(userId: string): Promise<void>;

  // Wishlist operations
  getWishlistItems(userId: string): Promise<any[]>;
  addToWishlist(userId: string, productId: string): Promise<WishlistItem>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;

  // Order operations
  createOrder(orderData: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getUserOrders(userId: string): Promise<any[]>;
  getOrder(orderId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  // Cart operations
  async getCartItems(userId: string): Promise<any[]> {
    const items = await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        createdAt: cartItems.createdAt,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));
    
    return items;
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));

    if (existingItem) {
      // Update quantity
      const [updated] = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updated;
    }

    // Add new item
    const [item] = await db
      .insert(cartItems)
      .values({ userId, productId, quantity })
      .returning();
    return item;
  }

  async updateCartItem(itemId: string, quantity: number): Promise<void> {
    await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, itemId));
  }

  async removeCartItem(itemId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Wishlist operations
  async getWishlistItems(userId: string): Promise<any[]> {
    const items = await db
      .select({
        id: wishlistItems.id,
        userId: wishlistItems.userId,
        productId: wishlistItems.productId,
        createdAt: wishlistItems.createdAt,
        product: products,
      })
      .from(wishlistItems)
      .innerJoin(products, eq(wishlistItems.productId, products.id))
      .where(eq(wishlistItems.userId, userId));
    
    return items;
  }

  async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
    // Check if already in wishlist
    const [existing] = await db
      .select()
      .from(wishlistItems)
      .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)));

    if (existing) {
      return existing;
    }

    const [item] = await db
      .insert(wishlistItems)
      .values({ userId, productId })
      .returning();
    return item;
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    await db
      .delete(wishlistItems)
      .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)));
  }

  // Order operations
  async createOrder(orderData: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [order] = await db.insert(orders).values(orderData).returning();

    // Insert order items
    const orderItemsData = items.map(item => ({
      ...item,
      orderId: order.id,
    }));
    
    await db.insert(orderItems).values(orderItemsData);

    return order;
  }

  async getUserOrders(userId: string): Promise<any[]> {
    const userOrders = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        status: orders.status,
        total: orders.total,
        paymentMethod: orders.paymentMethod,
        shippingAddress: orders.shippingAddress,
        shippingCity: orders.shippingCity,
        shippingState: orders.shippingState,
        shippingZip: orders.shippingZip,
        shippingPhone: orders.shippingPhone,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(sql`${orders.createdAt} DESC`);

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));
        
        return { ...order, items };
      })
    );

    return ordersWithItems;
  }

  async getOrder(orderId: string): Promise<any> {
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
    
    if (!order) return undefined;

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    return { ...order, items };
  }
}

export const storage = new DatabaseStorage();
