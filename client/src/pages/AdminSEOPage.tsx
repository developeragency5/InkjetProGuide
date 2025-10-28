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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Search, Plus, Edit, Trash2, Globe, FileText } from "lucide-react";
import type { SeoSetting, ContentPage } from "@shared/schema";
import { insertSeoSettingSchema, insertContentPageSchema } from "@shared/schema";

// Extended schemas with custom validation
const seoFormSchema = insertSeoSettingSchema.extend({
  keywords: z.string().optional().transform(val => 
    val ? val.split(",").map(k => k.trim()).filter(k => k) : []
  ),
});

const contentFormSchema = insertContentPageSchema;

type SeoFormValues = z.infer<typeof seoFormSchema>;
type ContentFormValues = z.infer<typeof contentFormSchema>;

export default function AdminSEOPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [seoDialogOpen, setSeoDialogOpen] = useState(false);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [editingSeo, setEditingSeo] = useState<SeoSetting | null>(null);
  const [editingContent, setEditingContent] = useState<ContentPage | null>(null);

  // SEO form
  const seoForm = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      page: "",
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    },
  });

  // Content form
  const contentForm = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      slug: "",
      title: "",
      content: "",
      category: "",
      isPublished: true,
    },
  });

  // Check admin authentication
  const { data: authCheck, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/check"],
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  // Fetch SEO settings
  const { data: seoSettings, isLoading: seoLoading } = useQuery<SeoSetting[]>({
    queryKey: ["/api/admin/seo-settings"],
  });

  // Fetch content pages
  const { data: contentPages, isLoading: contentLoading } = useQuery<ContentPage[]>({
    queryKey: ["/api/admin/content-pages"],
  });

  // SEO mutations
  const createSeoMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/admin/seo-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-settings"] });
      toast({ title: "Success", description: "SEO setting created successfully" });
      setSeoDialogOpen(false);
      seoForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateSeoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest("PATCH", `/api/admin/seo-settings/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-settings"] });
      toast({ title: "Success", description: "SEO setting updated successfully" });
      setSeoDialogOpen(false);
      seoForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteSeoMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/seo-settings/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-settings"] });
      toast({ title: "Success", description: "SEO setting deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Content mutations
  const createContentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/admin/content-pages", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content-pages"] });
      toast({ title: "Success", description: "Content page created successfully" });
      setContentDialogOpen(false);
      contentForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest("PATCH", `/api/admin/content-pages/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content-pages"] });
      toast({ title: "Success", description: "Content page updated successfully" });
      setContentDialogOpen(false);
      contentForm.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/content-pages/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content-pages"] });
      toast({ title: "Success", description: "Content page deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleEditSeo = (seo: SeoSetting) => {
    setEditingSeo(seo);
    seoForm.reset({
      page: seo.page,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords?.join(", ") || "",
      ogTitle: seo.ogTitle || "",
      ogDescription: seo.ogDescription || "",
      ogImage: seo.ogImage || "",
    });
    setSeoDialogOpen(true);
  };

  const handleEditContent = (content: ContentPage) => {
    setEditingContent(content);
    contentForm.reset({
      slug: content.slug,
      title: content.title,
      content: content.content,
      category: content.category,
      isPublished: content.isPublished,
    });
    setContentDialogOpen(true);
  };

  const handleSeoSubmit = (data: SeoFormValues) => {
    const submitData = {
      ...data,
      keywords: typeof data.keywords === 'string' 
        ? data.keywords.split(",").map(k => k.trim()).filter(k => k)
        : data.keywords,
    };
    
    if (editingSeo) {
      updateSeoMutation.mutate({ id: editingSeo.id, data: submitData });
    } else {
      createSeoMutation.mutate(submitData);
    }
  };

  const handleContentSubmit = (data: ContentFormValues) => {
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent.id, data });
    } else {
      createContentMutation.mutate(data);
    }
  };

  const filteredSeoSettings = seoSettings?.filter(
    (setting) =>
      setting.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
      setting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContentPages = contentPages?.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold mb-2" data-testid="heading-admin-seo">SEO & Content Management</h1>
          <p className="text-muted-foreground">
            Manage SEO settings and content pages for your application
          </p>
        </div>

        <Tabs defaultValue="seo" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="seo" data-testid="tab-seo-settings">
              <Globe className="w-4 h-4 mr-2" />
              SEO Settings
            </TabsTrigger>
            <TabsTrigger value="content" data-testid="tab-content-pages">
              <FileText className="w-4 h-4 mr-2" />
              Content Pages
            </TabsTrigger>
          </TabsList>

          {/* SEO Settings Tab */}
          <TabsContent value="seo" className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search SEO settings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-seo"
                />
              </div>
              <Dialog open={seoDialogOpen} onOpenChange={(open) => {
                setSeoDialogOpen(open);
                if (!open) {
                  seoForm.reset();
                  setEditingSeo(null);
                }
              }}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-seo">
                    <Plus className="w-4 h-4 mr-2" />
                    Add SEO Setting
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle data-testid="text-seo-dialog-title">
                      {editingSeo ? "Edit SEO Setting" : "Add SEO Setting"}
                    </DialogTitle>
                    <DialogDescription>
                      Configure SEO metadata for a specific page in your application
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...seoForm}>
                    <form onSubmit={seoForm.handleSubmit(handleSeoSubmit)} className="space-y-4 py-4">
                      <FormField
                        control={seoForm.control}
                        name="page"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Page Identifier *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., home, products, about" {...field} data-testid="input-page" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={seoForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="Page title for search engines" {...field} data-testid="input-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={seoForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description for search results" 
                                {...field} 
                                rows={3}
                                data-testid="textarea-description" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={seoForm.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Keywords (comma-separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="hp, printer, inkjet" {...field} data-testid="input-keywords" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={seoForm.control}
                        name="ogTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Open Graph Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Title for social media sharing" {...field} data-testid="input-og-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={seoForm.control}
                        name="ogDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Open Graph Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description for social media sharing" 
                                {...field} 
                                rows={2}
                                data-testid="textarea-og-description" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={seoForm.control}
                        name="ogImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Open Graph Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} data-testid="input-og-image" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setSeoDialogOpen(false)} 
                          data-testid="button-cancel-seo"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" data-testid="button-save-seo">
                          {editingSeo ? "Update" : "Create"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {seoLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : filteredSeoSettings && filteredSeoSettings.length > 0 ? (
              <div className="grid gap-4">
                {filteredSeoSettings.map((setting) => (
                  <Card key={setting.id} className="hover-elevate transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg" data-testid={`text-seo-title-${setting.page}`}>
                            {setting.title}
                          </CardTitle>
                          <CardDescription className="mt-1" data-testid={`text-seo-page-${setting.page}`}>
                            Page: {setting.page}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEditSeo(setting)}
                            data-testid={`button-edit-seo-${setting.page}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => deleteSeoMutation.mutate(setting.id)}
                            data-testid={`button-delete-seo-${setting.page}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Description:</p>
                        <p className="text-sm text-muted-foreground" data-testid={`text-seo-description-${setting.page}`}>
                          {setting.description}
                        </p>
                      </div>
                      {setting.keywords && setting.keywords.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Keywords:</p>
                          <p className="text-sm text-muted-foreground" data-testid={`text-seo-keywords-${setting.page}`}>
                            {setting.keywords.join(", ")}
                          </p>
                        </div>
                      )}
                      {setting.ogTitle && (
                        <div>
                          <p className="text-sm font-medium mb-1">OG Title:</p>
                          <p className="text-sm text-muted-foreground" data-testid={`text-seo-og-title-${setting.page}`}>
                            {setting.ogTitle}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground" data-testid="text-no-seo-settings">
                    No SEO settings found. Create your first one!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Content Pages Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search content pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-content"
                />
              </div>
              <Dialog open={contentDialogOpen} onOpenChange={(open) => {
                setContentDialogOpen(open);
                if (!open) {
                  contentForm.reset();
                  setEditingContent(null);
                }
              }}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-content">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content Page
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle data-testid="text-content-dialog-title">
                      {editingContent ? "Edit Content Page" : "Add Content Page"}
                    </DialogTitle>
                    <DialogDescription>
                      Create or edit dynamic content pages for your application
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...contentForm}>
                    <form onSubmit={contentForm.handleSubmit(handleContentSubmit)} className="space-y-4 py-4">
                      <FormField
                        control={contentForm.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL Slug *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., privacy-policy, terms-of-service" {...field} data-testid="input-slug" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contentForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Page Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="Page title" {...field} data-testid="input-content-title" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contentForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-category">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="page" data-testid="select-item-page">Page</SelectItem>
                                <SelectItem value="blog" data-testid="select-item-blog">Blog</SelectItem>
                                <SelectItem value="guide" data-testid="select-item-guide">Guide</SelectItem>
                                <SelectItem value="documentation" data-testid="select-item-documentation">Documentation</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contentForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Page content (supports HTML)" 
                                {...field} 
                                rows={10}
                                data-testid="textarea-content" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contentForm.control}
                        name="isPublished"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-published"
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Published</FormLabel>
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => setContentDialogOpen(false)} 
                          data-testid="button-cancel-content"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" data-testid="button-save-content">
                          {editingContent ? "Update" : "Create"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {contentLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : filteredContentPages && filteredContentPages.length > 0 ? (
              <div className="grid gap-4">
                {filteredContentPages.map((page) => (
                  <Card key={page.id} className="hover-elevate transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2" data-testid={`text-content-title-${page.slug}`}>
                            {page.title}
                            {!page.isPublished && (
                              <span className="text-xs px-2 py-1 bg-muted rounded" data-testid={`badge-draft-${page.slug}`}>
                                Draft
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1" data-testid={`text-content-meta-${page.slug}`}>
                            /{page.slug} • {page.category}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEditContent(page)}
                            data-testid={`button-edit-content-${page.slug}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => deleteContentMutation.mutate(page.id)}
                            data-testid={`button-delete-content-${page.slug}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-content-preview-${page.slug}`}>
                        {page.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground" data-testid="text-no-content-pages">
                    No content pages found. Create your first one!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
