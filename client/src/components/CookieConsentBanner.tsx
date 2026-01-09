import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const CONSENT_KEY = "inkjetproguide_cookie_consent";

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: string;
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
    timestamp: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: Partial<ConsentPreferences>) => {
    const finalPrefs = {
      ...preferences,
      ...prefs,
      necessary: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(finalPrefs));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      personalization: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      personalization: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom duration-500">
        <Card className="max-w-4xl mx-auto shadow-lg border-2">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Your Privacy Matters
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    We use cookies and similar technologies to enhance your browsing experience, 
                    analyze site traffic, and personalize content. Some cookies are essential for 
                    the website to function properly, while others help us improve our services 
                    and show you relevant offers.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By clicking "Accept All", you consent to our use of cookies as described in our{" "}
                    <Link href="/privacy-policy">
                      <span className="text-primary hover:underline cursor-pointer font-medium">
                        Privacy Policy
                      </span>
                    </Link>
                    . California residents: See our{" "}
                    <Link href="/privacy-policy#california-rights">
                      <span className="text-primary hover:underline cursor-pointer font-medium">
                        CCPA Rights
                      </span>
                    </Link>
                    .
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[180px]">
                <Button 
                  onClick={handleAcceptAll}
                  className="w-full"
                  data-testid="button-accept-cookies"
                >
                  Accept All
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRejectAll}
                  className="w-full"
                  data-testid="button-reject-cookies"
                >
                  Reject All
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPreferences(true)}
                  className="w-full"
                  data-testid="button-manage-cookies"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Customize which cookies you allow. Essential cookies cannot be disabled 
              as they are required for the website to function properly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-semibold">Essential Cookies</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Required for basic website functionality including secure checkout, 
                    session management, and shopping cart features. These cannot be disabled.
                  </p>
                </div>
                <Switch 
                  checked={true} 
                  disabled 
                  aria-disabled="true"
                  className="mt-1 opacity-50 cursor-not-allowed" 
                  data-testid="switch-essential"
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-semibold">Analytics Cookies</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Help us understand how visitors interact with our website by collecting 
                    anonymous usage data. This helps us improve our services.
                  </p>
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => setPreferences(p => ({ ...p, analytics: checked }))}
                  className="mt-1"
                  data-testid="switch-analytics"
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-semibold">Marketing Cookies</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Used to deliver personalized advertisements and measure ad campaign 
                    effectiveness. These may be shared with advertising partners.
                  </p>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
                  className="mt-1"
                  data-testid="switch-marketing"
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-semibold">Personalization Cookies</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Remember your preferences and browsing history to provide a customized 
                    experience, including product recommendations.
                  </p>
                </div>
                <Switch 
                  checked={preferences.personalization}
                  onCheckedChange={(checked) => setPreferences(p => ({ ...p, personalization: checked }))}
                  className="mt-1"
                  data-testid="switch-personalization"
                />
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Your Privacy Rights</p>
              <p>
                Under CCPA/CPRA, California residents have the right to opt-out of the sale 
                or sharing of personal information. Visit our{" "}
                <Link href="/privacy-policy#california-rights">
                  <span className="text-primary hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>{" "}
                for more information about your rights.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setShowPreferences(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSavePreferences}
              className="flex-1"
              data-testid="button-save-preferences"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
