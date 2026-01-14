export interface StaticProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  rating: string;
  reviewCount: number;
  inStock: boolean;
  ecwidProductId: string;
  features: string[];
}

export const staticProducts: StaticProduct[] = [
  {
    id: "1",
    name: "Smart Tank 6001",
    slug: "smart-tank-6001",
    description: "Wireless all-in-one cartridge-free ink tank printer with up to 2 years of ink included. Perfect for home printing with ultra-low cost per page.",
    price: "179.99",
    originalPrice: "229.99",
    image: "/placeholder-printer.png",
    category: "Home Inkjet Printers",
    rating: "4.5",
    reviewCount: 245,
    inStock: true,
    ecwidProductId: "716949315",
    features: ["Wireless Printing", "Ink Tank System", "Mobile Printing", "Auto 2-Sided Printing"]
  },
  {
    id: "2",
    name: "Smart Tank 7301",
    slug: "smart-tank-7301",
    description: "All-in-one wireless ink tank printer with automatic document feeder. Ideal for small offices and home businesses with high-volume printing needs.",
    price: "329.99",
    originalPrice: "379.99",
    image: "/placeholder-printer.png",
    category: "Office Inkjet Printers",
    rating: "4.6",
    reviewCount: 189,
    inStock: true,
    ecwidProductId: "716949316",
    features: ["35-page ADF", "Wireless Printing", "Ink Tank System", "Duplex Printing"]
  },
  {
    id: "3",
    name: "ENVY Inspire 7900e",
    slug: "envy-inspire-7900e",
    description: "All-in-one photo printer designed for creative projects. Print stunning borderless photos and documents with vibrant colors.",
    price: "229.99",
    originalPrice: "279.99",
    image: "/placeholder-printer.png",
    category: "Home Inkjet Printers",
    rating: "4.4",
    reviewCount: 312,
    inStock: true,
    ecwidProductId: "716949317",
    features: ["Photo Printing", "Borderless Printing", "Wireless", "Auto 2-Sided Printing"]
  },
  {
    id: "4",
    name: "OfficeJet Pro 9130e",
    slug: "officejet-pro-9130e",
    description: "Professional all-in-one printer with fast print speeds and automatic document feeder. Built for productive office environments.",
    price: "299.99",
    originalPrice: "349.99",
    image: "/placeholder-printer.png",
    category: "Office Inkjet Printers",
    rating: "4.7",
    reviewCount: 423,
    inStock: true,
    ecwidProductId: "716949318",
    features: ["Fast Print Speed", "35-page ADF", "Wireless Networking", "Duplex Printing"]
  },
  {
    id: "5",
    name: "OfficeJet Pro 9730e",
    slug: "officejet-pro-9730e",
    description: "Wide-format all-in-one printer for printing up to 11x17 inches. Perfect for presentations, spreadsheets, and professional documents.",
    price: "449.99",
    originalPrice: "499.99",
    image: "/placeholder-printer.png",
    category: "Office Inkjet Printers",
    rating: "4.8",
    reviewCount: 156,
    inStock: true,
    ecwidProductId: "716949319",
    features: ["Wide Format 11x17", "Fast Print Speed", "50-page ADF", "Wireless"]
  },
  {
    id: "6",
    name: "Color LaserJet Pro 3301fdw",
    slug: "color-laserjet-pro-3301fdw",
    description: "Fast color laser printer with wireless connectivity. Designed for small to medium workgroups with high-quality output.",
    price: "379.99",
    originalPrice: "429.99",
    image: "/placeholder-printer.png",
    category: "Office Inkjet Printers",
    rating: "4.6",
    reviewCount: 278,
    inStock: true,
    ecwidProductId: "716949320",
    features: ["Laser Printing", "Fast Output", "Wireless", "Auto Duplex"]
  },
  {
    id: "7",
    name: "ENVY 6055e",
    slug: "envy-6055e",
    description: "Compact wireless all-in-one printer for everyday home printing. Easy setup and affordable ink replacement options.",
    price: "129.99",
    originalPrice: "149.99",
    image: "/placeholder-printer.png",
    category: "Home Inkjet Printers",
    rating: "4.3",
    reviewCount: 567,
    inStock: true,
    ecwidProductId: "716949321",
    features: ["Compact Design", "Wireless Printing", "Mobile Printing", "Auto 2-Sided"]
  },
  {
    id: "8",
    name: "DeskJet 2855e",
    slug: "deskjet-2855e",
    description: "Budget-friendly wireless inkjet printer for basic home printing needs. Simple setup and reliable performance.",
    price: "79.99",
    originalPrice: "99.99",
    image: "/placeholder-printer.png",
    category: "Home Inkjet Printers",
    rating: "4.1",
    reviewCount: 892,
    inStock: true,
    ecwidProductId: "716949322",
    features: ["Budget Friendly", "Wireless", "Mobile Printing", "Easy Setup"]
  }
];

export const getProductsByCategory = (category: string): StaticProduct[] => {
  return staticProducts.filter(p => p.category === category);
};

export const getHomeProducts = (): StaticProduct[] => {
  return staticProducts.filter(p => p.category === "Home Inkjet Printers");
};

export const getOfficeProducts = (): StaticProduct[] => {
  return staticProducts.filter(p => p.category === "Office Inkjet Printers");
};

export const getEcwidProductUrl = (ecwidProductId: string): string => {
  return `/products#!/~/product/id=${ecwidProductId}`;
};
