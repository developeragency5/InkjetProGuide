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
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch cart count
  const { data: cartData } = useQuery({
    queryKey: ["/api/cart"],
  });
  const cartCount = cartData?.items?.length || 0;

  const categories = [
    { name: "All Printers", path: "/products" },
    { name: "Office Printers", path: "/products?category=office" },
    { name: "Home Printers", path: "/products?category=home" },
    { name: "Portable", path: "/products?category=portable" },
    { name: "Accessories", path: "/products?category=accessories" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <p className="font-medium">Free Shipping on Orders $50+</p>
          <div className="flex items-center gap-4">
            <Link href="/account">
              <span className="hover-elevate px-2 py-1 rounded-md cursor-pointer" data-testid="link-account">
                My Account
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/">
              <span className="flex items-center gap-2 cursor-pointer" data-testid="link-home">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  InjetProGuide
                </h1>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for HP printers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="pl-10 pr-4"
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:flex"
                onClick={() => {
                  const input = document.querySelector('[data-testid="input-search"]') as HTMLInputElement;
                  input?.focus();
                }}
                data-testid="button-search"
              >
                <Search className="w-5 h-5" />
              </Button>
              
              <Link href="/wishlist">
                <span data-testid="button-wishlist">
                  <Button size="icon" variant="ghost" asChild>
                    <span>
                      <Heart className="w-5 h-5" />
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

              <Link href="/auth">
                <span data-testid="button-user">
                  <Button size="icon" variant="ghost" asChild>
                    <span>
                      <User className="w-5 h-5" />
                    </span>
                  </Button>
                </span>
              </Link>

              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for HP printers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="pl-9 pr-4 text-sm"
                data-testid="input-search-mobile"
              />
            </div>
          </div>
        </div>

        {/* Category Menu - Desktop */}
        <nav className="hidden md:block border-t">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-8 py-3">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link href={category.path}>
                    <span
                      className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors cursor-pointer inline-block ${
                        location === category.path
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                      data-testid={`link-category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-background">
            <ul className="py-2">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link href={category.path}>
                    <span
                      className={`block px-4 py-3 text-sm font-medium hover-elevate cursor-pointer ${
                        location === category.path
                          ? "text-primary bg-accent"
                          : "text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-semibold text-lg mb-4">About InjetProGuide</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your trusted source for premium HP inkjet printers. We offer the best selection and prices in the USA.
              </p>
              <p className="text-sm text-muted-foreground">
                📧 support@injetproguide.com
                <br />
                📞 1-800-PRINTER
              </p>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md">
                    Shipping Information
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                      All Products
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=office">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                      Office Printers
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=home">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                      Home Printers
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    Special Deals
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe for exclusive deals and new product alerts!
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="text-sm"
                  data-testid="input-newsletter"
                />
                <Button size="sm" data-testid="button-subscribe">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 InjetProGuide. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>We accept:</span>
                  <span className="font-semibold">VISA</span>
                  <span className="font-semibold">Mastercard</span>
                  <span className="font-semibold">Amex</span>
                  <span className="font-semibold">Cash</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
