import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead page="contact" fallbackTitle="Contact Us | InkjetProGuide" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Have questions about your order? Our dedicated team at InkjetProGuide 
            is here for order-related inquiries including shipping, returns, and order status. We pride ourselves on providing 
            prompt responses for all your order-related needs.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-4">
            This contact page is for order-related questions only. If you need information about an existing order, 
            shipping updates, returns, or payment inquiries, our team is ready to respond. 
            We typically respond to all inquiries within 24 hours during business days.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            <strong>Looking for product information?</strong> Visit our <a href="/guides" className="text-primary hover:underline">Guides & Resources</a> section 
            for detailed printer information, specifications, and buying guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover-elevate transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone Inquiries</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Call us toll-free (Office Hours)
              </p>
              <a href="tel:+13254008874" className="font-semibold text-primary hover:underline" data-testid="link-phone-contact">
                1-325-400-8874
              </a>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Response within 24 hours
              </p>
              <a href="mailto:inkjetproguide@outlook.com" className="font-semibold text-primary hover:underline" data-testid="link-email-contact">
                inkjetproguide@outlook.com
              </a>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p className="text-sm text-muted-foreground mb-2">
                We're available during office hours
              </p>
              <p className="font-semibold text-primary">Mon - Fri: 9AM - 6PM ET</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-contact-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-contact-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    data-testid="input-contact-subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question or concern..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    data-testid="input-contact-message"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-send-message">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
                <CardDescription>Corporate Mailing Address</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">InkjetProGuide</p>
                    <p className="text-xs text-muted-foreground/70 mb-1">Corporate Mailing Address</p>
                    <p className="text-sm text-muted-foreground">
                      2704 Handley Ederville Rd<br />
                      Fort Worth, TX 76118<br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">What are your shipping options?</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard delivery takes 2-3 business days, with express shipping available for urgent orders. 
                    All shipments include tracking information sent directly to your email.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How can I check my order status?</h4>
                  <p className="text-sm text-muted-foreground">
                    You can check your order status by logging into your account or using our Order Lookup feature. 
                    Once your order ships, you'll receive a tracking number via email. You can also contact us 
                    during business hours for order status updates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can I return a printer?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. We offer 30-day returns with a FREE prepaid return shipping label. Items must be in 
                    original condition with all accessories included. Contact us to initiate a return 
                    and we'll email you a prepaid UPS/FedEx label at no cost.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What payment methods do you accept?</h4>
                  <p className="text-sm text-muted-foreground">
                    We accept secure electronic payment methods including major credit and debit cards (Visa, Mastercard, American Express) and other digital payment options shown at checkout. We do not accept cash on delivery, checks, wire transfers, or cryptocurrency. All payments are processed securely through our checkout system.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Order Inquiries Only</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This contact page is specifically for order-related questions including shipping inquiries, 
                  return requests, order status updates, and payment questions. InkjetProGuide is an independent 
                  online retailer serving customers in the United States. For product information, specifications, 
                  and buying guidance, please visit our <a href="/guides" className="text-primary hover:underline">Guides & Resources</a> section.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
