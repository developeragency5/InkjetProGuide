import { Link } from "wouter";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const { data: wishlistData } = useQuery({
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

  return (
    <Card className="group relative hover-elevate transition-all" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-4">
        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-6 right-6 z-10 ${isInWishlist ? "text-destructive" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlistMutation.mutate();
          }}
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge className="absolute top-6 left-6 z-10 bg-destructive text-destructive-foreground" data-testid={`badge-discount-${product.id}`}>
            -{discountPercent}%
          </Badge>
        )}

        {/* Product Image */}
        <Link href={`/product/${product.id}`}>
          <a className="block" data-testid={`link-product-${product.id}`}>
            <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center p-4 border overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </a>
        </Link>

        {/* Product Info */}
        <Link href={`/product/${product.id}`}>
          <a data-testid={`link-product-name-${product.id}`}>
            <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </a>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
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
      </CardContent>
    </Card>
  );
}
