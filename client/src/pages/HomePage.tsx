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

  const featuredProducts = products?.slice(0, 4) || [];
  const heroProduct = products?.find(p => p.name.includes("OfficeJet Pro 9730e")) || products?.[0];

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
      description: "Check your inbox for your 10% discount code. Welcome to the InjetProGuide family!",
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
      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Best Home Office Printer{" "}
                <span className="text-primary">& Inkjet Models</span>{" "}
                2025
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Top rated office printers featuring HP inkjet models and copier printer scanner combos. 
                Expert support, premium hardware, and <span className="font-semibold">instant troubleshooting for your office printing needs.</span>
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">24/7 Expert Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Original OEM Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Price Match Guarantee</span>
                </div>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search printers, guides, or get help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                    data-testid="input-hero-search"
                  />
                </div>
              </form>

              {/* Browse Button */}
              <Link href="/products">
                <Button size="lg" className="font-semibold" data-testid="button-browse-printers">
                  Browse HP Printers
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right Side - Featured Product Card */}
            {heroProduct && (
              <div className="flex justify-center lg:justify-end">
                <Card className="w-full max-w-md hover-elevate transition-all">
                  <CardContent className="p-8">
                    {/* Printer Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Printer className="w-8 h-8 text-primary" />
                    </div>

                    {/* Bestseller Badge */}
                    <div className="text-center mb-4">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">
                        BESTSELLER
                      </Badge>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-2xl font-bold text-center mb-2">
                      {heroProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-6">
                      {heroProduct.category}
                    </p>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          ${heroProduct.price}
                        </div>
                        <div className="text-xs text-muted-foreground">Best Price</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-2xl font-bold">{heroProduct.rating}</span>
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Print Speed</span>
                        <span className="font-medium">24 PPM</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Connectivity</span>
                        <span className="font-medium">WiFi + Ethernet</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Warranty</span>
                        <span className="font-medium">Original OEM</span>
                      </div>
                    </div>

                    {/* Shop Now Button */}
                    <Link href={`/product/${heroProduct.id}`}>
                      <Button className="w-full font-semibold" size="lg" data-testid="button-shop-hero-product">
                        Shop Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
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
              Why Choose InjetProGuide?
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
                    Video tutorials available
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Expert Maintenance Support</h3>
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
                <h3 className="font-semibold text-xl mb-3">24/7 Support</h3>
                <p className="text-muted-foreground mb-4">
                  Our team of printer specialists is here to help. Get expert answers 
                  to all your printing questions anytime.
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
                <h3 className="font-semibold text-xl mb-3">2-Year Warranty</h3>
                <p className="text-muted-foreground">
                  All HP printers include a comprehensive 2-year manufacturer warranty for peace of mind.
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
            Join 50,000+ subscribers • No spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
