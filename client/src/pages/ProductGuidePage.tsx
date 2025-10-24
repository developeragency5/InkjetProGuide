import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductGuidePage() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading guide...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product guide not found</p>
          <Link href="/guide">
            <Button>Back to All Models</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/guide">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2" data-testid="button-back-to-models">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Models
            </Button>
          </Link>

          <div className="flex items-start gap-4">
            <h1 className="text-3xl md:text-4xl font-bold flex-1">
              {product.name}
              {product.inStock && (
                <Badge className="ml-4 bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                  NEW
                </Badge>
              )}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mt-2">{product.description}</p>
        </div>
      </div>

      {/* Key Specs Overview */}
      <div className="bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Print Speed</div>
              <div className="text-2xl font-bold">Up to 24 ppm</div>
              <div className="text-xs text-muted-foreground mt-1">Color: Up to 26 ppm</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">First Page</div>
              <div className="text-2xl font-bold">As fast as 7.5 seconds</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Paper Capacity</div>
              <div className="text-2xl font-bold">250-sheet input tray +</div>
              <div className="text-xs text-muted-foreground mt-1">100-sheet multipurpose tray</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Monthly Volume</div>
              <div className="text-2xl font-bold">4,000 pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Specifications */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Complete Specifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Print Quality */}
          <Card>
            <CardHeader>
              <CardTitle>Print Quality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Resolution:</div>
                <div className="font-medium">Up to 600 x 600 dpi</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Technology:</div>
                <div className="font-medium">HP Thermal Inkjet</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Print Languages:</div>
                <div className="font-medium">PCL 6, PostScript 3</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Duplex:</div>
                <div className="font-medium">Automatic (standard)</div>
              </div>
            </CardContent>
          </Card>

          {/* Paper Handling */}
          <Card>
            <CardHeader>
              <CardTitle>Paper Handling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Input Capacity:</div>
                <div className="font-medium text-sm">250-sheet input tray + 100-sheet multipurpose tray</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Supported Sizes:</div>
                <div className="font-medium text-sm">A4, A5, A6, B5 (JIS), B6 (JIS), 10 x 15 cm, Letter, Legal, Executive, Statement, 3 x 5 in, 4 x 6 in, 5 x 8 in</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Media Types:</div>
                <div className="font-medium text-sm">Plain, HP Matte 90g, HP Soft Gloss 120g, labels, envelopes, transparencies, postcards, cardstock</div>
              </div>
            </CardContent>
          </Card>

          {/* Connectivity */}
          <Card>
            <CardHeader>
              <CardTitle>Connectivity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Standard:</div>
                <div className="font-medium text-sm">Hi-Speed USB 2.0, Ethernet, Wi-Fi 802.11b/g/n</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Mobile Printing:</div>
                <div className="font-medium text-sm">HP Smart app, Apple AirPrint, Mopria Print Service, Wi-Fi Direct</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Protocols:</div>
                <div className="font-medium text-sm">TCP/IP, DHCP, SNMP, HTTP, HTTPS, FTP, IPP, iPP6, WS-Discovery, Bonjour</div>
              </div>
            </CardContent>
          </Card>

          {/* Multifunction Features */}
          <Card>
            <CardHeader>
              <CardTitle>Multifunction Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Scanning:</div>
                <div className="font-medium">Yes</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Technology:</div>
                <div className="font-medium">Flatbed scanner with ADF</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Resolution:</div>
                <div className="font-medium">Up to 1200 x 1200 dpi optical</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">File Formats:</div>
                <div className="font-medium">JPEG, TIFF, PDF, PDF/A, PNG</div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Dimensions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Width:</div>
                <div className="font-medium">16.5 in (419 mm)</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Depth:</div>
                <div className="font-medium">16.2 in (411 mm)</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Height:</div>
                <div className="font-medium">8.9 in (226 mm)</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Weight:</div>
                <div className="font-medium">23.1 lb (10.5 kg)</div>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Print Speed:</div>
                <div className="font-medium">Up to 26 ppm</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">First Page:</div>
                <div className="font-medium">As fast as 7.5 seconds</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Duty Cycle:</div>
                <div className="font-medium">4,000 pages</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Memory:</div>
                <div className="font-medium">128 MB RAM</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8 mb-6">
            <Printer className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Ready to Purchase?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get this {product.name} with free shipping, expert support, and our price match guarantee.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/product/${product.id}`}>
                <Button size="lg" data-testid="button-view-product">
                  View Product Details
                </Button>
              </Link>
              <Link href="/guide">
                <Button size="lg" variant="outline" data-testid="button-browse-models">
                  Browse More Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
