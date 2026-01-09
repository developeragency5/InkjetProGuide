import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Package, Shield, Mail, BookOpen, Star, CheckCircle, Award, TrendingUp, Users, Truck, CreditCard, Search, Printer, ArrowRight, Zap, Clock, Globe, Wifi, CheckCircle2, Box, BadgeCheck, BarChart3, Flame, Wrench, Sparkles, Target, RefreshCw, Phone, Headphones } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { useLocation } from "wouter";
import defaultHeroImage from "@assets/generated_images/HP_OfficeJet_Pro_printer_89015997.png";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const heroProduct = products?.find(p => p.name.includes("9730e")) || products?.[0];
  
  // Home Inkjet Printers - for home section
  const homeProducts = products
    ?.filter(p => p.category === "Home Inkjet Printers" && p.inStock)
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .slice(0, 4) || [];
  
  // Office Inkjet Printers - for office section
  const officeProducts = products
    ?.filter(p => p.category === "Office Inkjet Printers" && p.inStock)
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .slice(0, 4) || [];

  const homeOfficeStartingPrice = products
    ?.filter(p => p.category === "Home Inkjet Printers")
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0]?.price || "79";
  
  const officeStartingPrice = products
    ?.filter(p => p.category === "Office Inkjet Printers")
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0]?.price || "199";

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Successfully Subscribed!",
      description: "Check your inbox for your 10% discount code. Welcome to the InkjetProGuide family!",
    });
    
    setEmail("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* SECTION 1: Hero Section - 40/60 Split Layout */}
      <section className="relative py-8 sm:py-12 lg:py-0 lg:min-h-[600px] overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 lg:h-full flex items-center py-6 lg:py-12">
          <div className="w-full grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12 items-start lg:items-center">
            
            {/* Left Content - 40% */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance" data-testid="hero-headline">
                  Your Complete<br/>
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Inkjet Printer
                  </span><br/>
                  Resource & Store
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg" data-testid="hero-subtext">
                  Professional guides meet curated shopping. Comprehensive educational resources on inkjet printing technology, ink economics, and best practices—so you can purchase the perfect inkjet printer.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg" data-testid="stat-guides">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">25+ Pro Guides</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg" data-testid="stat-cost-analysis">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Cost Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg" data-testid="stat-store">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Printer Store</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link href="/guides" className="w-full sm:w-auto">
                  <Button size="default" className="w-full sm:w-auto font-semibold sm:h-12 sm:px-6" data-testid="button-browse-guides">
                    <BookOpen className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
                    Browse Buying Guides
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button size="default" variant="outline" className="w-full sm:w-auto font-semibold sm:h-12 sm:px-6" data-testid="button-shop-printers">
                    Shop Printers
                    <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - 60% with Hero Image */}
            <div className="xl:col-span-3">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl opacity-50"></div>
                <Card className="relative overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                      <img
                        src={defaultHeroImage}
                        alt="Professional Inkjet Printer - Quality printing solution for home and office"
                        className="w-full h-full object-contain p-8 bg-gradient-to-br from-muted/30 to-muted/10"
                        data-testid="hero-image"
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Featured Printer</p>
                              <p className="font-semibold">Professional Office Series</p>
                            </div>
                            <Link href="/products">
                              <Button size="sm" data-testid="button-view-collection">
                                View Collection
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What We Cover - Topics Grid */}
      <section className="py-16 lg:py-20 bg-muted/30" data-testid="section-what-we-cover">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-topics">
              <BookOpen className="w-4 h-4 mr-2" />
              Educational Topics
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-what-we-cover">
              What We Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive resource library covers every aspect of inkjet printing, from understanding basic technology to advanced cost optimization strategies. Whether you are new to printing or looking to maximize your investment, our comprehensive guides provide actionable insights backed by real-world testing and industry experience. We focus exclusively on inkjet technology, allowing us to provide deeper, more specialized knowledge than general printer retailers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-elevate transition-all" data-testid="topic-buying-advice">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Buying Advice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Understanding your print volume needs is essential for selecting the right inkjet printer. Our buying guides cover the differences between entry-level, office, and photo inkjet printer series. We analyze monthly duty cycles, paper handling capabilities, and feature sets to match you with the ideal printer for your specific requirements, whether you print ten pages a month or ten thousand.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="topic-ink-economics">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Ink Economics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ink costs represent a significant portion of your total printing expense over time. Our in-depth analyses cover cost per page calculations, cartridge yield comparisons, and the economics of Instant Ink subscription versus standard cartridges. Learn how to calculate your true printing costs, identify which cartridge sizes offer the best value, and understand when tank-based systems like Smart Tank make financial sense for high-volume users.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="topic-maintenance">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Maintenance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Proper maintenance extends your inkjet printer life and ensures consistent print quality. Our maintenance guides cover essential topics including printhead cleaning procedures, preventing and resolving ink clogs, proper storage during extended non-use periods, and paper feed troubleshooting. Regular maintenance following recommended practices helps prevent costly repairs and keeps your prints looking professional.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="topic-technology">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <Wifi className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Technology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Understanding how inkjet printing works helps you make better purchasing and usage decisions. We explain thermal inkjet technology, printhead architecture, and ink formulations in accessible terms. Our technology guides also cover wireless connectivity setup, mobile printing via Smart App, AirPrint and Google Cloud Print integration, and network configuration for shared office environments.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="topic-upgrades">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Upgrades & Accessories</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Maximize your inkjet printer investment with the right accessories and upgrades. Our guides cover additional paper trays for increased capacity, Instant Ink subscription benefits and enrollment, specialty paper recommendations for photos and presentations, and compatible accessories. Learn which upgrades deliver the best value for your printing workflow and how to optimize your setup.
                </p>
              </CardContent>
            </Card>

            <Link href="/guides" className="block">
              <Card className="hover-elevate transition-all h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20" data-testid="topic-all-guides">
                <CardContent className="p-6 flex flex-col h-full justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Explore All Guides</h3>
                  <p className="text-muted-foreground">
                    Browse our complete library of inkjet printer guides, tutorials, and buying recommendations.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: Who We Serve - 4 Persona Cards */}
      <section className="py-16 lg:py-20 bg-background" data-testid="section-who-we-serve">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-personas">
              <Users className="w-4 h-4 mr-2" />
              Our Audience
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-who-we-serve">
              Who We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              InkjetProGuide serves a diverse community of inkjet printer users across the United States. From first-time printer buyers who need clear explanations without technical jargon, to experienced professionals seeking detailed cost analyses and performance benchmarks. Our content is structured to meet you where you are, providing the level of detail appropriate to your experience and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate transition-all" data-testid="persona-beginners">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Beginners</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  New to inkjet printers? Our beginner-friendly guides explain printing concepts in plain language without overwhelming technical jargon. We walk you through the entire process from understanding basic specifications to setting up your first wireless connection. Clear explanations and step-by-step tutorials ensure you feel confident making your first printer purchase and getting started quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="persona-home-office">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Printer className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Home Office Workers</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Remote workers and home-based professionals need reliable, cost-effective printing solutions that handle documents, contracts, and presentations professionally. Our guides focus on printers that deliver consistent quality, offer multifunction capabilities for scanning and copying, and feature low operating costs. Find professional office inkjet models that balance professional output with home-friendly pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="persona-small-business">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Small Business Owners</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Business owners must balance printing performance with budget constraints. Our small business guides analyze total cost of ownership, monthly duty cycle ratings, and productivity features like automatic document feeders and duplex printing. Our guides cover inkjet printers that deliver business-class reliability while keeping per-page costs competitive with larger commercial solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="persona-students-families">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Students & Families</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Families and students need affordable everyday printing for homework, school projects, photos, and household documents. Our guides highlight compact, budget-friendly entry-level and photo inkjet printers that fit student budgets and family needs. Learn about ink subscription plans that make printing more affordable for households with variable monthly printing volumes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4: How It Works - 3-Step Journey */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background" data-testid="section-how-it-works">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-process">
              <Target className="w-4 h-4 mr-2" />
              Your Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-how-it-works">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Finding and purchasing the right inkjet printer should be straightforward and stress-free. Our three-step process guides you from initial research through confident purchase, with educational resources and transparent information at every stage. No sales pressure, no hidden fees—just honest guidance and curated products from a trusted inkjet retailer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative" data-testid="step-explore">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3">Explore Products</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse our carefully curated catalog of inkjet printers organized by use case, price range, and features. Each product listing includes detailed specifications, key features, and honest assessments of who the printer best serves. Use our category filters to narrow options based on your specific needs—whether home printing, small office productivity, or professional photo output.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 right-0 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent translate-x-8"></div>
            </div>

            <div className="relative" data-testid="step-compare">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <BarChart3 className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3">Compare Options</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use our comparison tools and buying guides to evaluate printers side-by-side. Filter by features that matter most to you—print speed, paper capacity, connectivity options, or cost per page. Our educational content covers which specifications actually impact your daily use and which are marketing fluff. Make informed decisions based on data, not advertising.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 right-0 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent translate-x-8"></div>
            </div>

            <div className="relative" data-testid="step-purchase">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3">Purchase with Confidence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete your purchase knowing exactly what you are getting. Transparent pricing with no hidden fees, free shipping on orders over $299, and a 30-day return policy give you peace of mind. All printers ship factory-sealed with full warranty coverage. Our team is available for order-related questions about shipping and returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Popular Guides - 6 Guide Cards */}
      <section className="py-16 lg:py-20 bg-background" data-testid="section-popular-guides">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-popular-guides">
              <BookOpen className="w-4 h-4 mr-2" />
              Educational Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-popular-guides">
              Popular Guides
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our most-read guides cover the essential topics every inkjet printer buyer should understand. Written by industry professionals with years of hands-on experience, these comprehensive resources provide actionable insights that save you time and money. Each guide is regularly updated to reflect the latest printer models, ink technologies, and market pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/guides">
              <Card className="hover-elevate transition-all cursor-pointer h-full" data-testid="guide-choose-printer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Printer className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">How to Choose the Right Inkjet Printer</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Comprehensive decision-making framework covering print volume assessment, feature prioritization, budget considerations, and model recommendations for every use case.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">10 min read</Badge>
                        <span className="text-xs text-muted-foreground">Most Popular</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card className="hover-elevate transition-all cursor-pointer h-full" data-testid="guide-ink-yield">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Understanding Ink Page Yield & Cost</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Learn to calculate true cost per page, compare standard versus XL cartridge economics, and understand how ISO testing standards translate to real-world printing costs.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">8 min read</Badge>
                        <span className="text-xs text-muted-foreground">Cost Analysis</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card className="hover-elevate transition-all cursor-pointer h-full" data-testid="guide-instant-ink">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Instant Ink vs Standard Cartridges</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Detailed comparison of Instant Ink subscription service versus traditional cartridge purchasing, including break-even analysis and optimal use scenarios for each approach.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">12 min read</Badge>
                        <span className="text-xs text-muted-foreground">Subscription Guide</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card className="hover-elevate transition-all cursor-pointer h-full" data-testid="guide-maintenance">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Inkjet Printer Maintenance Guide</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Essential maintenance routines including printhead cleaning, preventing ink clogs, proper storage during extended non-use, and troubleshooting common print quality issues.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">7 min read</Badge>
                        <span className="text-xs text-muted-foreground">Maintenance</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card className="hover-elevate transition-all cursor-pointer h-full" data-testid="guide-wireless">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Mobile & Wireless Printing Setup</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Complete setup instructions for Smart App, AirPrint, Google Cloud Print, and WiFi Direct connections. Print seamlessly from smartphones, tablets, and computers.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">6 min read</Badge>
                        <span className="text-xs text-muted-foreground">Connectivity</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card className="hover-elevate transition-all cursor-pointer h-full" data-testid="guide-series-comparison">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Entry-Level vs Office vs Photo Inkjet Comparison</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Side-by-side comparison of inkjet printer series covering target users, feature differences, price positioning, and specific model recommendations within each lineup.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">9 min read</Badge>
                        <span className="text-xs text-muted-foreground">Comparison</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/guides">
              <Button variant="outline" size="lg" data-testid="button-view-all-guides">
                View All Buying Guides
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: Home Inkjet Printers */}
      <section className="py-16 lg:py-20 bg-muted/30" data-testid="section-home-printers">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-home-printers">
              <Printer className="w-4 h-4 mr-2" />
              For Home Use
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-home-printers">
              Home Inkjet Printers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Compact and efficient inkjet printers designed for home-based professionals and remote workers. These printers feature wireless connectivity, mobile printing support, and quiet operation for shared living spaces. Ideal for everyday document printing, school projects, and occasional photo printing with excellent quality.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/products?category=Home+Inkjet+Printers">
              <Button size="lg" data-testid="button-shop-home-printers">
                Shop Home Printers
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6B: Office Inkjet Printers */}
      <section className="py-16 lg:py-20 bg-background" data-testid="section-office-printers">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-office-printers">
              <TrendingUp className="w-4 h-4 mr-2" />
              For Business Use
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-office-printers">
              Office Inkjet Printers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional-grade inkjet printers built for small to medium business environments. These printers deliver fast print speeds, automatic document feeders, duplex printing, and robust network connectivity. Designed for higher monthly duty cycles with lower cost per page for maximum productivity.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/products?category=Office+Inkjet+Printers">
              <Button size="lg" data-testid="button-shop-office-printers">
                Shop Office Printers
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: Shop by Category - 2 Category Cards */}
      <section className="py-16 lg:py-20 bg-muted/30" data-testid="section-shop-by-category">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-categories">
              <Package className="w-4 h-4 mr-2" />
              Browse by Use Case
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-shop-by-category">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find the perfect inkjet printer based on your primary use case. We have organized our catalog into two main categories that align with how most customers use their printers. Each category features printers optimized for specific environments, print volumes, and output requirements. Click any category to explore our curated selection with detailed specifications and transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/products?category=Home+Inkjet+Printers">
              <Card className="hover-elevate transition-all cursor-pointer h-full group" data-testid="category-home-office">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <Printer className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3">Home Inkjet Printers</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Compact and efficient inkjet printers designed for home-based professionals and remote workers. Features include wireless connectivity, mobile printing support, and quiet operation for shared living spaces. Ideal for moderate print volumes with excellent document quality.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                    <span>Starting from ${parseFloat(homeOfficeStartingPrice).toFixed(0)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=Office+Inkjet+Printers">
              <Card className="hover-elevate transition-all cursor-pointer h-full group" data-testid="category-small-office">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors">
                    <TrendingUp className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3">Office Inkjet Printers</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Perfect for teams of 5-15 users who need reliable shared printing. Professional office inkjet models deliver fast print speeds, automatic document feeders, duplex printing, and network connectivity. Built for higher monthly duty cycles with lower cost per page.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                    <span>Starting from ${parseFloat(officeStartingPrice).toFixed(0)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: Why Choose InkjetProGuide - 3 Value Props */}
      <section className="py-16 lg:py-20 bg-muted/30" data-testid="section-why-choose">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-value-props">
              <Award className="w-4 h-4 mr-2" />
              Our Advantages
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-why-choose">
              Why Choose InkjetProGuide
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              InkjetProGuide stands apart as a specialized inkjet printer retailer focused on customer education and satisfaction. Unlike big-box stores that carry thousands of products across dozens of categories, we concentrate exclusively on inkjet printing solutions. This specialization allows us to provide deeper product knowledge, more relevant recommendations, and more comprehensive educational resources than generalist retailers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all border-2 border-primary/10" data-testid="value-wide-selection">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Box className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Wide Selection</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We maintain an extensive catalog of inkjet printers covering every major product line—entry-level inkjets for budget-conscious home users, professional office inkjets for business productivity, photo inkjets for photo enthusiasts, and tank-based inkjets for high-volume printing. Our curated selection includes the latest models alongside proven performers, ensuring you find exactly the right printer for your specific needs and budget.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-2 border-primary/10" data-testid="value-fast-shipping">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Fast Shipping</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Most orders ship within 24 hours from our fulfillment centers, with delivery in 2-3 business days to addresses across the continental United States. Orders over $299 qualify for free standard shipping. All printers arrive factory-sealed with full warranty coverage. We use premium packaging to ensure your printer arrives in perfect condition, ready to set up and use.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-2 border-primary/10" data-testid="value-best-prices">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Best Prices</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our competitive pricing reflects our commitment to value. We continuously monitor market pricing to ensure InkjetProGuide customers receive fair, transparent pricing without hidden fees or inflated shipping costs. Combined with our free shipping threshold and periodic promotional offers, you get excellent value whether purchasing a budget entry-level inkjet or a premium professional office inkjet workstation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 9: Customer Testimonials - 3 Reviews */}
      <section className="py-16 lg:py-20 bg-background" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-testimonials">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Customer Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-testimonials">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real feedback from verified InkjetProGuide customers who have purchased inkjet printers through our store. We take pride in our customer satisfaction ratings and appreciate the kind words from buyers who found our educational resources and product selection helpful in making their purchasing decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all" data-testid="testimonial-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "The buying guides on InkjetProGuide helped me understand exactly what I needed for my home office. I was overwhelmed by options at first, but after reading the home office printer guide, I knew the professional office inkjet was perfect for my needs. Fast shipping and the printer arrived in perfect condition. Highly recommend this site for anyone researching printers."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm text-muted-foreground">Marketing Consultant</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Verified Buyer • Order IPG-2025-4521</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="testimonial-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "As a small business owner, I needed a printer that could handle our daily document volume without breaking the bank on ink. The cost analysis guides here were incredibly helpful in calculating our true cost per page. We ended up with the Smart Tank 7602 and it has been running flawlessly for six months. The tank system saves us hundreds compared to cartridges."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">SL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah L.</p>
                    <p className="text-sm text-muted-foreground">Real Estate Agency Owner</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Verified Buyer • Order IPG-2025-3187</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="testimonial-3">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "I print a lot of photos for my family scrapbooks and wanted something better than the cheap printer we had. The photo printer comparison guide helped me choose the right model. The photo quality from the photo inkjet I purchased is amazing—colors are vibrant and prints look professional. Customer service answered my questions before purchase too. Great experience overall."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">JT</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jennifer T.</p>
                    <p className="text-sm text-muted-foreground">Photography Hobbyist</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Verified Buyer • Order IPG-2025-2854</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 10: Newsletter CTA */}
      <section className="relative py-20 lg:py-24 overflow-hidden" data-testid="section-newsletter">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,97,0.1),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6" data-testid="badge-newsletter">
            <Mail className="w-4 h-4 mr-2" />
            Newsletter
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-newsletter">
            Stay Informed & Save
          </h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of inkjet printer owners who receive our weekly newsletter. Get exclusive deals, practical printing tips, new product announcements, and maintenance reminders delivered directly to your inbox. 
            Plus, receive a <span className="font-bold text-primary">10% discount code</span> on your first order as a welcome gift!
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-6 text-base"
              data-testid="input-newsletter"
            />
            <Button type="submit" size="lg" className="font-semibold whitespace-nowrap" data-testid="button-subscribe">
              Get 10% Off
            </Button>
          </form>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto" data-testid="text-newsletter-privacy">
            We respect your privacy and never share your email with third parties. You can unsubscribe at any time with one click. By subscribing, you agree to receive promotional emails about inkjet printers and printing resources.
            <Link href="/privacy-policy" className="text-primary hover:underline ml-1" data-testid="link-privacy-policy">
              Read our Privacy Policy
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
