import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Check, Truck, Zap, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

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

const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 19.99,
    icon: Zap,
  },
  {
    id: "overnight",
    name: "Overnight Delivery",
    description: "Next business day",
    price: 39.99,
    icon: Zap,
  },
];

function StripePaymentForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
      redirect: "if_required",
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button
        type="submit"
        size="lg"
        className="w-full font-semibold"
        disabled={!stripe || isProcessing}
        data-testid="button-confirm-payment"
      >
        {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("cash");
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: cartData, isLoading: cartLoading } = useQuery<{ items: any[] }>({
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
      toast({
        title: "Order placed successfully!",
        description: "A confirmation email has been sent to your email address.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Order failed",
        description: error.message || "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createPaymentIntentMutation = useMutation({
    mutationFn: (amount: number) => apiRequest("POST", "/api/create-payment-intent", { amount }),
    onSuccess: (data: any) => {
      setClientSecret(data.clientSecret);
    },
    onError: () => {
      toast({
        title: "Payment setup failed",
        description: "Unable to initialize payment. Please try again or use Cash on Delivery.",
        variant: "destructive",
      });
    },
  });

  const cartItems = cartData?.items || [];
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const selectedShipping = shippingOptions.find(opt => opt.id === shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  // Reset client secret when shipping method changes
  useEffect(() => {
    setClientSecret(null);
  }, [shippingMethod]);

  // Create payment intent when card payment is selected
  useEffect(() => {
    if (step === 3 && paymentMethod === "card" && !clientSecret && !createPaymentIntentMutation.isPending && stripePromise) {
      createPaymentIntentMutation.mutate(total);
    }
  }, [step, paymentMethod, total, clientSecret]);

  // Auto-select cash if card is not available
  useEffect(() => {
    if (!stripePromise && paymentMethod === "card") {
      setPaymentMethod("cash");
    }
  }, [stripePromise, paymentMethod]);

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
    { number: 1, title: "Shipping" },
    { number: 2, title: "Delivery" },
    { number: 3, title: "Payment" },
    { number: 4, title: "Confirmation" },
  ];

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!shippingData) return;

    createOrderMutation.mutate({
      email: shippingData.email,
      customerName: shippingData.name,
      shippingAddress: shippingData.address,
      shippingCity: shippingData.city,
      shippingState: shippingData.state,
      shippingZip: shippingData.zip,
      shippingPhone: shippingData.phone,
      shippingMethod,
      paymentMethod,
    });
  };

  const handleStripePaymentSuccess = () => {
    handlePlaceOrder();
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
            {/* Step 1: Shipping Information */}
            {step === 1 && (
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
                              <Input {...field} type="email" placeholder="john@example.com" data-testid="input-email" />
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
                              <Input {...field} placeholder="John Doe" data-testid="input-name" />
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
                            <FormLabel>Street Address *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123 Main St" data-testid="input-address" />
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
                                <Input {...field} placeholder="New York" data-testid="input-city" />
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
                                <Input {...field} placeholder="NY" data-testid="input-state" />
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
                                <Input {...field} placeholder="10001" data-testid="input-zip" />
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
                      <div className="pt-4">
                        <Button type="submit" size="lg" className="w-full font-semibold" data-testid="button-continue-to-shipping">
                          Continue to Shipping Method
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Method */}
            {step === 2 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Shipping Method</h2>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4 mb-8">
                    {shippingOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <label
                          key={option.id}
                          htmlFor={option.id}
                          className="flex items-center gap-4 p-4 border rounded-md hover-elevate cursor-pointer"
                          data-testid={`radio-shipping-${option.id}`}
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <span className="font-medium cursor-pointer block">
                                {option.name}
                              </span>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
                              </p>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </RadioGroup>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1" data-testid="button-back-to-info">
                      Back
                    </Button>
                    <Button size="lg" onClick={() => setStep(3)} className="flex-1 font-semibold" data-testid="button-continue-to-payment">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "cash")} className="space-y-4 mb-6">
                    <label
                      htmlFor="card"
                      className="flex items-start gap-3 p-4 border rounded-md hover-elevate cursor-pointer"
                      data-testid="radio-card-payment"
                    >
                      <RadioGroupItem value="card" id="card" disabled={!stripePromise} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className="w-5 h-5 text-primary" />
                          <span className="font-medium cursor-pointer">
                            Credit/Debit Card
                          </span>
                          {!stripePromise && (
                            <span className="text-xs text-muted-foreground">(Not configured)</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {stripePromise ? "Secure payment with Stripe" : "Stripe API keys required to enable card payments"}
                        </p>
                      </div>
                    </label>
                    <label
                      htmlFor="cash"
                      className="flex items-start gap-3 p-4 border rounded-md hover-elevate cursor-pointer"
                      data-testid="radio-cash-on-delivery"
                    >
                      <RadioGroupItem value="cash" id="cash" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Banknote className="w-5 h-5 text-primary" />
                          <span className="font-medium cursor-pointer">
                            Cash on Delivery
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pay with cash when your order is delivered
                        </p>
                      </div>
                    </label>
                  </RadioGroup>

                  {paymentMethod === "card" && clientSecret && stripePromise ? (
                    <div className="mb-6">
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <StripePaymentForm amount={total} onSuccess={handleStripePaymentSuccess} />
                      </Elements>
                    </div>
                  ) : paymentMethod === "card" && !stripePromise ? (
                    <div className="text-center py-6 mb-6">
                      <p className="text-muted-foreground">Card payments are not configured. Please use Cash on Delivery.</p>
                    </div>
                  ) : null}

                  {paymentMethod === "cash" && (
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="button-back-to-shipping">
                        Back
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
                  )}

                  {paymentMethod === "card" && !clientSecret && stripePromise && (
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="button-back-to-shipping">
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 font-semibold"
                        disabled
                      >
                        Loading payment...
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Order Confirmation */}
            {step === 4 && orderId && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                  <p className="text-muted-foreground mb-2">
                    Thank you for your order. Your order number is:
                  </p>
                  <p className="text-2xl font-mono font-semibold text-primary mb-8" data-testid="text-order-id">
                    #{orderId.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-muted-foreground mb-8">
                    A confirmation email has been sent to <strong>{shippingData?.email}</strong>
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => navigate("/")} data-testid="button-continue-shopping">
                      Continue Shopping
                    </Button>
                    <Button onClick={() => navigate("/orders")} data-testid="button-view-orders">
                      View Orders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step < 4 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex gap-3" data-testid={`summary-item-${item.product.id}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span data-testid="text-shipping">
                        {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span data-testid="text-tax">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span data-testid="text-total">${total.toFixed(2)}</span>
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
