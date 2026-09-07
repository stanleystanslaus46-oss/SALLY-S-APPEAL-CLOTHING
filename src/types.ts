export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Court Robes' | 'Court Shirts' | 'Suits & Formalwear' | 'Wigs' | 'Bands' | 'Bags' | 'Accessories';
  priceTZS: number;
  priceUSD: number;
  description: string;
  courtDetails?: string;
  fabric?: string;
  images: string[];
  colours: ProductColor[];
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  tag?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export type OrderStatus = 'received' | 'tailoring' | 'dispatched' | 'delivered';

export interface TrackingStep {
  title: string;
  subtitle: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderDetails {
  orderNumber: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  deliveryNotes?: string;
  paymentMethod: 'M-PESA';
  mpesaReference?: string;
  items: CartItem[];
  subtotalTZS: number;
  deliveryFeeTZS: number;
  totalTZS: number;
  date: string;
  status?: OrderStatus;
  estimatedDelivery?: string;
  courierName?: string;
  courierPhone?: string;
  trackingSteps?: TrackingStep[];
}

export type ActivePage = 'home' | 'shop' | 'product-detail' | 'checkout' | 'our-story';
