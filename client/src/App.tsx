import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import WishlistPage from "@/pages/WishlistPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ComparisonPage from "@/pages/ComparisonPage";
import AuthPage from "@/pages/AuthPage";
import AccountPage from "@/pages/AccountPage";
import ProfilePage from "@/pages/ProfilePage";
import OrdersPage from "@/pages/OrdersPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import OrderLookupPage from "@/pages/OrderLookupPage";
import BuyingGuidesPage from "@/pages/BuyingGuidesPage";
import BeginnersGuidePage from "@/pages/guides/BeginnersGuidePage";
import GuidePage from "@/pages/GuidePage";
import ProductGuidePage from "@/pages/ProductGuidePage";
import HelpCenterPage from "@/pages/HelpCenterPage";
import HelpArticlePage from "@/pages/HelpArticlePage";
import ResourceCenterPage from "@/pages/ResourceCenterPage";
import InkGuidePage from "@/pages/InkGuidePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import FAQPage from "@/pages/FAQPage";
import RefundPolicyPage from "@/pages/RefundPolicyPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsConditionsPage from "@/pages/TermsConditionsPage";
import SitemapPage from "@/pages/SitemapPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminProductsPage from "@/pages/AdminProductsPage";
import AdminOrdersPage from "@/pages/AdminOrdersPage";
import AdminCustomersPage from "@/pages/AdminCustomersPage";
import AdminAnalyticsPage from "@/pages/AdminAnalyticsPage";
import AdminSEOPage from "@/pages/AdminSEOPage";
import NotFound from "@/pages/not-found";

// Admin router (no layout)
function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/products" component={AdminProductsPage} />
      <Route path="/admin/orders" component={AdminOrdersPage} />
      <Route path="/admin/customers" component={AdminCustomersPage} />
      <Route path="/admin/analytics" component={AdminAnalyticsPage} />
      <Route path="/admin/seo" component={AdminSEOPage} />
    </Switch>
  );
}

// Main router (with layout)
function MainRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/wishlist" component={WishlistPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/compare" component={ComparisonPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/order/:id" component={OrderDetailPage} />
        <Route path="/order-lookup" component={OrderLookupPage} />
        <Route path="/guide" component={GuidePage} />
        <Route path="/guide/:id" component={ProductGuidePage} />
        <Route path="/guides" component={BuyingGuidesPage} />
        <Route path="/guides/beginners-guide" component={BeginnersGuidePage} />
        <Route path="/guides/home-office" component={BeginnersGuidePage} />
        <Route path="/guides/students" component={BeginnersGuidePage} />
        <Route path="/guides/photo-printing" component={BeginnersGuidePage} />
        <Route path="/guides/ink-cost" component={BeginnersGuidePage} />
        <Route path="/guides/small-business" component={BeginnersGuidePage} />
        <Route path="/guides/wireless-vs-usb" component={BeginnersGuidePage} />
        <Route path="/resources" component={ResourceCenterPage} />
        <Route path="/ink-guide" component={InkGuidePage} />
        <Route path="/help" component={HelpCenterPage} />
        <Route path="/help/:slug" component={HelpArticlePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-conditions" component={TermsConditionsPage} />
        <Route path="/sitemap" component={SitemapPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  const pathname = window.location.pathname;
  const isAdmin = pathname.startsWith('/admin');
  
  return isAdmin ? <AdminRouter /> : <MainRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ComparisonProvider>
          <Toaster />
          <Router />
        </ComparisonProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
