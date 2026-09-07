import React from 'react';
import { Logo } from './Logo';
import { MPesaLogoOfficial } from './MPesaBadge';
import { ActivePage } from '../types';
import { MapPin, Phone, Mail, Clock, Truck, ShieldCheck, RotateCcw, MessageSquare } from 'lucide-react';
import { PolicyTab } from './BusinessPolicyModal';

interface FooterProps {
  onNavigate: (page: ActivePage, category?: string) => void;
  onOpenTracking?: () => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracking, onOpenPolicy }) => {
  return (
    <footer className="w-full bg-[#0E0E10] text-white px-6 sm:px-10 py-12 sm:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Atelier Location */}
          <div className="space-y-4">
            <Logo variant="light" size="md" />
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#B89758] font-semibold">
              Sally&apos;s Legal Atelier &amp; Chambers
            </div>
            <div className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#B89758] shrink-0 mt-0.5" />
              <span>
                668C+QRQ Palestina, Shekilango Rd<br />
                <strong className="text-neutral-200 font-medium">Dar es Salaam, Tanzania</strong><br />
                P.O. Box 7192, Dar es Salaam
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono">
              <button
                onClick={() => onOpenPolicy?.('contact')}
                className="text-[#B89758] hover:underline uppercase tracking-wider"
              >
                Atelier Details
              </button>
              <span className="text-neutral-600">•</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=668C%2BQRQ+Palestina%2C+Shekilango+Rd%2C+Dar+es+Salaam%2C+Tanzania"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B89758] hover:underline uppercase tracking-wider"
              >
                Google Maps ↗
              </a>
            </div>
          </div>

          {/* Col 2: Direct Contact & Hours */}
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase font-bold text-neutral-300 tracking-wider block">
              Chambers Hotline &amp; Hours
            </span>
            <div className="space-y-2 text-xs text-neutral-400">
              <a
                href="tel:+255687262017"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B89758]" />
                <span>+255 687 262 017</span>
              </a>
              <a
                href="https://wa.me/255687262017?text=Hello%20Sally's%20Legal%20Apparel,%20I%20would%20like%20to%20inquire%20about%20court%20apparel."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +255 687 262 017</span>
              </a>
              <a
                href="mailto:advsallybnjamin@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#B89758]" />
                <span className="truncate">advsallybnjamin@gmail.com</span>
              </a>
            </div>

            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Clock className="w-3 h-3 text-[#B89758]" />
                <span>Business Hours (EAT):</span>
              </div>
              <div className="pl-4 text-[10px]">
                Mon – Fri: 08:00 – 18:00<br />
                Sat: 09:00 – 14:00<br />
                Sun: Emergency Court Appointments
              </div>
            </div>
          </div>

          {/* Col 3: Delivery Areas & Policies */}
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase font-bold text-neutral-300 tracking-wider block">
              Jurisdiction &amp; Delivery
            </span>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <Truck className="w-3.5 h-3.5 text-[#B89758] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Dar es Salaam:</strong> Same-day chambers express (CBD, Upanga, Oysterbay, Masaki, Mikocheni, Sinza).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89758] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Nationwide (24–48h):</strong> Arusha, Dodoma, Mwanza, Zanzibar, Mbeya, Tanga, Morogoro, Moshi.
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-col space-y-1.5 text-[11px] font-mono">
              <button
                onClick={() => onOpenPolicy?.('delivery-areas')}
                className="text-left text-neutral-400 hover:text-[#B89758] transition-colors"
              >
                • View All Delivery Areas
              </button>
              <button
                onClick={() => onOpenPolicy?.('shipping')}
                className="text-left text-neutral-400 hover:text-[#B89758] transition-colors"
              >
                • Official Shipping Policy
              </button>
              <button
                onClick={() => onOpenPolicy?.('returns')}
                className="text-left text-neutral-400 hover:text-[#B89758] transition-colors"
              >
                • Returns &amp; Atelier Adjustment Policy
              </button>
            </div>
          </div>

          {/* Col 4: Judicial Checkout & M-Pesa Till */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xs">
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#B89758] mb-2 font-semibold">
                Official Judicial Settlement
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white tracking-wider">
                  M-PESA LIPA NO.
                </span>
                <span className="text-sm font-mono text-[#FF3B30] font-bold tracking-wider">
                  50777411
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Vodacom M-Pesa Buy Goods &amp; Services till for swift verification and instant dispatch.
              </p>
            </div>

            <button
              onClick={onOpenTracking}
              className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/15 text-[#B89758] border border-[#B89758]/40 text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Consignment</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-neutral-500 gap-3 pt-2">
          <p>© {new Date().getFullYear()} Sally&apos;s Legal Apparel. All Rights Reserved. Regulated Court Outfitter.</p>
          <div className="flex items-center space-x-4 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
            <button onClick={() => onOpenPolicy?.('shipping')} className="hover:text-white transition-colors">
              Shipping Policy
            </button>
            <span>•</span>
            <button onClick={() => onOpenPolicy?.('returns')} className="hover:text-white transition-colors">
              Returns Guarantee
            </button>
            <span>•</span>
            <button onClick={() => onOpenPolicy?.('contact')} className="hover:text-white transition-colors">
              Physical Location
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
