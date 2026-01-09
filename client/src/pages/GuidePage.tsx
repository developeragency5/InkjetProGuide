import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer, Search, BookOpen, FileText, Star, ArrowRight, Zap, Wifi, Droplet } from "lucide-react";
import type { Product } from "@shared/schema";

export default function GuidePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Count categories
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories);
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Printer className="w-10 h-10 text-primary" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Inkjet <span className="text-primary">Models</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Select your inkjet printer model to access specific setup guides, troubleshooting
              tips, and detailed instructions tailored for your exact printer.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold">{products?.length || 0} current models</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold">{products?.length || 0} guides available</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="font-semibold">Current lineup</span>
              </div>
            </div>

            {/* Printer Guides Button */}
            <div className="mb-8">
              <Link href="/guides">
                <Button size="lg" variant="outline" className="font-semibold" data-testid="button-printer-guides">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Printer Setup & Buying Guides
                </Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by model name, type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base"
                  data-testid="input-guide-search"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Current Inkjet Models
            </h2>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {filteredProducts.length} models
            </Badge>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading printer models...</p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No printer models found matching your search.</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover-elevate transition-all">
                  <CardContent className="p-6">
                    {/* Header with Badge and Icon */}
                    <div className="flex items-start justify-between mb-4">
                      {product.inStock && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          NEW
                        </Badge>
                      )}
                      <div className="ml-auto w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                        <Printer className="w-7 h-7 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>

                    {/* Category/Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.category}
                    </p>

                    {/* Specs */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Speed:</span>
                        <span className="font-semibold">24 ppm color</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-semibold">250 sheets</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Volume:</span>
                        <span className="font-semibold">4,000 pages</span>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.some((f) => f.toLowerCase().includes("print")) && (
                        <Badge variant="secondary" className="text-xs">
                          Print/Scan/Copy
                        </Badge>
                      )}
                      {product.features.some((f) => f.toLowerCase().includes("wireless") || f.toLowerCase().includes("wifi")) && (
                        <Badge variant="secondary" className="text-xs">
                          Wireless
                        </Badge>
                      )}
                      {product.features.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.features.length - 5} more
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>{Math.min(product.features.length, 6)} guides</span>
                      </div>
                      <Link href={`/guide/${product.id}`}>
                        <Button variant="ghost" size="sm" className="group" data-testid={`button-view-guide-${product.id}`}>
                          View Guide
                          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const categoryProducts = products?.filter((p) => p.category === category) || [];
              return (
                <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
                  <Card className="hover-elevate transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Printer className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{category}</h3>
                      <p className="text-sm text-muted-foreground">{categoryProducts.length} models</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Can't Find Your Model?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're constantly adding new printer guides. Contact us for help with your specific model,
                or browse our general setup and troubleshooting resources.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-contact-us">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/guides">
                  <Button size="lg" variant="outline" data-testid="button-general-guides">
                    General Guides
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
