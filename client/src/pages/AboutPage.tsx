import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Headphones, Shield, Package, Zap, Target, Heart, TrendingUp, CheckCircle, Truck, DollarSign, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";

export default function AboutPage() {
  const stats = [
    { value: "25+", label: "Printer Models" },
    { value: "2-3 Days", label: "Fast Delivery" },
    { value: "30 Days", label: "Easy Returns" },
    { value: "USA", label: "Nationwide Shipping" },
  ];

  const values = [
    {
      icon: Target,
      title: "Customer-Centric",
      description: "Every decision we make starts with you. We're committed to providing quality products and clear information to simplify your printer shopping experience."
    },
    {
      icon: Award,
      title: "Quality Selection",
      description: "We carefully curate our selection of inkjet printers to bring you reliable models known for quality and performance."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "No hidden fees, no surprises. We provide honest pricing, detailed product information, and clear guidance every step of the way."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We stay ahead of industry trends to bring you the latest inkjet technology and best-in-class printing solutions."
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Inkjet Focus",
      description: "InkjetProGuide provides informational buying guides and a curated online store featuring inkjet printers sourced through independent distribution channels."
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Fast 2-3 business day delivery across the USA."
    },
    {
      icon: DollarSign,
      title: "Best Price Guarantee",
      description: "Competitive pricing with exclusive deals and promotions on printers."
    },
    {
      icon: Package,
      title: "Order Inquiries",
      description: "Questions about orders, shipping, and returns? Contact us during office hours for order-related inquiries."
    },
    {
      icon: Package,
      title: "Easy Returns",
      description: "30-day returns with FREE prepaid return shipping label included."
    },
    {
      icon: Zap,
      title: "Setup Guides",
      description: "Access free setup guides and step-by-step instructions for all printer models on our website."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="about" fallbackTitle="About InkjetProGuide" />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" data-testid="heading-about-title">
              About InkjetProGuide
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-about-subtitle">
              InkjetProGuide is an independent online retailer serving customers in the United States.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/products#!/Inkjet-Printers/c/193859557">
                <Button size="lg" className="h-12 px-8 text-base" data-testid="button-shop-printers">
                  Shop Printers
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid={`stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Who We Are - Identity Section */}
        <div className="mb-20">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" data-testid="heading-who-we-are">Who We Are</h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p data-testid="text-identity-1">
                  InkjetProGuide is an independent online retailer serving customers in the United States.
                </p>
                <p data-testid="text-identity-2">
                  We operate independently and are not affiliated with, endorsed by, or sponsored by any printer manufacturer.
                </p>
                <p data-testid="text-identity-3">
                  In addition to offering printers for purchase, we publish free educational buying guides to help customers understand printer features, compare technologies, and make informed decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-testid="heading-our-values">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3" data-testid={`value-title-${index}`}>
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`value-description-${index}`}>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-testid="heading-what-we-offer">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" data-testid={`benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" data-testid="heading-why-choose-us">
                Why Choose InkjetProGuide?
              </h2>
              <div className="max-w-3xl mx-auto space-y-5">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-0">Comprehensive Product Guides</h4>
                    <p className="text-muted-foreground">
                      Detailed setup instructions, maintenance tips, product comparisons, and model comparisons 
                      for every inkjet printer we sell.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-1">Inkjet Focus</h4>
                    <p className="text-muted-foreground">
                      InkjetProGuide provides informational buying guides and a curated online store featuring inkjet printers sourced through independent distribution channels.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-2">Buying Guides</h4>
                    <p className="text-muted-foreground">
                      Our detailed guides cover print speeds, ink costs, wireless features, and more to 
                      make finding the perfect match easy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-3">Educational Resources</h4>
                    <p className="text-muted-foreground">
                      Access our Resource Center with ink guides, printer care guides, printing tips, 
                      and frequently asked questions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-4">Secure Shopping Experience</h4>
                    <p className="text-muted-foreground">
                      Shop with confidence using our secure checkout, multiple payment options including 
                      Stripe and Cash on Delivery, and encrypted data protection.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-5">Complete Satisfaction Guarantee</h4>
                    <p className="text-muted-foreground">
                      Easy returns within 30 days and comprehensive educational resources in our Resource Center.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commitment Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4" data-testid="heading-commitment-quality">
                  Commitment to Quality
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every inkjet printer we sell undergoes rigorous quality checks. We ensure that each 
                  product meets manufacturing standards and arrives at your doorstep in perfect condition.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We offer the latest models, exclusive features, and 
                  cutting-edge printing technology to keep you ahead of the curve.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4" data-testid="heading-commitment-service">
                  Commitment to Service
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We're committed to making your shopping experience smooth and hassle-free. Contact us for order questions, shipping inquiries, and return requests.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For printer setup and usage, explore our comprehensive Resource Center with detailed guides, tutorials, and FAQs designed for getting the most from your purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
                Ready to Find Your Perfect Printer?
              </h2>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                Explore our curated selection of inkjet printers, compare features, 
                read our guides, and make an informed decision with confidence.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/products#!/Inkjet-Printers/c/193859557">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base" data-testid="button-browse-printers">
                    Browse Printers
                  </Button>
                </a>
                <Link href="/guides">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-view-guides">
                    View Buying Guides
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
