import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Droplet, Calculator, Search, BookOpen, Package, Recycle,
  AlertTriangle, Video, ShoppingCart, CheckCircle, DollarSign,
  Zap, Shield, TrendingDown, Info, ChevronDown, ChevronUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { InkCartridge, Product } from "@shared/schema";

const INK_SAVING_TIPS = [
  { title: "Use Draft Mode", description: "For internal documents, use draft or economy mode to reduce ink usage by up to 50%", icon: TrendingDown },
  { title: "Print Preview", description: "Always preview before printing to avoid wasted pages and ink", icon: CheckCircle },
  { title: "Grayscale Printing", description: "Print in black and white when color isn't necessary", icon: Droplet },
  { title: "Font Selection", description: "Use ink-efficient fonts like Garamond or Times New Roman", icon: BookOpen },
  { title: "Regular Maintenance", description: "Print at least once a week to prevent cartridges from drying out", icon: Zap },
  { title: "High Yield Cartridges", description: "XL cartridges cost more upfront but save money over time", icon: DollarSign },
];

const STORAGE_TIPS = [
  "Store cartridges in their original packaging until ready to use",
  "Keep cartridges at room temperature (50-80°F / 10-27°C)",
  "Store upright to prevent leaking",
  "Avoid direct sunlight and extreme temperatures",
  "Use cartridges within 24 months of purchase",
  "Don't remove the protective tape until installation"
];

const TROUBLESHOOTING_TIPS = [
  { issue: "Print Quality Issues", solution: "Run a cleaning cycle from printer settings, then print a test page" },
  { issue: "Cartridge Not Recognized", solution: "Remove and reseat the cartridge, ensure protective tape is removed" },
  { issue: "Low Ink Warning (New Cartridge)", solution: "Reset the printer or update firmware" },
  { issue: "Streaky Prints", solution: "Clean print heads using printer's maintenance menu" },
  { issue: "Colors Look Wrong", solution: "Align cartridges and run color calibration" },
  { issue: "Cartridge Leaking", solution: "Store upright, check for damage, contact support if defective" }
];

