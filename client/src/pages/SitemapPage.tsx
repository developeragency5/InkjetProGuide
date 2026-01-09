import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ShoppingCart, BookOpen, HelpCircle, FileText, User, Search, Package, Heart, CreditCard, GitCompare, Mail, Info, Shield, Scale, Map } from "lucide-react";
import { Link } from "wouter";

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: "Shopping",
      icon: ShoppingCart,
      links: [
        { name: "Home", path: "/", icon: Home },
        { name: "All Products", path: "/products", icon: Package },
        { name: "Shopping Cart", path: "/cart", icon: ShoppingCart },
        { name: "Wishlist", path: "/wishlist", icon: Heart },
        { name: "Checkout", path: "/checkout", icon: CreditCard },
        { name: "Compare Products", path: "/compare", icon: GitCompare },
      ]
    },
    {
      title: "Resources & Guides",
      icon: BookOpen,
      links: [
        { name: "Model Guide", path: "/guide", icon: BookOpen },
        { name: "Buying Guides", path: "/guides", icon: BookOpen },
        { name: "Beginner's Guide", path: "/guides/beginners-guide", icon: BookOpen },
        { name: "Home Office Guide", path: "/guides/home-office", icon: BookOpen },
        { name: "Student Guide", path: "/guides/students", icon: BookOpen },
        { name: "Photo Printing Guide", path: "/guides/photo-printing", icon: BookOpen },
        { name: "Ink Cost Guide", path: "/guides/ink-cost", icon: BookOpen },
        { name: "Small Business Guide", path: "/guides/small-business", icon: BookOpen },
        { name: "Wireless vs USB Guide", path: "/guides/wireless-vs-usb", icon: BookOpen },
        { name: "Resource Center", path: "/resources", icon: FileText },
        { name: "Ink & Cartridge Guide", path: "/ink-guide", icon: FileText },
      ]
    },
    {
      title: "Help Center",
      icon: HelpCircle,
      links: [
        { name: "Help Center", path: "/help", icon: HelpCircle },
        { name: "FAQ", path: "/faq", icon: HelpCircle },
        { name: "Contact Us", path: "/contact", icon: Mail },
        { name: "Track Order", path: "/order-lookup", icon: Package },
      ]
    },
    {
      title: "Company Information",
      icon: Info,
      links: [
        { name: "About Us", path: "/about", icon: Info },
      ]
    },
    {
      title: "Legal & Policies",
      icon: Shield,
      links: [
        { name: "Privacy Policy", path: "/privacy-policy", icon: Shield },
        { name: "Terms & Conditions", path: "/terms-conditions", icon: Scale },
        { name: "Refund & Return Policy", path: "/refund-policy", icon: FileText },
        { name: "Shipping Policy", path: "/shipping-policy", icon: Package },
        { name: "Disclaimer", path: "/disclaimer", icon: FileText },
      ]
    },
    {
      title: "Account",
      icon: User,
      links: [
        { name: "Sign In / Sign Up", path: "/auth", icon: User },
        { name: "My Account", path: "/account", icon: User },
        { name: "My Profile", path: "/profile", icon: User },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Map className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-sitemap">
                Sitemap
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6" data-testid="text-sitemap-subtitle">
              Browse all pages and sections of InkjetProGuide to find exactly what you're looking for
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              This comprehensive sitemap provides quick access to every section of our website. Whether you are 
              looking for inkjet printers, buying guides, technical resources, or company information, 
              you can navigate directly to any page from here. Our site is organized into logical categories 
              to help you find products, resources, and support quickly and efficiently.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Search Suggestion */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold mb-2" data-testid="heading-search-tip">
                  Looking for something specific?
                </h2>
                <p className="text-muted-foreground" data-testid="text-search-tip">
                  Use your browser's search function (Ctrl+F or Cmd+F) to quickly find a specific page on this sitemap.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sitemap Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {sitemapSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`card-section-${section.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <SectionIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span data-testid={`heading-${section.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}>
                      {section.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => {
                      const LinkIcon = link.icon;
                      return (
                        <li key={linkIndex}>
                          <Link href={link.path}>
                            <div 
                              className="flex items-center gap-3 p-2 rounded-md hover-elevate active-elevate-2 cursor-pointer group"
                              data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                            >
                              <LinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                {link.name}
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Information */}
        <Card className="mt-8 border-muted">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4" data-testid="heading-about-sitemap">
              About This Sitemap
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-about-sitemap-1">
                This sitemap provides a complete overview of all pages and sections available on InkjetProGuide. It's designed to help you quickly navigate to any part of our website.
              </p>
              <p data-testid="text-about-sitemap-2">
                <strong className="text-foreground">InkjetProGuide</strong> specializes in inkjet printers, offering a comprehensive selection of products and helpful buying guides for customers across the United States.
              </p>
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3 text-foreground" data-testid="heading-need-help">
                  Need Help?
                </h3>
                <p data-testid="text-need-help">
                  If you can't find what you're looking for, please visit our{" "}
                  <Link href="/help">
                    <span className="text-primary hover:underline cursor-pointer" data-testid="link-help-center-footer">
                      Help Center
                    </span>
                  </Link>
                  {" "}or{" "}
                  <Link href="/contact">
                    <span className="text-primary hover:underline cursor-pointer" data-testid="link-contact-footer">
                      Contact Us
                    </span>
                  </Link>
                  {" "}for assistance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-muted-foreground" data-testid="text-last-updated">
          Last Updated: January 2025
        </div>
      </div>
    </div>
  );
}
