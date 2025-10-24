import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Star, Eye, Zap, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <>
      <Card 
        className="group relative hover-elevate transition-all overflow-hidden" 
        data-testid={`card-product-${product.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          {/* Top badges and buttons */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between gap-2">
            <div className="flex flex-col gap-2">
              {/* Discount Badge */}
              {hasDiscount && (
                <Badge className="bg-destructive text-destructive-foreground" data-testid={`badge-discount-${product.id}`}>
                  -{discountPercent}%
                </Badge>
              )}
              {/* New Arrival Badge */}
              {isNewArrival && (
                <Badge className="bg-primary text-primary-foreground" data-testid={`badge-new-${product.id}`}>
                  New
                </Badge>
              )}
              {/* Best Seller Badge */}
              {isBestSeller && (
                <Badge className="bg-yellow-500 text-yellow-950" data-testid={`badge-bestseller-${product.id}`}>
                  Best Seller
                </Badge>
              )}
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
          <Link href={`/product/${product.id}`}>
            <span className="block cursor-pointer" data-testid={`link-product-${product.id}`}>
              <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center p-4 border relative overflow-hidden group/image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
                
                {/* Hover overlay with key features - desktop only */}
                <div 
                  className={`hidden md:flex absolute inset-0 bg-background/95 backdrop-blur-sm flex-col items-center justify-center p-4 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="text-center space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-medium">{keySpecs.printSpeed}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Droplet className="w-4 h-4 text-primary" />
                      <span className="font-medium">{keySpecs.resolution}</span>
                    </div>
                  </div>
                </div>
                
                {/* Quick View Button - Always accessible on mobile, hover on desktop */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-background/95 backdrop-blur-sm shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowQuickView(true);
                    }}
                    data-testid={`button-quick-view-${product.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>
            </span>
          </Link>

          {/* Product Info */}
          <div className="space-y-2">
            {/* Model Number */}
            <p className="text-xs text-muted-foreground" data-testid={`text-model-${product.id}`}>
              Model: {getModelNumber()}
            </p>

            {/* Product Name */}
            <Link href={`/product/${product.id}`}>
              <span className="cursor-pointer" data-testid={`link-product-name-${product.id}`}>
                <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </span>
            </Link>

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

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(parseFloat(product.rating || "0"))
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground" data-testid={`text-reviews-${product.id}`}>
                ({product.reviewCount})
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

            {/* Add to Cart Button */}
            <Button
              className="w-full font-semibold"
              size="sm"
              disabled={!product.inStock || addToCartMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                addToCartMutation.mutate();
              }}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="aspect-square bg-background rounded-md flex items-center justify-center p-8 border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Model: {getModelNumber()}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {isNewArrival && <Badge variant="default">New Arrival</Badge>}
                  {isBestSeller && <Badge className="bg-yellow-500 text-yellow-950">Best Seller</Badge>}
                  {hasDiscount && <Badge variant="destructive">-{discountPercent}%</Badge>}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(product.rating || "0"))
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${parseFloat(product.originalPrice!).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.inStock ? (
                  <div className="flex items-center gap-1.5 text-sm text-status-online">
                    <div className="w-2 h-2 rounded-full bg-status-online" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              {/* Key Specifications */}
              <div>
                <h4 className="font-semibold mb-2">Key Specifications</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Print Speed:</span>
                    <span className="font-medium">{keySpecs.printSpeed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Resolution:</span>
                    <span className="font-medium">{keySpecs.resolution}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {product.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1"
                  disabled={!product.inStock || addToCartMutation.isPending}
                  onClick={() => {
                    addToCartMutation.mutate();
                    setShowQuickView(false);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
                <Link href={`/product/${product.id}`}>
                  <Button variant="outline" onClick={() => setShowQuickView(false)}>
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
