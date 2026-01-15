import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { CheckCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getGuideContent } from "@/data/guidesContent";

export default function BeginnersGuidePage() {
  const params = useParams<{ guideId: string }>();
  
  // Extract guide ID from route params
  const guideId = params.guideId || 'beginners-guide';
  const guideData = getGuideContent(guideId);

  // Redirect to guides page if guide not found
  useEffect(() => {
    if (!guideData) {
      window.location.href = '/guides';
    }
  }, [guideData]);

  if (!guideData) {
    return null;
  }

  const Icon = guideData.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Back to Guides Bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/guides">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-guides">
              <ArrowLeft className="w-4 h-4" />
              Back to All Guides
            </Button>
          </Link>
          <Badge variant="secondary">{guideData.readTime}</Badge>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-home">Home</span>
            </Link>
            {" / "}
            <Link href="/guides">
              <span className="hover:text-foreground cursor-pointer" data-testid="link-breadcrumb-guides">Buying Guides</span>
            </Link>
            {" / "}
            <span className="text-foreground">{guideData.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${guideData.color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-guide-title">
            {guideData.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {guideData.description}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
            {/* Dynamic Sections */}
            {guideData.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {section.content}
                </p>
              </section>
            ))}

            <Separator />

            {/* Key Points */}
            <section id="key-points">
              <h2 className="text-3xl font-bold mb-6">Key Points</h2>
              <div className="space-y-3">
                {guideData.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Printer?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Browse our selection of inkjet printers and use our buying guides to make an informed decision.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild data-testid="button-browse-printers">
                    <Link href="/products">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Browse All Printers
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild data-testid="button-view-guides">
                    <Link href="/guides">View All Guides</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
