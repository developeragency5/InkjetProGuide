import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Headphones, Shield, Package, Zap, Target, Heart, TrendingUp, CheckCircle, Truck, DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  const stats = [
    { value: "5,000+", label: "Happy Customers" },
    { value: "25+", label: "HP Printer Models" },
    { value: "96%", label: "Customer Satisfaction" },
    { value: "2-3 Days", label: "Fast Delivery" },
  ];

  const values = [
    {
      icon: Target,
      title: "Customer-Centric",
      description: "Every decision we make starts with you. We're committed to providing personalized service and solutions tailored to your unique printing needs."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "We partner exclusively with HP to ensure every printer meets the highest standards of quality, reliability, and performance."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "No hidden fees, no surprises. We provide honest pricing, detailed product information, and clear guidance every step of the way."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We stay ahead of industry trends to bring you the latest HP inkjet technology and best-in-class printing solutions."
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Authentic HP Products",
      description: "100% genuine HP inkjet printers with full manufacturer warranties and support."
    },
    {
      icon: Truck,
      title: "Fast & Free Shipping",
      description: "Free shipping on orders over $299 with 2-3 business day delivery across the USA."
    },
    {
      icon: DollarSign,
      title: "Best Price Guarantee",
      description: "Competitive pricing with exclusive deals and promotions on HP printers."
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "USA-based support team available during office hours to help with setup, troubleshooting, and maintenance."
    },
    {
      icon: Package,
      title: "Easy Returns",
      description: "30-day money-back guarantee with hassle-free returns and exchanges."
    },
    {
      icon: Zap,
      title: "Setup Assistance",
      description: "Free setup guides and step-by-step instructions for all HP printer models."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" data-testid="heading-about-title">
              About InkjetProGuide
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-about-subtitle">
              Your trusted partner for HP inkjet printers in the USA. We simplify printer shopping 
              with expert guidance, authentic products, and exceptional customer service.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="h-12 px-8 text-base" data-testid="button-shop-printers">
                  Shop Printers
                </Button>
              </Link>
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
        {/* Our Story */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" data-testid="heading-our-story">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p data-testid="text-story-1">
                InkjetProGuide was founded with a simple mission: to make printer shopping easy, transparent, 
                and stress-free for American consumers and businesses. We recognized that choosing the right 
                printer can be overwhelming with so many models, specifications, and technical jargon to navigate.
              </p>
              <p data-testid="text-story-2">
                As an authorized HP dealer, we specialize exclusively in HP inkjet printers because we believe 
                in their quality, innovation, and reliability. Our team of printing experts has helped thousands 
                of customers find the perfect printer for their homes, offices, and businesses across the United States.
              </p>
              <p data-testid="text-story-3">
                Today, we're proud to be one of the leading online destinations for HP inkjet printers, offering 
                not just products, but comprehensive guides, educational resources, and ongoing support to ensure 
                you get the most value from your purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-20">
          <Card>
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" data-testid="heading-our-mission">Our Mission</h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p data-testid="text-mission-1">
                  At InkjetProGuide, our mission is to empower customers with knowledge and provide access to 
                  high-quality HP inkjet printers that meet their specific needs. We believe that an informed 
                  customer is a satisfied customer.
                </p>
                <p data-testid="text-mission-2">
                  We're committed to transparency in pricing, honest product recommendations, and delivering 
                  exceptional customer service at every touchpoint. Whether you're a student printing assignments, 
                  a photographer creating stunning prints, or a business owner managing high-volume printing, 
                  we're here to guide you to the right solution.
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
                      Detailed setup instructions, maintenance tips, troubleshooting help, and model comparisons 
                      for every HP inkjet printer we sell.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-1">Only Authorized HP Products</h4>
                    <p className="text-muted-foreground">
                      We sell exclusively genuine HP inkjet printers backed by full manufacturer warranties 
                      and official HP support.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-2">Buying Assistance</h4>
                    <p className="text-muted-foreground">
                      Our team helps you navigate print speeds, ink costs, wireless features, and more to 
                      find the perfect match for your needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1" data-testid="reason-title-3">Educational Resources</h4>
                    <p className="text-muted-foreground">
                      Access our Resource Center with ink guides, maintenance tutorials, printing tips, 
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
                      30-day money-back guarantee, easy returns, and lifetime support for all your printing needs.
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
                  Every HP inkjet printer we sell undergoes rigorous quality checks. We ensure that each 
                  product meets HP's manufacturing standards and arrives at your doorstep in perfect condition.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our partnership with HP allows us to offer the latest models, exclusive features, and 
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
                  Our USA-based customer service team is trained extensively on HP products and dedicated 
                  to providing fast, friendly, and knowledgeable support whenever you need it.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From pre-purchase questions to post-sale support, troubleshooting, and maintenance advice, 
                  we're here to ensure your printing experience is smooth and successful.
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
                Explore our curated selection of HP inkjet printers, compare features, 
                read our guides, and make an informed decision with confidence.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/products">
                  <Button size="lg" variant="secondary" className="h-12 px-8 text-base" data-testid="button-browse-printers">
                    Browse Printers
                  </Button>
                </Link>
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
