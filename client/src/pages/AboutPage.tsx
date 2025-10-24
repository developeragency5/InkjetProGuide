import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Headphones, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About InjetProGuide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner for HP inkjet printers, providing expert guidance 
            and support to help you make the right choice.
          </p>
        </div>

        <div className="mb-16">
          <Card>
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At InjetProGuide, we believe that buying a printer shouldn't be overwhelming. 
                With countless models and technical specifications to consider, we're here to 
                simplify your decision-making process.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide comprehensive guides, detailed product information, and expert support 
                to ensure you find the perfect HP inkjet printer for your needs - whether you're 
                setting up a home office, running a small business, or simply need reliable printing 
                for everyday tasks.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover-elevate transition-all">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Expert Knowledge</h3>
              <p className="text-sm text-muted-foreground">
                Years of experience helping customers choose the right printer
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-elevate transition-all">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Your satisfaction is our top priority, always
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-elevate transition-all">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                USA-based support team ready to help anytime
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-elevate transition-all">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Trusted Quality</h3>
              <p className="text-sm text-muted-foreground">
                Only authentic HP products with full warranty
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <p>
                  <strong className="text-foreground">Comprehensive Guides:</strong> Detailed setup instructions, 
                  maintenance tips, and troubleshooting help for every printer model
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <p>
                  <strong className="text-foreground">Authentic Products:</strong> We sell only genuine HP inkjet 
                  printers backed by manufacturer warranties
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <p>
                  <strong className="text-foreground">Fast Shipping:</strong> Free shipping on orders over $50 
                  with delivery across the USA in 2-3 business days
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <p>
                  <strong className="text-foreground">Expert Support:</strong> Our team of printer specialists 
                  is available 24/7 to answer your questions
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <p>
                  <strong className="text-foreground">Customer Satisfaction:</strong> 30-day money-back guarantee 
                  and hassle-free returns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
