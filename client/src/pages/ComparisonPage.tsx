import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { X, ShoppingCart, Download, Share2, Save, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/contexts/ComparisonContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product, User } from "@shared/schema";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ComparisonPage() {
  const { selectedProducts, removeFromComparison, clearComparison } = useComparison();
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
    retry: false,
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [comparisonName, setComparisonName] = useState("");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: selectedProducts.length > 0,
  });

  const comparedProducts = products?.filter(p => selectedProducts.includes(p.id)) || [];

  const handleAddToCart = async (productId: string) => {
    try {
      await apiRequest("POST", "/api/cart", { productId, quantity: 1 });
      await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/compare?products=${selectedProducts.join(",")}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Comparison link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const handleSaveComparison = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save comparisons",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    if (selectedProducts.length < 2) {
      toast({
        title: "Invalid comparison",
        description: "Please select at least 2 products to compare",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/comparisons", {
        userId: user.id,
        name: comparisonName || `Comparison ${new Date().toLocaleDateString()}`,
        productIds: selectedProducts,
      });
      setSaveDialogOpen(false);
      setComparisonName("");
      toast({
        title: "Comparison saved",
        description: "Your comparison has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save comparison",
        variant: "destructive",
      });
    }
  };

  const parseSpecs = (specs: string): Record<string, string> => {
    try {
      return JSON.parse(specs);
    } catch {
      return {};
    }
  };

  // Map display keys to actual database specification keys
  const specKeyMap: Record<string, string> = {
    model: "Model Number",
    printSpeed: "Print Speed (Black)",
    resolution: "Print Resolution",
    technology: "Print Technology",
    wifi: "Connectivity",
    bluetooth: "Connectivity",
    usb: "Connectivity",
    ethernet: "Connectivity",
    mobilePrinting: "Mobile Printing",
    paperCapacity: "Paper Handling",
    paperSizes: "Paper Sizes",
    duplexPrinting: "Two-Sided Printing",
    inkType: "Compatible Cartridges",
    pageYield: "Page Yield (Black)",
    costPerPage: "Cost Per Page",
    touchscreen: "Display",
    adf: "Automatic Document Feeder",
    scanner: "Scan Type",
    dimensions: "Dimensions",
    weight: "Weight",
    noiseLevel: "Noise Level",
  };

  const getSpecValue = (product: Product, key: string): string => {
    const specs = parseSpecs(product.specifications);
    const dbKey = specKeyMap[key] || key;
    return specs[dbKey] || "N/A";
  };

  const checkDifferences = (key: string): boolean => {
    const values = comparedProducts.map(p => getSpecValue(p, key));
    return new Set(values).size > 1;
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Products Selected</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You haven't selected any products to compare yet. Add products from the product listing or detail pages.
            </p>
            <Button asChild className="w-full" data-testid="button-browse-products">
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading comparison...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Compare Products</h1>
              <p className="text-muted-foreground">
                Comparing {comparedProducts.length} of {selectedProducts.length} selected products
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint} data-testid="button-print">
                <Download className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleShare} data-testid="button-share">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {user && (
                <Button variant="outline" onClick={() => setSaveDialogOpen(true)} data-testid="button-save-comparison">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              )}
              <Button variant="destructive" onClick={clearComparison} data-testid="button-clear-all">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border p-4 text-left font-semibold sticky left-0 bg-muted z-10 min-w-[200px]">
                  Feature
                </th>
                {comparedProducts.map((product) => (
                  <th key={product.id} className="border p-4 text-center min-w-[250px]">
                    <div className="flex flex-col gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-contain mb-2"
                        data-testid={`img-product-${product.id}`}
                      />
                      <h3 className="font-semibold text-sm" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromComparison(product.id)}
                        data-testid={`button-remove-${product.id}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Basic Info */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  BASIC INFORMATION
                </td>
              </tr>
              <tr className={checkDifferences("model") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Model Number</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-model-${product.id}`}>
                    {getSpecValue(product, "model")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("price") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Price</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center">
                    <div className="flex flex-col gap-2">
                      <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Availability</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center">
                    <Badge variant={product.inStock ? "default" : "secondary"} data-testid={`badge-stock-${product.id}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Customer Rating</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-rating-${product.id}`}>
                    {product.rating ? `${product.rating}★ (${product.reviewCount} reviews)` : "No reviews"}
                  </td>
                ))}
              </tr>

              {/* Print Specifications */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  PRINT SPECIFICATIONS
                </td>
              </tr>
              <tr className={checkDifferences("printSpeed") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Print Speed (ppm)</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-speed-${product.id}`}>
                    {getSpecValue(product, "printSpeed")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("resolution") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Resolution (dpi)</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-resolution-${product.id}`}>
                    {getSpecValue(product, "resolution")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("technology") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Print Technology</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-technology-${product.id}`}>
                    {getSpecValue(product, "technology")}
                  </td>
                ))}
              </tr>

              {/* Connectivity */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  CONNECTIVITY
                </td>
              </tr>
              {["wifi", "bluetooth", "usb", "ethernet", "mobilePrinting"].map((feature) => {
                const featureNames: Record<string, string> = {
                  wifi: "WiFi",
                  bluetooth: "Bluetooth",
                  usb: "USB",
                  ethernet: "Ethernet",
                  mobilePrinting: "Mobile Printing",
                };
                
                const hasFeature = (product: Product, feature: string): boolean => {
                  if (feature === "mobilePrinting") {
                    const mobilePrinting = getSpecValue(product, feature);
                    return mobilePrinting !== "N/A" && mobilePrinting.length > 0;
                  }
                  
                  const connectivity = getSpecValue(product, feature);
                  const normalizedConnectivity = connectivity.toLowerCase().replace(/[-\s®]/g, "");
                  const normalizedFeature = feature.toLowerCase().replace(/[-\s®]/g, "");
                  
                  return normalizedConnectivity.includes(normalizedFeature);
                };
                
                return (
                  <tr key={feature}>
                    <td className="border p-4 sticky left-0 bg-background z-10 capitalize">
                      {featureNames[feature]}
                    </td>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="border p-4 text-center">
                        {hasFeature(product, feature) ? (
                          <CheckCircle className="w-5 h-5 text-status-online mx-auto" data-testid={`icon-${feature}-yes-${product.id}`} />
                        ) : (
                          <XCircle className="w-5 h-5 text-muted-foreground mx-auto" data-testid={`icon-${feature}-no-${product.id}`} />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Paper Handling */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  PAPER HANDLING
                </td>
              </tr>
              <tr className={checkDifferences("paperCapacity") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Paper Capacity</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-capacity-${product.id}`}>
                    {getSpecValue(product, "paperCapacity")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("paperSizes") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Paper Sizes</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-sizes-${product.id}`}>
                    {getSpecValue(product, "paperSizes")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Automatic Duplex</td>
                {comparedProducts.map((product) => {
                  const duplex = getSpecValue(product, "duplexPrinting");
                  const hasDuplex = duplex !== "N/A" && duplex.toLowerCase().includes("automatic");
                  return (
                    <td key={product.id} className="border p-4 text-center">
                      {hasDuplex ? (
                        <CheckCircle className="w-5 h-5 text-status-online mx-auto" data-testid={`icon-duplex-yes-${product.id}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground mx-auto" data-testid={`icon-duplex-no-${product.id}`} />
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Ink System */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  INK SYSTEM
                </td>
              </tr>
              <tr className={checkDifferences("inkType") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Cartridge Type</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-ink-type-${product.id}`}>
                    {getSpecValue(product, "inkType")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("pageYield") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Page Yield</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-yield-${product.id}`}>
                    {getSpecValue(product, "pageYield")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("costPerPage") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Cost Per Page</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-cost-${product.id}`}>
                    {getSpecValue(product, "costPerPage")}
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  ADDITIONAL FEATURES
                </td>
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Touchscreen</td>
                {comparedProducts.map((product) => {
                  const display = getSpecValue(product, "touchscreen");
                  const hasTouchscreen = display !== "N/A" && display.toLowerCase().includes("touch");
                  return (
                    <td key={product.id} className="border p-4 text-center">
                      {hasTouchscreen ? (
                        <CheckCircle className="w-5 h-5 text-status-online mx-auto" data-testid={`icon-touchscreen-yes-${product.id}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground mx-auto" data-testid={`icon-touchscreen-no-${product.id}`} />
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Auto Document Feeder</td>
                {comparedProducts.map((product) => {
                  const adf = getSpecValue(product, "adf");
                  const hasAdf = adf !== "N/A" && adf.toLowerCase() !== "no" && adf.trim().length > 0;
                  return (
                    <td key={product.id} className="border p-4 text-center">
                      {hasAdf ? (
                        <CheckCircle className="w-5 h-5 text-status-online mx-auto" data-testid={`icon-adf-yes-${product.id}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground mx-auto" data-testid={`icon-adf-no-${product.id}`} />
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Scanner</td>
                {comparedProducts.map((product) => {
                  const scanner = getSpecValue(product, "scanner");
                  const hasScanner = scanner !== "N/A" && scanner.trim().length > 0;
                  return (
                    <td key={product.id} className="border p-4 text-center">
                      {hasScanner ? (
                        <CheckCircle className="w-5 h-5 text-status-online mx-auto" data-testid={`icon-scanner-yes-${product.id}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground mx-auto" data-testid={`icon-scanner-no-${product.id}`} />
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Physical */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  PHYSICAL SPECIFICATIONS
                </td>
              </tr>
              <tr className={checkDifferences("dimensions") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Dimensions</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-dimensions-${product.id}`}>
                    {getSpecValue(product, "dimensions")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("weight") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Weight</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-weight-${product.id}`}>
                    {getSpecValue(product, "weight")}
                  </td>
                ))}
              </tr>
              <tr className={checkDifferences("noiseLevel") ? "bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                <td className="border p-4 sticky left-0 bg-background z-10">Noise Level</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center" data-testid={`text-noise-${product.id}`}>
                    {getSpecValue(product, "noiseLevel")}
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr className="bg-primary/5">
                <td className="border p-4 font-semibold sticky left-0 bg-primary/5 z-10" colSpan={comparedProducts.length + 1}>
                  ACTIONS
                </td>
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">Add to Cart</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!product.inStock}
                      data-testid={`button-add-cart-${product.id}`}
                      className="w-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-4 sticky left-0 bg-background z-10">View Details</td>
                {comparedProducts.map((product) => (
                  <td key={product.id} className="border p-4 text-center">
                    <Button variant="outline" asChild className="w-full" data-testid={`button-view-${product.id}`}>
                      <Link href={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Comparison Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Comparison</DialogTitle>
            <DialogDescription>
              Give your comparison a name to save it for later reference.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="comparison-name">Comparison Name</Label>
              <Input
                id="comparison-name"
                placeholder="e.g., Home Office Printers"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
                data-testid="input-comparison-name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)} data-testid="button-cancel-save">
              Cancel
            </Button>
            <Button onClick={handleSaveComparison} data-testid="button-confirm-save">
              Save Comparison
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
