export interface TemplateProduct {
  id: string;
  themeKey: 'syntax' | 'spiderTech' | 'ericCole' | 'all';
  name: string;
  badge: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  featured?: boolean;
  popular?: boolean;
  accentColor: string;
  image: string;
  features: string[];
  stack: string[];
  livePreviewUrl: string;
  description: string;
}

export interface PurchaseOrder {
  orderId: string;
  templateId: string;
  templateName: string;
  themeKey: string;
  buyerName: string;
  buyerEmail: string;
  amount: number;
  licenseKey: string;
  timestamp: string;
  paymentMethod: string;
}
