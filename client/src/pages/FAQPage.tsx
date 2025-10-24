import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Search, ThumbsUp, ThumbsDown, ChevronDown, MessageSquare, Mail, Phone, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Faq } from "@shared/schema";

const FAQ_CATEGORIES = [
  "All Questions",
  "Buying Questions",
  "Technical Support",
  "Shipping & Returns",
  "Ink & Supplies",
  "Warranty & Service",
  "Maintenance",
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());
  const [viewedFaqs, setViewedFaqs] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const { data: faqs = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const viewMutation = useMutation({
    mutationFn: async (faqId: string) => {
      return fetch(`/api/faqs/${faqId}`).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faqs"] });
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async ({ faqId, helpful }: { faqId: string; helpful: boolean }) => {
      return apiRequest("POST", `/api/faqs/${faqId}/feedback`, { helpful });
    },
    onSuccess: (_data, variables) => {
      setFeedbackGiven(prev => new Set(prev).add(variables.faqId));
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our FAQs.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/faqs"] });
    },
  });

  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory !== "All Questions") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [faqs, selectedCategory, searchQuery]);

  const popularFaqs = useMemo(() => {
    return [...faqs]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, [faqs]);

  const groupedFaqs = useMemo(() => {
    const grouped: Record<string, Faq[]> = {};
    filteredFaqs.forEach(faq => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [filteredFaqs]);

  const handleFeedback = (faqId: string, helpful: boolean) => {
    feedbackMutation.mutate({ faqId, helpful });
  };

  const getRelatedFaqs = (faq: Faq): Faq[] => {
    if (!faq.relatedQuestions || faq.relatedQuestions.length === 0) return [];
    return faqs.filter(f => faq.relatedQuestions?.includes(f.id));
  };

  const handleAccordionChange = (faqId: string) => {
    if (!viewedFaqs.has(faqId)) {
      setViewedFaqs(prev => new Set(prev).add(faqId));
      viewMutation.mutate(faqId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Find answers to common questions about our HP inkjet printers, shipping, and support
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-background text-foreground"
                data-testid="input-faq-search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Most Popular Questions */}
        {selectedCategory === "All Questions" && !searchQuery && popularFaqs.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Most Popular Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion 
                type="single" 
                collapsible 
                className="w-full"
                onValueChange={(value) => {
                  if (value) {
                    const faqId = value.replace('popular-', '');
                    handleAccordionChange(faqId);
                  }
                }}
              >
                {popularFaqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`popular-${faq.id}`}>
                    <AccordionTrigger
                      className="hover:no-underline text-left"
                      data-testid={`accordion-popular-${index}`}
                    >
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="mt-1">
                          {faq.views} views
                        </Badge>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-20 pr-4 space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>

                        {/* Feedback */}
                        {!feedbackGiven.has(faq.id) && !feedbackMutation.isPending && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Was this helpful?</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFeedback(faq.id, true)}
                              data-testid={`button-helpful-${faq.id}`}
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Yes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFeedback(faq.id, false)}
                              data-testid={`button-not-helpful-${faq.id}`}
                            >
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              No
                            </Button>
                          </div>
                        )}

                        {/* Related Questions */}
                        {getRelatedFaqs(faq).length > 0 && (
                          <div className="pt-4 border-t">
                            <h4 className="text-sm font-semibold mb-2">Related Questions:</h4>
                            <ul className="space-y-1">
                              {getRelatedFaqs(faq).map(relatedFaq => (
                                <li key={relatedFaq.id}>
                                  <a
                                    href={`#faq-${relatedFaq.id}`}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    {relatedFaq.question}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* FAQ Categories */}
        {Object.entries(groupedFaqs).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-2xl">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full"
                    onValueChange={(value) => {
                      if (value) {
                        handleAccordionChange(value);
                      }
                    }}
                  >
                    {categoryFaqs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id} id={`faq-${faq.id}`}>
                        <AccordionTrigger
                          className="hover:no-underline text-left"
                          data-testid={`accordion-faq-${category.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                        >
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pr-4 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>

                            {/* Feedback */}
                            {!feedbackGiven.has(faq.id) && !feedbackMutation.isPending && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleFeedback(faq.id, true)}
                                  data-testid={`button-helpful-${faq.id}`}
                                >
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  Yes
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleFeedback(faq.id, false)}
                                  data-testid={`button-not-helpful-${faq.id}`}
                                >
                                  <ThumbsDown className="w-4 h-4 mr-1" />
                                  No
                                </Button>
                              </div>
                            )}

                            {/* Related Questions */}
                            {getRelatedFaqs(faq).length > 0 && (
                              <div className="pt-4 border-t">
                                <h4 className="text-sm font-semibold mb-2">Related Questions:</h4>
                                <ul className="space-y-1">
                                  {getRelatedFaqs(faq).map(relatedFaq => (
                                    <li key={relatedFaq.id}>
                                      <a
                                        href={`#faq-${relatedFaq.id}`}
                                        className="text-sm text-primary hover:underline"
                                      >
                                        {relatedFaq.question}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No FAQs found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or category filter
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Questions");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Still Need Help CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="py-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to assist you with any questions or concerns
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="default" data-testid="button-chat-support">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with us
                </Button>
                <Button variant="outline" data-testid="button-email-support">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" data-testid="button-phone-support">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 1-800-INJET-PRO
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
