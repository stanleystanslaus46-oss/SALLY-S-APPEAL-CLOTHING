import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Truck, RotateCcw, ShieldCheck, MessageSquare, ExternalLink } from 'lucide-react';

export type PolicyTab = 'contact' | 'shipping' | 'returns' | 'delivery-areas';

interface BusinessPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const BusinessPolicyModal: React.FC<BusinessPolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'contact',
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#0E0E10]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#D5CFBF] shadow-2xl z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8C6D37]">
              SALLY&apos;S LEGAL APPAREL • CHAMBERS DESK
            </span>
            <h3 className="font-serif text-2xl text-[#0E0E10] font-normal mt-0.5">
              Business &amp; Policy Information
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#0E0E10] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E5E0D8] mb-6 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'contact'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Contact &amp; Location
          </button>
          <button
            onClick={() => setActiveTab('delivery-areas')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'delivery-areas'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Delivery Areas
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'shipping'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Shipping Policy
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`pb-3 px-3 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'returns'
                ? 'border-[#0E0E10] text-[#0E0E10] font-semibold'
                : 'border-transparent text-[#71717A] hover:text-[#0E0E10]'
            }`}
          >
            Returns &amp; Adjustments
          </button>
        </div>

        {/* Tab 1: Contact & Physical Location & Hours */}
        {activeTab === 'contact' && (
          <div className="space-y-6 text-xs text-[#52525B]">
            {/* Quick Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-[#E5E0D8]">
                <div className="flex items-center gap-2 text-[#0E0E10] font-mono text-xs uppercase font-semibold mb-2">
                  <MapPin className="w-4 h-4 text-[#8C6D37]" />
                  <span>Physical Atelier Location</span>
                </div>
                <p className="leading-relaxed text-[#27272A] font-medium">
                  Sally&apos;s Legal Atelier &amp; Chambers
                </p>
                <p className="leading-relaxed mt-1">
                  668C+QRQ Palestina, Shekilango Rd<br />
                  <span className="text-[#8C6D37] font-medium">Dar es Salaam, Tanzania</span><br />
                  P.O. Box 7192, Dar es Salaam, Tanzania
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#F0EDE6]">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=668C%2BQRQ+Palestina%2C+Shekilango+Rd%2C+Dar+es+Salaam%2C+Tanzania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8C6D37] hover:text-[#0E0E10] uppercase tracking-wider font-semibold transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E5E0D8]">
                <div className="flex items-center gap-2 text-[#0E0E10] font-mono text-xs uppercase font-semibold mb-2">
                  <Clock className="w-4 h-4 text-[#8C6D37]" />
                  <span>Business &amp; Fitting Hours</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-semibold text-[#0E0E10]">08:00 – 18:00 EAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold text-[#0E0E10]">09:00 – 14:00 EAT</span>
                  </div>
                  <div className="flex justify-between text-[#8C6D37]">
                    <span>Sunday &amp; Court Recess:</span>
                    <span className="font-semibold">By Judicial Appointment</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#71717A] mt-2">
                  *Emergency admissions and Call-to-the-Bar robing appointments available.
                </p>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="p-4 bg-white border border-[#E5E0D8] space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-semibold block">
                Direct Contact Channels
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="tel:+255687262017"
                  className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#0E0E10] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#8C6D37]" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#71717A]">Chambers Phone</div>
                    <div className="text-xs font-semibold text-[#0E0E10]">+255 687 262 017</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/255687262017?text=Hello%20Sally's%20Legal%20Apparel,%20I%20would%20like%20to%20inquire%20about%20court%20apparel."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#25D366] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#71717A]">Official WhatsApp</div>
                    <div className="text-xs font-semibold text-[#0E0E10]">+255 687 262 017</div>
                  </div>
                </a>

                <a
                  href="mailto:advsallybnjamin@gmail.com"
                  className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#0E0E10] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8C6D37]" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-[#71717A]">Orders &amp; Inquiries</div>
                    <div className="text-xs font-semibold text-[#0E0E10] truncate">advsallybnjamin@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Delivery Areas */}
        {activeTab === 'delivery-areas' && (
          <div className="space-y-4 text-xs text-[#52525B]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold block">
              Jurisdictional Delivery Coverage
            </span>
            <p className="leading-relaxed">
              Sally&apos;s Legal Apparel provides dedicated courier and chambers delivery across Tanzania and the broader East African Community (EAC).
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-white border border-[#E5E0D8]">
                <div className="flex items-center justify-between font-mono text-xs uppercase font-semibold text-[#0E0E10] mb-1">
                  <span>1. Dar es Salaam Same-Day Chambers Express</span>
                  <span className="text-[#3A724B]">Same Day (Within 4 Hours)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#52525B]">
                  Direct hand-delivery to law offices, chambers, and registry desks across:
                  <span className="font-medium text-[#27272A]"> Kivukoni, Posta CBD, Upanga, Oysterbay, Masaki, Mikocheni, Sinza, Kinondoni, and Ilala.</span>
                </p>
              </div>

              <div className="p-3.5 bg-white border border-[#E5E0D8]">
                <div className="flex items-center justify-between font-mono text-xs uppercase font-semibold text-[#0E0E10] mb-1">
                  <span>2. Nationwide Tanzania Registered Courier</span>
                  <span className="text-[#8C6D37]">24 to 48 Hours</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#52525B]">
                  Insured, tracked consignments delivered to High Court registries and law chambers in:
                  <span className="font-medium text-[#27272A]"> Arusha, Dodoma (Parliament &amp; High Court), Mwanza, Zanzibar (Unguja &amp; Pemba), Mbeya, Tanga, Morogoro, Moshi, Iringa, Tabora, and Kigoma.</span>
                </p>
              </div>

              <div className="p-3.5 bg-white border border-[#E5E0D8]">
                <div className="flex items-center justify-between font-mono text-xs uppercase font-semibold text-[#0E0E10] mb-1">
                  <span>3. East African Community Regional Dispatch</span>
                  <span className="text-[#71717A]">3 to 5 Business Days</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#52525B]">
                  Dedicated dispatch for counsel appearing before the East African Court of Justice (EACJ) across Kenya, Uganda, and Rwanda.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Shipping Policy */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs text-[#52525B] leading-relaxed">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold block">
              Official Shipping &amp; Packaging Policy
            </span>

            <div className="p-4 bg-white border border-[#E5E0D8] space-y-3">
              <div>
                <h5 className="font-mono text-[11px] uppercase font-semibold text-[#0E0E10] mb-1">
                  1. Protective Judicial Packaging
                </h5>
                <p>
                  Every court gown and ceremonial robe is carefully pressed, inspected, and shipped in a heavy-duty, dustproof breathable garment bag with an contoured wooden hanger to prevent yoke creasing. Barrister wigs are housed in velvet-lined metal carrying tins.
                </p>
              </div>

              <div>
                <h5 className="font-mono text-[11px] uppercase font-semibold text-[#0E0E10] mb-1">
                  2. Payment Verification &amp; Dispatch Timeline
                </h5>
                <p>
                  Orders confirmed via <strong>Vodacom Lipa na M-Pesa Till 50777411</strong> before 14:00 EAT are dispatched the same day for Dar es Salaam clients and within 24 hours for upcountry regional couriers.
                </p>
              </div>

              <div>
                <h5 className="font-mono text-[11px] uppercase font-semibold text-[#0E0E10] mb-1">
                  3. Consignment Tracking
                </h5>
                <p>
                  Upon dispatch, counsel receives a dedicated tracking number via SMS and WhatsApp. Status can be tracked live in our online portal using the Order Tracking feature.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Returns & Adjustments Policy */}
        {activeTab === 'returns' && (
          <div className="space-y-4 text-xs text-[#52525B] leading-relaxed">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E0E10] font-bold block">
              Returns, Exchanges &amp; Atelier Adjustment Guarantee
            </span>

            <div className="p-4 bg-white border border-[#E5E0D8] space-y-3">
              <div>
                <h5 className="font-mono text-[11px] uppercase font-semibold text-[#0E0E10] mb-1">
                  1. 7-Day Exchange Guarantee
                </h5>
                <p>
                  Standard, non-customized court apparel (such as court shirts, collars, bands, and off-the-rack robes) may be exchanged within 7 days of receipt, provided the garments are unworn, unwashed, and in original packaging with tags intact.
                </p>
              </div>

              <div>
                <h5 className="font-mono text-[11px] uppercase font-semibold text-[#0E0E10] mb-1">
                  2. Complimentary Atelier Hem &amp; Sleeve Adjustment
                </h5>
                <p>
                  We understand that court regalia must drape impeccably. We offer complimentary hem length, sleeve adjustment, and button repositioning at our Shekilango Rd atelier (Palestina, Dar es Salaam) within 14 days of purchase.
                </p>
              </div>

              <div>
                <h5 className="font-mono text-[11px] uppercase font-semibold text-[#0E0E10] mb-1">
                  3. Custom &amp; Bespoke Robes
                </h5>
                <p>
                  Garments made to personalized judicial measurements or monogrammed with initials are non-refundable, but our master tailors will alter and refine the garment until the fit satisfies the advocate.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
          <a
            href="https://wa.me/255687262017?text=Hello%20Sally's%20Legal%20Apparel,%20I%20have%20a%20question%20regarding%20shipping%20and%20courtroom%20apparel."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#25D366] hover:underline font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp (+255 687 262 017)</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0E0E10] hover:bg-[#252528] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
