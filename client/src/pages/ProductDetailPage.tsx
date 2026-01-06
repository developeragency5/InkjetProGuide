import { useRoute, Link } from "wouter";
import { useState, useEffect } from "react";
import { Minus, Plus, Heart, ShoppingCart, Star, Package, Shield, Truck, Printer, Wifi, Settings, Wrench, AlertCircle, CheckCircle, ZoomIn, ChevronLeft, ChevronRight, GitCompare, Filter, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { useComparison } from "@/contexts/ComparisonContext";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [showStickyCart, setShowStickyCart] = useState(false);
  const { toast } = useToast();
  const { selectedProducts, addToComparison, removeFromComparison, isInComparison } = useComparison();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: wishlistData } = useQuery<{ items: any[] }>({
    queryKey: ["/api/wishlist"],
  });

  const isInWishlist = wishlistData?.items?.some(
    (item: any) => item.productId === productId
  );

  // Sticky cart bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCart(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Safe specification parsing
  const parseSpecifications = () => {
    try {
      if (typeof product.specifications === 'string') {
        return JSON.parse(product.specifications);
      }
      return product.specifications || {};
    } catch (error) {
      console.warn('Failed to parse specifications:', error);
      return {};
    }
  };

  const specifications = parseSpecifications();

  // Multiple product images - use images array if available, otherwise use main image
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  // Related products (same category, excluding current)
  const relatedProducts = allProducts
    ?.filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4) || [];

  // Reviews are not available - will be implemented when real customer reviews are collected

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-home">Home</span>
          </Link>
          {" / "}
          <Link href="/products">
            <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-products">Products</span>
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image Gallery */}
          <div>
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="aspect-square bg-background rounded-md flex items-center justify-center relative overflow-hidden group">
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain p-8"
                  />
                  {/* Zoom button */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setShowImageZoom(true)}
                    data-testid="button-zoom-image"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Image thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square border-2 rounded-md overflow-hidden hover-elevate transition-all ${
                    selectedImageIndex === index ? "border-primary" : "border-border"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

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

            {/* Short Description */}
            <p className="text-muted-foreground mb-6">
              {product.description.substring(0, 150)}...
            </p>

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
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold"
                  onClick={() => toggleWishlistMutation.mutate()}
                  data-testid="button-add-to-wishlist"
                >
                  <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current" : ""}`} />
                  Wishlist
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold"
                  onClick={() => {
                    if (productId) {
                      if (isInComparison(productId)) {
                        removeFromComparison(productId);
                      } else {
                        addToComparison(productId);
                      }
                    }
                  }}
                  data-testid="button-compare"
                >
                  <GitCompare className={`w-5 h-5 mr-2 ${productId && isInComparison(productId) ? "fill-current" : ""}`} />
                  Compare
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders $299+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Original OEM Warranty</p>
                  <p className="text-xs text-muted-foreground">Manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="mb-16">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" data-testid="tab-overview">
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
            <TabsTrigger value="troubleshooting" data-testid="tab-troubleshooting">
              <AlertCircle className="w-4 h-4 mr-2" />
              Troubleshooting
            </TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-3">What's in the Box</h3>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">HP Inkjet Printer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">HP 67 Setup Black Ink Cartridge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">HP 67 Setup Tri-color Ink Cartridge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Power cord</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Setup poster and quick start guide</span>
                  </li>
                </ul>

                <Separator className="my-6" />

                <div className="bg-primary/5 p-6 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Warranty Information</h4>
                      <p className="text-sm text-muted-foreground">
                        This printer includes the <strong>Original OEM Warranty</strong> from the date of purchase. HP will repair or replace defective units during this period. For warranty claims, contact HP Support at 1-800-474-6836 (available 24/7) or visit support.hp.com
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Who Is This For? - Use Cases */}
                <h3 className="text-xl font-semibold mb-4">Who Is This Printer For?</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Home Users</h4>
                    <p className="text-sm text-muted-foreground">
                      Perfect for families who need to print school assignments, photos, recipes, and occasional documents. 
                      The wireless connectivity makes it easy for everyone in the household to print from their devices.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Students</h4>
                    <p className="text-sm text-muted-foreground">
                      Ideal for college students in dorms or apartments. Compact size saves space, and mobile printing 
                      lets you print essays and projects directly from your laptop or smartphone.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Home Office Workers</h4>
                    <p className="text-sm text-muted-foreground">
                      Great for remote workers who need reliable printing for contracts, invoices, and business documents. 
                      Scanning and copying features add extra productivity value.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">Small Businesses</h4>
                    <p className="text-sm text-muted-foreground">
                      Suitable for small offices with moderate print volumes. Professional-quality output for client-facing 
                      materials and internal documents at an affordable cost.
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Pros & Cons */}
                <h3 className="text-xl font-semibold mb-4">Benefits & Considerations</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      Benefits
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Easy wireless setup with HP Smart app guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Excellent print quality for photos and documents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Mobile printing from any device via WiFi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Compact design fits in small spaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Energy Star certified for lower power consumption</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <AlertCircle className="w-5 h-5" />
                      Considerations
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Best suited for low to moderate print volumes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Paper tray capacity may require frequent refills for heavy use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Standard cartridges have lower page yields than XL options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Manual duplex printing (no automatic two-sided on basic models)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Safety & Maintenance Tips */}
                <h3 className="text-xl font-semibold mb-4">Safety & Maintenance Tips</h3>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Safe Operation</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Keep the printer on a flat, stable surface</li>
                        <li>Use only HP-recommended paper types</li>
                        <li>Never reach inside while printing</li>
                        <li>Keep away from water and humid areas</li>
                        <li>Unplug before cleaning or maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Maintenance Best Practices</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Print at least once weekly to prevent ink drying</li>
                        <li>Run printhead cleaning if quality degrades</li>
                        <li>Use genuine HP ink cartridges for best results</li>
                        <li>Keep firmware updated via HP Smart app</li>
                        <li>Store unused cartridges in cool, dry place</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* How It Compares */}
                <h3 className="text-xl font-semibold mb-4">How This Model Compares</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-semibold">Feature</th>
                        <th className="text-center py-3 px-2 font-semibold bg-primary/5">This Model</th>
                        <th className="text-center py-3 px-2 font-semibold">Entry-Level</th>
                        <th className="text-center py-3 px-2 font-semibold">Pro Series</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b">
                        <td className="py-2 px-2">Print Speed</td>
                        <td className="text-center py-2 px-2 bg-primary/5 font-medium">Up to 22 ppm</td>
                        <td className="text-center py-2 px-2">Up to 7 ppm</td>
                        <td className="text-center py-2 px-2">Up to 25 ppm</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-2">WiFi Connectivity</td>
                        <td className="text-center py-2 px-2 bg-primary/5"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-2">Auto Duplex</td>
                        <td className="text-center py-2 px-2 bg-primary/5">Manual</td>
                        <td className="text-center py-2 px-2">Manual</td>
                        <td className="text-center py-2 px-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-2">Scanner/Copier</td>
                        <td className="text-center py-2 px-2 bg-primary/5"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                        <td className="text-center py-2 px-2">Print Only</td>
                        <td className="text-center py-2 px-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-2">Best For</td>
                        <td className="text-center py-2 px-2 bg-primary/5 font-medium">Home/Students</td>
                        <td className="text-center py-2 px-2">Occasional Use</td>
                        <td className="text-center py-2 px-2">Small Business</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  This printer offers the ideal balance of features and value for home users and students who need 
                  reliable printing without the higher cost of professional-grade models. For higher volume needs, 
                  consider our OfficeJet Pro series.
                </p>
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
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Print Technology</dt>
                      <dd className="text-sm font-medium">HP Thermal Inkjet</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Number of Print Cartridges</dt>
                      <dd className="text-sm font-medium">2 (1 black, 1 tri-color)</dd>
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
                      <dt className="text-sm text-muted-foreground">Output Tray Capacity</dt>
                      <dd className="text-sm font-medium">25 sheets</dd>
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

                <Separator />

                {/* Ink Cartridge Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Ink Cartridge Information</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Black Cartridge</dt>
                      <dd className="text-sm font-medium">HP 67 / HP 67XL</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Color Cartridge</dt>
                      <dd className="text-sm font-medium">HP 67 Tri-color / HP 67XL Tri-color</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">Standard Yield (Black)</dt>
                      <dd className="text-sm font-medium">~120 pages</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-sm text-muted-foreground">High Yield (Black)</dt>
                      <dd className="text-sm font-medium">~240 pages</dd>
                    </div>
                  </dl>
                </div>

                <Separator />

                {/* Supported Operating Systems */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Supported Operating Systems</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Windows</h4>
                      <p className="text-sm text-muted-foreground">Windows 11, 10, 8.1 (32-bit and 64-bit)</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">macOS</h4>
                      <p className="text-sm text-muted-foreground">macOS 14, 13, 12, 11 and later</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compatibility Tab - keeping existing content */}
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
                  <CardDescription>Compatible media for all your printing needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Paper Sizes</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Letter (8.5 x 11 in)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          A4 (8.27 x 11.69 in)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Legal (8.5 x 14 in)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          4 x 6 in photo paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          5 x 7 in photo paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Envelopes (#10, Monarch)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Paper Types</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          Plain paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          HP premium inkjet paper
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          HP photo paper (glossy)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-status-online" />
                          HP photo paper (matte)
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

              <Card>
                <CardHeader>
                  <CardTitle>Compatible Ink Cartridges</CardTitle>
                  <CardDescription>Original HP ink cartridges for this printer</CardDescription>
                </CardHeader>
                <CardContent>
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
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Setup Guide Tab - continuing from existing... */}
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
                        <p className="text-sm text-muted-foreground mb-3">
                          Visit <strong>123.hp.com</strong> on your computer and enter your printer model. Download and run the installer, then follow the on-screen prompts to complete the setup.
                        </p>
                        <Button variant="outline" size="sm" data-testid="button-download-drivers">
                          Download Drivers
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Initial Setup Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Unpack and remove all protective materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Install ink cartridges correctly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Load paper in tray</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Connect power and turn on</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Connect to Wi-Fi network</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Install drivers on computer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-status-online mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Print test page to verify setup</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Troubleshooting Tab */}
          <TabsContent value="troubleshooting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues and Solutions</CardTitle>
                <CardDescription>Quick fixes for the most common printer problems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
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
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
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
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
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
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
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

                  <Separator />

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <h4 className="font-semibold">Ink Cartridge Not Recognized</h4>
                    </div>
                    <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                      <li>• Remove the cartridge and check for protective tape on the contacts</li>
                      <li>• Clean the cartridge contacts with a lint-free cloth</li>
                      <li>• Reinsert the cartridge firmly until it clicks</li>
                      <li>• Try the cartridge in the other slot to test if it's detected</li>
                      <li>• Update printer firmware through HP Smart app</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <h4 className="font-semibold">Slow Printing Speed</h4>
                    </div>
                    <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                      <li>• Change print quality setting from "Best" to "Normal" or "Draft"</li>
                      <li>• Close other programs running on your computer</li>
                      <li>• Print in grayscale for faster black and white documents</li>
                      <li>• Check ink levels - low ink can slow printing</li>
                      <li>• Ensure printer is not in "Quiet Mode" if available</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>Share your experience with this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Be the first to share your experience with this printer. 
                    Contact us after your purchase to leave a review.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" data-testid="button-contact-review">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link href="/products">
                <Button variant="outline" size="sm" data-testid="button-view-all-products">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart Bar (Mobile) */}
      {showStickyCart && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50 animate-in slide-in-from-bottom">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold text-sm">{product.name}</p>
              <p className="text-lg font-bold text-primary">${parseFloat(product.price).toFixed(2)}</p>
            </div>
            <Button
              size="lg"
              disabled={!product.inStock || addToCartMutation.isPending}
              onClick={() => addToCartMutation.mutate()}
              data-testid="button-sticky-add-to-cart"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      <Dialog open={showImageZoom} onOpenChange={setShowImageZoom}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="aspect-square bg-background rounded-md flex items-center justify-center">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square border-2 rounded-md overflow-hidden hover-elevate transition-all ${
                  selectedImageIndex === index ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
