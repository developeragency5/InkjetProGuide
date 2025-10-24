import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import WishlistPage from "@/pages/WishlistPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AuthPage from "@/pages/AuthPage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/wishlist" component={WishlistPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/account" component={AccountPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
