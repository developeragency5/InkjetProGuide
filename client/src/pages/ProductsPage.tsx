import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function ProductsPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const searchQuery = params.get("search");

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter and sort products
  const filteredProducts = products?.filter((product) => {
    if (category && product.category !== category) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    const price = parseFloat(product.price);
    if (price < priceRange[0] || price > priceRange[1]) return false;
    if (selectedFeatures.length > 0 && !selectedFeatures.some(f => product.features.includes(f))) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === "rating") return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
    return 0;
  }) || [];

  const allFeatures = Array.from(
    new Set(products?.flatMap((p) => p.features) || [])
  );

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Printers`
              : "All Printers"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-6">Filters</h2>

                {/* Price Range */}
                <div className="mb-8">
                  <Label className="text-sm font-semibold mb-4 block">
                    Price Range
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={0}
                    step={50}
                    className="mb-3"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-sm font-semibold mb-4 block">
                    Features
                  </Label>
                  <div className="space-y-3">
                    {allFeatures.slice(0, 8).map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                          data-testid={`checkbox-feature-${feature}`}
                        />
                        <Label
                          htmlFor={feature}
                          className="text-sm cursor-pointer"
                        >
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedFeatures([]);
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products?.length || 0} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-md mb-4" />
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedFeatures([]);
                  }}
                  data-testid="button-reset-filters"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
