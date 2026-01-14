import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "wouter";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-warranty">
                Warranty
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-last-updated">
              Last Updated: January 14, 2026
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
              <p data-testid="text-warranty-1">
                All products sold by InkjetProGuide are covered by the manufacturer's warranty where applicable.
              </p>
              <p data-testid="text-warranty-2">
                InkjetProGuide does not provide manufacturer warranty service, repairs, or technical support.
              </p>
              <p data-testid="text-warranty-3">
                Warranty coverage, duration, and eligibility are determined by the manufacturer and may vary by product, region, or registration status.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-muted-foreground mb-4" data-testid="text-related-policies">
            Related Policies:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild data-testid="link-refund-policy">
              <Link href="/refund-policy">Refund Policy</Link>
            </Button>
            <Button variant="outline" asChild data-testid="link-purchase-policy">
              <Link href="/purchase-policy">Purchase Policy</Link>
            </Button>
            <Button variant="outline" asChild data-testid="link-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
