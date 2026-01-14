import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Clock, Package, MapPin, AlertCircle, Calendar, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Truck className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-shipping-policy">
                Shipping Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-shipping-subtitle">
              Fast, reliable shipping across the United States
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" data-testid="heading-overview">
              <Package className="w-6 h-6 text-primary" />
              Shipping Overview
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-overview-1">
                <strong className="text-foreground">Shipping:</strong> We offer standard shipping within the continental United States.
              </p>
              <p data-testid="text-overview-2">
                <strong className="text-foreground">Delivery Time:</strong> Most orders are delivered within 2-3 business days after processing.
              </p>
              <p data-testid="text-overview-3">
                <strong className="text-foreground">Service Area:</strong> We ship to all 50 US states. International shipping is not available at this time.
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
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-processing-times">Order Processing Times</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground" data-testid="heading-processing">
                    Processing Period
                  </h3>
                  <p data-testid="text-processing-1">
                    Orders are processed within <strong className="text-foreground">1-2 business days</strong> after payment confirmation. During this time, we verify your order, prepare your printer for shipment, and generate shipping labels.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-cutoff-times">
                  Order Cutoff Times
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-cutoff-1"><strong className="text-foreground">Same-day processing:</strong> Orders placed before 12:00 PM CT (Central Time) on business days</li>
                  <li data-testid="text-cutoff-2"><strong className="text-foreground">Next-day processing:</strong> Orders placed after 12:00 PM CT or on weekends/holidays</li>
                  <li data-testid="text-cutoff-3"><strong className="text-foreground">Business days:</strong> Monday through Friday, excluding federal holidays</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-handling-period">
                  Handling Period
                </h3>
                <p data-testid="text-handling">
                  Our standard handling period is 1-2 business days. This includes order verification, quality inspection of your printer, secure packaging, and handoff to our shipping carrier. You will receive a shipping confirmation email with tracking information once your order has shipped.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-shipping-carriers">Shipping Carriers & Methods</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-carriers-intro">
                We partner with trusted national carriers to ensure safe and timely delivery of your printers:
              </p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-carrier-partners">
                  Our Carrier Partners
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-carrier-1"><strong className="text-foreground">UPS (United Parcel Service):</strong> Primary carrier for most shipments</li>
                  <li data-testid="text-carrier-2"><strong className="text-foreground">FedEx:</strong> Used for expedited and specialty deliveries</li>
                  <li data-testid="text-carrier-3"><strong className="text-foreground">USPS:</strong> Used for select lightweight accessories and supplies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-shipping-options">
                  Shipping Options
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold text-foreground">Method</th>
                        <th className="text-left p-3 font-semibold text-foreground">Delivery Time</th>
                        <th className="text-left p-3 font-semibold text-foreground">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Standard Shipping</td>
                        <td className="p-3">2-3 business days</td>
                        <td className="p-3">$9.99</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Express Shipping</td>
                        <td className="p-3">1-2 business days</td>
                        <td className="p-3">$19.99</td>
                      </tr>
                      <tr>
                        <td className="p-3">Overnight Shipping</td>
                        <td className="p-3">Next business day</td>
                        <td className="p-3">$39.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm mt-3" data-testid="text-delivery-note">
                  Delivery times are estimates and begin after order processing is complete. Actual delivery may vary based on destination and carrier conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-delivery-areas">Delivery Areas</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-service-areas">
                    Service Areas
                  </h3>
                  <p data-testid="text-service-areas">
                    InkjetProGuide ships to all 50 US states, including Alaska and Hawaii. Please note that shipments to Alaska, Hawaii, and US territories may require additional transit time (typically 3-5 additional business days) and may incur supplemental shipping charges.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-po-boxes">
                  PO Boxes & APO/FPO Addresses
                </h3>
                <p data-testid="text-po-boxes">
                  Due to the size and weight of printers, we are unable to ship to PO Boxes. We do ship to APO/FPO addresses for military personnel, though delivery times may be extended.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-international">
                  International Shipping
                </h3>
                <p data-testid="text-international">
                  At this time, InkjetProGuide ships exclusively within the United States. We do not offer international shipping to Canada, Mexico, or other countries. We apologize for any inconvenience.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-peak-season">Peak Season & Holiday Delays</h2>
          <Card className="border-primary/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-md">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-peak-notice">
                    Important: Peak Season Notice
                  </h3>
                  <p data-testid="text-peak-notice">
                    During peak shopping seasons, processing and delivery times may be extended. We recommend ordering early to ensure timely delivery.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-peak-periods">
                  Peak Shopping Periods
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li data-testid="text-peak-1"><strong className="text-foreground">Black Friday/Cyber Monday:</strong> Late November - expect 1-3 additional business days</li>
                  <li data-testid="text-peak-2"><strong className="text-foreground">Holiday Season:</strong> December 1-31 - expect 2-4 additional business days</li>
                  <li data-testid="text-peak-3"><strong className="text-foreground">Back to School:</strong> August - expect 1-2 additional business days</li>
                  <li data-testid="text-peak-4"><strong className="text-foreground">Tax Season:</strong> March-April - slightly higher order volumes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-weather-delays">
                  Weather & Carrier Delays
                </h3>
                <p data-testid="text-weather-delays">
                  Severe weather, natural disasters, or carrier service disruptions may cause shipping delays beyond our control. We will notify you via email if your order is significantly affected and provide updated delivery estimates when available.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-holiday-closures">
                  Holiday Closures
                </h3>
                <p data-testid="text-holiday-closures">
                  Our processing facility is closed on federal holidays including New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, and Christmas. Orders placed on or near these holidays will be processed on the next business day.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-tracking">Order Tracking</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-tracking-intro">
                Once your order ships, you will receive a confirmation email with your tracking number and a link to track your package in real-time.
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-tracking-1">Tracking information is typically available within 24 hours of shipment</li>
                <li data-testid="text-tracking-2">Track your order anytime using our Order Lookup page</li>
                <li data-testid="text-tracking-3">Signature may be required for orders over $500</li>
              </ul>
              <div className="mt-4">
                <Link href="/order-lookup">
                  <Button variant="outline" data-testid="button-track-order">
                    Track Your Order
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-shipping-issues">Shipping Issues</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-md">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-damaged-shipment">
                    Damaged or Lost Shipments
                  </h3>
                  <p data-testid="text-damaged-shipment">
                    If your package arrives damaged or is lost in transit, please contact us immediately. We will work with the carrier to file a claim and arrange a replacement or refund at no additional cost to you.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground" data-testid="heading-wrong-address">
                  Incorrect Address
                </h3>
                <p data-testid="text-wrong-address">
                  Please double-check your shipping address before completing your order. If you provide an incorrect address and the package is returned to us, you may be responsible for reshipping costs. Contact us immediately if you need to update your shipping address after placing an order.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-contact-shipping">Contact Us About Shipping</h2>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6" data-testid="text-contact-intro">
                Have questions about shipping or need to update your delivery address? Our team is here to help during business hours.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-email-us">Email Us</h3>
                    <a href="mailto:inkjetproguide@outlook.com" className="text-primary hover:underline" data-testid="link-email-shipping">
                      inkjetproguide@outlook.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1" data-testid="heading-call-us">Call Us</h3>
                    <a href="tel:+13254008874" className="text-primary hover:underline" data-testid="link-phone-shipping">
                      1-325-400-8874
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri 9AM-6PM CT</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/products#!/Inkjet-Printers/c/193859557">
            <Button className="h-11 px-6" data-testid="button-shop-now">
              Shop Printers
            </Button>
          </a>
          <Link href="/refund-policy">
            <Button variant="outline" className="h-11 px-6" data-testid="button-view-refund-policy">
              Return Policy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
