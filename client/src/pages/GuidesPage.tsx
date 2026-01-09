import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Wrench, Settings, HelpCircle, CheckCircle, ArrowRight, Printer, Users, Lightbulb, Clock } from "lucide-react";
import { Link } from "wouter";

export default function GuidesPage() {
  const guides = [
    {
      icon: BookOpen,
      title: "Setup & Installation",
      description: "Step-by-step guides for unboxing, setting up, and installing your inkjet printer",
      topics: ["Unboxing your printer", "Installing ink cartridges", "Loading paper", "Connecting to Wi-Fi", "Installing drivers"],
      link: "/help?category=setup"
    },
    {
      icon: Settings,
      title: "Configuration & Settings",
      description: "Learn how to configure your printer settings for optimal performance",
      topics: ["Print quality settings", "Paper type selection", "Color calibration", "Network configuration", "Mobile printing setup"],
      link: "/help?category=settings"
    },
    {
      icon: Wrench,
      title: "Maintenance & Care",
      description: "Keep your printer running smoothly with regular maintenance",
      topics: ["Cleaning printheads", "Replacing ink cartridges", "Preventing paper jams", "Firmware updates", "Storage tips"],
      link: "/help?category=maintenance"
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Solutions to common printer problems and error messages",
      topics: ["Fixing print quality issues", "Resolving connection problems", "Clearing paper jams", "Error message guide", "Performance optimization"],
      link: "/help?category=troubleshooting"
    },
  ];

  const popularGuides = [
    {
      title: "How to Set Up Your Printer for the First Time",
      description: "Complete walkthrough from unboxing to your first print",
      readTime: "10 min"
    },
    {
      title: "Connecting Your Printer to WiFi",
      description: "Step-by-step wireless network setup instructions",
      readTime: "5 min"
    },
    {
      title: "Replacing Ink Cartridges the Right Way",
      description: "Avoid common mistakes when changing cartridges",
      readTime: "4 min"
    },
    {
      title: "Fixing Blurry or Streaky Prints",
      description: "Troubleshoot print quality issues quickly",
      readTime: "6 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Resource Library
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-guides-title">
              Inkjet Printer Guides
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive guides and tutorials to help you get the most out of your inkjet printer. 
              From initial setup to advanced troubleshooting, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/buying-guides">
                <Button size="lg" data-testid="button-buying-guides">
                  Buying Guides
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/help">
                <Button size="lg" variant="outline" data-testid="button-help-center">
                  Help Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Use Our Printer Guides?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                At InkjetProGuide, we understand that getting the most out of your inkjet printer requires more 
                than just plugging it in. Whether you're a first-time printer owner or an experienced user looking 
                to optimize your workflow, our comprehensive guide library provides everything you need to succeed.
              </p>
              <p>
                Our guides are written by printing professionals with years of hands-on experience with our products. 
                We break down complex technical processes into simple, easy-to-follow steps that anyone can understand. 
                From the moment you unbox your new printer to troubleshooting issues years down the road, our resources 
                are designed to save you time, reduce frustration, and help you achieve professional-quality results.
              </p>
              <p>
                Each guide includes detailed instructions, helpful tips, and common pitfalls to avoid. We regularly 
                update our content to reflect the latest printer models, software updates, and industry best practices. 
                Whether you need to connect your printer to WiFi, replace ink cartridges, fix print quality issues, 
                or configure advanced settings, you'll find clear answers in our guide collection.
              </p>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Printer className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Model-Specific</h3>
                <p className="text-sm text-muted-foreground">Tailored instructions for your exact printer model</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Step-by-Step</h3>
                <p className="text-sm text-muted-foreground">Clear, numbered instructions that are easy to follow</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Expert Written</h3>
                <p className="text-sm text-muted-foreground">Created by professionals with years of printing experience</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2">Pro Tips</h3>
                <p className="text-sm text-muted-foreground">Insider knowledge to maximize your printer's potential</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guide Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <Card key={guide.title} className="hover-elevate transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {guide.topics.map((topic) => (
                      <li key={topic} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={guide.link}>
                    <Button variant="outline" className="w-full" data-testid={`button-view-${guide.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      View Guides
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Most Popular Guides</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularGuides.map((guide, index) => (
              <Link key={index} href="/help">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div className="mb-16 bg-muted/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-lg mb-3">Setup & Configuration</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>How to properly unbox and assemble your printer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Installing ink cartridges without damaging printhead</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Connecting to WiFi networks and mobile devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Installing drivers on Windows, Mac, and Chromebook</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Maintenance & Troubleshooting</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Cleaning printheads to maintain print quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Clearing paper jams safely without causing damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Fixing common error messages and connectivity issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Optimizing settings for best print quality and speed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for in our guides? Our team of printer specialists is available 
                Monday through Friday to answer your questions and provide personalized assistance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-contact-us">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button size="lg" variant="outline" data-testid="button-view-faq">
                    View FAQ
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
