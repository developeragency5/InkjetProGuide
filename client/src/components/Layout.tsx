import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import logoImage from "@assets/Gemini_Generated_Image_ngig6ingig6ingig_1768592289709.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { MARKETING_COPY, SHIPPING, BUSINESS_INFO } from "@/lib/constants";
import { initEcwidScript } from "@/components/EcwidStore";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const { toast } = useToast();
  const cartListenerAdded = useRef(false);

  // Initialize Ecwid script on mount and track cart changes
  useEffect(() => {
    initEcwidScript();
    
    let checkInterval: NodeJS.Timeout | null = null;
    let cleanupTimeout: NodeJS.Timeout | null = null;
    
    // Cart change handler
    const handleCartChange = (cart: any) => {
      if (cart && typeof cart.productsQuantity === 'number') {
        setCartItemCount(cart.productsQuantity);
      }
    };
    
    // Set up cart change listener for dynamic cart badge
    const setupCartListener = () => {
      if (cartListenerAdded.current) return;
      
      if (window.Ecwid && window.Ecwid.OnCartChanged) {
        cartListenerAdded.current = true;
        window.Ecwid.OnCartChanged.add(handleCartChange);
        
        // Get initial cart state
        if (window.Ecwid.Cart && typeof window.Ecwid.Cart.get === 'function') {
          window.Ecwid.Cart.get(handleCartChange);
        }
      }
    };
    
    // Wait for Ecwid API to be ready
    if (window.Ecwid && window.Ecwid.OnAPILoaded) {
      window.Ecwid.OnAPILoaded.add(setupCartListener);
    } else {
      // Poll for Ecwid to be available
      checkInterval = setInterval(() => {
        if (window.Ecwid && window.Ecwid.OnAPILoaded) {
          window.Ecwid.OnAPILoaded.add(setupCartListener);
          if (checkInterval) clearInterval(checkInterval);
        }
      }, 500);
      
      // Clean up interval after 10 seconds
      cleanupTimeout = setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval);
      }, 10000);
    }
    
    // Cleanup function
    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
    };
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigationLinks = [
    { name: "Home", path: "/", exact: true },
    { name: "Inkjet Printers", path: "/products#!/Inkjet-Printers/c/193859557", exact: false },
    { name: "Home Printers", path: "/products#!/Home-Printers/c/193853315", exact: false },
    { name: "Office Printers", path: "/products#!/Office-Printers/c/193855066", exact: false },
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
      {/* Main Header - Sticky */}
      <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/">
              <span className="flex items-center cursor-pointer" data-testid="link-home">
                <img 
                  src={logoImage} 
                  alt="InkjetProGuide - Printers and Guides" 
                  className="h-10 md:h-12 w-auto"
                />
              </span>
            </Link>

            {/* Ecwid Search Widget */}
            <div className="hidden lg:flex flex-1 max-w-xl justify-center">
              <div className="ec-search" data-testid="ecwid-search"></div>
            </div>

            {/* Ecwid Login & Cart */}
            <div className="flex items-center gap-6">
              <a 
                href="/products#!/~/signin" 
                className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer"
                data-testid="ecwid-signin"
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Sign In</span>
              </a>
              <a 
                href="/products#!/~/cart" 
                className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer relative"
                data-testid="ecwid-cart-header"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span 
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                      data-testid="cart-badge-count"
                    >
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Cart</span>
              </a>
              
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
                        if (link.path.includes('?') || link.path.includes('#')) {
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
                    if (link.path.includes('?') || link.path.includes('#')) {
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


      {/* Footer */}
      <footer className="bg-gradient-to-b from-card to-muted/20 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info - Larger Column */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <img 
                  src={logoImage} 
                  alt="InkjetProGuide - Printers and Guides" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                InkjetProGuide is an independent online retailer serving customers in the United States. We provide informational buying guides and sell printers sourced through independent distribution channels. We are not affiliated with, endorsed by, or sponsored by any printer manufacturer.
              </p>
              <div className="space-y-2 text-sm">
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
                
              </ul>
            </div>

            {/* Guide */}
            <div>
              <h3 className="font-semibold text-base mb-4 text-foreground">Guide</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/guides">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-guides">
                      Printer Buying Guides
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
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-primary hover-elevate px-2 py-1 -ml-2 rounded-md cursor-pointer block transition-colors" data-testid="link-footer-contact">
                      Contact Us
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
                Get exclusive deals, helpful printing tips, and the latest printer releases delivered to your inbox.
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

          {/* Disclaimer Notice */}
          <div className="border-t border-b py-6 mb-8 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto" data-testid="text-footer-trademark-disclaimer">
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
              © {BUSINESS_INFO.year} {BUSINESS_INFO.name}. All rights reserved.
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
