import { Link } from "wouter";
import { Package, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const { toast } = useToast();

  const { data: user } = useQuery({
    queryKey: ["/api/user"],
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["/api/orders"],
  });

  const { data: wishlistData, isLoading: wishlistLoading } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      window.location.href = "/";
    },
  });

  const orders = ordersData?.orders || [];
  const wishlistItems = wishlistData?.items || [];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-3">Sign in required</h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your account.
          </p>
          <Link href="/auth">
            <Button size="lg" data-testid="button-signin-account">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-status-online";
      case "cancelled":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Welcome back, <span className="font-medium">{user.name}</span>
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="orders" data-testid="tab-orders">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" data-testid="tab-wishlist">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" data-testid="tab-profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            {ordersLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to see your orders here!
                  </p>
                  <Link href="/products">
                    <Button data-testid="button-browse-products-orders">Browse Products</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <Card key={order.id} data-testid={`order-${order.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)} data-testid={`badge-order-status-${order.id}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {order.items?.map((item: any) => (
                          <div key={item.id} className="flex gap-4 pb-3 border-b last:border-0">
                            <div className="w-16 h-16 bg-background rounded-md flex items-center justify-center border flex-shrink-0">
                              <Package className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.productName}</h4>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${(parseFloat(item.productPrice) * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold" data-testid={`text-order-total-${order.id}`}>
                          ${parseFloat(order.total).toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Delivery Address:</p>
                        <p>{order.shippingAddress}</p>
                        <p>
                          {order.shippingCity}, {order.shippingState} {order.shippingZip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            {wishlistLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : wishlistItems.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Save your favorite products for later!
                  </p>
                  <Link href="/products">
                    <Button data-testid="button-browse-products-wishlist">Browse Products</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item: any) => (
                  <Card key={item.id} data-testid={`wishlist-account-item-${item.id}`}>
                    <CardContent className="p-4">
                      <Link href={`/product/${item.product.id}`}>
                        <a className="block">
                          <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center border">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain p-4"
                            />
                          </div>
                        </a>
                      </Link>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-xl font-bold mb-3">
                        ${parseFloat(item.product.price).toFixed(2)}
                      </p>
                      <Link href={`/product/${item.product.id}`}>
                        <Button className="w-full" data-testid={`button-view-product-${item.id}`}>
                          View Product
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Profile Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Member Since</Label>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
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
