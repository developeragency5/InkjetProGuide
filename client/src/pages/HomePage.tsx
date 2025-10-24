import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Shield, Headphones, BookOpen, Star, CheckCircle, Award, TrendingUp, Users, Truck, CreditCard } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import heroImage from "@assets/generated_images/HP_printer_hero_image_f29965e7.png";

export default function HomePage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
        <img
          src={heroImage}
          alt="HP inkjet printer on modern desk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm">
              Your Trusted HP Inkjet Printer Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight leading-tight">
              Expert Guidance for Every Print
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/95 mb-8 leading-relaxed">
              Find the perfect HP inkjet printer with comprehensive setup guides, maintenance tips, 
              and expert support. From home offices to professional printing, we help you choose right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="font-semibold text-lg px-8" data-testid="button-browse-printers">
                  Browse All Printers
                </Button>
              </Link>
              <Link href="/products">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="font-semibold text-lg px-8 bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20" 
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3 text-primary-foreground/95 bg-background/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Original OEM Warranty</p>
                  <p className="text-xs text-primary-foreground/80">Comprehensive protection on all HP models</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/95 bg-background/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">24/7 Expert Support</p>
                  <p className="text-xs text-primary-foreground/80">Technical assistance whenever you need it</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/95 bg-background/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Free Shipping</p>
                  <p className="text-xs text-primary-foreground/80">Next-day delivery on orders over $299</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/95 bg-background/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Flexible Payment</p>
                  <p className="text-xs text-primary-foreground/80">0% financing available for qualified businesses</p>
                </div>
              </div>
            </div>
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
                <h3 className="font-semibold text-xl mb-3">24/7 USA-Based Support</h3>
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
                  Free shipping on all orders over $50. Fast 2-3 day delivery across the USA.
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
              Trusted by Thousands of USA Customers
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
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed & Save</h2>
          <p className="text-lg mb-8 text-primary-foreground/95">
            Get exclusive deals, expert printing tips, and new product updates delivered to your inbox. 
            Plus, receive a 10% discount code on your first order!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md text-foreground"
              data-testid="input-newsletter"
            />
            <Button size="lg" variant="secondary" className="font-semibold whitespace-nowrap" data-testid="button-subscribe">
              Get 10% Off
            </Button>
          </div>
          <p className="text-sm mt-4 text-primary-foreground/80">
            Join 50,000+ subscribers • No spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
