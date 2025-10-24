import { Link } from "wouter";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function WishlistPage() {
  const { toast } = useToast();

  const { data: wishlistData, isLoading } = useQuery<{ items: any[] }>({
    queryKey: ["/api/wishlist"],
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => apiRequest("DELETE", `/api/wishlist/${productId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId: string) => apiRequest("POST", "/api/cart", { productId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    },
  });

  const wishlistItems = wishlistData?.items || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite printers here for later!
          </p>
          <Link href="/products">
            <Button size="lg" data-testid="button-browse-products">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item: any) => (
            <Card key={item.id} className="group relative" data-testid={`wishlist-item-${item.id}`}>
              <CardContent className="p-6">
                {/* Remove Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-6 right-6 z-10 text-destructive"
                  onClick={() => removeFromWishlistMutation.mutate(item.product.id)}
                  data-testid={`button-remove-wishlist-${item.id}`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </Button>

                {/* Product Image */}
                <Link href={`/product/${item.product.id}`}>
                  <a className="block" data-testid={`link-wishlist-product-${item.id}`}>
                    <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-6"
                      />
                    </div>
                  </a>
                </Link>

                {/* Product Info */}
                <Link href={`/product/${item.product.id}`}>
                  <a data-testid={`text-wishlist-product-name-${item.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {item.product.name}
                    </h3>
                  </a>
                </Link>

                <p className="text-sm text-muted-foreground mb-3">{item.product.category}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold" data-testid={`text-wishlist-price-${item.id}`}>
                    ${parseFloat(item.product.price).toFixed(2)}
                  </span>
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  {item.product.inStock ? (
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
                  disabled={!item.product.inStock || addToCartMutation.isPending}
                  onClick={() => addToCartMutation.mutate(item.product.id)}
                  data-testid={`button-add-to-cart-${item.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
