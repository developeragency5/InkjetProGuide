import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Package, Shield, Headphones, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import heroImage from "@assets/generated_images/Home_office_hero_banner_a75ba59e.png";

export default function HomePage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const bestSellers = products?.slice(0, 4) || [];
  const newArrivals = products?.slice(4, 8) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <img
          src={heroImage}
          alt="Modern home office with HP printer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <p className="text-primary-foreground/90 font-medium mb-3 tracking-wide uppercase text-sm">
              Best Sellers
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 tracking-tight leading-tight">
              Premium HP Inkjet Printers
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              Discover our curated selection of HP's finest inkjet printers. 
              From home offices to professional workflows, find the perfect printer for your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="font-semibold" data-testid="button-shop-now">
                  Shop Now
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="font-semibold bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-background/20" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Package className="w-5 h-5" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Headphones className="w-5 h-5" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/products?category=office">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-category-office">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Office Printers</h3>
                  <p className="text-sm text-muted-foreground">Professional printing solutions</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?category=home">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-category-home">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Home Printers</h3>
                  <p className="text-sm text-muted-foreground">Perfect for everyday use</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?category=portable">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-category-portable">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Portable</h3>
                  <p className="text-sm text-muted-foreground">Print on the go</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?category=accessories">
              <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid="card-category-accessories">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Accessories</h3>
                  <p className="text-sm text-muted-foreground">Ink and supplies</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold">Best Sellers</h2>
            <Link href="/products">
              <Button variant="outline" data-testid="button-view-all-bestsellers">
                View All
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

      {/* Value Propositions */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Free shipping on all orders over $50. Fast delivery across the USA.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">2-Year Warranty</h3>
                <p className="text-muted-foreground">
                  All printers come with comprehensive 2-year manufacturer warranty.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Expert Support</h3>
                <p className="text-muted-foreground">
                  24/7 customer support from our printer specialists.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold">New Arrivals</h2>
            <Link href="/products">
              <Button variant="outline" data-testid="button-view-all-newarrivals">
                View All
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

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Subscribe to our newsletter for exclusive deals, new product launches, and expert printing tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-foreground"
              data-testid="input-newsletter-cta"
            />
            <Button size="lg" variant="secondary" className="font-semibold" data-testid="button-subscribe-cta">
              Subscribe
            </Button>
          </div>
          <p className="text-sm mt-4 text-primary-foreground/70">
            Join 50,000+ satisfied customers
          </p>
        </div>
      </section>
    </div>
  );
}
