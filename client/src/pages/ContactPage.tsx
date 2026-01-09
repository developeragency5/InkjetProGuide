import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Have questions about inkjet printers, orders, or technical support? Our dedicated team at InkjetProGuide 
            is here to help you find the perfect printing solution. We pride ourselves on providing exceptional 
            customer service and expert guidance for all your printing needs.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Whether you need help choosing the right printer for your home office, require assistance with an existing order, 
            or have technical questions about printer setup and maintenance, our knowledgeable support staff is ready to assist. 
            We typically respond to all inquiries within 24 hours during business days, and we are committed to ensuring 
            your complete satisfaction with every interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover-elevate transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Call us toll-free (Office Hours Support)
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
                <CardDescription>Visit our headquarters</CardDescription>
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
                    We offer free shipping on all orders over $299. Standard delivery takes 2-3 business days, 
                    with express shipping available for urgent orders. All shipments include tracking information 
                    sent directly to your email.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What about product warranties?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our printers typically include manufacturer warranty coverage. For specific warranty terms, 
                    refer to the documentation included with your product. We recommend contacting the manufacturer 
                    directly for warranty claims.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can I return a printer?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. We offer 30-day returns with a FREE prepaid return shipping label. Items must be in 
                    original condition with all accessories included. Contact our support team to initiate a return 
                    and we'll email you a prepaid UPS/FedEx label at no cost.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How can I get technical support?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our technical support team is available during business hours to help with printer setup, 
                    troubleshooting, and maintenance questions. You can reach us by phone, email, or through 
                    the contact form on this page. We also provide comprehensive guides and resources in our 
                    Help Center.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Why Choose InkjetProGuide?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based in Fort Worth, Texas, InkjetProGuide serves customers across the United States. 
                  We specialize exclusively in inkjet printers, providing focused expertise and a carefully 
                  curated product selection. Our commitment to customer satisfaction means we go above and 
                  beyond to ensure you receive the best possible service, from product selection through post-purchase 
                  support. Every printer we sell comes with free access to our comprehensive setup guides and 
                  maintenance resources, helping you get the most out of your purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
