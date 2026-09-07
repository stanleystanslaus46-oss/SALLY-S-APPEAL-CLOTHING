import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface TheEditProps {
  products: Product[];
  currency: 'TZS' | 'USD';
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onViewAllClick?: () => void;
  onViewAllShop?: () => void;
}

export const TheEdit: React.FC<TheEditProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
  onViewAllClick,
  onViewAllShop,
}) => {
  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
    else if (onViewAllShop) onViewAllShop();
  };

  // Display strictly 6 products on the homepage as mandated
  const editProducts = products.slice(0, 6);

  return (
    <section id="the-edit-section" className="w-full py-16 sm:py-20 lg:py-24 bg-[#F9F8F6] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 pb-6 border-b border-black/5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2">
              02 / THE EDIT
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight font-normal">
              Selected for the modern legal professional.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm text-neutral-500 max-w-sm font-normal leading-relaxed">
            A curated capsule of premier advocate gowns, starched court neckwear, tailored suiting, and ceremonial wigs.
          </p>
        </div>

        {/* 6 Products Grid (3 cols on desktop, 2 on tablet/mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-10">
          {editProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Bottom Link: VIEW THE FULL COLLECTION → */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            id="view-full-collection-btn"
            onClick={handleViewAll}
            className="group inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <span>View The Full Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
