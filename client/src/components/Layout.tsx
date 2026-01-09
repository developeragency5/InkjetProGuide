import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Heart, User, Menu, X, Shield, Lock, Truck } from "lucide-react";
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover, SiStripe } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ComparisonBar from "@/components/ComparisonBar";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { MARKETING_COPY, SHIPPING, BUSINESS_INFO } from "@/lib/constants";
import type { Product } from "@shared/schema";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch cart count
  const { data: cartData } = useQuery<{ items: any[] }>({
    queryKey: ["/api/cart"],
  });
  const cartCount = cartData?.items?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0;

  // Fetch wishlist count
  const { data: wishlistData } = useQuery<{ items: any[] }>({
    queryKey: ["/api/wishlist"],
  });
  const wishlistCount = wishlistData?.items?.length || 0;

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ["/api/user"],
    retry: false,
  });
  const isLoggedIn = !!currentUser;

  // Fetch products for search suggestions
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products based on search query (only search in name and category for relevance)
  const searchSuggestions = products?.filter(product => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }).slice(0, 5) || [];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigationLinks = [
    { name: "Home", path: "/", exact: true },
    { name: "Shop All", path: "/products", exact: true },
    { name: "Home Printers", path: "/products?category=Home+Inkjet+Printers", exact: false },
    { name: "Office Printers", path: "/products?category=Office+Inkjet+Printers", exact: false },
    { name: "Guides", path: "/guides", exact: false },
    { name: "About", path: "/about", exact: false },
    { name: "Contact", path: "/contact", exact: false },
  ];

  // Helper to check if a nav link is active
  const isLinkActive = (link: typeof navigationLinks[0]) => {
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const fullCurrentUrl = currentPath + currentSearch;
    
    if (link.exact) {
      // For exact matches, check if the full URL matches exactly
      if (link.path.includes('?')) {
        return fullCurrentUrl === link.path;
      }
      return currentPath === link.path && !currentSearch;
    }
    
    // For non-exact matches, check if path starts with link path or full URL matches
    if (link.path.includes('?')) {
      return fullCurrentUrl === link.path;
    }
    return currentPath.startsWith(link.path);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: string | number) => {
    setLocation(`/product/${productId}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  // Newsletter subscription mutation
  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to subscribe");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Check your inbox for exclusive deals and printer tips.",
      });
      setNewsletterEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      newsletterMutation.mutate(newsletterEmail);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-base">
          <p className="font-medium">{MARKETING_COPY.freeShippingMessage}</p>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link href="/profile">
                <span className="hover-elevate px-2 py-1 rounded-md cursor-pointer" data-testid="link-account">
                  My Account
                </span>
              </Link>
            ) : (
              <Link href="/auth">
                <span className="hover-elevate px-2 py-1 rounded-md cursor-pointer" data-testid="link-signin-top">
                  Sign In / Sign Up
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Sticky */}
      <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/">
              <span className="flex items-center gap-2 cursor-pointer" data-testid="link-home">
                <h1 className="text-3xl font-bold text-primary tracking-tight">
                  InkjetProGuide
                </h1>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative w-full flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for printers..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    className="pl-10 pr-4 h-11"
                    data-testid="input-search"
                  />
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-card border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleSuggestionClick(product.id)}
                          className="w-full px-4 py-3 text-left hover-elevate flex items-center gap-3 border-b last:border-b-0"
                          data-testid={`suggestion-${product.id}`}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.category}</div>
                          </div>
                          <div className="text-sm font-semibold text-primary">${product.price}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button type="submit" className="h-11 px-6" data-testid="button-search">
                  Search
                </Button>
              </form>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link href="/wishlist">
                <span data-testid="button-wishlist">
                  <Button size="icon" variant="ghost" className="relative h-11 w-11" asChild aria-label="View wishlist">
                    <span>
                      <Heart className="w-6 h-6" aria-hidden="true" />
                      {wishlistCount > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          data-testid="badge-wishlist-count"
                        >
                          {wishlistCount}
                        </Badge>
                      )}
                    </span>
                  </Button>
                </span>
              </Link>

              <Link href="/cart">
                <span data-testid="button-cart">
                  <Button size="icon" variant="ghost" className="relative h-11 w-11" asChild aria-label="View shopping cart">
                    <span>
                      <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                      {cartCount > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          data-testid="badge-cart-count"
                        >
                          {cartCount}
                        </Badge>
                      )}
                    </span>
                  </Button>
                </span>
              </Link>

              {isLoggedIn && (
                <Link href="/profile">
                  <span data-testid="button-profile">
                    <Button size="icon" variant="ghost" className="h-11 w-11" asChild aria-label="View profile">
                      <span>
                        <User className="w-6 h-6" aria-hidden="true" />
                      </span>
                    </Button>
                  </span>
                </Link>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden h-11 w-11"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile/Tablet */}
          <div className="lg:hidden mt-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for printers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 text-sm"
                  data-testid="input-search-mobile"
                />
              </div>
              <Button type="submit" size="sm" data-testid="button-search-mobile">
                Search
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t bg-background">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (link.path.includes('?')) {
                          window.location.href = link.path;
                        } else {
                          setLocation(link.path);
                        }
                      }}
                      className={`block px-4 py-3 text-base font-medium hover-elevate rounded-md cursor-pointer ${
                        isLinkActive(link)
                          ? "text-primary bg-primary/5"
                          : "text-foreground"
                      }`}
                      data-testid={`link-mobile-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                {!isLoggedIn && (
                  <li>
                    <Link href="/auth">
                      <Button 
                        className="w-full" 
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="button-signin-mobile"
                      >
                        Sign In / Sign Up
                      </Button>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        )}

        {/* Navigation Bar - Below Header */}
        <div className="hidden lg:block border-b bg-card">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center gap-3 py-4">
              {navigationLinks.map((link) => (
                <a 
                  key={link.path} 
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.path.includes('?')) {
                      window.location.href = link.path;
                    } else {
                      setLocation(link.path);
                    }
                  }}
                >
                  <Button
                    variant={isLinkActive(link) ? "default" : "ghost"}
                    className="font-medium text-base h-11 px-6"
                    data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Button>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Comparison Bar */}
      <ComparisonBar />

      {/* Footer */}
      <footer className="bg-gradient-to-b from-card to-muted/20 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info - Larger Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h3 className="font-bold text-xl">InkjetProGuide</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Your trusted source for inkjet printers across the USA. We provide expert guidance, 
                comprehensive buying guides, and dedicated support to help you find the perfect printer 
                for your needs.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div data-testid="text-footer-address">
                    <span className="text-xs text-muted-foreground/70 block">Corporate Mailing Address</span>
                    2704 Handley Ederville Rd, Fort Worth, TX 76118
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:inkjetproguide@outlook.com" className="hover:text-primary transition-colors" data-testid="link-footer-email">
                    inkjetproguide@outlook.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+13254008874" className="hover:text-primary transition-colors" data-testid="link-footer-phone">
                    1-325-400-8874
                  </a>
                </div>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Shop</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a 
                    href="/products" 
                    className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" 
                    data-testid="link-footer-all-printers"
                  >
                    All Printers
                  </a>
                </li>
                <li>
                  <a 
                    href="/products?category=Home+Inkjet+Printers" 
                    className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" 
                    data-testid="link-footer-home-printers"
                  >
                    Home Inkjet Printers
                  </a>
                </li>
                <li>
                  <a 
                    href="/products?category=Office+Inkjet+Printers" 
                    className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" 
                    data-testid="link-footer-office-printers"
                  >
                    Office Inkjet Printers
                  </a>
                </li>
                <li>
                  <Link href="/compare">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-compare">
                      Compare Products
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Resources</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/guides">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-buying-guides">
                      Buying Guides
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/guide">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-model-guide">
                      Model Guide
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/ink-guide">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-ink-guide">
                      Ink & Cartridge Guide
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-resource-center">
                      Resource Center
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-faq">
                      FAQ
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help & Company */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Help & Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/help">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-help-center">
                      Help Center
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-contact">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/order-lookup">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-order-lookup">
                      Track Order
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-about">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-refund-policy">
                      Refund & Returns
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-shipping-policy">
                      Shipping Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/purchase-policy">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-purchase-policy">
                      Purchase Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/warranty">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-warranty">
                      Warranty Info
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-sitemap">
                      Sitemap
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-b py-8 mb-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get exclusive deals, expert printing tips, and the latest printer releases delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="text-sm flex-1"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterMutation.isPending}
                  data-testid="input-newsletter-footer"
                />
                <Button 
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  data-testid="button-subscribe-footer" 
                  className="sm:w-auto"
                >
                  {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to receive promotional emails. You can unsubscribe anytime. 
                <Link href="/privacy-policy" className="text-primary hover:underline ml-1">Privacy Policy</Link>
              </p>
            </div>
          </div>

          {/* Trust Signals Section */}
          <div className="border-b py-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Payment Methods */}
              <div className="text-center">
                <h4 className="text-sm font-semibold mb-3 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Secure Payment
                </h4>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  <div className="bg-background border rounded-md px-2 py-1.5" title="Visa">
                    <SiVisa className="w-8 h-5 text-[#1A1F71]" />
                  </div>
                  <div className="bg-background border rounded-md px-2 py-1.5" title="Mastercard">
                    <SiMastercard className="w-8 h-5 text-[#EB001B]" />
                  </div>
                  <div className="bg-background border rounded-md px-2 py-1.5" title="American Express">
                    <SiAmericanexpress className="w-8 h-5 text-[#006FCF]" />
                  </div>
                  <div className="bg-background border rounded-md px-2 py-1.5" title="Discover">
                    <SiDiscover className="w-8 h-5 text-[#FF6000]" />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-3">
                  <SiStripe className="w-10 h-4 text-[#635BFF]" />
                  <span className="text-xs text-muted-foreground">Powered by Stripe</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="text-center">
                <h4 className="text-sm font-semibold mb-3 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Security & Trust
                </h4>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md px-3 py-1.5">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md px-3 py-1.5">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-400">256-bit Encryption</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Your data is protected with industry-standard encryption
                </p>
              </div>

              {/* Shipping Partners */}
              <div className="text-center">
                <h4 className="text-sm font-semibold mb-3 flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  Shipping Partners
                </h4>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  <div className="bg-[#351C15] text-white rounded-md px-3 py-1.5" title="UPS">
                    <span className="text-sm font-bold tracking-wide">UPS</span>
                  </div>
                  <div className="bg-[#4D148C] text-white rounded-md px-3 py-1.5" title="FedEx">
                    <span className="text-sm font-bold">Fed<span className="text-[#FF6200]">Ex</span></span>
                  </div>
                  <div className="bg-[#004B87] text-white rounded-md px-3 py-1.5" title="USPS">
                    <span className="text-sm font-bold tracking-wide">USPS</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {MARKETING_COPY.freeShippingDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer Notice */}
          <div className="border-t border-b py-6 mb-8 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-testid="text-footer-disclaimer">
              <strong className="text-foreground">Affiliate Disclosure:</strong> InkjetProGuide may earn a commission on purchases made through links on this site at no additional cost to you. This helps support our educational content and product recommendations.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-2" data-testid="text-footer-hp-disclaimer">
              <strong className="text-foreground">Trademark Notice:</strong> Product names, logos, and brands are property of their respective owners. InkjetProGuide is an independent retailer and is <strong>not affiliated with, endorsed by, or sponsored by any printer manufacturer.</strong> Product warranties are provided by the manufacturer according to their terms and conditions.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-2" data-testid="text-footer-price-disclaimer">
              Prices, specifications, and availability are subject to change without notice. Please verify all information before making a purchase decision.{" "}
              <Link href="/disclaimer" className="text-primary hover:underline">Read full disclaimer</Link>.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="text-muted-foreground text-center md:text-left">
              © {BUSINESS_INFO.year} {BUSINESS_INFO.name}. All rights reserved. Made with care in the USA.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
              <Link href="/disclaimer">
                <span className="hover:text-primary cursor-pointer transition-colors" data-testid="link-footer-disclaimer">
                  Disclaimer
                </span>
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link href="/privacy-policy">
                <span className="hover:text-primary cursor-pointer transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </span>
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link href="/terms-conditions">
                <span className="hover:text-primary cursor-pointer transition-colors" data-testid="link-footer-terms">
                  Terms & Conditions
                </span>
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link href="/refund-policy">
                <span className="hover:text-primary cursor-pointer transition-colors" data-testid="link-footer-refund">
                  Return Policy
                </span>
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link href="/accessibility">
                <span className="hover:text-primary cursor-pointer transition-colors" data-testid="link-footer-accessibility">
                  Accessibility
                </span>
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link href="/privacy-policy#california-rights">
                <span className="hover:text-primary cursor-pointer transition-colors" data-testid="link-footer-do-not-sell">
                  Do Not Sell My Info
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />
    </div>
  );
}
