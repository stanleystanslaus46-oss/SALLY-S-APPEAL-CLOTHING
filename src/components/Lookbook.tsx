import React from 'react';
import { LOOKBOOK_IMAGES } from '../data/products';

export const Lookbook: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F9F8F6] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 pb-6 border-b border-black/5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2">
              04 / LOOKBOOK
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight font-normal">
              The sartorial codes of advocacy.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm text-neutral-500 max-w-sm font-normal leading-relaxed">
            An editorial study in form, proportion, and quiet judicial authority.
          </p>
        </div>

        {/* Asymmetric Editorial Lookbook Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* Main Large Portrait Hero */}
          <div className="col-span-12 lg:col-span-7 flex flex-col group">
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.6] overflow-hidden bg-neutral-100 border border-black/5">
              <img
                src={LOOKBOOK_IMAGES[0].url}
                alt={LOOKBOOK_IMAGES[0].title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[9px] font-mono tracking-widest uppercase text-[#1A1A1A] border border-black/5">
                PLATE I / SALLY’S ATELIER
              </div>
            </div>
            <div className="pt-3 pb-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal">
                {LOOKBOOK_IMAGES[0].title}
              </h3>
              <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                {LOOKBOOK_IMAGES[0].subtitle}
              </p>
            </div>
          </div>

          {/* Right Column Stack: 2 stacked varied cards */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
            {/* Image 2 */}
            <div className="group flex flex-col">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 border border-black/5">
                <img
                  src={LOOKBOOK_IMAGES[1].url}
                  alt={LOOKBOOK_IMAGES[1].title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[#1A1A1A] border border-black/5">
                  PLATE II / ROBING DETAIL
                </div>
              </div>
              <div className="pt-2">
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">
                  {LOOKBOOK_IMAGES[1].title}
                </h3>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  {LOOKBOOK_IMAGES[1].subtitle}
                </p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="group flex flex-col">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 border border-black/5">
                <img
                  src={LOOKBOOK_IMAGES[2].url}
                  alt={LOOKBOOK_IMAGES[2].title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[#1A1A1A] border border-black/5">
                  PLATE III / FORMAL SHIRTING
                </div>
              </div>
              <div className="pt-2">
                <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">
                  {LOOKBOOK_IMAGES[2].title}
                </h3>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  {LOOKBOOK_IMAGES[2].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 wide side-by-side cards */}
          <div className="col-span-12 md:col-span-6 group">
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 border border-black/5">
              <img
                src={LOOKBOOK_IMAGES[3].url}
                alt={LOOKBOOK_IMAGES[3].title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[#1A1A1A] border border-black/5">
                PLATE IV / REGALIA
              </div>
            </div>
            <div className="pt-2">
              <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">
                {LOOKBOOK_IMAGES[3].title}
              </h3>
              <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                {LOOKBOOK_IMAGES[3].subtitle}
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 group">
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 border border-black/5">
              <img
                src={LOOKBOOK_IMAGES[4].url}
                alt={LOOKBOOK_IMAGES[4].title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[#1A1A1A] border border-black/5">
                PLATE V / JUDICIAL TRADITION
              </div>
            </div>
            <div className="pt-2">
              <h3 className="font-serif text-lg text-[#1A1A1A] font-normal">
                {LOOKBOOK_IMAGES[4].title}
              </h3>
              <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                {LOOKBOOK_IMAGES[4].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
