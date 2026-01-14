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
  ecwidUrl: string;
  features: string[];
}

export const staticProducts: StaticProduct[] = [
  {
    id: "1",
    name: "DeskJet 4255e Wireless All-in-One",
    slug: "deskjet-4255e",
    description: "Wireless all-in-one color inkjet printer with print, scan, and copy capabilities. Perfect for home and student use with reliable everyday printing.",
    price: "79.99",
    originalPrice: "109.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501251639.jpg",
    category: "Home Inkjet Printers",
    rating: "4.3",
    reviewCount: 324,
    inStock: true,
    ecwidProductId: "806466768",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-DeskJet-4255e-Wireless-All-in-One-Color-Inkjet-Printer-with-Print-Scan-&-Copy-for-Home-and-Student-Use/p/806466768",
    features: ["Wireless Printing", "Print Scan Copy", "Home Use", "Student Friendly"]
  },
  {
    id: "2",
    name: "Envy 7955e Wireless Photo All-in-One",
    slug: "envy-7955e",
    description: "Wireless photo all-in-one color inkjet printer with auto duplex printing. Ideal for printing stunning photos and everyday documents.",
    price: "149.99",
    originalPrice: "229.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501350317.jpg",
    category: "Home Inkjet Printers",
    rating: "4.5",
    reviewCount: 289,
    inStock: true,
    ecwidProductId: "806452376",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-Envy-7955e-Wireless-Photo-All-in-One-Color-Inkjet-Printer-with-Auto-Duplex-Printing/p/806452376",
    features: ["Photo Printing", "Auto Duplex", "Wireless", "All-in-One"]
  },
  {
    id: "3",
    name: "Smart Tank 651 Wireless Ink Tank",
    slug: "smart-tank-651",
    description: "Wireless all-in-one ink tank printer designed for high-volume home printing. Ultra-low cost per page with refillable ink tanks.",
    price: "299.99",
    originalPrice: "349.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501407019.png",
    category: "Home Inkjet Printers",
    rating: "4.6",
    reviewCount: 412,
    inStock: true,
    ecwidProductId: "806466866",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-Smart-Tank-651-Wireless-All-in-One-Ink-Tank-Printer-for-High-Volume-Home-Printing/p/806466866",
    features: ["Ink Tank System", "High Volume", "Low Cost Per Page", "Wireless"]
  },
  {
    id: "4",
    name: "Smart Tank 7602 Wireless All-in-One",
    slug: "smart-tank-7602",
    description: "Wireless all-in-one ink tank printer built for high-volume office use. Professional quality printing with exceptional value.",
    price: "379.99",
    originalPrice: "429.99",
    image: "/assets/HP_Smart_Tank_7602_All-in-One_1768426812916.jpg",
    category: "Home Inkjet Printers",
    rating: "4.7",
    reviewCount: 198,
    inStock: true,
    ecwidProductId: "806452406",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-Smart-Tank-7602-Wireless-All-in-One-Ink-Tank-Printer-for-High-Volume-Office-Use/p/806452406",
    features: ["Ink Tank System", "Office Use", "High Volume", "Professional Quality"]
  },
  {
    id: "5",
    name: "OfficeJet 8015e Wireless All-in-One",
    slug: "officejet-8015e",
    description: "Wireless all-in-one color inkjet printer with print, scan, and copy for office use. Reliable performance for small business needs.",
    price: "159.99",
    originalPrice: "199.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501374305.png",
    category: "Office Inkjet Printers",
    rating: "4.4",
    reviewCount: 356,
    inStock: true,
    ecwidProductId: "806452382",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-OfficeJet-8015e-Wireless-All-in-One-Color-Inkjet-Printer-with-Print-Scan-Copy-for-Office-Use/p/806452382",
    features: ["Office Use", "Print Scan Copy", "Wireless", "Small Business"]
  },
  {
    id: "6",
    name: "OfficeJet 8135e Wireless All-in-One",
    slug: "officejet-8135e",
    description: "Wireless all-in-one color inkjet printer with 3 months of ink trial included. Perfect for office productivity and professional documents.",
    price: "199.99",
    originalPrice: "239.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501374379.png",
    category: "Office Inkjet Printers",
    rating: "4.5",
    reviewCount: 267,
    inStock: true,
    ecwidProductId: "806466580",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-OfficeJet-8135e-Wireless-All-in-One-Color-Inkjet-Printer-with-3-Months-of-Ink-Trial-for-Office-Use/p/806466580",
    features: ["Ink Trial Included", "Office Use", "Wireless", "Professional Output"]
  },
  {
    id: "7",
    name: "OfficeJet 9110 Wireless All-in-One",
    slug: "officejet-9110",
    description: "Wireless all-in-one color inkjet printer with print, scan, and copy capabilities. Built for demanding office environments.",
    price: "219.99",
    originalPrice: "259.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501392306.jpg",
    category: "Office Inkjet Printers",
    rating: "4.6",
    reviewCount: 189,
    inStock: true,
    ecwidProductId: "806466852",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-OfficeJet-9110-Wireless-All-in-One-Color-Inkjet-Printer-with-Print-Scan-Copy-for-Office-Use/p/806466852",
    features: ["Fast Printing", "Office Use", "Print Scan Copy", "Wireless"]
  },
  {
    id: "8",
    name: "OfficeJet 9125e Wireless All-in-One",
    slug: "officejet-9125e",
    description: "Wireless all-in-one color inkjet printer with advanced features for office use. High-performance printing for busy workgroups.",
    price: "209.99",
    originalPrice: "309.99",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/128774264/5501384384.png",
    category: "Office Inkjet Printers",
    rating: "4.7",
    reviewCount: 234,
    inStock: true,
    ecwidProductId: "806466587",
    ecwidUrl: "https://www.inkjetproguide.com/products#!/HP-OfficeJet-9125e-Wireless-All-in-One-Color-Inkjet-Printer-with-Print-Scan-Copy-for-Office-Use/p/806466587",
    features: ["Advanced Features", "High Performance", "Office Use", "Wireless"]
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

export const getEcwidProductUrl = (product: StaticProduct): string => {
  return product.ecwidUrl;
};
