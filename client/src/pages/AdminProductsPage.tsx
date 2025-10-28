import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Package, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product } from "@shared/schema";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from "@uppy/core";

export default function AdminProductsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Check admin authentication
  const { data: authCheck, isLoading: authLoading } = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/check"],
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: (productId: string) =>
      apiRequest("DELETE", `/api/admin/products/${productId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Delete failed",
        description: "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(productId);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  if (authLoading || isLoading) {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products Management</h1>
            <p className="text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)} data-testid="button-add-product">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Update product details" : "Add a new product to your inventory"}
                </DialogDescription>
              </DialogHeader>
              <ProductForm 
                product={editingProduct} 
                onClose={handleDialogClose}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Products ({products?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {!products || products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No products yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover-elevate transition-all"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                        data-testid={`button-edit-product-${product.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                        data-testid={`button-delete-product-${product.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

// Helper function to generate slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

// Product Form Component
function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { toast } = useToast();
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!product);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    image: product?.image || "",
    category: product?.category || "",
    stock: product?.stock?.toString() || "0",
    inStock: product?.inStock ?? true,
    specifications: product?.specifications || "{}",
    features: product?.features?.join("\n") || "",
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    metaKeywords: product?.metaKeywords?.join(", ") || "",
  });
  
  // Auto-generate slug from name when creating new product
  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      // Only auto-generate slug if creating new product and slug hasn't been manually edited
      ...(!slugManuallyEdited ? { slug: generateSlug(name) } : {})
    }));
  };

  // Handle getting upload parameters
  const handleGetUploadParameters = async () => {
    try {
      const response = await apiRequest("POST", "/api/admin/products/upload", {}) as unknown as { uploadURL: string };
      return {
        method: "PUT" as const,
        url: response.uploadURL,
      };
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to get upload URL",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Handle upload completion
  const handleUploadComplete = async (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    if (result.successful && result.successful.length > 0) {
      setUploading(true);
      try {
        const uploadedFile = result.successful[0];
        const imageURL = uploadedFile.uploadURL;
        
        // Set ACL policy and get normalized path
        const response = await apiRequest("PUT", "/api/admin/products/images", { imageURL }) as unknown as { objectPath: string };
        
        // Update form data with the normalized path
        setFormData(prev => ({
          ...prev,
          image: response.objectPath,
        }));
        
        toast({
          title: "Upload successful",
          description: "Product image uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "Failed to process uploaded image",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      if (product) {
        return apiRequest("PATCH", `/api/admin/products/${product.id}`, data);
      }
      return apiRequest("POST", "/api/admin/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: product ? "Product updated" : "Product added",
        description: product ? "Product updated successfully" : "New product added successfully",
      });
      onClose();
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "Failed to save product";
      const isSlugError = errorMessage.toLowerCase().includes("slug") || 
                         errorMessage.toLowerCase().includes("unique");
      
      toast({
        title: "Save failed",
        description: isSlugError 
          ? "A product with this slug already exists. Please use a different slug."
          : errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug)) {
      toast({
        title: "Invalid slug",
        description: "Slug must contain only lowercase letters, numbers, and hyphens",
        variant: "destructive",
      });
      return;
    }
    
    const data = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      price: formData.price,
      originalPrice: formData.originalPrice || null,
      image: formData.image,
      category: formData.category,
      stock: parseInt(formData.stock),
      inStock: formData.inStock,
      specifications: formData.specifications,
      features: formData.features.split("\n").filter(f => f.trim()),
      metaTitle: formData.metaTitle || null,
      metaDescription: formData.metaDescription || null,
      metaKeywords: formData.metaKeywords 
        ? formData.metaKeywords.split(",").map(k => k.trim()).filter(k => k)
        : null,
    };

    saveMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            data-testid="input-product-name"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            data-testid="input-product-category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">
          SEO Slug <span className="text-destructive">*</span>
        </Label>
        <Input
          id="slug"
          data-testid="input-product-slug"
          value={formData.slug}
          onChange={(e) => {
            setSlugManuallyEdited(true);
            setFormData({ ...formData, slug: e.target.value });
          }}
          placeholder="hp-deskjet-3755"
          required
        />
        <p className="text-xs text-muted-foreground">
          SEO-friendly URL slug (lowercase, hyphens only). Example: hp-deskjet-3755
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          data-testid="input-product-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            data-testid="input-product-price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (optional)</Label>
          <Input
            id="originalPrice"
            data-testid="input-product-original-price"
            type="number"
            step="0.01"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            data-testid="input-product-stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inStock">In Stock</Label>
          <select
            id="inStock"
            data-testid="select-product-in-stock"
            value={formData.inStock.toString()}
            onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "true" })}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>
        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <ObjectUploader
              maxNumberOfFiles={1}
              maxFileSize={10485760}
              onGetUploadParameters={handleGetUploadParameters}
              onComplete={handleUploadComplete}
              variant="outline"
              testId="button-upload-product-image"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Processing..." : "Upload Image"}
            </ObjectUploader>
            <Input
              id="image"
              data-testid="input-product-image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Or enter image URL directly"
            />
            <p className="text-xs text-muted-foreground">
              Upload an image or enter a URL directly (for backward compatibility)
            </p>
          </div>
          {formData.image && (
            <div className="w-32 h-32 border rounded-lg overflow-hidden flex-shrink-0" data-testid="preview-product-image">
              <img
                src={formData.image}
                alt="Product preview"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>';
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          data-testid="input-product-features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          rows={4}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specifications">Specifications (JSON)</Label>
        <Textarea
          id="specifications"
          data-testid="input-product-specifications"
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          rows={4}
          placeholder='{"key": "value"}'
        />
      </div>

      {/* SEO Fields Section */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="metaTitle">
            Meta Title <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="metaTitle"
            data-testid="input-product-meta-title"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            placeholder="Custom meta title for search engines"
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground">
            {formData.metaTitle.length}/60 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">
            Meta Description <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="metaDescription"
            data-testid="input-product-meta-description"
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            placeholder="Brief description for search results"
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground">
            {formData.metaDescription.length}/160 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaKeywords">
            Meta Keywords <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="metaKeywords"
            data-testid="input-product-meta-keywords"
            value={formData.metaKeywords}
            onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
            placeholder="hp printer, inkjet, wireless, color"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated keywords for search engines
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : product ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
