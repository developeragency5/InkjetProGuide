import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Package, ShoppingBag, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const [, navigate] = useLocation();

  const { data: userData } = useQuery<any>({
    queryKey: ["/api/user"],
  });

  const { data: ordersData, isLoading } = useQuery<{ orders: any[] }>({
    queryKey: ["/api/orders"],
    enabled: !!userData,
  });

  const orders = ordersData?.orders || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Sign in to view orders</h1>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to view your order history.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} data-testid="button-sign-in">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">No orders yet</h1>
          <p className="text-muted-foreground mb-8">
            Start shopping to see your orders here!
          </p>
          <Button size="lg" onClick={() => window.location.href = "/products#!/Inkjet-Printers/c/193859557"} data-testid="button-start-shopping">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_process":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "shipped":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      case "delivered":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "cancelled":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">
              View and track your order history
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order: any) => (
            <Card key={order.id} data-testid={`order-${order.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-mono font-semibold text-lg" data-testid={`text-order-number-${order.id}`}>
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <Badge className={getStatusColor(order.status)} data-testid={`badge-status-${order.id}`}>
                        {formatStatus(order.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" data-testid={`text-total-${order.id}`}>
                      ${parseFloat(order.total).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.paymentMethod === 'card' ? 'Paid by Card' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.customerName}<br />
                    {order.shippingAddress}<br />
                    {order.shippingCity}, {order.shippingState} {order.shippingZip}<br />
                    {order.shippingPhone}
                  </p>
                </div>

                {order.orderItems && order.orderItems.length > 0 && (
                  <div className="border-t mt-4 pt-4">
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {order.orderItems.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm" data-testid={`order-item-${order.id}-${index}`}>
                          <span className="text-muted-foreground">
                            {item.productName} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(parseFloat(item.productPrice) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/order/${order.id}`)}
                    data-testid={`button-view-details-${order.id}`}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
