import { useState } from "react";
import { useLocation } from "wouter";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const shippingSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/, "Invalid phone number"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: cartData, isLoading: cartLoading } = useQuery({
    queryKey: ["/api/cart"],
  });

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: (orderData: any) => apiRequest("POST", "/api/orders", orderData),
    onSuccess: (data: any) => {
      setOrderId(data.order.id);
      setStep(4);
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: () => {
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const cartItems = cartData?.items || [];
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (cartItems.length === 0 && step < 4) {
    navigate("/cart");
    return null;
  }

  const steps = [
    { number: 1, title: "Cart Review" },
    { number: 2, title: "Shipping" },
    { number: 3, title: "Payment" },
    { number: 4, title: "Confirmation" },
  ];

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(3);
  };

  const handlePlaceOrder = () => {
    if (!shippingData) return;

    createOrderMutation.mutate({
      shippingAddress: shippingData.address,
      shippingCity: shippingData.city,
      shippingState: shippingData.state,
      shippingZip: shippingData.zip,
      shippingPhone: shippingData.phone,
      paymentMethod,
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                      step > s.number
                        ? "bg-primary text-primary-foreground"
                        : step === s.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                    data-testid={`step-indicator-${s.number}`}
                  >
                    {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                  </div>
                  <span
                    className={`text-sm font-medium text-center ${
                      step >= s.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      step > s.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Cart Review */}
            {step === 1 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Review Your Cart</h2>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b" data-testid={`review-item-${item.id}`}>
                        <div className="w-20 h-20 bg-background rounded-md flex items-center justify-center border flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="w-full font-semibold" onClick={() => setStep(2)} data-testid="button-continue-to-shipping">
                    Continue to Shipping
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleShippingSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="CA" data-testid="input-state" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="12345" data-testid="input-zip" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="(555) 123-4567" data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" data-testid="button-back-to-cart">
                          Back to Cart
                        </Button>
                        <Button type="submit" size="lg" className="flex-1 font-semibold" data-testid="button-continue-to-payment">
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 border rounded-md hover-elevate cursor-pointer" data-testid="radio-cash-on-delivery">
                      <RadioGroupItem value="cash" id="cash" />
                      <div className="flex-1">
                        <Label htmlFor="cash" className="font-medium cursor-pointer">
                          Cash on Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay with cash when your order is delivered
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border rounded-md hover-elevate opacity-50">
                      <RadioGroupItem value="card" id="card" disabled />
                      <div className="flex-1">
                        <Label htmlFor="card" className="font-medium">
                          Credit/Debit Card
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Payment by card (Currently unavailable)
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="button-back-to-shipping">
                      Back to Shipping
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 font-semibold"
                      onClick={handlePlaceOrder}
                      disabled={createOrderMutation.isPending}
                      data-testid="button-place-order"
                    >
                      {createOrderMutation.isPending ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Order Confirmation */}
            {step === 4 && orderId && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-status-online/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-status-online" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Order Confirmed!</h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Thank you for your order
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Order #{orderId.slice(0, 8)}
                  </p>
                  <div className="bg-card p-6 rounded-md border mb-8 text-left">
                    <h3 className="font-semibold mb-3">Delivery Information</h3>
                    <p className="text-sm text-muted-foreground mb-1">{shippingData?.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">{shippingData?.address}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {shippingData?.city}, {shippingData?.state} {shippingData?.zip}
                    </p>
                    <p className="text-sm text-muted-foreground">{shippingData?.phone}</p>
                  </div>
                  <p className="text-muted-foreground mb-8">
                    A confirmation email has been sent to <strong>{shippingData?.email}</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => navigate("/account")} className="flex-1" data-testid="button-view-orders">
                      View My Orders
                    </Button>
                    <Button onClick={() => navigate("/")} className="flex-1" data-testid="button-continue-shopping-confirmation">
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary - Sticky */}
          {step < 4 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
