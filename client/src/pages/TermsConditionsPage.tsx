import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, AlertCircle, CreditCard, Package, Scale, Users, Mail } from "lucide-react";
import { Link } from "wouter";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scale className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-terms-conditions">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-terms-subtitle">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-last-updated">
              Last Updated: January 2024
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Overview */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" data-testid="heading-overview">
              <FileText className="w-6 h-6 text-primary" />
              Agreement Overview
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-overview-1">
                By accessing and using InjetProGuide, you agree to be bound by these Terms & Conditions and all applicable laws and regulations.
              </p>
              <p data-testid="text-overview-2">
                <strong className="text-foreground">Key Points:</strong> You must be 18 or older to make purchases. All sales are subject to product availability. We reserve the right to refuse or cancel orders. Prices are subject to change without notice.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-acceptance">Acceptance of Terms</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-acceptance-1">
                Welcome to InjetProGuide. These Terms and Conditions ("Terms") govern your access to and use of our website, products, and services. By accessing or using InjetProGuide, you agree to comply with and be bound by these Terms.
              </p>
              <p data-testid="text-acceptance-2">
                If you do not agree to these Terms, you must not access or use our website or services. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.
              </p>
              <p data-testid="text-acceptance-3">
                <strong className="text-foreground">Continued use of our services after changes constitutes acceptance of the modified Terms.</strong>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Eligibility */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-eligibility">Eligibility</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-eligibility-1">
                You must be at least 18 years old to create an account and make purchases on InjetProGuide. By using our services, you represent and warrant that you meet this age requirement.
              </p>
              <p data-testid="text-eligibility-2">
                You must provide accurate, current, and complete information during registration and update such information to maintain its accuracy. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <div className="p-4 bg-muted/50 rounded-md">
                <p className="text-sm" data-testid="text-eligibility-note">
                  <strong className="text-foreground">Note:</strong> InjetProGuide serves customers exclusively within the United States. International orders are not accepted at this time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Registration */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-account">Account Registration and Security</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-account-creation">
                  <Users className="w-5 h-5 text-primary" />
                  Account Creation
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-account-1">You must create an account to make purchases and access certain features</li>
                  <li data-testid="text-account-2">You are responsible for all activities that occur under your account</li>
                  <li data-testid="text-account-3">You must notify us immediately of any unauthorized access or security breach</li>
                  <li data-testid="text-account-4">We reserve the right to suspend or terminate accounts that violate these Terms</li>
                  <li data-testid="text-account-5">You may not share your account credentials with others</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-prohibited-conduct">
                  Prohibited Account Activities
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-prohibited-1">Creating multiple accounts to abuse promotions or discounts</li>
                  <li data-testid="text-prohibited-2">Providing false or misleading information</li>
                  <li data-testid="text-prohibited-3">Using automated systems or bots to access the website</li>
                  <li data-testid="text-prohibited-4">Attempting to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Information and Pricing */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-products-pricing">Products and Pricing</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-product-info">
                  <Package className="w-5 h-5 text-primary" />
                  Product Information
                </h3>
                <p data-testid="text-product-info-1">
                  We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                </p>
                <p className="mt-3" data-testid="text-product-info-2">
                  All HP inkjet printers and accessories sold on InjetProGuide are genuine products sourced from authorized distributors. Product availability is subject to change without notice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-pricing">
                  Pricing and Payment
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-pricing-1">All prices are listed in US Dollars (USD)</li>
                  <li data-testid="text-pricing-2">Prices are subject to change without notice</li>
                  <li data-testid="text-pricing-3">We reserve the right to correct pricing errors, even after orders are placed</li>
                  <li data-testid="text-pricing-4">Applicable taxes will be calculated at checkout</li>
                  <li data-testid="text-pricing-5">Promotional prices and discounts may have specific terms and expiration dates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-product-availability">
                  Product Availability
                </h3>
                <p data-testid="text-availability">
                  We attempt to ensure all products shown as "In Stock" are available for immediate shipment. However, due to high demand or unforeseen circumstances, items may become unavailable after you place an order. In such cases, we will notify you promptly and offer a refund or alternative product.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders and Payment */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-orders-payment">Orders and Payment Terms</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-order-acceptance">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Order Acceptance and Cancellation
                </h3>
                <p data-testid="text-order-acceptance-1">
                  All orders are subject to acceptance by InjetProGuide. We reserve the right to refuse or cancel any order for any reason, including but not limited to:
                </p>
                <ul className="space-y-2 ml-6 list-disc mt-3">
                  <li data-testid="text-order-cancel-1">Product unavailability or stock limitations</li>
                  <li data-testid="text-order-cancel-2">Errors in product or pricing information</li>
                  <li data-testid="text-order-cancel-3">Suspected fraudulent or unauthorized transactions</li>
                  <li data-testid="text-order-cancel-4">Orders that exceed quantity limits</li>
                  <li data-testid="text-order-cancel-5">Inability to verify customer information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-payment-methods">
                  Accepted Payment Methods
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-payment-1"><strong className="text-foreground">Credit/Debit Cards:</strong> We accept major credit cards processed securely through Stripe</li>
                  <li data-testid="text-payment-2"><strong className="text-foreground">Cash on Delivery (COD):</strong> Available for eligible orders within the United States</li>
                </ul>
                <p className="mt-4" data-testid="text-payment-security">
                  All payment transactions are processed through secure, PCI-DSS compliant payment gateways. We do not store your complete credit card information on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-order-confirmation">
                  Order Confirmation
                </h3>
                <p data-testid="text-order-confirmation">
                  After placing an order, you will receive an email confirmation. This confirmation does not constitute acceptance of your order. We will send a separate shipping confirmation once your order has been processed and dispatched.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping and Delivery */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-shipping">Shipping and Delivery</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-shipping-intro">
                We ship to addresses within the United States only. Shipping times and costs vary based on your location and selected shipping method.
              </p>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-shipping-policy">
                  Shipping Policy
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-shipping-1">Estimated delivery times are provided at checkout and are not guaranteed</li>
                  <li data-testid="text-shipping-2">We are not responsible for delays caused by shipping carriers or weather conditions</li>
                  <li data-testid="text-shipping-3">Risk of loss passes to you upon delivery to the shipping carrier</li>
                  <li data-testid="text-shipping-4">You must inspect packages upon delivery and report damage within 48 hours</li>
                  <li data-testid="text-shipping-5">Incorrect shipping addresses provided by customers may result in additional charges</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Returns and Refunds */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-returns-refunds">Returns and Refunds</h2>
          <Card className="border-primary/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-returns-intro">
                We offer a <strong className="text-foreground">30-day money-back guarantee</strong> on all HP inkjet printers purchased through InjetProGuide. Please review our complete return policy for detailed information.
              </p>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-return-conditions">
                  Return Conditions
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-return-1">Products must be returned within 30 days of delivery</li>
                  <li data-testid="text-return-2">Items must be in original condition with all accessories and packaging</li>
                  <li data-testid="text-return-3">A Return Merchandise Authorization (RMA) is required for all returns</li>
                  <li data-testid="text-return-4">Refunds are processed within 5-7 business days after inspection</li>
                  <li data-testid="text-return-5">A 15% restocking fee may apply to opened items showing signs of use</li>
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm" data-testid="text-return-link">
                  For complete details, please see our <Link href="/refund-policy"><span className="text-primary hover:underline cursor-pointer" data-testid="link-refund-policy">Refund & Return Policy</span></Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intellectual Property */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-intellectual-property">Intellectual Property Rights</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-ip-1">
                All content on InjetProGuide, including but not limited to text, graphics, logos, images, product descriptions, software, and design elements, is the property of InjetProGuide or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-ip-restrictions">
                  Usage Restrictions
                </h3>
                <p data-testid="text-ip-restrictions-intro" className="mb-3">
                  You may not, without our prior written permission:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-ip-2">Copy, modify, or distribute any content from our website</li>
                  <li data-testid="text-ip-3">Use our content for commercial purposes</li>
                  <li data-testid="text-ip-4">Remove copyright or proprietary notices</li>
                  <li data-testid="text-ip-5">Use automated systems to scrape or download content</li>
                </ul>
              </div>
              <p className="mt-4" data-testid="text-ip-trademarks">
                <strong className="text-foreground">Trademarks:</strong> "InjetProGuide" and our logo are trademarks of InjetProGuide. HP and related trademarks are the property of HP Inc. and are used with permission for identification purposes only.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Conduct */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-user-conduct">User Conduct and Prohibited Activities</h2>
          <Card className="border-destructive/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-md">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p data-testid="text-conduct-intro">
                    You agree not to engage in any of the following prohibited activities while using our services:
                  </p>
                </div>
              </div>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-prohibited-activity-1">Violating any applicable laws or regulations</li>
                <li data-testid="text-prohibited-activity-2">Infringing on intellectual property rights</li>
                <li data-testid="text-prohibited-activity-3">Transmitting malware, viruses, or harmful code</li>
                <li data-testid="text-prohibited-activity-4">Attempting to gain unauthorized access to our systems</li>
                <li data-testid="text-prohibited-activity-5">Engaging in fraudulent activities or payment disputes</li>
                <li data-testid="text-prohibited-activity-6">Harassing, threatening, or abusing our staff or other users</li>
                <li data-testid="text-prohibited-activity-7">Using the website for any illegal or unauthorized purpose</li>
                <li data-testid="text-prohibited-activity-8">Interfering with the proper functioning of the website</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Warranties and Disclaimers */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-warranties">Warranties and Disclaimers</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-product-warranties">
                  Product Warranties
                </h3>
                <p data-testid="text-warranty-1">
                  All HP inkjet printers sold through InjetProGuide are covered by the manufacturer's warranty. Warranty terms, duration, and coverage are determined by HP Inc., not by InjetProGuide.
                </p>
                <p className="mt-3" data-testid="text-warranty-2">
                  For warranty service, please refer to the warranty documentation included with your product or contact HP support directly. We will assist you with warranty claims when possible.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-disclaimer">
                  Disclaimer of Warranties
                </h3>
                <div className="p-4 bg-muted/50 rounded-md">
                  <p className="text-sm uppercase font-semibold mb-2" data-testid="text-disclaimer-title">
                    IMPORTANT LEGAL NOTICE
                  </p>
                  <p data-testid="text-disclaimer-1">
                    OUR WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                  </p>
                  <p className="mt-3" data-testid="text-disclaimer-2">
                    WE DO NOT WARRANT THAT OUR WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-liability">Limitation of Liability</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="p-4 bg-muted/50 rounded-md">
                <p className="text-sm uppercase font-semibold mb-2" data-testid="text-liability-title">
                  LIMITATION OF LIABILITY
                </p>
                <p data-testid="text-liability-1">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, INJETPROGUIDE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="mt-3" data-testid="text-liability-2">
                  OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
              </div>
              <p className="mt-4 text-sm" data-testid="text-liability-note">
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Indemnification */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-indemnification">Indemnification</h2>
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              <p data-testid="text-indemnification">
                You agree to indemnify, defend, and hold harmless InjetProGuide, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or in connection with: (a) your use of our services; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) any fraudulent or illegal activities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-privacy">Privacy and Data Protection</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p data-testid="text-privacy-1">
                    Your privacy is important to us. Our collection, use, and disclosure of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                  <p className="mt-3" data-testid="text-privacy-2">
                    By using our services, you consent to our collection and use of your information as described in our <Link href="/privacy-policy"><span className="text-primary hover:underline cursor-pointer" data-testid="link-privacy-policy">Privacy Policy</span></Link>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dispute Resolution */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-disputes">Dispute Resolution and Governing Law</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-governing-law">
                  Governing Law
                </h3>
                <p data-testid="text-governing-law">
                  These Terms shall be governed by and construed in accordance with the laws of the United States and the State of Delaware, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-dispute-resolution">
                  Dispute Resolution Process
                </h3>
                <p data-testid="text-dispute-intro" className="mb-3">
                  In the event of any dispute arising out of or relating to these Terms:
                </p>
                <ol className="space-y-2 ml-6 list-decimal">
                  <li data-testid="text-dispute-1">You agree to first attempt to resolve the dispute informally by contacting us at <a href="mailto:support@injetproguide.com" className="text-primary hover:underline" data-testid="link-email-dispute">support@injetproguide.com</a></li>
                  <li data-testid="text-dispute-2">If the dispute cannot be resolved within 30 days, either party may initiate binding arbitration</li>
                  <li data-testid="text-dispute-3">Arbitration shall be conducted in accordance with the rules of the American Arbitration Association</li>
                  <li data-testid="text-dispute-4">The arbitration shall take place in Delaware, United States</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-class-action">
                  Class Action Waiver
                </h3>
                <p data-testid="text-class-action">
                  You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Termination */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-termination">Termination</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-termination-1">
                We reserve the right to suspend or terminate your account and access to our services at any time, with or without notice, for any reason, including but not limited to violation of these Terms.
              </p>
              <p data-testid="text-termination-2">
                Upon termination, your right to use our services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
              <p data-testid="text-termination-3">
                You may terminate your account at any time by contacting us at <a href="mailto:support@injetproguide.com" className="text-primary hover:underline" data-testid="link-email-termination">support@injetproguide.com</a>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modifications */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-modifications">Changes to Terms</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-modifications-1">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be notified through:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-modifications-2">Posting the updated Terms on this page with a new "Last Updated" date</li>
                <li data-testid="text-modifications-3">Email notification to registered users</li>
                <li data-testid="text-modifications-4">Prominent notice on our website</li>
              </ul>
              <p className="mt-4" data-testid="text-modifications-5">
                Your continued use of our services after any changes constitutes acceptance of the modified Terms. If you do not agree to the new Terms, you must stop using our services.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Severability */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-severability">Severability and Waiver</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-severability-clause">
                  Severability
                </h3>
                <p data-testid="text-severability">
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-waiver">
                  Waiver
                </h3>
                <p data-testid="text-waiver">
                  No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entire Agreement */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-entire-agreement">Entire Agreement</h2>
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              <p data-testid="text-entire-agreement">
                These Terms, together with our Privacy Policy and Refund & Return Policy, constitute the entire agreement between you and InjetProGuide regarding the use of our services and supersede all prior agreements and understandings, whether written or oral, relating to such subject matter.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-contact-terms">Contact Information</h2>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6" data-testid="text-contact-intro">
                If you have any questions, concerns, or feedback regarding these Terms & Conditions, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-email-contact">Email</h3>
                    <a href="mailto:support@injetproguide.com" className="text-primary hover:underline" data-testid="link-email-contact">
                      support@injetproguide.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Legal inquiries welcome</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-phone-contact">Phone</h3>
                    <a href="tel:+18005551234" className="text-primary hover:underline" data-testid="link-phone-contact">
                      1-800-555-1234
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2" data-testid="heading-business-info">InjetProGuide</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-business-info">
                  HP Inkjet Printer Specialists<br />
                  Serving customers across the United States
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card className="border-muted">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4" data-testid="heading-related-policies">
              Related Policies
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/privacy-policy">
                <Button variant="outline" className="w-full justify-start h-auto py-3" data-testid="button-privacy-policy">
                  <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-left">Privacy Policy</span>
                </Button>
              </Link>
              <Link href="/refund-policy">
                <Button variant="outline" className="w-full justify-start h-auto py-3" data-testid="button-refund-policy">
                  <FileText className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-left">Refund & Return Policy</span>
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full justify-start h-auto py-3" data-testid="button-help-center">
                  <FileText className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-left">Help Center</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full justify-start h-auto py-3" data-testid="button-contact-us">
                  <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-left">Contact Us</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
