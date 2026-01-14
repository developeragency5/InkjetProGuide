import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Zap, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useComparison } from "@/contexts/ComparisonContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const { selectedProducts, addToComparison, removeFromComparison, isInComparison } = useComparison();
  const isComparing = isInComparison(product.id);
  const isComparisonFull = selectedProducts.length >= 4 && !isComparing;

  const handleCompareChange = (checked: boolean) => {
    if (checked) {
      if (isComparisonFull) {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 4 products at a time",
          variant: "destructive",
        });
        return;
      }
      addToComparison(product.id);
      toast({
        title: "Added to comparison",
        description: `${product.name} added to comparison`,
      });
    } else {
      removeFromComparison(product.id);
      toast({
        title: "Removed from comparison",
        description: `${product.name} removed from comparison`,
      });
    }
  };

  const { data: wishlistData } = useQuery<{ items: any[] }>({
    queryKey: ["/api/wishlist"],
  });

  const isInWishlist = wishlistData?.items?.some(
    (item: any) => item.productId === product.id
  );

  const addToCartMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/cart", { productId: product.id, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Please sign in to add items to cart.",
        variant: "destructive",
      });
    },
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: () => {
      if (isInWishlist) {
        return apiRequest("DELETE", `/api/wishlist/${product.id}`, {});
      }
      return apiRequest("POST", "/api/wishlist", { productId: product.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: isInWishlist 
          ? `${product.name} has been removed from your wishlist.`
          : `${product.name} has been added to your wishlist.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Please sign in to manage your wishlist.",
        variant: "destructive",
      });
    },
  });

  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  // Determine if product is new (created within last 30 days)
  const isNewArrival = new Date().getTime() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000;
  
  // Determine if product is best seller (high review count)
  const isBestSeller = (product.reviewCount || 0) >= 50;

  // Safe specification parser with error handling
  const parseSpecifications = () => {
    try {
      if (typeof product.specifications === 'string') {
        return JSON.parse(product.specifications);
      }
      return product.specifications || {};
    } catch (error) {
      console.warn(`Failed to parse specifications for product ${product.id}:`, error);
      return {};
    }
  };

  // Extract model number from specifications or name
  const getModelNumber = () => {
    const specs = parseSpecifications();
    return specs?.model || specs?.Model || product.name.split(' ').slice(-1)[0];
  };

  // Get key specifications
  const getKeySpecs = () => {
    const specs = parseSpecifications();
    return {
      printSpeed: specs?.printSpeed || specs?.['Print Speed'] || 'Standard',
      resolution: specs?.resolution || specs?.Resolution || '4800x1200 dpi',
    };
  };

  const keySpecs = getKeySpecs();

  const productUrl = product.ecwidProductId 
    ? `/products#!/~/product/id=${product.ecwidProductId}` 
    : `/product/${product.id}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('input') || 
      target.closest('label') ||
      target.closest('[role="checkbox"]')
    ) {
      return;
    }
    window.location.href = productUrl;
  };

  return (
    <>
      <Card 
        className="group relative overflow-visible cursor-pointer hover-elevate transition-all duration-200" 
        data-testid={`card-product-${product.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          {/* Top badge and buttons */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between gap-2">
            <div>
              {/* Show only one badge with priority: Discount > Best Seller > New Arrival */}
              {hasDiscount ? (
                <Badge className="bg-destructive text-destructive-foreground" data-testid={`badge-discount-${product.id}`}>
                  -{discountPercent}%
                </Badge>
              ) : isBestSeller ? (
                <Badge className="bg-yellow-500 text-yellow-950" data-testid={`badge-bestseller-${product.id}`}>
                  Best Seller
                </Badge>
              ) : isNewArrival ? (
                <Badge className="bg-primary text-primary-foreground" data-testid={`badge-new-${product.id}`}>
                  New
                </Badge>
              ) : null}
            </div>

            {/* Action buttons */}
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className={`bg-background/80 backdrop-blur-sm hover:bg-background ${isInWishlist ? "text-destructive" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlistMutation.mutate();
                }}
                data-testid={`button-wishlist-${product.id}`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Product Image */}
          <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center p-4 border relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            {/* Model Number */}
            <p className="text-xs text-muted-foreground" data-testid={`text-model-${product.id}`}>
              Model: {getModelNumber()}
            </p>

            {/* Product Name */}
            <h3 className="font-medium text-sm mb-1 line-clamp-2" data-testid={`link-product-name-${product.id}`}>
              {product.name}
            </h3>

            {/* Key Specifications */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {keySpecs.printSpeed}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Droplet className="w-3 h-3" />
                {keySpecs.resolution}
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold" data-testid={`text-price-${product.id}`}>
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
                    ${parseFloat(product.originalPrice!).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <div className="flex items-center gap-1.5 text-xs text-status-online">
                  <div className="w-2 h-2 rounded-full bg-status-online" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Compare Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`compare-${product.id}`}
                checked={isComparing}
                onCheckedChange={handleCompareChange}
                disabled={isComparisonFull}
                data-testid={`checkbox-compare-${product.id}`}
              />
              <label
                htmlFor={`compare-${product.id}`}
                className="text-sm font-medium leading-none cursor-pointer select-none"
              >
                Compare
              </label>
            </div>

            {/* Shop Now Button */}
            {product.ecwidProductId ? (
              <a href={`/products#!/~/product/id=${product.ecwidProductId}`} className="block">
                <Button
                  className="w-full font-semibold"
                  size="sm"
                  disabled={!product.inStock}
                  data-testid={`button-shop-now-${product.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>
              </a>
            ) : (
              <Link href={`/product/${product.id}`}>
                <Button
                  className="w-full font-semibold"
                  size="sm"
                  disabled={!product.inStock}
                  data-testid={`button-shop-now-${product.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

    </>
  );
}
