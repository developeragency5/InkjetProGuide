import { db } from "./db";
import { products, users, productReviews, orders, orderItems, cartItems, wishlistItems } from "@shared/schema";
import bcrypt from "bcryptjs";

const sampleProducts = [
  {
    name: "HP OfficeJet Pro 9025e All-in-One Wireless Color Printer",
    description: "The HP OfficeJet Pro 9025e delivers professional-quality color printing with fast speeds up to 24 ppm. Features automatic two-sided printing, scanning, copying, and faxing. Perfect for small offices and home businesses with high-volume printing needs.",
    price: "329.99",
    originalPrice: "399.99",
    image: "/attached_assets/generated_images/HP_OfficeJet_Pro_printer_89015997.png",
    category: "office",
    stock: 45,
    rating: "4.7",
    reviewCount: 238,
    specifications: JSON.stringify({
      "Print Speed (Black)": "24 ppm",
      "Print Speed (Color)": "20 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "250 sheets",
      "Connectivity": "WiFi, Ethernet, USB",
      "Duplex Printing": "Automatic",
      "Monthly Duty Cycle": "25,000 pages",
    }),
    features: [
      "Automatic two-sided printing",
      "50-sheet automatic document feeder",
      "2.7-inch color touchscreen",
      "Mobile printing support (AirPrint, Mopria)",
      "Fast first page out",
      "HP Smart App compatible",
      "Voice-activated printing",
      "Self-healing WiFi",
    ],
    inStock: true,
  },
  {
    name: "HP DeskJet 4155e All-in-One Wireless Color Printer",
    description: "Affordable and reliable, the HP DeskJet 4155e is perfect for home use. Print, scan, and copy with ease using wireless connectivity. Compact design fits anywhere, and HP+ delivers ongoing value with smart features and instant ink enrollment.",
    price: "129.99",
    originalPrice: null,
    image: "/attached_assets/generated_images/HP_DeskJet_home_printer_88c9a819.png",
    category: "home",
    stock: 78,
    rating: "4.4",
    reviewCount: 512,
    specifications: JSON.stringify({
      "Print Speed (Black)": "8.5 ppm",
      "Print Speed (Color)": "5.5 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "60 sheets",
      "Connectivity": "WiFi, USB",
      "Duplex Printing": "Manual",
      "Monthly Duty Cycle": "1,000 pages",
    }),
    features: [
      "Wireless printing from smartphone or tablet",
      "HP Smart App for easy setup",
      "Borderless photo printing",
      "Compact space-saving design",
      "Energy Star certified",
      "Instant Ink eligible",
      "Easy mobile setup",
    ],
    inStock: true,
  },
  {
    name: "HP OfficeJet 250 Mobile All-in-One Portable Printer",
    description: "Print, scan, and copy from anywhere with the ultra-portable HP OfficeJet 250. Battery-powered for true mobility, this printer delivers professional results on the go. Perfect for remote workers and traveling professionals.",
    price: "399.99",
    originalPrice: "449.99",
    image: "/attached_assets/generated_images/HP_portable_mobile_printer_cace2eb0.png",
    category: "portable",
    stock: 23,
    rating: "4.6",
    reviewCount: 145,
    specifications: JSON.stringify({
      "Print Speed (Black)": "10 ppm",
      "Print Speed (Color)": "7 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "50 sheets",
      "Connectivity": "WiFi, USB",
      "Battery Life": "Up to 500 pages",
      "Weight": "6.6 lbs",
    }),
    features: [
      "Built-in rechargeable battery",
      "Print up to 500 pages per charge",
      "Compact and lightweight design",
      "Wireless printing from mobile devices",
      "Auto document feeder",
      "HP Smart App compatible",
      "Quiet mode for noise-sensitive environments",
    ],
    inStock: true,
  },
  {
    name: "HP ENVY Photo 7855 All-in-One Wireless Photo Printer",
    description: "Create stunning photos and professional documents with the HP ENVY Photo 7855. Six-ink color system produces lab-quality photos. Features dual paper trays and borderless printing up to 8.5 x 11 inches for versatile printing options.",
    price: "249.99",
    originalPrice: "299.99",
    image: "/attached_assets/generated_images/HP_ENVY_Photo_printer_5b675a55.png",
    category: "home",
    stock: 34,
    rating: "4.8",
    reviewCount: 389,
    specifications: JSON.stringify({
      "Print Speed (Black)": "15 ppm",
      "Print Speed (Color)": "10 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "125 sheets (2 trays)",
      "Connectivity": "WiFi, Ethernet, USB",
      "Duplex Printing": "Automatic",
      "Photo Tray": "15 sheets",
    }),
    features: [
      "Six-ink color system for vibrant photos",
      "Borderless printing up to 8.5 x 11 inches",
      "Dual paper trays (photo and plain)",
      "2.7-inch color touchscreen",
      "Automatic two-sided printing",
      "SD card slot for direct photo printing",
      "HP Smart App with creative features",
      "Instant Ink eligible",
    ],
    inStock: true,
  },
  {
    name: "HP OfficeJet Pro 8035e All-in-One Wireless Color Printer",
    description: "Smart, efficient, and reliable - the HP OfficeJet Pro 8035e handles all your office needs. Self-healing WiFi ensures consistent connectivity, while smart tasks automate routine work. Ideal for productive small offices.",
    price: "279.99",
    originalPrice: null,
    image: "/attached_assets/generated_images/HP_OfficeJet_Pro_printer_89015997.png",
    category: "office",
    stock: 56,
    rating: "4.5",
    reviewCount: 421,
    specifications: JSON.stringify({
      "Print Speed (Black)": "20 ppm",
      "Print Speed (Color)": "10 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "225 sheets",
      "Connectivity": "WiFi, Ethernet, USB",
      "Duplex Printing": "Automatic",
      "Monthly Duty Cycle": "20,000 pages",
    }),
    features: [
      "Self-healing WiFi technology",
      "Smart tasks automation",
      "35-sheet automatic document feeder",
      "2.7-inch color touchscreen",
      "Voice-activated printing",
      "Mobile fax capability",
      "HP Smart App integration",
      "Advanced security features",
    ],
    inStock: true,
  },
  {
    name: "HP DeskJet 2755e Wireless All-in-One Color Printer",
    description: "Simple, affordable, and compact - the HP DeskJet 2755e is perfect for basic home printing needs. Easy wireless setup and smartphone printing make it ideal for students and light home use.",
    price: "89.99",
    originalPrice: null,
    image: "/attached_assets/generated_images/HP_DeskJet_home_printer_88c9a819.png",
    category: "home",
    stock: 92,
    rating: "4.2",
    reviewCount: 678,
    specifications: JSON.stringify({
      "Print Speed (Black)": "7.5 ppm",
      "Print Speed (Color)": "5.5 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "60 sheets",
      "Connectivity": "WiFi, USB",
      "Duplex Printing": "Manual",
      "Monthly Duty Cycle": "1,000 pages",
    }),
    features: [
      "Ultra-compact design",
      "Easy wireless setup",
      "HP Smart App for mobile printing",
      "Copy and scan functionality",
      "Energy efficient",
      "Instant Ink compatible",
      "Affordable ink cartridges",
    ],
    inStock: true,
  },
  {
    name: "HP OfficeJet Pro 9015e All-in-One Wireless Color Printer",
    description: "Professional color printing with enterprise-level features. The HP OfficeJet Pro 9015e offers fast speeds, robust security, and reliable performance for demanding office environments.",
    price: "299.99",
    originalPrice: "349.99",
    image: "/attached_assets/generated_images/HP_OfficeJet_Pro_printer_89015997.png",
    category: "office",
    stock: 41,
    rating: "4.6",
    reviewCount: 295,
    specifications: JSON.stringify({
      "Print Speed (Black)": "22 ppm",
      "Print Speed (Color)": "18 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "250 sheets",
      "Connectivity": "WiFi, Ethernet, USB",
      "Duplex Printing": "Automatic",
      "Monthly Duty Cycle": "25,000 pages",
    }),
    features: [
      "Fast color printing",
      "Self-healing WiFi",
      "35-sheet ADF with scan",
      "Advanced security features",
      "Smart tasks for workflow automation",
      "Voice-activated printing",
      "HP Smart App compatible",
      "Professional print quality",
    ],
    inStock: true,
  },
  {
    name: "HP ENVY Inspire 7955e All-in-One Wireless Color Printer",
    description: "Versatile all-in-one printer designed for creative home users. Print stunning photos and professional documents with ease. Features dual paper trays and intuitive touchscreen controls.",
    price: "199.99",
    originalPrice: "249.99",
    image: "/attached_assets/generated_images/HP_ENVY_Photo_printer_5b675a55.png",
    category: "home",
    stock: 67,
    rating: "4.7",
    reviewCount: 334,
    specifications: JSON.stringify({
      "Print Speed (Black)": "15 ppm",
      "Print Speed (Color)": "10 ppm",
      "Print Resolution": "4800 x 1200 dpi",
      "Paper Capacity": "125 sheets",
      "Connectivity": "WiFi, USB",
      "Duplex Printing": "Automatic",
      "Photo Tray": "15 sheets",
    }),
    features: [
      "Dual paper trays",
      "Borderless photo printing",
      "2.7-inch color touchscreen",
      "Automatic two-sided printing",
      "HP Smart App creativity tools",
      "Self-healing WiFi",
      "Instant Ink eligible",
      "Premium build quality",
    ],
    inStock: true,
  },
];

