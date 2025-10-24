import { Link } from "wouter";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/contexts/ComparisonContext";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function ComparisonBar() {
  const { selectedProducts, removeFromComparison, clearComparison } = useComparison();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: selectedProducts.length > 0,
  });

  const comparedProducts = products?.filter(p => selectedProducts.includes(p.id)) || [];

  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50 print:hidden" data-testid="container-comparison-bar">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="default" data-testid="badge-compare-count">
              {selectedProducts.length} {selectedProducts.length === 1 ? "Product" : "Products"} Selected
            </Badge>
            <span className="text-sm text-muted-foreground hidden md:inline">
              {selectedProducts.length < 2
                ? "Select at least 2 products to compare"
                : selectedProducts.length < 4
                ? `Add up to ${4 - selectedProducts.length} more products`
                : "Maximum products selected"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Product thumbnails */}
            <div className="hidden lg:flex items-center gap-2 mr-4">
              {comparedProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="relative group"
                  data-testid={`comparison-thumbnail-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-contain border rounded"
                  />
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid={`button-remove-thumbnail-${product.id}`}
                    aria-label={`Remove ${product.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {selectedProducts.length >= 2 && (
              <Button asChild data-testid="button-compare-now">
                <Link href="/compare">
                  Compare Now ({selectedProducts.length})
                </Link>
              </Button>
            )}

            <Button
              variant="outline"
              onClick={clearComparison}
              data-testid="button-clear-comparison"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
