import { Link } from "wouter";
import { 
  Book, 
  Scale, 
  Home, 
  Building2, 
  Cpu, 
  Wrench, 
  DollarSign, 
  Package, 
  Smartphone, 
  Coins, 
  Leaf, 
  ArrowUpCircle, 
  Zap, 
  Settings, 
  Shield, 
  FileText,
  ChevronRight,
  BookOpen,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const guides = [
  {
    id: "choosing-hp-inkjet-printer",
    title: "How to Choose the Right HP Inkjet Printer: Complete Buying Guide",
    description: "A comprehensive guide to selecting the perfect HP inkjet printer based on your printing needs, budget, and usage patterns.",
    icon: Book,
    color: "bg-blue-500",
    readTime: "8 min read",
    path: "/guides/choosing-hp-inkjet-printer",
    available: true,
    category: "Buying Guide",
    guideNumber: 1
  },
  {
    id: "deskjet-vs-officejet-vs-envy",
    title: "DeskJet vs OfficeJet vs ENVY: Which Series Should You Choose",
    description: "Compare HP's three main inkjet printer lines to understand their strengths, ideal use cases, and which one fits your needs.",
    icon: Scale,
    color: "bg-purple-500",
    readTime: "7 min read",
    path: "/guides/deskjet-vs-officejet-vs-envy",
    available: true,
    category: "Comparison",
    guideNumber: 2
  },
  {
    id: "officejet-pro-vs-basic",
    title: "HP OfficeJet Pro vs Basic Models: Key Differences Explained",
    description: "Understand what sets OfficeJet Pro apart from standard models and whether the upgrade is worth it for your workflow.",
    icon: Scale,
    color: "bg-purple-500",
    readTime: "6 min read",
    path: "/guides/officejet-pro-vs-basic",
    available: true,
    category: "Comparison",
    guideNumber: 3
  },
  {
    id: "best-inkjet-home-use",
    title: "Best HP Inkjet Printers for Home Use",
    description: "Discover the top HP inkjet printers designed for home environments, balancing quality, cost, and ease of use.",
    icon: Home,
    color: "bg-green-500",
    readTime: "7 min read",
    path: "/guides/best-inkjet-home-use",
    available: true,
    category: "Home Office",
    guideNumber: 4
  },
  {
    id: "best-inkjet-business",
    title: "Best HP Inkjet Printers for Small & Medium Business",
    description: "Find the ideal HP inkjet printer for your business with features that boost productivity and reduce operational costs.",
    icon: Building2,
    color: "bg-orange-500",
    readTime: "8 min read",
    path: "/guides/best-inkjet-business",
    available: true,
    category: "Business",
    guideNumber: 5
  },
  {
    id: "inkjet-technology-explained",
    title: "How HP Inkjet Technology Works: Printhead & Ink System Explained",
    description: "Learn the technical fundamentals of HP inkjet printing, including thermal inkjet technology and how printheads work.",
    icon: Cpu,
    color: "bg-cyan-500",
    readTime: "7 min read",
    path: "/guides/inkjet-technology-explained",
    available: true,
    category: "Technical",
    guideNumber: 6
  },
  {
    id: "printhead-maintenance-cleaning",
    title: "HP Inkjet Printhead Maintenance & Cleaning Guide",
    description: "Step-by-step instructions for maintaining and cleaning your HP inkjet printhead to ensure optimal print quality.",
    icon: Wrench,
    color: "bg-slate-500",
    readTime: "6 min read",
    path: "/guides/printhead-maintenance-cleaning",
    available: true,
    category: "Maintenance",
    guideNumber: 7
  },
  {
    id: "ink-page-yield-cost",
    title: "Understanding HP Ink Page Yield and How It Affects Cost",
    description: "Decode ink cartridge page yield ratings and learn how they impact your overall printing costs.",
    icon: DollarSign,
    color: "bg-yellow-500",
    readTime: "5 min read",
    path: "/guides/ink-page-yield-cost",
    available: true,
    category: "Cost Analysis",
    guideNumber: 8
  },
  {
    id: "oem-vs-third-party-ink",
    title: "OEM vs Third-Party HP Ink Cartridges: Pros, Risks & Cost",
    description: "Weigh the benefits and risks of using original HP ink versus third-party alternatives for your printer.",
    icon: Package,
    color: "bg-amber-500",
    readTime: "6 min read",
    path: "/guides/oem-vs-third-party-ink",
    available: true,
    category: "Supplies",
    guideNumber: 9
  },
  {
    id: "calculate-cost-per-page",
    title: "How to Calculate the True Cost Per Page for HP Inkjet Printers",
    description: "Master the formula for calculating your real printing costs including ink, paper, and maintenance expenses.",
    icon: DollarSign,
    color: "bg-yellow-500",
    readTime: "7 min read",
    path: "/guides/calculate-cost-per-page",
    available: true,
    category: "Cost Analysis",
    guideNumber: 10
  },
  {
    id: "print-volume-duty-cycle",
    title: "Print Volume & Duty Cycle: What You Should Know",
    description: "Understand monthly duty cycle ratings and how to match printer capacity with your actual printing volume.",
    icon: FileText,
    color: "bg-indigo-500",
    readTime: "6 min read",
    path: "/guides/print-volume-duty-cycle",
    available: true,
    category: "Specifications",
    guideNumber: 11
  },
  {
    id: "energy-efficiency-tco",
    title: "Energy Efficiency & Total Cost of Ownership for HP Inkjets",
    description: "Calculate the complete cost of owning an HP inkjet printer including energy consumption and long-term expenses.",
    icon: DollarSign,
    color: "bg-yellow-500",
    readTime: "7 min read",
    path: "/guides/energy-efficiency-tco",
    available: true,
    category: "Cost Analysis",
    guideNumber: 12
  },
  {
    id: "secure-private-printing",
    title: "Secure and Private Printing on HP Inkjet Printers",
    description: "Learn how to configure security settings and protect sensitive documents when printing on HP inkjet printers.",
    icon: Shield,
    color: "bg-red-500",
    readTime: "6 min read",
    path: "/guides/secure-private-printing",
    available: true,
    category: "Security",
    guideNumber: 13
  },
  {
    id: "firmware-updates-guide",
    title: "Firmware Updates for HP Inkjet Printers: Benefits & Risks",
    description: "Understand when and how to update your HP printer firmware, plus potential considerations to keep in mind.",
    icon: Wrench,
    color: "bg-slate-500",
    readTime: "5 min read",
    path: "/guides/firmware-updates-guide",
    available: true,
    category: "Maintenance",
    guideNumber: 14
  },
  {
    id: "mobile-cloud-printing",
    title: "Mobile & Cloud Printing with HP Inkjet Printers",
    description: "Set up and optimize mobile printing from smartphones, tablets, and cloud services with your HP inkjet.",
    icon: Smartphone,
    color: "bg-blue-600",
    readTime: "6 min read",
    path: "/guides/mobile-cloud-printing",
    available: true,
    category: "Mobile",
    guideNumber: 15
  },
  {
    id: "choosing-paper-inkjet",
    title: "Choosing the Right Paper for Inkjet Printing: Weight, Finish & More",
    description: "Select the optimal paper type for your inkjet printing needs, from everyday documents to photo prints.",
    icon: Package,
    color: "bg-amber-500",
    readTime: "5 min read",
    path: "/guides/choosing-paper-inkjet",
    available: true,
    category: "Supplies",
    guideNumber: 16
  },
  {
    id: "extend-ink-cartridge-life",
    title: "How to Extend the Life of HP Ink Cartridges Through Smart Usage",
    description: "Practical tips and techniques to maximize your ink cartridge lifespan and reduce printing costs.",
    icon: Coins,
    color: "bg-emerald-500",
    readTime: "6 min read",
    path: "/guides/extend-ink-cartridge-life",
    available: true,
    category: "Cost Savings",
    guideNumber: 17
  },
  {
    id: "high-volume-printing",
    title: "High-Volume Printing with HP Inkjets: Best Practices",
    description: "Optimize your HP inkjet printer for high-volume printing with tips for reliability and efficiency.",
    icon: Building2,
    color: "bg-orange-500",
    readTime: "7 min read",
    path: "/guides/high-volume-printing",
    available: true,
    category: "Business",
    guideNumber: 18
  },
  {
    id: "store-recycle-ink-cartridges",
    title: "How to Store & Recycle HP Ink Cartridges Responsibly",
    description: "Proper storage techniques for unused cartridges and environmentally responsible recycling options.",
    icon: Leaf,
    color: "bg-green-600",
    readTime: "5 min read",
    path: "/guides/store-recycle-ink-cartridges",
    available: true,
    category: "Environment",
    guideNumber: 19
  },
  {
    id: "all-in-one-vs-print-only",
    title: "All-in-One vs Print-Only HP Inkjets: Which Is Better for You",
    description: "Compare multifunction printers with dedicated print-only models to find the right fit for your needs.",
    icon: Scale,
    color: "bg-purple-500",
    readTime: "6 min read",
    path: "/guides/all-in-one-vs-print-only",
    available: true,
    category: "Comparison",
    guideNumber: 20
  },
  {
    id: "upgrading-accessories-add-ons",
    title: "Upgrading Your HP Inkjet: Extra Trays, Accessories & Add-Ons",
    description: "Expand your printer's capabilities with additional paper trays, accessories, and compatible add-ons.",
    icon: ArrowUpCircle,
    color: "bg-teal-500",
    readTime: "7 min read",
    path: "/guides/upgrading-accessories-add-ons",
    available: true,
    category: "Upgrades",
    guideNumber: 21
  },
  {
    id: "duplex-printing-efficiency",
    title: "Using Duplex (Double-Sided) Printing Efficiently on HP Inkjets",
    description: "Master automatic duplex printing to save paper, reduce costs, and improve your environmental footprint.",
    icon: Zap,
    color: "bg-violet-500",
    readTime: "5 min read",
    path: "/guides/duplex-printing-efficiency",
    available: true,
    category: "Efficiency",
    guideNumber: 22
  },
  {
    id: "environmental-factors-performance",
    title: "Environmental Factors That Impact HP Inkjet Performance",
    description: "Understand how temperature, humidity, and placement affect your printer's performance and longevity.",
    icon: Leaf,
    color: "bg-green-600",
    readTime: "6 min read",
    path: "/guides/environmental-factors-performance",
    available: true,
    category: "Environment",
    guideNumber: 23
  },
  {
    id: "print-speed-vs-quality",
    title: "Understanding Print Speed (PPM) vs Print Quality on HP Inkjets",
    description: "Learn how pages per minute ratings work and their relationship to actual print quality output.",
    icon: Cpu,
    color: "bg-cyan-500",
    readTime: "6 min read",
    path: "/guides/print-speed-vs-quality",
    available: true,
    category: "Technical",
    guideNumber: 24
  },
  {
    id: "hp-instant-ink-explained",
    title: "HP Instant Ink Explained: How It Works & Is It Worth It",
    description: "A complete breakdown of HP's Instant Ink subscription service, its pricing tiers, and who benefits most.",
    icon: DollarSign,
    color: "bg-yellow-500",
    readTime: "6 min read",
    path: "/guides/hp-instant-ink-explained",
    available: true,
    category: "Cost Analysis",
    guideNumber: 25
  },
  {
    id: "iso-page-yield-explained",
    title: "What ISO Page Yield Means for HP Ink & Why It Matters",
    description: "Decode the ISO/IEC 24711 standard for ink cartridge testing and what page yield numbers really mean.",
    icon: Cpu,
    color: "bg-cyan-500",
    readTime: "5 min read",
    path: "/guides/iso-page-yield-explained",
    available: true,
    category: "Technical",
    guideNumber: 26
  },
  {
    id: "standard-vs-xl-cartridges",
    title: "Standard vs XL/High-Yield HP Ink Cartridges: Which to Choose",
    description: "Compare standard and high-yield cartridge options to determine the most cost-effective choice for your usage.",
    icon: Coins,
    color: "bg-emerald-500",
    readTime: "6 min read",
    path: "/guides/standard-vs-xl-cartridges",
    available: true,
    category: "Cost Savings",
    guideNumber: 27
  },
  {
    id: "optimize-inkjet-settings",
    title: "How to Optimize HP Inkjet Settings for Cost-Saving & Efficiency",
    description: "Configure your HP inkjet printer settings to maximize efficiency, reduce waste, and lower printing costs.",
    icon: Settings,
    color: "bg-gray-500",
    readTime: "7 min read",
    path: "/guides/optimize-inkjet-settings",
    available: true,
    category: "Optimization",
    guideNumber: 28
  }
];

const categoryColors: Record<string, string> = {
  "Buying Guide": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Comparison": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Home Office": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Business": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Technical": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  "Maintenance": "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
  "Cost Analysis": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Supplies": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "Mobile": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Cost Savings": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  "Environment": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Upgrades": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  "Efficiency": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  "Optimization": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "Security": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Specifications": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
};

export default function BuyingGuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Badge variant="secondary" className="text-xs font-semibold" data-testid="badge-guide-count">
                28 COMPREHENSIVE GUIDES
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">
              HP Inkjet Printer Guide Library
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your complete resource for HP inkjet printer buying decisions, maintenance tips, cost optimization, and technical knowledge.
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">19,000+ Words</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Expert Reviewed</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Updated 2024</span>
              </div>
            </div>

            {/* Value Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20" data-testid="badge-professional">
                Professional Advice
              </Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20" data-testid="badge-save-money">
                Save Money
              </Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20" data-testid="badge-smart-choices">
                Make Smart Choices
              </Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20" data-testid="badge-ready-buy">
                Ready to Buy
              </Badge>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild data-testid="button-browse-printers">
                <Link href="/products">Browse All Printers</Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-contact-expert">
                <Link href="/contact">Get Expert Help</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-home">Home</span>
          </Link>
          {" / "}
          <span className="text-foreground">Buying Guides</span>
        </nav>

        {/* Introduction Section */}
        <Card className="mb-12 bg-muted/30 border-muted">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-guides-intro">
              Expert Guidance for Choosing the Right HP Inkjet Printer
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p data-testid="text-guides-intro-1">
                Choosing the right printer can be overwhelming with so many models, features, and price points available. Our buying guides are designed to simplify your decision by providing clear, expert recommendations tailored to specific use cases and budgets. Each guide is written by professionals with hands-on experience in the printing industry.
              </p>
              <p data-testid="text-guides-intro-2">
                Whether you are a student looking for an affordable printer for assignments, a home office worker needing reliable multifunction capabilities, a photography enthusiast seeking professional-quality prints, or a small business owner requiring high-volume output, we have a guide that addresses your specific needs.
              </p>
              <p data-testid="text-guides-intro-3">
                Our guides cover essential topics including print quality and resolution, speed and paper handling, connectivity options like WiFi and mobile printing, ink costs and page yields, and total cost of ownership. We provide honest assessments based on real-world testing, helping you understand which features matter most for your situation and which you can skip to save money.
              </p>
              <p data-testid="text-guides-intro-4">
                Browse our collection of {guides.length} comprehensive buying guides below. Each guide includes detailed recommendations for specific HP printer models that excel in their category. If you need personalized advice, our support team is available to help you find the perfect printer for your needs.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Our {guides.length} Buying Guides</h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a first-time buyer or looking to upgrade, our comprehensive guides will help you make an informed decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const cardContent = (
              <Card className={guide.available ? "hover-elevate active-elevate-2 cursor-pointer transition-all h-full" : "h-full opacity-75"} data-testid={`card-guide-${guide.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-xs font-medium" data-testid={`badge-guide-number-${guide.id}`}>
                      Guide #{guide.guideNumber}
                    </Badge>
                    <Badge className={`text-xs ${categoryColors[guide.category] || "bg-gray-100 text-gray-800"}`} data-testid={`badge-category-${guide.id}`}>
                      {guide.category}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-3 mt-3">
                    <div className={`w-10 h-10 ${guide.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight mb-2">{guide.title}</CardTitle>
                      <CardDescription className="text-sm">{guide.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{guide.readTime}</Badge>
                    {guide.available && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </CardContent>
              </Card>
            );

            return guide.available ? (
              <Link key={guide.id} href={guide.path} data-testid={`link-guide-${guide.id}`}>
                {cardContent}
              </Link>
            ) : (
              <div key={guide.id}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Why Read Our Guides */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Knowledge</h3>
            <p className="text-muted-foreground">
              Our guides are written by printing professionals with years of experience in the industry.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-World Testing</h3>
            <p className="text-muted-foreground">
              All recommendations are based on hands-on testing and real customer feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Value</h3>
            <p className="text-muted-foreground">
              We help you find the best printer for your budget without compromising on quality.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Printer?</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Browse our selection of HP inkjet printers or use our product finder to get personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild data-testid="button-shop-now">
              <Link href="/products">Shop All Printers</Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
