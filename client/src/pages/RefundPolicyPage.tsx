import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Package, DollarSign, Clock, RefreshCw, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="heading-refund-policy">
              Refund & Return Policy
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-policy-subtitle">
              Your satisfaction is our priority. Learn about our hassle-free return process.
            </p>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-last-updated">
              Last Updated: December 9, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Summary */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" data-testid="heading-summary">
              <Package className="w-6 h-6 text-primary" />
              Quick Summary
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-summary-1">
                <strong className="text-foreground">30-Day Return Policy:</strong> Return eligible printers within 30 days of delivery. Unopened or opened-but-unused items may qualify for a full refund. Items that show signs of use may incur up to a 15% restocking fee.
              </p>
              <p data-testid="text-summary-2">
                <strong className="text-foreground">Return Shipping:</strong> Return shipping costs depend on the return reason. If the return is due to our error (wrong item) or a verified defective item, we will provide a prepaid return label at no cost. For change-of-mind returns, the customer is responsible for return shipping costs unless we state otherwise in writing.
              </p>
              <p data-testid="text-summary-3">
                <strong className="text-foreground">Fast Refunds:</strong> Refunds are processed within 5-7 business days after inspection; banks may take additional time to post the credit.
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-md">
                <p className="text-sm" data-testid="text-business-info">
                  <strong className="text-foreground">InkjetProGuide</strong> - 2704 Handley Ederville Rd, Fort Worth, TX 76118<br />
                  Email: inkjetproguide@outlook.com | Phone: 1-325-400-8874
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 30-Day Return Policy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-return-policy">30-Day Return Policy</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-return-intro">
                We want you to be completely satisfied with your inkjet printer purchase. If you're not happy for any reason, you can return your printer within <strong className="text-foreground">30 days from the date of delivery</strong>.
              </p>
              
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Restocking Fee Structure:</h4>
                <ul className="space-y-1 text-sm">
                  <li data-testid="text-fee-tier-1"><strong>Unopened, factory-sealed items:</strong> No restocking fee - Full 100% refund</li>
                  <li data-testid="text-fee-tier-2"><strong>Opened, unused, like-new condition:</strong> No restocking fee - Full 100% refund</li>
                  <li data-testid="text-fee-tier-3"><strong>Opened items with signs of use:</strong> Up to 15% restocking fee (based on condition)</li>
                </ul>
                <p className="mt-3 text-sm" data-testid="text-restocking-disclosure">
                  Restocking fees (if any) are based on the condition of the returned item after inspection (e.g., ink installed/used, test pages printed, missing packaging, missing accessories, or signs of installation). If a restocking fee applies, we will email you the reason before finalizing the refund.
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-eligible-returns">
                  Eligible Returns
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-eligible-1">Products must be returned in original packaging when available, with all accessories, manuals, and included components</li>
                  <li data-testid="text-eligible-3">Product must be in resalable condition with no physical damage</li>
                  <li data-testid="text-eligible-4">Original purchase receipt or order number required</li>
                  <li data-testid="text-eligible-5">Returns must be initiated within 30 days of delivery date</li>
                </ul>
                <p className="mt-3 text-sm" data-testid="text-eligible-exception">
                  Items returned missing accessories, packaging, or with physical damage may be subject to a partial refund or refusal.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-opened-products">
                  Opened Products
                </h3>
                <p data-testid="text-opened-policy">
                  We understand you may need to open the box to inspect your printer. Opened products are eligible for return as long as the printer is unused, in like-new condition, and all original packaging, accessories, and documentation are included. If the item shows signs of use (test prints, ink usage, etc.), a restocking fee of up to 15% may apply based on condition assessment.
                </p>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-rma-shipping">
                  <Package className="w-5 h-5 text-primary" />
                  Return Shipping
                </h3>
                <p data-testid="text-rma-shipping">
                  Return shipping costs depend on the return reason. If the return is due to our error (wrong item) or a verified defective item, we will provide a prepaid return label at no cost. For change-of-mind returns, the customer is responsible for return shipping costs unless we state otherwise in writing. Once your return is approved, we will provide instructions for shipping your item back to us. Please contact us to initiate a return request.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Return */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-how-to-return">How to Return Your Printer</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-1">Contact Us</h3>
                    <p className="text-muted-foreground" data-testid="text-step-1">
                      Email us at <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline" data-testid="link-email-support-step1">inkjetproguide@outlook.com</a> or call <a href="tel:+13254008874" className="text-primary hover:underline" data-testid="link-phone-support-step1">1-325-400-8874</a> with your order number to initiate a return.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-2">Receive Return Authorization</h3>
                    <p className="text-muted-foreground" data-testid="text-step-2">
                      We'll send you a Return Merchandise Authorization (RMA) number and return instructions within 24 business hours. Do not ship returns to our corporate mailing address. Returns must be sent only to the return address provided with your RMA instructions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-3">Pack Your Printer</h3>
                    <p className="text-muted-foreground" data-testid="text-step-3">
                      Securely pack the printer in its original box with all accessories, manuals, and components. Include the RMA number on the outside of the package.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-4">Ship Your Return</h3>
                    <p className="text-muted-foreground" data-testid="text-step-4">
                      Follow the return shipping instructions provided with your RMA. Drop off at an authorized shipping location and retain your tracking number for your records.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2" data-testid="heading-step-5">Receive Your Refund</h3>
                    <p className="text-muted-foreground" data-testid="text-step-5">
                      Once we receive and inspect your return, we'll process your refund within 5-7 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refund Processing */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-refund-processing">Refund Processing</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-processing-time">
                  <Clock className="w-5 h-5 text-primary" />
                  Processing Time
                </h3>
                <p data-testid="text-processing-time">
                  After we receive your returned printer and verify its condition, your refund will be processed within <strong className="text-foreground">5-7 business days</strong>. You'll receive an email confirmation when your refund has been issued.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-refund-method">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Refund Method
                </h3>
                <p data-testid="text-refund-method-1" className="mb-3">
                  Credit/Debit Cards (Stripe): Refunded to the original payment method. We process refunds within 5–7 business days after inspection. Your bank may take an additional 3–5 business days to post the credit.
                </p>
                <p data-testid="text-refund-method-2">
                  If a refund to the original payment method is not possible (for example, the account is closed), we will contact you to confirm an alternative method. We will not substitute store credit unless you agree.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-shipping-refund">
                  Shipping Cost Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-md">
                    <p className="font-medium text-foreground mb-1">Return Shipping (You to Us):</p>
                    <p className="text-sm" data-testid="text-return-shipping-cost">
                      Return shipping costs depend on the return reason. If the return is due to our error (wrong item) or a verified defective item, we will provide a prepaid return label at no cost. For change-of-mind returns, the customer is responsible for return shipping costs unless we state otherwise in writing.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-md">
                    <p className="font-medium text-foreground mb-1">Original Shipping (Us to You):</p>
                    <p className="text-sm" data-testid="text-original-shipping-refund">
                      <strong>Refundable</strong> if return is due to our error (wrong item, defective product). <strong>Non-refundable</strong> for standard change-of-mind returns.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exchanges */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-exchanges">Exchanges</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-exchange-intro">
                If you'd like to exchange your printer for a different model, we're happy to help! The fastest way to get your new printer is to:
              </p>
              <ol className="space-y-2 ml-6 list-decimal">
                <li data-testid="text-exchange-step-1">Return your current printer following our standard return process</li>
                <li data-testid="text-exchange-step-2">Place a new order for the printer model you prefer</li>
                <li data-testid="text-exchange-step-3">Once we receive your return, we'll process your refund as usual</li>
              </ol>
              <p className="mt-4" data-testid="text-exchange-note">
                <strong className="text-foreground">Note:</strong> For direct exchanges, please contact us at <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline" data-testid="link-email-exchange">inkjetproguide@outlook.com</a> and we'll arrange a personalized exchange process for you.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Damaged or Defective Items */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-damaged-defective">Damaged or Defective Items</h2>
          <Card className="border-destructive/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-md">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-damaged-priority">Priority Handling</h3>
                  <p data-testid="text-damaged-priority">
                    If you receive a damaged or defective printer, please contact us immediately. We'll expedite a replacement or full refund at no cost to you.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-damaged-procedure">
                  What to Do
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-damaged-1">Contact us as soon as possible after delivery. For fastest resolution, we recommend reporting visible shipping damage within 48 hours. Reporting after 48 hours may limit carrier-claim options, but we will still review your request under this policy and applicable law.</li>
                  <li data-testid="text-damaged-2">Provide photos of the damage or describe the defect</li>
                  <li data-testid="text-damaged-3">Keep all original packaging and materials</li>
                  <li data-testid="text-damaged-4">We'll arrange a return shipment or pickup where available and issue a replacement or refund at no cost to you</li>
                </ul>
              </div>

              <p className="mt-4" data-testid="text-damaged-warranty">
                All products sold by InkjetProGuide are covered by the manufacturer's warranty where applicable. For warranty service after the 30-day return window, please contact the manufacturer directly. InkjetProGuide does not provide manufacturer warranty service, repairs, or technical support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Non-Returnable Items */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-non-returnable">Non-Returnable Items</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-non-returnable-intro">
                For hygiene and safety reasons, the following items cannot be returned once opened:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-non-returnable-1">Ink cartridges (opened packages)</li>
                <li data-testid="text-non-returnable-2">Print paper (opened reams)</li>
                <li data-testid="text-non-returnable-3">Cleaning supplies (opened bottles or kits)</li>
                <li data-testid="text-non-returnable-4">Software or digital downloads</li>
              </ul>
              <p className="mt-4" data-testid="text-non-returnable-note">
                <strong className="text-foreground">Note:</strong> Unopened ink cartridges and supplies can be returned within 30 days following our standard return policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* International Returns */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-international-returns">International & Non-US Returns</h2>
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              <p data-testid="text-international-policy">
                InkjetProGuide currently serves customers within the United States only. All orders are shipped to US addresses, and our return policy applies to US customers. We do not currently accept international returns or ship outside the USA.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-contact-returns">Contact Us About Returns</h2>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6" data-testid="text-contact-intro">
                For questions about returns, refunds, or exchanges, contact us during office hours.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-email-us">Email Us</h3>
                    <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline" data-testid="link-email-support">
                      inkjetproguide@outlook.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Response within 24 business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-call-us">Call Us</h3>
                    <a href="tel:+13254008874" className="text-primary hover:underline" data-testid="link-phone-support">
                      1-325-400-8874
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Available during office hours</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/contact">
                  <Button variant="outline" className="h-11 px-6" data-testid="button-contact-page">
                    Visit Contact Page
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Notes */}
        <Card className="border-muted">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" data-testid="heading-additional-notes">
              <RefreshCw className="w-5 h-5 text-primary" />
              Additional Information
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p data-testid="text-policy-updates">
                <strong className="text-foreground">Policy Updates:</strong> We may update this policy from time to time. The version in effect on the date you place your order will apply to that order.
              </p>
              <p data-testid="text-fraud-prevention">
                <strong className="text-foreground">Fraud Prevention:</strong> We reserve the right to refuse returns that show signs of fraud, abuse, or violation of our terms of service.
              </p>
              <p data-testid="text-final-sale">
                <strong className="text-foreground">Final Sale Items:</strong> Items marked as "Final Sale" or "Clearance" may not be eligible for return. These restrictions will be clearly indicated on the product page.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4" data-testid="heading-cta">Need Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is dedicated to making your return experience as smooth as possible. 
            Don't hesitate to reach out with any questions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="h-12 px-8" data-testid="button-contact-us">
                Contact Us
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" variant="outline" className="h-12 px-8" data-testid="button-view-faq">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
