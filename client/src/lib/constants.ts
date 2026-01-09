export const BUSINESS_INFO = {
  name: "InkjetProGuide",
  email: "inkjetproguide@outlook.com",
  phone: "1-325-400-8874",
  address: "2704 Handley Ederville Rd, Fort Worth, TX 76118",
  year: 2026,
} as const;

export const SHIPPING = {
  freeShippingThreshold: 299,
  standardShippingCost: 9.99,
  standardDeliveryDays: "2-3 business days",
  processingTime: "24 hours",
} as const;

export const RETURNS = {
  returnPeriodDays: 30,
  refundProcessingDays: "5-10 business days",
} as const;

export const WARRANTY = {
  factorySealed: true,
  fullManufacturerWarranty: true,
} as const;

export const MARKETING_COPY = {
  freeShippingMessage: `Free Shipping on Orders $${SHIPPING.freeShippingThreshold}+`,
  freeShippingDescription: `Free shipping on orders over $${SHIPPING.freeShippingThreshold}`,
  returnPolicyMessage: `${RETURNS.returnPeriodDays}-day return policy`,
  deliveryMessage: `Delivery in ${SHIPPING.standardDeliveryDays}`,
} as const;
