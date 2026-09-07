import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CollectionsGridProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="collections-section" className="w-full py-16 sm:py-20 lg:py-24 bg-[#F9F8F6] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-black/5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2">
              01 / COLLECTIONS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight font-normal">
              The essentials of professional presence.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm text-neutral-500 max-w-xs font-normal leading-relaxed">
            Engineered to meet the solemn dignity and statutory codes of the Bar and Bench.
          </p>
        </div>

        {/* 4 Category Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryKey)}
              className="group cursor-pointer flex flex-col transition-all duration-300"
            >
              {/* Image Container with subtle hover zoom */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/5 mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subdued Category Number pill */}
                <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-xs px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-[#1A1A1A] border border-black/5">
                  0{index + 1}
                </div>

                {/* Badge */}
                {cat.badge && (
                  <div className="absolute bottom-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-sans tracking-widest uppercase text-white">
                    {cat.badge}
                  </div>
                )}
              </div>

              {/* Text content - Clean and legible */}
              <div className="flex items-start justify-between gap-2 pt-1">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] group-hover:opacity-70 transition-opacity tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 mt-1 font-normal leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-1 p-1.5 rounded-full border border-transparent group-hover:border-black/20 group-hover:text-[#1A1A1A] text-neutral-400 transition-all">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
