import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { toast } = useToast();

  const { data: cartData, isLoading } = useQuery<{ items: any[] }>({
    queryKey: ["/api/cart"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      apiRequest("PATCH", `/api/cart/${itemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => apiRequest("DELETE", `/api/cart/${itemId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
  });

  const cartItems = cartData?.items || [];
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal >= 299 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Start adding some amazing HP printers to your cart!
          </p>
          <Link href="/products">
            <Button size="lg" data-testid="button-start-shopping">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.product.id}`}>
                      <a className="flex-shrink-0" data-testid={`link-cart-product-${item.id}`}>
                        <div className="w-32 h-32 bg-background rounded-md flex items-center justify-center border">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                      </a>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between gap-4 mb-2">
                        <Link href={`/product/${item.product.id}`}>
                          <a className="font-semibold hover:text-primary" data-testid={`text-cart-product-name-${item.id}`}>
                            {item.product.name}
                          </a>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItemMutation.mutate(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {item.product.category}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantityMutation.mutate({
                                itemId: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            }
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-12 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantityMutation.mutate({
                                itemId: item.id,
                                quantity: item.quantity + 1,
                              })
                            }
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold" data-testid={`text-item-total-${item.id}`}>
                            ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${parseFloat(item.product.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium" data-testid="text-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium" data-testid="text-shipping">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium" data-testid="text-tax">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-2xl" data-testid="text-total">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button size="lg" className="w-full font-semibold" data-testid="button-checkout">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline" className="w-full" data-testid="button-continue-shopping">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">2-year warranty included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
