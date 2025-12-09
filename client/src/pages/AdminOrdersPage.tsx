import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

interface AuthCheckResponse {
  authenticated: boolean;
}

export default function AdminOrdersPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Check admin authentication
  const { data: authCheck, isLoading: authLoading } = useQuery<AuthCheckResponse>({
    queryKey: ["/api/admin/check"],
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  // Fetch orders
  const { data: orders, isLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/orders"],
  });

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingOrder(null);
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authCheck?.authenticated) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      processing: "default",
      shipped: "default",
      delivered: "default",
      cancelled: "destructive",
    };
    return statusMap[status] || "secondary";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
          <p className="text-muted-foreground">
            View and manage customer orders
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders ({orders?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {!orders || orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg hover-elevate transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
                          <Badge variant={getStatusBadge(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.userName} ({order.userEmail})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${parseFloat(order.total).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(order)}
                          className="mt-2"
                          data-testid={`button-edit-order-${order.id}`}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Shipping:</span>{" "}
                        <span className="font-medium">{order.shippingMethod}</span>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <span className="text-muted-foreground">Tracking:</span>{" "}
                          <span className="font-medium">{order.trackingNumber}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Address:</span>{" "}
                        <span className="font-medium">
                          {order.shippingAddress}, {order.shippingCity}, {order.shippingState} {order.shippingZip}
                        </span>
                      </div>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Items ({order.items.length}):</p>
                        <div className="space-y-1">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="text-sm text-muted-foreground">
                              {item.productName} x{item.quantity} - ${parseFloat(item.productPrice).toFixed(2)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>
                Update the order status and tracking information
              </DialogDescription>
            </DialogHeader>
            {editingOrder && (
              <OrderUpdateForm order={editingOrder} onClose={handleDialogClose} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

// Order Update Form Component
function OrderUpdateForm({ order, onClose }: { order: any; onClose: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    status: order.status,
    trackingNumber: order.trackingNumber || "",
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("PATCH", `/api/admin/orders/${order.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Order updated",
        description: "Order status updated successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update order",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="status">Order Status</Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
          required
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trackingNumber">Tracking Number (optional)</Label>
        <Input
          id="trackingNumber"
          value={formData.trackingNumber}
          onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
          placeholder="Enter tracking number"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Updating..." : "Update Order"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
