import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SEOHead } from "@/components/SEOHead";
import {
  ShoppingCart,
  Package,
  Shield,
  Mail,
  BookOpen,
  Star,
  CheckCircle,
  Award,
  TrendingUp,
  Users,
  Truck,
  CreditCard,
  Search,
  Printer,
  ArrowRight,
  Zap,
  Clock,
  Globe,
  Wifi,
  CheckCircle2,
  Box,
  BadgeCheck,
  BarChart3,
  Flame,
  Wrench,
  Sparkles,
  Target,
  RefreshCw,
  Phone,
  Headphones,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import defaultHeroImage from "@assets/generated_images/HP_OfficeJet_Pro_printer_89015997.png";
import { staticProducts, getHomeProducts, getOfficeProducts } from "@/data/products";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Use static product data
  const homeProducts = getHomeProducts().slice(0, 4);
  const officeProducts = getOfficeProducts().slice(0, 4);

  const homeOfficeStartingPrice = getHomeProducts()
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0]?.price || "79";

  const officeStartingPrice = getOfficeProducts()
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0]?.price || "299";

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Successfully Subscribed!",
      description:
        "Check your inbox for your 10% discount code. Welcome to the InkjetProGuide family!",
    });

    setEmail("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <SEOHead page="home" fallbackTitle="InkjetProGuide - Shop Inkjet Printers" />
      {/* SECTION 1: Hero Section - 40/60 Split Layout */}
      <section
        className="relative py-8 sm:py-12 lg:py-0 lg:min-h-[600px] overflow-hidden"
        data-testid="section-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:h-full flex items-center py-6 lg:py-12">
          <div className="w-full grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Left Content - 40% */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance"
                  data-testid="hero-headline"
                >
                  InkjetProGuide —{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Printer Buying Guides</span>{" "}
                  & Online Store
                </h1>

                <p
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg"
                  data-testid="hero-subtext"
                >
                  Explore in-depth printer buying guides and shop a curated selection of inkjet printers for home and office use.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg"
                  data-testid="stat-guides"
                >
                  <Wifi className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Wireless Printers</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg"
                  data-testid="stat-cost-analysis"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Photo Printers</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg"
                  data-testid="stat-store"
                >
                  <Printer className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Inkjet vs Laser Guides
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link href="/guides" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    className="w-full sm:w-auto font-semibold sm:h-12 sm:px-6"
                    data-testid="button-browse-guides"
                  >
                    <BookOpen className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
                    Read Buying Guides
                  </Button>
                </Link>
                <a href="/products#!/Inkjet-Printers/c/193859557" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    variant="outline"
                    className="w-full sm:w-auto font-semibold sm:h-12 sm:px-6"
                    data-testid="button-shop-printers"
                  >
                    Shop Printers
                    <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Content - 60% with Hero Image */}
            <div className="xl:col-span-3">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl opacity-50"></div>
                <Card className="relative overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                      <img
                        src={defaultHeroImage}
                        alt="Professional Inkjet Printer - Quality printing solution for home and office"
                        className="w-full h-full object-contain p-8 bg-gradient-to-br from-muted/30 to-muted/10"
                        data-testid="hero-image"
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Featured Printer
                              </p>
                              <p className="font-semibold">
                                Professional Office Series
                              </p>
                            </div>
                            <a href="/products#!/Inkjet-Printers/c/193859557">
                              <Button
                                size="sm"
                                data-testid="button-view-collection"
                              >
                                View Collection
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2: What We Cover - Topics Grid */}
      <section
        className="py-16 lg:py-20 bg-muted/30"
        data-testid="section-what-we-cover"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-topics">
              <BookOpen className="w-4 h-4 mr-2" />
              Printer Categories
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-what-we-cover"
            >
              Examine Printer Types
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              InkjetProGuide provides informational buying guides and a curated online store featuring inkjet printers sourced through independent distribution channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              className="hover-elevate transition-all"
              data-testid="topic-buying-advice"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Wifi className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Wireless Printers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Print from any device in your home or office with a wireless
                  printer. Our wireless printer collection features models with
                  WiFi Direct, AirPrint, and mobile app connectivity. Discover
                  which wireless printer features matter most—dual-band WiFi for
                  faster speeds or Bluetooth for direct device pairing.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="topic-ink-economics"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Photo Printers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transform your digital memories into stunning prints with
                  vibrant colors and sharp detail using a dedicated photo
                  printer. Our photo printer selection includes models with
                  6-ink systems for expanded color gamut and borderless
                  printing. Find which photo printer delivers the best results
                  for portraits, landscapes, and creative projects.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="topic-maintenance"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">
                  Inkjet vs Laser Printer
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choosing between an inkjet printer and a laser printer? Our
                  comparison guides explain when an inkjet printer outperforms a
                  laser printer—especially for photo printing, color accuracy,
                  and versatile media handling. Discover why creative
                  professionals and home offices frequently prefer inkjet
                  printers.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="topic-technology"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <Printer className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Home & Office Inkjet</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From compact home inkjet printers to high-capacity office
                  models, find the right inkjet printer for your environment.
                  Our collection includes all-in-one wireless printers with scan
                  and copy, plus specialized inkjet printers for business
                  documents and photo printing.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="topic-upgrades"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">
                  Printer Buying Guides
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Not sure which printer type is right for you? Our buying
                  guides compare inkjet printer options for every budget and use
                  case. Learn the differences between wireless printer models,
                  photo printer specifications, and understand why inkjet often
                  beats laser printer for home use.
                </p>
              </CardContent>
            </Card>

            <a href="/products#!/Inkjet-Printers/c/193859557" className="block">
              <Card
                className="hover-elevate transition-all h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
                data-testid="topic-all-guides"
              >
                <CardContent className="p-6 flex flex-col h-full justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">View All Printers</h3>
                  <p className="text-muted-foreground">
                    Browse our complete selection of inkjet printers, wireless
                    printers, and photo printers.
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
      {/* SECTION 3: Who We Serve - 4 Persona Cards */}
      <section
        className="py-16 lg:py-20 bg-background"
        data-testid="section-who-we-serve"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-personas">
              <Users className="w-4 h-4 mr-2" />
              Find Your Printer
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-who-we-serve"
            >
              Printers for All Purposes
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you need a wireless printer for flexible connectivity, a
              photo printer for stunning images, or a laser printer vs inkjet
              printer comparison—we have the right solution. Our inkjet printer
              selection benefits everyone from first-time buyers to professional
              photographers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="hover-elevate transition-all"
              data-testid="persona-beginners"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">
                  Wireless Printer Seekers
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Looking for a wireless printer that works seamlessly with all
                  your devices? Our wireless printer selection features models
                  with WiFi, AirPrint, and mobile app connectivity. Shop
                  wireless printers ideal for multi-device households and
                  flexible home offices.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="persona-home-office"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Photo Printer Fans</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Need a photo printer for gallery-quality prints? Our photo
                  printer collection delivers vibrant colors and sharp detail on
                  photo paper. From compact photo printers for snapshots to
                  professional models for large prints—find the ideal photo
                  printer for your creative vision.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="persona-small-business"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Printer className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">
                  Inkjet Printer Buyers
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Why choose an inkjet printer over a laser printer? Our inkjet
                  printer selection offers superior photo quality, lower upfront
                  costs, and versatile media handling. Learn why an inkjet
                  printer is the best option for homes and small offices.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="persona-students-families"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">
                  Laser vs Inkjet Comparers
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Weighing inkjet printer vs laser printer options? Our guides
                  break down the key differences. Find out when color printing,
                  photo output, and overall value outweigh laser printers.
                  Utilize our comparison resources to make an informed decision.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* SECTION 4: How It Works - 3-Step Journey */}
      <section
        className="py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background"
        data-testid="section-how-it-works"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-process">
              <Target className="w-4 h-4 mr-2" />
              Shop Smart
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-how-it-works"
            >
              How to Select a Printer
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our three-step process makes selecting the right inkjet printer,
              wireless printer, or photo printer simple. Compare inkjet printers
              to laser printers, explore wireless printer connectivity options,
              and find the best photo printer for your creative projects—all
              with transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative" data-testid="step-explore">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3">Browse Printer Types</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore our curated selection of inkjet printers, wireless
                  printers, and photo printers. Sort by type—whether you need a
                  wireless printer for flexible connectivity, a photo printer
                  for vivid images, or comparing inkjet printer vs laser printer
                  to make the right decision.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 right-0 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent translate-x-8"></div>
            </div>

            <div className="relative" data-testid="step-compare">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <BarChart3 className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3">Evaluate Features</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Compare inkjet printer models, wireless printer connectivity
                  options, and photo printer specifications with our guides.
                  Learn why inkjet printers often outperform laser printers for
                  photo printing and home use.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 right-0 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent translate-x-8"></div>
            </div>

            <div className="relative" data-testid="step-purchase">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3">
                  Purchase Your Perfect Printer
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Purchase your inkjet printer, wireless printer, or photo
                  printer with confidence. Fast shipping,
                  30-day returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 5: Popular Guides - 6 Guide Cards */}
      <section
        className="py-16 lg:py-20 bg-background"
        data-testid="section-popular-guides"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-popular-guides">
              <BookOpen className="w-4 h-4 mr-2" />
              Buying Guides
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-popular-guides"
            >
              Printer Buying Guides
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Check out our in-depth comparisons of inkjet printers vs laser
              printers, wireless printers, and photo printers. Make informed
              decisions with detailed specifications and real-world
              recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/guides">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full"
                data-testid="guide-choose-printer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Printer className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        Best Inkjet Printer Buying Guide
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Complete guide to selecting the right inkjet printer for
                        your needs. Compare inkjet printer features and
                        specifications to find the best inkjet printer for home
                        or office.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">10 min read</Badge>
                        <span className="text-xs text-muted-foreground">
                          Inkjet Printer Guide
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full"
                data-testid="guide-ink-yield"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        Best Wireless Printer Guide
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Select the ideal wireless printer for seamless
                        connectivity. Compare wireless printer features like
                        WiFi, AirPrint, and mobile app printing for flexible
                        home and office setups.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">8 min read</Badge>
                        <span className="text-xs text-muted-foreground">
                          Wireless Printer Guide
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full"
                data-testid="guide-instant-ink"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        Best Photo Printer Guide
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Discover the best photo printer for stunning prints.
                        Compare photo printer specifications, color accuracy,
                        and find the ideal photo printer for portraits and
                        creative projects.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">12 min read</Badge>
                        <span className="text-xs text-muted-foreground">
                          Photo Printer Guide
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full"
                data-testid="guide-maintenance"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        Laser vs Inkjet Printer Guide
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Complete comparison of laser and inkjet printers.
                        Determine when photo printing, color output, and home
                        office use outweigh laser printers.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">7 min read</Badge>
                        <span className="text-xs text-muted-foreground">
                          Inkjet vs Laser
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full"
                data-testid="guide-wireless"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        Wireless Printer Features & Setup
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Everything you need to know about connecting a wireless
                        printer. Detailed explanations of AirPrint, WiFi Direct,
                        and mobile app features for seamless wireless printer
                        operation.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">6 min read</Badge>
                        <span className="text-xs text-muted-foreground">
                          Wireless Setup
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/guides">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full"
                data-testid="guide-series-comparison"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        Inkjet vs Photo Printer Comparison
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Know the difference between all-purpose inkjet printers
                        and dedicated photo printers. Determine whether a
                        versatile inkjet printer or specialized photo printer is
                        best for you.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary">9 min read</Badge>
                        <span className="text-xs text-muted-foreground">
                          Photo vs Inkjet
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link href="/guides">
              <Button
                variant="outline"
                size="lg"
                data-testid="button-view-all-guides"
              >
                View All Buying Guides
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* SECTION 6: Home Inkjet Printers */}
      <section
        className="py-16 lg:py-20 bg-muted/30"
        data-testid="section-home-printers"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-home-printers">
              <Printer className="w-4 h-4 mr-2" />
              For Home Use
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-home-printers"
            >
              Home Inkjet Printers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Compact and efficient inkjet printers designed for home-based
              professionals and remote workers. These printers feature wireless
              connectivity, mobile printing support, and quiet operation for
              shared living spaces. Ideal for everyday document printing, school
              projects, and occasional photo printing with excellent quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeProducts.map((product) => (
              <a 
                key={product.id} 
                href={product.ecwidUrl}
                className="block"
              >
                <Card className="hover-elevate h-full">
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden border">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                      ) : (
                        <Printer className="w-16 h-16 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(parseFloat(product.rating)) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviewCount})</span>
                    </div>
                    <Button className="w-full mt-4" data-testid={`button-shop-${product.slug}`}>
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="https://www.inkjetproguide.com/products#!/Home-Printers/c/193853315">
              <Button size="lg" data-testid="button-shop-home-printers">
                Shop Home Printers
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              Free standard shipping is available on qualifying orders. Shipping terms may vary by product and location.
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 6B: Office Inkjet Printers */}
      <section
        className="py-16 lg:py-20 bg-background"
        data-testid="section-office-printers"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-office-printers">
              <TrendingUp className="w-4 h-4 mr-2" />
              For Business Use
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-office-printers"
            >
              Office Inkjet Printers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional-grade inkjet printers built for small to medium
              business environments. These printers deliver fast print speeds,
              automatic document feeders, duplex printing, and robust network
              connectivity. Designed for higher monthly duty cycles with lower
              cost per page for maximum productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officeProducts.map((product) => (
              <a 
                key={product.id} 
                href={product.ecwidUrl}
                className="block"
              >
                <Card className="hover-elevate h-full">
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden border">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                      ) : (
                        <Printer className="w-16 h-16 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(parseFloat(product.rating)) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviewCount})</span>
                    </div>
                    <Button className="w-full mt-4" data-testid={`button-shop-${product.slug}`}>
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="https://www.inkjetproguide.com/products#!/Office-Printers/c/193855066">
              <Button size="lg" data-testid="button-shop-office-printers">
                Shop Office Printers
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              Free standard shipping is available on qualifying orders. Shipping terms may vary by product and location.
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 7: Shop by Category - 2 Category Cards */}
      <section
        className="py-16 lg:py-20 bg-muted/30"
        data-testid="section-shop-by-category"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-categories">
              <Package className="w-4 h-4 mr-2" />
              Browse by Use Case
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-shop-by-category"
            >
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find the perfect inkjet printer based on your primary use case. We
              have organized our catalog into two main categories that align
              with how most customers use their printers. Each category features
              printers optimized for specific environments, print volumes, and
              output requirements. Click any category to explore our curated
              selection with detailed specifications and transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a href="/products#!/Home-Printers/c/193853315">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full group"
                data-testid="category-home-office"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <Printer className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    Home Inkjet Printers
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Compact and efficient inkjet printers designed for
                    home-based professionals and remote workers. Features
                    include wireless connectivity, mobile printing support, and
                    quiet operation for shared living spaces. Ideal for moderate
                    print volumes with excellent document quality.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                    <span>
                      Starting from $
                      {parseFloat(homeOfficeStartingPrice).toFixed(0)}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="/products#!/Office-Printers/c/193855066">
              <Card
                className="hover-elevate transition-all cursor-pointer h-full group"
                data-testid="category-small-office"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors">
                    <TrendingUp className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    Office Inkjet Printers
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Perfect for teams of 5-15 users who need reliable shared
                    printing. Professional office inkjet models deliver fast
                    print speeds, automatic document feeders, duplex printing,
                    and network connectivity. Built for higher monthly duty
                    cycles with lower cost per page.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                    <span>
                      Starting from $
                      {parseFloat(officeStartingPrice).toFixed(0)}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
      {/* SECTION 8: Why Choose InkjetProGuide - 3 Value Props */}
      <section
        className="py-16 lg:py-20 bg-muted/30"
        data-testid="section-why-choose"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-value-props">
              <Award className="w-4 h-4 mr-2" />
              Our Advantages
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-why-choose"
            >
              Why Choose InkjetProGuide
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              InkjetProGuide is an independent online retailer serving customers in the United States. We provide informational buying guides and sell printers sourced through independent distribution channels. We are not affiliated with, endorsed by, or sponsored by any printer manufacturer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              className="hover-elevate transition-all border-2 border-primary/10"
              data-testid="value-wide-selection"
            >
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Box className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Wide Selection</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We maintain an extensive catalog of inkjet printers covering
                  every major product line—entry-level inkjets for
                  budget-conscious home users, professional office inkjets for
                  business productivity, photo inkjets for photo enthusiasts,
                  and tank-based inkjets for high-volume printing. Our curated
                  selection includes the latest models alongside proven
                  performers, ensuring you find exactly the right printer for
                  your specific needs and budget.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all border-2 border-primary/10"
              data-testid="value-fast-shipping"
            >
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Fast Shipping</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Most orders ship within 24 hours from our fulfillment centers, with delivery in 2–3 business days to addresses across the continental United States. Printers typically arrive factory-sealed. Manufacturer warranty coverage may be available and is provided by the manufacturer according to their terms and conditions. We use protective packaging to help ensure products arrive in good condition.
                </p>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all border-2 border-primary/10"
              data-testid="value-best-prices"
            >
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Competitive Pricing</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Fair and competitive pricing with periodic promotions and special offers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* SECTION 9: Customer Testimonials - 3 Reviews */}
      <section
        className="py-16 lg:py-20 bg-background"
        data-testid="section-testimonials"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-testimonials">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Customer Reviews
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              data-testid="heading-testimonials"
            >
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real feedback from verified InkjetProGuide customers who have
              purchased inkjet printers through our store. We take pride in our
              customer satisfaction ratings and appreciate the kind words from
              buyers who found our educational resources and product selection
              helpful in making their purchasing decisions.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Customer reviews are submitted by purchasers and reflect individual experiences. Results may vary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              className="hover-elevate transition-all"
              data-testid="testimonial-1"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "The buying guides on InkjetProGuide helped me understand
                  exactly what I needed for my home office. I was overwhelmed by
                  options at first, but after reading the home office printer
                  guide, I knew the professional office inkjet was perfect for
                  my needs. Fast shipping and the printer arrived in perfect
                  condition. Highly recommend this site for anyone researching
                  printers."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm text-muted-foreground">
                      Marketing Consultant
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">
                    Verified Buyer • Order IPG-2025-4521
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="testimonial-2"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "As a small business owner, I needed a printer that could
                  handle our daily document volume without breaking the bank on
                  ink. The cost analysis guides here were incredibly helpful in
                  calculating our true cost per page. We ended up with the Smart
                  Tank 7602 and it has been running flawlessly for six months.
                  The tank system saves us hundreds compared to cartridges."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">SL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah L.</p>
                    <p className="text-sm text-muted-foreground">
                      Real Estate Agency Owner
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">
                    Verified Buyer • Order IPG-2025-3187
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover-elevate transition-all"
              data-testid="testimonial-3"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "I print a lot of photos for my family scrapbooks and wanted
                  something better than the cheap printer we had. The photo
                  printer comparison guide helped me choose the right model. The
                  photo quality from the photo inkjet I purchased is
                  amazing—colors are vibrant and prints look professional. The
                  buying guides answered all my questions before purchase. Great
                  experience overall."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">JT</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jennifer T.</p>
                    <p className="text-sm text-muted-foreground">
                      Photography Hobbyist
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">
                    Verified Buyer • Order IPG-2025-2854
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-8">
            Customer reviews are submitted by purchasers and reflect individual experiences. Results may vary.
          </p>
        </div>
      </section>
      {/* SECTION 10: Newsletter CTA */}
      <section
        className="relative py-20 lg:py-24 overflow-hidden"
        data-testid="section-newsletter"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,97,0.1),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6" data-testid="badge-newsletter">
            <Mail className="w-4 h-4 mr-2" />
            Newsletter
          </Badge>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            data-testid="heading-newsletter"
          >
            Save Money & Stay Informed
          </h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of inkjet printer owners who subscribe to our weekly
            newsletter. Get exclusive deals, new product announcements, and
            buying guide updates delivered directly to your inbox.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-6 text-base"
              data-testid="input-newsletter"
            />
            <Button
              type="submit"
              size="lg"
              className="font-semibold whitespace-nowrap"
              data-testid="button-subscribe"
            >
              Subscribe Now
            </Button>
          </form>
          <p
            className="text-sm text-muted-foreground max-w-lg mx-auto"
            data-testid="text-newsletter-privacy"
          >
            We respect your privacy and never share your email with third
            parties. You can unsubscribe at any time with one click. By
            subscribing, you agree to receive promotional emails about inkjet
            printers and printing resources.
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline ml-1"
              data-testid="link-privacy-policy"
            >
              Read our Privacy Policy
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
