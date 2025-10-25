import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import ComparisonBar from "@/components/ComparisonBar";
import type { Product } from "@shared/schema";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch cart count
  const { data: cartData } = useQuery<{ items: any[] }>({
    queryKey: ["/api/cart"],
  });
  const cartCount = cartData?.items?.length || 0;

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

  // Filter products based on search query
  const searchSuggestions = products?.filter(product => 
    searchQuery.trim() && (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).slice(0, 5) || [];

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

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Guide", path: "/guide" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <p className="font-medium">Free Shipping on Orders $299+</p>
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
            <div className="hidden lg:flex flex-1 max-w-xl" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for HP printers..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className="pl-10 pr-4"
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
              </form>
            </div>

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

        {/* Navigation Bar - Below Header */}
        <div className="hidden lg:block border-b bg-card">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center gap-2 py-3">
              {navigationLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Button
                    variant={location === link.path ? "default" : "ghost"}
                    size="sm"
                    className="font-medium"
                    data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Button>
                </Link>
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
      <footer className="bg-card border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">InjetProGuide</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your trusted source for HP inkjet printers with expert guidance, 
                setup instructions, and maintenance tips.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2024 InjetProGuide. All rights reserved.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    All Printers
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Photo Printers" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    Photo Printers
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Mobile Printers" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    Mobile Printers
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Wide-Format Printers" className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    Wide-Format Printers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                      Contact Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/guides">
                    <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                      Printer Guides
                    </span>
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    Shipping Information
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block">
                    Returns & Warranty
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get exclusive deals and expert printing tips delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="text-sm"
                  data-testid="input-newsletter-footer"
                />
                <Button size="sm" data-testid="button-subscribe-footer">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <div className="flex flex-wrap gap-4">
                <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
                <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
                <span className="hover:text-foreground cursor-pointer">Cookie Policy</span>
              </div>
              <div className="flex gap-4">
                <span>Made with ❤️ in the USA</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
