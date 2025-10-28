import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  LayoutDashboard, 
  Tags, 
  Map, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Download,
  Eye,
  Save
} from "lucide-react";
import type { SeoSetting, SitemapConfig, RobotsTxtConfig } from "@shared/schema";
import { insertSeoSettingSchema, insertSitemapConfigSchema, insertRobotsTxtConfigSchema } from "@shared/schema";

// Form schemas
const metaTagsFormSchema = insertSeoSettingSchema.extend({
  keywords: z.array(z.string()).optional(),
  keywordsInput: z.string().optional(),
});

const sitemapFormSchema = insertSitemapConfigSchema.extend({
  priority: z.string().transform(val => parseFloat(val)).or(z.number()),
});

const robotsFormSchema = insertRobotsTxtConfigSchema;

type MetaTagsFormValues = z.infer<typeof metaTagsFormSchema>;
type SitemapFormValues = z.infer<typeof sitemapFormSchema>;
type RobotsFormValues = z.infer<typeof robotsFormSchema>;

export default function AdminSEOPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [sitemapPreview, setSitemapPreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  // Check admin authentication
  const { data: authCheck, isLoading: authLoading } = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/check"],
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  // Fetch all SEO settings
  const { data: allSeoSettings, isLoading: seoLoading } = useQuery<SeoSetting[]>({
    queryKey: ["/api/admin/seo-settings"],
  });

  // Fetch sitemap config
  const { data: sitemapConfig, isLoading: sitemapLoading } = useQuery<SitemapConfig>({
    queryKey: ["/api/admin/sitemap/config"],
  });

  // Fetch robots.txt config
  const { data: robotsConfig, isLoading: robotsLoading } = useQuery<RobotsTxtConfig>({
    queryKey: ["/api/admin/robots-txt/config"],
  });

  // Meta tags form
  const metaTagsForm = useForm<MetaTagsFormValues>({
    resolver: zodResolver(metaTagsFormSchema),
    defaultValues: {
      page: "home",
      title: "",
      description: "",
      keywords: [],
      keywordsInput: "",
      canonicalUrl: "",
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      twitterCard: "summary_large_image",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
    },
  });

  // Sitemap form
  const sitemapForm = useForm<SitemapFormValues>({
    resolver: zodResolver(sitemapFormSchema),
    defaultValues: {
      enabled: true,
      includeProducts: true,
      includeCategories: true,
      includePages: true,
      changefreq: "weekly",
      priority: 0.8,
    },
  });

  // Robots.txt form
  const robotsForm = useForm<RobotsFormValues>({
    resolver: zodResolver(robotsFormSchema),
    defaultValues: {
      content: "",
    },
  });

  // Update forms when data loads
  useEffect(() => {
    if (sitemapConfig) {
      sitemapForm.reset({
        enabled: sitemapConfig.enabled,
        includeProducts: sitemapConfig.includeProducts,
        includeCategories: sitemapConfig.includeCategories,
        includePages: sitemapConfig.includePages,
        changefreq: sitemapConfig.changefreq,
        priority: typeof sitemapConfig.priority === 'string' ? parseFloat(sitemapConfig.priority) : sitemapConfig.priority,
      });
    }
  }, [sitemapConfig]);

  useEffect(() => {
    if (robotsConfig) {
      robotsForm.reset({
        content: robotsConfig.content,
      });
    }
  }, [robotsConfig]);

  // Update meta tags form when selected page changes
  useEffect(() => {
    const selectedSetting = allSeoSettings?.find(s => s.page === selectedPage);
    if (selectedSetting) {
      metaTagsForm.reset({
        page: selectedSetting.page,
        title: selectedSetting.title,
        description: selectedSetting.description,
        keywords: selectedSetting.keywords || [],
        keywordsInput: selectedSetting.keywords?.join(", ") || "",
        canonicalUrl: selectedSetting.canonicalUrl || "",
        robotsIndex: selectedSetting.robotsIndex,
        robotsFollow: selectedSetting.robotsFollow,
        ogTitle: selectedSetting.ogTitle || "",
        ogDescription: selectedSetting.ogDescription || "",
        ogImage: selectedSetting.ogImage || "",
        twitterCard: selectedSetting.twitterCard || "summary_large_image",
        twitterTitle: selectedSetting.twitterTitle || "",
        twitterDescription: selectedSetting.twitterDescription || "",
        twitterImage: selectedSetting.twitterImage || "",
      });
    } else {
      metaTagsForm.reset({
        page: selectedPage,
        title: "",
        description: "",
        keywords: [],
        keywordsInput: "",
        canonicalUrl: "",
        robotsIndex: true,
        robotsFollow: true,
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        twitterCard: "summary_large_image",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
      });
    }
  }, [selectedPage, allSeoSettings]);

  // Mutations
  const saveMetaTagsMutation = useMutation({
    mutationFn: async (data: any) => {
      const existingSetting = allSeoSettings?.find(s => s.page === selectedPage);
      const keywords = data.keywordsInput 
        ? data.keywordsInput.split(",").map((k: string) => k.trim()).filter((k: string) => k)
        : [];
      
      const submitData = {
        ...data,
        keywords,
        keywordsInput: undefined,
      };

      if (existingSetting) {
        return await apiRequest("PATCH", `/api/admin/seo-settings/${existingSetting.id}`, submitData);
      } else {
        return await apiRequest("POST", "/api/admin/seo-settings", submitData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-settings"] });
      toast({ 
        title: "Success", 
        description: "SEO settings saved successfully" 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const saveSitemapMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("PUT", "/api/admin/sitemap/config", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sitemap/config"] });
      toast({ 
        title: "Success", 
        description: "Sitemap configuration saved successfully" 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const generateSitemapMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/admin/sitemap/generate", undefined);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sitemap/config"] });
      toast({ 
        title: "Success", 
        description: `Sitemap generated successfully. Last generated: ${new Date(data.lastGenerated).toLocaleString()}` 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const previewSitemapMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/admin/sitemap/preview", undefined);
      return response.json();
    },
    onSuccess: (data) => {
      setSitemapPreview(data.xml);
      setShowPreview(true);
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const saveRobotsMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("PUT", "/api/admin/robots-txt/config", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/robots-txt/config"] });
      toast({ 
        title: "Success", 
        description: "Robots.txt saved successfully" 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  // Handle form submissions
  const handleMetaTagsSubmit = (data: MetaTagsFormValues) => {
    saveMetaTagsMutation.mutate(data);
  };

  const handleSitemapSubmit = (data: SitemapFormValues) => {
    saveSitemapMutation.mutate(data);
  };

  const handleRobotsSubmit = (data: RobotsFormValues) => {
    saveRobotsMutation.mutate(data);
  };

  const handleDownloadSitemap = () => {
    if (sitemapPreview) {
      const blob = new Blob([sitemapPreview], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Character counters
  const titleLength = metaTagsForm.watch("title")?.length || 0;
  const descriptionLength = metaTagsForm.watch("description")?.length || 0;

  // Dashboard metrics
  const totalPagesIndexed = allSeoSettings?.length || 0;
  const missingDescriptions = allSeoSettings?.filter(s => !s.description || s.description.length < 50).length || 0;
  const missingTitles = allSeoSettings?.filter(s => !s.title || s.title.length < 10).length || 0;

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authCheck?.authenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="heading-admin-seo">
            SEO Management
          </h1>
          <p className="text-muted-foreground">
            Manage SEO settings, sitemap, and robots.txt for your application
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="dashboard" data-testid="tab-dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="meta" data-testid="tab-meta-tags">
              <Tags className="w-4 h-4 mr-2" />
              Meta Tags
            </TabsTrigger>
            <TabsTrigger value="sitemap" data-testid="tab-sitemap">
              <Map className="w-4 h-4 mr-2" />
              Sitemap
            </TabsTrigger>
            <TabsTrigger value="robots" data-testid="tab-robots">
              <FileText className="w-4 h-4 mr-2" />
              Robots.txt
            </TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pages Indexed</CardTitle>
                  <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-pages">
                    {totalPagesIndexed}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pages with SEO configuration
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sitemap Status</CardTitle>
                  {sitemapConfig?.enabled ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <Badge 
                    variant={sitemapConfig?.enabled ? "default" : "secondary"}
                    data-testid="badge-sitemap-status"
                  >
                    {sitemapConfig?.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  {sitemapConfig?.lastGenerated && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Last generated: {new Date(sitemapConfig.lastGenerated).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Robots.txt Status</CardTitle>
                  {robotsConfig?.content ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <Badge 
                    variant={robotsConfig?.content ? "default" : "secondary"}
                    data-testid="badge-robots-status"
                  >
                    {robotsConfig?.content ? "Configured" : "Not Configured"}
                  </Badge>
                  {robotsConfig?.updatedAt && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Last updated: {new Date(robotsConfig.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>SEO Health Metrics</CardTitle>
                <CardDescription>
                  Issues that need attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {missingDescriptions > 0 ? (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm">Missing or Short Meta Descriptions</span>
                  </div>
                  <Badge 
                    variant={missingDescriptions > 0 ? "destructive" : "default"}
                    data-testid="badge-missing-descriptions"
                  >
                    {missingDescriptions}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {missingTitles > 0 ? (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm">Missing or Short Meta Titles</span>
                  </div>
                  <Badge 
                    variant={missingTitles > 0 ? "destructive" : "default"}
                    data-testid="badge-missing-titles"
                  >
                    {missingTitles}
                  </Badge>
                </div>

                {sitemapConfig?.lastGenerated && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Last Sitemap Generation</span>
                    </div>
                    <span 
                      className="text-sm text-muted-foreground"
                      data-testid="text-last-sitemap-date"
                    >
                      {new Date(sitemapConfig.lastGenerated).toLocaleString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meta Tags Tab */}
          <TabsContent value="meta" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page-Level SEO Management</CardTitle>
                <CardDescription>
                  Configure meta tags, Open Graph, and Twitter Card data for each page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="page-select">Select Page</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger id="page-select" data-testid="select-page">
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="products">Products</SelectItem>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                      <SelectItem value="help">Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Form {...metaTagsForm}>
                  <form onSubmit={metaTagsForm.handleSubmit(handleMetaTagsSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Meta Tags</h3>
                      
                      <FormField
                        control={metaTagsForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter page title" 
                                {...field} 
                                data-testid="input-meta-title" 
                              />
                            </FormControl>
                            <FormDescription>
                              <span data-testid="text-title-counter">
                                {titleLength}/60 characters
                              </span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter page description" 
                                {...field} 
                                rows={3}
                                data-testid="textarea-meta-description" 
                              />
                            </FormControl>
                            <FormDescription>
                              <span data-testid="text-description-counter">
                                {descriptionLength}/160 characters
                              </span>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="keywordsInput"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Keywords (comma-separated)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="keyword1, keyword2, keyword3" 
                                {...field} 
                                data-testid="input-keywords" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="canonicalUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Canonical URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/page" 
                                {...field}
                                value={field.value ?? ''}
                                data-testid="input-canonical-url" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Robots Directives</h3>
                      
                      <FormField
                        control={metaTagsForm.control}
                        name="robotsIndex"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-robots-index"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Index (allow search engines to index this page)
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="robotsFollow"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-robots-follow"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Follow (allow search engines to follow links)
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Open Graph</h3>
                      
                      <FormField
                        control={metaTagsForm.control}
                        name="ogTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Social media title" 
                                {...field}
                                value={field.value ?? ''}
                                data-testid="input-og-title" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="ogDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Social media description" 
                                {...field}
                                value={field.value ?? ''}
                                rows={2}
                                data-testid="textarea-og-description" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="ogImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Image URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field}
                                value={field.value ?? ''}
                                data-testid="input-og-image" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Twitter Card</h3>
                      
                      <FormField
                        control={metaTagsForm.control}
                        name="twitterCard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                              <FormControl>
                                <SelectTrigger data-testid="select-twitter-card-type">
                                  <SelectValue placeholder="Select card type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="summary">Summary</SelectItem>
                                <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="twitterTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Twitter title" 
                                {...field}
                                value={field.value ?? ''}
                                data-testid="input-twitter-title" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="twitterDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Twitter description" 
                                {...field}
                                value={field.value ?? ''}
                                rows={2}
                                data-testid="textarea-twitter-description" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={metaTagsForm.control}
                        name="twitterImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter Image URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field}
                                value={field.value ?? ''}
                                data-testid="input-twitter-image" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={saveMetaTagsMutation.isPending}
                      data-testid="button-save-meta-tags"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saveMetaTagsMutation.isPending ? "Saving..." : "Save SEO Settings"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sitemap Tab */}
          <TabsContent value="sitemap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sitemap Configuration</CardTitle>
                <CardDescription>
                  Configure and generate your sitemap.xml file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...sitemapForm}>
                  <form onSubmit={sitemapForm.handleSubmit(handleSitemapSubmit)} className="space-y-6">
                    <FormField
                      control={sitemapForm.control}
                      name="enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-sitemap-enabled"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Enable Sitemap</FormLabel>
                            <FormDescription>
                              Generate and serve a sitemap.xml file
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <Label>Include in Sitemap</Label>
                      
                      <FormField
                        control={sitemapForm.control}
                        name="includeProducts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-include-products"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Products</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={sitemapForm.control}
                        name="includeCategories"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-include-categories"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Categories</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={sitemapForm.control}
                        name="includePages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="checkbox-include-pages"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Pages</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={sitemapForm.control}
                      name="changefreq"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Change Frequency</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-change-frequency">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="always">Always</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={sitemapForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Priority: {typeof field.value === 'string' ? field.value : field.value?.toFixed(1) || '0.8'}
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={1}
                              step={0.1}
                              value={[typeof field.value === 'string' ? parseFloat(field.value) : field.value || 0.8]}
                              onValueChange={(vals) => field.onChange(vals[0].toString())}
                              data-testid="slider-priority"
                            />
                          </FormControl>
                          <FormDescription>
                            Priority relative to other pages (0.0 to 1.0)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={saveSitemapMutation.isPending}
                      data-testid="button-save-sitemap-config"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saveSitemapMutation.isPending ? "Saving..." : "Save Configuration"}
                    </Button>
                  </form>
                </Form>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Sitemap Actions</h3>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => generateSitemapMutation.mutate()}
                      disabled={generateSitemapMutation.isPending}
                      data-testid="button-generate-sitemap"
                    >
                      <Map className="w-4 h-4 mr-2" />
                      {generateSitemapMutation.isPending ? "Generating..." : "Generate Sitemap"}
                    </Button>

                    <Button 
                      variant="outline"
                      onClick={() => previewSitemapMutation.mutate()}
                      disabled={previewSitemapMutation.isPending}
                      data-testid="button-preview-sitemap"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {previewSitemapMutation.isPending ? "Loading..." : "Preview Sitemap"}
                    </Button>

                    <Button 
                      variant="outline"
                      onClick={handleDownloadSitemap}
                      disabled={!sitemapPreview}
                      data-testid="button-download-sitemap"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Sitemap
                    </Button>
                  </div>

                  {sitemapConfig?.lastGenerated && (
                    <p className="text-sm text-muted-foreground" data-testid="text-last-generated">
                      Last generated: {new Date(sitemapConfig.lastGenerated).toLocaleString()}
                    </p>
                  )}
                </div>

                {showPreview && sitemapPreview && (
                  <div className="space-y-2">
                    <Label>Sitemap Preview</Label>
                    <Textarea 
                      value={sitemapPreview} 
                      readOnly 
                      rows={15}
                      className="font-mono text-xs"
                      data-testid="textarea-sitemap-preview"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Robots.txt Tab */}
          <TabsContent value="robots" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Robots.txt Configuration</CardTitle>
                <CardDescription>
                  Configure your robots.txt file to control search engine crawlers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...robotsForm}>
                  <form onSubmit={robotsForm.handleSubmit(handleRobotsSubmit)} className="space-y-6">
                    <FormField
                      control={robotsForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Robots.txt Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={15}
                              className="font-mono"
                              data-testid="textarea-robots-content"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={saveRobotsMutation.isPending}
                      data-testid="button-save-robots"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saveRobotsMutation.isPending ? "Saving..." : "Save Robots.txt"}
                    </Button>
                  </form>
                </Form>

                <div className="border-t pt-6 space-y-3">
                  <h3 className="text-sm font-semibold">Helpful Hints</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">User-agent: *</code> to apply rules to all crawlers</li>
                    <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">Allow: /</code> to allow crawling of all pages</li>
                    <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">Disallow: /admin</code> to block specific paths</li>
                    <li>Always include your sitemap URL: <code className="text-xs bg-muted px-1 py-0.5 rounded">Sitemap: https://yoursite.com/sitemap.xml</code></li>
                    <li>Each directive should be on its own line</li>
                    <li>Comments start with #</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analytics</CardTitle>
                <CardDescription>
                  Track your SEO performance and search engine visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Analytics Integration Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto" data-testid="text-analytics-message">
                      Google Analytics and Search Console integration will be available soon. 
                      You'll be able to track page views, search rankings, and more.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto mt-8">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Organic Traffic
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">--</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Average Position
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">--</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Click-through Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">--</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
