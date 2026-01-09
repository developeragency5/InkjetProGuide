import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SeoSetting } from "@shared/schema";

interface SEOHeadProps {
  page: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export function SEOHead({ page, fallbackTitle, fallbackDescription }: SEOHeadProps) {
  const { data: seoSettings } = useQuery<SeoSetting[]>({
    queryKey: ["/api/seo-settings"],
    staleTime: 1000 * 60 * 5,
  });

  const settings = seoSettings?.find(s => s.page === page);

  useEffect(() => {
    const title = settings?.title || fallbackTitle || "InkjetProGuide";
    const description = settings?.description || fallbackDescription || "";
    
    document.title = title;

    const updateOrCreateMeta = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateOrCreateMeta("description", description);
    
    if (settings?.keywords && settings.keywords.length > 0) {
      updateOrCreateMeta("keywords", settings.keywords.join(", "));
    }

    const robotsContent = [];
    if (settings?.robotsIndex !== false) robotsContent.push("index");
    else robotsContent.push("noindex");
    if (settings?.robotsFollow !== false) robotsContent.push("follow");
    else robotsContent.push("nofollow");
    updateOrCreateMeta("robots", robotsContent.join(", "));

    updateOrCreateMeta("og:title", settings?.ogTitle || title, true);
    updateOrCreateMeta("og:description", settings?.ogDescription || description, true);
    updateOrCreateMeta("og:type", "website", true);
    if (settings?.ogImage) {
      updateOrCreateMeta("og:image", settings.ogImage, true);
    }
    if (settings?.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", settings.canonicalUrl);
    }

    updateOrCreateMeta("twitter:card", settings?.twitterCard || "summary_large_image");
    updateOrCreateMeta("twitter:title", settings?.twitterTitle || settings?.ogTitle || title);
    updateOrCreateMeta("twitter:description", settings?.twitterDescription || settings?.ogDescription || description);
    if (settings?.twitterImage) {
      updateOrCreateMeta("twitter:image", settings.twitterImage);
    }

  }, [settings, fallbackTitle, fallbackDescription]);

  return null;
}
