import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Database, 
  Globe, 
  Mail, 
  FileText, 
  AlertCircle,
  Clock,
  Share2,
  Cookie,
  Baby,
  Bell,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Scale,
  UserCheck,
  ShieldCheck,
  CalendarDays,
  RefreshCw,
  Server,
  CreditCard,
  Truck,
  BarChart3,
  Megaphone,
  Gavel,
  HandHeart,
  Ban,
  Settings,
  ScrollText
} from "lucide-react";
import { useEffect, useState } from "react";
import { SEOHead } from "@/components/SEOHead";

const sections = [
  { id: "introduction", title: "Introduction", icon: FileText },
  { id: "information-we-collect", title: "Information We Collect", icon: Database },
  { id: "how-we-collect", title: "How We Collect Information", icon: Users },
  { id: "how-we-use", title: "How We Use Your Information", icon: Settings },
  { id: "who-we-share", title: "Who We Share Data With", icon: Share2 },
  { id: "data-retention", title: "Data Retention", icon: Clock },
  { id: "california-rights", title: "Your California Privacy Rights", icon: Scale },
  { id: "do-not-sell", title: "Do Not Sell or Share", icon: Ban },
  { id: "cookies", title: "Cookies and Tracking", icon: Cookie },
  { id: "children", title: "Children's Privacy", icon: Baby },
  { id: "security", title: "Data Security", icon: Lock },
  { id: "changes", title: "Changes to This Policy", icon: RefreshCw },
  { id: "contact", title: "Contact Us", icon: Mail },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="privacy-policy" fallbackTitle="Privacy Policy | InkjetProGuide" />
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-privacy-policy">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-policy-subtitle">
              Your privacy is important to us. This comprehensive privacy policy explains how InkjetProGuide collects, uses, discloses, and safeguards your personal information in compliance with the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
              <CalendarDays className="w-5 h-5" />
              <p className="text-sm font-medium" data-testid="text-last-updated">
                Last Updated: January 9, 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 z-50">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-primary" />
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="space-y-1">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left ${
                            activeSection === section.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover-elevate"
                          }`}
                          data-testid={`nav-${section.id}`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          <main className="flex-1 space-y-8">
            <section id="introduction">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <FileText className="w-7 h-7 text-primary" />
                    1. Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-intro-1">
                    InkjetProGuide is an independent online retailer serving customers in the United States. We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, make a purchase, create an account, or otherwise interact with our services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-intro-2">
                    This Privacy Policy applies to all information collected through our website (inkjetproguide.com), as well as any related services, sales, marketing, or events conducted by InkjetProGuide. We have carefully designed this policy to be transparent about our data practices and to give you meaningful control over your personal information. By accessing or using our website, placing an order, creating an account, subscribing to our newsletter, or contacting us, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. If you do not agree with our policies and practices, please discontinue use of our services immediately. We encourage you to review this policy periodically, as we may update it from time to time to reflect changes in our practices, legal requirements, or industry standards.
                  </p>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-intro-3">
                    This Privacy Policy was last updated on January 9, 2026. The effective date listed above indicates when this policy became effective. We maintain historical versions of our privacy policies and will provide copies upon request. Our commitment to your privacy extends beyond mere compliance with applicable laws; we strive to earn and maintain your trust through transparent communication and responsible data stewardship. If you have any questions about this Privacy Policy or our data practices, please contact us using the information provided in the "Contact Us" section at the end of this document. We value your feedback and are committed to addressing any concerns you may have about how we handle your personal information.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-md mt-4">
                    <p className="text-sm text-muted-foreground" data-testid="text-business-info">
                      <strong className="text-foreground">Corporate Mailing Address:</strong><br />
                      InkjetProGuide<br />
                      2704 Handley Ederville Rd<br />
                      Fort Worth, TX 76118<br />
                      United States
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="information-we-collect">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Database className="w-7 h-7 text-primary" />
                    2. Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-collect-intro">
                    In accordance with the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), we provide you with detailed information about the categories of personal information we collect. Understanding what information we gather helps you make informed decisions about your privacy. We collect information that you provide directly to us, information we collect automatically when you use our services, and information we receive from third-party sources. The specific categories of personal information we have collected from consumers within the last twelve months include the following:
                  </p>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <UserCheck className="w-5 h-5 text-primary" />
                        Identifiers
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-identifiers">
                        We collect personal identifiers including your full legal name, email address, phone number, shipping address, billing address, and Internet Protocol (IP) address. When you create an account, we store your username and securely encrypted password. For order processing, we collect the name of the recipient if different from the purchaser. We may also collect unique personal identifiers assigned by our systems, such as customer ID numbers, order numbers, and account identifiers. These identifiers are essential for providing our services, processing your orders, communicating with you about your purchases, and maintaining accurate records of our business transactions. IP addresses are collected automatically when you visit our website and help us understand general geographic patterns of our visitors, detect and prevent fraudulent activity, and troubleshoot technical issues.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Commercial Information
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-commercial">
                        We maintain records of your commercial activities on our website, including your complete purchase history, products or services you have considered purchasing, products you have viewed or added to your shopping cart, wishlist contents, and any items you have reviewed or rated. This commercial information includes details such as product names, quantities purchased, prices paid, dates of transactions, order statuses, and return or exchange history. We also track your browsing patterns on our product pages, which products you compare, and how you navigate through our catalog. This information helps us personalize your shopping experience, provide relevant product recommendations, understand customer preferences, improve our inventory management, and ensure we stock the products our customers want. Your purchase history also enables us to assist with past orders and honor warranty claims.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Globe className="w-5 h-5 text-primary" />
                        Internet or Network Activity Information
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-internet">
                        We automatically collect information about your internet and network activity when you visit our website. This includes your browsing history on our site, search queries you enter on our website, information about your interactions with our pages, links you click, pages you view, and the duration of your visits. We also collect device information such as your browser type and version, operating system, screen resolution, device type (desktop, tablet, or mobile), and device identifiers. Network information includes your internet service provider, connection speed, and referring website (the site that directed you to us). We may collect information about your interactions with our emails, including whether you opened an email, clicked on links, and what time you engaged with our communications. This data helps us understand how visitors use our website, identify popular products and content, optimize our site performance, and improve user experience.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        Geolocation Data
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-geolocation">
                        We collect approximate geographic location information derived from your IP address. This geolocation data typically identifies your general location at the city, state, or regional level, but does not pinpoint your precise physical location. We use this information to provide location-appropriate services, such as displaying accurate shipping costs and estimated delivery times, ensuring compliance with regional regulations, detecting potentially fraudulent orders, and customizing content based on your general location. We do not collect precise GPS coordinates or track your real-time location through mobile device sensors. The geolocation information we collect is limited to what can be reasonably inferred from standard internet connection data and the shipping addresses you provide for order fulfillment. This data helps us serve you better while respecting your privacy and avoiding unnecessarily intrusive location tracking practices.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Payment Information
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-payment">
                        Payment information is collected and processed securely through our third-party payment processor, Stripe. We do not store, process, or have access to your complete credit card numbers, debit card numbers, or bank account information on our servers. When you make a purchase, your payment card data is transmitted directly to Stripe using industry-standard encryption protocols. Stripe processes your payment and returns only limited transaction information to us, including the last four digits of your card number (for your reference and verification purposes), card type (Visa, Mastercard, etc.), expiration status, billing address verification results, and transaction authorization codes. We maintain records of transaction amounts, dates, and payment statuses for order fulfillment and accounting purposes. Stripe is PCI-DSS Level 1 compliant, the highest level of certification available in the payments industry, ensuring your financial information is handled with the utmost security. For Cash on Delivery orders, we collect only delivery address and contact information necessary for order fulfillment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="how-we-collect">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Users className="w-7 h-7 text-primary" />
                    3. How We Collect Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-how-collect-intro">
                    We collect personal information through various methods and sources. Understanding how we gather your data helps you make informed choices about the information you share with us. We are transparent about our collection practices and only gather information necessary to provide our services, improve your experience, and comply with legal obligations. The following describes the primary methods through which we collect personal information:
                  </p>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <UserCheck className="w-5 h-5 text-primary" />
                        Information You Provide Directly
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-direct-collection">
                        We collect information that you voluntarily provide to us through various interactions with our website and services. When you create a customer account, we collect your name, email address, and password. During the checkout process, whether as a registered user or guest, we collect your shipping address, billing address, phone number, and payment details. When you contact us via email, phone, or our contact form, we collect the information you provide in your communications, including your inquiry details and any attachments you send. If you subscribe to our newsletter or marketing communications, we collect your email address and any preferences you specify. When you leave product reviews or ratings, we collect the content of your review, your rating, and your display name. Participation in surveys, contests, or promotions may require additional information such as demographic data or responses to survey questions. All directly provided information is collected with your knowledge and consent at the time of submission.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Cookie className="w-5 h-5 text-primary" />
                        Automatically Collected Information
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-auto-collection">
                        When you access our website, certain information is collected automatically through cookies, pixel tags, web beacons, and similar tracking technologies. Cookies are small data files stored on your device that help us recognize your browser and remember your preferences. We use session cookies that expire when you close your browser and persistent cookies that remain on your device for a set period. Pixel tags and web beacons are tiny graphic images embedded in web pages or emails that help us track page views and email engagement. Our analytics tools automatically collect information about your browsing behavior, including pages visited, time spent on each page, navigation paths, scroll depth, and click patterns. We also automatically collect technical information about your device and internet connection, including your IP address, browser type and version, operating system, screen resolution, device identifiers, and language preferences. This automated collection enables us to maintain website functionality, analyze site performance, personalize your experience, and detect security threats.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Share2 className="w-5 h-5 text-primary" />
                        Information from Third Parties
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-third-party-collection">
                        We may receive personal information about you from third-party sources and combine it with information we collect directly. Our payment processor, Stripe, provides us with transaction verification information, fraud risk assessments, and limited payment details necessary for order processing. Shipping carriers share delivery status updates, confirmation of delivery, and any exception notifications related to your orders. If you are referred to our website through an affiliate or partner, we may receive referral information indicating the source of your visit. Analytics providers supply aggregated and anonymized usage data that helps us understand website traffic patterns and user behavior trends. Marketing partners may provide information about your interests or demographics if you have consented to such sharing with those partners. We may also receive information from business partners in connection with co-branded services or promotions you choose to participate in. All third-party data is handled in accordance with applicable privacy laws and integrated with appropriate safeguards to protect your privacy rights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="how-we-use">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Settings className="w-7 h-7 text-primary" />
                    4. How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-use-intro">
                    We use the personal information we collect for specific, legitimate business purposes that support our operations and serve your interests as a customer. Our use of your data is limited to what is necessary to achieve these purposes, and we do not use your information in ways that are incompatible with the purposes for which it was collected. The following describes the primary ways we use your personal information:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Truck className="w-5 h-5 text-primary" />
                        Order Fulfillment & Order Inquiries
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-use-orders">
                        We use your personal information to process and fulfill your orders, including verifying your identity and payment, arranging shipping and delivery, sending order confirmations and shipping notifications, and handling returns, exchanges, and refunds. Your contact information enables us to communicate about order status, delivery issues, or product-related matters. We use your purchase history to answer questions about past orders and assist with warranty claims or product issues. Our team accesses your account information to resolve inquiries efficiently and provide personalized responses tailored to your specific situation and order history.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <UserCheck className="w-5 h-5 text-primary" />
                        Account Management
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-use-account">
                        Your personal information is essential for creating and managing your customer account. We use your credentials to authenticate your identity when you log in, protect your account from unauthorized access, and maintain the security of your personal information. Your account stores your preferences, addresses, payment methods (securely tokenized), order history, wishlist, and other personalized settings. We use this information to provide a seamless, personalized shopping experience across sessions and devices. Account management also includes sending you important notifications about changes to your account, security alerts, and password reset information.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Megaphone className="w-5 h-5 text-primary" />
                        Marketing Communications
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-use-marketing">
                        With your consent, we use your email address and preferences to send you marketing communications about new products, special promotions, exclusive discounts, and relevant updates. We may personalize these communications based on your purchase history, browsing behavior, and stated interests to ensure the content is relevant and valuable to you. You have the right to opt out of marketing communications at any time, and we respect your preferences immediately. We maintain separate consent for different types of marketing communications, allowing you to choose what you want to receive. Marketing activities comply with CAN-SPAM regulations and other applicable laws.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Website Improvement & Analytics
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-use-analytics">
                        We analyze usage data to understand how visitors interact with our website, identify popular products and content, optimize site navigation and user experience, and improve overall website performance. Analytics help us identify technical issues, test new features, and make data-driven decisions about site improvements. We use aggregated and anonymized data for trend analysis, market research, and business planning. This information helps us serve you better by ensuring our website is fast, reliable, and easy to use, and by stocking products that meet customer demand.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Fraud Prevention & Security
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-use-security">
                        We use personal information to detect, prevent, and investigate fraudulent transactions, security breaches, and other harmful activities. This includes analyzing order patterns, verifying payment information, confirming shipping addresses, and monitoring for suspicious account activity. We may use IP addresses, device fingerprints, and behavioral data to identify potential fraud risks and protect both our customers and our business. Security monitoring helps us maintain the integrity of our website and protect customer data from unauthorized access or misuse.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Gavel className="w-5 h-5 text-primary" />
                        Legal Compliance
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-use-legal">
                        We use personal information to comply with applicable laws, regulations, and legal obligations. This includes maintaining records for tax purposes, responding to lawful requests from government authorities, enforcing our Terms and Conditions, and protecting our legal rights and interests. We may process data to comply with court orders, subpoenas, or other legal processes. Legal compliance also includes meeting our obligations under consumer protection laws, privacy regulations including CCPA/CPRA, and industry standards applicable to e-commerce operations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="who-we-share">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Share2 className="w-7 h-7 text-primary" />
                    5. Who We Share Data With
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-share-intro">
                    We value your privacy and do not sell your personal information to third parties for monetary compensation. However, to operate our business and provide you with our services, we share certain personal information with trusted service providers and partners who assist us in delivering our products and services. These third parties are contractually obligated to protect your information and use it only for the specific purposes we authorize. The following describes the categories of third parties with whom we share personal information:
                  </p>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Payment Processors
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-share-payment">
                        We share your payment information with our payment processor, Stripe, to facilitate secure transaction processing for your purchases. Stripe receives your payment card details, billing address, and transaction information directly during checkout. They use this information to authorize and process payments, detect and prevent fraud, and comply with payment network regulations. Stripe maintains PCI-DSS Level 1 compliance, the highest security standard in the payment card industry. We do not store complete payment card information on our own servers. Stripe may also collect additional fraud prevention data as part of their security protocols. Their use of your data is governed by their own privacy policy, and we encourage you to review it at stripe.com/privacy.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Truck className="w-5 h-5 text-primary" />
                        Shipping Carriers
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-share-shipping">
                        We share your shipping information with carrier partners to fulfill and deliver your orders. This includes your name, delivery address, phone number, and order details necessary for successful delivery. Shipping carriers use this information to create shipping labels, plan delivery routes, provide tracking information, and contact you regarding delivery issues or special instructions. Our carrier partners may include major services such as USPS, UPS, FedEx, and DHL, depending on your location and shipping preferences. Carriers maintain their own privacy practices and are required to protect your information and use it only for delivery purposes. We may also receive tracking updates and delivery confirmations from carriers, which we use to update your order status and resolve any delivery issues.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Analytics Providers
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-share-analytics">
                        We use third-party analytics services to help us understand how visitors use our website and improve our online experience. These providers collect information about your interactions with our site, including pages viewed, navigation paths, time on site, and technical data about your device and connection. Analytics data is typically collected using cookies and similar technologies. We use this information in aggregated, anonymized form to analyze trends, optimize website performance, and make informed business decisions. Our analytics partners are required to handle data in accordance with applicable privacy laws and maintain appropriate security measures. We do not share personally identifiable information with analytics providers beyond what is automatically collected through standard tracking technologies.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Megaphone className="w-5 h-5 text-primary" />
                        Marketing Platforms
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-share-marketing">
                        With your consent, we may share your information with marketing platforms to deliver personalized advertising and promotional communications. This includes email marketing services that help us send newsletters and promotional offers, as well as advertising platforms that enable us to show you relevant ads on other websites. You can control marketing communications through your account settings and opt-out links in our emails. We only share information with marketing partners when you have provided appropriate consent, and we honor your opt-out requests promptly. Marketing platforms are contractually required to use your information only for the marketing purposes we specify and to maintain appropriate data protection measures.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Gavel className="w-5 h-5 text-primary" />
                        Law Enforcement and Legal Authorities
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-share-legal">
                        We may disclose personal information when we believe disclosure is necessary to comply with applicable laws, regulations, court orders, subpoenas, or other legal processes. We may also share information to respond to lawful requests from government authorities, including law enforcement agencies and national security or intelligence agencies. Additionally, we may disclose information to protect and defend the rights, property, or safety of InkjetProGuide, our customers, or the public. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction. We carefully evaluate all legal requests and disclose only the minimum information necessary to satisfy our legal obligations while protecting your privacy interests to the greatest extent possible.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="data-retention">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Clock className="w-7 h-7 text-primary" />
                    6. Data Retention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-retention-intro">
                    We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements. Different categories of data are subject to different retention periods based on legal requirements, business needs, and privacy best practices. When personal information is no longer needed, we securely delete or anonymize it in accordance with our data retention policies. The following outlines our specific retention practices for different types of information:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Order Records</h3>
                          <p className="text-sm text-primary font-medium">7 Years</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-retention-orders">
                        We retain complete order records, including purchase details, transaction history, shipping information, and related communications, for seven (7) years from the date of transaction. This retention period is required to comply with tax laws, accounting standards, and legal requirements for financial record-keeping. Order records help us assist with warranty claims, process returns or exchanges, and respond to legal inquiries. After seven years, order records are securely deleted or fully anonymized for aggregate statistical purposes.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Account Data</h3>
                          <p className="text-sm text-primary font-medium">Until Deletion Requested</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-retention-account">
                        Your account information, including your profile details, saved addresses, preferences, and wishlist, is retained for as long as your account remains active. You may request deletion of your account at any time by contacting us or using the account deletion feature in your account settings. Upon receiving a valid deletion request, we will delete or anonymize your account data within 45 days, except for information we are required to retain for legal, tax, or fraud prevention purposes. Deleted accounts cannot be recovered.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Analytics Data</h3>
                          <p className="text-sm text-primary font-medium">26 Months</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-retention-analytics">
                        Website analytics data, including browsing behavior, session information, and usage patterns, is retained for twenty-six (26) months from the date of collection. This retention period allows us to analyze long-term trends, seasonal patterns, and year-over-year comparisons that help us improve our website and services. After 26 months, analytics data is permanently deleted or aggregated into anonymous statistical summaries that cannot be linked to individual users. You can opt out of analytics tracking through your browser settings or cookie preferences.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Marketing Data</h3>
                          <p className="text-sm text-primary font-medium">Until Unsubscribe</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-retention-marketing">
                        Your email address and marketing preferences are retained for as long as you remain subscribed to our marketing communications. When you unsubscribe, we will stop sending you marketing emails immediately and will delete your marketing preferences within 30 days. However, we maintain a suppression list of unsubscribed email addresses to ensure we do not accidentally re-add you to our marketing list. You may also request complete deletion of your email address from our systems, which will remove you from both active and suppression lists.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="california-rights">
              <Card className="border-primary/50">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Scale className="w-7 h-7 text-primary" />
                    7. Your California Privacy Rights (CCPA/CPRA)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-ccpa-intro">
                    If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) provide you with specific rights regarding your personal information. These rights empower you to understand and control how your data is collected, used, and shared. InkjetProGuide is committed to honoring these rights and providing you with transparent information about our data practices. Below is a comprehensive description of your California privacy rights and how to exercise them:
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Right to Know
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-right-know">
                        You have the right to request that we disclose the categories of personal information we have collected about you, the categories of sources from which we collected the information, our business or commercial purposes for collecting or selling the information, the categories of third parties with whom we share personal information, and the specific pieces of personal information we have collected about you. You may request this information for the 12-month period preceding your request. We will provide this information in a readily usable format that allows you to transmit the information to another entity.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-primary" />
                        Right to Delete
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-right-delete">
                        You have the right to request that we delete personal information we have collected from you, subject to certain exceptions. Upon receiving a verified deletion request, we will delete your personal information from our records and direct our service providers to delete your information as well. However, we may retain certain information when necessary to complete a transaction, detect security incidents, debug or repair errors, exercise free speech rights, comply with legal obligations, or conduct internal research. We will inform you if any exceptions apply to your deletion request.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Right to Correct
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-right-correct">
                        You have the right to request that we correct inaccurate personal information we maintain about you. Upon receiving a verified request to correct inaccurate information, we will use commercially reasonable efforts to correct the information, taking into account the nature of the personal information and the purposes for which we process it. You may also update certain information directly through your account settings, such as your name, email address, shipping addresses, and communication preferences.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <Ban className="w-5 h-5 text-primary" />
                        Right to Opt-Out of Sale or Sharing
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-right-optout">
                        You have the right to opt out of the "sale" or "sharing" of your personal information as those terms are defined under CCPA/CPRA. While we do not sell personal information for monetary compensation, certain data sharing activities may constitute a "sale" or "sharing" under California law. You can exercise your right to opt out by clicking the "Do Not Sell or Share My Personal Information" link on our website, contacting us at inkjetproguide@outlook.com, or adjusting your cookie preferences to disable non-essential tracking.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Right to Limit Use of Sensitive Personal Information
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-right-limit">
                        You have the right to limit our use of sensitive personal information to purposes necessary for providing goods or services. Sensitive personal information includes precise geolocation data, racial or ethnic origin, religious beliefs, union membership, personal health information, sexual orientation, and similar categories. We collect limited sensitive personal information (primarily precise billing addresses for payment verification) and use it only for purposes necessary to fulfill your orders and prevent fraud. You may request that we limit our use of sensitive personal information at any time.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4 py-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <HandHeart className="w-5 h-5 text-primary" />
                        Right to Non-Discrimination
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-right-nondiscrimination">
                        We will not discriminate against you for exercising any of your CCPA/CPRA rights. This means we will not deny you goods or services, charge you different prices or rates, provide you with a different level or quality of goods or services, or suggest that you may receive a different price or rate or different level or quality of goods or services because you exercised your privacy rights. You are entitled to the same quality of service and pricing regardless of whether you exercise your California privacy rights.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-foreground mb-4" data-testid="heading-exercise-rights">
                      How to Exercise Your Rights
                    </h3>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <p data-testid="text-exercise-email">
                        <strong className="text-foreground">Email:</strong> Submit your request to <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline">inkjetproguide@outlook.com</a> with the subject line "CCPA Request" and include your full name, email address associated with your account, and a description of your request.
                      </p>
                      <p data-testid="text-exercise-verification">
                        <strong className="text-foreground">Verification Process:</strong> To protect your privacy, we will verify your identity before fulfilling your request. We use a two-step verification process that may include confirming your email address and providing additional information to match your request with our records. If we cannot verify your identity, we may request additional information or deny the request.
                      </p>
                      <p data-testid="text-exercise-timeline">
                        <strong className="text-foreground">Response Timeline:</strong> We will respond to verifiable consumer requests within 45 calendar days of receipt. If we require more time (up to 90 days total), we will inform you of the reason and extension period in writing. If we cannot fulfill your request, we will explain why.
                      </p>
                      <p data-testid="text-exercise-agents">
                        <strong className="text-foreground">Authorized Agents:</strong> You may designate an authorized agent to submit requests on your behalf. We require that authorized agents submit written proof of authorization signed by you, along with verification of the agent's identity. We may also contact you directly to verify the authorization.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="do-not-sell">
              <Card className="border-destructive/50">
                <CardHeader className="bg-destructive/5">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Ban className="w-7 h-7 text-destructive" />
                    8. Do Not Sell or Share My Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2" data-testid="heading-no-sell">
                        Our Commitment: We Do Not Sell Your Personal Information
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid="text-no-sell-statement">
                        InkjetProGuide does not sell your personal information for monetary or other valuable consideration. We have not sold personal information in the preceding 12 months and do not have plans to sell personal information in the future. Your data is not a product that we monetize through third-party sales, and we are committed to protecting your privacy by keeping your personal information under our control and using it only for the purposes described in this Privacy Policy.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground" data-testid="heading-sharing-practices">
                      Understanding "Sharing" Under California Law
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid="text-sharing-explanation">
                      Under the CCPA/CPRA, "sharing" has a specific legal definition that may include certain cross-context behavioral advertising activities, even when no money changes hands. While we do not sell your information, we may "share" certain data with advertising partners in ways that could be considered "sharing" under California law. This includes using cookies and similar technologies that allow advertising partners to collect information about your browsing activity to show you relevant advertisements on other websites. You have the right to opt out of this sharing at any time, and we provide multiple mechanisms for you to exercise this right.
                    </p>

                    <h3 className="font-semibold text-foreground" data-testid="heading-how-to-optout">
                      How to Opt Out of Data Sharing
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid="text-optout-methods">
                      You can opt out of the sharing of your personal information for cross-context behavioral advertising through the following methods:
                    </p>
                    <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                      <li data-testid="text-optout-method-1"><strong className="text-foreground">Email Request:</strong> Send an email to <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline">inkjetproguide@outlook.com</a> with the subject "Do Not Sell or Share My Data" and include your name and email address associated with your account.</li>
                      <li data-testid="text-optout-method-2"><strong className="text-foreground">Cookie Settings:</strong> Adjust your browser settings to reject non-essential cookies, or use our cookie preference center to disable marketing and advertising cookies.</li>
                      <li data-testid="text-optout-method-3"><strong className="text-foreground">Global Privacy Control (GPC):</strong> We honor Global Privacy Control signals sent by your browser. If your browser is configured to send a GPC signal, we will treat this as a valid opt-out request for data sharing.</li>
                      <li data-testid="text-optout-method-4"><strong className="text-foreground">Industry Opt-Out Tools:</strong> Visit the Digital Advertising Alliance's opt-out page at <a href="https://optout.aboutads.info" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">optout.aboutads.info</a> to opt out of personalized advertising from participating companies.</li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed" data-testid="text-optout-processing">
                      We will process your opt-out request within 15 business days and will not share your personal information for cross-context behavioral advertising purposes going forward. Please note that opting out of data sharing does not opt you out of all advertising; you may still see generic advertisements that are not personalized based on your browsing behavior. Additionally, opting out on one device or browser does not automatically opt you out on other devices or browsers—you will need to submit opt-out requests for each device and browser you use.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="cookies">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Cookie className="w-7 h-7 text-primary" />
                    9. Cookies and Tracking Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-cookies-intro">
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, understand user preferences, and deliver relevant content and advertisements. Cookies are small text files that are placed on your device when you visit our website. They allow us to recognize your browser, remember your preferences, and provide a more personalized experience. This section explains the types of cookies we use and how you can manage your cookie preferences.
                  </p>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Essential Cookies (Required)
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-cookies-essential">
                        Essential cookies are strictly necessary for our website to function properly. They enable core functionality such as user authentication, shopping cart management, security features, and remembering your cookie preferences. Without these cookies, the website cannot function properly, and certain features would be unavailable. Essential cookies do not collect personal information for marketing purposes and cannot be disabled without significantly impacting your ability to use our website. Examples include session cookies that maintain your login state and security cookies that prevent cross-site request forgery attacks.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Analytics Cookies (Optional)
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-cookies-analytics">
                        Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. These cookies track metrics such as page views, session duration, bounce rates, and navigation paths. We use analytics data to identify popular content, understand user behavior, diagnose technical problems, and improve website performance. Analytics cookies may be provided by third-party services that aggregate data across multiple websites. You can opt out of analytics cookies through your browser settings or our cookie preference center without affecting your ability to browse and shop on our website.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Megaphone className="w-5 h-5 text-orange-600" />
                        Marketing Cookies (Optional)
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-cookies-marketing">
                        Marketing cookies are used to track visitors across websites and display advertisements that are relevant and engaging for individual users. These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads on other sites. Marketing cookies also help us measure the effectiveness of our advertising campaigns and understand which ads lead to purchases. You can opt out of marketing cookies at any time through your browser settings, our cookie preference center, or industry opt-out tools. Opting out of marketing cookies will not reduce the number of ads you see, but the ads may be less relevant to your interests.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-3" data-testid="heading-manage-cookies">
                      How to Manage Cookies
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid="text-manage-cookies">
                      Most web browsers allow you to control cookies through their settings. You can configure your browser to block all cookies, accept only certain cookies, or notify you when a cookie is set. However, blocking all cookies may prevent you from accessing certain features of our website, such as the shopping cart and checkout process. Instructions for managing cookies vary by browser; please consult your browser's help documentation for specific guidance.
                    </p>
                    <h3 className="font-semibold text-foreground mb-3" data-testid="heading-dnt">
                      Do Not Track Signals
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-dnt">
                      Our website responds to Do Not Track (DNT) signals and Global Privacy Control (GPC) signals. When we detect a DNT or GPC signal from your browser, we will disable non-essential tracking and treat the signal as a valid opt-out request for data sharing under CCPA/CPRA. Please note that some browser extensions and privacy tools may send these signals automatically.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="children">
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Baby className="w-7 h-7 text-primary" />
                    10. Children's Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2" data-testid="heading-children-notice">
                        Important Notice Regarding Children Under 13
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid="text-children-policy">
                        Our website and services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13 years of age. In compliance with the Children's Online Privacy Protection Act (COPPA), we require that all users be at least 13 years old to create an account or make a purchase. If you are under 13, please do not use our website, create an account, or provide any personal information to us, including your name, address, email address, or phone number. We do not knowingly collect, use, or disclose personal information from children under 13 without verifiable parental consent.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed" data-testid="text-children-discovery">
                    If we discover that we have inadvertently collected personal information from a child under 13, we will promptly delete that information from our systems. If you are a parent or guardian and believe that your child under 13 has provided us with personal information without your consent, please contact us immediately at <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline">inkjetproguide@outlook.com</a>. We will take immediate steps to remove the child's information from our records and ensure that no further data is collected. We encourage parents and guardians to monitor their children's online activities and to help enforce this policy by instructing their children never to provide personal information on our website without parental permission.
                  </p>

                  <p className="text-muted-foreground leading-relaxed" data-testid="text-children-teens">
                    For users between the ages of 13 and 18, we recommend that parents or guardians review this Privacy Policy with their teenagers and supervise their online activities. While teenagers may use our website, they should do so with appropriate parental guidance, especially when making purchases or providing personal information. We encourage families to discuss online privacy and safety, and we welcome any questions or concerns from parents about our data practices.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="security">
              <Card className="border-primary/50">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Lock className="w-7 h-7 text-primary" />
                    11. Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-security-intro">
                    We take the security of your personal information seriously and implement appropriate technical, administrative, and physical safeguards to protect your data from unauthorized access, alteration, disclosure, or destruction. Our security measures are designed to provide a level of security appropriate to the risk of processing your personal information and to comply with industry standards and best practices. While no method of transmission over the internet or electronic storage is 100% secure, we continuously work to protect your personal information using the following measures:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Server className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold text-foreground">Encryption</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-security-encryption">
                        We use SSL/TLS encryption for all data transmission between your browser and our servers. This ensures that your personal information, including payment details and login credentials, is encrypted during transit and cannot be intercepted by unauthorized parties. Our database connections are also encrypted, and sensitive data is encrypted at rest using industry-standard AES-256 encryption algorithms.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold text-foreground">PCI Compliance</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-security-pci">
                        Payment card processing is handled by Stripe, a PCI-DSS Level 1 certified payment processor. This is the highest level of certification available in the payments industry. We do not store, process, or have access to your complete credit card numbers on our servers. Payment data is transmitted directly to Stripe using their secure API, ensuring that your financial information is protected by the most rigorous security standards.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Lock className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold text-foreground">Password Security</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-security-password">
                        User passwords are hashed using bcrypt, a strong one-way hashing algorithm, before being stored in our database. This means that even if our database were compromised, your actual password would not be exposed. We never store passwords in plain text, and our employees do not have access to your password. We also implement account lockout policies to prevent brute-force attacks.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold text-foreground">Access Controls</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-security-access">
                        Access to personal information is restricted to authorized employees, contractors, and agents who need the information to perform their duties. We maintain role-based access controls and regularly audit access privileges to ensure that only necessary personnel can access sensitive data. All personnel with access to personal information are subject to confidentiality obligations and receive regular privacy and security training.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground" data-testid="text-security-disclaimer">
                      <strong className="text-foreground">Security Disclaimer:</strong> While we implement robust security measures, no system is completely impenetrable. We cannot guarantee the absolute security of your information transmitted to our website. Any transmission of personal information is at your own risk. We are not responsible for the circumvention of any privacy settings or security measures we implement. If you believe your account has been compromised, please contact us immediately at <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline">inkjetproguide@outlook.com</a>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="changes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <RefreshCw className="w-7 h-7 text-primary" />
                    12. Changes to This Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-changes-intro">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, industry standards, or business operations. We are committed to notifying you of significant changes to our privacy practices and giving you the opportunity to review and understand any modifications. The date at the top of this Privacy Policy indicates when it was last updated. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                  </p>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                      <Bell className="w-5 h-5 text-primary" />
                      How We Notify You of Changes
                    </h3>
                    <ul className="space-y-2 ml-6 list-disc text-muted-foreground text-sm">
                      <li data-testid="text-changes-notify-1"><strong className="text-foreground">Website Notice:</strong> We will post the updated Privacy Policy on this page with a new "Last Updated" date prominently displayed at the top.</li>
                      <li data-testid="text-changes-notify-2"><strong className="text-foreground">Email Notification:</strong> For significant changes that materially affect your privacy rights, we will send an email notification to registered users at the email address associated with their account.</li>
                      <li data-testid="text-changes-notify-3"><strong className="text-foreground">Website Banner:</strong> We may display a prominent banner on our website alerting visitors to recent changes in our Privacy Policy.</li>
                      <li data-testid="text-changes-notify-4"><strong className="text-foreground">Account Dashboard:</strong> Registered users may receive notifications in their account dashboard about privacy policy updates.</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground leading-relaxed" data-testid="text-changes-effective">
                    Changes to this Privacy Policy become effective when we post the revised policy on our website. For material changes, we will provide at least 30 days' notice before the changes take effect, except where changes are required immediately to comply with legal requirements. Your continued use of our website and services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. If you do not agree with the revised policy, you should discontinue use of our services and may request deletion of your personal information as described in the "Your California Privacy Rights" section.
                  </p>

                  <div className="bg-muted/50 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground" data-testid="text-changes-archive">
                      <strong className="text-foreground">Policy Archive:</strong> We maintain archived versions of previous Privacy Policies. If you would like to request a copy of a previous version of this Privacy Policy, please contact us at <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline">inkjetproguide@outlook.com</a>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="contact">
              <Card className="border-primary">
                <CardHeader className="bg-primary/10">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Mail className="w-7 h-7 text-primary" />
                    13. Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-contact-intro">
                    If you have questions about this Privacy Policy, our data practices, or your privacy rights, we encourage you to contact us. We are committed to addressing your concerns promptly and transparently. Our privacy team is available to assist you with privacy-related inquiries, requests to exercise your California privacy rights, complaints, or feedback about our data protection practices. We value your privacy and take all privacy-related communications seriously.
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <a 
                        href="mailto:inkjetproguide@outlook.com" 
                        className="text-primary hover:underline text-sm"
                        data-testid="link-contact-email"
                      >
                        inkjetproguide@outlook.com
                      </a>
                      <p className="text-xs text-muted-foreground mt-2">For all inquiries</p>
                    </div>

                    <div className="border rounded-lg p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Corporate Mailing Address</h3>
                      <p className="text-sm text-muted-foreground" data-testid="text-contact-address">
                        InkjetProGuide<br />
                        2704 Handley Ederville Rd<br />
                        Fort Worth, TX 76118<br />
                        United States
                      </p>
                    </div>

                    <div className="border rounded-lg p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                      <a 
                        href="tel:+13254008874" 
                        className="text-primary hover:underline text-sm"
                        data-testid="link-contact-phone"
                      >
                        1-325-400-8874
                      </a>
                      <p className="text-xs text-muted-foreground mt-2">Monday - Friday, 9 AM - 5 PM CT</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-3" data-testid="heading-response-time">
                      Response Times
                    </h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li data-testid="text-response-general"><strong className="text-foreground">General Inquiries:</strong> We aim to respond to general privacy inquiries within 5 business days.</li>
                      <li data-testid="text-response-ccpa"><strong className="text-foreground">CCPA/CPRA Requests:</strong> We will acknowledge receipt of verifiable consumer requests within 10 business days and provide a substantive response within 45 calendar days (extendable to 90 days for complex requests).</li>
                      <li data-testid="text-response-complaints"><strong className="text-foreground">Complaints:</strong> We take privacy complaints seriously and will investigate and respond within 30 days.</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground text-sm" data-testid="text-contact-closing">
                    Thank you for taking the time to read our Privacy Policy. Your trust is important to us, and we are committed to protecting your personal information and respecting your privacy rights. If there is anything we can do to better serve your privacy needs, please let us know.
                  </p>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
