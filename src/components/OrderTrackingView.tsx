import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  AlertCircle,
  Copy,
  Check,
  Phone,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Building2,
  ArrowRight
} from 'lucide-react';
import { OrderDetails, OrderStatus } from '../types';
import { findOrder, getStoredOrders, SAMPLE_ORDERS } from '../data/sampleOrders';
import { MPesaLogoOfficial } from './MPesaBadge';

interface OrderTrackingViewProps {
  initialOrderNumber?: string;
  onSelectOrder?: (order: OrderDetails) => void;
  currency?: 'TZS' | 'USD';
  compact?: boolean;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  initialOrderNumber = '',
  currency = 'TZS',
  compact = false
}) => {
  const [query, setQuery] = useState(initialOrderNumber);
  const [trackedOrder, setTrackedOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [storedOrders, setStoredOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    setStoredOrders(getStoredOrders());
  }, []);

  useEffect(() => {
    if (initialOrderNumber) {
      handleSearch(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const handleSearch = (orderNumToSearch?: string) => {
    const searchTerm = orderNumToSearch !== undefined ? orderNumToSearch : query;
    if (!searchTerm.trim()) {
      setError('Please enter a valid order number or M-Pesa reference.');
      return;
    }

    setError(null);
    setHasSearched(true);
    const result = findOrder(searchTerm);

    if (result) {
      setTrackedOrder(result);
      setQuery(result.orderNumber);
    } else {
      setTrackedOrder(null);
      setError(`No order record found matching "${searchTerm}". Check the format (e.g. SLA-849201) or try one of the sample orders below.`);
    }
  };

  const handleCopyOrderRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const getStatusBadge = (status?: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return {
          label: 'DELIVERED TO CHAMBERS',
          bg: 'bg-[#EBF7EE] text-[#1E5629] border-[#BBE3C4]',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };
      case 'dispatched':
        return {
          label: 'OUT FOR COURIER TRANSIT',
          bg: 'bg-[#EBF2FA] text-[#1D4E89] border-[#BFD5ED]',
          icon: <Truck className="w-3.5 h-3.5 animate-pulse" />
        };
      case 'tailoring':
        return {
          label: 'ATELIER TAILORING & QUALITY PASS',
          bg: 'bg-[#FEF7EC] text-[#8C5E14] border-[#F8DCB5]',
          icon: <Clock className="w-3.5 h-3.5" />
        };
      case 'received':
      default:
        return {
          label: 'ORDER RECEIVED & M-PESA LOGGED',
          bg: 'bg-[#F4F4F5] text-[#3F3F46] border-[#D4D4D8]',
          icon: <Package className="w-3.5 h-3.5" />
        };
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar Section */}
      <div className="bg-white border border-[#D5CFBF] p-4 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="font-serif text-lg sm:text-xl text-[#0E0E10]">
              Official Consignment &amp; Robe Tracking
            </h4>
            <p className="text-xs text-[#71717A]">
              Input your Order Reference (e.g. <span className="font-mono text-[#0E0E10]">SLA-849201</span>) or M-Pesa transaction reference.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#52525B] bg-[#FAF8F5] px-2.5 py-1 border border-[#E5E0D8]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3A724B]" />
            <span>Chambers Dispatch Guard</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. SLA-849201, SLA-739182, or M-Pesa Ref"
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#D5CFBF] text-sm text-[#0E0E10] font-mono uppercase tracking-wider focus:outline-hidden focus:border-[#0E0E10] focus:bg-white transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setTrackedOrder(null);
                  setError(null);
                  setHasSearched(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#71717A] hover:text-[#0E0E10] px-1.5 py-0.5"
              >
                CLEAR
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#252528] active:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>TRACK ORDER</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Order Pills */}
        <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex flex-wrap items-center gap-2 text-[11px]">
          <span className="font-mono uppercase text-[#71717A] text-[10px]">Test Demo Orders:</span>
          {SAMPLE_ORDERS.map((sample) => (
            <button
              key={sample.orderNumber}
              type="button"
              onClick={() => {
                setQuery(sample.orderNumber);
                handleSearch(sample.orderNumber);
              }}
              className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#F0EBE1] text-[#0E0E10] border border-[#D5CFBF] font-mono text-[10px] tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>{sample.orderNumber}</span>
              <span className="text-[#8C6D37] text-[9px] uppercase">
                ({sample.status === 'dispatched' ? 'In Transit' : sample.status === 'tailoring' ? 'Tailoring' : 'Delivered'})
              </span>
            </button>
          ))}
        </div>

        {/* Past Placed Orders from Current Device */}
        {storedOrders.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="font-mono uppercase text-[#3A724B] text-[10px] font-semibold">Your Recent Orders:</span>
            {storedOrders.map((ord) => (
              <button
                key={ord.orderNumber}
                type="button"
                onClick={() => {
                  setQuery(ord.orderNumber);
                  handleSearch(ord.orderNumber);
                }}
                className="px-2.5 py-1 bg-[#F4F9F5] hover:bg-[#E2F0E5] text-[#1E5629] border border-[#BBE3C4] font-mono text-[10px] tracking-wider transition-colors font-semibold"
              >
                {ord.orderNumber} ({ord.fullName.split(' ')[0]})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 bg-[#FFF5F5] border border-[#F5C2C7] flex items-start gap-3 text-xs text-[#842029]">
          <AlertCircle className="w-5 h-5 text-[#DC3545] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{error}</p>
            <p className="text-[11px] text-[#A52834]">
              For urgent verification of an unconfirmed order, please reach our Dar es Salaam Chambers Desk directly at{' '}
              <a
                href="https://wa.me/255687262017?text=Hello%20Sally's%20Legal%20Apparel,%20inquiring%20about%20my%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:text-black"
              >
                WhatsApp +255 687 262 017
              </a>.
            </p>
          </div>
        </div>
      )}

      {/* Tracked Order Result Card */}
      {trackedOrder && (
        <div className="bg-white border border-[#D5CFBF] shadow-sm overflow-hidden">
          {/* Status Header Strip */}
          <div className="bg-[#0E0E10] text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#252528]">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                <span>OFFICIAL LEGAL DISPATCH</span>
                <span>•</span>
                <span>CHAMBERS CONSIGNMENT</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-white">
                  {trackedOrder.orderNumber}
                </h3>
                <button
                  onClick={() => handleCopyOrderRef(trackedOrder.orderNumber)}
                  className="p-1 text-[#A1A1AA] hover:text-white transition-colors"
                  title="Copy Order Reference"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-[#3A724B]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1 font-mono">
                Placed on: {trackedOrder.date} • Recipient: <span className="text-[#FAF8F5]">{trackedOrder.fullName}</span>
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex sm:flex-col sm:items-end gap-2">
              {(() => {
                const badge = getStatusBadge(trackedOrder.status);
                return (
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] tracking-widest font-bold ${badge.bg}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                );
              })()}
              {trackedOrder.estimatedDelivery && (
                <div className="text-[11px] font-mono text-[#D4AF37]">
                  Target Delivery: <span className="text-white font-medium">{trackedOrder.estimatedDelivery}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-8">
            {/* Courier Transit Banner */}
            <div className="bg-[#FAF8F5] border border-[#E5E0D8] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0E0E10] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                    Assigned Logistics Carrier
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#0E0E10]">
                    {trackedOrder.courierName || 'Sally\'s Atelier Chambers White-Glove Dispatch'}
                  </div>
                  {trackedOrder.courierPhone && (
                    <div className="text-[11px] font-mono text-[#52525B] flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-[#8C6D37]" />
                      <span>Direct Courier Line: {trackedOrder.courierPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/255687262017?text=Hello%20Sally's%20Legal%20Apparel,%20checking%20status%20of%20consignment%20${trackedOrder.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-white border border-[#D5CFBF] hover:border-[#0E0E10] text-[11px] font-mono uppercase font-semibold text-[#0E0E10] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#3A724B]" />
                  <span>Contact Chambers Dispatch</span>
                </a>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6D37] mb-4">
                CHAMBERS CONSIGNMENT MILESTONES
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E0D8]">
                {(trackedOrder.trackingSteps || [
                  {
                    title: 'Order Placed & M-Pesa Confirmed',
                    subtitle: `Payment verified for Till 50777411 (Ref: ${trackedOrder.mpesaReference || 'VERIFIED'})`,
                    timestamp: `${trackedOrder.date}, 09:00 EAT`,
                    completed: true
                  },
                  {
                    title: 'Chambers Atelier Tailoring & Quality Pass',
                    subtitle: 'Hand-fluting, pressing and regalia calibration in Dar es Salaam Atelier',
                    timestamp: `${trackedOrder.date}, 14:00 EAT`,
                    completed: trackedOrder.status !== 'received'
                  },
                  {
                    title: 'Dispatched for Chambers Delivery',
                    subtitle: `In transit to ${trackedOrder.address}, ${trackedOrder.city}`,
                    timestamp: trackedOrder.status === 'dispatched' || trackedOrder.status === 'delivered' ? 'Dispatched' : 'Scheduled',
                    completed: trackedOrder.status === 'dispatched' || trackedOrder.status === 'delivered',
                    current: trackedOrder.status === 'dispatched'
                  },
                  {
                    title: 'Delivered to Chambers / High Court Registry',
                    subtitle: 'Received and signed for by Counsel',
                    timestamp: trackedOrder.status === 'delivered' ? 'Delivered' : 'Pending',
                    completed: trackedOrder.status === 'delivered',
                    current: trackedOrder.status === 'delivered'
                  }
                ]).map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-3 sm:gap-4">
                    {/* Step Indicator Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 ${
                        step.completed
                          ? step.current
                            ? 'bg-[#1D4E89] border-[#1D4E89] text-white shadow-xs'
                            : 'bg-[#3A724B] border-[#3A724B] text-white'
                          : 'bg-white border-[#D5CFBF] text-transparent'
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D5CFBF]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-serif text-sm sm:text-base text-[#0E0E10] font-medium">
                          {step.title}
                        </h5>
                        <span className="font-mono text-[10px] text-[#71717A]">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid: Delivery Info & Payment Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#E5E0D8]">
              {/* Delivery Info */}
              <div className="bg-[#FAF8F5] border border-[#E5E0D8] p-4 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8C6D37]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Consignment Destination</span>
                </div>
                <div className="font-medium text-[#0E0E10] text-sm">
                  {trackedOrder.fullName}
                </div>
                <div className="text-[#52525B]">
                  {trackedOrder.address}
                </div>
                <div className="font-mono text-[#52525B]">
                  {trackedOrder.city}, Tanzania
                </div>
                <div className="font-mono text-[#71717A] pt-1">
                  Recipient Contact: {trackedOrder.phone}
                </div>
                {trackedOrder.deliveryNotes && (
                  <div className="mt-2 pt-2 border-t border-[#E5E0D8] text-[11px] text-[#71717A] italic">
                    Chambers Note: "{trackedOrder.deliveryNotes}"
                  </div>
                )}
              </div>

              {/* Lipa na M-Pesa Settlement */}
              <div className="bg-[#FAF8F5] border border-[#E5E0D8] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#3A724B]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>M-Pesa Settlement Log</span>
                  </div>
                  <MPesaLogoOfficial className="h-3.5 w-auto" />
                </div>
                <div className="flex justify-between items-center text-[#52525B]">
                  <span>Payment Gateway:</span>
                  <span className="font-mono font-semibold text-[#0E0E10]">Lipa na M-Pesa</span>
                </div>
                <div className="flex justify-between items-center text-[#52525B]">
                  <span>Official Till Number:</span>
                  <span className="font-mono font-bold text-[#0E0E10]">50777411</span>
                </div>
                {trackedOrder.mpesaReference && (
                  <div className="flex justify-between items-center text-[#52525B]">
                    <span>Transaction Reference:</span>
                    <span className="font-mono font-bold text-[#3A724B]">{trackedOrder.mpesaReference}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[#0E0E10] pt-2 border-t border-[#E5E0D8] font-bold text-sm">
                  <span>Settled Total:</span>
                  <span className="font-mono">
                    {currency === 'USD'
                      ? `$${Math.round(trackedOrder.totalTZS / 2600).toLocaleString()}`
                      : `TSh ${trackedOrder.totalTZS.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Consignment Items */}
            <div className="pt-4 border-t border-[#E5E0D8]">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#0E0E10] mb-3">
                ITEMS IN THIS CONSIGNMENT ({trackedOrder.items.length})
              </div>

              <div className="divide-y divide-[#E5E0D8] border border-[#E5E0D8]">
                {trackedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 bg-white">
                    <img
                      src={item.selectedColor.image || item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover border border-[#D5CFBF] bg-[#F5EFE3] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h6 className="font-serif text-xs sm:text-sm text-[#0E0E10] truncate">
                        {item.product.name}
                      </h6>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#71717A] mt-0.5">
                        <span>Color: <strong className="text-[#0E0E10] font-normal">{item.selectedColor.name}</strong></span>
                        <span>•</span>
                        <span>Size: <strong className="text-[#0E0E10] font-mono font-normal">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Qty: <strong className="text-[#0E0E10] font-mono">{item.quantity}</strong></span>
                      </div>
                      <div className="text-[10px] font-mono text-[#8C6D37] mt-0.5">
                        {item.product.category}
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs sm:text-sm font-semibold text-[#0E0E10]">
                      {currency === 'USD'
                        ? `$${(item.product.priceUSD * item.quantity).toLocaleString()}`
                        : `TSh ${(item.product.priceTZS * item.quantity).toLocaleString()}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setTrackedOrder(null);
                  setQuery('');
                  setHasSearched(false);
                }}
                className="text-xs font-mono uppercase tracking-wider text-[#71717A] hover:text-[#0E0E10] transition-colors"
              >
                ← Track Another Consignment
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-[#D5CFBF] hover:border-[#0E0E10] bg-white font-mono uppercase text-[11px] tracking-wider text-[#0E0E10] transition-colors flex-1 sm:flex-initial"
                >
                  Print Consignment Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