// Sample reviewer users
const sampleUsers = [
  {
    email: "john.davis@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "John D.",
  },
  {
    email: "sarah.martinez@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Sarah M.",
  },
  {
    email: "mike.roberts@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Mike R.",
  },
  {
    email: "emily.chen@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Emily C.",
  },
  {
    email: "david.thompson@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "David T.",
  },
  {
    email: "lisa.anderson@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Lisa A.",
  },
  {
    email: "james.wilson@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "James W.",
  },
  {
    email: "amanda.brown@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Amanda B.",
  },
];

async function seed() {
  console.log("Seeding database...");
  
  try {
    // Clear existing data (in proper order due to foreign key constraints)
    await db.delete(productReviews);
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(cartItems);
    await db.delete(wishlistItems);
    await db.delete(products);
    await db.delete(users);
    console.log("Cleared existing data");

    // Insert sample users
    const insertedUsers = await db.insert(users).values(sampleUsers).returning();
    console.log(`Inserted ${insertedUsers.length} users`);

    // Insert sample products
    const insertedProducts = await db.insert(products).values(sampleProducts).returning();
    console.log(`Inserted ${insertedProducts.length} products`);

    // Create reviews for each product with different users
    const reviewsData = [];
    
    // Reviews for HP OfficeJet Pro 9025e (index 0)
    reviewsData.push(
      {
        productId: insertedProducts[0].id,
        userId: insertedUsers[0].id,
        rating: 5,
        title: "Excellent printer for home office",
        comment: "Great print quality and easy WiFi setup. The HP Smart app makes printing from my phone super convenient. Automatic duplex printing saves so much time!",
        helpful: 24,
      },
      {
        productId: insertedProducts[0].id,
        userId: insertedUsers[1].id,
        rating: 5,
        title: "Best investment for my business",
        comment: "This printer handles our busy office perfectly. Fast, reliable, and the monthly duty cycle is impressive. Love the self-healing WiFi feature.",
        helpful: 18,
      },
      {
        productId: insertedProducts[0].id,
        userId: insertedUsers[2].id,
        rating: 4,
        title: "Great quality, slightly noisy",
        comment: "Print quality is fantastic, especially for color documents. My only complaint is it can be a bit loud during high-volume print jobs.",
        helpful: 12,
      }
    );

    // Reviews for HP DeskJet 4155e (index 1)
    reviewsData.push(
      {
        productId: insertedProducts[1].id,
        userId: insertedUsers[3].id,
        rating: 4,
        title: "Good value for money",
        comment: "Works well for everyday printing. Setup was straightforward. Only wish the paper tray was larger for my needs.",
        helpful: 31,
      },
      {
        productId: insertedProducts[1].id,
        userId: insertedUsers[4].id,
        rating: 5,
        title: "Perfect for home use",
        comment: "Compact, affordable, and does everything I need. The wireless printing from my tablet is seamless. Highly recommend for basic home printing!",
        helpful: 27,
      },
      {
        productId: insertedProducts[1].id,
        userId: insertedUsers[5].id,
        rating: 3,
        title: "Decent but slow",
        comment: "Print quality is good but it's quite slow compared to my old printer. Good for occasional use but not for high-volume printing.",
        helpful: 15,
      }
    );

    // Reviews for HP OfficeJet 250 Mobile (index 2)
    reviewsData.push(
      {
        productId: insertedProducts[2].id,
        userId: insertedUsers[6].id,
        rating: 5,
        title: "Game changer for remote work",
        comment: "As a field technician, this portable printer is a lifesaver. The battery lasts all day and print quality is excellent. Worth every penny!",
        helpful: 42,
      },
      {
        productId: insertedProducts[2].id,
        userId: insertedUsers[7].id,
        rating: 4,
        title: "Portable and reliable",
        comment: "Great for traveling consultants. Fits in my backpack and prints professional documents on the go. Battery life could be better but still very good.",
        helpful: 28,
      },
      {
        productId: insertedProducts[2].id,
        userId: insertedUsers[0].id,
        rating: 5,
        title: "Best portable printer I've owned",
        comment: "Compact design doesn't compromise on quality. The wireless features work flawlessly and it's incredibly convenient for client meetings.",
        helpful: 35,
      }
    );

    // Reviews for HP ENVY Photo 7855 (index 3)
    reviewsData.push(
      {
        productId: insertedProducts[3].id,
        userId: insertedUsers[1].id,
        rating: 5,
        title: "Photo printing perfection",
        comment: "The six-ink system produces stunning photos that rival professional prints. The dual paper trays are super convenient for switching between photos and documents.",
        helpful: 45,
      },
      {
        productId: insertedProducts[3].id,
        userId: insertedUsers[2].id,
        rating: 5,
        title: "Amazing for photographers",
        comment: "Colors are vibrant and accurate. Borderless printing works perfectly. This printer has exceeded all my expectations for home photo printing!",
        helpful: 38,
      },
      {
        productId: insertedProducts[3].id,
        userId: insertedUsers[3].id,
        rating: 4,
        title: "Great printer, pricey ink",
        comment: "Print quality is excellent for both photos and documents. The only downside is the cost of replacing all six ink cartridges.",
        helpful: 22,
      }
    );

    // Reviews for HP OfficeJet Pro 8035e (index 4)
    reviewsData.push(
      {
        productId: insertedProducts[4].id,
        userId: insertedUsers[4].id,
        rating: 5,
        title: "Smart features are impressive",
        comment: "The smart tasks automation has streamlined our workflow significantly. Self-healing WiFi means no more connection issues. Highly recommend for small offices!",
        helpful: 33,
      },
      {
        productId: insertedProducts[4].id,
        userId: insertedUsers[5].id,
        rating: 4,
        title: "Reliable workhorse",
        comment: "Handles our daily printing needs without any problems. Setup was easy and the touchscreen is very intuitive. Good value for the features.",
        helpful: 29,
      },
      {
        productId: insertedProducts[4].id,
        userId: insertedUsers[6].id,
        rating: 5,
        title: "Perfect for my startup",
        comment: "Fast, efficient, and the security features give me peace of mind. The voice-activated printing is surprisingly useful. Best office printer we've had!",
        helpful: 19,
      }
    );

    // Reviews for HP DeskJet 2755e (index 5)
    reviewsData.push(
      {
        productId: insertedProducts[5].id,
        userId: insertedUsers[7].id,
        rating: 4,
        title: "Great for students",
        comment: "Bought this for my daughter's college dorm. Compact size and wireless printing are perfect. Print quality is good for the price!",
        helpful: 52,
      },
      {
        productId: insertedProducts[5].id,
        userId: insertedUsers[0].id,
        rating: 5,
        title: "Simple and affordable",
        comment: "Does exactly what I need without any fuss. Easy to set up, prints well, and doesn't take up much space. Perfect for basic home use!",
        helpful: 41,
      },
      {
        productId: insertedProducts[5].id,
        userId: insertedUsers[1].id,
        rating: 3,
        title: "Works but basic",
        comment: "It's a decent budget printer but don't expect fast speeds or advanced features. Good for occasional printing but that's about it.",
        helpful: 16,
      }
    );

    // Reviews for HP OfficeJet Pro 9015e (index 6)
    reviewsData.push(
      {
        productId: insertedProducts[6].id,
        userId: insertedUsers[2].id,
        rating: 5,
        title: "Enterprise quality for small business",
        comment: "The speed and security features are outstanding. Handles high-volume printing effortlessly. The smart tasks feature has saved us hours every week!",
        helpful: 37,
      },
      {
        productId: insertedProducts[6].id,
        userId: insertedUsers[3].id,
        rating: 4,
        title: "Solid performer",
        comment: "Fast print speeds and excellent color quality. The ADF with scan is very handy. Only minor issue is occasional paper jams with certain paper types.",
        helpful: 24,
      },
      {
        productId: insertedProducts[6].id,
        userId: insertedUsers[4].id,
        rating: 5,
        title: "Best OfficeJet Pro model",
        comment: "Upgraded from an older model and the difference is night and day. Faster, smarter, and more reliable. The HP Smart App integration is excellent!",
        helpful: 31,
      }
    );

    // Reviews for HP ENVY Inspire 7955e (index 7)
    reviewsData.push(
      {
        productId: insertedProducts[7].id,
        userId: insertedUsers[5].id,
        rating: 5,
        title: "Perfect for creative projects",
        comment: "Love the dual paper trays and the print quality is superb for both photos and documents. The touchscreen is responsive and easy to use. Very happy with this purchase!",
        helpful: 44,
      },
      {
        productId: insertedProducts[7].id,
        userId: insertedUsers[6].id,
        rating: 5,
        title: "Versatile and reliable",
        comment: "This printer does it all - photos, documents, copies, scans. The automatic duplex printing is a great feature. Quality build and excellent performance!",
        helpful: 36,
      },
      {
        productId: insertedProducts[7].id,
        userId: insertedUsers[7].id,
        rating: 4,
        title: "Great features, a bit bulky",
        comment: "Fantastic print quality and love all the features. Takes up more desk space than I expected but worth it for the dual trays and performance.",
        helpful: 21,
      }
    );

    // Insert all reviews
    await db.insert(productReviews).values(reviewsData);
    console.log(`Inserted ${reviewsData.length} product reviews`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
