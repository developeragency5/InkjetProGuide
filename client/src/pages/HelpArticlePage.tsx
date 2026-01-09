import { useRoute, Link } from "wouter";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, ArrowLeft, Phone, Mail, MessageSquare, ChevronRight, Video, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { HelpArticle } from "@shared/schema";

// Sample article data - in a real app, this would come from the API
const sampleArticles: Record<string, any> = {
  "wifi-setup": {
    title: "WiFi Connection Setup",
    category: "Setup",
    description: "Step-by-step guide to connect your printer to your wireless network",
    content: `
# WiFi Connection Setup

Follow these simple steps to connect your printer to your wireless network.

## Before You Begin
- Ensure your WiFi router is powered on and working
- Have your WiFi network name (SSID) and password ready
- Make sure your printer is powered on and within range of your router

## Step 1: Access the Wireless Menu
1. On your printer's control panel, tap the **Wireless** icon
2. Select **Settings** from the wireless menu
3. Choose **Wireless Setup Wizard**

## Step 2: Select Your Network
1. The printer will scan for available wireless networks
2. When the list appears, select your WiFi network name
3. If you don't see your network, select **Manually Enter Network Name**

## Step 3: Enter Password
1. Use the on-screen keyboard to enter your WiFi password
2. Pay attention to uppercase and lowercase letters
3. Tap **Done** when finished

## Step 4: Confirm Connection
1. Wait while the printer connects (this may take 1-2 minutes)
2. When successful, you'll see a confirmation message
3. The wireless icon on your printer should show solid blue

## Troubleshooting Tips
- **Connection Failed**: Double-check your password and try again
- **Network Not Found**: Move printer closer to router
- **Weak Signal**: Consider repositioning router or printer
- **Still Having Issues**: Try restarting both printer and router

## Next Steps
After successful connection, install the Smart app on your mobile device for easy wireless printing.
    `,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image: null,
    relatedArticles: ["mobile-printing", "driver-installation", "wifi-troubleshooting"],
  },
  "paper-jams": {
    title: "Paper Jam Prevention & Fixes",
    category: "Troubleshooting",
    description: "Learn how to prevent paper jams and clear them when they occur",
    content: `
# Paper Jam Prevention & Fixes

Paper jams are one of the most common printer issues. Here's how to prevent and fix them.

## Prevention Tips

### Use Quality Paper
- Use paper within the weight specifications (60-90 gsm)
- Store paper in a cool, dry place
- Don't use wrinkled, folded, or damaged paper

### Load Paper Correctly
1. Don't overfill the paper tray (max 100 sheets)
2. Adjust the paper guides to fit snugly against the paper
3. Fan the paper stack before loading
4. Load paper with the print side facing down

### Regular Maintenance
- Clean paper rollers monthly with a lint-free cloth
- Keep the paper path clear of dust and debris
- Update printer firmware regularly

## Clearing a Paper Jam

### Step 1: Power Off
Turn off the printer and unplug it from the power source.

### Step 2: Locate the Jam
Check these areas:
- Input tray
- Output tray
- Rear access door
- Duplexer (if applicable)

### Step 3: Remove Jammed Paper
1. Gently pull the paper in the direction of the paper path
2. Use both hands to avoid tearing
3. Remove all torn pieces
4. Don't force it - if stuck, try from a different access point

### Step 4: Check for Debris
- Look for small torn pieces
- Remove any foreign objects
- Check all rollers for damage

### Step 5: Restart
1. Close all doors and trays
2. Plug in and power on the printer
3. Print a test page

## When to Contact Support
- Frequent jams (more than once per week)
- Torn rollers or damaged parts
- Strange noises during printing
- Paper consistently jamming in the same location
    `,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    image: null,
    relatedArticles: ["paper-loading", "print-quality", "error-codes"],
  },
  "driver-installation": {
    title: "Driver Installation (Windows & Mac)",
    category: "Setup",
    description: "Complete guide to installing printer drivers on Windows and Mac",
    content: `
# Driver Installation Guide

Install the correct drivers to ensure your printer works perfectly with your computer.

## Windows Installation

### Automatic Installation (Recommended)
1. Connect your printer via USB or ensure it's on the same WiFi network
2. Windows will automatically detect and install drivers
3. Follow the on-screen prompts
4. Print a test page to confirm

### Manual Installation
1. Visit the manufacturer support website
2. Enter your printer model number
3. Select your operating system
4. Download the Full Feature Driver
5. Run the downloaded file and follow the wizard

## Mac Installation

### From Software Update
1. Open **System Preferences** > **Printers & Scanners**
2. Click the **+** button to add a printer
3. Select your printer from the list
4. macOS will download and install the driver automatically

### Manual Download
1. Visit the manufacturer support website
2. Enter your printer model
3. Select macOS version
4. Download the driver package
5. Open the .dmg file and follow instructions

## Verification Steps
1. Open a document and select **Print**
2. Ensure your printer appears in the printer list
3. Check that all features are available (duplex, color, etc.)
4. Print a test page

## Troubleshooting
- **Printer Not Found**: Check USB connection or WiFi
- **Installation Failed**: Run as Administrator (Windows) or with sudo (Mac)
- **Features Missing**: Install Full Feature Driver instead of Basic
- **Old Driver**: Uninstall completely before reinstalling

## Keeping Drivers Updated
- Enable automatic updates in Smart app
- Check for updates monthly
- Update before major OS upgrades
    `,
    videoUrl: null,
    image: null,
    relatedArticles: ["getting-started", "wifi-setup", "mobile-printing"],
  },
};

