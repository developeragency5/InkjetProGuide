import { useRoute, Link } from "wouter";
import { useState } from "react";
import { Minus, Plus, Heart, ShoppingCart, Star, Package, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  const isInWishlist = wishlistData?.items?.some(
    (item: any) => item.productId === productId
  );

  const addToCartMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/cart", { productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart.`,
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
        return apiRequest("DELETE", `/api/wishlist/${productId}`, {});
      }
      return apiRequest("POST", "/api/wishlist", { productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
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

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  const specifications = JSON.parse(product.specifications);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">
            <a className="hover:text-foreground">Home</a>
          </Link>
          {" / "}
          <Link href="/products">
            <a className="hover:text-foreground">Products</a>
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image */}
          <div>
            <Card>
              <CardContent className="p-8">
                <div className="aspect-square bg-background rounded-md flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(parseFloat(product.rating || "0"))
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground" data-testid="text-review-count">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold" data-testid="text-price">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through" data-testid="text-original-price">
                      ${parseFloat(product.originalPrice!).toFixed(2)}
                    </span>
                    <Badge className="bg-destructive text-destructive-foreground" data-testid="badge-discount">
                      Save {discountPercent}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-status-online">
                  <div className="w-3 h-3 rounded-full bg-status-online" />
                  <span className="font-medium" data-testid="text-stock-status">In Stock - Ready to Ship</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <Label className="text-sm font-semibold mb-3 block">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= (product.stock || 99)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                size="lg"
                className="w-full font-semibold"
                disabled={!product.inStock || addToCartMutation.isPending}
                onClick={() => addToCartMutation.mutate()}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full font-semibold"
                onClick={() => toggleWishlistMutation.mutate()}
                data-testid="button-add-to-wishlist"
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Key Specifications */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Key Specifications</h3>
                <dl className="space-y-3">
                  {Object.entries(specifications).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b last:border-0">
                      <dt className="text-sm text-muted-foreground">{key}</dt>
                      <dd className="text-sm font-medium">{value as string}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders $50+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">2-Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
            <TabsTrigger value="specifications" data-testid="tab-specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
                <h3 className="text-xl font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Full Specifications</h2>
                <dl className="space-y-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b">
                      <dt className="text-muted-foreground font-medium">{key}</dt>
                      <dd className="font-semibold">{value as string}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <div className="text-center py-12 text-muted-foreground">
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
