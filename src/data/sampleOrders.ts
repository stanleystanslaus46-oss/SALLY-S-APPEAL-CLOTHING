import { OrderDetails } from '../types';
import { PRODUCTS } from './products';

// Helper to look up product
const getProduct = (id: string) => {
  return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
};

export const SAMPLE_ORDERS: OrderDetails[] = [
  {
    orderNumber: 'SLA-849201',
    fullName: 'Advocate J. Mwakipesile',
    phone: '+255 687 262 017',
    email: 'j.mwakipesile@chambers.co.tz',
    city: 'Dar es Salaam',
    address: 'Suite 4B, Samora Machel Avenue, High Court District',
    deliveryNotes: 'Please deliver to front reception desk or call counsel directly upon arrival.',
    paymentMethod: 'M-PESA',
    mpesaReference: 'QKD82910439',
    subtotalTZS: 1850000,
    deliveryFeeTZS: 0,
    totalTZS: 1850000,
    date: '06 Sep 2026',
    status: 'dispatched',
    estimatedDelivery: 'Today by 15:30 EAT',
    courierName: 'Sally\'s Atelier Dedicated Courier (Driver: Kassim - Bike #TZ-892)',
    courierPhone: '+255 713 400 920',
    items: [
      {
        product: getProduct('sla-013'),
        selectedColor: getProduct('sla-013').colours[0],
        selectedSize: 'Standard Package (38"-42")',
        quantity: 1
      }
    ],
    trackingSteps: [
      {
        title: 'Order Placed & M-Pesa Confirmed',
        subtitle: 'Lipa na M-Pesa Till 50777411 payment verified (Ref: QKD82910439)',
        timestamp: '05 Sep 2026, 09:15 EAT',
        completed: true
      },
      {
        title: 'Chambers Atelier Tailoring & Yoke Inspection',
        subtitle: 'Barathea robe hand-fluting verified, horsehair peruke shaped & set in engraved tin box',
        timestamp: '05 Sep 2026, 16:40 EAT',
        completed: true
      },
      {
        title: 'Dispatched for Chamber Delivery',
        subtitle: 'Protective garment carrier out with dedicated courier for Samora Machel Ave',
        timestamp: '06 Sep 2026, 08:30 EAT',
        completed: true,
        current: true
      },
      {
        title: 'Delivered to Chambers',
        subtitle: 'Awaiting signature of receiving Counsel or Chambers Registrar',
        timestamp: 'Estimated Today by 15:30 EAT',
        completed: false
      }
    ]
  },
  {
    orderNumber: 'SLA-739182',
    fullName: 'Lady Justice E. R. Mushi',
    phone: '+255 784 551 230',
    email: 'justice.mushi@judiciary.go.tz',
    city: 'Arusha',
    address: 'Judicial Complex, East African Court of Justice, Arusha',
    deliveryNotes: 'Judicial Chambers wing, 2nd floor, Registrar office.',
    paymentMethod: 'M-PESA',
    mpesaReference: 'QKD71049281',
    subtotalTZS: 1465000,
    deliveryFeeTZS: 0,
    totalTZS: 1465000,
    date: '06 Sep 2026',
    status: 'tailoring',
    estimatedDelivery: 'Tomorrow, 08 Sep 2026',
    courierName: 'Sally\'s Regional Express - Arusha Flight Dispatch',
    courierPhone: '+255 754 000 112',
    items: [
      {
        product: getProduct('sla-014'),
        selectedColor: getProduct('sla-014').colours[0],
        selectedSize: '42R',
        quantity: 1
      },
      {
        product: getProduct('sla-017'),
        selectedColor: getProduct('sla-017').colours[0],
        selectedSize: 'Medium (14"-15")',
        quantity: 1
      }
    ],
    trackingSteps: [
      {
        title: 'Order Placed & M-Pesa Confirmed',
        subtitle: 'Lipa na M-Pesa Till 50777411 payment verified (Ref: QKD71049281)',
        timestamp: '06 Sep 2026, 11:20 EAT',
        completed: true
      },
      {
        title: 'Judicial Tailoring & Crimson Velvet Fitting',
        subtitle: 'Damask silk cut, gold bullion rosette sleeves assembly in Dar es Salaam Atelier',
        timestamp: '06 Sep 2026, 14:00 EAT',
        completed: true,
        current: true
      },
      {
        title: 'Regional Courier Dispatch',
        subtitle: 'Secure packaging in reinforced judicial wardrobe travel carrier',
        timestamp: 'Scheduled 07 Sep 2026, 09:00 EAT',
        completed: false
      },
      {
        title: 'Delivered to Chambers',
        subtitle: 'Judicial Complex Registry, Arusha',
        timestamp: 'Estimated 08 Sep 2026',
        completed: false
      }
    ]
  },
  {
    orderNumber: 'SLA-928415',
    fullName: 'Senior Advocate K. N. Lyimo',
    phone: '+255 767 119 448',
    email: 'k.lyimo@lyimopartners.co.tz',
    city: 'Dodoma',
    address: 'Plot 48, Parliament Road, High Court Sub-Registry Chambers',
    deliveryNotes: 'Left with Head of Chambers.',
    paymentMethod: 'M-PESA',
    mpesaReference: 'QKD60492817',
    subtotalTZS: 1470000,
    deliveryFeeTZS: 0,
    totalTZS: 1470000,
    date: '04 Sep 2026',
    status: 'delivered',
    estimatedDelivery: 'Delivered on 05 Sep 2026',
    courierName: 'Sally\'s Executive Inter-City Registry Express',
    courierPhone: '+255 754 000 112',
    items: [
      {
        product: getProduct('sla-016'),
        selectedColor: getProduct('sla-016').colours[0],
        selectedSize: 'Standard Litigation Size (17" x 12.5" x 6")',
        quantity: 1
      },
      {
        product: getProduct('sla-001'),
        selectedColor: getProduct('sla-001').colours[0],
        selectedSize: '42R',
        quantity: 1
      }
    ],
    trackingSteps: [
      {
        title: 'Order Placed & M-Pesa Confirmed',
        subtitle: 'Lipa na M-Pesa Till 50777411 payment verified (Ref: QKD60492817)',
        timestamp: '04 Sep 2026, 08:15 EAT',
        completed: true
      },
      {
        title: 'Chambers Atelier Tailoring & Yoke Inspection',
        subtitle: 'Gown pressed and full-grain leather briefcase inspected and lock-tested',
        timestamp: '04 Sep 2026, 13:30 EAT',
        completed: true
      },
      {
        title: 'Dispatched to Dodoma High Court Sub-Registry',
        subtitle: 'Inter-City express line transit',
        timestamp: '05 Sep 2026, 07:00 EAT',
        completed: true
      },
      {
        title: 'Delivered & Received in Chambers',
        subtitle: 'Signed for by Chambers Registrar at Parliament Road',
        timestamp: '05 Sep 2026, 14:15 EAT',
        completed: true,
        current: true
      }
    ]
  }
];

