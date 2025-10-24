import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [, setLocation] = useLocation();

  // Check admin authentication
  const { data: authCheck, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/check"],
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  // Fetch analytics
  const { data: analytics, isLoading } = useQuery({
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Detailed analytics and performance reports
          </p>
        </div>

        {/* Overall Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">${analytics?.totalRevenue || "0.00"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Order Value</p>
                <p className="text-2xl font-semibold">${analytics?.averageOrderValue || "0.00"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-2xl font-semibold">{analytics?.totalOrders || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Last 30 Days
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recent Revenue</p>
                <p className="text-3xl font-bold text-primary">${analytics?.recentRevenue || "0.00"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recent Orders</p>
                <p className="text-2xl font-semibold">{analytics?.recentOrders || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {analytics?.ordersByStatus && Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                <div key={status} className="p-4 border rounded-lg text-center">
                  <p className="text-sm text-muted-foreground capitalize mb-2">{status}</p>
                  <p className="text-2xl font-bold">{count as number}</p>
                </div>
              ))}
              {(!analytics?.ordersByStatus || Object.keys(analytics.ordersByStatus).length === 0) && (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No order data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Business Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{analytics?.totalProducts || 0}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{analytics?.totalCustomers || 0}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{analytics?.totalOrders || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
