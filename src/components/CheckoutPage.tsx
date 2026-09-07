import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ChevronLeft,
  Check,
  Truck
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { MPesaBadge, MPesaLogoOfficial } from './MPesaBadge';
import { saveOrder } from '../data/sampleOrders';

interface CheckoutPageProps {
  cartItems: CartItem[];
  currency: 'TZS' | 'USD';
  onBackToCart: () => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
  onTrackOrder?: (orderNumber: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  currency,
  onBackToCart,
  onClearCart,
  onContinueShopping,
  onTrackOrder,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dar es Salaam');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [mpesaRefInput, setMpesaRefInput] = useState('');
  const [copiedTill, setCopiedTill] = useState(false);

  // Errors & Placed Order
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotalTZS = cartItems.reduce(
    (sum, item) => sum + item.product.priceTZS * item.quantity,
    0
  );
  const subtotalUSD = cartItems.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  );

  const deliveryFeeTZS = subtotalTZS > 300000 || subtotalTZS === 0 ? 0 : 15000;
  const deliveryFeeUSD = subtotalUSD > 120 || subtotalUSD === 0 ? 0 : 6;

  const totalTZS = subtotalTZS + deliveryFeeTZS;
  const totalUSD = subtotalUSD + deliveryFeeUSD;

  const formatPrice = (tzs: number, usd: number) => {
    return currency === 'USD' ? `$${usd.toLocaleString()}` : `TSh ${tzs.toLocaleString()}`;
  };

  const handleCopyTill = () => {
    navigator.clipboard.writeText('50777411');
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full Name / Counsel Title is required';
    if (!phoneNumber.trim()) errs.phoneNumber = 'Phone Number (M-Pesa enabled) is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!address.trim()) errs.address = 'Delivery address or Chambers name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderNum = `SLA-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderDetails = {
        orderNumber: orderNum,
        fullName,
        phone: phoneNumber,
        email,
        city,
        address,
        deliveryNotes,
        paymentMethod: 'M-PESA',
        mpesaReference: mpesaRefInput.trim() || `MP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        items: [...cartItems],
        subtotalTZS,
        deliveryFeeTZS,
        totalTZS,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'received',
        estimatedDelivery: city.toLowerCase().includes('dar') ? 'Today by 16:30 EAT' : 'Tomorrow by 14:00 EAT',
        courierName: "Sally's Atelier Chambers Dedicated Courier",
        courierPhone: '+255 754 000 112',
        trackingSteps: [
          {
            title: 'Order Placed & M-Pesa Confirmed',
            subtitle: `Payment verified for Lipa Till 50777411 (Ref: ${mpesaRefInput.trim() || 'VERIFIED'})`,
            timestamp: 'Just Now',
            completed: true,
            current: true
          },
          {
            title: 'Chambers Atelier Tailoring & Yoke Inspection',
            subtitle: 'Robes scheduled for pressing, sizing check, and regalia packing',
            timestamp: 'Next in Queue',
            completed: false
          },
          {
            title: 'Dispatched for Chamber Delivery',
            subtitle: `Assigned courier to ${address}, ${city}`,
            timestamp: 'Pending Dispatch',
            completed: false
          },
          {
            title: 'Delivered to Chambers / Registry',
            subtitle: 'Signed for upon receipt by Counsel',
            timestamp: 'Pending Delivery',
            completed: false
          }
        ]
      };

