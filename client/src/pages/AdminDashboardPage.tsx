import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AuthCheckResponse {
  authenticated: boolean;
}

interface AnalyticsData {
  totalRevenue: string;
  averageOrderValue: string;
  totalOrders: number;
  recentRevenue: string;
  recentOrders: number;
  ordersByStatus: Record<string, number>;
  totalProducts: number;
  totalCustomers: number;
}

export default function AdminDashboardPage() {
  const [, setLocation] = useLocation();

  // Check admin authentication
  const { data: authCheck, isLoading: authLoading } = useQuery<AuthCheckResponse>({
    queryKey: ["/api/admin/check"],
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  // Fetch analytics data
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/admin/analytics"],
  });

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

  const stats = [
    {
      title: "Total Revenue",
      value: `$${analytics?.totalRevenue || "0.00"}`,
      icon: DollarSign,
      description: `Avg order: $${analytics?.averageOrderValue || "0.00"}`,
    },
    {
      title: "Total Orders",
      value: analytics?.totalOrders || 0,
      icon: ShoppingCart,
      description: `${analytics?.recentOrders || 0} in last 30 days`,
    },
    {
      title: "Total Products",
      value: analytics?.totalProducts || 0,
      icon: Package,
      description: "Active inventory items",
    },
    {
      title: "Total Customers",
      value: analytics?.totalCustomers || 0,
      icon: Users,
      description: "Registered users",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Here's an overview of your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Orders by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {analytics?.ordersByStatus && Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                <Badge key={status} variant="outline" className="text-sm px-4 py-2">
                  {status}: {count as number}
                </Badge>
              ))}
              {(!analytics?.ordersByStatus || Object.keys(analytics.ordersByStatus).length === 0) && (
                <p className="text-muted-foreground">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Last 30 Days Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                <p className="text-2xl font-bold">${analytics?.recentRevenue || "0.00"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Orders</p>
                <p className="text-2xl font-bold">{analytics?.recentOrders || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
