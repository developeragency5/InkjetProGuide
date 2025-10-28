import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Search, Plus, Edit, Trash2, Globe, FileText } from "lucide-react";
import type { SeoSetting, ContentPage } from "@shared/schema";

export default function AdminSEOPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [seoDialogOpen, setSeoDialogOpen] = useState(false);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [editingSeo, setEditingSeo] = useState<SeoSetting | null>(null);
  const [editingContent, setEditingContent] = useState<ContentPage | null>(null);

  // SEO form state
  const [seoForm, setSeoForm] = useState({
    page: "",
    title: "",
    description: "",
    keywords: [] as string[],
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
  });

  // Content form state
  const [contentForm, setContentForm] = useState({
    slug: "",
    title: "",
    content: "",
    category: "",
    isPublished: true,
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
      resetSeoForm();
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
      resetSeoForm();
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
      resetContentForm();
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
      resetContentForm();
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

  const resetSeoForm = () => {
    setSeoForm({
      page: "",
      title: "",
      description: "",
      keywords: [],
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    });
    setEditingSeo(null);
  };

  const resetContentForm = () => {
    setContentForm({
      slug: "",
      title: "",
      content: "",
      category: "",
      isPublished: true,
    });
    setEditingContent(null);
  };

  const handleEditSeo = (seo: SeoSetting) => {
    setEditingSeo(seo);
    setSeoForm({
      page: seo.page,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords || [],
      ogTitle: seo.ogTitle || "",
      ogDescription: seo.ogDescription || "",
      ogImage: seo.ogImage || "",
    });
    setSeoDialogOpen(true);
  };

  const handleEditContent = (content: ContentPage) => {
    setEditingContent(content);
    setContentForm({
      slug: content.slug,
      title: content.title,
      content: content.content,
      category: content.category,
      isPublished: content.isPublished,
    });
    setContentDialogOpen(true);
  };

  const handleSeoSubmit = () => {
    if (editingSeo) {
      updateSeoMutation.mutate({ id: editingSeo.id, data: seoForm });
    } else {
      createSeoMutation.mutate(seoForm);
    }
  };

  const handleContentSubmit = () => {
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent.id, data: contentForm });
    } else {
      createContentMutation.mutate(contentForm);
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
                if (!open) resetSeoForm();
              }}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-seo">
                    <Plus className="w-4 h-4 mr-2" />
                    Add SEO Setting
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingSeo ? "Edit SEO Setting" : "Add SEO Setting"}</DialogTitle>
                    <DialogDescription>
                      Configure SEO metadata for a specific page in your application
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="page">Page Identifier *</Label>
                      <Input
                        id="page"
                        placeholder="e.g., home, products, about"
                        value={seoForm.page}
                        onChange={(e) => setSeoForm({ ...seoForm, page: e.target.value })}
                        data-testid="input-page"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Meta Title *</Label>
                      <Input
                        id="title"
                        placeholder="Page title for search engines"
                        value={seoForm.title}
                        onChange={(e) => setSeoForm({ ...seoForm, title: e.target.value })}
                        data-testid="input-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Meta Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description for search results"
                        value={seoForm.description}
                        onChange={(e) => setSeoForm({ ...seoForm, description: e.target.value })}
                        rows={3}
                        data-testid="textarea-description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input
                        id="keywords"
                        placeholder="hp, printer, inkjet"
                        value={seoForm.keywords.join(", ")}
                        onChange={(e) => setSeoForm({ 
                          ...seoForm, 
                          keywords: e.target.value.split(",").map(k => k.trim()).filter(k => k) 
                        })}
                        data-testid="input-keywords"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogTitle">Open Graph Title</Label>
                      <Input
                        id="ogTitle"
                        placeholder="Title for social media sharing"
                        value={seoForm.ogTitle}
                        onChange={(e) => setSeoForm({ ...seoForm, ogTitle: e.target.value })}
                        data-testid="input-og-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogDescription">Open Graph Description</Label>
                      <Textarea
                        id="ogDescription"
                        placeholder="Description for social media sharing"
                        value={seoForm.ogDescription}
                        onChange={(e) => setSeoForm({ ...seoForm, ogDescription: e.target.value })}
                        rows={2}
                        data-testid="textarea-og-description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogImage">Open Graph Image URL</Label>
                      <Input
                        id="ogImage"
                        placeholder="https://example.com/image.jpg"
                        value={seoForm.ogImage}
                        onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                        data-testid="input-og-image"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSeoDialogOpen(false)} data-testid="button-cancel-seo">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSeoSubmit}
                      disabled={!seoForm.page || !seoForm.title || !seoForm.description}
                      data-testid="button-save-seo"
                    >
                      {editingSeo ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
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
                          <CardTitle className="text-lg" data-testid={`text-seo-title-${setting.page}`}>{setting.title}</CardTitle>
                          <CardDescription className="mt-1">Page: {setting.page}</CardDescription>
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
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      {setting.keywords && setting.keywords.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Keywords:</p>
                          <p className="text-sm text-muted-foreground">{setting.keywords.join(", ")}</p>
                        </div>
                      )}
                      {setting.ogTitle && (
                        <div>
                          <p className="text-sm font-medium mb-1">OG Title:</p>
                          <p className="text-sm text-muted-foreground">{setting.ogTitle}</p>
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
                  <p className="text-muted-foreground">No SEO settings found. Create your first one!</p>
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
                if (!open) resetContentForm();
              }}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-content">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content Page
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingContent ? "Edit Content Page" : "Add Content Page"}</DialogTitle>
                    <DialogDescription>
                      Create or edit dynamic content pages for your application
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        placeholder="e.g., privacy-policy, terms-of-service"
                        value={contentForm.slug}
                        onChange={(e) => setContentForm({ ...contentForm, slug: e.target.value })}
                        data-testid="input-slug"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content-title">Page Title *</Label>
                      <Input
                        id="content-title"
                        placeholder="Page title"
                        value={contentForm.title}
                        onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                        data-testid="input-content-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={contentForm.category}
                        onValueChange={(value) => setContentForm({ ...contentForm, category: value })}
                      >
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="page">Page</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="documentation">Documentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Page content (supports HTML)"
                        value={contentForm.content}
                        onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                        rows={10}
                        data-testid="textarea-content"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={contentForm.isPublished}
                        onCheckedChange={(checked) => setContentForm({ ...contentForm, isPublished: checked })}
                        data-testid="switch-published"
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setContentDialogOpen(false)} data-testid="button-cancel-content">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleContentSubmit}
                      disabled={!contentForm.slug || !contentForm.title || !contentForm.content || !contentForm.category}
                      data-testid="button-save-content"
                    >
                      {editingContent ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
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
                              <span className="text-xs px-2 py-1 bg-muted rounded">Draft</span>
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1">/{page.slug} • {page.category}</CardDescription>
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
                      <p className="text-sm text-muted-foreground line-clamp-3">{page.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No content pages found. Create your first one!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