      saveOrder(newOrder);
      setPlacedOrder(newOrder);
      onClearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // ORDER CONFIRMATION SCREEN
  if (placedOrder) {
    return (
      <div className="w-full bg-[#FAF8F5] min-h-screen py-12 sm:py-16 border-b border-[#E5E0D8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#D5CFBF] p-6 sm:p-10 shadow-sm">
            {/* Header Badge */}
            <div className="text-center pb-8 border-b border-[#E5E0D8]">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F5EFE3] text-[#8C6D37] rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#3A724B]" />
              </div>
              <div className="text-xs font-mono tracking-[0.24em] uppercase text-[#8C6D37] mb-1">
                ORDER RECEIVED • PENDING M-PESA CONFIRMATION
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#0E0E10] font-normal">
                Thank you, Counsel.
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#52525B]">
                Order Reference:{' '}
                <span className="font-mono font-bold text-[#0E0E10]">
                  {placedOrder.orderNumber}
                </span>
              </p>
            </div>

            {/* Official M-PESA Payment Instructions Card */}
            <div className="my-8 p-6 bg-[#FAF8F5] border border-[#E5E0D8]">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-4">
                <MPesaBadge size="lg" showLipaNo={false} />
                <span className="text-xs font-mono text-[#8C6D37] font-semibold">
                  OFFICIAL LIPA NA M-PESA
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#27272A]">
                <div className="flex items-center justify-between py-1 bg-white p-3 border border-[#E5E0D8]">
                  <span className="font-mono text-xs uppercase text-[#71717A]">LIPA TILL NUMBER:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-[#0E0E10]">50777411</span>
                    <button
                      onClick={handleCopyTill}
                      className="p-1 text-[#8C6D37] hover:text-[#0E0E10] transition-colors"
                      title="Copy Till Number"
                    >
                      {copiedTill ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 bg-white p-3 border border-[#E5E0D8]">
                  <span className="font-mono text-xs uppercase text-[#71717A]">AMOUNT TO PAY:</span>
                  <span className="font-mono text-base font-bold text-[#0E0E10]">
                    TSh {placedOrder.totalTZS.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 text-xs text-[#52525B] space-y-1">
                  <p className="font-semibold text-[#0E0E10]">How to complete payment on your phone:</p>
                  <p>1. Dial <span className="font-mono font-bold">*150*00#</span> (Vodacom M-Pesa)</p>
                  <p>2. Select <span className="font-medium">4: Lipa kwa M-Pesa</span></p>
                  <p>3. Select <span className="font-medium">1: Weka Namba ya Kampuni / Till</span></p>
                  <p>4. Enter Till Number: <span className="font-mono font-bold text-[#0E0E10]">50777411</span> (Sally&apos;s Legal Apparel)</p>
                  <p>5. Enter Amount: <span className="font-mono font-bold text-[#0E0E10]">{placedOrder.totalTZS.toLocaleString()}</span></p>
                  <p>6. Enter your PIN to confirm.</p>
                </div>
              </div>
            </div>

            {/* Delivery & Customer Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#52525B] pb-8 border-b border-[#E5E0D8]">
              <div>
                <h4 className="font-mono uppercase tracking-wider text-[#0E0E10] font-semibold mb-2">
                  Delivery Destination
                </h4>
                <p className="text-[#0E0E10] font-medium">{placedOrder.fullName}</p>
                <p>{placedOrder.address}</p>
                <p>{placedOrder.city}, Tanzania</p>
                <p className="mt-1 font-mono">{placedOrder.phone}</p>
              </div>

              <div>
                <h4 className="font-mono uppercase tracking-wider text-[#0E0E10] font-semibold mb-2">
                  Dispatch Timeline
                </h4>
                <p>Dar es Salaam Chambers: Same day / Next day</p>
                <p>Upcountry Courts: 1-2 business days</p>
                <p className="mt-2 text-[#71717A]">
                  Confirmation sent to <span className="text-[#0E0E10]">{placedOrder.email}</span>
                </p>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="py-6 space-y-3">
              <h4 className="font-mono uppercase tracking-wider text-xs text-[#0E0E10] font-semibold">
                Ordered Apparel ({placedOrder.items.length})
              </h4>
              {placedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-[#F0EDE6]">
                  <div>
                    <span className="font-medium text-[#0E0E10]">{item.product.name}</span>
                    <span className="text-[#71717A] ml-2 font-mono">
                      ({item.selectedColor.name}, {item.selectedSize}) × {item.quantity}
                    </span>
                  </div>
                  <span className="font-mono font-medium text-[#0E0E10]">
                    TSh {(item.product.priceTZS * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-3">
              {onTrackOrder && (
                <button
                  type="button"
                  onClick={() => onTrackOrder(placedOrder.orderNumber)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#252528] transition-colors shadow-sm"
                >
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span>TRACK SHIPPING STATUS LIVE</span>
                </button>
              )}

              <a
                href={`https://wa.me/255687262017?text=Hello%20Sally's%20Legal%20Apparel,%20I%20have%20placed%20order%20${placedOrder.orderNumber}%20for%20TSh%20${placedOrder.totalTZS.toLocaleString()}%20via%20M-Pesa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors"
              >
                <span>CONFIRM ON WHATSAPP</span>
              </a>

              <button
                onClick={onContinueShopping}
                className="w-full sm:w-auto px-5 py-3.5 border border-[#D5CFBF] hover:border-[#0E0E10] bg-white text-[#0E0E10] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CHECKOUT REDIRECT
  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#FAF8F5] min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="font-serif text-3xl text-[#0E0E10] mb-3">Your shopping bag is empty</h2>
        <p className="text-xs text-[#71717A] max-w-sm mb-6">
          Please add court robes or legal apparel to your bag before proceeding to checkout.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest"
        >
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <button
          onClick={onBackToCart}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#71717A] hover:text-[#0E0E10] transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Modify Shopping Bag</span>
        </button>

        <div className="mb-8 pb-6 border-b border-[#E2DDD4]">
          <div className="text-[11px] font-mono tracking-[0.26em] uppercase text-[#8C6D37] mb-2 font-medium">
            SECURE CHECKOUT
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0E0E10] font-normal tracking-tight">
            Chambers Order &amp; Delivery Details
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT 7 COLS: Customer Information, Delivery, Payment */}
            <div className="lg:col-span-7 space-y-10">
              {/* SECTION 1: CUSTOMER INFORMATION */}
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#0E0E10] font-bold pb-4 border-b border-[#E5E0D8] mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0E0E10] text-white text-[10px] flex items-center justify-center">
                    1
                  </span>
                  <span>CUSTOMER INFORMATION</span>
                </h3>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1.5 font-medium">
                      Full Name / Counsel Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Adv. Stanley M. Stanslaus"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full p-3 bg-[#FAF8F5] border focus:outline-hidden focus:bg-white text-xs ${
                        errors.fullName ? 'border-red-500' : 'border-[#D5CFBF] focus:border-[#0E0E10]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1.5 font-medium">
                        Phone Number (M-Pesa enabled) *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 0687 262 017 / +255 687..."
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={`w-full p-3 bg-[#FAF8F5] border focus:outline-hidden focus:bg-white text-xs ${
                          errors.phoneNumber ? 'border-red-500' : 'border-[#D5CFBF] focus:border-[#0E0E10]'
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="counsel@lawfirm.co.tz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-3 bg-[#FAF8F5] border focus:outline-hidden focus:bg-white text-xs ${
                          errors.email ? 'border-red-500' : 'border-[#D5CFBF] focus:border-[#0E0E10]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DELIVERY */}
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#0E0E10] font-bold pb-4 border-b border-[#E5E0D8] mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0E0E10] text-white text-[10px] flex items-center justify-center">
                    2
                  </span>
                  <span>DELIVERY DESTINATION (TANZANIA &amp; EAST AFRICA)</span>
                </h3>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1.5 font-medium">
                      City / Region *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 bg-[#FAF8F5] border border-[#D5CFBF] focus:outline-hidden focus:border-[#0E0E10] text-xs font-sans"
                    >
                      <option value="Dar es Salaam">Dar es Salaam (Chambers / High Court / Registry)</option>
                      <option value="Arusha">Arusha (High Court / EACJ / Regional)</option>
                      <option value="Dodoma">Dodoma (Court of Appeal / Bunge / Government)</option>
                      <option value="Mwanza">Mwanza (Lake Zone Chambers)</option>
                      <option value="Zanzibar">Zanzibar (Vuga High Court / Stone Town)</option>
                      <option value="Mbeya">Mbeya (Southern Highlands)</option>
                      <option value="Morogoro">Morogoro</option>
                      <option value="Tanga">Tanga</option>
                      <option value="Other Tanzania">Other Upcountry Tanzania Destination</option>
                      <option value="Kenya / Uganda / Rwanda">East Africa Regional Express</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1.5 font-medium">
                      Chambers Building / Street Address / Registry Room *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4th Floor, NIC Life House, Sokoine Drive"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full p-3 bg-[#FAF8F5] border focus:outline-hidden focus:bg-white text-xs ${
                        errors.address ? 'border-red-500' : 'border-[#D5CFBF] focus:border-[#0E0E10]'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#1C1C1C] mb-1.5 font-medium">
                      Delivery Notes / Robe Sizing Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Special instructions for chamber clerk, preferred delivery time or exact height..."
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full p-3 bg-[#FAF8F5] border border-[#D5CFBF] focus:outline-hidden focus:border-[#0E0E10] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: PAYMENT — M-PESA */}
              <div className="bg-white border-2 border-[#0E0E10] p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#0E0E10] font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0E0E10] text-white text-[10px] flex items-center justify-center">
                      3
                    </span>
                    <span>PAYMENT METHOD</span>
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#3A724B]" />
                    <span className="text-[11px] font-mono text-[#3A724B] font-semibold uppercase">
                      OFFICIAL LIPA NO.
                    </span>
                  </div>
                </div>

                {/* Real M-PESA Presentation */}
                <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#E5E0D8] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <MPesaLogoOfficial className="h-7" />
                      <div>
                        <div className="font-mono text-xs text-[#71717A] uppercase">LIPA NA M-PESA</div>
                        <div className="font-mono text-base font-bold text-[#0E0E10]">
                          TILL NO: 50777411
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyTill}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8C6D37] hover:text-[#0E0E10] border border-[#D5CFBF] px-2.5 py-1 bg-white"
                    >
                      {copiedTill ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTill ? 'Copied 50777411' : 'Copy Till No.'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Make payment directly to our official business Lipa number <span className="font-mono font-bold text-[#0E0E10]">50777411</span> (Sally&apos;s Legal Apparel). You can provide your M-Pesa transaction reference number below or complete payment immediately after placing the order.
                  </p>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[11px] text-[#52525B] mb-1">
                      M-Pesa Transaction ID / Reference (Optional if paying immediately after)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. QKH78921KL"
                      value={mpesaRefInput}
                      onChange={(e) => setMpesaRefInput(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D5CFBF] focus:outline-hidden focus:border-[#0E0E10] text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: ORDER SUMMARY & PLACE ORDER BUTTON */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#0E0E10] font-bold pb-4 border-b border-[#E5E0D8] mb-4">
                  ORDER SUMMARY ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
                </h3>

                {/* Items preview list */}
                <div className="divide-y divide-[#F0EDE6] max-h-72 overflow-y-auto mb-6 pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="py-3 flex gap-3 items-center">
                      <div className="w-12 h-14 bg-[#F0EDE6] border border-[#E0DBD0] shrink-0 overflow-hidden">
                        <img
                          src={item.selectedColor.image || item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-serif text-sm text-[#0E0E10] line-clamp-1">
                          {item.product.name}
                        </div>
                        <div className="text-[#71717A] font-mono text-[11px] mt-0.5">
                          {item.selectedColor.name} • {item.selectedSize} × {item.quantity}
                        </div>
                      </div>
                      <div className="text-xs font-mono font-semibold text-[#0E0E10] text-right">
                        {formatPrice(
                          item.product.priceTZS * item.quantity,
                          item.product.priceUSD * item.quantity
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown */}
                <div className="space-y-2.5 text-xs border-t border-[#E5E0D8] pt-4 text-[#52525B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-[#0E0E10]">
                      {formatPrice(subtotalTZS, subtotalUSD)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Chambers Delivery ({city})</span>
                    <span className="font-mono font-medium text-[#0E0E10]">
                      {deliveryFeeTZS === 0 ? (
                        <span className="text-[#3A724B] font-semibold">FREE</span>
                      ) : (
                        formatPrice(deliveryFeeTZS, deliveryFeeUSD)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-semibold text-[#0E0E10] pt-3 border-t border-[#E5E0D8]">
                    <span>Total Amount</span>
                    <span className="font-mono">{formatPrice(totalTZS, totalUSD)}</span>
                  </div>
                </div>

                {/* M-PESA Highlight */}
                <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#52525B]">
                  <span>Payment Method</span>
                  <MPesaBadge size="sm" showLipaNo={true} />
                </div>

                {/* PLACE ORDER BUTTON - with generous bottom spacing so it never collides with footer */}
                <div className="mt-8 pt-2">
                  <button
                    id="place-order-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#252528] transition-all shadow-md disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'PROCESSING ORDER...' : 'PLACE ORDER'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-[#71717A] mt-2 font-mono">
                    Instant confirmation via M-Pesa &amp; WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
