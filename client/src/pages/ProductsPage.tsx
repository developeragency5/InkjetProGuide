import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { ChevronLeft, ChevronRight, ChevronRight as BreadcrumbIcon, X, Search } from "lucide-react";
import { Link } from "wouter";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [location] = useLocation();
  
  // Recompute URL params whenever location changes
  const { category, searchQuery } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.get("category"),
      searchQuery: params.get("search"),
    };
  }, [location]);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedConnectivity, setSelectedConnectivity] = useState<string[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [selectedColorType, setSelectedColorType] = useState<string>("");
  const [searchInput, setSearchInput] = useState(searchQuery || "");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset filters when category changes
  useEffect(() => {
    setCurrentPage(1);
    setPriceRange([0, 1000]);
    setSelectedConnectivity([]);
    setSelectedTechnology([]);
    setSelectedColorType("");
    setSearchInput(searchQuery || "");
  }, [category, searchQuery]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Connectivity options
  const connectivityOptions = ["WiFi", "USB", "Bluetooth", "Ethernet"];
  const technologyOptions = ["Thermal Inkjet", "Piezo Inkjet"];

  // Filter and sort products
  const filteredProducts = products?.filter((product) => {
    // Category filter
    if (category && product.category !== category) return false;
    
    // Search filter - now uses real-time searchInput instead of URL param
    const searchTerm = searchInput.toLowerCase();
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm) &&
        !product.description.toLowerCase().includes(searchTerm)) {
      return false;
    }
    
    // Price filter
    const price = parseFloat(product.price);
    if (price < priceRange[0] || price > priceRange[1]) return false;
    
    // Connectivity filter
    if (selectedConnectivity.length > 0) {
      const hasConnectivity = selectedConnectivity.some(conn =>
        product.features.some(f => f.toLowerCase().includes(conn.toLowerCase()))
      );
      if (!hasConnectivity) return false;
    }
    
    // Technology filter
    if (selectedTechnology.length > 0) {
      const hasTechnology = selectedTechnology.some(tech =>
        product.features.some(f => f.toLowerCase().includes(tech.toLowerCase())) ||
        product.description.toLowerCase().includes(tech.toLowerCase())
      );
      if (!hasTechnology) return false;
    }
    
    // Color type filter
    if (selectedColorType === "color" && !product.features.some(f => f.toLowerCase().includes("color"))) return false;
    if (selectedColorType === "bw" && !product.features.some(f => f.toLowerCase().includes("black") || f.toLowerCase().includes("monochrome"))) return false;
    
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === "rating") return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "best-selling") return (b.reviewCount || 0) - (a.reviewCount || 0);
    return 0;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Active filters
  const activeFilters: Array<{ label: string; onRemove: () => void }> = [];
  
  if (priceRange[0] > 0 || priceRange[1] < 1000) {
    activeFilters.push({
      label: `Price: $${priceRange[0]} - $${priceRange[1]}`,
      onRemove: () => setPriceRange([0, 1000]),
    });
  }
  
  selectedConnectivity.forEach((conn) => {
    activeFilters.push({
      label: `Connectivity: ${conn}`,
      onRemove: () => setSelectedConnectivity(prev => prev.filter(c => c !== conn)),
    });
  });
  
  selectedTechnology.forEach((tech) => {
    activeFilters.push({
      label: `Technology: ${tech}`,
      onRemove: () => setSelectedTechnology(prev => prev.filter(t => t !== tech)),
    });
  });
  
  if (selectedColorType) {
    activeFilters.push({
      label: `Type: ${selectedColorType === "color" ? "Color" : "Black & White"}`,
      onRemove: () => setSelectedColorType(""),
    });
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedConnectivity([]);
    setSelectedTechnology([]);
    setSelectedColorType("");
  };

  const toggleOption = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
            Home
          </Link>
          <BreadcrumbIcon className="w-4 h-4 text-muted-foreground" />
          <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-breadcrumb-shop">
            Shop
          </Link>
          <BreadcrumbIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium" data-testid="text-breadcrumb-current">
            HP Inkjet Printers
          </span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Printers`
              : "HP Inkjet Printers"}
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of HP inkjet printers
          </p>
        </div>

        {/* Search Bar - Real-time filtering */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search printers in real-time..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="pl-10"
              data-testid="input-search"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                data-testid="button-clear-search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="gap-1 pr-1"
                data-testid={`badge-filter-${index}`}
              >
                {filter.label}
                <button
                  onClick={filter.onRemove}
                  className="ml-1 hover:bg-background rounded-full p-0.5"
                  data-testid={`button-remove-filter-${index}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              data-testid="button-clear-all-filters"
            >
              Clear All
            </Button>
          </div>
        )}

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
                    data-testid="slider-price-range"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span data-testid="text-price-min">${priceRange[0]}</span>
                    <span data-testid="text-price-max">${priceRange[1]}</span>
                  </div>
                </div>

                {/* Print Technology */}
                <div className="mb-8">
                  <Label className="text-sm font-semibold mb-4 block">
                    Print Technology
                  </Label>
                  <div className="space-y-3">
                    {technologyOptions.map((tech) => (
                      <div key={tech} className="flex items-center gap-2">
                        <Checkbox
                          id={`tech-${tech}`}
                          checked={selectedTechnology.includes(tech)}
                          onCheckedChange={() => toggleOption(tech, setSelectedTechnology)}
                          data-testid={`checkbox-technology-${tech}`}
                        />
                        <Label
                          htmlFor={`tech-${tech}`}
                          className="text-sm cursor-pointer"
                        >
                          {tech}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connectivity */}
                <div className="mb-8">
                  <Label className="text-sm font-semibold mb-4 block">
                    Connectivity
                  </Label>
                  <div className="space-y-3">
                    {connectivityOptions.map((conn) => (
                      <div key={conn} className="flex items-center gap-2">
                        <Checkbox
                          id={`conn-${conn}`}
                          checked={selectedConnectivity.includes(conn)}
                          onCheckedChange={() => toggleOption(conn, setSelectedConnectivity)}
                          data-testid={`checkbox-connectivity-${conn}`}
                        />
                        <Label
                          htmlFor={`conn-${conn}`}
                          className="text-sm cursor-pointer"
                        >
                          {conn}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Type */}
                <div className="mb-8">
                  <Label className="text-sm font-semibold mb-4 block">
                    Print Type
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="color-type-color"
                        checked={selectedColorType === "color"}
                        onCheckedChange={() => setSelectedColorType(selectedColorType === "color" ? "" : "color")}
                        data-testid="checkbox-color-type-color"
                      />
                      <Label htmlFor="color-type-color" className="text-sm cursor-pointer">
                        Color
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="color-type-bw"
                        checked={selectedColorType === "bw"}
                        onCheckedChange={() => setSelectedColorType(selectedColorType === "bw" ? "" : "bw")}
                        data-testid="checkbox-color-type-bw"
                      />
                      <Label htmlFor="color-type-bw" className="text-sm cursor-pointer">
                        Black & White
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearAllFilters}
                  data-testid="button-clear-filters"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Count */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} printers
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="best-selling">Best Selling</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
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
                  onClick={clearAllFilters}
                  data-testid="button-reset-filters"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      data-testid="button-prev-page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={page === currentPage ? "default" : "outline"}
                              size="icon"
                              onClick={() => setCurrentPage(page)}
                              data-testid={`button-page-${page}`}
                            >
                              {page}
                            </Button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="button-next-page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
