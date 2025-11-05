import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Package, Shield, Headphones, BookOpen, Star, CheckCircle, Award, TrendingUp, Users, Truck, CreditCard, Search, Printer, ArrowRight, Zap, Clock, Globe, Wifi, CheckCircle2, Box, BadgeCheck, BarChart3, Flame, Wrench } from "lucide-react";
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

  const heroProduct = products?.find(p => p.name.includes("OfficeJet Pro 9730e")) || products?.[0];
  
  // Track used product IDs to ensure no duplicates across sections
  const usedProductIds = new Set<string>();
  
  // Best Sellers (top-rated products with rating >= 4.5) - First priority
  const bestSellers = products
    ?.slice()
    .filter(p => {
      const rating = p.rating ? parseFloat(p.rating) : 0;
      return rating >= 4.5;
    })
    .sort((a, b) => {
      const ratingA = a.rating ? parseFloat(a.rating) : 0;
      const ratingB = b.rating ? parseFloat(b.rating) : 0;
      return ratingB - ratingA;
    })
    .slice(0, 4) || [];
  
  bestSellers.forEach(p => usedProductIds.add(p.id));
  
  // New Arrivals (newest in-stock products) - Second priority, exclude used products
  const newArrivals = products
    ?.filter(p => p.inStock === true && !usedProductIds.has(p.id))
    .slice(0, 4) || [];
  
  newArrivals.forEach(p => usedProductIds.add(p.id));
  
  // Premium options (over $500, sorted by rating) - Third priority
  const premiumOptions = products
    ?.filter(p => parseFloat(p.price) > 500 && !usedProductIds.has(p.id))
    .sort((a, b) => {
      const ratingA = a.rating ? parseFloat(a.rating) : 0;
      const ratingB = b.rating ? parseFloat(b.rating) : 0;
      return ratingB - ratingA;
    })
    .slice(0, 4) || [];
  
  premiumOptions.forEach(p => usedProductIds.add(p.id));
  
  // Budget-friendly options (under $300, sorted by rating) - Fourth priority
  const budgetFriendly = products
    ?.filter(p => parseFloat(p.price) < 300 && !usedProductIds.has(p.id))
    .sort((a, b) => {
      const ratingA = a.rating ? parseFloat(a.rating) : 0;
      const ratingB = b.rating ? parseFloat(b.rating) : 0;
      return ratingB - ratingA;
    })
    .slice(0, 4) || [];
  
  budgetFriendly.forEach(p => usedProductIds.add(p.id));
  
  // Featured Products - Show highly rated products not yet used
  let featuredProducts = products
    ?.filter(p => {
      const rating = p.rating ? parseFloat(p.rating) : 0;
      return rating >= 4.0 && !usedProductIds.has(p.id);
    })
    .sort((a, b) => {
      const ratingA = a.rating ? parseFloat(a.rating) : 0;
      const ratingB = b.rating ? parseFloat(b.rating) : 0;
      return ratingB - ratingA;
    })
    .slice(0, 4) || [];
  
  // If we don't have enough featured products, fill with remaining top-rated products
  if (featuredProducts.length < 4) {
    const additionalProducts = products
      ?.filter(p => !usedProductIds.has(p.id))
      .sort((a, b) => {
        const ratingA = a.rating ? parseFloat(a.rating) : 0;
        const ratingB = b.rating ? parseFloat(b.rating) : 0;
        return ratingB - ratingA;
      })
      .slice(0, 4 - featuredProducts.length) || [];
    
    featuredProducts = [...featuredProducts, ...additionalProducts];
  }

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Successfully Subscribed!",
      description: "Check your inbox for your 10% discount code. Welcome to the InkjetProGuide family!",
    });
    
    // Clear the email input
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
      {/* Services-Focused Hero Section */}
      <section className="relative h-[60vh] min-h-[600px] overflow-hidden">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Left Content - 40% */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border shadow-sm" data-testid="hero-trust-badge">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Serving 5,000+ Businesses Since 2020</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Your Complete<br/>
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Printer Solution
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Trusted support, authentic HP products, and professional service for all your printing needs.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg opacity-25 group-hover:opacity-40 blur transition"></div>
                  <div className="relative flex items-center bg-card border shadow-sm">
                    <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search for HP printers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 border-0 bg-transparent focus-visible:ring-0 text-base"
                      data-testid="input-hero-search"
                    />
                  </div>
                </div>
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="font-semibold h-12 px-6" data-testid="button-browse-printers">
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Browse Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="font-semibold h-12 px-6" data-testid="button-get-help">
                    Get Trusted Help
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Services Showcase - 60% */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Service Card 1 - Trusted Support */}
                <Card className="relative hover-elevate transition-all" data-testid="service-trusted-support">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                  <CardContent className="p-6 space-y-3 relative">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Trusted Support</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Professional troubleshooting and technical assistance from certified HP specialists.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mon-Fri 9AM-6PM EST</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Card 2 - Free Shipping */}
                <Card className="relative hover-elevate transition-all" data-testid="service-free-shipping">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                  <CardContent className="p-6 space-y-3 relative">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Complimentary shipping on orders over $299 across the United States with fast delivery.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ships within 24 hours</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Card 3 - OEM Warranty */}
                <Card className="relative hover-elevate transition-all" data-testid="service-oem-warranty">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                  <CardContent className="p-6 space-y-3 relative">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">OEM Warranty</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Full manufacturer warranty coverage on all HP printers with guaranteed authenticity.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>100% Authentic Products</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Card 4 - Installation Help */}
                <Card className="relative hover-elevate transition-all" data-testid="service-setup-assistance">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                  <CardContent className="p-6 space-y-3 relative">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Setup Assistance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Step-by-step installation guides and remote setup support for all HP printer models.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Remote & phone support</span>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Bottom CTA Card */}
              <Card className="mt-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20" data-testid="service-help-cta">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Need help choosing?</h3>
                      <p className="text-sm text-muted-foreground">
                        Our printer specialists are ready to assist you
                      </p>
                    </div>
                    <Link href="/contact">
                      <Button variant="secondary" className="font-semibold" data-testid="button-shop-hero-product">
                        Contact Us
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner with Glassmorphism - SINGLE LOCATION */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center backdrop-blur-sm bg-card/50 rounded-2xl p-8 hover-elevate" data-testid="stat-customers">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">5,000+</div>
              <div className="text-sm text-muted-foreground font-medium">Happy Customers</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-card/50 rounded-2xl p-8 hover-elevate" data-testid="stat-shipping">
              <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">Free Ship</div>
              <div className="text-sm text-muted-foreground font-medium">Orders Over $299</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-card/50 rounded-2xl p-8 hover-elevate" data-testid="stat-warranty">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">OEM</div>
              <div className="text-sm text-muted-foreground font-medium">Original Warranty</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-card/50 rounded-2xl p-8 hover-elevate" data-testid="stat-support">
              <Headphones className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">Mon-Fri</div>
              <div className="text-sm text-muted-foreground font-medium">9AM-6PM Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect HP inkjet printer for your specific needs
            </p>
          </div>
          
          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
            {/* All-in-One - Large */}
            <Link href="/products?category=All-in-One Printers" className="md:col-span-2 md:row-span-2" data-testid="link-category-allinone">
              <Card className="h-full hover-elevate transition-all cursor-pointer group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-12 flex flex-col justify-center items-center h-full text-center relative z-10">
                  <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-3xl mb-4">All-in-One Printers</h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    Print, scan, copy & fax in one powerful device
                  </p>
                  <Badge variant="secondary">Most Popular</Badge>
                </CardContent>
              </Card>
            </Link>

            {/* Tank Printers - Medium */}
            <Link href="/products?category=Tank Printers" className="md:col-span-2" data-testid="link-category-tank">
              <Card className="h-full hover-elevate transition-all cursor-pointer group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-10 flex items-center gap-6 h-full relative z-10">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">Tank Printers</h3>
                    <p className="text-muted-foreground">High-volume refillable ink tanks</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Mobile Printers - Medium */}
            <Link href="/products?category=Mobile Printers" className="md:col-span-1" data-testid="link-category-mobile">
              <Card className="h-full hover-elevate transition-all cursor-pointer group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 flex flex-col justify-center items-center h-full text-center relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Mobile</h3>
                  <p className="text-sm text-muted-foreground">Portable printing</p>
                </CardContent>
              </Card>
            </Link>

            {/* Photo Printers - Medium */}
            <Link href="/products?category=Photo Printers" className="md:col-span-1" data-testid="link-category-photo">
              <Card className="h-full hover-elevate transition-all cursor-pointer group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 flex flex-col justify-center items-center h-full text-center relative z-10">
                  <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Photo</h3>
                  <p className="text-sm text-muted-foreground">Pro quality</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-models">25+</div>
              <div className="text-sm text-muted-foreground">HP Models Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-satisfaction">96%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-delivery">2-3 Days</div>
              <div className="text-sm text-muted-foreground">Fast Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-warranty-period">1 Year</div>
              <div className="text-sm text-muted-foreground">OEM Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Timeline - How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Get your perfect printer in 4 simple steps
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20"></div>

            {/* Step 1 - Left */}
            <div className="relative mb-16 md:mb-20">
              <div className="flex items-center gap-8">
                <div className="hidden md:flex flex-1 justify-end pr-12">
                  <Card className="max-w-md hover-elevate">
                    <CardContent className="p-8 text-right">
                      <h3 className="font-bold text-2xl mb-3">Browse & Compare</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Explore our curated selection of HP printers. Compare features, specs, and prices to find your perfect match.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10 flex-shrink-0">
                  1
                </div>
                <div className="flex-1 md:hidden">
                  <Card className="hover-elevate">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-2">Browse & Compare</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore our curated selection of HP printers. Compare features, specs, and prices to find your perfect match.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block flex-1"></div>
              </div>
            </div>

            {/* Step 2 - Right */}
            <div className="relative mb-16 md:mb-20">
              <div className="flex items-center gap-8">
                <div className="hidden md:block flex-1"></div>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10 flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <Card className="max-w-md hover-elevate">
                    <CardContent className="p-8">
                      <h3 className="font-bold text-2xl mb-3">Get Expert Advice</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our printer specialists are ready to answer questions and help you choose the right model for your needs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Step 3 - Left */}
            <div className="relative mb-16 md:mb-20">
              <div className="flex items-center gap-8">
                <div className="hidden md:flex flex-1 justify-end pr-12">
                  <Card className="max-w-md hover-elevate">
                    <CardContent className="p-8 text-right">
                      <h3 className="font-bold text-2xl mb-3">Secure Checkout</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Complete your purchase with our secure payment system. We accept all major credit cards and cash on delivery.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10 flex-shrink-0">
                  3
                </div>
                <div className="flex-1 md:hidden">
                  <Card className="hover-elevate">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-2">Secure Checkout</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete your purchase with our secure payment system. We accept all major credit cards and cash on delivery.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block flex-1"></div>
              </div>
            </div>

            {/* Step 4 - Right */}
            <div className="relative">
              <div className="flex items-center gap-8">
                <div className="hidden md:block flex-1"></div>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10 flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <Card className="max-w-md hover-elevate">
                    <CardContent className="p-8">
                      <h3 className="font-bold text-2xl mb-3">Fast Delivery & Setup</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Receive your printer within 2-3 business days with free shipping. Get lifetime access to our setup guides and support.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Top Rated
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Best Sellers</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most popular HP printers trusted by thousands
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <CardContent className="p-6">
                    <div className="bg-muted h-full rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="button-view-all-bestsellers">
                View All Best Sellers
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20">
              <Zap className="w-4 h-4 mr-2" />
              Just Arrived
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">New Arrivals</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest HP printer models with cutting-edge features
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <CardContent className="p-6">
                    <div className="bg-muted h-full rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Budget-Friendly */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-500/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Best Value
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Budget-Friendly</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Quality printers that won't break the bank
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <CardContent className="p-6">
                    <div className="bg-muted h-full rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {budgetFriendly.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-picked selections for every printing need
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <CardContent className="p-6">
                    <div className="bg-muted h-full rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose InkjetProGuide</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for HP printer solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Expert Guides</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive setup guides, troubleshooting tips, and maintenance tutorials written by HP-certified technicians.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Genuine Products</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All our printers are 100% authentic with original manufacturer warranty. No refurbished or counterfeit products ever.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Mon-Fri 9AM-6PM Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated support team is available during business hours to help with any questions or technical issues you encounter.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Fast Shipping</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Free delivery on orders over $299. Most orders ship within 24 hours and arrive in 2-3 business days nationwide.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Secure Payments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Industry-standard encryption protects your payment information. We accept all major credit cards and cash on delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Easy Returns</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hassle-free returns within 30 days. Not satisfied? Return it for a full refund, no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Knowledge Base CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Access our comprehensive knowledge base with setup guides, troubleshooting tips, and expert recommendations to help you make the right decision.
          </p>
          <Link href="/knowledge-base">
            <Button size="lg" className="font-semibold shadow-xl" data-testid="button-knowledge-base">
              Browse Knowledge Base
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Thousands of Customers
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              See what our customers have to say about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all border-2 border-primary/10">
              <CardContent className="p-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 italic text-lg leading-relaxed">
                  "The setup guide was incredibly helpful! Had my new HP printer up and running 
                  in under 10 minutes. The detailed instructions made everything so easy."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-lg">
                    SM
                  </div>
                  <div>
                    <p className="font-bold text-lg">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-2 border-primary/10">
              <CardContent className="p-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 italic text-lg leading-relaxed">
                  "Best customer service I've experienced. They helped me choose the perfect printer 
                  for my home office and answered all my questions promptly."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-lg">
                    JC
                  </div>
                  <div>
                    <p className="font-bold text-lg">John Chen</p>
                    <p className="text-sm text-muted-foreground">Austin, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-2 border-primary/10">
              <CardContent className="p-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 italic text-lg leading-relaxed">
                  "The maintenance tips have been a game-changer. My printer runs like new thanks 
                  to their expert guidance on cleaning and care."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-lg">
                    EM
                  </div>
                  <div>
                    <p className="font-bold text-lg">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Miami, FL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,97,0.1),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Exclusive Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Stay Informed & Save</h2>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get exclusive deals, expert printing tips, and new product updates delivered to your inbox. 
            Plus, receive a <span className="font-bold text-primary">10% discount code</span> on your first order!
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl text-foreground border-2 border-input bg-background text-base focus:outline-none focus:border-primary transition-colors"
              data-testid="input-newsletter"
            />
            <Button type="submit" size="lg" className="font-semibold whitespace-nowrap shadow-xl" data-testid="button-subscribe">
              Get 10% Off
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Join 5,000+ subscribers • No spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