const relatedArticleTitles: Record<string, string> = {
  "mobile-printing": "Mobile Printing Setup",
  "driver-installation": "Driver Installation",
  "wifi-troubleshooting": "WiFi Troubleshooting",
  "paper-loading": "Paper Loading Instructions",
  "print-quality": "Print Quality Issues",
  "error-codes": "Error Codes Explained",
  "getting-started": "Getting Started Guide",
  "wifi-setup": "WiFi Connection Setup",
};

export default function HelpArticlePage() {
  const [, params] = useRoute("/help/:slug");
  const slug = params?.slug || "";
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const { toast } = useToast();

  // Fetch article from API
  const { data: article, isLoading, isError } = useQuery<HelpArticle>({
    queryKey: ["/api/help/articles", slug],
    queryFn: async () => {
      const response = await fetch(`/api/help/articles/${slug}`);
      if (!response.ok) throw new Error("Article not found");
      return response.json();
    },
    enabled: !!slug,
  });

  const feedbackMutation = useMutation({
    mutationFn: async (helpful: boolean) => {
      if (!article) throw new Error("No article to submit feedback for");
      return apiRequest("POST", `/api/help/articles/${article.id}/feedback`, { helpful });
    },
    onSuccess: () => {
      setFeedbackGiven(true);
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our support content.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The help article you're looking for doesn't exist.
          </p>
          <Link href="/help">
            <Button data-testid="button-back-to-help">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/help">
              <span className="hover:text-foreground cursor-pointer" data-testid="link-help-center">
                Help Center
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <Badge className="mb-3" data-testid="badge-category">{article.category}</Badge>
              <h1 className="text-4xl font-bold mb-4" data-testid="text-article-title">
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {article.description}
              </p>
            </div>

            {/* Video Embed */}
            {article.videoUrl && (
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="w-16 h-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">Video Tutorial Available</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, '<br/>').replace(/#{1,6}\s/g, (match) => {
                  const level = match.trim().length;
                  return `<h${level} class="font-bold mt-6 mb-3">`;
                }).replace(/<br\/><br\/>/g, '</p><p>').replace(/^(.+)$/gm, (match) => {
                  if (!match.startsWith('<')) return `<p>${match}</p>`;
                  return match;
                }),
              }}
              data-testid="content-article"
            />

            <Separator className="my-8" />

            {/* Feedback Section */}
            <div className="bg-muted rounded-md p-6">
              <h3 className="font-semibold text-lg mb-3">Was this article helpful?</h3>
              {!feedbackGiven ? (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => feedbackMutation.mutate(true)}
                    disabled={feedbackMutation.isPending}
                    data-testid="button-feedback-yes"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Yes, helpful
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => feedbackMutation.mutate(false)}
                    disabled={feedbackMutation.isPending}
                    data-testid="button-feedback-no"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Not helpful
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground" data-testid="text-feedback-thanks">
                  Thank you for your feedback!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {article.relatedArticles.map((relatedSlug: string) => (
                    <Link key={relatedSlug} href={`/help/${relatedSlug}`}>
                      <div
                        className="flex items-center gap-2 p-2 rounded-md hover-elevate cursor-pointer"
                        data-testid={`link-related-${relatedSlug}`}
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">
                          {relatedArticleTitles[relatedSlug] || relatedSlug}
                        </span>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Contact Us */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Still Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm opacity-90">
                  Our team is ready to assist you with any questions.
                </p>
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    className="w-full"
                    data-testid="button-contact-us-sidebar"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </Link>
                <div className="pt-3 border-t border-primary-foreground/20 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>1-325-400-8874</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>inkjetproguide@outlook.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
