import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cart count
  const { data: cartData } = useQuery({
    queryKey: ["/api/cart"],
  });
  const cartCount = cartData?.items?.length || 0;

  // Fetch wishlist count
  const { data: wishlistData } = useQuery({
    queryKey: ["/api/wishlist"],
  });
  const wishlistCount = wishlistData?.items?.length || 0;

  // Fetch current user
  const { data: currentUser } = useQuery({
    queryKey: ["/api/user"],
    retry: false,
  });
  const isLoggedIn = !!currentUser;

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Shop Printers", path: "/products" },
    { name: "Printer Guides", path: "/guides" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <p className="font-medium">Free Shipping on Orders $50+</p>
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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/">
              <span className="flex items-center gap-2 cursor-pointer" data-testid="link-home">
                <h1 className="text-2xl font-bold text-primary tracking-tight">
                  InjetProGuide
                </h1>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for HP printers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                  data-testid="input-search"
                />
              </form>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors cursor-pointer inline-block ${
                      location === link.path
                        ? "text-primary bg-primary/5"
                        : "text-foreground"
                    }`}
                    data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link href="/wishlist">
                <span data-testid="button-wishlist">
                  <Button size="icon" variant="ghost" className="relative" asChild>
                    <span>
                      <Heart className="w-5 h-5" />
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
                  <Button size="icon" variant="ghost" className="relative" asChild>
                    <span>
                      <ShoppingCart className="w-5 h-5" />
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

              {isLoggedIn ? (
                <Link href="/profile">
                  <span data-testid="button-profile">
                    <Button size="icon" variant="ghost" asChild>
                      <span>
                        <User className="w-5 h-5" />
                      </span>
                    </Button>
                  </span>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button size="sm" variant="default" className="hidden md:flex" data-testid="button-signin">
                    Sign In
                  </Button>
                </Link>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile/Tablet */}
          <div className="lg:hidden mt-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for HP printers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 text-sm"
                data-testid="input-search-mobile"
              />
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
                    <Link href={link.path}>
                      <span
                        className={`block px-4 py-3 text-sm font-medium hover-elevate rounded-md cursor-pointer ${
                          location === link.path
                            ? "text-primary bg-primary/5"
                            : "text-foreground"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.name}
                      </span>
                    </Link>
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
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-xl mb-4 text-primary">InjetProGuide</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Your trusted source for HP inkjet printers with comprehensive expert guidance, 
                detailed setup instructions, and professional maintenance tips. We help you find 
                the perfect printer for your home or office needs.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  <a href="mailto:support@injetproguide.com" className="hover:text-primary transition-colors">
                    support@injetproguide.com
                  </a>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Phone:</span>{" "}
                  <a href="tel:+18007746837" className="hover:text-primary transition-colors">
                    1-800-PRINTER (1-800-774-6837)
                  </a>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Hours:</span> 24/7 Customer Support
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-base mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-shop">
                      Shop All Printers
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/guides">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-guides">
                      Printer Guides
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-faqs">
                    FAQs
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-shipping">
                    Shipping Info
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-returns">
                    Returns Policy
                  </span>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-base mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-contact">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-about">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors">
                    Track Order
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors">
                    Warranty Info
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors">
                    Support Center
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-base mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Subscribe to get exclusive deals, printer tips, and new product updates delivered to your inbox.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="text-sm"
                  data-testid="input-newsletter-footer"
                />
                <Button size="sm" className="w-full" data-testid="button-subscribe-footer">
                  Subscribe Now
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground">
                © 2024 InjetProGuide. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="hover:text-foreground hover-elevate px-2 py-1 rounded-md cursor-pointer transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="hover:text-foreground hover-elevate px-2 py-1 rounded-md cursor-pointer transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="hover:text-foreground hover-elevate px-2 py-1 rounded-md cursor-pointer transition-colors" data-testid="link-footer-cookies">
                  Cookie Policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
