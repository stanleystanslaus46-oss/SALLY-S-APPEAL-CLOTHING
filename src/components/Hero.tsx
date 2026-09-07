import React from 'react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick?: () => void;
  onExploreEditClick?: () => void;
  onExploreCollection?: () => void;
  onExploreRobes?: () => void;
  onViewProductDetail?: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onExploreEditClick,
  onExploreCollection,
  onExploreRobes,
  onViewProductDetail,
}) => {
  const handlePrimaryClick = () => {
    if (onShopClick) onShopClick();
    else if (onExploreCollection) onExploreCollection();
  };

  const handleSecondaryClick = () => {
    if (onExploreEditClick) onExploreEditClick();
    else if (onExploreRobes) onExploreRobes();
  };

  const handleDetailClick = () => {
    if (onViewProductDetail) {
      onViewProductDetail('sla-001');
    } else if (onShopClick) {
      onShopClick();
    }
  };

  return (
    <section className="relative w-full bg-[#F9F8F6] text-[#1A1A1A] border-b border-black/5 overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row min-h-[560px] lg:min-h-[640px]">
        {/* LEFT 45%: Typography & Action Area */}
        <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
              Legal Outfitters
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] leading-[0.9] mb-6 sm:mb-8 tracking-tight text-[#1A1A1A]">
            DRESSED FOR<br />
            THE BAR &amp;<br />
            <span className="italic opacity-90 font-light">The Bench.</span>
          </h1>

          <p className="text-sm text-neutral-600 leading-relaxed max-w-[320px] mb-8 sm:mb-10 font-normal">
            Professional legal apparel designed for presence, confidence and distinction within the court of law.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-shop-btn"
              onClick={handlePrimaryClick}
              className="bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors focus:outline-hidden cursor-pointer"
            >
              Shop Collection
            </button>
            <button
              id="hero-explore-btn"
              onClick={handleSecondaryClick}
              className="border border-black/10 px-8 py-4 text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A] hover:bg-black/5 transition-colors focus:outline-hidden cursor-pointer"
            >
              Explore The Edit
            </button>
          </div>

          <div className="mt-8 lg:mt-12 text-[10px] font-mono text-neutral-400 tracking-wider">
            01 — 06 / THE COURT COLLECTION
          </div>
        </div>

        {/* RIGHT 55%: Immersive Visual Canvas with Preview Overlay */}
        <div className="w-full lg:w-[55%] relative min-h-[440px] sm:min-h-[500px] lg:min-h-[640px] bg-[#E5E3E0] overflow-hidden">
          {/* Main Collection Image */}
          <div className="absolute inset-0 bg-[#E5E3E0]">
            <img
              src={HERO_IMAGE}
              alt="Sally's Legal Apparel - Court Robe & Advocate Attire"
              className="w-full h-full object-cover object-center opacity-95 filter contrast-[105%] grayscale-[10%]"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Gradient Blend into left container */}
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F9F8F6] to-transparent w-32 pointer-events-none hidden lg:block" />
          </div>

          {/* Premium Materials Vertical Accent */}
          <div className="absolute top-8 right-8 sm:top-10 sm:right-10 flex flex-col space-y-4 items-center select-none pointer-events-none">
            <div className="w-10 sm:w-12 h-[1px] bg-black/20" />
            <div className="text-[9px] uppercase tracking-widest vertical-rl rotate-180 opacity-40 py-2 sm:py-4 font-mono">
              Premium Materials
            </div>
          </div>

          {/* Floating Arrival Card */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 bg-white p-5 sm:p-6 shadow-2xl w-60 sm:w-64 border border-black/5 z-20 transition-all duration-300 hover:shadow-3xl">
            <div className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2 font-semibold">
              New Arrival
            </div>
            <div className="font-serif text-lg mb-1 text-[#1A1A1A] font-normal leading-tight">
              The Presidential Robe
            </div>
            <div className="text-xs text-neutral-500 mb-4 italic font-light">
              Premium Wool Blend
            </div>
            <div className="flex justify-between items-center border-t border-neutral-100 pt-3 sm:pt-4">
              <span className="font-medium text-sm tracking-tight text-[#1A1A1A]">
                Tsh 1,250,000
              </span>
              <button
                id="hero-view-detail-btn"
                onClick={handleDetailClick}
                className="text-[10px] uppercase font-bold border-b border-black pb-0.5 cursor-pointer hover:opacity-60 transition-opacity"
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

