import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { Package, ArrowLeft, Truck, Check, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrderDetailPage() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/order/:id");
  const orderId = params?.id;

  const { data: orderData, isLoading } = useQuery<any>({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Order not found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the order you're looking for.
          </p>
          <Button size="lg" onClick={() => navigate("/orders")} data-testid="button-back-to-orders">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const order = orderData.order;

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_process":
        return <Clock className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <Check className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/orders")}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" data-testid="text-order-title">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-lg px-4 py-2`} data-testid="badge-order-status">
            <span className="mr-2">{getStatusIcon(order.status)}</span>
            {formatStatus(order.status)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.orderItems && order.orderItems.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0" data-testid={`order-item-${index}`}>
                      <div className="flex-1">
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${parseFloat(item.productPrice).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total: ${(parseFloat(item.productPrice) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                <div className="text-muted-foreground">
                  <p className="font-semibold text-foreground">{order.customerName}</p>
                  <p className="mt-2">{order.shippingAddress}</p>
                  <p>{order.shippingCity}, {order.shippingState} {order.shippingZip}</p>
                  <p className="mt-2">{order.shippingPhone}</p>
                  <p className="mt-2">{order.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment & Shipping Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium">
                      Credit/Debit Card
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Method</span>
                    <span className="font-medium">
                      {order.shippingMethod === 'standard' && 'Standard Shipping (5-7 days)'}
                      {order.shippingMethod === 'express' && 'Express Shipping (2-3 days)'}
                      {order.shippingMethod === 'overnight' && 'Overnight Delivery'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-2xl text-primary" data-testid="text-order-total">
                      ${parseFloat(order.total).toFixed(2)}
                    </span>
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
