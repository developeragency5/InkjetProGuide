import { useRoute, Link } from "wouter";
import { useState } from "react";
import { Minus, Plus, Heart, ShoppingCart, Star, Package, Shield, Truck, Printer, Wifi, Settings, Wrench, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  const isInWishlist = wishlistData?.items?.some(
    (item: any) => item.productId === productId
  );

  const addToCartMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/cart", { productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Please sign in to add items to cart.",
        variant: "destructive",
      });
    },
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: () => {
      if (isInWishlist) {
        return apiRequest("DELETE", `/api/wishlist/${productId}`, {});
      }
      return apiRequest("POST", "/api/wishlist", { productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Please sign in to manage your wishlist.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  const specifications = JSON.parse(product.specifications);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer">Home</span>
          </Link>
          {" / "}
          <Link href="/products">
            <span className="hover:text-foreground cursor-pointer">Products</span>
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image */}
          <div>
            <Card>
              <CardContent className="p-8">
                <div className="aspect-square bg-background rounded-md flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(parseFloat(product.rating || "0"))
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground" data-testid="text-review-count">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold" data-testid="text-price">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through" data-testid="text-original-price">
                      ${parseFloat(product.originalPrice!).toFixed(2)}
                    </span>
                    <Badge className="bg-destructive text-destructive-foreground" data-testid="badge-discount">
                      Save {discountPercent}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-status-online">
                  <div className="w-3 h-3 rounded-full bg-status-online" />
                  <span className="font-medium" data-testid="text-stock-status">In Stock - Ready to Ship</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= (product.stock || 99)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                size="lg"
                className="w-full font-semibold"
                disabled={!product.inStock || addToCartMutation.isPending}
                onClick={() => addToCartMutation.mutate()}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full font-semibold"
                onClick={() => toggleWishlistMutation.mutate()}
                data-testid="button-add-to-wishlist"
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders $50+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">2-Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="description" data-testid="tab-description">
              <Printer className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="specifications" data-testid="tab-specifications">
              <Settings className="w-4 h-4 mr-2" />
              Specs
            </TabsTrigger>
            <TabsTrigger value="compatibility" data-testid="tab-compatibility">
              <Wifi className="w-4 h-4 mr-2" />
              Compatibility
            </TabsTrigger>
            <TabsTrigger value="setup" data-testid="tab-setup">
              <CheckCircle className="w-4 h-4 mr-2" />
              Setup Guide
            </TabsTrigger>
            <TabsTrigger value="maintenance" data-testid="tab-maintenance">
              <Wrench className="w-4 h-4 mr-2" />
              Maintenance
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Technical Specifications</CardTitle>
                <CardDescription>Detailed specifications for {product.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Print Performance */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Printer className="w-5 h-5 text-primary" />
                    Print Performance
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Print Speed (Black)</dt>
                      <dd className="text-sm font-medium">{specifications["Print Speed (Black)"] || "22 ppm"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Print Speed (Color)</dt>
                      <dd className="text-sm font-medium">{specifications["Print Speed (Color)"] || "18 ppm"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Print Resolution</dt>
                      <dd className="text-sm font-medium">{specifications["Print Resolution"] || "4800 x 1200 dpi"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Monthly Duty Cycle</dt>
                      <dd className="text-sm font-medium">{specifications["Duty Cycle"] || "Up to 1,000 pages"}</dd>
                    </div>
                  </dl>
                </div>

                <Separator />

                {/* Paper Handling */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Paper Handling</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Paper Tray Capacity</dt>
                      <dd className="text-sm font-medium">{specifications["Paper Capacity"] || "60 sheets"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Auto Document Feeder</dt>
                      <dd className="text-sm font-medium">{specifications["ADF"] || "Not included"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Duplex Printing</dt>
                      <dd className="text-sm font-medium">{specifications["Duplex"] || "Manual (driver support)"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Max Paper Size</dt>
                      <dd className="text-sm font-medium">Letter (8.5 x 11 in)</dd>
                    </div>
                  </dl>
                </div>

                <Separator />

                {/* Connectivity */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-primary" />
                    Connectivity
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Wireless</dt>
                      <dd className="text-sm font-medium">{specifications["Connectivity"] || "802.11 b/g/n Wi-Fi"}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">USB</dt>
                      <dd className="text-sm font-medium">USB 2.0</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Mobile Printing</dt>
                      <dd className="text-sm font-medium">HP Smart app, AirPrint, Mopria</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Bluetooth</dt>
                      <dd className="text-sm font-medium">{specifications["Bluetooth"] || "Yes"}</dd>
                    </div>
                  </dl>
                </div>

                <Separator />

                {/* Physical Dimensions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Physical Dimensions</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Dimensions (W x D x H)</dt>
                      <dd className="text-sm font-medium">17.5 x 14.3 x 5.5 inches</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Weight</dt>
                      <dd className="text-sm font-medium">11.5 lbs</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Power Consumption</dt>
                      <dd className="text-sm font-medium">10W (active), 2W (standby)</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Energy Star Certified</dt>
                      <dd className="text-sm font-medium">Yes</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compatibility Tab */}
          <TabsContent value="compatibility" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Operating System Compatibility</CardTitle>
                  <CardDescription>Supported platforms for seamless printing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Windows</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Windows 11 (64-bit)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Windows 10 (32-bit and 64-bit)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Windows 8.1 (32-bit and 64-bit)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">macOS</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          macOS 14 Sonoma
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          macOS 13 Ventura
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          macOS 12 Monterey
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          macOS 11 Big Sur and later
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile Printing Support</CardTitle>
                  <CardDescription>Print from your smartphone or tablet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">HP Smart App</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download the free HP Smart app for iOS and Android to print, scan, and manage your printer from anywhere.
                      </p>
                      <div className="flex gap-2">
                        <Badge>iOS 14.0+</Badge>
                        <Badge>Android 8.0+</Badge>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium mb-2 text-sm">Apple AirPrint</h5>
                        <p className="text-xs text-muted-foreground">Print directly from iPhone, iPad, or Mac without drivers</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-sm">Mopria Print Service</h5>
                        <p className="text-xs text-muted-foreground">Print from Android devices with Mopria-certified printers</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-sm">Wi-Fi Direct</h5>
                        <p className="text-xs text-muted-foreground">Print without a wireless network connection</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supported Paper Sizes & Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Standard Paper Sizes</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Letter (8.5 x 11 in)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Legal (8.5 x 14 in)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          4 x 6 in (Photo)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          5 x 7 in (Photo)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Envelopes (#10, Monarch)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Media Types</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Plain paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          HP photo paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Brochure paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Presentation paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Iron-on transfers
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Setup Guide Tab */}
          <TabsContent value="setup" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Setup Instructions</CardTitle>
                  <CardDescription>Get your printer up and running in minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Unbox and Remove Packing Materials</h4>
                        <p className="text-sm text-muted-foreground">
                          Remove all tape, protective films, and packing materials from the printer. Remove the orange protective caps from the ink cartridges.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Install Ink Cartridges</h4>
                        <p className="text-sm text-muted-foreground">
                          Open the ink cartridge access door. Insert the color cartridge into the left slot and the black cartridge into the right slot until they click into place. Close the door.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Load Paper</h4>
                        <p className="text-sm text-muted-foreground">
                          Pull out the paper tray, slide the paper width guides to their outermost positions. Load up to 60 sheets of Letter or A4 paper, then adjust the guides until they touch the paper edges.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Connect to Power and Turn On</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect the power cable to the printer and plug it into a power outlet. Press the power button to turn on the printer. Wait for initialization to complete (about 2-3 minutes).
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Connect to Wi-Fi</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Download the HP Smart app on your smartphone or tablet. Open the app and tap "Add Printer." Follow the on-screen instructions to connect your printer to your Wi-Fi network.
                        </p>
                        <div className="bg-primary/5 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground">
                            <strong>Tip:</strong> Make sure your phone is connected to the same Wi-Fi network you want to use for the printer.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        6
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Install Drivers (Desktop/Laptop)</h4>
                        <p className="text-sm text-muted-foreground">
                          Visit <strong>123.hp.com</strong> on your computer and enter your printer model. Download and run the installer, then follow the on-screen prompts to complete the setup.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                        <h4 className="font-semibold">Printer Not Connecting to Wi-Fi</h4>
                      </div>
                      <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                        <li>• Make sure your Wi-Fi router is turned on and working properly</li>
                        <li>• Check that you're entering the correct Wi-Fi password</li>
                        <li>• Move the printer closer to your router (within 10-15 feet)</li>
                        <li>• Restart both the printer and your router</li>
                        <li>• Try using the HP Smart app's guided setup process</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                        <h4 className="font-semibold">Poor Print Quality or Streaky Prints</h4>
                      </div>
                      <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                        <li>• Run the printhead cleaning utility from the HP Smart app</li>
                        <li>• Check ink levels and replace cartridges if low</li>
                        <li>• Align the printheads using the printer settings menu</li>
                        <li>• Use HP original ink cartridges for best results</li>
                        <li>• Make sure you're using the correct paper type setting</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                        <h4 className="font-semibold">Paper Jams</h4>
                      </div>
                      <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                        <li>• Turn off the printer and unplug the power cable</li>
                        <li>• Gently pull out any stuck paper in the direction of the paper path</li>
                        <li>• Check the rear access door for any torn pieces</li>
                        <li>• Make sure paper is loaded correctly and not overfilled (max 60 sheets)</li>
                        <li>• Use only standard 20 lb (75 g/m²) paper for best results</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                        <h4 className="font-semibold">Printer Offline on Computer</h4>
                      </div>
                      <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                        <li>• Make sure the printer is turned on and connected to Wi-Fi</li>
                        <li>• Check that your computer is on the same Wi-Fi network</li>
                        <li>• On Windows: Go to Devices & Printers, right-click your printer, and uncheck "Use Printer Offline"</li>
                        <li>• On Mac: Remove and re-add the printer in System Preferences</li>
                        <li>• Restart the print spooler service (Windows) or reset the printing system (Mac)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ink Cartridge Information</CardTitle>
                  <CardDescription>Original HP ink cartridges for optimal performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Black Ink Cartridge</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Standard Yield</dt>
                            <dd className="font-medium">HP 67 (~120 pages)</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">High Yield</dt>
                            <dd className="font-medium">HP 67XL (~240 pages)</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Estimated Cost</dt>
                            <dd className="font-medium">$15.99 - $29.99</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Tri-Color Ink Cartridge</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Standard Yield</dt>
                            <dd className="font-medium">HP 67 (~100 pages)</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">High Yield</dt>
                            <dd className="font-medium">HP 67XL (~200 pages)</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Estimated Cost</dt>
                            <dd className="font-medium">$17.99 - $32.99</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-status-online" />
                        HP Instant Ink Program
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Save up to 50% on ink with HP Instant Ink subscription service. Never run out of ink - cartridges are automatically shipped to your door before you run out.
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• Plans starting at $0.99/month for 10 pages</li>
                        <li>• Includes delivery and recycling of used cartridges</li>
                        <li>• Rollover up to 2x your monthly page limit</li>
                        <li>• Cancel anytime with no penalties</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regular Maintenance Tips</CardTitle>
                  <CardDescription>Keep your printer running smoothly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" />
                        Weekly Maintenance
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Print at least one page per week to prevent ink from drying</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Wipe the exterior with a soft, damp cloth to remove dust</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Check paper tray for any debris or foreign objects</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Monthly Maintenance</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Run the automatic printhead cleaning utility if you notice quality issues</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Check ink levels and order replacements when running low</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Update printer firmware through the HP Smart app for best performance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Clean the scanner glass with a lint-free cloth and glass cleaner</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">Storage and Environmental Tips</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Keep printer in a dust-free environment with temperatures between 60-86°F (15-30°C)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Avoid placing printer in direct sunlight or near heat sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Store unused paper in its original packaging to prevent moisture absorption</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online mt-0.5 flex-shrink-0" />
                          <span>Use a surge protector to protect against power fluctuations</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Always use genuine HP ink cartridges. Third-party cartridges may cause damage not covered by warranty and can result in poor print quality or printer malfunctions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warranty & Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Standard Warranty Coverage</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        This printer includes a 2-year limited hardware warranty from the date of purchase. HP will repair or replace defective units during this period.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For warranty claims, contact HP Support at <strong>1-800-474-6836</strong> (available 24/7) or visit <strong>support.hp.com</strong>
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Extended Warranty Options</h4>
                      <p className="text-sm text-muted-foreground">
                        HP Care Pack services offer extended warranty and support options including next business day exchange, accidental damage protection, and technical phone support. Visit hp.com/carepack for details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
