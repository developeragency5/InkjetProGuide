import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" data-testid="button-home">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline" data-testid="button-products">
              <Search className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
