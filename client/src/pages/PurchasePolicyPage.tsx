import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ShoppingCart, CheckCircle, AlertCircle, Clock, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function PurchasePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingCart className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-purchase-policy">
                Purchase Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-purchase-subtitle">
              Order terms, payment methods, and purchasing information
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
              <ShoppingCart className="w-6 h-6 text-primary" />
              Purchase Overview
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-overview-1">
                <strong className="text-foreground">Secure Checkout:</strong> All transactions are processed through secure, encrypted payment systems to protect your financial information.
              </p>
              <p data-testid="text-overview-2">
                <strong className="text-foreground">Order Confirmation:</strong> You will receive an email confirmation immediately after placing your order with your order details and tracking information once shipped.
              </p>
              <p data-testid="text-overview-3">
                <strong className="text-foreground">Order Questions:</strong> For shipping and return inquiries, contact us during business hours.
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
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-payment-methods">Payment Methods</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-payment-1">
                InkjetProGuide accepts secure electronic payment methods only.
              </p>
              <p data-testid="text-payment-2">
                We do not accept cash on delivery, checks, wire transfers, or cryptocurrency.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-pricing">Pricing and Accuracy</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-pricing-1">
                    We strive to provide accurate pricing information for all products on our website. However, pricing errors may occasionally occur. Our policy regarding pricing accuracy is as follows:
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-pricing-2"><strong className="text-foreground">Price Display:</strong> All prices are displayed in United States Dollars (USD) and include the product price only. Shipping costs and applicable taxes are calculated separately during checkout.</li>
                <li data-testid="text-pricing-3"><strong className="text-foreground">Price Changes:</strong> Prices are subject to change without prior notice. The price charged for a product will be the price in effect at the time the order is placed.</li>
                <li data-testid="text-pricing-4"><strong className="text-foreground">Pricing Errors:</strong> In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price. If your order is affected, we will notify you promptly and offer you the option to proceed at the correct price or receive a full refund.</li>
                <li data-testid="text-pricing-5"><strong className="text-foreground">Promotional Pricing:</strong> Sale prices and promotional discounts are valid only for the specified promotion period and are subject to availability.</li>
              </ul>

              <p data-testid="text-pricing-6">
                We are committed to honest pricing practices. If you notice a significant price discrepancy or have concerns about pricing, please contact us before placing your order.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-order-acceptance">Order Acceptance</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-order-acceptance-1">
                    When you place an order on InkjetProGuide, you are making an offer to purchase products from us. Your order constitutes an offer and is subject to acceptance by InkjetProGuide.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-order-process">
                  Order Processing
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-process-1"><strong className="text-foreground">Order Confirmation:</strong> Upon placing your order, you will receive an automated order confirmation email. This confirms receipt of your order but does not constitute acceptance.</li>
                  <li data-testid="text-process-2"><strong className="text-foreground">Order Verification:</strong> We verify all orders for payment authorization, product availability, and shipping address accuracy.</li>
                  <li data-testid="text-process-3"><strong className="text-foreground">Order Acceptance:</strong> Your order is accepted when we ship your product and send you a shipping confirmation email with tracking information.</li>
                  <li data-testid="text-process-4"><strong className="text-foreground">Order Rejection:</strong> We reserve the right to refuse or cancel any order for any reason, including but not limited to: product unavailability, pricing errors, suspected fraud, or inability to verify payment.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-order-limits">
                  Order Limits
                </h3>
                <p data-testid="text-order-limits">
                  We reserve the right to limit the quantity of items purchased per person, household, or order. These restrictions may apply to orders placed by the same account, the same credit card, and/or orders that use the same billing and/or shipping address. We will notify you if such limits apply to your order.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-sales-tax">Sales Tax</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-tax-1">
                    InkjetProGuide is required to collect sales tax in states where we have a tax obligation (nexus). The applicable sales tax will be calculated and displayed during checkout before you complete your purchase.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-tax-2"><strong className="text-foreground">Tax Calculation:</strong> Sales tax is calculated based on the shipping destination address and the applicable state and local tax rates at the time of purchase.</li>
                <li data-testid="text-tax-3"><strong className="text-foreground">Tax-Exempt Purchases:</strong> If you are a tax-exempt organization, please contact us with your tax-exempt certificate before placing your order. We will verify your exemption and adjust your order accordingly.</li>
                <li data-testid="text-tax-4"><strong className="text-foreground">International Orders:</strong> We currently only ship within the United States. International duties, tariffs, or import taxes do not apply.</li>
              </ul>

              <p data-testid="text-tax-5">
                For orders shipped within Texas, Texas state sales tax applies. For orders shipped to other states, the applicable state's sales tax rate will be applied where we have established nexus.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-order-cancellation">Order Cancellation</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-cancel-1">
                    We process orders quickly to ensure fast delivery. If you need to cancel your order, please contact us as soon as possible.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-cancel-policy">
                  Cancellation Policy
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-cancel-2"><strong className="text-foreground">Before Shipping:</strong> Orders can be cancelled free of charge if they have not yet been shipped. Contact us immediately at inkjetproguide@outlook.com or 1-325-400-8874.</li>
                  <li data-testid="text-cancel-3"><strong className="text-foreground">After Shipping:</strong> Once an order has shipped, it cannot be cancelled. You may refuse delivery or initiate a return once the package is delivered according to our Return Policy.</li>
                  <li data-testid="text-cancel-4"><strong className="text-foreground">Cancellation Refunds:</strong> For successfully cancelled orders, refunds are processed within 3-5 business days to your original payment method.</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm" data-testid="text-cancel-5">
                  <strong className="text-foreground">Tip:</strong> Orders placed before 12:00 PM CT typically ship the same day. For best results, contact us within 1 hour of placing your order if you need to make changes or cancel.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-product-availability">Product Availability</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-availability-1">
                    We strive to maintain accurate inventory information on our website. However, product availability is subject to change and cannot be guaranteed until your order is confirmed.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-availability-2"><strong className="text-foreground">Real-Time Inventory:</strong> Our website displays real-time inventory levels. If a product shows as "In Stock," it is available for immediate shipment.</li>
                <li data-testid="text-availability-3"><strong className="text-foreground">Out of Stock Items:</strong> If a product is out of stock, you may contact us to inquire about expected restock dates or alternative products.</li>
                <li data-testid="text-availability-4"><strong className="text-foreground">Backorders:</strong> We do not accept backorders. All products must be in stock at the time of purchase.</li>
                <li data-testid="text-availability-5"><strong className="text-foreground">Inventory Discrepancies:</strong> In the rare event that a product becomes unavailable after your order is placed, we will notify you immediately and offer a full refund or a comparable substitute product.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-muted/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-contact-purchase">Questions About Your Purchase?</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-contact-purchase">
              For questions about orders, payments, or purchasing policies, contact us during office hours.
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
            <Button variant="outline" asChild data-testid="link-shipping-policy">
              <Link href="/shipping-policy">Shipping Policy</Link>
            </Button>
            <Button variant="outline" asChild data-testid="link-terms">
              <Link href="/terms-conditions">Terms & Conditions</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
