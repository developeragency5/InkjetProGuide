import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Printer, Package, CreditCard, Truck, Shield } from "lucide-react";

export default function FAQPage() {
  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      faqs: [
        {
          question: "What is InjetProGuide?",
          answer: "InjetProGuide is your comprehensive resource for HP inkjet printers. We provide expert guidance, detailed setup instructions, maintenance tips, and a curated selection of HP inkjet printers to help you find the perfect solution for your printing needs."
        },
        {
          question: "Do you sell refurbished printers?",
          answer: "No, we only sell brand new HP inkjet printers with full manufacturer warranties. All our products come directly from authorized distributors to ensure you receive genuine, original equipment with complete warranty coverage."
        },
        {
          question: "Can I get help choosing the right printer?",
          answer: "Absolutely! Our expert team is available 24/7 to help you select the perfect printer. You can contact us via phone at (855) 247-4683, email at support@injetproguide.com, or use our live chat feature. We'll ask about your printing needs, budget, and workspace to recommend the best options."
        }
      ]
    },
    {
      title: "Products & Printers",
      icon: Printer,
      faqs: [
        {
          question: "What's the difference between OfficeJet, DeskJet, and ENVY printers?",
          answer: "OfficeJet printers are designed for small businesses and home offices, offering all-in-one functionality with scanning, copying, and faxing. DeskJet printers are ideal for basic home printing needs with affordable ink and simple operation. ENVY printers focus on photo printing quality and compact design, perfect for creative users and photo enthusiasts."
        },
        {
          question: "How do I know which printer is right for my needs?",
          answer: "Consider these factors: 1) Volume - How many pages do you print monthly? 2) Features - Do you need scanning/copying? 3) Print quality - Basic documents or photo printing? 4) Connectivity - WiFi, USB, or mobile printing? 5) Space - Desktop space available. Our product pages include detailed specifications and our team can provide personalized recommendations."
        },
        {
          question: "Do your printers support wireless printing?",
          answer: "Yes! Most of our HP inkjet printers support WiFi connectivity and HP Smart app for wireless printing from smartphones, tablets, and computers. Many models also support AirPrint (Apple), Mopria (Android), and WiFi Direct for guest printing without network access."
        },
        {
          question: "What is the print speed of HP inkjet printers?",
          answer: "Print speeds vary by model. Entry-level DeskJet printers typically print 7-10 pages per minute (ppm) for black and white, while OfficeJet and ENVY models range from 10-20+ ppm. Color printing is generally slightly slower. Check individual product specifications for exact speeds."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: Truck,
      faqs: [
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over $299. Orders under $299 have a $9.99 shipping fee. We also offer Express (2-3 business days) for $19.99 and Overnight delivery for $39.99."
        },
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days. Express shipping arrives in 2-3 business days, and Overnight delivery arrives the next business day. Orders placed before 2 PM EST ship the same day. You'll receive tracking information via email once your order ships."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within the United States and its territories. We're working on expanding international shipping options and will update our customers when this becomes available."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history in the 'My Orders' section."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      icon: CreditCard,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and Cash on Delivery. We also offer 0% financing for qualified business customers on orders over $500."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption and are PCI DSS compliant. All payment processing is handled through Stripe, a trusted payment provider. We never store your complete credit card information on our servers."
        },
        {
          question: "Do you offer price matching?",
          answer: "Yes! If you find a lower price on an identical new HP inkjet printer from an authorized dealer, we'll match it. Contact our customer service team with proof of the lower price within 7 days of your purchase."
        },
        {
          question: "What is your 0% financing program?",
          answer: "Qualified business customers can apply for 0% financing on orders over $500. This allows you to spread payments over 6, 12, or 24 months with no interest. Apply during checkout or contact our sales team for more information."
        }
      ]
    },
    {
      title: "Returns & Warranty",
      icon: Package,
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day money-back guarantee on all printers. If you're not completely satisfied, you can return your printer within 30 days of delivery for a full refund. The printer must be in original condition with all accessories and packaging. Return shipping is free for defective items; customer pays return shipping for buyer's remorse."
        },
        {
          question: "How do I return a product?",
          answer: "Contact our customer service team at support@injetproguide.com or call (855) 247-4683 to initiate a return. We'll provide you with a Return Authorization (RA) number and return shipping instructions. Pack the printer securely in its original packaging and ship it back within 14 days of receiving your RA number."
        },
        {
          question: "What warranty comes with HP printers?",
          answer: "All HP inkjet printers come with the manufacturer's limited warranty (typically 1 year). This covers defects in materials and workmanship. We also offer extended warranty options at checkout for additional protection. Keep your receipt as proof of purchase for warranty claims."
        },
        {
          question: "What if my printer arrives damaged?",
          answer: "If your printer arrives damaged, please contact us immediately (within 48 hours of delivery) with photos of the damage and packaging. We'll arrange for a free replacement or full refund at no cost to you. Do not discard the packaging until the issue is resolved."
        }
      ]
    },
    {
      title: "Setup & Support",
      icon: Shield,
      faqs: [
        {
          question: "Do you provide setup assistance?",
          answer: "Yes! Every printer purchase includes access to our comprehensive setup guides and video tutorials. Our 24/7 support team can also provide phone or email assistance with printer setup, driver installation, and network configuration at no extra charge."
        },
        {
          question: "How do I install printer drivers?",
          answer: "Most modern HP printers automatically install drivers when connected. For manual installation, visit the HP Support website and download the latest drivers for your printer model. Our setup guides include step-by-step driver installation instructions for Windows, macOS, and mobile devices."
        },
        {
          question: "What if I have technical problems?",
          answer: "Our expert support team is available 24/7 to help with technical issues. Contact us via phone (855) 247-4683, email (support@injetproguide.com), or live chat. Common issues we can help with include connectivity problems, print quality issues, paper jams, and error messages."
        },
        {
          question: "Do you offer maintenance tips?",
          answer: "Yes! Visit our Printer Guides section for comprehensive maintenance tips including cleaning printheads, calibration procedures, proper ink cartridge replacement, and troubleshooting common issues. Regular maintenance extends your printer's lifespan and ensures optimal print quality."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about HP inkjet printers, shipping, 
            returns, and our services. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">{category.title}</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`item-${categoryIndex}-${faqIndex}`}
                        className="border rounded-md px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our expert support team is available 24/7 to help you with any questions 
              about HP inkjet printers, orders, or technical support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+18552474683">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover-elevate min-h-10 px-8">
                  Call (855) 247-4683
                </button>
              </a>
              <a href="mailto:support@injetproguide.com">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover-elevate min-h-10 px-8">
                  Email Support
                </button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
