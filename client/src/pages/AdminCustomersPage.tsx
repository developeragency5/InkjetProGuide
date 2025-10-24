import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { format } from "date-fns";

export default function AdminCustomersPage() {
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

  // Fetch customers
  const { data: customers, isLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/customers"],
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
          <h1 className="text-3xl font-bold mb-2">Customers</h1>
          <p className="text-muted-foreground">
            View all registered customers and their order history
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Customers ({customers?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {!customers || customers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No customers yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-4 border rounded-lg hover-elevate transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined: {format(new Date(customer.createdAt), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <div>
                          <Badge variant="secondary" className="mb-1">
                            {customer.orderCount} {customer.orderCount === 1 ? "Order" : "Orders"}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                          <p className="text-xl font-bold text-primary">
                            ${customer.totalSpent}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
