import { useState } from "react";
import { Link } from "wouter";
import { Search, Book, Wrench, Download, Package, DollarSign, Shield, Droplet, FileText, ChevronRight, Truck, CreditCard, UserCircle, Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { HelpArticle } from "@shared/schema";

const categories = [
  {
    id: "setup",
    name: "Setup & Installation",
    description: "Get your HP printer up and running",
    icon: Book,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    description: "Fix common printer issues",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    id: "maintenance",
    name: "Maintenance & Care",
    description: "Keep your printer in top condition",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: "ink",
    name: "Ink & Cartridges",
    description: "Ink installation, replacement, and tips",
    icon: Droplet,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    id: "orders",
    name: "Orders & Shipping",
    description: "Track orders and shipping information",
    icon: Truck,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950",
  },
  {
    id: "account",
    name: "Account & Profile",
    description: "Manage your account settings",
    icon: UserCircle,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
  },
  {
    id: "payment",
    name: "Payment & Billing",
    description: "Payment methods and billing info",
    icon: CreditCard,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    description: "Return policy and refund process",
    icon: Package,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
];

const quickLinks = [
  { title: "Track My Order", href: "/profile", icon: Package },
  { title: "Return a Product", href: "/refund-policy", icon: Shield },
  { title: "Contact Support", href: "/contact", icon: Phone },
  { title: "FAQs", href: "/faq", icon: MessageSquare },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all help articles from API
  const { data: articles = [], isLoading } = useQuery<HelpArticle[]>({
    queryKey: ["/api/help/articles"],
  });

  // Filter articles by search query and selected category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group articles by category
  const articlesByCategory = filteredArticles.reduce((acc, article) => {
    const categoryId = article.category.toLowerCase();
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(article);
    return acc;
  }, {} as Record<string, HelpArticle[]>);

  // Build display categories from actual data
  const displayCategories = categories
    .map(category => ({
      ...category,
      articles: (articlesByCategory[category.id] || []).map(article => ({
        title: article.title,
        slug: article.slug,
        views: `${article.helpful + article.notHelpful}`
      })),
    }))
    .filter(category => category.articles.length > 0 || !searchQuery);

  // Get popular articles (most helpful + not helpful = most viewed)
  const popularArticles = [...articles]
    .sort((a, b) => (b.helpful + b.notHelpful) - (a.helpful + a.notHelpful))
    .slice(0, 6)
    .map(article => ({
      title: article.title,
      slug: article.slug,
      category: article.category,
      views: `${article.helpful + article.notHelpful}`
    }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading help articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="heading-help-center">
              Help Center
            </h1>
            <p className="text-xl opacity-95 mb-10" data-testid="text-help-subtitle">
              Find answers, setup guides, and troubleshooting solutions for your HP inkjet printer
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help articles, guides, and solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-4 h-14 text-lg bg-background text-foreground shadow-lg border-0"
                data-testid="input-help-search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Links */}
        {!searchQuery && !selectedCategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" data-testid="heading-quick-links">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-quick-${link.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <link.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{link.title}</h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6" data-testid="heading-browse-categories">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="h-11"
              data-testid="button-category-all"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="h-11"
                data-testid={`button-category-${category.id}`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        {!searchQuery && !selectedCategory && popularArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" data-testid="heading-popular-articles">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article) => (
                <Link key={article.slug} href={`/help/${article.slug}`}>
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-popular-${article.slug}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                        <span className="text-xs text-muted-foreground">{article.views} views</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        Read Article
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories and Articles */}
        {displayCategories.length > 0 && (
          <div className="space-y-12">
            {displayCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-lg ${category.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <category.icon className={`w-7 h-7 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold" data-testid={`heading-category-${category.id}`}>
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                {category.articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.articles.map((article) => (
                      <Link key={article.slug} href={`/help/${article.slug}`}>
                        <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-article-${article.slug}`}>
                          <CardContent className="p-5">
                            <h3 className="font-semibold mb-3">{article.title}</h3>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{article.views} views</span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-muted/50">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No articles available in this category yet. Check back soon!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {displayCategories.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <FileText className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-3" data-testid="heading-no-results">No articles found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any articles matching "<strong>{searchQuery}</strong>". Try a different search term or browse our categories.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={() => setSearchQuery("")} data-testid="button-clear-search">
                Clear Search
              </Button>
              <Link href="/contact">
                <Button variant="outline" data-testid="button-contact-from-search">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Contact Support Section */}
        <Card className="mt-16 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-need-more-help">
                Still Need Help?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Can't find what you're looking for? Our USA-based support team is available 24/7 
                to help you with any questions about your HP inkjet printer.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">Available 24/7</p>
                  <a href="tel:+18884674377" className="text-primary hover:underline font-medium" data-testid="link-phone-support-help">
                    1-888-467-4377
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">Response in 24 hours</p>
                  <a href="mailto:support@injetproguide.com" className="text-primary hover:underline font-medium" data-testid="link-email-support-help">
                    support@injetproguide.com
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-2">Chat with an expert</p>
                  <Link href="/contact">
                    <span className="text-primary hover:underline font-medium cursor-pointer" data-testid="link-start-chat">
                      Start Chat
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="h-12 px-8" data-testid="button-contact-support">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button size="lg" variant="outline" className="h-12 px-8" data-testid="button-view-faq">
                    View FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Link href="/guides">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-resource-guides">
              <CardContent className="p-6">
                <Book className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Buying Guides</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Expert guides to help you choose the perfect HP printer for your needs
                </p>
                <div className="text-primary text-sm font-medium flex items-center gap-1">
                  Browse Guides
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-resource-center">
              <CardContent className="p-6">
                <FileText className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Resource Center</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tutorials, tips, and resources to get the most from your printer
                </p>
                <div className="text-primary text-sm font-medium flex items-center gap-1">
                  View Resources
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/refund-policy">
            <Card className="hover-elevate cursor-pointer h-full" data-testid="card-resource-refund">
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Return Policy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  30-day money-back guarantee with hassle-free returns
                </p>
                <div className="text-primary text-sm font-medium flex items-center gap-1">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
