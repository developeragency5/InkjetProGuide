import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Package, Shield, Headphones, BookOpen, Star, CheckCircle, Award, TrendingUp, Users, Truck, CreditCard, Search, Printer, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { useLocation } from "wouter";

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
      title: "Successfully Subscribed! 🎉",
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
    <div className="min-h-screen">
      {/* Premium Trust Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/95 via-primary to-primary/95">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {/* Stat 1 - Happy Customers */}
            <div className="flex items-center justify-center gap-3 text-white" data-testid="stat-customers">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-sm text-white/90">Happy Customers</div>
              </div>
            </div>

            {/* Stat 2 - Free Shipping */}
            <div className="flex items-center justify-center gap-3 text-white" data-testid="stat-shipping">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Free Ship</div>
                <div className="text-sm text-white/90">Orders Over $299</div>
              </div>
            </div>

            {/* Stat 3 - Warranty */}
            <div className="flex items-center justify-center gap-3 text-white" data-testid="stat-warranty">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">OEM</div>
                <div className="text-sm text-white/90">Original Warranty</div>
              </div>
            </div>

            {/* Stat 4 - Support */}
            <div className="flex items-center justify-center gap-3 text-white" data-testid="stat-support">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Mon-Fri</div>
                <div className="text-sm text-white/90">9AM-6PM Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-transparent to-background/5"></div>
      </section>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-primary/5"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Trusted by 5,000+ Customers</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
                  Best Home Office Printer{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    & Inkjet Models
                  </span>{" "}
                  2025
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Top rated office printers featuring HP inkjet models and copier printer scanner combos. 
                  Expert support, premium hardware, and <span className="font-semibold text-foreground">instant troubleshooting for your office printing needs.</span>
                </p>
              </div>

              {/* Modern Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Trusted Support
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  OEM Warranty
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                  <Truck className="w-4 h-4 mr-2" />
                  Fast Delivery
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Price Match
                </Badge>
              </div>

              {/* Enhanced Search Bar */}
              <form onSubmit={handleSearch} className="relative group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Search className="absolute left-5 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      type="text"
                      placeholder="Search printers, guides, or get help..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-4 h-14 text-base border-2 focus:border-primary/50 rounded-lg shadow-sm"
                      data-testid="input-hero-search"
                    />
                  </div>
                </div>
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="flex-1 sm:flex-initial">
                  <Button size="lg" className="w-full sm:w-auto font-semibold px-8 shadow-lg hover:shadow-xl transition-shadow" data-testid="button-browse-printers">
                    Browse HP Printers
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1 sm:flex-initial">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold px-8 border-2" data-testid="button-get-help">
                    <Headphones className="mr-2 w-4 h-4" />
                    Get Help
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Enhanced Featured Product Card */}
            {heroProduct && (
              <div className="flex justify-center lg:justify-end" style={{ perspective: '1000px' }}>
                <div className="relative w-full max-w-lg">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-xl opacity-75"></div>
                  
                  <Card className="relative hover-elevate transition-all border-2 border-primary/10 shadow-2xl" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-2deg) rotateX(2deg)' }}>
                    <CardContent className="p-10">
                      {/* Bestseller Badge - Floating */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-6 py-1.5 text-xs font-bold shadow-lg border-0">
                          ⭐ BESTSELLER
                        </Badge>
                      </div>

                      {/* Printer Icon with Gradient */}
                      <div className="relative w-20 h-20 mx-auto mb-6 mt-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur"></div>
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                          <Printer className="w-10 h-10 text-primary" />
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-2xl font-bold text-center mb-2 leading-tight">
                        {heroProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mb-6">
                        {heroProduct.category}
                      </p>

                      {/* Price and Rating - Modern Layout */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            ${heroProduct.price}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 font-medium">Best Price</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-card border">
                          <div className="flex items-center gap-1 justify-center">
                            <span className="text-3xl font-bold">{heroProduct.rating}</span>
                            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 font-medium">Customer Rating</div>
                        </div>
                      </div>

                      {/* Specs with Icons */}
                      <div className="space-y-3 mb-6 p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Print Speed
                          </span>
                          <span className="font-semibold">24 PPM</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Connectivity
                          </span>
                          <span className="font-semibold">WiFi + Ethernet</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Warranty
                          </span>
                          <span className="font-semibold">Original OEM</span>
                        </div>
                      </div>

                      {/* Shop Now Button - Enhanced */}
                      <Link href={`/product/${heroProduct.id}`}>
                        <Button className="w-full font-semibold shadow-lg hover:shadow-xl transition-all" size="lg" data-testid="button-shop-hero-product">
                          Shop Now
                          <ShoppingCart className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                      
                      {/* Stock Indicator */}
                      <div className="text-center mt-4">
                        <p className="text-xs text-muted-foreground">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          In Stock • Ships within 2-3 business days
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect HP inkjet printer for your specific needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/products?category=All-in-One Printers" data-testid="link-category-allinone">
              <Card className="hover-elevate transition-all cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">All-in-One</h3>
                  <p className="text-sm text-muted-foreground">Print, scan, copy & fax in one device</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?category=Tank Printers" data-testid="link-category-tank">
              <Card className="hover-elevate transition-all cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Tank Printers</h3>
                  <p className="text-sm text-muted-foreground">High-volume refillable ink tanks</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?category=Mobile Printers" data-testid="link-category-mobile">
              <Card className="hover-elevate transition-all cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Mobile Printers</h3>
                  <p className="text-sm text-muted-foreground">Compact & portable for on-the-go</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?category=Photo Printers" data-testid="link-category-photo">
              <Card className="hover-elevate transition-all cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Photo Printers</h3>
                  <p className="text-sm text-muted-foreground">Professional photo quality prints</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-customers">5,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-models">25+</div>
              <div className="text-sm text-muted-foreground">HP Models Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-satisfaction">96%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="stat-support">2-3 Days</div>
              <div className="text-sm text-muted-foreground">Fast Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your perfect printer in 4 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Browse & Compare</h3>
              <p className="text-sm text-muted-foreground">
                Explore our extensive collection of HP inkjet printers with detailed specs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Read Guides</h3>
              <p className="text-sm text-muted-foreground">
                Use our expert buying guides to make an informed decision
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Order & Receive</h3>
              <p className="text-sm text-muted-foreground">
                Fast, free shipping with secure payment options
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Setup & Support</h3>
              <p className="text-sm text-muted-foreground">
                Follow our setup guides and get trusted support with office hours whenever you need it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Shipping Options */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Convenient Shopping Experience</h2>
            <p className="text-lg text-muted-foreground">
              We make it easy and secure to shop for your printer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Fast Shipping</h3>
                <p className="text-muted-foreground mb-4">
                  Free shipping on orders over $299. Expedited 2-3 day delivery available.
                </p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Track your order in real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Signature-required delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Secure packaging guarantee
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Flexible Payment</h3>
                <p className="text-muted-foreground mb-4">
                  Multiple payment options including credit cards, Stripe, and Cash on Delivery.
                </p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Secure Stripe payment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Cash on Delivery option
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    SSL encrypted checkout
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Buyer Protection</h3>
                <p className="text-muted-foreground mb-4">
                  Shop with confidence with our comprehensive buyer protection program.
                </p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    30-day money-back guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Price match guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Original OEM warranty
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Original OEM Warranty</h3>
                <p className="text-muted-foreground mb-4">
                  Every printer comes with HP's authentic manufacturer warranty for your peace of mind.
                </p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Full HP manufacturer coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Repair or replacement guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Direct HP support available
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
              <p className="text-lg text-muted-foreground">
                Our most popular HP printers, trusted by thousands of customers
              </p>
            </div>
            <Link href="/products?sort=rating">
              <Button variant="outline" className="hidden md:flex" data-testid="button-view-bestsellers">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-md mb-4" />
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                  NEW
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">
                Latest HP printer models with cutting-edge features
              </p>
            </div>
            <Link href="/products?inStock=true">
              <Button variant="outline" className="hidden md:flex" data-testid="button-view-new">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-md mb-4" />
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Shop by Price Range */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Price Range</h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect printer that fits your budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Budget-Friendly Section */}
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Budget-Friendly</h3>
                    <p className="text-muted-foreground">Under $300</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Affordable printers perfect for home use and occasional printing needs
                </p>
                <div className="space-y-3 mb-6">
                  {budgetFriendly.slice(0, 3).map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-md hover-elevate transition-all cursor-pointer" data-testid={`budget-product-${product.id}`}>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                        <div className="text-lg font-bold text-primary">${product.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/products?maxPrice=300">
                  <Button variant="outline" className="w-full" data-testid="button-view-budget">
                    View All Budget Options
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Section */}
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Premium Selection</h3>
                    <p className="text-muted-foreground">$500 and above</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Professional-grade printers with advanced features for business use
                </p>
                <div className="space-y-3 mb-6">
                  {premiumOptions.slice(0, 3).map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-md hover-elevate transition-all cursor-pointer" data-testid={`premium-product-${product.id}`}>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                        <div className="text-lg font-bold text-primary">${product.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/products?minPrice=500">
                  <Button variant="outline" className="w-full" data-testid="button-view-premium">
                    View All Premium Options
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured HP Inkjet Printers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our best-selling HP inkjet printers, carefully selected for reliability, 
              performance, and value
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-md mb-4" />
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/products">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="button-view-all-products">
                View All Printers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section - Free Guidance */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose InkjetProGuide?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We don't just sell printers - we provide complete guidance to help you 
              get the most from your HP inkjet printer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Complete Setup Guides</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step instructions for unboxing, setup, and Wi-Fi connection. 
                  Get printing in minutes with our easy-to-follow guides.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Detailed installation steps
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Troubleshooting tips
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Step-by-step guides
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Trusted Maintenance Support</h3>
                <p className="text-muted-foreground mb-4">
                  Keep your printer running smoothly with our comprehensive maintenance guides 
                  and ink cartridge information.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Cleaning & care instructions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Ink replacement guides
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Preventive maintenance tips
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Trusted Support with Office Hours</h3>
                <p className="text-muted-foreground mb-4">
                  Our team of printer specialists is here to help. Get expert answers 
                  to all your printing questions during office hours.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Phone & email support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Live chat assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-status-online" />
                    Same-day response guarantee
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Free shipping on all orders over $299. Fast 2-3 day delivery across the USA.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Original OEM Warranty</h3>
                <p className="text-muted-foreground">
                  All HP printers include a comprehensive Original OEM Warranty for peace of mind.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Easy Returns</h3>
                <p className="text-muted-foreground">
                  30-day money-back guarantee. Not satisfied? Return it for a full refund, no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands Customers
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers have to say about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "The setup guide was incredibly helpful! Had my new HP printer up and running 
                  in under 10 minutes. The detailed instructions made everything so easy."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Best customer service I've experienced. They helped me choose the perfect printer 
                  for my home office and answered all my questions promptly."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    JC
                  </div>
                  <div>
                    <p className="font-semibold">John Chen</p>
                    <p className="text-sm text-muted-foreground">Austin, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "The maintenance tips have been a game-changer. My printer runs like new thanks 
                  to their expert guidance on cleaning and care."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    EM
                  </div>
                  <div>
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Miami, FL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed & Save</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Get exclusive deals, expert printing tips, and new product updates delivered to your inbox. 
            Plus, receive a 10% discount code on your first order!
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md text-foreground border border-input bg-background"
              data-testid="input-newsletter"
            />
            <Button type="submit" size="lg" variant="default" className="font-semibold whitespace-nowrap" data-testid="button-subscribe">
              Get 10% Off
            </Button>
          </form>
          <p className="text-sm mt-4 text-muted-foreground">
            Join 5,000+ subscribers • No spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
