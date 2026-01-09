import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accessibility, Eye, Keyboard, Monitor, Volume2, MousePointer, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Accessibility className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-accessibility">
                Accessibility Statement
              </h1>
            </div>
            <p className="text-xl text-muted-foreground" data-testid="text-accessibility-subtitle">
              Our commitment to digital accessibility for all users
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" data-testid="heading-commitment">
              <Accessibility className="w-6 h-6 text-primary" />
              Our Commitment
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p data-testid="text-commitment-1">
                InkjetProGuide is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all of our users.
              </p>
              <p data-testid="text-commitment-2">
                <strong className="text-foreground">Our Goal:</strong> We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which are internationally recognized guidelines for creating accessible web content.
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
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-standards">Accessibility Standards</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Monitor className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p data-testid="text-standards-1">
                    InkjetProGuide follows the Web Content Accessibility Guidelines (WCAG) 2.1, which provide recommendations for making web content more accessible. These guidelines are organized around four principles known as POUR:
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-perceivable">Perceivable</h3>
                  <p className="text-sm" data-testid="text-perceivable">
                    Information and user interface components must be presentable to users in ways they can perceive. This includes providing text alternatives for images and ensuring content is available to assistive technologies.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-operable">Operable</h3>
                  <p className="text-sm" data-testid="text-operable">
                    User interface components and navigation must be operable. Users must be able to navigate and interact with all functionality using a keyboard, and have enough time to read and use content.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-understandable">Understandable</h3>
                  <p className="text-sm" data-testid="text-understandable">
                    Information and operation of the user interface must be understandable. Content should be readable and predictable, and users should receive help to avoid and correct mistakes.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2" data-testid="heading-robust">Robust</h3>
                  <p className="text-sm" data-testid="text-robust">
                    Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. This ensures compatibility with current and future tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-features">Accessibility Features</h2>
          <Card>
            <CardContent className="p-8 space-y-6 text-muted-foreground">
              <p data-testid="text-features-intro">
                We have implemented the following accessibility features on our website to improve usability for all visitors:
              </p>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Keyboard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid="heading-keyboard-nav">Keyboard Navigation</h3>
                  <p className="text-sm" data-testid="text-keyboard-nav">
                    Our website is fully navigable using a keyboard. All interactive elements (links, buttons, form fields) can be accessed using the Tab key, and activated using Enter or Space. Skip links are available to bypass repetitive navigation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid="heading-screen-reader">Screen Reader Compatibility</h3>
                  <p className="text-sm" data-testid="text-screen-reader">
                    We have designed our website to be compatible with popular screen readers including JAWS, NVDA, and VoiceOver. All images include descriptive alt text, and ARIA labels are used where appropriate to provide context for screen reader users.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MousePointer className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid="heading-focus-indicators">Clear Focus Indicators</h3>
                  <p className="text-sm" data-testid="text-focus-indicators">
                    All focusable elements have visible focus indicators that clearly show which element is currently selected. This helps users who navigate with keyboards or other assistive devices to understand where they are on the page.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid="heading-color-contrast">Color Contrast</h3>
                  <p className="text-sm" data-testid="text-color-contrast">
                    Text and interactive elements maintain sufficient color contrast ratios to ensure readability for users with low vision or color blindness. We support both light and dark modes to accommodate user preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid="heading-responsive">Responsive Design</h3>
                  <p className="text-sm" data-testid="text-responsive">
                    Our website is fully responsive and adapts to different screen sizes and orientations. Content reflows appropriately when zoomed up to 200% without loss of information or functionality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" data-testid="heading-multimedia">Multimedia Accessibility</h3>
                  <p className="text-sm" data-testid="text-multimedia">
                    Any video content includes captions or transcripts. No content auto-plays audio without user consent, and all multimedia can be paused, stopped, or volume-controlled by the user.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-browsing-tips">Tips for Accessible Browsing</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-tips-intro">
                Here are some tips to enhance your browsing experience on InkjetProGuide:
              </p>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-tip-1"><strong className="text-foreground">Zoom:</strong> Use your browser's zoom function (usually Ctrl/Cmd + Plus/Minus) to increase or decrease text size. Our website supports zooming up to 200% without loss of functionality.</li>
                <li data-testid="text-tip-2"><strong className="text-foreground">Dark Mode:</strong> Toggle between light and dark modes using the theme switch in the website header to reduce eye strain or accommodate light sensitivity.</li>
                <li data-testid="text-tip-3"><strong className="text-foreground">Keyboard Shortcuts:</strong> Use Tab to move forward through links and form fields, Shift+Tab to move backward, and Enter to activate buttons and links.</li>
                <li data-testid="text-tip-4"><strong className="text-foreground">Screen Readers:</strong> Our website is optimized for screen readers. For the best experience, ensure your screen reader is updated to the latest version.</li>
                <li data-testid="text-tip-5"><strong className="text-foreground">High Contrast:</strong> Enable your operating system's high contrast mode for improved visibility. Our website respects system accessibility preferences.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-ongoing-efforts">Ongoing Efforts</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-ongoing-1">
                Accessibility is an ongoing effort. We are committed to continuously improving the accessibility of InkjetProGuide through the following measures:
              </p>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-effort-1"><strong className="text-foreground">Regular Audits:</strong> We conduct regular accessibility audits of our website to identify and address potential barriers.</li>
                <li data-testid="text-effort-2"><strong className="text-foreground">Staff Training:</strong> Our development and content teams receive ongoing training on accessibility best practices.</li>
                <li data-testid="text-effort-3"><strong className="text-foreground">User Feedback:</strong> We actively seek and respond to accessibility feedback from our users to guide our improvement efforts.</li>
                <li data-testid="text-effort-4"><strong className="text-foreground">Technology Updates:</strong> We stay current with evolving accessibility standards and assistive technology developments.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-known-limitations">Known Limitations</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground">
              <p data-testid="text-limitations-1">
                While we strive to ensure all content on our website is accessible, there may be some limitations:
              </p>
              
              <ul className="space-y-2 ml-6 list-disc">
                <li data-testid="text-limitation-1"><strong className="text-foreground">Third-Party Content:</strong> Some embedded content from third parties (such as payment processors) may not be fully accessible. We work with our partners to improve accessibility of integrated services.</li>
                <li data-testid="text-limitation-2"><strong className="text-foreground">PDF Documents:</strong> Some downloadable documents may not be fully accessible. Contact us for alternative formats.</li>
                <li data-testid="text-limitation-3"><strong className="text-foreground">Legacy Content:</strong> Older content may not fully conform to current accessibility standards. We are working to update this content.</li>
              </ul>

              <p data-testid="text-limitations-2">
                If you encounter any accessibility barriers, please contact us and we will work to provide the information in an alternative format or improve the accessibility of the content.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4" data-testid="heading-feedback">Accessibility Feedback</h2>
            <p className="text-muted-foreground mb-6" data-testid="text-feedback">
              We welcome your feedback on the accessibility of InkjetProGuide. If you encounter accessibility barriers, have suggestions for improvement, or need assistance accessing any content on our website, please contact us. We take all feedback seriously and will respond within 5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild data-testid="button-email-accessibility">
                <a href="mailto:inkjetproguide@outlook.com?subject=Accessibility%20Feedback" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  inkjetproguide@outlook.com
                </a>
              </Button>
              <Button variant="outline" asChild data-testid="button-phone-accessibility">
                <a href="tel:+13254008874" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  1-325-400-8874
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-muted/30">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-3" data-testid="heading-legal-compliance">Legal Compliance</h2>
            <p className="text-muted-foreground text-sm" data-testid="text-legal-compliance">
              InkjetProGuide is committed to compliance with the Americans with Disabilities Act (ADA) and Section 508 of the Rehabilitation Act. This accessibility statement is provided in accordance with best practices for transparency and accountability. We recognize that accessibility is not just a legal obligation but a moral imperative to ensure equal access to information and services for all users.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-muted-foreground mb-4" data-testid="text-related-policies">
            Related Pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild data-testid="link-privacy">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild data-testid="link-terms">
              <Link href="/terms-conditions">Terms & Conditions</Link>
            </Button>
            <Button variant="outline" asChild data-testid="link-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
