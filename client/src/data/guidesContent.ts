import { Book, Users, GraduationCap, Camera, DollarSign, Building2, Wifi } from "lucide-react";

export interface GuideContent {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  readTime: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
  keyPoints: string[];
  recommendations: {
    title: string;
    description: string;
    product?: string;
  }[];
}

export const guidesContent: Record<string, GuideContent> = {
  "beginners-guide": {
    id: "beginners-guide",
    title: "Beginner's Guide to HP Inkjet Printers",
    description: "Everything you need to know about HP inkjet printers - from basic features to choosing your first printer.",
    icon: Book,
    color: "bg-blue-500",
    readTime: "8 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Welcome to our comprehensive beginner's guide to HP inkjet printers. Whether you're buying your first printer or looking to upgrade, this guide will help you understand the basics and make an informed decision."
      },
      {
        id: "what-is-inkjet",
        title: "What is an Inkjet Printer?",
        content: "An inkjet printer works by spraying microscopic droplets of liquid ink onto paper to create text and images. HP inkjet printers are known for their high-quality color output, versatility, and affordability, making them perfect for home and small office use."
      },
      {
        id: "key-features",
        title: "Key Features to Consider",
        content: "When choosing an inkjet printer, consider: print quality (DPI), print speed (PPM), connectivity options (WiFi, USB, mobile), paper handling capacity, and cost per page. HP printers offer features like wireless printing, automatic two-sided printing, and mobile app support."
      }
    ],
    keyPoints: [
      "Inkjet printers are ideal for home use and photo printing",
      "Consider your monthly print volume when choosing a model",
      "Wireless connectivity allows printing from smartphones and tablets",
      "All-in-one models include scanning and copying functions",
      "XL ink cartridges offer better value for regular users"
    ],
    recommendations: [
      {
        title: "Budget-Friendly Option",
        description: "HP DeskJet 2755e - Perfect for basic home printing needs",
        product: "HP DeskJet 2755e Wireless All-in-One Color Printer"
      },
      {
        title: "Best for Photos",
        description: "HP ENVY Photo 7855 - Exceptional photo quality and color accuracy",
        product: "HP ENVY Photo 7855 All-in-One Wireless Photo Printer"
      }
    ]
  },
  
  "home-office": {
    id: "home-office",
    title: "How to Choose the Right Printer for Home Office",
    description: "Find the perfect printer for your home office needs with our comprehensive comparison and recommendations.",
    icon: Users,
    color: "bg-purple-500",
    readTime: "10 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Working from home requires reliable printing equipment. This guide will help you choose the perfect HP inkjet printer for your home office, balancing performance, features, and cost-effectiveness."
      },
      {
        id: "essential-features",
        title: "Essential Features for Home Office",
        content: "Home office printers should offer fast print speeds (15+ PPM), automatic document feeders for scanning multiple pages, wireless connectivity for multiple devices, and low operating costs. HP OfficeJet Pro models are specifically designed for home office productivity."
      },
      {
        id: "connectivity",
        title: "Connectivity Options",
        content: "Modern home offices require flexible connectivity. Look for printers with WiFi, Ethernet, USB, and mobile printing support (AirPrint, Google Cloud Print). HP Smart app enables printing, scanning, and printer management from anywhere."
      }
    ],
    keyPoints: [
      "Consider print volume - home offices typically print 100-500 pages monthly",
      "All-in-one functionality saves space and money",
      "Automatic two-sided printing reduces paper costs",
      "Fast print speeds improve productivity",
      "Professional-quality output enhances business image"
    ],
    recommendations: [
      {
        title: "Best Overall",
        description: "HP OfficeJet Pro 9025e - Fast, reliable, and cost-effective",
        product: "HP OfficeJet Pro 9025e All-in-One Wireless Color Printer"
      },
      {
        title: "Compact Option",
        description: "HP OfficeJet Pro 8035e - Perfect for small home offices",
        product: "HP OfficeJet Pro 8035e All-in-One Wireless Color Printer"
      }
    ]
  },

  "students": {
    id: "students",
    title: "Best Printers for Students",
    description: "Affordable, compact, and efficient printers perfect for college dorms and student budgets.",
    icon: GraduationCap,
    color: "bg-green-500",
    readTime: "7 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "As a student, you need a printer that's affordable, compact, and reliable for printing assignments, research papers, and study materials. This guide helps you find the perfect balance between price and performance."
      },
      {
        id: "budget-considerations",
        title: "Budget Considerations",
        content: "Students should consider both upfront costs and long-term operating expenses. Look for printers with affordable ink options, or consider HP Instant Ink subscription service which can save up to 50% on ink costs. Compact size is also important for dorm rooms."
      },
      {
        id: "must-have-features",
        title: "Must-Have Features for Students",
        content: "Mobile printing is essential for printing from laptops, smartphones, and tablets. WiFi connectivity allows sharing one printer among roommates. Automatic two-sided printing saves paper. Look for printers that support various paper sizes for different project requirements."
      }
    ],
    keyPoints: [
      "Compact size fits in small dorm spaces",
      "Affordable initial cost and low ink expenses",
      "Mobile printing from phones and tablets",
      "Wireless connectivity for easy sharing",
      "Energy-efficient to reduce electricity costs"
    ],
    recommendations: [
      {
        title: "Best Value",
        description: "HP DeskJet 2755e - Affordable and perfect for students",
        product: "HP DeskJet 2755e Wireless All-in-One Color Printer"
      },
      {
        title: "Feature-Rich Option",
        description: "HP DeskJet 4155e - More features at a great price",
        product: "HP DeskJet 4155e All-in-One Wireless Color Printer"
      }
    ]
  },

  "photo-printing": {
    id: "photo-printing",
    title: "Photo Printing Guide",
    description: "Learn how to achieve professional-quality photo prints at home with the right printer and techniques.",
    icon: Camera,
    color: "bg-pink-500",
    readTime: "12 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Printing photos at home gives you creative control and saves money compared to professional labs. This guide covers everything you need to know about HP inkjet printers for stunning photo prints."
      },
      {
        id: "print-quality",
        title: "Understanding Print Quality",
        content: "Photo printing requires high resolution (minimum 4800 x 1200 DPI) and dedicated photo ink cartridges. HP photo printers use up to 6 individual ink colors for accurate color reproduction. Look for models that support borderless printing in various sizes."
      },
      {
        id: "paper-selection",
        title: "Choosing the Right Paper",
        content: "Paper quality dramatically affects photo results. Use HP Premium Plus Photo Paper for best results. Glossy paper provides vibrant colors, while matte paper offers a professional finish. Different paper weights are available for various applications."
      }
    ],
    keyPoints: [
      "High DPI (4800 x 1200 minimum) ensures sharp details",
      "Individual ink cartridges allow precise color mixing",
      "Borderless printing creates professional-looking photos",
      "Paper quality is as important as printer quality",
      "Proper color calibration ensures accurate results"
    ],
    recommendations: [
      {
        title: "Best for Photos",
        description: "HP ENVY Photo 7855 - Exceptional photo quality",
        product: "HP ENVY Photo 7855 All-in-One Wireless Photo Printer"
      },
      {
        title: "Premium Option",
        description: "HP ENVY Inspire 7955e - Advanced photo features",
        product: "HP ENVY Inspire 7955e All-in-One Wireless Color Printer"
      }
    ]
  },

  "ink-cost": {
    id: "ink-cost",
    title: "Ink Cost Comparison Guide",
    description: "Understand ink cartridge costs, page yields, and how to save money on printing with our detailed analysis.",
    icon: DollarSign,
    color: "bg-yellow-500",
    readTime: "9 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Ink costs can significantly impact your total cost of ownership. This guide helps you understand ink pricing, calculate cost per page, and find ways to reduce printing expenses."
      },
      {
        id: "understanding-costs",
        title: "Understanding Ink Costs",
        content: "Cost per page is more important than initial ink price. Calculate by dividing cartridge price by page yield. XL cartridges cost more upfront but offer better value. Standard cartridges typically yield 100-200 pages, while XL cartridges can print 300-800 pages."
      },
      {
        id: "saving-strategies",
        title: "Money-Saving Strategies",
        content: "Use HP Instant Ink subscription service for automatic deliveries and potential savings. Choose XL cartridges for regular printing. Print in draft mode for internal documents. Use grayscale printing when color isn't necessary. Bundle cartridges can offer discounts."
      }
    ],
    keyPoints: [
      "Calculate cost per page, not just cartridge price",
      "XL cartridges provide better long-term value",
      "HP Instant Ink can save up to 50% on ink costs",
      "Draft mode uses less ink for everyday documents",
      "Individual color cartridges prevent waste"
    ],
    recommendations: [
      {
        title: "Lowest Cost Per Page",
        description: "HP OfficeJet Pro 9025e with Instant Ink",
        product: "HP OfficeJet Pro 9025e All-in-One Wireless Color Printer"
      },
      {
        title: "Best for High Volume",
        description: "HP OfficeJet Pro 9015e - Efficient ink usage",
        product: "HP OfficeJet Pro 9015e All-in-One Wireless Color Printer"
      }
    ]
  },

  "small-business": {
    id: "small-business",
    title: "Small Business Printer Guide",
    description: "Choose the right printer for your small business with features that boost productivity and reduce costs.",
    icon: Building2,
    color: "bg-orange-500",
    readTime: "11 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Small businesses need printers that balance performance, reliability, and cost-effectiveness. This guide helps you choose HP inkjet printers that meet your business needs and grow with your company."
      },
      {
        id: "business-requirements",
        title: "Business Requirements",
        content: "Business printers should handle high monthly volumes (500+ pages), offer professional-quality output, include security features, and provide low operating costs. HP OfficeJet Pro series is designed specifically for small business needs with fast speeds and efficient ink usage."
      },
      {
        id: "productivity-features",
        title: "Productivity Features",
        content: "Look for automatic document feeders (ADF) for scanning multi-page documents, fast print speeds (20+ PPM), large paper capacity (250+ sheets), and automatic two-sided printing. Network connectivity allows multiple employees to share one printer efficiently."
      }
    ],
    keyPoints: [
      "High monthly duty cycles support business volumes",
      "Professional color output enhances brand image",
      "Fast print speeds improve office productivity",
      "Low cost per page reduces operating expenses",
      "Security features protect sensitive documents"
    ],
    recommendations: [
      {
        title: "Best for Small Business",
        description: "HP OfficeJet Pro 9025e - Perfect balance of features and cost",
        product: "HP OfficeJet Pro 9025e All-in-One Wireless Color Printer"
      },
      {
        title: "Budget Business Option",
        description: "HP OfficeJet Pro 8035e - Reliable and affordable",
        product: "HP OfficeJet Pro 8035e All-in-One Wireless Color Printer"
      }
    ]
  },

  "wireless-vs-usb": {
    id: "wireless-vs-usb",
    title: "Wireless vs USB Printers Guide",
    description: "Compare wireless and USB connectivity options to find the best setup for your printing needs.",
    icon: Wifi,
    color: "bg-cyan-500",
    readTime: "6 min read",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "Choosing between wireless and USB connectivity affects convenience, flexibility, and setup complexity. This guide compares both options to help you make the right choice for your situation."
      },
      {
        id: "wireless-benefits",
        title: "Wireless Connectivity Benefits",
        content: "Wireless printers connect via WiFi, allowing multiple devices to print without cables. Print from anywhere in your home or office. Mobile printing from smartphones and tablets is easy. Setup is simple with modern routers. Perfect for households with multiple users or devices."
      },
      {
        id: "usb-benefits",
        title: "USB Connectivity Benefits",
        content: "USB connections offer reliable, stable connections without network dependencies. Faster data transfer for large print jobs. No wireless security concerns. Simple plug-and-play setup. Ideal for single-user environments or situations where network printing isn't needed."
      }
    ],
    keyPoints: [
      "Wireless offers flexibility and mobile printing",
      "USB provides stable, reliable connections",
      "Most modern HP printers support both options",
      "Wireless enables multi-user environments easily",
      "USB is simpler for single-computer setups"
    ],
    recommendations: [
      {
        title: "Best Wireless Printer",
        description: "HP ENVY Inspire 7955e - Advanced wireless features",
        product: "HP ENVY Inspire 7955e All-in-One Wireless Color Printer"
      },
      {
        title: "Dual Connectivity",
        description: "HP OfficeJet Pro 9015e - Both wireless and USB",
        product: "HP OfficeJet Pro 9015e All-in-One Wireless Color Printer"
      }
    ]
  }
};

export function getGuideContent(guideId: string): GuideContent | undefined {
  return guidesContent[guideId];
}