// Helper to retrieve saved orders from localStorage
export const getStoredOrders = (): OrderDetails[] => {
  try {
    const saved = localStorage.getItem('sallys_legal_orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Helper to save a newly placed order
export const saveOrder = (order: OrderDetails) => {
  try {
    const existing = getStoredOrders();
    const updated = [order, ...existing.filter((o) => o.orderNumber !== order.orderNumber)];
    localStorage.setItem('sallys_legal_orders', JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
};

// Helper to look up an order by orderNumber or phone or M-Pesa reference
export const findOrder = (query: string): OrderDetails | null => {
  const clean = query.trim().toUpperCase().replace(/#/g, '');
  if (!clean) return null;

  const stored = getStoredOrders();
  const allOrders = [...stored, ...SAMPLE_ORDERS];

  // Exact orderNumber match
  const exact = allOrders.find(
    (o) => o.orderNumber.toUpperCase() === clean || o.orderNumber.replace(/[^A-Z0-9]/g, '') === clean
  );
  if (exact) return exact;

  // Search by M-Pesa reference or phone
  const partial = allOrders.find(
    (o) =>
      (o.mpesaReference && o.mpesaReference.toUpperCase().includes(clean)) ||
      (o.phone && o.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')))
  );
  if (partial) return partial;

  // Fallback: If user enters an arbitrary valid SLA-XXXXXX code, dynamically create an active status for them
  if (/^SLA-\d{6}$/i.test(clean) || /^SLA\d{6}$/i.test(clean)) {
    const formatted = clean.startsWith('SLA-') ? clean : `SLA-${clean.slice(3)}`;
    return {
      orderNumber: formatted,
      fullName: 'Counsel / Legal Chambers',
      phone: '+255 754 000 000',
      email: 'counsel@chambers.co.tz',
      city: 'Dar es Salaam',
      address: 'High Court Chambers District',
      deliveryNotes: 'Standard judicial dispatch',
      paymentMethod: 'M-PESA',
      mpesaReference: `MP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      items: [
        {
          product: getProduct('sla-001'),
          selectedColor: getProduct('sla-001').colours[0],
          selectedSize: '40R',
          quantity: 1
        }
      ],
      subtotalTZS: 650000,
      deliveryFeeTZS: 0,
      totalTZS: 650000,
      date: 'Recent Order',
      status: 'dispatched',
      estimatedDelivery: 'Within 24 Hours',
      courierName: 'Sally\'s Atelier Dedicated Courier',
      courierPhone: '+255 754 000 112',
      trackingSteps: [
        {
          title: 'Order Placed & M-Pesa Confirmed',
          subtitle: 'Lipa na M-Pesa Till 50777411 payment confirmed',
          timestamp: 'Payment Verified',
          completed: true
        },
        {
          title: 'Chambers Atelier Tailoring & Yoke Inspection',
          subtitle: 'Hand-fluting and judicial inspection complete',
          timestamp: 'Atelier Approved',
          completed: true
        },
        {
          title: 'Dispatched for Chamber Delivery',
          subtitle: 'En route with courier in garment travel bag',
          timestamp: 'In Transit',
          completed: true,
          current: true
        },
        {
          title: 'Delivered to Chambers',
          subtitle: 'Awaiting signature of receiving Counsel',
          timestamp: 'Pending Delivery',
          completed: false
        }
      ]
    };
  }

  return null;
};
