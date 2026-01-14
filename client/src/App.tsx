import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import OrderLookupPage from "@/pages/OrderLookupPage";
import BuyingGuidesPage from "@/pages/BuyingGuidesPage";
import BeginnersGuidePage from "@/pages/guides/BeginnersGuidePage";
import GuideArticlePage from "@/pages/GuideArticlePage";
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
import ShippingPolicyPage from "@/pages/ShippingPolicyPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsConditionsPage from "@/pages/TermsConditionsPage";
import DisclaimerPage from "@/pages/DisclaimerPage";
import PurchasePolicyPage from "@/pages/PurchasePolicyPage";
import WarrantyPage from "@/pages/WarrantyPage";
import AccessibilityPage from "@/pages/AccessibilityPage";
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
        <Route path="/products" component={ShopPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/order-lookup" component={OrderLookupPage} />
        <Route path="/guide" component={GuidePage} />
        <Route path="/guide/:id" component={ProductGuidePage} />
        <Route path="/guides" component={BuyingGuidesPage} />
        <Route path="/guides/:guideId" component={BeginnersGuidePage} />
        <Route path="/buying-guide/:id" component={GuideArticlePage} />
        <Route path="/resources" component={ResourceCenterPage} />
        <Route path="/ink-guide" component={InkGuidePage} />
        <Route path="/help" component={HelpCenterPage} />
        <Route path="/help/:slug" component={HelpArticlePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/shipping-policy" component={ShippingPolicyPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-conditions" component={TermsConditionsPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/purchase-policy" component={PurchasePolicyPage} />
        <Route path="/warranty" component={WarrantyPage} />
        <Route path="/accessibility" component={AccessibilityPage} />
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
