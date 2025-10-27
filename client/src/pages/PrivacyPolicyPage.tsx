import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Users, Database, Globe, Mail, FileText, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-privacy-policy">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-policy-subtitle">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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
              <Eye className="w-6 h-6 text-primary" />
              Privacy at a Glance
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-overview-1">
                <strong className="text-foreground">What We Collect:</strong> Name, email, shipping address, payment information, and browsing activity on our website.
              </p>
              <p data-testid="text-overview-2">
                <strong className="text-foreground">How We Use It:</strong> To process orders, improve your shopping experience, and send you relevant updates.
              </p>
              <p data-testid="text-overview-3">
                <strong className="text-foreground">Your Rights:</strong> You can access, modify, or delete your personal data at any time.
              </p>
              <p data-testid="text-overview-4">
                <strong className="text-foreground">Security:</strong> We use industry-standard encryption and secure payment processing through Stripe.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-introduction">Introduction</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-intro-1">
                Welcome to InjetProGuide. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p data-testid="text-intro-2">
                By using InjetProGuide, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our website or services.
              </p>
              <p data-testid="text-intro-3">
                <strong className="text-foreground">InjetProGuide</strong> is an e-commerce platform specializing in HP inkjet printers, serving customers exclusively within the United States.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Information We Collect */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-info-collected">Information We Collect</h2>
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-personal-info">
                  <Users className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                <p className="text-muted-foreground mb-3" data-testid="text-personal-info-intro">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                  <li data-testid="text-personal-info-1">Create an account on our website</li>
                  <li data-testid="text-personal-info-2">Place an order for products</li>
                  <li data-testid="text-personal-info-3">Subscribe to our newsletter or marketing communications</li>
                  <li data-testid="text-personal-info-4">Contact our customer support team</li>
                  <li data-testid="text-personal-info-5">Participate in surveys or promotions</li>
                </ul>
                <p className="text-muted-foreground mt-4" data-testid="text-personal-info-types">
                  <strong className="text-foreground">This information may include:</strong> Full name, email address, phone number, shipping address, billing address, and payment information (processed securely through Stripe).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2" data-testid="heading-automatic-info">
                  <Database className="w-5 h-5 text-primary" />
                  Automatically Collected Information
                </h3>
                <p className="text-muted-foreground mb-3" data-testid="text-automatic-info-intro">
                  When you visit our website, we automatically collect certain information about your device and browsing behavior:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                  <li data-testid="text-automatic-info-1">IP address and general location data</li>
                  <li data-testid="text-automatic-info-2">Browser type and version</li>
                  <li data-testid="text-automatic-info-3">Device type and operating system</li>
                  <li data-testid="text-automatic-info-4">Pages visited and time spent on each page</li>
                  <li data-testid="text-automatic-info-5">Referring website and exit pages</li>
                  <li data-testid="text-automatic-info-6">Shopping cart activity and wishlist items</li>
                  <li data-testid="text-automatic-info-7">Search queries within our website</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-payment-info">
                  Payment Information
                </h3>
                <p className="text-muted-foreground" data-testid="text-payment-info">
                  We use <strong className="text-foreground">Stripe</strong> as our secure payment processor. We do not store your complete credit card information on our servers. Payment card data is encrypted and processed directly by Stripe in compliance with PCI-DSS standards. For Cash on Delivery orders, we collect delivery address and contact information only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How We Use Your Information */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-how-we-use">How We Use Your Information</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-use-intro">
                We use the information we collect for the following purposes:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-use-1"><strong className="text-foreground">Order Processing:</strong> To process and fulfill your orders, manage payments, and arrange shipping</li>
                <li data-testid="text-use-2"><strong className="text-foreground">Account Management:</strong> To create and manage your user account, including login authentication</li>
                <li data-testid="text-use-3"><strong className="text-foreground">Customer Support:</strong> To respond to your inquiries, resolve issues, and provide assistance</li>
                <li data-testid="text-use-4"><strong className="text-foreground">Communication:</strong> To send order confirmations, shipping updates, and important account notifications</li>
                <li data-testid="text-use-5"><strong className="text-foreground">Marketing:</strong> To send promotional emails about new products, special offers, and updates (you can opt out at any time)</li>
                <li data-testid="text-use-6"><strong className="text-foreground">Personalization:</strong> To remember your preferences, shopping cart, and wishlist items</li>
                <li data-testid="text-use-7"><strong className="text-foreground">Analytics:</strong> To analyze website usage, improve our services, and enhance user experience</li>
                <li data-testid="text-use-8"><strong className="text-foreground">Fraud Prevention:</strong> To detect and prevent fraudulent transactions and protect against security threats</li>
                <li data-testid="text-use-9"><strong className="text-foreground">Legal Compliance:</strong> To comply with legal obligations and enforce our terms of service</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Information Sharing */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-info-sharing">Information Sharing and Disclosure</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-sharing-intro">
                We do not sell or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-service-providers">
                  Service Providers
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-sharing-1"><strong className="text-foreground">Stripe:</strong> Payment processing and fraud prevention</li>
                  <li data-testid="text-sharing-2"><strong className="text-foreground">Shipping Carriers:</strong> Order fulfillment and delivery tracking</li>
                  <li data-testid="text-sharing-3"><strong className="text-foreground">Email Service Providers:</strong> Sending transactional and marketing emails</li>
                  <li data-testid="text-sharing-4"><strong className="text-foreground">Hosting Services:</strong> Website hosting and database management (Neon PostgreSQL)</li>
                  <li data-testid="text-sharing-5"><strong className="text-foreground">Analytics Tools:</strong> Website performance and user behavior analysis</li>
                </ul>
                <p className="mt-3" data-testid="text-sharing-providers-note">
                  These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-legal-sharing">
                  Legal Requirements
                </h3>
                <p data-testid="text-legal-sharing">
                  We may disclose your information if required by law, court order, or governmental authority, or to protect our rights, property, or safety, or that of our users or the public.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-business-transfer">
                  Business Transfers
                </h3>
                <p data-testid="text-business-transfer">
                  In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred to the acquiring entity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cookies and Tracking */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-cookies">Cookies and Tracking Technologies</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-cookies-intro">
                We use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-cookie-types">
                  Types of Cookies We Use
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-cookie-1"><strong className="text-foreground">Essential Cookies:</strong> Required for website functionality, including user authentication and shopping cart</li>
                  <li data-testid="text-cookie-2"><strong className="text-foreground">Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li data-testid="text-cookie-3"><strong className="text-foreground">Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li data-testid="text-cookie-4"><strong className="text-foreground">Marketing Cookies:</strong> Track your browsing activity to show relevant advertisements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-cookie-control">
                  Managing Cookies
                </h3>
                <p data-testid="text-cookie-control">
                  Most web browsers allow you to control cookies through their settings. However, disabling cookies may limit your ability to use certain features of our website, such as the shopping cart and user account.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Security */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-data-security">Data Security</h2>
          <Card className="border-primary/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-md">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-security-commitment">
                    Our Security Commitment
                  </h3>
                  <p data-testid="text-security-commitment">
                    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-security-measures">
                  Security Measures
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-security-1">SSL/TLS encryption for all data transmission</li>
                  <li data-testid="text-security-2">Secure password hashing using bcrypt</li>
                  <li data-testid="text-security-3">PCI-DSS compliant payment processing through Stripe</li>
                  <li data-testid="text-security-4">Encrypted database connections to Neon PostgreSQL</li>
                  <li data-testid="text-security-5">Regular security audits and updates</li>
                  <li data-testid="text-security-6">Restricted access to personal data on a need-to-know basis</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-md">
                <p className="text-sm" data-testid="text-security-disclaimer">
                  <strong className="text-foreground">Important:</strong> While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Privacy Rights */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-your-rights">Your Privacy Rights</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-rights-intro">
                You have the following rights regarding your personal information:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-right-1"><strong className="text-foreground">Access:</strong> Request a copy of the personal information we hold about you</li>
                <li data-testid="text-right-2"><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li data-testid="text-right-3"><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                <li data-testid="text-right-4"><strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
                <li data-testid="text-right-5"><strong className="text-foreground">Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                <li data-testid="text-right-6"><strong className="text-foreground">Object to Processing:</strong> Object to our processing of your personal information</li>
              </ul>
              <p className="mt-4" data-testid="text-rights-exercise">
                To exercise any of these rights, please contact us at <a href="mailto:support@injetproguide.com" className="text-primary hover:underline" data-testid="link-email-rights">support@injetproguide.com</a> or call <a href="tel:+18884674377" className="text-primary hover:underline" data-testid="link-phone-rights">1-888-467-4377</a>. We will respond to your request within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Retention */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-data-retention">Data Retention</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-retention-intro">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-retention-1"><strong className="text-foreground">Account Data:</strong> Retained until you request deletion or close your account</li>
                <li data-testid="text-retention-2"><strong className="text-foreground">Order History:</strong> Retained for 7 years for tax and legal compliance purposes</li>
                <li data-testid="text-retention-3"><strong className="text-foreground">Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
                <li data-testid="text-retention-4"><strong className="text-foreground">Website Analytics:</strong> Anonymized after 26 months</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Third-Party Links */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-third-party">Third-Party Websites</h2>
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              <p data-testid="text-third-party">
                Our website may contain links to third-party websites, including HP's official website and support resources. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Children's Privacy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-children">Children's Privacy</h2>
          <Card className="border-destructive/50">
            <CardContent className="p-8 text-muted-foreground">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p data-testid="text-children-policy">
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* California Privacy Rights */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-california">California Privacy Rights (CCPA)</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-california-intro">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-california-1">Right to know what personal information we collect and how we use it</li>
                <li data-testid="text-california-2">Right to request deletion of your personal information</li>
                <li data-testid="text-california-3">Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li data-testid="text-california-4">Right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="mt-4" data-testid="text-california-contact">
                To exercise these rights, contact us at <a href="mailto:support@injetproguide.com" className="text-primary hover:underline" data-testid="link-email-california">support@injetproguide.com</a>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* International Users */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-international">International Users</h2>
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p data-testid="text-international-policy">
                    InjetProGuide operates exclusively within the United States and serves US customers only. Our services, website, and data storage are based in the United States. By using our services, you consent to the transfer and processing of your information in the United States in accordance with this Privacy Policy and US law.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Changes to Privacy Policy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-policy-changes">Changes to This Privacy Policy</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-changes-1">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-changes-2">Posting the updated policy on this page with a new "Last Updated" date</li>
                <li data-testid="text-changes-3">Sending an email notification to registered users</li>
                <li data-testid="text-changes-4">Displaying a prominent notice on our website</li>
              </ul>
              <p className="mt-4" data-testid="text-changes-5">
                Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Us */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-contact-privacy">Contact Us</h2>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6" data-testid="text-contact-intro">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-email-contact">Email</h3>
                    <a href="mailto:support@injetproguide.com" className="text-primary hover:underline" data-testid="link-email-contact">
                      support@injetproguide.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">For privacy-related inquiries</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-phone-contact">Phone</h3>
                    <a href="tel:+18884674377" className="text-primary hover:underline" data-testid="link-phone-contact">
                      1-888-467-4377
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
            <h3 className="text-xl font-semibold mb-4" data-testid="heading-additional-resources">
              Additional Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
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
              <Link href="/about">
                <Button variant="outline" className="w-full justify-start h-auto py-3" data-testid="button-about-us">
                  <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-left">About Us</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
