import { useState } from "react";
import { useLocation } from "wouter";
import { Package, Search, ArrowLeft, Truck, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const orderLookupSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

type OrderLookupFormData = z.infer<typeof orderLookupSchema>;

export default function OrderLookupPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [order, setOrder] = useState<any>(null);

  const form = useForm<OrderLookupFormData>({
    resolver: zodResolver(orderLookupSchema),
    defaultValues: {
      orderId: "",
    },
  });

  const lookupMutation = useMutation({
    mutationFn: async (data: OrderLookupFormData) => {
      const res = await apiRequest("POST", "/api/orders/lookup", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Order not found");
      }
      return await res.json();
    },
    onSuccess: (response: any) => {
      setOrder(response.order);
    },
    onError: (error: any) => {
      toast({
        title: "Order not found",
        description: error.message || "Please check your order ID and try again.",
        variant: "destructive",
      });
      setOrder(null);
    },
  });

  const handleSubmit = (data: OrderLookupFormData) => {
    lookupMutation.mutate(data);
  };

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

  const handleNewSearch = () => {
    setOrder(null);
    form.reset();
  };

  if (order) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={handleNewSearch}
            className="mb-6"
            data-testid="button-new-search"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Search Another Order
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
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {order.items && order.items.map((item: any, index: number) => (
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
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{order.shippingMethod === 'express' ? 'Express' : 'Standard'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment</span>
                      <span className="capitalize">Credit/Debit Card</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span data-testid="text-order-total">${parseFloat(order.total).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {order.trackingNumber && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Tracking</h2>
                    <p className="text-muted-foreground">Tracking Number:</p>
                    <p className="font-mono text-lg mt-1" data-testid="text-tracking-number">{order.trackingNumber}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to view your order status
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Enter your order ID (e.g., abc12345-...)"
                        data-testid="input-order-id"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={lookupMutation.isPending}
                data-testid="button-lookup"
              >
                {lookupMutation.isPending ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Looking up order...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Find My Order
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Have an account?
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth")}
              data-testid="link-sign-in"
            >
              Sign in to view all orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
