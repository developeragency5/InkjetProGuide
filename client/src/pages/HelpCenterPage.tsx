import { useState } from "react";
import { Link } from "wouter";
import { Search, Book, Wrench, Download, Wifi, Smartphone, Droplet, FileText, AlertCircle, PrinterCheck, Signal, Settings, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import type { HelpArticle } from "@shared/schema";

const categories = [
  {
    id: "setup",
    name: "Setup Guides",
    description: "Get started with your new HP printer",
    icon: Book,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    articles: [
      { title: "Getting Started Guide", slug: "getting-started", views: "1.2K" },
      { title: "Unboxing & Initial Setup", slug: "unboxing-setup", views: "980" },
      { title: "Driver Installation (Windows & Mac)", slug: "driver-installation", views: "1.5K" },
      { title: "WiFi Connection Setup", slug: "wifi-setup", views: "2.1K" },
      { title: "Mobile Printing Setup", slug: "mobile-printing", views: "850" },
      { title: "Ink Cartridge Installation", slug: "ink-installation", views: "1.3K" },
      { title: "Paper Loading Instructions", slug: "paper-loading", views: "670" },
      { title: "Print Quality Calibration", slug: "calibration", views: "540" },
    ],
  },
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    description: "Fix common printer issues",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    articles: [
      { title: "Paper Jam Prevention & Fixes", slug: "paper-jams", views: "3.2K" },
      { title: "Print Quality Issues", slug: "print-quality", views: "2.8K" },
      { title: "WiFi Connection Problems", slug: "wifi-troubleshooting", views: "2.5K" },
      { title: "Error Codes Explained", slug: "error-codes", views: "1.9K" },
      { title: "Ink Cartridge Problems", slug: "ink-problems", views: "1.7K" },
      { title: "Slow Printing Speed", slug: "slow-printing", views: "890" },
    ],
  },
];

const popularArticles = [
  { title: "WiFi Connection Setup", slug: "wifi-setup", category: "Setup", views: "2.1K" },
  { title: "Paper Jam Prevention & Fixes", slug: "paper-jams", category: "Troubleshooting", views: "3.2K" },
  { title: "Driver Installation (Windows & Mac)", slug: "driver-installation", category: "Setup", views: "1.5K" },
  { title: "Print Quality Issues", slug: "print-quality", category: "Troubleshooting", views: "2.8K" },
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
    .filter(category => category.articles.length > 0);

  // Get popular articles (most helpful + not helpful = most viewed)
  const popularArticles = [...articles]
    .sort((a, b) => (b.helpful + b.notHelpful) - (a.helpful + a.notHelpful))
    .slice(0, 4)
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
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Find answers, setup guides, and troubleshooting solutions for your HP printer
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-background text-foreground"
                data-testid="input-help-search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            data-testid="button-category-all"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              data-testid={`button-category-${category.id}`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Popular Articles */}
        {!searchQuery && !selectedCategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularArticles.map((article) => (
                <Link key={article.slug} href={`/help/${article.slug}`}>
                  <Card className="hover-elevate cursor-pointer" data-testid={`card-popular-${article.slug}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span>{article.views} views</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories and Articles */}
        <div className="space-y-8">
          {displayCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-md ${category.bgColor} flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.articles.map((article) => (
                  <Link key={article.slug} href={`/help/${article.slug}`}>
                    <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-article-${article.slug}`}>
                      <CardContent className="p-5">
                        <h3 className="font-semibold mb-2">{article.title}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{article.views} views</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {displayCategories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              Try a different search term or browse our categories
            </p>
            <Button onClick={() => setSearchQuery("")} data-testid="button-clear-search">
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Need Help Section */}
        <Card className="mt-12 bg-muted">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-support">
                  Contact Support
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="outline" data-testid="button-view-faq">
                  View FAQ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
