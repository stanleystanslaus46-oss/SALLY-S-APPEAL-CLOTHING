import React from 'react';
import { Scale, Award, ShieldCheck, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { ROBE_HERO, SHIRT_HERO, WIG_HERO, HERO_IMAGE } from '../data/products';
import { MPesaBadge } from './MPesaBadge';

interface OurStoryPageProps {
  onExploreShop: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onExploreShop }) => {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16 border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#8C6D37] mb-3 font-medium">
            ATELIER HERITAGE • SALLY&apos;S LEGAL APPAREL
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0E0E10] font-normal leading-[1.1] tracking-tight">
            Crafting the dignity of the Bar &amp; the Bench.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#52525B] font-light leading-relaxed">
            Founded in Dar es Salaam, Sally&apos;s Legal Apparel was established with a singular, uncompromising vision: to elevate courtroom dress in Tanzania and East Africa into a distinguished expression of sartorial excellence and legal heritage.
          </p>
        </div>

        {/* Editorial Split Story 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 pb-16 border-b border-[#E5E0D8]">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 text-sm sm:text-base text-[#52525B] font-light leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0E0E10] font-normal tracking-tight">
              The Advocate&apos;s Armour
            </h2>
            <p>
              When an advocate steps into the courtroom, every detail of attire signals respect for the administration of justice. The weight of the barathea wool, the clean fall of the pleated yoke, the crisp starch of the Irish linen bands—these are not mere ornaments, but centuries of solemn tradition.
            </p>
            <p>
              We collaborate with master tailors and traditional English wigmakers to ensure every gown and peruke meets both the statutory requirements of the Advocates Act and the demanding climate of tropical courtrooms.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreShop}
                className="px-6 py-3 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#252528] transition-colors"
              >
                VIEW ROBES &amp; ATTIRE
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/5] bg-[#F0EDE6] border border-[#E2DDD4] overflow-hidden">
              <img
                src={ROBE_HERO}
                alt="Sally's Legal Apparel Robe Details"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#0E0E10]/90 text-[#FAF8F5] px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase">
                DAR ES SALAAM ATELIER
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 pb-16 border-b border-[#E5E0D8]">
          <div className="p-6 bg-white border border-[#E5E0D8]">
            <Scale className="w-8 h-8 text-[#8C6D37] mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-[#0E0E10] font-normal mb-2">
              Statutory Conformity
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed font-light">
              Every garment is designed in strict compliance with the High Court of Tanzania Practice Directions, the East African Court of Justice, and Commonwealth judicial norms.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E5E0D8]">
            <Award className="w-8 h-8 text-[#8C6D37] mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-[#0E0E10] font-normal mb-2">
              Finest Natural Fibers
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed font-light">
              We exclusively employ Super 140s English barathea wool, two-ply Giza Egyptian cotton for tunic shirts, and genuine woven horsehair for ceremonial wigs.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E5E0D8]">
            <ShieldCheck className="w-8 h-8 text-[#8C6D37] mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-[#0E0E10] font-normal mb-2">
              Chambers Fitting Service
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed font-light">
              Our tailoring specialists provide on-site chamber measurements and consultations for law firms and judicial registries across Dar es Salaam.
            </p>
          </div>
        </div>

        {/* Chambers Location & Direct Inquiries */}
        <div className="p-8 sm:p-12 bg-white border border-[#D5CFBF]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#8C6D37] uppercase mb-1">
                CONTACT &amp; VISITS
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0E0E10] font-normal mb-4">
                Chambers Inquiries &amp; Group Orders
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-6 font-light">
                Outfitting newly admitted advocates or ordering regalia for law firms, judicial benches, or state attorney offices? Reach our specialized legal styling team directly.
              </p>
              <div className="space-y-2 text-xs font-mono text-[#27272A]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#8C6D37] shrink-0 mt-0.5" />
                  <div>
                    <span>668C+QRQ Palestina, Shekilango Rd, Dar es Salaam, Tanzania</span>
                    <div className="mt-1">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=668C%2BQRQ+Palestina%2C+Shekilango+Rd%2C+Dar+es+Salaam%2C+Tanzania"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8C6D37] hover:underline uppercase tracking-wider"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8C6D37] shrink-0" />
                  <span>WhatsApp &amp; Calls: +255 687 262 017</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8C6D37] shrink-0" />
                  <a href="mailto:advsallybnjamin@gmail.com" className="hover:underline">
                    advsallybnjamin@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-[#E5E0D8] space-y-4">
              <div className="font-mono text-xs text-[#0E0E10] uppercase tracking-wider font-semibold">
                OFFICIAL PAYMENT CHANNEL
              </div>
              <MPesaBadge size="lg" showLipaNo={true} />
              <p className="text-xs text-[#71717A] leading-relaxed">
                All retail orders and bespoke deposits are securely received via our verified M-Pesa business till <span className="font-mono font-bold text-[#0E0E10]">50777411</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
