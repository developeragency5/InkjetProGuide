import { Link } from "wouter";
import { useState } from "react";
import { Book, CheckCircle, AlertCircle, DollarSign, Zap, Wifi, Camera, ChevronRight, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BeginnersGuidePage() {
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-home">Home</span>
            </Link>
            {" / "}
            <Link href="/guides">
              <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-guides">Buying Guides</span>
            </Link>
            {" / "}
            <span className="text-foreground">Beginner's Guide</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <Badge>8 min read</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-guide-title">
            Beginner's Guide to HP Inkjet Printers
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about HP inkjet printers - from basic features to choosing your first printer.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => scrollToSection("introduction")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-introduction"
                >
                  Introduction
                </button>
                <button
                  onClick={() => scrollToSection("what-is-inkjet")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-what-is-inkjet"
                >
                  What is an Inkjet Printer?
                </button>
                <button
                  onClick={() => scrollToSection("key-features")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-key-features"
                >
                  Key Features to Consider
                </button>
                <button
                  onClick={() => scrollToSection("comparison")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-comparison"
                >
                  Model Comparison
                </button>
                <button
                  onClick={() => scrollToSection("budget")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-budget"
                >
                  Budget Recommendations
                </button>
                <button
                  onClick={() => scrollToSection("use-cases")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-use-cases"
                >
                  Use Case Scenarios
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="w-full text-left text-sm hover:text-primary transition-colors py-1"
                  data-testid="toc-faq"
                >
                  FAQ
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-3xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Choosing your first printer can feel overwhelming with so many options available. This guide is designed for beginners who want to understand the basics of HP inkjet printers and make an informed purchasing decision. Whether you need a printer for occasional documents, school assignments, or creative projects, we'll help you find the perfect match.
              </p>
              <Card className="bg-blue-500/5 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2">Who is this guide for?</h4>
                      <p className="text-sm text-muted-foreground">
                        This guide is perfect for first-time printer buyers, students, home users, and anyone looking to understand the basics of inkjet printing technology before making a purchase.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* What is an Inkjet Printer */}
            <section id="what-is-inkjet">
              <h2 className="text-3xl font-bold mb-4">What is an Inkjet Printer?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                An inkjet printer is a type of printer that creates images by spraying tiny droplets of liquid ink onto paper. HP inkjet printers use thermal inkjet technology, which heats the ink to create precise, high-quality prints.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CheckCircle className="w-8 h-8 text-status-online mb-2" />
                    <CardTitle className="text-lg">Advantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Excellent photo and color print quality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Lower upfront cost than laser printers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Compact size, perfect for small spaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Can print on various paper types and sizes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Quiet operation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <AlertCircle className="w-8 h-8 text-yellow-500 mb-2" />
                    <CardTitle className="text-lg">Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Slower printing speed than laser printers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Ink cartridges need regular replacement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Ink can dry out if not used regularly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Higher cost per page for high-volume printing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>Prints may smudge if handled before drying</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Key Features to Consider */}
            <section id="key-features">
              <h2 className="text-3xl font-bold mb-6">Key Features to Consider</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>Print Speed</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Measured in pages per minute (ppm), print speed varies between models. Entry-level printers typically print 7-10 ppm, while faster models can reach 20+ ppm.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-md">
                      <p className="text-sm"><strong>Recommendation:</strong> If you print occasionally (less than 50 pages/month), speed isn't critical. For regular use, look for at least 10 ppm for black and white documents.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>Connectivity Options</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Modern HP printers offer multiple ways to connect:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>Wi-Fi:</strong> Print wirelessly from any device on your network</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>USB:</strong> Direct connection to a single computer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>Bluetooth:</strong> Quick pairing with mobile devices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>Mobile Apps:</strong> Print from smartphones and tablets using HP Smart app</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Camera className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>Print Quality & Resolution</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Print resolution is measured in dots per inch (dpi). Higher dpi means sharper, more detailed prints.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Text Documents</h4>
                        <p className="text-sm text-muted-foreground">600 x 600 dpi is sufficient for crisp text</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Photo Prints</h4>
                        <p className="text-sm text-muted-foreground">Look for 4800 x 1200 dpi or higher for best results</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>Ink Cost & Page Yield</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Consider the long-term cost of ink cartridges, not just the printer price. HP offers several ink options:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>Standard Cartridges:</strong> Lower upfront cost, fewer pages (~120 pages)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>XL Cartridges:</strong> Higher capacity, better value (~240 pages)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span><strong>HP Instant Ink:</strong> Subscription service starting at $0.99/month</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Model Comparison */}
            <section id="comparison">
              <h2 className="text-3xl font-bold mb-6">Recommended Models for Beginners</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-3 text-left font-semibold">Model</th>
                      <th className="border p-3 text-left font-semibold">Best For</th>
                      <th className="border p-3 text-left font-semibold">Print Speed</th>
                      <th className="border p-3 text-left font-semibold">Connectivity</th>
                      <th className="border p-3 text-left font-semibold">Price</th>
                      <th className="border p-3 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3 font-medium">HP DeskJet 2755e</td>
                      <td className="border p-3 text-sm text-muted-foreground">Light home use</td>
                      <td className="border p-3 text-sm">7.5 ppm</td>
                      <td className="border p-3 text-sm">Wi-Fi, USB</td>
                      <td className="border p-3 font-semibold text-primary">$79.99</td>
                      <td className="border p-3">
                        <Button size="sm" asChild data-testid="button-shop-2755e">
                          <Link href="/products">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Shop Now
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr className="bg-primary/5">
                      <td className="border p-3 font-medium">HP ENVY 6055e</td>
                      <td className="border p-3 text-sm text-muted-foreground">Photos & documents</td>
                      <td className="border p-3 text-sm">10 ppm</td>
                      <td className="border p-3 text-sm">Wi-Fi, Bluetooth</td>
                      <td className="border p-3 font-semibold text-primary">$129.99</td>
                      <td className="border p-3">
                        <Button size="sm" asChild data-testid="button-shop-6055e">
                          <Link href="/products">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Shop Now
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">HP OfficeJet Pro 8025e</td>
                      <td className="border p-3 text-sm text-muted-foreground">Home office</td>
                      <td className="border p-3 text-sm">20 ppm</td>
                      <td className="border p-3 text-sm">Wi-Fi, Ethernet, USB</td>
                      <td className="border p-3 font-semibold text-primary">$229.99</td>
                      <td className="border p-3">
                        <Button size="sm" asChild data-testid="button-shop-8025e">
                          <Link href="/products">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Shop Now
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Card className="mt-6 bg-yellow-500/5 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-2">Editor's Pick for Beginners</h4>
                      <p className="text-sm text-muted-foreground">
                        The <strong>HP ENVY 6055e</strong> offers the best balance of features, quality, and price for first-time buyers. It handles both documents and photos well, includes wireless connectivity, and comes with 6 months of HP Instant Ink.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Budget Recommendations */}
            <section id="budget">
              <h2 className="text-3xl font-bold mb-6">Budget Recommendations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2">Under $100</Badge>
                    <CardTitle>Entry-Level</CardTitle>
                    <CardDescription>Perfect for occasional printing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ideal for students or light home use. Expect basic features with Wi-Fi connectivity and decent print quality for documents.
                    </p>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>5-10 pages per month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Basic Wi-Fi printing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Simple setup</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild data-testid="button-shop-under-100">
                      <Link href="/products?maxPrice=100">View Printers</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-primary">$100-$200</Badge>
                    <CardTitle>Mid-Range</CardTitle>
                    <CardDescription>Best value for most users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      The sweet spot for home and small office use. Better print quality, faster speeds, and additional features like borderless photo printing.
                    </p>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>50-100 pages per month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Photo-quality prints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Auto duplex printing</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild data-testid="button-shop-100-200">
                      <Link href="/products?minPrice=100&maxPrice=200">View Printers</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2">$200+</Badge>
                    <CardTitle>Premium</CardTitle>
                    <CardDescription>Professional quality & features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      For serious home office users or small businesses. Fast printing, high capacity, professional-grade photo output, and advanced features.
                    </p>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>100+ pages per month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Fast print speeds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-status-online flex-shrink-0 mt-0.5" />
                        <span>Large paper capacity</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild data-testid="button-shop-over-200">
                      <Link href="/products?minPrice=200">View Printers</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Use Case Scenarios */}
            <section id="use-cases">
              <h2 className="text-3xl font-bold mb-6">Real-World Use Case Scenarios</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scenario 1: College Student</CardTitle>
                    <CardDescription>Emma, 20, needs to print essays and study materials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      <strong>Needs:</strong> Compact size for dorm room, wireless printing from laptop and phone, occasional color prints for presentations, budget-friendly ink costs.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-md mb-4">
                      <p className="font-semibold mb-2">Recommended: HP DeskJet 2755e</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        At $79.99, this printer fits a student budget and includes 6 months of HP Instant Ink. Its compact design is perfect for small spaces, and Wi-Fi connectivity means Emma can print from anywhere in her dorm.
                      </p>
                      <Button size="sm" asChild>
                        <Link href="/products">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Shop DeskJet 2755e
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scenario 2: Family Use</CardTitle>
                    <CardDescription>The Martinez family needs a versatile printer for various tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      <strong>Needs:</strong> Print homework, family photos, recipes, greeting cards, shipping labels. Multiple users with different devices.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-md mb-4">
                      <p className="font-semibold mb-2">Recommended: HP ENVY 6055e</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        This all-in-one printer excels at both documents and photos. The borderless photo printing feature is perfect for family memories, while the scanner handles homework and recipes. HP Smart app makes it easy for all family members to print from their devices.
                      </p>
                      <Button size="sm" asChild>
                        <Link href="/products">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Shop ENVY 6055e
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scenario 3: Home Office Professional</CardTitle>
                    <CardDescription>James runs a consulting business from home</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      <strong>Needs:</strong> Professional-quality documents, fast printing for client reports, duplex printing to save paper, reliable performance for daily use.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-md mb-4">
                      <p className="font-semibold mb-2">Recommended: HP OfficeJet Pro 8025e</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        With 20 ppm print speed and automatic duplex printing, this printer keeps pace with James's busy schedule. The professional print quality impresses clients, and the large paper capacity means fewer refills during work hours.
                      </p>
                      <Button size="sm" asChild>
                        <Link href="/products">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Shop OfficeJet Pro 8025e
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger data-testid="faq-inkjet-vs-laser">
                    What's the difference between inkjet and laser printers?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Inkjet printers spray liquid ink onto paper, making them ideal for photo printing and color documents. Laser printers use toner powder and are faster for high-volume black and white printing.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Choose inkjet if:</strong> You need excellent photo quality, print in color regularly, or have a lower upfront budget.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger data-testid="faq-how-long">
                    How long do ink cartridges last?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Standard HP cartridges typically print 120-150 pages for black and 100-120 pages for color. XL cartridges can print 240-300 pages (black) and 200-250 pages (color).
                    </p>
                    <p className="text-muted-foreground">
                      Actual page yield depends on the content you print - photos use more ink than text documents. HP Instant Ink can save you money and ensure you never run out.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger data-testid="faq-wifi-vs-usb">
                    Should I get a Wi-Fi or USB printer?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Wi-Fi printers offer more flexibility - you can print from multiple devices (laptops, phones, tablets) without cables. USB printers are simpler but limit you to one connected computer.
                    </p>
                    <p className="text-muted-foreground">
                      Most modern HP printers include both Wi-Fi and USB, giving you the best of both worlds. We recommend Wi-Fi for convenience, especially if you have multiple devices.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger data-testid="faq-instant-ink">
                    What is HP Instant Ink and is it worth it?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      HP Instant Ink is a subscription service that monitors your ink levels and automatically ships new cartridges before you run out. Plans start at $0.99/month for 10 pages.
                    </p>
                    <p className="text-muted-foreground">
                      It's worth it if you print regularly and want to save money on ink (up to 50% savings). Unused pages roll over, and recycling is included. You can cancel anytime without penalties.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger data-testid="faq-photo-quality">
                    Can I print high-quality photos on an inkjet printer?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Yes! HP inkjet printers with photo printing capabilities can produce lab-quality photos. Look for models with at least 4800 x 1200 dpi resolution and dedicated photo trays.
                    </p>
                    <p className="text-muted-foreground">
                      For best results, use HP photo paper and select the "Best" quality setting in your printer preferences. The HP ENVY series is particularly good for photo printing.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger data-testid="faq-how-often">
                    How often should I use my printer to prevent ink from drying?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Print at least one page per week to keep ink flowing and prevent it from drying out. Modern HP printers have automatic maintenance routines that help prevent clogs.
                    </p>
                    <p className="text-muted-foreground">
                      If you don't print regularly, consider HP Instant Ink - it monitors your printer and can prompt you to print a test page if needed. You can also run the printhead cleaning utility through the HP Smart app.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Related Guides */}
            <section>
              <Card className="bg-gradient-to-br from-primary/5 to-background">
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Explore more buying guides to make the best decision</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start h-auto py-4" asChild>
                      <Link href="/guides/ink-cost">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <div className="text-left">
                            <div className="font-semibold">Ink Cost Comparison Guide</div>
                            <div className="text-xs text-muted-foreground">Understand long-term printing costs</div>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-4" asChild>
                      <Link href="/guides/wireless-vs-usb">
                        <div className="flex items-center gap-3">
                          <Wifi className="w-5 h-5 text-primary" />
                          <div className="text-left">
                            <div className="font-semibold">Wireless vs USB Printers</div>
                            <div className="text-xs text-muted-foreground">Choose the right connectivity</div>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Final CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Buy Your First HP Printer?</h3>
                <p className="mb-6 opacity-90">
                  Browse our selection of beginner-friendly HP inkjet printers or get personalized recommendations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild data-testid="button-final-cta-browse">
                    <Link href="/products">
                      Browse All Printers
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild data-testid="button-final-cta-help">
                    <Link href="/contact">
                      Need Help Choosing?
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
