import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Package, Clock, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface OrdersResponse {
  orders: any[];
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch current user
  const { data: user, isLoading: userLoading } = useQuery<UserData>({
    queryKey: ["/api/user"],
  });

  // Fetch orders
  const { data: ordersResponse, isLoading: ordersLoading } = useQuery<OrdersResponse>({
    queryKey: ["/api/orders"],
  });
  const ordersData = ordersResponse?.orders || [];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Initialize form fields when user data loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      apiRequest("PATCH", "/api/user/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      apiRequest("PATCH", "/api/user/password", data),
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/auth/logout", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      setLocation("/");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    },
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({ name, email });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    updatePasswordMutation.mutate({ currentPassword, newPassword });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-status-online text-status-online-foreground";
      case "shipped":
        return "bg-blue-500 text-white";
      case "processing":
        return "bg-yellow-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (userLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/auth");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="heading-profile">
            My Account
          </h1>
          <p className="text-muted-foreground">
            Manage your profile, orders, and settings
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3" data-testid="tabs-profile">
          <TabsTrigger value="profile" data-testid="tab-edit-profile">
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </TabsTrigger>
          <TabsTrigger value="orders" data-testid="tab-orders">
            <Package className="w-4 h-4 mr-2" />
            Order History
          </TabsTrigger>
          <TabsTrigger value="tracking" data-testid="tab-tracking">
            <Clock className="w-4 h-4 mr-2" />
            Order Tracking
          </TabsTrigger>
        </TabsList>

        {/* Edit Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    data-testid="input-email"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  data-testid="button-update-profile"
                >
                  {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    data-testid="input-current-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 characters)"
                    required
                    data-testid="input-new-password"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={updatePasswordMutation.isPending}
                  data-testid="button-update-password"
                >
                  {updatePasswordMutation.isPending ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View all your past orders and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse h-24 bg-muted rounded"></div>
                  ))}
                </div>
              ) : !ordersData || ordersData.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Button onClick={() => setLocation("/products")} data-testid="button-shop-now">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {ordersData.map((order: any) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover-elevate transition-all"
                      data-testid={`card-order-${order.id}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-sm text-muted-foreground">
                            Order #{order.id.substring(0, 8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(order.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)} data-testid={`badge-status-${order.id}`}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total</span>
                          <span className="font-semibold">${parseFloat(order.total).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Payment Method</span>
                          <span className="capitalize">{order.paymentMethod.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping Address</span>
                          <span className="text-right">
                            {order.shippingAddress}, {order.shippingCity}, {order.shippingState} {order.shippingZip}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Tracking Tab */}
        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>
                Track the status of your recent orders in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse h-32 bg-muted rounded"></div>
                  ))}
                </div>
              ) : !ordersData || ordersData.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No orders to track</p>
                  <Button onClick={() => setLocation("/products")} data-testid="button-shop-now-tracking">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {ordersData
                    .filter((order: any) => order.status !== "delivered")
                    .map((order: any) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-6"
                        data-testid={`tracking-order-${order.id}`}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="font-semibold mb-1">
                              Order #{order.id.substring(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {format(new Date(order.createdAt), "MMM dd, yyyy")}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>

                        {/* Progress Steps */}
                        <div className="space-y-4">
                          {["pending", "processing", "shipped", "delivered"].map((step, index) => {
                            const isCompleted =
                              ["pending", "processing", "shipped", "delivered"].indexOf(order.status) >= index;
                            const isCurrent =
                              ["pending", "processing", "shipped", "delivered"].indexOf(order.status) === index;

                            return (
                              <div key={step} className="flex items-start gap-4">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    isCompleted
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {isCompleted ? "✓" : index + 1}
                                </div>
                                <div className="flex-1">
                                  <p
                                    className={`font-medium ${
                                      isCurrent ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                  >
                                    {getStatusText(step)}
                                  </p>
                                  {isCurrent && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Your order is currently being {step}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                  {ordersData.filter((order: any) => order.status !== "delivered").length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">All orders have been delivered</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
