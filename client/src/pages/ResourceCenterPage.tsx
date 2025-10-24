import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Search, BookOpen, Wrench, HelpCircle, FileText, Video, 
  Download, Database, Droplet, ArrowRight, TrendingUp, Clock,
  Mail, MessageSquare, Phone, Scale, CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { HelpArticle, Faq } from "@shared/schema";

const RESOURCE_CATEGORIES = [
  {
    title: "Buying Guides",
    description: "Expert recommendations to choose the perfect printer",
    icon: BookOpen,
    link: "/guides",
    color: "text-blue-500",
  },
  {
    title: "Setup Tutorials",
    description: "Step-by-step instructions to get started",
    icon: Wrench,
    link: "/help?category=Setup%20Guides",
    color: "text-green-500",
  },
  {
    title: "Troubleshooting Help",
    description: "Solutions to common printer problems",
    icon: HelpCircle,
    link: "/help?category=Troubleshooting",
    color: "text-red-500",
  },
  {
    title: "FAQs",
    description: "Frequently asked questions answered",
    icon: FileText,
    link: "/faq",
    color: "text-purple-500",
  },
  {
    title: "Video Library",
    description: "Visual guides and demonstrations",
    icon: Video,
    link: "/help",
    color: "text-orange-500",
  },
  {
    title: "Downloadable Manuals",
    description: "PDF guides for offline reference",
    icon: Download,
    link: "/help",
    color: "text-cyan-500",
  },
  {
    title: "Specifications Database",
    description: "Detailed technical specifications",
    icon: Database,
    link: "/products",
    color: "text-indigo-500",
  },
  {
    title: "Ink Guide",
    description: "Everything about cartridges and supplies",
    icon: Droplet,
    link: "/help?category=Maintenance",
    color: "text-pink-500",
  },
  {
    title: "Comparison Tool",
    description: "Compare printers side-by-side",
    icon: Scale,
    link: "/compare",
    color: "text-amber-500",
  },
];

const CATEGORIES = [
  "All Resources",
  "Getting Started",
  "Setup & Installation",
  "Troubleshooting",
  "Maintenance",
  "Best Practices",
];

export default function ResourceCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Fetch help articles
  const { data: helpArticles = [] } = useQuery<HelpArticle[]>({
    queryKey: ["/api/help/articles"],
  });

  // Fetch FAQs
  const { data: faqs = [] } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      // In a real app, this would subscribe to a newsletter service
      return new Promise((resolve) => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive helpful tips and updates in your inbox.",
      });
      setEmail("");
    },
  });

  const popularArticles = useMemo(() => {
    return [...helpArticles]
      .sort((a, b) => (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful))
      .slice(0, 6);
  }, [helpArticles]);

  const latestArticles = useMemo(() => {
    return [...helpArticles]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 4);
  }, [helpArticles]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      newsletterMutation.mutate(email);
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/help?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Everything You Need to Know About HP Inkjet Printers
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Your complete resource hub for guides, tutorials, troubleshooting, and expert tips
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input
                type="search"
                placeholder="What do you need help with?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-4 h-14 text-lg bg-background text-foreground"
                data-testid="input-resource-search"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                data-testid="button-resource-search"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Access Cards */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Quick Access to Resources</h2>
            <p className="text-muted-foreground text-lg">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {RESOURCE_CATEGORIES.map((resource) => {
              const Icon = resource.icon;
              const testId = `link-resource-${resource.title.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Link key={resource.title} href={resource.link} data-testid={testId}>
                  <Card className="hover-elevate active-elevate-2 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Icon className={`w-8 h-8 ${resource.color}`} />
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Popular Articles & Latest Updates - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Popular Articles */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Popular Articles</h2>
            </div>

            <div className="space-y-4">
              {popularArticles.slice(0, 5).map((article, index) => (
                <Link 
                  key={article.id} 
                  href={`/help/${article.slug}`}
                  data-testid={`link-popular-article-${index}`}
                >
                  <Card className="hover-elevate active-elevate-2 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base mb-2">{article.title}</CardTitle>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span>{article.helpful} helpful</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Latest Updates */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Latest Updates</h2>
            </div>

            <div className="space-y-4">
              {latestArticles.map((article, index) => (
                <Link 
                  key={article.id} 
                  href={`/help/${article.slug}`}
                  data-testid={`link-latest-article-${index}`}
                >
                  <Card className="hover-elevate active-elevate-2 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base mb-2">{article.title}</CardTitle>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span>
                              {new Date(article.updatedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Separator className="my-12" />

        {/* Category Browsing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <Link key={category} href={`/help?category=${encodeURIComponent(category)}`}>
                <Button
                  variant="outline"
                  className="hover-elevate"
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardContent className="py-8">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Get Tips & Updates</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for printer tips, maintenance guides, and special offers
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  data-testid="button-newsletter-subscribe"
                >
                  {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support CTA */}
        <Card className="border-2 border-primary">
          <CardContent className="py-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Need Personalized Help?</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Our expert support team is ready to assist you with any questions or concerns
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" data-testid="button-live-chat">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button size="lg" variant="outline" data-testid="button-email-support">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Support
                </Button>
                <Button size="lg" variant="outline" data-testid="button-phone-support">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1-800-INJET-PRO
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Average response time: Under 2 hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
