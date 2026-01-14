import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Clock, Users, GraduationCap, Briefcase, Camera, Building2, CheckCircle, DollarSign, Zap, Wifi, Droplets } from "lucide-react";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";

export default function GuidesPage() {
  const guides = [
    {
      number: 1,
      category: "Buying Guide",
      title: "How to Choose the Right Inkjet Printer: Complete Buying Guide",
      description: "A comprehensive overview to help you select the ideal inkjet printer based on usage, budget, and long-term costs.",
      readTime: "8 min read"
    },
    {
      number: 2,
      category: "Comparison",
      title: "Entry-Level vs Office vs Photo Inkjets: Which Series Should You Choose",
      description: "A clear comparison of the three main inkjet categories and their ideal use cases.",
      readTime: "7 min read"
    },
    {
      number: 3,
      category: "Comparison",
      title: "Professional vs Basic Office Inkjets: Key Differences Explained",
      description: "Understand performance, durability, and cost differences between standard and professional office printers.",
      readTime: "6 min read"
    },
    {
      number: 4,
      category: "Home Office",
      title: "Best Inkjet Printers for Home Use",
      description: "Top picks for home environments balancing affordability, print quality, and wireless convenience.",
      readTime: "7 min read"
    },
    {
      number: 5,
      category: "Business",
      title: "Best Inkjet Printers for Small & Medium Business",
      description: "Reliable office printers designed to boost productivity and reduce operational expenses.",
      readTime: "8 min read"
    },
    {
      number: 6,
      category: "Technical",
      title: "Smart Tank Printers: Complete Guide to Tank-Based Printing",
      description: "How refillable ink tank systems drastically lower long-term printing costs.",
      readTime: "7 min read"
    },
    {
      number: 7,
      category: "Maintenance",
      title: "Inkjet Printhead Maintenance & Cleaning Guide",
      description: "Step-by-step instructions to keep your printer producing clean, consistent output.",
      readTime: "6 min read"
    },
    {
      number: 8,
      category: "Cost Analyzing",
      title: "Understanding Ink Page Yield and How It Affects Cost",
      description: "Learn how page yield ratings impact real-world printing expenses.",
      readTime: "5 min read"
    },
    {
      number: 9,
      category: "Protection",
      title: "Warranty & Protection Plans for Inkjet Printers",
      description: "What's covered, what's not, and when extended protection makes sense.",
      readTime: "6 min read"
    },
    {
      number: 10,
      category: "Troubleshooting",
      title: "Inkjet Printer Troubleshooting: Common Issues & Solutions",
      description: "Fix paper jams, connectivity problems, and print quality issues quickly.",
      readTime: "7 min read"
    },
    {
      number: 11,
      category: "Getting Started",
      title: "Beginner's Guide to Inkjet Printers",
      description: "Everything you need to know from setup to your first print.",
      readTime: "6 min read"
    },
    {
      number: 12,
      category: "Cost Analyzing",
      title: "Energy Efficiency & Total Cost of Ownership for Inkjets",
      description: "Understand long-term energy use and operating expenses.",
      readTime: "7 min read"
    },
    {
      number: 13,
      category: "Security",
      title: "Secure and Private Printing on Inkjet Printers",
      description: "Protect sensitive documents on home and office printers.",
      readTime: "6 min read"
    },
    {
      number: 14,
      category: "Maintenance",
      title: "Firmware Updates for Inkjet Printers: Benefits & Risks",
      description: "When updates help—and when they can cause issues.",
      readTime: "5 min read"
    },
    {
      number: 15,
      category: "Mobile",
      title: "Mobile & Cloud Printing with Inkjet Printers",
      description: "Print wirelessly from phones, tablets, and cloud services.",
      readTime: "6 min read"
    },
    {
      number: 16,
      category: "Supplies",
      title: "Choosing the Right Paper for Inkjet Printing",
      description: "Paper weight, finish, and compatibility explained.",
      readTime: "5 min read"
    },
    {
      number: 17,
      category: "Cost Savings",
      title: "How to Extend the Life of Ink Cartridges Through Smart Usage",
      description: "Reduce ink costs without sacrificing quality.",
      readTime: "6 min read"
    },
    {
      number: 18,
      category: "Business",
      title: "High-Volume Printing with Inkjets: Best Practices",
      description: "Optimize reliability and efficiency for heavy workloads.",
      readTime: "7 min read"
    },
    {
      number: 19,
      category: "Environment",
      title: "How to Store & Recycle Ink Cartridges Responsibly",
      description: "Eco-friendly storage and recycling solutions.",
      readTime: "5 min read"
    },
    {
      number: 20,
      category: "Comparison",
      title: "All-in-One vs Print-Only Inkjets",
      description: "Which configuration best fits your printing needs?",
      readTime: "8 min read"
    },
    {
      number: 21,
      category: "Upgrades",
      title: "Upgrading Your Inkjet: Trays, Accessories & Add-Ons",
      description: "Expand your printer's capabilities.",
      readTime: "8 min read"
    },
    {
      number: 22,
      category: "Efficiency",
      title: "Using Duplex Printing Efficiently on Inkjets",
      description: "Save paper and money with double-sided printing.",
      readTime: "7 min read"
    },
    {
      number: 23,
      category: "Environment",
      title: "Environmental Factors That Impact Inkjet Performance",
      description: "How temperature and humidity affect print quality.",
      readTime: "8 min read"
    },
    {
      number: 24,
      category: "Technical",
      title: "Understanding Print Speed (PPM) vs Print Quality",
      description: "What speed ratings truly mean in real-world use.",
      readTime: "9 min read"
    },
    {
      number: 25,
      category: "Specifications",
      title: "Wide-Format Inkjet Printing Guide",
      description: "Large-format printing explained.",
      readTime: "8 min read"
    },
    {
      number: 26,
      category: "Technical",
      title: "Specialty Printing: Labels, Envelopes & Card Stock",
      description: "Handle non-standard media with confidence.",
      readTime: "8 min read"
    },
    {
      number: 27,
      category: "Mobile",
      title: "Portable Printing: Print Anywhere Solutions",
      description: "Compact wireless printers for travel and remote work.",
      readTime: "7 min read"
    },
    {
      number: 28,
      category: "Cost Analyzing",
      title: "Instant Ink Subscription: Complete Guide",
      description: "Pricing, limits, and whether subscription ink is worth it.",
      readTime: "9 min read"
    }
  ];

  const useCases = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Seeking an affordable home printer for assignments and everyday documents"
    },
    {
      icon: Briefcase,
      title: "Home Office Professionals",
      description: "Needing dependable multifunction and wireless printing"
    },
    {
      icon: Camera,
      title: "Photography Enthusiasts",
      description: "Looking for exceptional color accuracy and photo quality"
    },
    {
      icon: Building2,
      title: "Small & Medium Businesses",
      description: "Requiring fast, cost-efficient office printers for high-volume workloads"
    }
  ];

  const coverageTopics = [
    {
      icon: CheckCircle,
      title: "Print quality & resolution",
      description: "For documents and photos"
    },
    {
      icon: Zap,
      title: "Speed, duty cycle, and paper handling",
      description: "For productivity"
    },
    {
      icon: Wifi,
      title: "Connectivity options",
      description: "Including WiFi, mobile, and cloud printing"
    },
    {
      icon: Droplets,
      title: "Ink costs, page yield, and refill options",
      description: "Understanding ongoing expenses"
    },
    {
      icon: DollarSign,
      title: "Total cost of ownership",
      description: "Not just upfront price"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="guides" fallbackTitle="Inkjet Printer Guide Library | InkjetProGuide" />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Resource Library
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-guides-title">
              Inkjet Printer Guide Library
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your complete resource for inkjet printer buying decisions, maintenance tips, cost optimization, and technical knowledge
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/products#!/Inkjet-Printers/c/193859557">
                <Button size="lg" data-testid="button-browse-printers">
                  Browse All Printers
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Comprehensive Guidance for Choosing the Right Inkjet Printer</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Choosing the right inkjet printer can feel overwhelming with hundreds of models, feature sets, and price ranges available today. If you need a good home printer, an office printer, or a wireless printer with many features, we can help. Check out our buying guides for assistance.
              </p>
              <p>
                Professionals with hands-on experience in the printing industry write and review each guide. We focus on real-world performance—not marketing claims—so you can confidently choose a printer that fits your needs and budget.
              </p>
            </div>
          </div>
        </div>

        {/* Tailored Advice Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Tailored Printer Advice for Every Use Case</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            No two users print the same way. That's why our guides are organized by real-world scenarios:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What Our Guides Cover */}
        <div className="mb-16 bg-muted/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">What Our Inkjet Printer Guides Cover</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our comprehensive buying guides dive deep into the factors that matter most:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {coverageTopics.map((topic) => (
              <div key={topic.title} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <topic.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{topic.title}</p>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 max-w-2xl mx-auto">
            We give clear, side-by-side reviews based on real testing. This helps you see which features are important and which you can skip to save money.
          </p>
        </div>

        {/* All 28 Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">Explore Our 28 Inkjet Printer Buying Guides</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you are buying your first home printer or upgrading an office printer, our guides help you make a smart choice.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <Card key={guide.number} className="hover-elevate transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{guide.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {guide.category}
                      </Badge>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2" data-testid={`guide-title-${guide.number}`}>
                        {guide.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Printer?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Browse our curated selection of inkjet printers or contact us for order-related inquiries.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/products#!/Inkjet-Printers/c/193859557">
                  <Button size="lg" data-testid="button-shop-printers">
                    Shop Printers
                  </Button>
                </a>
                <Link href="/contact">
                  <Button size="lg" variant="outline" data-testid="button-contact">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
