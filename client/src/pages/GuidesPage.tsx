import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Wrench, Settings, HelpCircle } from "lucide-react";
import { Link } from "wouter";

export default function GuidesPage() {
  const guides = [
    {
      icon: BookOpen,
      title: "Setup & Installation",
      description: "Step-by-step guides for unboxing, setting up, and installing your HP inkjet printer",
      topics: ["Unboxing your printer", "Installing ink cartridges", "Loading paper", "Connecting to Wi-Fi", "Installing drivers"]
    },
    {
      icon: Settings,
      title: "Configuration & Settings",
      description: "Learn how to configure your printer settings for optimal performance",
      topics: ["Print quality settings", "Paper type selection", "Color calibration", "Network configuration", "Mobile printing setup"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Care",
      description: "Keep your printer running smoothly with regular maintenance",
      topics: ["Cleaning printheads", "Replacing ink cartridges", "Preventing paper jams", "Firmware updates", "Storage tips"]
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Solutions to common printer problems and error messages",
      topics: ["Fixing print quality issues", "Resolving connection problems", "Clearing paper jams", "Error message guide", "Performance optimization"]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">HP Inkjet Printer Guides</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guides and tutorials to help you get the most out of your HP inkjet printer
          </p>
        </div>

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
                <ul className="space-y-2">
                  {guide.topics.map((topic) => (
                    <li key={topic} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <Link href="/contact">
                <span className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover-elevate cursor-pointer" data-testid="button-contact-us">
                  Contact Us
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
