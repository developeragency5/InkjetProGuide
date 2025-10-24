import { Link } from "wouter";
import { Book, Users, GraduationCap, Camera, DollarSign, Building2, Wifi, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const guides = [
  {
    id: "beginners-guide",
    title: "Beginner's Guide to HP Inkjet Printers",
    description: "Everything you need to know about HP inkjet printers - from basic features to choosing your first printer.",
    icon: Book,
    color: "bg-blue-500",
    readTime: "8 min read",
    path: "/guides/beginners-guide",
    available: true,
  },
  {
    id: "home-office",
    title: "How to Choose the Right Printer for Home Office",
    description: "Find the perfect printer for your home office needs with our comprehensive comparison and recommendations.",
    icon: Users,
    color: "bg-purple-500",
    readTime: "10 min read",
    path: "/guides/home-office",
    available: false,
  },
  {
    id: "students",
    title: "Best Printers for Students",
    description: "Affordable, compact, and efficient printers perfect for college dorms and student budgets.",
    icon: GraduationCap,
    color: "bg-green-500",
    readTime: "7 min read",
    path: "/guides/students",
    available: false,
  },
  {
    id: "photo-printing",
    title: "Photo Printing Guide",
    description: "Learn how to achieve professional-quality photo prints at home with the right printer and techniques.",
    icon: Camera,
    color: "bg-pink-500",
    readTime: "12 min read",
    path: "/guides/photo-printing",
    available: false,
  },
  {
    id: "ink-cost",
    title: "Ink Cost Comparison Guide",
    description: "Understand ink cartridge costs, page yields, and how to save money on printing with our detailed analysis.",
    icon: DollarSign,
    color: "bg-yellow-500",
    readTime: "9 min read",
    path: "/guides/ink-cost",
    available: false,
  },
  {
    id: "small-business",
    title: "Small Business Printer Guide",
    description: "Choose the right printer for your small business with features that boost productivity and reduce costs.",
    icon: Building2,
    color: "bg-orange-500",
    readTime: "11 min read",
    path: "/guides/small-business",
    available: false,
  },
  {
    id: "wireless-vs-usb",
    title: "Wireless vs USB Printers Guide",
    description: "Compare wireless and USB connectivity options to find the best setup for your printing needs.",
    icon: Wifi,
    color: "bg-cyan-500",
    readTime: "6 min read",
    path: "/guides/wireless-vs-usb",
    available: false,
  },
];

export default function BuyingGuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4" data-testid="badge-buying-guides">Expert Advice</Badge>
            <h1 className="text-5xl font-bold mb-6" data-testid="text-hero-title">
              Complete HP Inkjet Printer Buying Guide
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert advice, detailed comparisons, and comprehensive guides to help you choose the perfect HP inkjet printer for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild data-testid="button-browse-printers">
                <Link href="/products">Browse All Printers</Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-contact-expert">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-home">Home</span>
          </Link>
          {" / "}
          <span className="text-foreground">Buying Guides</span>
        </nav>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Our Buying Guides</h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a first-time buyer or looking to upgrade, our comprehensive guides will help you make an informed decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const cardContent = (
              <Card className={guide.available ? "hover-elevate active-elevate-2 cursor-pointer transition-all h-full" : "h-full opacity-75"} data-testid={`card-guide-${guide.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${guide.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {!guide.available && (
                      <Badge variant="secondary" data-testid={`badge-coming-soon-${guide.id}`}>Coming Soon</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{guide.readTime}</Badge>
                    {guide.available && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </CardContent>
              </Card>
            );

            return guide.available ? (
              <Link key={guide.id} href={guide.path} data-testid={`link-guide-${guide.id}`}>
                {cardContent}
              </Link>
            ) : (
              <div key={guide.id}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Why Read Our Guides */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Knowledge</h3>
            <p className="text-muted-foreground">
              Our guides are written by printing experts with years of experience in the industry.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-World Testing</h3>
            <p className="text-muted-foreground">
              All recommendations are based on hands-on testing and real customer feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Value</h3>
            <p className="text-muted-foreground">
              We help you find the best printer for your budget without compromising on quality.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Printer?</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Browse our selection of HP inkjet printers or use our product finder to get personalized recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild data-testid="button-shop-now">
              <Link href="/products">Shop All Printers</Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