export default function InkGuidePage() {
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [costPagesPerMonth, setCostPagesPerMonth] = useState("100");
  const [costColorRatio, setCostColorRatio] = useState("30");
  const [compatibilityExpanded, setCompatibilityExpanded] = useState<string[]>([]);

  const { data: cartridges = [] } = useQuery<InkCartridge[]>({
    queryKey: ["/api/ink-cartridges"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const printerModels = useMemo(() => {
    return products.map(p => p.name).sort();
  }, [products]);

  const selectedPrinterCartridges = useMemo(() => {
    if (!selectedPrinter) return [];
    return cartridges.filter(c => 
      c.compatiblePrinters.includes(selectedPrinter)
    );
  }, [selectedPrinter, cartridges]);

  const costEstimate = useMemo(() => {
    if (!selectedPrinterCartridges.length || !costPagesPerMonth) return null;

    const pagesPerMonth = parseInt(costPagesPerMonth);
    const colorPercent = parseInt(costColorRatio) / 100;
    const blackPages = pagesPerMonth * (1 - colorPercent);
    const colorPages = pagesPerMonth * colorPercent;

    const blackCartridge = selectedPrinterCartridges.find(c => c.color.toLowerCase() === "black");
    const colorCartridges = selectedPrinterCartridges.filter(c => c.color.toLowerCase() !== "black");

    if (!blackCartridge || !colorCartridges.length) return null;

    const blackCost = (blackPages / blackCartridge.pageYield) * parseFloat(blackCartridge.price);
    
    // Check if printer uses tri-color or individual CMY cartridges
    const hasTriColor = colorCartridges.some(c => c.color.toLowerCase() === "tri-color");
    
    let colorCost: number;
    if (hasTriColor) {
      // Tri-color printer: use single tri-color cartridge cost
      const triColorCartridge = colorCartridges.find(c => c.color.toLowerCase() === "tri-color")!;
      colorCost = (colorPages / triColorCartridge.pageYield) * parseFloat(triColorCartridge.price);
    } else {
      // Individual CMY cartridges: sum all three color cartridges
      const avgColorPrice = colorCartridges.reduce((sum, c) => sum + parseFloat(c.price), 0) / colorCartridges.length;
      const avgColorYield = colorCartridges.reduce((sum, c) => sum + c.pageYield, 0) / colorCartridges.length;
      // Multiply by the actual number of color cartridges (typically 3 for CMY)
      colorCost = (colorPages / avgColorYield) * avgColorPrice * colorCartridges.length;
    }

    return {
      monthly: (blackCost + colorCost).toFixed(2),
      yearly: ((blackCost + colorCost) * 12).toFixed(2),
      perPage: ((blackCost + colorCost) / pagesPerMonth).toFixed(3),
    };
  }, [selectedPrinterCartridges, costPagesPerMonth, costColorRatio]);

  const groupedCartridges = useMemo(() => {
    const groups: Record<string, InkCartridge[]> = {};
    cartridges.forEach(cartridge => {
      const key = cartridge.cartridgeNumber;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(cartridge);
    });
    return groups;
  }, [cartridges]);

  const toggleCompatibility = (cartridgeNumber: string) => {
    setCompatibilityExpanded(prev =>
      prev.includes(cartridgeNumber)
        ? prev.filter(num => num !== cartridgeNumber)
        : [...prev, cartridgeNumber]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Droplet className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Ink & Cartridge Guide
            </h1>
            <p className="text-xl text-white/90">
              Everything you need to know about ink cartridges, compatibility, costs, and maintenance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Interactive Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Interactive Tools</h2>

          <Tabs defaultValue="find-cartridge" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="find-cartridge" data-testid="tab-find-cartridge">
                Find My Cartridge
              </TabsTrigger>
              <TabsTrigger value="cost-calculator" data-testid="tab-cost-calculator">
                Cost Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="find-cartridge" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Find Your Cartridge
                  </CardTitle>
                  <CardDescription>
                    Select your printer model to see compatible cartridges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="printer-select">Select Your Printer Model</Label>
                    <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                      <SelectTrigger id="printer-select" data-testid="select-printer-model">
                        <SelectValue placeholder="Choose a printer model..." />
                      </SelectTrigger>
                      <SelectContent>
                        {printerModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPrinterCartridges.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Compatible Cartridges:</h3>
                      <div className="grid gap-4">
                        {selectedPrinterCartridges.map((cartridge) => (
                          <Card key={cartridge.id} data-testid={`card-cartridge-${cartridge.cartridgeNumber}`}>
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">
                                    {cartridge.cartridgeName}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">{cartridge.cartridgeNumber}</Badge>
                                    <Badge variant="secondary">{cartridge.color}</Badge>
                                    {cartridge.isXL && <Badge>XL / High Yield</Badge>}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-primary">
                                    ${cartridge.price}
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Page Yield: {cartridge.pageYield} pages</span>
                                <span>Cost/Page: ${(parseFloat(cartridge.price) / cartridge.pageYield).toFixed(3)}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cost-calculator" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Ink Cost Calculator
                  </CardTitle>
                  <CardDescription>
                    Estimate your monthly and yearly printing costs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="calc-printer-select">Select Your Printer Model</Label>
                    <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                      <SelectTrigger id="calc-printer-select" data-testid="select-calculator-printer">
                        <SelectValue placeholder="Choose a printer model..." />
                      </SelectTrigger>
                      <SelectContent>
                        {printerModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pages-month">Pages Printed Per Month</Label>
                    <Input
                      id="pages-month"
                      type="number"
                      value={costPagesPerMonth}
                      onChange={(e) => setCostPagesPerMonth(e.target.value)}
                      placeholder="100"
                      data-testid="input-pages-per-month"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color-ratio">Color Printing Percentage: {costColorRatio}%</Label>
                    <Input
                      id="color-ratio"
                      type="range"
                      min="0"
                      max="100"
                      value={costColorRatio}
                      onChange={(e) => setCostColorRatio(e.target.value)}
                      data-testid="slider-color-ratio"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>All Black & White</span>
                      <span>All Color</span>
                    </div>
                  </div>

                  {costEstimate && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-4">
                      <h3 className="font-semibold text-lg">Estimated Costs:</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Per Page</div>
                          <div className="text-2xl font-bold text-primary" data-testid="text-cost-per-page">
                            ${costEstimate.perPage}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Monthly</div>
                          <div className="text-2xl font-bold text-primary" data-testid="text-cost-monthly">
                            ${costEstimate.monthly}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Yearly</div>
                          <div className="text-2xl font-bold text-primary" data-testid="text-cost-yearly">
                            ${costEstimate.yearly}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator className="my-12" />

        {/* Compatibility Chart */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Cartridge Compatibility Chart</h2>
            <p className="text-muted-foreground text-lg">
              Complete compatibility information for all cartridges
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(groupedCartridges).map(([cartridgeNumber, cartridgeGroup]) => {
              const isExpanded = compatibilityExpanded.includes(cartridgeNumber);
              const standardCartridge = cartridgeGroup.find(c => !c.isXL);
              const xlCartridge = cartridgeGroup.find(c => c.isXL);

              return (
                <Card key={cartridgeNumber} data-testid={`card-cartridge-group-${cartridgeNumber}`}>
                  <CardHeader 
                    className="cursor-pointer" 
                    onClick={() => toggleCompatibility(cartridgeNumber)}
                    data-testid={`button-toggle-compatibility-${cartridgeNumber}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-xl">{cartridgeNumber}</CardTitle>
                        <div className="flex gap-2">
                          {cartridgeGroup.map(c => (
                            <Badge key={c.id} variant="secondary">{c.color}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" data-testid={`button-expand-${cartridgeNumber}`}>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </Button>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {standardCartridge && (
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">Standard Yield</h4>
                            <div className="space-y-1 text-sm">
                              <div>Price: ${standardCartridge.price}</div>
                              <div>Page Yield: {standardCartridge.pageYield} pages</div>
                              <div>Cost/Page: ${(parseFloat(standardCartridge.price) / standardCartridge.pageYield).toFixed(3)}</div>
                            </div>
                          </div>
                        )}
                        {xlCartridge && (
                          <div className="border rounded-lg p-4 border-primary">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">XL / High Yield</h4>
                              <Badge>Best Value</Badge>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div>Price: ${xlCartridge.price}</div>
                              <div>Page Yield: {xlCartridge.pageYield} pages</div>
                              <div>Cost/Page: ${(parseFloat(xlCartridge.price) / xlCartridge.pageYield).toFixed(3)}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Compatible Printers:</h4>
                        <div className="flex flex-wrap gap-2">
                          {cartridgeGroup[0].compatiblePrinters.map(printer => (
                            <Badge key={printer} variant="outline">{printer}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        <Separator className="my-12" />

        {/* HP vs Compatible Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Original HP vs. Compatible Cartridges</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Original HP Cartridges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Guaranteed compatibility with your HP printer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Consistent print quality and color accuracy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Full manufacturer warranty protection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Environmentally friendly with recycling program</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Optimized ink formulation for HP printheads</span>
                  </div>
                </div>
                <Badge className="w-full justify-center py-2">Recommended for Critical Documents</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Compatible Cartridges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Significant cost savings (up to 50% less)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Good quality for everyday printing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>May void printer warranty if damage occurs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Quality can vary between manufacturers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>May have compatibility issues with firmware updates</span>
                  </div>
                </div>
                <Badge variant="secondary" className="w-full justify-center py-2">
                  Good for High-Volume Printing
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Ink Saving Tips */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Ink Saving Tips</h2>
            <p className="text-muted-foreground text-lg">
              Reduce your printing costs with these expert tips
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INK_SAVING_TIPS.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Icon className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-base">{tip.title}</CardTitle>
                        <CardDescription className="mt-2">{tip.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Storage & Maintenance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Storage & Maintenance</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Proper Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {STORAGE_TIPS.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Shelf Life Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Unopened Cartridges</h4>
                  <p className="text-sm text-muted-foreground">
                    24 months from manufacture date when stored properly
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Opened Cartridges</h4>
                  <p className="text-sm text-muted-foreground">
                    6-12 months depending on usage and storage conditions
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong>Important:</strong> Always check the expiration date on the packaging before purchase.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Troubleshooting */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Troubleshooting Ink Issues</h2>
            <p className="text-muted-foreground text-lg">
              Common problems and solutions
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {TROUBLESHOOTING_TIPS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger data-testid={`button-troubleshoot-${index}`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    {item.issue}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start gap-2 pl-7">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item.solution}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Separator className="my-12" />

        {/* Recycling Program */}
        <Card className="mb-12 border-green-500/50 bg-green-50 dark:bg-green-900/10">
          <CardContent className="py-8">
            <div className="text-center max-w-3xl mx-auto">
              <Recycle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">HP Recycling Program</h2>
              <p className="text-muted-foreground mb-6">
                HP offers free cartridge recycling through their Planet Partners program. Help protect the environment
                by returning your used cartridges for responsible recycling.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button data-testid="button-learn-recycling">
                  <Recycle className="w-4 h-4 mr-2" />
                  Learn About Recycling
                </Button>
                <Button variant="outline" data-testid="button-find-dropoff">
                  <Package className="w-4 h-4 mr-2" />
                  Find Drop-off Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Tutorials */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Video Tutorials</h2>
            <p className="text-muted-foreground text-lg">
              Step-by-step visual guides
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Installing Ink Cartridges",
              "Checking Ink Levels",
              "Cleaning Print Heads"
            ].map((title, index) => (
              <Card 
                key={title} 
                className="hover-elevate active-elevate-2 cursor-pointer"
                data-testid={`card-video-tutorial-${index}`}
              >
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                    <Video className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>Watch this helpful tutorial</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
