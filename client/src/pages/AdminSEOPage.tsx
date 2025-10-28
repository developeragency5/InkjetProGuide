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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Save,
  Search,
  Loader2,
  HelpCircle
} from "lucide-react";
import type { SeoSetting, SitemapConfig, RobotsTxtConfig, SeoAuditJob, SeoAuditResult } from "@shared/schema";
import { insertSeoSettingSchema, insertSitemapConfigSchema, insertRobotsTxtConfigSchema } from "@shared/schema";

// Enhanced form schema with URL validation and required field validation
const metaTagsFormSchema = insertSeoSettingSchema.extend({
  keywords: z.array(z.string()).optional(),
  keywordsInput: z.string().optional(),
  canonicalUrl: z.string().optional().refine(
    (val) => !val || val.startsWith('http://') || val.startsWith('https://'),
    { message: "URL must start with http:// or https://" }
  ),
  ogImage: z.string().optional().refine(
    (val) => !val || val.startsWith('http://') || val.startsWith('https://'),
    { message: "Image URL must start with http:// or https://" }
  ),
  twitterImage: z.string().optional().refine(
    (val) => !val || val.startsWith('http://') || val.startsWith('https://'),
    { message: "Image URL must start with http:// or https://" }
  ),
}).refine(
  (data) => data.title || data.description,
  {
    message: "At least one of title or description is required",
    path: ["title"],
  }
);

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
  const [pollingJobId, setPollingJobId] = useState<string | null>(null);

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

  // Fetch SEO audit jobs
  const { data: auditJobs } = useQuery<SeoAuditJob[]>({
    queryKey: ["/api/admin/seo-audit/jobs"],
  });

  // Get the latest audit job
  const latestAudit = auditJobs?.[0];

  // Fetch audit job details with results (if there's a latest audit or we're polling)
  const { data: auditDetails, isLoading: auditDetailsLoading } = useQuery<{
    job: SeoAuditJob;
    results: SeoAuditResult[];
  }>({
    queryKey: ["/api/admin/seo-audit/jobs", latestAudit?.id || pollingJobId],
    enabled: !!(latestAudit?.id || pollingJobId),
    refetchInterval: (latestAudit?.status === 'running' || pollingJobId) ? 3000 : false,
  });

  // Stop polling when job completes
  useEffect(() => {
    if (auditDetails?.job.status === 'completed' || auditDetails?.job.status === 'failed') {
      setPollingJobId(null);
    }
  }, [auditDetails?.job.status]);

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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-settings"] });
      
      // Check for duplicates
      const title = variables.title;
      const description = variables.description;
      const duplicateTitles = allSeoSettings?.filter(s => 
        s.page !== selectedPage && s.title === title
      );
      const duplicateDescriptions = allSeoSettings?.filter(s => 
        s.page !== selectedPage && s.description === description
      );
      
      if (duplicateTitles && duplicateTitles.length > 0) {
        toast({ 
          title: "Warning: Duplicate Title", 
          description: `This title is also used on: ${duplicateTitles.map(s => s.page).join(", ")}`,
          variant: "default"
        });
      }
      
      if (duplicateDescriptions && duplicateDescriptions.length > 0) {
        toast({ 
          title: "Warning: Duplicate Description", 
          description: `This description is also used on: ${duplicateDescriptions.map(s => s.page).join(", ")}`,
          variant: "default"
        });
      }
      
      if (!duplicateTitles?.length && !duplicateDescriptions?.length) {
        toast({ 
          title: "Success", 
          description: "SEO settings saved successfully" 
        });
      }
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

  const startAuditMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/seo-audit/start", {});
      return response.json();
    },
    onSuccess: (data) => {
      setPollingJobId(data.jobId);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-audit/jobs"] });
      toast({ 
        title: "Success", 
        description: "SEO audit started successfully" 
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

  const handleDownloadAuditPDF = async () => {
    if (!auditDetails?.job.id) return;
    
    try {
      const response = await fetch(`/api/admin/seo-audit/jobs/${auditDetails.job.id}/pdf`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to download PDF');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seo-audit-report-${auditDetails.job.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Audit report downloaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Character counters
  const titleLength = metaTagsForm.watch("title")?.length || 0;
  const descriptionLength = metaTagsForm.watch("description")?.length || 0;

  // Dashboard metrics
  const totalPagesIndexed = allSeoSettings?.length || 0;
  const missingDescriptions = allSeoSettings?.filter(s => !s.description || s.description.length < 50).length || 0;
  const missingTitles = allSeoSettings?.filter(s => !s.title || s.title.length < 10).length || 0;

  // Audit metrics
  const auditResults = auditDetails?.results || [];
  const totalPagesScanned = auditResults.length;
  const totalIssues = auditResults.reduce((sum, result) => {
    let issues = 0;
    if (result.hasMissingTitle) issues++;
    if (result.hasMissingDescription) issues++;
    if (result.hasDuplicateTitle) issues++;
    if (result.hasDuplicateDescription) issues++;
    if (result.missingH1) issues++;
    if (result.multipleH1) issues++;
    if (result.imagesWithoutAlt && result.imagesWithoutAlt > 0) issues++;
    if (result.brokenLinkCount && result.brokenLinkCount > 0) issues++;
    if (!result.isMobileFriendly) issues++;
    return sum + issues;
  }, 0);
  
  const criticalIssues = auditResults.reduce((sum, result) => {
    let critical = 0;
    if (result.hasMissingTitle) critical++;
    if (result.hasMissingDescription) critical++;
    if (result.missingH1) critical++;
    if (result.brokenLinkCount && result.brokenLinkCount > 0) critical++;
    return sum + critical;
  }, 0);

  // Issue breakdowns
  const missingMetaTitles = auditResults.filter(r => r.hasMissingTitle);
  const missingMetaDescriptions = auditResults.filter(r => r.hasMissingDescription);
  const duplicateTitles = auditResults.filter(r => r.hasDuplicateTitle);
  const duplicateDescriptions = auditResults.filter(r => r.hasDuplicateDescription);
  const h1Issues = auditResults.filter(r => r.missingH1 || r.multipleH1);
  const imageAltIssues = auditResults.filter(r => r.imagesWithoutAlt && r.imagesWithoutAlt > 0);
  const brokenLinkIssues = auditResults.filter(r => r.brokenLinkCount && r.brokenLinkCount > 0);
  const mobileIssues = auditResults.filter(r => !r.isMobileFriendly);

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
      <TooltipProvider>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="heading-admin-seo">
              SEO Management
            </h1>
            <p className="text-muted-foreground">
              Manage SEO settings, sitemap, robots.txt, and run SEO audits
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full max-w-4xl grid-cols-6">
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
              <TabsTrigger value="audit" data-testid="tab-seo-audit">
                <Search className="w-4 h-4 mr-2" />
                SEO Audit
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
                              <div className="flex items-center gap-2">
                                <FormLabel>Meta Title *</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Page title shown in search results. Keep under 60 characters for best display.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <FormControl>
                                <Input 
                                  placeholder="Enter page title" 
                                  {...field} 
                                  data-testid="input-meta-title" 
                                />
                              </FormControl>
                              <FormDescription>
                                <span data-testid="text-title-counter" className={titleLength > 60 ? "text-yellow-600" : ""}>
                                  {titleLength}/60 characters {titleLength > 60 && "(exceeds recommended length)"}
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
                              <div className="flex items-center gap-2">
                                <FormLabel>Meta Description *</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Brief summary shown in search results. Keep under 160 characters.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter page description" 
                                  {...field} 
                                  rows={3}
                                  data-testid="textarea-meta-description" 
                                />
                              </FormControl>
                              <FormDescription>
                                <span data-testid="text-description-counter" className={descriptionLength > 160 ? "text-yellow-600" : ""}>
                                  {descriptionLength}/160 characters {descriptionLength > 160 && "(exceeds recommended length)"}
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
                              <div className="flex items-center gap-2">
                                <FormLabel>Keywords (comma-separated)</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Comma-separated keywords relevant to the page content.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
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
                              <div className="flex items-center gap-2">
                                <FormLabel>Canonical URL</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      The preferred URL for this page if there are duplicates.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com/page" 
                                  {...field} 
                                  data-testid="input-canonical-url" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <div className="flex items-center gap-2">
                                    <FormLabel>Allow Indexing</FormLabel>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">
                                          Allow search engines to index this page in search results.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                  <FormDescription>
                                    Search engines can index this page
                                  </FormDescription>
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
                                  <div className="flex items-center gap-2">
                                    <FormLabel>Follow Links</FormLabel>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">
                                          Allow search engines to follow links on this page.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                  <FormDescription>
                                    Search engines can follow links on this page
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4 border-t pt-6">
                        <h3 className="text-lg font-semibold">Open Graph Tags</h3>
                        
                        <FormField
                          control={metaTagsForm.control}
                          name="ogTitle"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2">
                                <FormLabel>OG Title</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Title shown when shared on social media platforms.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
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
                              <div className="flex items-center gap-2">
                                <FormLabel>OG Description</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Description shown when shared on social media.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
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
                              <div className="flex items-center gap-2">
                                <FormLabel>OG Image URL</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Image displayed when shared on social media (recommended: 1200x630px).
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com/image.jpg" 
                                  {...field} 
                                  data-testid="input-og-image" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4 border-t pt-6">
                        <h3 className="text-lg font-semibold">Twitter Card Tags</h3>
                        
                        <FormField
                          control={metaTagsForm.control}
                          name="twitterCard"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2">
                                <FormLabel>Twitter Card Type</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Card format for Twitter shares. Summary for text, Large Image for featured image.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-twitter-card">
                                    <SelectValue />
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
                        className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))] text-white hover-elevate active-elevate-2 border border-[hsl(var(--success-border))]"
                        data-testid="button-save-meta-tags"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saveMetaTagsMutation.isPending ? "Saving..." : "Save Meta Tags"}
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
                    Configure which pages to include in your sitemap and generation settings
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
                                Allow sitemap generation for your site
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Include in Sitemap</h3>
                        
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
                                <FormLabel>Product Pages</FormLabel>
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
                                <FormLabel>Category Pages</FormLabel>
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
                                <FormLabel>Static Pages</FormLabel>
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
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger data-testid="select-changefreq">
                                  <SelectValue />
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
                            <FormDescription>
                              How frequently pages are likely to change
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={sitemapForm.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority: {typeof field.value === 'string' ? field.value : field.value?.toFixed(1)}</FormLabel>
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
                        className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))] text-white hover-elevate active-elevate-2 border border-[hsl(var(--success-border))]"
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
                        className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))] text-white hover-elevate active-elevate-2 border border-[hsl(var(--success-border))]"
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
                        className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))] text-white hover-elevate active-elevate-2 border border-[hsl(var(--success-border))]"
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

            {/* SEO Audit Tab */}
            <TabsContent value="audit" className="space-y-6">
              {/* Audit Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Audit Controls</CardTitle>
                  <CardDescription>
                    Run comprehensive SEO audits to identify issues across your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => startAuditMutation.mutate()}
                      disabled={startAuditMutation.isPending || auditDetails?.job.status === 'running'}
                      className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))] text-white hover-elevate active-elevate-2 border border-[hsl(var(--success-border))]"
                      data-testid="button-start-audit"
                    >
                      {(startAuditMutation.isPending || auditDetails?.job.status === 'running') ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Running Audit...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Start New Audit
                        </>
                      )}
                    </Button>

                    {auditDetails?.job && (
                      <Badge 
                        variant={
                          auditDetails.job.status === 'completed' ? 'default' : 
                          auditDetails.job.status === 'running' ? 'secondary' :
                          auditDetails.job.status === 'failed' ? 'destructive' : 'secondary'
                        }
                        data-testid="badge-audit-status"
                      >
                        {auditDetails.job.status === 'running' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                        Status: {auditDetails.job.status}
                      </Badge>
                    )}
                  </div>

                  {auditDetails?.job.status === 'running' && (
                    <div className="text-sm text-muted-foreground">
                      Scanning pages: {auditDetails.job.scannedPages} / {auditDetails.job.totalPages}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Latest Audit Results Summary */}
              {auditDetails?.job.status === 'completed' && (
                <>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pages Scanned</CardTitle>
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold" data-testid="text-audit-total-pages">
                          {totalPagesScanned}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Issues Found</CardTitle>
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold" data-testid="text-audit-total-issues">
                          {totalIssues}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                        <XCircle className="w-4 h-4 text-red-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600" data-testid="text-audit-critical-issues">
                          {criticalIssues}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Audit Date</CardTitle>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-medium" data-testid="text-audit-last-date">
                          {auditDetails.job.completedAt ? new Date(auditDetails.job.completedAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Issue Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Issue Breakdown by Category</CardTitle>
                      <CardDescription>
                        Detailed breakdown of SEO issues found during the audit
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Missing Meta Titles</span>
                            <Badge variant="destructive" data-testid="badge-missing-titles-count">
                              {missingMetaTitles.length}
                            </Badge>
                          </div>
                          {missingMetaTitles.length > 0 && (
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              {missingMetaTitles.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="truncate">• {result.url}</li>
                              ))}
                              {missingMetaTitles.length > 3 && (
                                <li>• +{missingMetaTitles.length - 3} more</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Missing Meta Descriptions</span>
                            <Badge variant="destructive" data-testid="badge-missing-descriptions-count">
                              {missingMetaDescriptions.length}
                            </Badge>
                          </div>
                          {missingMetaDescriptions.length > 0 && (
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              {missingMetaDescriptions.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="truncate">• {result.url}</li>
                              ))}
                              {missingMetaDescriptions.length > 3 && (
                                <li>• +{missingMetaDescriptions.length - 3} more</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Duplicate Titles</span>
                            <Badge variant={duplicateTitles.length > 0 ? "secondary" : "default"} data-testid="badge-duplicate-titles-count">
                              {duplicateTitles.length}
                            </Badge>
                          </div>
                          {duplicateTitles.length > 0 && (
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              {duplicateTitles.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="truncate">• {result.url}</li>
                              ))}
                              {duplicateTitles.length > 3 && (
                                <li>• +{duplicateTitles.length - 3} more</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Duplicate Descriptions</span>
                            <Badge variant={duplicateDescriptions.length > 0 ? "secondary" : "default"} data-testid="badge-duplicate-descriptions-count">
                              {duplicateDescriptions.length}
                            </Badge>
                          </div>
                          {duplicateDescriptions.length > 0 && (
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              {duplicateDescriptions.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="truncate">• {result.url}</li>
                              ))}
                              {duplicateDescriptions.length > 3 && (
                                <li>• +{duplicateDescriptions.length - 3} more</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">H1 Issues</span>
                            <Badge variant={h1Issues.length > 0 ? "destructive" : "default"} data-testid="badge-h1-issues-count">
                              {h1Issues.length}
                            </Badge>
                          </div>
                          {h1Issues.length > 0 && (
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              {h1Issues.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="truncate">
                                  • {result.url} {result.missingH1 ? '(missing)' : '(multiple)'}
                                </li>
                              ))}
                              {h1Issues.length > 3 && (
                                <li>• +{h1Issues.length - 3} more</li>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Images Without Alt Text</span>
                            <Badge variant={imageAltIssues.length > 0 ? "secondary" : "default"} data-testid="badge-image-alt-count">
                              {imageAltIssues.reduce((sum, r) => sum + (r.imagesWithoutAlt || 0), 0)} images
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Broken Links</span>
                            <Badge variant={brokenLinkIssues.length > 0 ? "destructive" : "default"} data-testid="badge-broken-links-count">
                              {brokenLinkIssues.reduce((sum, r) => sum + (r.brokenLinkCount || 0), 0)} links
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Non-Mobile-Friendly Pages</span>
                            <Badge variant={mobileIssues.length > 0 ? "secondary" : "default"} data-testid="badge-mobile-issues-count">
                              {mobileIssues.length}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Results Table */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Detailed Audit Results</CardTitle>
                          <CardDescription>
                            Complete list of all scanned pages and their issues
                          </CardDescription>
                        </div>
                        <Button
                          onClick={handleDownloadAuditPDF}
                          variant="outline"
                          data-testid="button-download-pdf"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF Report
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Page URL</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Issues</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {auditResults.map((result, idx) => {
                              const issueCount = [
                                result.hasMissingTitle,
                                result.hasMissingDescription,
                                result.hasDuplicateTitle,
                                result.hasDuplicateDescription,
                                result.missingH1,
                                result.multipleH1,
                                result.imagesWithoutAlt && result.imagesWithoutAlt > 0,
                                result.brokenLinkCount && result.brokenLinkCount > 0,
                                !result.isMobileFriendly
                              ].filter(Boolean).length;

                              const isCritical = result.hasMissingTitle || result.hasMissingDescription || result.missingH1 || (result.brokenLinkCount && result.brokenLinkCount > 0);

                              return (
                                <TableRow key={idx} data-testid={`row-audit-result-${idx}`}>
                                  <TableCell className="font-medium truncate max-w-xs">{result.url}</TableCell>
                                  <TableCell className="truncate max-w-xs">{result.pageTitle || result.metaTitle || 'No title'}</TableCell>
                                  <TableCell>
                                    {issueCount > 0 ? (
                                      <Badge variant={isCritical ? "destructive" : "secondary"}>
                                        {issueCount} {issueCount === 1 ? 'issue' : 'issues'}
                                      </Badge>
                                    ) : (
                                      <Badge variant="default">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Good
                                      </Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {isCritical ? (
                                      <span className="text-red-600 text-sm">Critical</span>
                                    ) : issueCount > 0 ? (
                                      <span className="text-yellow-600 text-sm">Warning</span>
                                    ) : (
                                      <span className="text-green-600 text-sm">Pass</span>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!auditDetails && !auditDetailsLoading && (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <Search className="w-16 h-16 mx-auto text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">No Audit Results Yet</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Click "Start New Audit" to run your first SEO audit and identify issues across your site.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </TooltipProvider>
    </AdminLayout>
  );
}
