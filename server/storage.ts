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
  type InsertProduct,
  type CartItem,
  type WishlistItem,
  type Order,
  type OrderItem,
  type InsertOrder,
  type InsertOrderItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: string, data: { name: string; email: string }): Promise<User>;
  updateUserPassword(id: string, hashedPassword: string): Promise<void>;

  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;

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
  
  // Admin operations
  getAllOrders(): Promise<any[]>;
  updateOrderStatus(orderId: string, status: string, trackingNumber?: string): Promise<Order>;
  getAllCustomers(): Promise<any[]>;
  getAnalytics(): Promise<any>;
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

  async updateUserProfile(id: string, data: { name: string; email: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ name: data.name, email: data.email })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserPassword(id: string, hashedPassword: string): Promise<void> {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id));
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
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

  // Admin operations
  async getAllOrders(): Promise<any[]> {
    const allOrders = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        status: orders.status,
        trackingNumber: orders.trackingNumber,
        total: orders.total,
        paymentMethod: orders.paymentMethod,
        shippingMethod: orders.shippingMethod,
        email: orders.email,
        shippingAddress: orders.shippingAddress,
        shippingCity: orders.shippingCity,
        shippingState: orders.shippingState,
        shippingZip: orders.shippingZip,
        shippingPhone: orders.shippingPhone,
        createdAt: orders.createdAt,
        userName: users.name,
        userEmail: users.email,
      })
      .from(orders)
      .innerJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.createdAt));

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      allOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));
        
        return { ...order, items };
      })
    );

    return ordersWithItems;
  }

  async updateOrderStatus(orderId: string, status: string, trackingNumber?: string): Promise<Order> {
    const updateData: any = { status };
    if (trackingNumber !== undefined) {
      updateData.trackingNumber = trackingNumber;
    }

    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, orderId))
      .returning();
    
    return updatedOrder;
  }

  async getAllCustomers(): Promise<any[]> {
    const customers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    // Get order count and total spent for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const customerOrders = await db
          .select()
          .from(orders)
          .where(eq(orders.userId, customer.id));

        const totalSpent = customerOrders.reduce(
          (sum, order) => sum + parseFloat(order.total),
          0
        );

        return {
          ...customer,
          orderCount: customerOrders.length,
          totalSpent: totalSpent.toFixed(2),
        };
      })
    );

    return customersWithStats;
  }

  async getAnalytics(): Promise<any> {
    // Get total orders
    const allOrders = await db.select().from(orders);
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);

    // Get total products
    const allProducts = await db.select().from(products);
    const totalProducts = allProducts.length;

    // Get total customers
    const allUsers = await db.select().from(users);
    const totalCustomers = allUsers.length;

    // Get orders by status
    const ordersByStatus = allOrders.reduce((acc: any, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    // Get recent orders (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentOrders = allOrders.filter(
      order => new Date(order.createdAt) >= thirtyDaysAgo
    );
    const recentRevenue = recentOrders.reduce(
      (sum, order) => sum + parseFloat(order.total),
      0
    );

    return {
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      totalProducts,
      totalCustomers,
      ordersByStatus,
      recentOrders: recentOrders.length,
      recentRevenue: recentRevenue.toFixed(2),
      averageOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00',
    };
  }
}

export const storage = new DatabaseStorage();
