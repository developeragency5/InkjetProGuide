import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Scale, 
  FileText, 
  BookOpen, 
  Globe, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  Copyright, 
  AlertTriangle, 
  Shield, 
  Users, 
  Gavel, 
  MessageSquare, 
  Mail, 
  FileEdit, 
  Scissors, 
  FileCheck, 
  Phone,
  MapPin,
  Clock
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";

const sections = [
  { id: "introduction", title: "1. Introduction & Acceptance", icon: FileText },
  { id: "definitions", title: "2. Definitions", icon: BookOpen },
  { id: "use-of-website", title: "3. Use of Website", icon: Globe },
  { id: "products-orders", title: "4. Products and Orders", icon: ShoppingCart },
  { id: "pricing-payment", title: "5. Pricing and Payment", icon: CreditCard },
  { id: "shipping-delivery", title: "6. Shipping and Delivery", icon: Truck },
  { id: "returns-refunds", title: "7. Returns and Refunds", icon: RotateCcw },
  { id: "intellectual-property", title: "8. Intellectual Property", icon: Copyright },
  { id: "disclaimer-warranties", title: "9. Disclaimer of Warranties", icon: AlertTriangle },
  { id: "limitation-liability", title: "10. Limitation of Liability", icon: Shield },
  { id: "indemnification", title: "11. Indemnification", icon: Users },
  { id: "governing-law", title: "12. Governing Law & Jurisdiction", icon: Gavel },
  { id: "dispute-resolution", title: "13. Dispute Resolution", icon: MessageSquare },
  { id: "electronic-communications", title: "14. Electronic Communications", icon: Mail },
  { id: "modifications", title: "15. Modifications to Terms", icon: FileEdit },
  { id: "severability", title: "16. Severability", icon: Scissors },
  { id: "entire-agreement", title: "17. Entire Agreement", icon: FileCheck },
  { id: "contact", title: "18. Contact Information", icon: Phone },
];

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
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
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="terms-conditions" fallbackTitle="Terms & Conditions | InkjetProGuide" />
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scale className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-terms-conditions">
                Terms and Conditions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-terms-subtitle">
              Please read these terms carefully before using our website and services
            </p>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-last-updated">
              Last Updated: January 9, 2026
            </p>
            <p className="text-sm text-muted-foreground mt-2" data-testid="text-business-name">
              InkjetProGuide | Fort Worth, TX
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" data-testid="heading-toc">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Table of Contents
                  </h2>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <nav className="space-y-1">
                      {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                              activeSection === section.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover-elevate"
                            }`}
                            data-testid={`toc-${section.id}`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{section.title}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <section id="introduction" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-introduction">
                    <FileText className="w-7 h-7 text-primary" />
                    1. Introduction and Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p data-testid="text-intro-1">
                      Welcome to InkjetProGuide. These Terms and Conditions ("Terms," "Terms of Service," or "Agreement") constitute a legally binding agreement between you ("User," "Customer," "You," or "Your") and InkjetProGuide ("Company," "We," "Us," or "Our"), governing your access to and use of our website located at inkjetproguide.com (the "Site"), including any content, functionality, products, and services offered on or through the Site. By accessing, browsing, or using our website in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. If you do not agree to all of these Terms, you are expressly prohibited from using the Site and must discontinue use immediately.
                    </p>
                    <p data-testid="text-intro-2">
                      Your use of InkjetProGuide is subject to these Terms, which take effect on the date you first access the Site. We reserve the right to change, modify, add, or remove portions of these Terms at any time without prior notice. It is your responsibility to check these Terms periodically for changes. Your continued use of the Site following the posting of changes will constitute your acceptance of those changes. We may also require you to accept updated or supplemental terms for certain products or services.
                    </p>
                    <p data-testid="text-intro-3">
                      <strong className="text-foreground">Eligibility Requirements:</strong> To use our website and purchase products from InkjetProGuide, you must be at least eighteen (18) years of age and a legal resident of the United States. By using this Site, you represent and warrant that you meet all eligibility requirements. If you are accessing or using the Site on behalf of a business entity, you represent and warrant that you have the authority to bind that entity to these Terms, and that such entity agrees to be bound by these Terms. Users who do not meet these eligibility requirements are prohibited from registering for an account or making purchases.
                    </p>
                    <p data-testid="text-intro-4">
                      <strong className="text-foreground">Account Registration:</strong> To access certain features of the Site, including making purchases, tracking orders, and saving items to a wishlist, you may be required to create an account. When you create an account, you agree to provide accurate, current, and complete information about yourself as prompted by the registration form. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We reserve the right to suspend or terminate your account at any time for any reason, including if we reasonably believe that you have violated these Terms.
                    </p>
                    <p data-testid="text-intro-5">
                      These Terms constitute the entire agreement between you and InkjetProGuide concerning your use of the Site. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. If any provision of these Terms is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of these Terms remain in full force and effect.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="definitions" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-definitions">
                    <BookOpen className="w-7 h-7 text-primary" />
                    2. Definitions
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p data-testid="text-def-intro">
                      For the purposes of these Terms and Conditions, the following definitions shall apply throughout this document and any related agreements, policies, or communications between InkjetProGuide and its users. Understanding these definitions is essential to comprehending your rights and obligations when using our services. These definitions are intended to provide clarity and ensure consistent interpretation of the terms used throughout this Agreement.
                    </p>
                    <div className="space-y-4 mt-6">
                      <div className="p-4 bg-muted/30 rounded-lg" data-testid="def-site">
                        <h3 className="font-semibold text-foreground mb-2">"Site" or "Website"</h3>
                        <p>
                          Refers to the InkjetProGuide website, accessible at inkjetproguide.com, including all web pages, subdomains, content, features, services, and functionality provided through this digital platform. The Site encompasses all aspects of our online presence, including but not limited to our product catalog, shopping cart functionality, checkout process, account management features, order inquiry portals, blog content, educational resources, and any mobile applications or alternative platforms we may develop. The Site is owned and operated by InkjetProGuide and is intended for use by customers and visitors within the United States.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg" data-testid="def-products">
                        <h3 className="font-semibold text-foreground mb-2">"Products"</h3>
                        <p>
                          Refers to all inkjet printers, printer accessories, replacement parts, ink cartridges, paper supplies, cables, connectivity accessories, maintenance kits, and any other physical or digital goods offered for sale through the InkjetProGuide website. Products include items from various manufacturers that we sell as an authorized retailer, as well as any bundled packages, promotional offerings, or refurbished items we may offer. Product descriptions, specifications, and availability are subject to change without notice, and all Products are sold subject to the terms and conditions outlined in this Agreement.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg" data-testid="def-user">
                        <h3 className="font-semibold text-foreground mb-2">"User," "You," or "Your"</h3>
                        <p>
                          Refers to any individual, company, organization, or other legal entity that accesses, browses, uses, or purchases from the InkjetProGuide website. This includes registered account holders, guest checkout users, visitors who browse without making a purchase, and any person who interacts with our Site in any capacity. When you use our Site on behalf of an organization, "You" refers both to you as an individual and to the organization you represent, and you warrant that you have authority to bind that organization to these Terms.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg" data-testid="def-company">
                        <h3 className="font-semibold text-foreground mb-2">"We," "Us," "Our," or "Company"</h3>
                        <p>
                          Refers to InkjetProGuide, a business entity operating from Fort Worth, Texas, United States. This includes our owners, directors, officers, employees, agents, contractors, affiliates, subsidiaries, and any other individuals or entities acting on our behalf in connection with the operation of the Site and the sale of Products. InkjetProGuide operates as an independent online retailer specializing in inkjet printing solutions and is not affiliated with, sponsored by, or endorsed by any printer manufacturers unless expressly stated.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg" data-testid="def-content">
                        <h3 className="font-semibold text-foreground mb-2">"Content"</h3>
                        <p>
                          Refers to all text, graphics, images, photographs, videos, audio clips, data, software, product descriptions, reviews, ratings, comments, and any other materials displayed, uploaded, or transmitted through the Site. Content includes both material created and owned by InkjetProGuide and material submitted by users, including customer reviews, feedback, and communications sent through our contact forms or order inquiries channels.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg" data-testid="def-order">
                        <h3 className="font-semibold text-foreground mb-2">"Order"</h3>
                        <p>
                          Refers to any request to purchase Products submitted through the Site, including all information provided during the checkout process such as shipping address, billing information, payment details, and product selections. An Order is not considered accepted until we send confirmation of shipment; submission of an Order constitutes an offer to purchase, which we may accept or decline at our discretion.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="use-of-website" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-use-website">
                    <Globe className="w-7 h-7 text-primary" />
                    3. Use of Website
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-license">
                      <h3 className="text-lg font-semibold text-foreground mb-3">License to Use</h3>
                      <p className="mb-3">
                        Subject to your compliance with these Terms, InkjetProGuide grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Site for your personal, non-commercial use only. This license does not include any right to resell or make commercial use of the Site or its contents; collect and use any product listings, descriptions, or prices; make any derivative use of the Site or its contents; download, copy, or save account information for the benefit of another merchant; or use any data mining, robots, or similar data gathering and extraction tools.
                      </p>
                      <p>
                        This license is granted solely for the purpose of enabling you to use and enjoy the benefit of the services provided by InkjetProGuide, in the manner permitted by these Terms. You may not copy, modify, distribute, sell, lease, or sublicense any part of our Site or its content. Any use of the Site not expressly permitted by these Terms is a breach of these Terms and may violate copyright, trademark, and other laws. We reserve the right to terminate this license at any time for any reason without notice.
                      </p>
                    </div>
                    <div data-testid="text-prohibited-conduct">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Prohibited Conduct</h3>
                      <p className="mb-3">
                        You agree that you will not engage in any activity that interferes with or disrupts the Site or the servers and networks connected to the Site. You agree not to use the Site for any unlawful purpose or in violation of any local, state, national, or international law. The following activities are strictly prohibited and may result in immediate termination of your access to the Site and potential legal action:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong className="text-foreground">Fraud and Misrepresentation:</strong> Providing false, inaccurate, or misleading information; impersonating another person or entity; using false payment information; or engaging in any deceptive practices.</li>
                        <li><strong className="text-foreground">Unauthorized Access and Hacking:</strong> Attempting to gain unauthorized access to any portion of the Site, other accounts, computer systems, or networks connected to the Site through hacking, password mining, or any other means.</li>
                        <li><strong className="text-foreground">Data Scraping and Harvesting:</strong> Using any automated system, including "robots," "spiders," "offline readers," or similar tools, to access the Site in a manner that sends more request messages to our servers than a human can reasonably produce using a conventional web browser.</li>
                        <li><strong className="text-foreground">Malicious Activities:</strong> Uploading, transmitting, or distributing any computer viruses, worms, Trojan horses, or other malicious code; attempting to interfere with the proper functioning of the Site.</li>
                        <li><strong className="text-foreground">Intellectual Property Violations:</strong> Copying, modifying, or distributing our content without permission; removing any copyright or proprietary notices from our materials.</li>
                      </ul>
                    </div>
                    <div data-testid="text-account-security">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Account Responsibilities and Password Security</h3>
                      <p className="mb-3">
                        You are solely responsible for maintaining the confidentiality of your account login credentials, including your username and password. You agree to accept responsibility for all activities that occur under your account, whether or not you authorized such activities. You should take all necessary steps to ensure that your password is kept confidential and secure, and you should notify us immediately if you have any reason to believe that your password has become known to anyone else or if the password is being or is likely to be used in an unauthorized manner.
                      </p>
                      <p>
                        We recommend using strong, unique passwords that include a combination of uppercase and lowercase letters, numbers, and special characters. You should not use the same password for your InkjetProGuide account that you use for other online services. We will never ask you for your password via email or phone. If you receive such a request, do not respond and contact us immediately. You agree not to share your account with others or allow others to access your account, as you will be held responsible for any actions taken using your credentials.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="products-orders" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-products-orders">
                    <ShoppingCart className="w-7 h-7 text-primary" />
                    4. Products and Orders
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-product-descriptions">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Product Descriptions and Accuracy</h3>
                      <p className="mb-3">
                        We strive to provide accurate and complete product descriptions, specifications, photographs, and pricing information for all Products offered on our Site. However, we do not warrant that product descriptions, photographs, pricing, or other content on the Site is accurate, complete, reliable, current, or error-free. Product images are provided for illustrative purposes only; actual products may vary slightly from the images displayed due to manufacturing variations, photography lighting, monitor settings, and other factors.
                      </p>
                      <p>
                        While we make every effort to ensure the accuracy of product specifications, features, and compatibility information, we recommend that you verify critical specifications with the manufacturer before making a purchase decision. InkjetProGuide is not responsible for typographical errors, inaccuracies, or omissions in product descriptions. If you have questions about a specific product, please contact us before placing your order. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
                      </p>
                    </div>
                    <div data-testid="text-pricing-changes">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Pricing and Error Correction</h3>
                      <p className="mb-3">
                        All prices displayed on the Site are in United States Dollars (USD) and are subject to change without notice. While we make every effort to ensure pricing accuracy, errors may occasionally occur. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price and notify you of the correct price. If the correct price is higher than the listed price, we will give you the option to confirm your order at the correct price or cancel the order for a full refund.
                      </p>
                      <p>
                        Promotional prices, discounts, and special offers are valid only for the time period specified and are subject to availability. We reserve the right to limit quantities, modify promotional terms, or discontinue promotions at any time. Promotional codes must be entered at checkout and cannot be applied retroactively to previously placed orders. We are not responsible for pricing or promotional errors resulting from third-party price aggregators or affiliate websites.
                      </p>
                    </div>
                    <div data-testid="text-order-acceptance">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Order Acceptance and Refusal</h3>
                      <p className="mb-3">
                        Your submission of an order constitutes an offer to purchase the Products listed in your order, subject to these Terms. We reserve the right, at our sole discretion, to accept, decline, or limit any order for any reason, including but not limited to: product unavailability, errors in product or pricing information, suspected fraudulent activity, orders that appear to be for resale purposes, orders that exceed our stated quantity limits, or inability to verify your identity or payment information.
                      </p>
                      <p>
                        Order confirmation emails are sent as a courtesy and do not constitute acceptance of your order. Your order is not accepted until we ship your Products and send you a shipping confirmation email. We may verify information provided with your order before acceptance, and processing times may vary accordingly. If we cancel your order after you have been charged, we will process a full refund to your original payment method within five to seven business days.
                      </p>
                    </div>
                    <div data-testid="text-order-cancellation">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Order Cancellation and Inventory</h3>
                      <p className="mb-3">
                        You may request to cancel your order at any time before shipment by contacting us. Once an order has been shipped, it cannot be canceled and must be processed as a return according to our Return Policy. We will make every effort to accommodate cancellation requests, but we cannot guarantee that orders will be canceled before processing and shipment, particularly during high-volume periods.
                      </p>
                      <p>
                        Product availability is subject to change at any time. While we strive to maintain accurate inventory information, there may be occasions when Products shown as available become out of stock before your order can be processed. In such cases, we will notify you promptly and offer alternatives, including backordering, substitution with a comparable product, or a full refund. We are not liable for any inconvenience caused by inventory discrepancies or delayed availability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="pricing-payment" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-pricing-payment">
                    <CreditCard className="w-7 h-7 text-primary" />
                    5. Pricing and Payment
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-currency">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Currency and Price Display</h3>
                      <p>
                        All prices displayed on the InkjetProGuide website are quoted in United States Dollars (USD). The prices shown include the base product price but do not include applicable sales taxes, shipping costs, or any other fees, which will be calculated and displayed during the checkout process before you complete your purchase. We make every effort to display current and accurate pricing; however, prices are subject to change without notice at our discretion. Any changes to pricing will not affect orders that have already been confirmed and shipped. We are not responsible for pricing displayed on third-party websites, price comparison tools, or cached versions of our pages that may not reflect current pricing.
                      </p>
                    </div>
                    <div data-testid="text-sales-tax">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Sales Tax Collection</h3>
                      <p>
                        InkjetProGuide is required by law to collect applicable sales tax on orders shipped to states where we have a tax nexus. Sales tax rates vary by state, county, and municipality and are calculated based on your shipping address at checkout. The applicable tax rate and total tax amount will be displayed in your order summary before you complete your purchase. We collect and remit sales tax in accordance with applicable state and local tax laws. If you are a tax-exempt organization, please contact us with appropriate documentation before placing your order to discuss tax exemption procedures. We reserve the right to adjust tax calculations if errors are discovered after your order is placed.
                      </p>
                    </div>
                    <div data-testid="text-payment-methods">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Payment Methods Accepted</h3>
                      <p className="mb-3">
                        We accept the following payment methods for purchases made through our website: major credit cards (Visa, Mastercard, American Express, Discover), debit cards with Visa or Mastercard logos, and Cash on Delivery (COD) for eligible orders within the continental United States. All credit and debit card payments are processed securely through our third-party payment processor, Stripe, which maintains PCI-DSS Level 1 compliance, the highest level of payment card industry security certification.
                      </p>
                      <p>
                        By providing your payment information, you represent and warrant that you are authorized to use the designated payment method and authorize us to charge your payment method for the total amount of your order, including product prices, shipping costs, taxes, and any applicable fees. We reserve the right to modify the payment methods we accept at any time and to decline payment methods at our discretion for security or fraud prevention purposes.
                      </p>
                    </div>
                    <div data-testid="text-payment-processing">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Payment Processing and Authorization</h3>
                      <p className="mb-3">
                        When you submit an order, we will process your payment information through our secure payment gateway. Your card will be authorized for the full amount of your order at the time of checkout, and the charge will be captured when your order ships. If we are unable to verify your payment information, authorize your card, or if your payment is declined, we will attempt to contact you to resolve the issue. If we cannot verify payment within a reasonable time, your order will be canceled.
                      </p>
                      <p>
                        We may implement additional verification measures for certain orders, particularly high-value orders, orders with different billing and shipping addresses, or orders that trigger our fraud detection systems. These measures may include requesting additional identification, confirming your order by phone, or requiring alternative payment methods. We implement these security measures to protect you and to prevent fraudulent transactions. InkjetProGuide is not responsible for any fees charged by your bank or card issuer, including foreign transaction fees, currency conversion fees, or overdraft fees.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="shipping-delivery" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-shipping-delivery">
                    <Truck className="w-7 h-7 text-primary" />
                    6. Shipping and Delivery
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-shipping-policy-ref">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Policy Reference</h3>
                      <p>
                        Complete details regarding our shipping options, rates, delivery timeframes, and service areas are provided in our comprehensive <Link href="/shipping-policy"><span className="text-primary hover:underline cursor-pointer">Shipping Policy</span></Link>. We encourage you to review this policy before placing your order to understand the shipping options available to you, estimated delivery times for your location, and any restrictions that may apply. The Shipping Policy is incorporated into and forms part of these Terms and Conditions. By placing an order with InkjetProGuide, you agree to the terms outlined in both this Agreement and our Shipping Policy. In the event of any conflict between this section and the detailed Shipping Policy, the Shipping Policy shall govern with respect to shipping-specific matters.
                      </p>
                    </div>
                    <div data-testid="text-title-risk">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Title and Risk of Loss</h3>
                      <p className="mb-3">
                        Title to Products purchased from InkjetProGuide passes to you upon our delivery of the Products to the shipping carrier at our fulfillment facility. Risk of loss or damage to Products likewise passes to you at the moment of delivery to the carrier. This means that once the carrier has accepted your package from our facility, you bear the risk of loss, damage, or theft during transit. We are not liable for delays, damage, or loss that occurs after the carrier has taken possession of your shipment.
                      </p>
                      <p>
                        We strongly recommend that you inspect all packages upon delivery and note any visible damage on the carrier's delivery receipt. If your package arrives damaged, please retain all packaging materials and contact both the carrier and us immediately. While we will assist you in filing claims with the carrier, the ultimate responsibility for pursuing shipping damage claims rests with you as the owner of the goods. For high-value orders, we recommend considering shipping insurance if offered by the carrier at checkout.
                      </p>
                    </div>
                    <div data-testid="text-delivery-estimates">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Delivery Estimates and Guarantees</h3>
                      <p className="mb-3">
                        Delivery estimates provided at checkout and in shipping confirmation emails are estimates only and are not guaranteed. Actual delivery times may vary based on carrier performance, weather conditions, natural disasters, customs delays for certain areas, local delivery conditions, and other factors beyond our control. We make every effort to ship orders promptly and accurately, but we cannot guarantee specific delivery dates or times.
                      </p>
                      <p>
                        Standard processing time for most orders is one to two business days before shipment. During peak seasons, promotional periods, or high-volume events, processing times may be extended. We will notify you of any significant delays in processing your order. If your order has not arrived within a reasonable time after the estimated delivery date, please contact us for order inquiries about tracking your shipment. We are not liable for any damages, losses, or expenses resulting from delayed delivery, including but not limited to lost business opportunities, project delays, or consequential damages.
                      </p>
                    </div>
                    <div data-testid="text-shipping-restrictions">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Shipping Restrictions and Requirements</h3>
                      <p>
                        InkjetProGuide currently ships only to addresses within the United States, including all fifty states, the District of Columbia, and U.S. territories where carrier service is available. We do not ship to international destinations, P.O. Boxes for certain products, or APO/FPO addresses at this time. Certain Products may have additional shipping restrictions based on size, weight, or carrier limitations. You are responsible for providing accurate and complete shipping information, including your correct name, street address, city, state, and ZIP code. We are not responsible for orders shipped to incorrect addresses provided by customers, and additional shipping charges may apply to reship orders due to customer error.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="returns-refunds" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-returns-refunds">
                    <RotateCcw className="w-7 h-7 text-primary" />
                    7. Returns and Refunds
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-return-policy-ref">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Return Policy Reference</h3>
                      <p>
                        Our complete Return and Refund Policy, including detailed procedures, eligibility requirements, refund processing times, and exceptions, is available on our <Link href="/refund-policy"><span className="text-primary hover:underline cursor-pointer">Refund and Return Policy</span></Link> page. This policy is incorporated into and forms part of these Terms and Conditions. By making a purchase from InkjetProGuide, you acknowledge and agree to the terms of our Return Policy. We encourage you to review this policy before making a purchase to understand your rights and our procedures regarding returns and refunds. The Return Policy may be updated periodically, and the version in effect at the time of your purchase will govern your return rights.
                      </p>
                    </div>
                    <div data-testid="text-30-day-summary">
                      <h3 className="text-lg font-semibold text-foreground mb-3">30-Day Return Window Summary</h3>
                      <p className="mb-3">
                        InkjetProGuide offers a thirty (30) day return window on most Products purchased through our website. The return period begins on the date you receive your order, as confirmed by the carrier's delivery record. To be eligible for a return, Products must be in their original, unused condition with all original packaging, accessories, manuals, and documentation included. Products that have been opened, installed, used, damaged, or modified may be subject to a restocking fee of up to fifteen percent (15%) of the purchase price.
                      </p>
                      <p className="mb-3">
                        To initiate a return, you must contact us to obtain a Return Merchandise Authorization (RMA) number before shipping the Product back to us. Returns sent without an RMA number may be refused or subject to delays in processing. We provide a FREE prepaid return shipping label for all eligible returns within the continental United States, making the return process convenient and cost-free for our customers. Once we receive and inspect your return, refunds are typically processed within five to seven business days.
                      </p>
                      <p>
                        Certain Products may be exempt from our standard return policy, including items marked as "Final Sale," special order items, customized products, and products with tampered serial numbers or UPC codes. Refunds will be issued to your original payment method. Please note that it may take additional time for the refund to appear on your statement depending on your bank or card issuer's processing times. Shipping charges are non-refundable unless the return is due to our error or a defective product.
                      </p>
                    </div>
                    <div data-testid="text-defective-products">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Defective Products and Warranty Claims</h3>
                      <p>
                        If you receive a defective product or a product that is different from what you ordered, please contact us immediately. We will arrange for a replacement or refund at no additional cost to you. For products covered by manufacturer warranty, defects discovered after our return window may need to be addressed directly with the manufacturer. We will provide you with manufacturer contact information and assist you in initiating warranty claims when possible. InkjetProGuide does not provide additional warranties beyond those offered by the manufacturer.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="intellectual-property" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-ip">
                    <Copyright className="w-7 h-7 text-primary" />
                    8. Intellectual Property
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-ownership">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Ownership of Content</h3>
                      <p className="mb-3">
                        All content, materials, and intellectual property on the InkjetProGuide website, including but not limited to text, graphics, logos, button icons, images, audio clips, video clips, digital downloads, data compilations, software, and the design, selection, and arrangement thereof, are the exclusive property of InkjetProGuide or its content suppliers and licensors and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                      </p>
                      <p>
                        The compilation of all content on this Site is the exclusive property of InkjetProGuide and is protected by U.S. and international copyright laws. Any unauthorized use of the materials appearing on this Site may violate copyright, trademark, and other applicable laws and could result in criminal or civil penalties. InkjetProGuide and its licensors reserve all rights not expressly granted in these Terms. Nothing in these Terms shall be construed as granting you any license or right to use any trademark, logo, or service mark displayed on the Site without our prior written permission.
                      </p>
                    </div>
                    <div data-testid="text-third-party-trademarks">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Third-Party Trademarks</h3>
                      <p>
                        Product names, brand names, manufacturer names, and company logos displayed on the Site are trademarks, registered trademarks, or trade names of their respective owners. InkjetProGuide is an independent retailer and is not affiliated with, endorsed by, or sponsored by any of the manufacturers whose products we sell, unless explicitly stated. The display of these trademarks on our Site does not imply any endorsement, affiliation, or sponsorship relationship. All third-party trademarks are used solely for the purpose of identifying the products offered for sale and providing accurate product information to our customers. Any use of these trademarks in connection with the sale of non-genuine products or in any manner that is likely to cause confusion among consumers is strictly prohibited.
                      </p>
                    </div>
                    <div data-testid="text-usage-restrictions">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Usage Restrictions and Permissions</h3>
                      <p className="mb-3">
                        You may not reproduce, duplicate, copy, sell, resell, modify, distribute, display, publicly perform, prepare derivative works from, or exploit any portion of the Site or its content without the express prior written permission of InkjetProGuide. You may not use any meta tags, hidden text, or other "hidden" content utilizing our name, trademarks, or product names without our express written consent. You may not frame or use framing techniques to enclose any trademark, logo, or other proprietary information of InkjetProGuide without express written consent.
                      </p>
                      <p>
                        Limited permission is granted to electronically copy and print hard copies of pages from the Site for your personal, non-commercial use only, provided that you do not modify the content and that you include any copyright notice originally included with the content. Any other use of materials on this Site, including reproduction for purposes other than those noted above, modification, distribution, or republication, without prior written permission of InkjetProGuide is strictly prohibited.
                      </p>
                    </div>
                    <div data-testid="text-user-content">
                      <h3 className="text-lg font-semibold text-foreground mb-3">User-Submitted Content License</h3>
                      <p>
                        By submitting any content to our Site, including product reviews, comments, feedback, suggestions, or other materials, you grant InkjetProGuide a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media now known or hereafter devised. You represent and warrant that you own or otherwise control all rights to the content you submit; that the content is accurate; that use of the content does not violate these Terms and will not cause injury to any person or entity; and that you will indemnify InkjetProGuide for all claims resulting from content you supply.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="disclaimer-warranties" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-warranties">
                    <AlertTriangle className="w-7 h-7 text-primary" />
                    9. Disclaimer of Warranties
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-as-is">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Products Sold "As Is"</h3>
                      <p className="mb-3">
                        All products sold through InkjetProGuide are sold "AS IS" with only the manufacturer's warranty, if any, applicable to such products. InkjetProGuide does not manufacture any of the products sold on our Site; we are an independent retailer of products manufactured by third parties. As such, all warranties, representations, and guarantees regarding the products, including any implied warranty of merchantability, implied warranty of fitness for a particular purpose, or implied warranty of non-infringement, are made by the product manufacturers, not by InkjetProGuide.
                      </p>
                      <p>
                        We strongly encourage you to review the manufacturer's warranty documentation included with your product or available on the manufacturer's website before making a purchase. Warranty coverage, duration, terms, and exclusions vary by manufacturer and product. InkjetProGuide does not provide any warranty service on behalf of manufacturers; warranty claims must be directed to the manufacturer according to their warranty procedures. We may assist you in obtaining manufacturer contact information but are not responsible for the resolution of warranty claims.
                      </p>
                    </div>
                    <div data-testid="text-no-additional-warranties">
                      <h3 className="text-lg font-semibold text-foreground mb-3">No Additional Warranties from InkjetProGuide</h3>
                      <p>
                        InkjetProGuide expressly disclaims all warranties of any kind, whether express, implied, or statutory, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, with respect to the products sold on our Site and the Site itself. We do not warrant that the products will meet your requirements or expectations, that the products will be free from defects, that the operation of products will be uninterrupted or error-free, or that defects in products will be corrected. We make no representations or warranties regarding the accuracy, completeness, reliability, or timeliness of any product information, specifications, or descriptions on our Site. Any advice or information, whether oral or written, obtained from InkjetProGuide or through our Site shall not create any warranty not expressly stated in these Terms.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg" data-testid="text-warranty-disclaimer">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase">Warranty Disclaimer Notice</h3>
                      <p className="text-sm">
                        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, INKJETPROGUIDE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. INKJETPROGUIDE DOES NOT WARRANT THAT THE SITE, ITS SERVERS, OR EMAIL SENT FROM INKJETPROGUIDE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. INKJETPROGUIDE WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THIS SITE, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
                      </p>
                    </div>
                    <div data-testid="text-no-fitness-warranty">
                      <h3 className="text-lg font-semibold text-foreground mb-3">No Warranty for Fitness for Particular Purpose</h3>
                      <p>
                        InkjetProGuide makes no warranty that any product is suitable for your particular intended use or purpose. It is your responsibility to evaluate whether a product meets your specific requirements before making a purchase. Product descriptions, specifications, and recommendations on our Site are provided for informational purposes only and should not be construed as professional advice. If you are uncertain whether a particular product is appropriate for your needs, we recommend consulting with a qualified professional or contacting the manufacturer directly before placing your order.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="limitation-liability" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-liability">
                    <Shield className="w-7 h-7 text-primary" />
                    10. Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-max-liability">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Maximum Liability Limited to Purchase Price</h3>
                      <p className="mb-3">
                        In no event shall the total liability of InkjetProGuide, its officers, directors, employees, agents, affiliates, licensors, or suppliers arising out of or related to these Terms, your use of the Site, or the purchase or use of any products exceed the total amount you actually paid to InkjetProGuide for the specific product(s) giving rise to the claim during the twelve (12) months immediately preceding the event giving rise to such liability. This limitation of liability reflects a reasonable allocation of risk between the parties and will apply to the maximum extent permitted by applicable law.
                      </p>
                      <p>
                        This limitation applies regardless of whether the liability is based on warranty, contract, tort, strict liability, or any other theory, and regardless of whether InkjetProGuide has been advised of the possibility of such damages. In jurisdictions that do not allow the limitation or exclusion of liability for certain damages, our liability shall be limited to the greatest extent permitted by law. You acknowledge that this limitation of liability is an essential element of the agreement between you and InkjetProGuide and that without it, the pricing and other terms of this agreement would be substantially different.
                      </p>
                    </div>
                    <div data-testid="text-no-consequential">
                      <h3 className="text-lg font-semibold text-foreground mb-3">No Liability for Consequential, Incidental, or Punitive Damages</h3>
                      <p>
                        To the maximum extent permitted by applicable law, in no event shall InkjetProGuide, its officers, directors, employees, agents, affiliates, licensors, or suppliers be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or in connection with these Terms, your use of or inability to use the Site or products, any conduct or content of any third party on the Site, any content obtained from the Site, unauthorized access, use, or alteration of your transmissions or content, or any other matter relating to the Site or products, even if we have been advised of the possibility of such damages.
                      </p>
                    </div>
                    <div data-testid="text-third-party-liability">
                      <h3 className="text-lg font-semibold text-foreground mb-3">No Liability for Third-Party Actions</h3>
                      <p>
                        InkjetProGuide is not liable for any acts, omissions, errors, or negligence of third parties, including but not limited to shipping carriers, payment processors, product manufacturers, internet service providers, or any other third-party service providers. We are not responsible for delays, damages, or losses caused by events or circumstances beyond our reasonable control, including actions or omissions of third parties. If you have a dispute with any third party, you release InkjetProGuide from any and all claims, demands, and damages of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.
                      </p>
                    </div>
                    <div data-testid="text-force-majeure">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Force Majeure</h3>
                      <p>
                        InkjetProGuide shall not be liable for any delay or failure to perform its obligations under these Terms if such delay or failure results from circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, earthquakes, epidemics, pandemics, quarantine restrictions, accidents, strikes, labor disputes, shortages of transportation, fuel, energy, labor, or materials, failures of telecommunications or information systems, government actions, or any other cause beyond our reasonable control (collectively, "Force Majeure Events"). In the event of a Force Majeure Event, our obligations under these Terms shall be suspended for the duration of such event, and we shall not be liable for any damages, losses, or expenses resulting therefrom.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="indemnification" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-indemnification">
                    <Users className="w-7 h-7 text-primary" />
                    11. Indemnification
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-indemnify-agreement">
                      <h3 className="text-lg font-semibold text-foreground mb-3">User Agreement to Indemnify</h3>
                      <p className="mb-3">
                        You agree to indemnify, defend, and hold harmless InkjetProGuide, its parent companies, subsidiaries, affiliates, officers, directors, employees, agents, licensors, suppliers, and any third-party information providers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys' fees, arising out of or relating to: (a) your use of the Site or products purchased through the Site; (b) your violation of these Terms and Conditions; (c) your violation of any rights of another party, including any users of the Site; (d) your violation of any applicable laws, rules, or regulations; (e) any content or information you submit, post, or transmit through the Site; (f) your breach of any representation or warranty made herein; or (g) any claim that content you submitted caused damage to a third party.
                      </p>
                      <p>
                        This indemnification obligation shall survive the termination of your account and/or your use of the Site. InkjetProGuide reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you agree to cooperate with InkjetProGuide in asserting any available defenses. You agree not to settle any matter subject to indemnification without the prior written consent of InkjetProGuide.
                      </p>
                    </div>
                    <div data-testid="text-defense-hold-harmless">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Defense and Hold Harmless</h3>
                      <p className="mb-3">
                        Your indemnification obligation includes the duty to defend InkjetProGuide against any claims covered by this section. This means that you will, at your own expense, defend InkjetProGuide against any applicable claims using counsel reasonably acceptable to InkjetProGuide, unless InkjetProGuide elects to assume control of the defense as provided above. You agree to pay any judgments, settlements, or expenses (including attorneys' fees and costs) arising from claims subject to this indemnification.
                      </p>
                      <p>
                        You acknowledge that InkjetProGuide would suffer irreparable harm if you failed to comply with your indemnification obligations, and you agree that InkjetProGuide shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law or in equity. Your indemnification obligations under this section are not limited by any limitation of liability provisions contained elsewhere in these Terms.
                      </p>
                    </div>
                    <div data-testid="text-indemnification-scope">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Scope of Indemnification</h3>
                      <p>
                        The indemnification provisions of this section apply to all claims arising from or related to your use of the Site, regardless of whether such claims are brought by third parties or by InkjetProGuide directly. This includes, without limitation, claims arising from your purchase and use of products, claims related to content you submit or transmit through the Site, claims arising from your interactions with other users or third parties, and claims related to your violation of applicable laws or regulations. You agree that the indemnification obligations set forth herein constitute an essential element of these Terms and that without such obligations, InkjetProGuide would not agree to these Terms.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="governing-law" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-governing-law">
                    <Gavel className="w-7 h-7 text-primary" />
                    12. Governing Law and Jurisdiction
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-texas-law">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Laws of the State of Texas</h3>
                      <p className="mb-3">
                        These Terms and Conditions, and any dispute arising out of or relating to these Terms, your use of the Site, or the products purchased through the Site, shall be governed by and construed in accordance with the laws of the State of Texas, United States of America, without regard to its conflict of law principles. You agree that the application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded from these Terms.
                      </p>
                      <p>
                        The choice of Texas law applies regardless of where you are located or where you access the Site from. This choice of law provision is intended to ensure a consistent and predictable legal framework for all transactions with InkjetProGuide, regardless of the customer's location within the United States. By using our Site and purchasing products from us, you consent to the exclusive application of Texas law to all matters arising from or related to these Terms.
                      </p>
                    </div>
                    <div data-testid="text-venue">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Venue in Tarrant County, Texas</h3>
                      <p className="mb-3">
                        You agree that any legal action or proceeding arising out of or relating to these Terms or your use of the Site shall be brought exclusively in the state or federal courts located in Tarrant County, Texas, and you hereby consent to the personal jurisdiction and venue of such courts. You agree to waive any objection to jurisdiction or venue in such courts, including any claim of inconvenient forum.
                      </p>
                      <p>
                        This exclusive jurisdiction provision applies to all claims, whether based on contract, tort, statute, or otherwise, and whether the claim is brought against InkjetProGuide or by InkjetProGuide against you. By using the Site, you agree to submit to the jurisdiction of the courts of Tarrant County, Texas for the purpose of litigating any disputes. If any court or arbitrator finds this exclusive jurisdiction provision to be unenforceable, you agree that any dispute shall nonetheless be heard in a court or forum located in Texas.
                      </p>
                    </div>
                    <div data-testid="text-dispute-process">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Dispute Resolution Process</h3>
                      <p>
                        Before initiating any formal legal action or arbitration proceeding, you agree to first contact InkjetProGuide to attempt to resolve any dispute informally. Many concerns can be resolved quickly and amicably through direct communication with us. If a dispute cannot be resolved informally within thirty (30) days, either party may proceed with the formal dispute resolution procedures outlined in Section 13 of these Terms. This informal resolution requirement is a condition precedent to initiating any arbitration or legal proceeding against InkjetProGuide.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="dispute-resolution" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-dispute-resolution">
                    <MessageSquare className="w-7 h-7 text-primary" />
                    13. Dispute Resolution
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-informal-resolution">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Informal Resolution First (30 Days)</h3>
                      <p className="mb-3">
                        In the event of any dispute, claim, question, or disagreement arising from or relating to these Terms or your use of the Site ("Dispute"), the parties shall first attempt in good faith to settle such Dispute by providing written notice to the other party describing the facts and circumstances of the Dispute and allowing the receiving party thirty (30) days to respond to or settle the Dispute. Notice shall be sent by email to legal@inkjetproguide.com for disputes initiated by you, or to the email address associated with your account for disputes initiated by InkjetProGuide.
                      </p>
                      <p>
                        During this thirty (30) day period, both parties agree to engage in good faith negotiations to resolve the Dispute without resorting to formal proceedings. This may include phone calls, video conferences, or written correspondence aimed at finding a mutually acceptable resolution. If the Dispute is not resolved within this thirty (30) day period, either party may then proceed with the binding arbitration process described below. The informal resolution period is a mandatory prerequisite to initiating arbitration and must be completed before any arbitration demand may be filed.
                      </p>
                    </div>
                    <div data-testid="text-binding-arbitration">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Binding Arbitration</h3>
                      <p className="mb-3">
                        If the parties are unable to resolve a Dispute through informal negotiations within the thirty (30) day period, either party may initiate binding arbitration administered by the American Arbitration Association ("AAA") in accordance with its Consumer Arbitration Rules. The arbitration shall be conducted by a single neutral arbitrator selected in accordance with AAA procedures. The arbitration shall take place in Tarrant County, Texas, unless the parties mutually agree to a different location or to conduct the arbitration by telephone, video conference, or based solely on written submissions.
                      </p>
                      <p>
                        The arbitrator shall apply Texas law consistent with the Federal Arbitration Act and applicable statutes of limitations. The arbitrator may award any relief that would be available in court, including injunctive and declaratory relief, but only to the extent such relief is authorized by applicable law. The arbitrator's decision shall be final and binding, and judgment on the award may be entered in any court having jurisdiction. Each party shall bear its own costs and attorney's fees, unless the arbitrator determines that a claim or defense was frivolous or brought for an improper purpose.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg" data-testid="text-class-action-waiver">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase">Class Action Waiver</h3>
                      <p className="text-sm mb-3">
                        YOU AND INKJETPROGUIDE AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING. The arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding. If this class action waiver is found to be unenforceable, then the entirety of this arbitration provision shall be null and void, and the Dispute shall be resolved in court.
                      </p>
                      <p className="text-sm">
                        By agreeing to these Terms, you are waiving your right to participate in class action lawsuits or class-wide arbitration. This waiver is an essential element of the agreement between you and InkjetProGuide.
                      </p>
                    </div>
                    <div data-testid="text-small-claims">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Small Claims Court Exception</h3>
                      <p>
                        Notwithstanding the foregoing, either party may bring an individual action in small claims court if the claim qualifies for small claims court jurisdiction in the state where you reside or in Tarrant County, Texas. Additionally, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights. The small claims court exception and the right to seek equitable relief are not subject to the mandatory arbitration provision above.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="electronic-communications" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-electronic">
                    <Mail className="w-7 h-7 text-primary" />
                    14. Electronic Communications
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-consent-electronic">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Consent to Electronic Communications</h3>
                      <p className="mb-3">
                        By using the InkjetProGuide website, creating an account, or making a purchase, you consent to receive electronic communications from us. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing. This consent applies to all communications related to your use of the Site and purchases, including order confirmations, shipping notifications, account updates, promotional emails, and administrative notices.
                      </p>
                      <p>
                        We may send electronic communications to the email address you provide during account registration or checkout. It is your responsibility to ensure that the email address associated with your account is current and accurate, and that you check your email regularly for important communications from us. You may update your email preferences or unsubscribe from promotional emails at any time through your account settings or by clicking the unsubscribe link in any promotional email. However, you may not opt out of transactional or administrative emails related to your orders or account.
                      </p>
                    </div>
                    <div data-testid="text-email-notice">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Email as Valid Legal Notice</h3>
                      <p className="mb-3">
                        You agree that email communication shall constitute valid legal notice for all purposes under these Terms. Notices sent by email shall be deemed given when sent, provided that the sender does not receive an automated delivery failure notification. For notices from you to InkjetProGuide, notice shall be effective upon actual receipt by us at our designated email address. We are not responsible for any failure or delay in receiving notices due to spam filters, technical issues with your email provider, or incorrect email addresses provided by you.
                      </p>
                      <p>
                        For legal notices, you may contact us at legal@inkjetproguide.com. For all other inquiries, including order inquiries matters, you may reach us at the contact information provided in Section 18 of these Terms. We may also provide legal notices by posting them on the Site, and such notices shall be effective upon posting. It is your responsibility to review the Site periodically for important notices and updates to these Terms.
                      </p>
                    </div>
                    <div data-testid="text-electronic-records">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Electronic Records and Signatures</h3>
                      <p>
                        You acknowledge and agree that clicking on buttons labeled "Submit," "Place Order," "I Accept," "I Agree," or similar links or buttons, and providing electronic signatures, constitutes your electronic signature and is equivalent to a handwritten signature for all legal purposes. Electronic records of your transactions with us, including your acceptance of these Terms, shall be valid and enforceable to the same extent as paper records. You agree not to contest the validity or enforceability of any electronic communication, record, or signature based solely on the fact that it was provided in electronic form.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="modifications" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-modifications">
                    <FileEdit className="w-7 h-7 text-primary" />
                    15. Modifications to Terms
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-right-modify">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Right to Modify Terms</h3>
                      <p className="mb-3">
                        InkjetProGuide reserves the right to modify, amend, update, or replace these Terms and Conditions at any time at our sole discretion. We may modify these Terms to reflect changes in our business practices, to comply with applicable laws and regulations, to address new products or services, or for any other reason we deem appropriate. There is no obligation on our part to notify you of changes to these Terms other than by posting the revised Terms on our website and updating the "Last Updated" date.
                      </p>
                      <p>
                        We encourage you to review these Terms periodically to stay informed about our terms and conditions. The version of these Terms posted on the Site at the time of your use shall govern that use. By continuing to access or use our Site after any revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, you must stop using the Site immediately.
                      </p>
                    </div>
                    <div data-testid="text-notification-changes">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Notification of Material Changes</h3>
                      <p className="mb-3">
                        For material changes to these Terms that significantly affect your rights or obligations, we will make reasonable efforts to provide notice through one or more of the following methods: posting a prominent notice on our website, sending an email to the address associated with your account, or displaying a notice when you log in to your account. However, our failure to provide such notice shall not invalidate or otherwise affect the enforceability of any changes to these Terms.
                      </p>
                      <p>
                        Material changes may include, but are not limited to, changes to our return policy, changes to dispute resolution procedures, changes to pricing or payment terms, or changes that materially affect your privacy rights. We determine, in our sole discretion, what constitutes a material change requiring enhanced notice.
                      </p>
                    </div>
                    <div data-testid="text-continued-use">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Continued Use Constitutes Acceptance</h3>
                      <p>
                        Your continued use of the Site following the posting of any changes to these Terms constitutes your acceptance of those changes. If you do not agree to the modified Terms, your sole and exclusive remedy is to discontinue using the Site. The date on which these Terms were last updated is indicated at the top of this document. We recommend checking the Terms periodically, especially before making purchases, to ensure you are aware of and agree to the current terms governing your use of the Site.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="severability" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-severability">
                    <Scissors className="w-7 h-7 text-primary" />
                    16. Severability
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-invalid-provisions">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Invalid Provisions Do Not Affect Others</h3>
                      <p className="mb-3">
                        If any provision of these Terms and Conditions is held by a court of competent jurisdiction or arbitrator to be invalid, illegal, void, or unenforceable for any reason, such provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' original intent. If such modification is not possible, the provision shall be severed from these Terms, and the remaining provisions shall continue in full force and effect without being impaired or invalidated.
                      </p>
                      <p className="mb-3">
                        The invalidity or unenforceability of any provision in one jurisdiction shall not affect the validity or enforceability of such provision in any other jurisdiction. The severability provisions of this section shall apply to all provisions of these Terms, including but not limited to the arbitration agreement, class action waiver, limitation of liability, and indemnification provisions.
                      </p>
                      <p>
                        In the event that a provision is severed or modified, the parties agree to negotiate in good faith to agree upon a replacement provision that comes as close as possible to the original intent of the severed or modified provision. The failure of either party to require strict performance of any provision of these Terms shall not be construed as a waiver of such provision or any other provision of these Terms.
                      </p>
                    </div>
                    <div data-testid="text-interpretation">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Interpretation</h3>
                      <p>
                        These Terms shall be construed fairly and not strictly against either party. The headings in these Terms are for convenience only and shall not affect the interpretation of any provision. The use of the word "including" or "includes" shall be interpreted as "including, without limitation" or "includes, without limitation." References to "days" mean calendar days unless otherwise specified. Any ambiguities in the interpretation of these Terms shall not be construed against the drafting party.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="entire-agreement" className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-entire-agreement">
                    <FileCheck className="w-7 h-7 text-primary" />
                    17. Entire Agreement
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div data-testid="text-full-agreement">
                      <h3 className="text-lg font-semibold text-foreground mb-3">These Terms Constitute the Full Agreement</h3>
                      <p className="mb-3">
                        These Terms and Conditions, together with our Privacy Policy, Shipping Policy, Return Policy, and any other policies or agreements incorporated by reference herein, constitute the entire agreement between you and InkjetProGuide with respect to your use of the Site and the purchase of products through the Site. This agreement supersedes all prior or contemporaneous communications, proposals, negotiations, representations, warranties, and agreements, whether oral or written, between you and InkjetProGuide concerning the subject matter hereof.
                      </p>
                      <p className="mb-3">
                        You acknowledge that you have not relied upon any representations, warranties, or promises made by InkjetProGuide or its representatives that are not expressly set forth in these Terms. No representation, promise, inducement, or statement of intention has been made by either party that is not embodied in these Terms, and neither party shall be bound by or liable for any alleged representation, promise, inducement, or statement of intention not expressly set forth herein.
                      </p>
                      <p>
                        No oral or written statement by InkjetProGuide's employees, agents, or representatives shall modify or otherwise affect the terms of this agreement unless such modification is made in a written amendment signed by an authorized officer of InkjetProGuide. Any waiver of any provision of these Terms must be in writing and signed by an authorized representative of InkjetProGuide to be effective. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
                      </p>
                    </div>
                    <div data-testid="text-no-third-party">
                      <h3 className="text-lg font-semibold text-foreground mb-3">No Third-Party Beneficiaries</h3>
                      <p>
                        These Terms are intended solely for the benefit of InkjetProGuide and you, and are not intended to confer any rights, benefits, or remedies upon any third party. Nothing in these Terms shall create or be deemed to create a partnership, joint venture, agency, or employment relationship between you and InkjetProGuide. You may not assign, transfer, or sublicense your rights or obligations under these Terms without our prior written consent. InkjetProGuide may assign its rights and obligations under these Terms without restriction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="contact" className="mb-12">
              <Card className="border-primary/30">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" data-testid="heading-contact">
                    <Phone className="w-7 h-7 text-primary" />
                    18. Contact Information
                  </h2>
                  <div className="space-y-6 text-muted-foreground">
                    <p data-testid="text-contact-intro">
                      If you have any questions, concerns, or comments about these Terms and Conditions, or if you need to contact us for any reason related to your use of the Site or the products you have purchased, please reach out to us using any of the following contact methods. We are available during our regular business hours and strive to respond to all inquiries within one to two business days.
                    </p>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="p-6 bg-muted/30 rounded-lg" data-testid="contact-email">
                        <div className="flex items-center gap-3 mb-3">
                          <Mail className="w-6 h-6 text-primary" />
                          <h3 className="font-semibold text-foreground">Email</h3>
                        </div>
                        <p className="mb-2">For legal matters and Terms-related inquiries:</p>
                        <a href="mailto:legal@inkjetproguide.com" className="text-primary hover:underline font-medium">
                          legal@inkjetproguide.com
                        </a>
                        <p className="mt-4 mb-2">For order inquiries:</p>
                        <a href="mailto:support@inkjetproguide.com" className="text-primary hover:underline font-medium">
                          support@inkjetproguide.com
                        </a>
                      </div>
                      
                      <div className="p-6 bg-muted/30 rounded-lg" data-testid="contact-phone">
                        <div className="flex items-center gap-3 mb-3">
                          <Phone className="w-6 h-6 text-primary" />
                          <h3 className="font-semibold text-foreground">Phone</h3>
                        </div>
                        <p className="mb-2">Order Inquiries Line:</p>
                        <a href="tel:1-325-400-8874" className="text-primary hover:underline font-medium text-lg">
                          1-325-400-8874
                        </a>
                        <div className="flex items-center gap-2 mt-4 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Monday - Friday, 9:00 AM - 6:00 PM CT</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-muted/30 rounded-lg" data-testid="contact-address">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold text-foreground">Mailing Address</h3>
                      </div>
                      <address className="not-italic">
                        <p className="font-medium text-foreground">InkjetProGuide</p>
                        <p>Fort Worth, TX 76102</p>
                        <p>United States</p>
                      </address>
                      <p className="mt-4 text-sm">
                        Please include your order number (if applicable) and a detailed description of your inquiry in all correspondence to ensure a prompt and accurate response.
                      </p>
                    </div>

                    <div className="pt-6 border-t">
                      <p className="text-sm" data-testid="text-contact-response">
                        We value your feedback and take all inquiries seriously. Our goal is to provide you with exceptional order inquiries and to address any concerns you may have in a timely and professional manner. For the fastest response, please contact us by email or through the contact form on our website. Thank you for choosing InkjetProGuide for your inkjet printing needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4" data-testid="text-acknowledgment">
                  By using the InkjetProGuide website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-print-reminder">
                  We recommend that you print or save a copy of these Terms for your records.
                </p>
                <p className="text-sm font-medium mt-4" data-testid="text-last-updated-footer">
                  Last Updated: January 9, 2026
                </p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
