import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Shield, Scale, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-disclaimer">
                Disclaimer
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-disclaimer-subtitle">
              Important information about our website and services
            </p>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-last-updated">
              Last Updated: January 6, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="mt-4 p-4 bg-muted/50 rounded-md">
              <p className="text-sm" data-testid="text-business-info">
                <strong className="text-foreground">InkjetProGuide</strong><br />
                2704 Handley Ederville Rd, Fort Worth, TX 76118, United States<br />
                Email: inkjetproguide@outlook.com | Phone: 1-325-400-8874
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-affiliate-disclosure">Affiliate Disclosure</h2>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-affiliate-1">
                    InkjetProGuide is a participant in various affiliate programs. This means we may earn a commission when you purchase products through links on our website at no additional cost to you.
                  </p>
                </div>
              </div>
              <p data-testid="text-affiliate-2">
                Our affiliate relationships do not influence our product recommendations. We recommend products based on our research and genuine belief that they provide value to our customers. We are committed to providing honest, unbiased information to help you make informed purchasing decisions.
              </p>
              <p data-testid="text-affiliate-3">
                Affiliate commissions help support the creation of our free educational content, comprehensive buying guides, and ongoing website maintenance. We appreciate your support through these links.
              </p>
              <p className="text-sm" data-testid="text-affiliate-4">
                <strong className="text-foreground">Federal Trade Commission (FTC) Compliance:</strong> In accordance with the FTC's guidelines on endorsements and testimonials, we disclose that we may receive compensation for products purchased through links on our website.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-general-disclaimer">General Disclaimer</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-general-1">
                The information provided on InkjetProGuide (the "Website") is for general informational purposes only. All information on the Website is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.
              </p>
              <p data-testid="text-general-2">
                Under no circumstance shall InkjetProGuide have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the Website is solely at your own risk.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-product-information">Product Information Disclaimer</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-product-1">
                    Product descriptions, specifications, images, and pricing displayed on InkjetProGuide are provided for informational purposes only. While we strive to ensure accuracy, we cannot guarantee that all product information is complete, current, or error-free.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-product-2">Product images may vary from actual products in color, size, or appearance</li>
                <li data-testid="text-product-3">Specifications are provided by manufacturers and may be subject to change without notice</li>
                <li data-testid="text-product-4">Prices are subject to change without prior notice</li>
                <li data-testid="text-product-5">Product availability is not guaranteed and may vary</li>
                <li data-testid="text-product-6">We reserve the right to correct any errors in product information, pricing, or availability</li>
              </ul>
              <p data-testid="text-product-7">
                For the most accurate and up-to-date product information, please refer to the manufacturer website or contact us.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-trademark">Trademark Disclaimer</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-trademark-1">
                    Product names, logos, and brands are property of their respective owners. InkjetProGuide is an independent retailer and is not affiliated with, endorsed by, or sponsored by any printer manufacturer.
                  </p>
                </div>
              </div>
              <p data-testid="text-trademark-2">
                All other trademarks, service marks, and trade names referenced on this Website are the property of their respective owners. The use of these marks does not imply any affiliation with or endorsement by their owners.
              </p>
              <p data-testid="text-trademark-3">
                InkjetProGuide is an independent online retailer serving customers in the United States. Product warranties are provided according to the manufacturer's terms and conditions. Please refer to the manufacturer's warranty documentation included with each product for specific coverage details.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-external-links">External Links Disclaimer</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-links-1">
                The Website may contain links to external websites that are not provided or maintained by or in any way affiliated with InkjetProGuide. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>
              <p data-testid="text-links-2">
                We are not responsible for the content, privacy policies, or practices of any third-party websites. Inclusion of any linked website does not imply approval or endorsement of the linked website by InkjetProGuide.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-limitation-liability">Limitation of Liability</h2>
          <Card className="border-destructive/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-md">
                <Scale className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-liability-notice">
                    Important Legal Notice
                  </h3>
                  <p data-testid="text-liability-notice">
                    To the fullest extent permitted by applicable law, InkjetProGuide shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Website.
                  </p>
                </div>
              </div>
              <p data-testid="text-liability-1">
                In no event shall InkjetProGuide, its officers, directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-liability-2">Your access to or use of (or inability to access or use) the Website</li>
                <li data-testid="text-liability-3">Any conduct or content of any third party on the Website</li>
                <li data-testid="text-liability-4">Any content obtained from the Website</li>
                <li data-testid="text-liability-5">Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-professional-advice">Professional Advice Disclaimer</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-advice-1">
                The information provided on InkjetProGuide, including product guides, buying recommendations, and technical specifications, is for general informational purposes only and should not be construed as professional advice.
              </p>
              <p data-testid="text-advice-2">
                We recommend consulting with qualified professionals or directly with manufacturer technical support for specific technical requirements, compatibility questions, or specialized printing needs. InkjetProGuide is not responsible for any decisions made based on the information provided on this Website.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-warranty">Warranty Disclaimer</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-warranty-1">
                All products sold by InkjetProGuide are covered by the manufacturer's warranty where applicable. InkjetProGuide does not provide manufacturer warranty service, repairs, or technical support.
              </p>
              <p data-testid="text-warranty-2">
                THE WEBSITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-changes">Changes to This Disclaimer</h2>
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              <p data-testid="text-changes">
                We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting on the Website. Your continued use of the Website following the posting of changes constitutes your acceptance of such changes. We encourage you to review this Disclaimer periodically.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-contact">Contact Information</h2>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6" data-testid="text-contact-intro">
                If you have any questions about this Disclaimer, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-email-us">Email Us</h3>
                    <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline" data-testid="link-email-disclaimer">
                      inkjetproguide@outlook.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-call-us">Call Us</h3>
                    <a href="tel:+13254008874" className="text-primary hover:underline" data-testid="link-phone-disclaimer">
                      1-325-400-8874
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/privacy-policy">
            <Button variant="outline" className="h-11 px-6" data-testid="button-privacy-policy">
              Privacy Policy
            </Button>
          </Link>
          <Link href="/terms-conditions">
            <Button variant="outline" className="h-11 px-6" data-testid="button-terms">
              Terms & Conditions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
