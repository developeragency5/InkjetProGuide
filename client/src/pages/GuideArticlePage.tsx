import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";
import { SEOHead } from "@/components/SEOHead";

interface GuideSection {
  title: string;
  content: string[];
  list?: string[];
}

interface GuideData {
  number: number;
  category: string;
  title: string;
  subtitle: string;
  readTime: string;
  sections: GuideSection[];
}

const guidesData: Record<number, GuideData> = {
  1: {
    number: 1,
    category: "Buying Guide",
    title: "How to Choose the Right Inkjet Printer",
    subtitle: "A complete, practical, and in-depth guide to choosing the best home printer, office printer, or wireless printer based on real-world printing needs.",
    readTime: "8 min read",
    sections: [
      {
        title: "Introduction",
        content: [
          "An inkjet printer is a common device found in homes, schools, and workplaces. However, many people misunderstand how it works. Many people buy a printer quickly, often based on price or appearance, only to face frustration later. Ink runs out faster than expected, printing feels slow, or the printer struggles to handle daily use.",
          "The root problem is rarely the technology itself. Instead, it comes from choosing a printer that does not match real usage.",
          "A home printer for occasional documents needs different features than an office printer used every day. Add modern features like duplex printing, mobile printing, wireless access, and built-in security. This can make the decision feel overwhelming.",
          "This guide exists to remove that confusion. It focuses on practical factors such as printing habits, pages per month, ink systems, long-term costs, and usability. By the end, you will know what to look for. You will also learn how to choose a wireless printer that meets your needs now and works well in the future."
        ]
      },
      {
        title: "Understanding Your Printing Behavior",
        content: [
          "Before comparing models, take time to understand how you actually print.",
          "Ask yourself:"
        ],
        list: [
          "Do you mostly print black and white documents, or do you regularly need color?",
          "Do you frequently use scanning copying functions?",
          "How many people will use the printer?",
          "Do you print from a mobile device, such as a smartphone or tablet?",
          "Do you handle personal, financial, or business files that require security features?"
        ]
      },
      {
        title: "Home Printer vs Office Printer: A Practical Comparison",
        content: [
          "Understanding the difference between a home printer and an office printer prevents costly mistakes.",
          "Home Printer Characteristics: Manufacturers design a home printer for light, occasional use. Common traits include compact size, quiet operation, lower purchase price, and smaller paper capacity. Home printers work well for homework, forms, personal documents, and occasional photos. The design does not support continuous use or shared workloads.",
          "Office Printer Characteristics: Manufacturers design office printers for consistency and durability. Typical features include faster pages per minute, larger paper tray capacity, better performance under high stress, and support for higher pages per month. If you work from home but print daily, an office-class inkjet printer may be a better choice than a basic home model."
        ]
      },
      {
        title: "Pages Per Month: The Foundation of Your Choice",
        content: [
          "Your estimated pages per month is the most important metric when choosing a printer.",
          "Light Printing (Up to 100 Pages Per Month): Best for students, occasional home use, and households printing bills or schoolwork. Simple inkjet printers with standard ink cartridges work well here.",
          "Moderate Printing (100–500 Pages Per Month): Common for home offices, remote workers, and families sharing one printer. Printers in this range should deliver stable print quality, reliable wireless access, and moderate speed.",
          "High Volume Printing (500+ Pages Per Month): Typical for a small business, shared workspaces, and a busy office. Printers built for high volume and high print workloads handle stress better, last longer, and reduce downtime."
        ]
      },
      {
        title: "Understanding Print Speed in Real Life",
        content: [
          "Print speed is usually measured in pages per minute, but real-world performance often differs.",
          "Print speed depends on color vs black-and-white printing, print mode (draft, normal, high quality), file type and complexity, and wireless signal stability.",
          "Draft mode prints faster but reduces print quality. High-quality mode produces high quality prints but slows output. Normal mode usually provides the best balance.",
          "In a busy office, faster pages per minute reduce waiting and improve workflow. At home, speed matters less unless several users print frequently."
        ]
      },
      {
        title: "Print Quality: What Truly Matters",
        content: [
          "Print quality is influenced by several factors beyond resolution numbers.",
          "Key contributors include ink formulation and flow, paper type and thickness, printer alignment and calibration, and selected print settings.",
          "For everyday text, standard quality is enough. For presentations, photos, and marketing material, higher quality settings produce more professional results. Always balance quality with ink usage."
        ]
      },
      {
        title: "Black and White Documents vs Color Printing",
        content: [
          "Many users assume color printing is optional, but it often becomes necessary.",
          "Black and white documents are ideal for contracts, reports, invoices, and study notes.",
          "Color printing is useful for charts and graphs, visual presentations, photos, and marketing materials.",
          "If color printing is rare, standard ink systems are fine. If color printing is frequent, especially in business environments, efficient ink systems help reduce costs."
        ]
      },
      {
        title: "Paper Handling and Tray Capacity",
        content: [
          "Paper handling affects daily convenience more than most people expect.",
          "Consider how often you refill the paper tray, whether you print envelopes or thicker paper, and whether you use automatic duplex printing.",
          "A larger paper tray reduces interruptions. Duplex printing saves paper and time. These features become more important as printing volume increases."
        ]
      },
      {
        title: "Duplex Printing: A Simple Feature With Significant Advantages",
        content: [
          "Duplex printing allows printing on both sides of a page automatically.",
          "Benefits include lower paper costs, reduced storage needs, and faster document handling.",
          "For offices and high-use environments, duplex printing is essential."
        ]
      },
      {
        title: "Ink Systems Explained Clearly",
        content: [
          "Inkjet printers use liquid ink, not toner cartridges. Laser printers use toner cartridges.",
          "Ink Cartridges: Lower printer price, higher cost per page, best for light or occasional use.",
          "Ink Tank Printers: Higher upfront cost, extremely low cost per page, ideal for high volume printing.",
          "For users printing hundreds of pages monthly, ink tank printers often pay for themselves within the first year."
        ]
      },
      {
        title: "Ink Management and Cost Control",
        content: [
          "Ink costs often astonish new printer owners.",
          "To reduce ink expenses: use draft mode for internal documents, enable duplex printing, avoid unnecessary test prints, and monitor ink levels regularly.",
          "Smart ink management saves money and reduces frustration."
        ]
      },
      {
        title: "Wireless Printing and Modern Workflows",
        content: [
          "A wireless printer allows printing without cables and supports flexible placement.",
          "Wireless printing is useful when multiple users share one printer, you print from different rooms, and you rely on a mobile device.",
          "A good wireless printer supports printing from a smartphone or tablet through simple apps without complicated setup steps."
        ]
      },
      {
        title: "Setup Process: Why It Matters More Than You Think",
        content: [
          "A smooth setup process prevents many future problems.",
          "An easy setup usually includes clear instructions, app-guided installation, automatic network detection, and simple ink installation.",
          "Poor setup often leads to long-term connection issues, even if the printer hardware is capable."
        ]
      },
      {
        title: "Mobile Printing in Everyday Use",
        content: [
          "Printing from a mobile device has become common.",
          "Mobile printing helps when you receive documents by email, you scan and print instantly, and you work without a laptop.",
          "Support for smartphones and tablets adds flexibility and convenience."
        ]
      },
      {
        title: "Security Features You Should Not Ignore",
        content: [
          "Printer security matters, especially in shared or professional environments.",
          "Important security features include secure wireless access, user permissions, and controlled printer access.",
          "In a busy office, these features prevent unauthorized access to sensitive documents."
        ]
      },
      {
        title: "Shared Printer Environments",
        content: [
          "When multiple people share a printer, performance requirements increase.",
          "Shared printers should offer stable wireless connections, faster pages per minute, larger paper capacity, and clear error notifications.",
          "Slow printers disrupt productivity in shared spaces."
        ]
      },
      {
        title: "Maintenance and Long-Term Reliability",
        content: [
          "Inkjet printers last longer when used correctly.",
          "Good maintenance habits include printing at least once a week, keeping the printer clean, using recommended paper, and replacing ink before it runs completely dry.",
          "Idle printers often suffer ink drying issues."
        ]
      },
      {
        title: "Environmental and Energy Considerations",
        content: [
          "Modern printers are more energy-efficient than older models.",
          "Reduce impact by using duplex printing, turning off the printer when idle, and avoiding unnecessary prints.",
          "Small savings add over time."
        ]
      },
      {
        title: "Common Buying Mistakes to Avoid",
        content: [
          "Most printer regrets come from underestimating pages per month, ignoring ink costs, buying based only on price, and choosing features that never get used.",
          "Avoiding these mistakes leads to better long-term satisfaction."
        ]
      },
      {
        title: "How to Know You Made the Right Choice",
        content: [
          "You likely chose the right printer if printing feels effortless, ink lasts as expected, speed matches your workload, and troubleshooting is rare.",
          "A good printer blends into your workflow rather than disrupting it."
        ]
      },
      {
        title: "Long-Term Ownership: Thinking Beyond the First Year",
        content: [
          "A printer is not a short-term purchase.",
          "Consider availability of ink supplies, ease of maintenance, and ongoing costs over several years.",
          "Thinking long-term leads to better value and fewer surprises."
        ]
      },
      {
        title: "Conclusion",
        content: [
          "Choosing the right inkjet printer is not about buying the most expensive model or the one with the longest feature list. Understanding how you print, how often you print, and what matters most to your daily workflow is essential.",
          "You may need a small home printer, a reliable office printer, or a flexible wireless printer. The right choice gives you good print quality, affordable costs, and steady performance over time.",
          "When chosen wisely, a printer becomes a tool you trust — not a device you constantly troubleshoot."
        ]
      }
    ]
  }
};

export default function GuideArticlePage() {
  const params = useParams();
  const guideId = parseInt(params.id || "1");
  const guide = guidesData[guideId];

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
            <p className="text-muted-foreground mb-6">The guide you're looking for doesn't exist or hasn't been published yet.</p>
            <Link href="/guides">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Guides
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="guides" fallbackTitle={`${guide.title} | InkjetProGuide`} />
      
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-foreground">Buying Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Guide #{guide.number}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Badge className="mb-4" data-testid="badge-category">
            {guide.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-guide-title">
            {guide.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {guide.subtitle}
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Guide #{guide.number}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{guide.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {guide.sections.map((section, index) => (
            <section key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid={`section-${index}`}>
                {section.title}
              </h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-2 ml-6 list-disc text-muted-foreground mb-4">
                  {section.list.map((item, lIndex) => (
                    <li key={lIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 border-t pt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Printer?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Browse our curated selection of inkjet printers and use this guide to make an informed decision.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/products#!/Inkjet-Printers/c/193859557">
                  <Button size="lg" data-testid="button-shop-printers">
                    Shop Printers
                  </Button>
                </a>
                <Link href="/guides">
                  <Button size="lg" variant="outline" data-testid="button-more-guides">
                    More Guides
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}
