import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Clock, FileText, AlertTriangle, CheckCircle, HelpCircle, Mail, Phone, ExternalLink } from "lucide-react";
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
                Warranty Information
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-warranty-subtitle">
              Understanding your product warranty coverage and claims process
            </p>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-last-updated">
              Last Updated: January 9, 2026
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" data-testid="heading-overview">
              <Shield className="w-6 h-6 text-primary" />
              Warranty Overview
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-overview-1">
                <strong className="text-foreground">Manufacturer Warranty:</strong> All inkjet printers sold by InkjetProGuide come with the original manufacturer's limited warranty.
              </p>
              <p data-testid="text-overview-2">
                <strong className="text-foreground">Warranty Coverage:</strong> Warranty terms and duration vary by product and manufacturer. Most HP inkjet printers include a one-year limited warranty from the date of purchase.
              </p>
              <p data-testid="text-overview-3">
                <strong className="text-foreground">Our Commitment:</strong> While InkjetProGuide is an independent retailer, we are committed to helping you navigate the warranty process and ensuring you receive the support you deserve.
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-md">
                <p className="text-sm" data-testid="text-business-info">
                  <strong className="text-foreground">InkjetProGuide</strong><br />
                  2704 Handley Ederville Rd, Fort Worth, TX 76118, United States<br />
                  Email: inkjetproguide@outlook.com | Phone: 1-325-400-8874
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-manufacturer-warranty">Manufacturer Warranty Details</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-manufacturer-1">
                    All products sold by InkjetProGuide are covered by the original manufacturer's limited warranty. This warranty is provided directly by the manufacturer and covers defects in materials and workmanship under normal use conditions.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-typical-coverage">
                  Typical Warranty Coverage
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-coverage-1"><strong className="text-foreground">Duration:</strong> Most HP inkjet printers come with a 1-year limited warranty from the original date of purchase. Some professional and business models may include extended coverage.</li>
                  <li data-testid="text-coverage-2"><strong className="text-foreground">What's Covered:</strong> Manufacturing defects, faulty components, and hardware failures that occur under normal operating conditions.</li>
                  <li data-testid="text-coverage-3"><strong className="text-foreground">Repair or Replace:</strong> The manufacturer will, at their discretion, repair or replace defective products or components at no charge during the warranty period.</li>
                  <li data-testid="text-coverage-4"><strong className="text-foreground">Technical Support:</strong> Phone, chat, and online technical support from the manufacturer is included during the warranty period.</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Important Note</h4>
                <p className="text-sm" data-testid="text-warranty-note">
                  Specific warranty terms, duration, and coverage details are included in the documentation that accompanies your printer. Please retain your original purchase receipt and warranty documentation for reference during any warranty claims.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-warranty-exclusions">What's Not Covered</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-exclusions-1">
                    Manufacturer warranties typically do not cover damage or defects resulting from the following conditions. Understanding these exclusions can help you protect your investment.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-common-exclusions">
                  Common Warranty Exclusions
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-exclusion-1"><strong className="text-foreground">Consumable Items:</strong> Ink cartridges, printheads, paper, and other consumable supplies are not covered under warranty.</li>
                  <li data-testid="text-exclusion-2"><strong className="text-foreground">Physical Damage:</strong> Damage caused by drops, impacts, spills, fire, flooding, or other physical events.</li>
                  <li data-testid="text-exclusion-3"><strong className="text-foreground">Misuse or Abuse:</strong> Damage resulting from improper use, neglect, or operation outside manufacturer specifications.</li>
                  <li data-testid="text-exclusion-4"><strong className="text-foreground">Third-Party Ink:</strong> Issues caused by the use of non-genuine, refilled, or third-party ink cartridges may void warranty coverage.</li>
                  <li data-testid="text-exclusion-5"><strong className="text-foreground">Unauthorized Modifications:</strong> Repairs or modifications performed by anyone other than authorized service providers.</li>
                  <li data-testid="text-exclusion-6"><strong className="text-foreground">Power Surges:</strong> Damage caused by electrical power surges, improper voltage, or inadequate power supply.</li>
                  <li data-testid="text-exclusion-7"><strong className="text-foreground">Normal Wear:</strong> General wear and tear, fading, or cosmetic deterioration from normal use.</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm" data-testid="text-exclusions-tip">
                  <strong className="text-foreground">Tip:</strong> To maximize your warranty protection, always use genuine manufacturer ink cartridges, follow the operating instructions in your user manual, and use a surge protector to protect against electrical damage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-claim-process">Warranty Claim Process</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-1">Identify the Issue</h3>
                    <p className="text-muted-foreground" data-testid="text-step-1">
                      Before initiating a warranty claim, try basic troubleshooting steps outlined in your printer's user manual. Many common issues can be resolved without requiring service. Check the manufacturer's support website for troubleshooting guides.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-2">Gather Documentation</h3>
                    <p className="text-muted-foreground" data-testid="text-step-2">
                      Locate your original purchase receipt or order confirmation from InkjetProGuide. You will need this as proof of purchase to verify your warranty coverage. Also have your printer's model number and serial number ready.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-3">Contact the Manufacturer</h3>
                    <p className="text-muted-foreground" data-testid="text-step-3">
                      Warranty claims are processed directly by the manufacturer. Contact HP Customer Support through their website or phone line. They will diagnose the issue and determine if it's covered under warranty.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-4">Follow Repair Instructions</h3>
                    <p className="text-muted-foreground" data-testid="text-step-4">
                      The manufacturer will provide instructions for repair or replacement. This may include shipping the printer to a service center or receiving a replacement unit. Follow their instructions carefully and keep all shipping documentation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-our-role">InkjetProGuide's Role</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-our-role-1">
                    As an authorized retailer, InkjetProGuide's primary role is to provide you with genuine products at competitive prices. Here's how we support you regarding warranties:
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-what-we-provide">
                  What We Provide
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-provide-1"><strong className="text-foreground">Proof of Purchase:</strong> We can provide duplicate receipts or order confirmations if you've lost your original documentation.</li>
                  <li data-testid="text-provide-2"><strong className="text-foreground">Guidance:</strong> Our customer service team can help guide you through the warranty claim process and direct you to the appropriate manufacturer resources.</li>
                  <li data-testid="text-provide-3"><strong className="text-foreground">Early Defects:</strong> For products that arrive defective or develop issues within 30 days of delivery, contact us first. We may be able to process an exchange or return more quickly than going through manufacturer warranty.</li>
                  <li data-testid="text-provide-4"><strong className="text-foreground">Product Information:</strong> We can provide specifications, model information, and other details that may be helpful for warranty claims.</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm" data-testid="text-our-role-2">
                    <strong className="text-foreground">30-Day Return Policy:</strong> Remember, if your printer develops issues within 30 days of delivery, our standard return policy may be more convenient than processing a manufacturer warranty claim. Contact us at inkjetproguide@outlook.com for assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-extended-warranty">Extended Warranty Options</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-extended-1">
                    For additional peace of mind, manufacturers often offer extended warranty plans that provide coverage beyond the standard warranty period.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-extended-2"><strong className="text-foreground">HP Care Pack:</strong> HP offers Care Pack extended warranty services that can extend coverage up to 3 years from the date of purchase. These can be purchased directly from HP.</li>
                <li data-testid="text-extended-3"><strong className="text-foreground">Third-Party Coverage:</strong> Various third-party warranty providers offer extended protection plans. InkjetProGuide does not endorse or sell these plans.</li>
                <li data-testid="text-extended-4"><strong className="text-foreground">Credit Card Protection:</strong> Some credit cards automatically extend manufacturer warranties. Check with your credit card issuer for details on any extended warranty benefits included with your card.</li>
              </ul>

              <p data-testid="text-extended-5">
                Extended warranties must typically be purchased within the original warranty period. Check with the manufacturer or your preferred provider for specific terms and pricing.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-muted/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-warranty-help">Need Help With a Warranty Issue?</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-warranty-help">
              Our customer service team is available to help guide you through the warranty process or assist with returns within our 30-day policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild data-testid="button-email-support">
                <a href="mailto:inkjetproguide@outlook.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  inkjetproguide@outlook.com
                </a>
              </Button>
              <Button variant="outline" asChild data-testid="button-phone-support">
                <a href="tel:+13254008874" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  1-325-400-8874
                </a>
              </Button>
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
