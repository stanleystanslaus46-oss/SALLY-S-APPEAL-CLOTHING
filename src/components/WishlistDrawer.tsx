import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: 'TZS' | 'USD';
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#0E0E10]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#E2DDD4]">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8C6D37]" />
            <h3 className="font-serif text-2xl text-[#0E0E10] font-normal">
              Saved Regalia
            </h3>
            <span className="text-xs font-mono bg-[#8C6D37] text-white px-2 py-0.5 rounded-full">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#52525B] hover:text-[#0E0E10] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#71717A]">
              <Heart className="w-12 h-12 stroke-[1.25] text-[#D4D4D8] mb-3" />
              <p className="font-serif text-xl text-[#1C1C1C] mb-1">Your wishlist is empty</p>
              <p className="text-xs max-w-xs text-[#71717A]">
                Save advocate gowns, shirts, or accessories to review later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white border border-[#E5E0D8] items-center"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-20 object-cover bg-[#F0EDE6] cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="text-[10px] font-mono text-[#71717A] uppercase">
                    {product.category}
                  </div>
                  <h4
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="font-serif text-sm text-[#0E0E10] hover:text-[#8C6D37] cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono font-semibold text-[#0E0E10] mt-1">
                    {currency === 'USD'
                      ? `$${product.priceUSD.toLocaleString()}`
                      : `TSh ${product.priceTZS.toLocaleString()}`}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onAddToCart(product, product.colours[0], product.sizes[0])}
                      className="text-[11px] font-mono uppercase tracking-wider text-[#0E0E10] hover:text-[#8C6D37] flex items-center gap-1 font-semibold"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-[#A1A1AA] hover:text-red-500 transition-colors p-0.5"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#F5F2EC] border-t border-[#E5E0D8]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0E0E10] text-white text-xs font-semibold uppercase tracking-[0.2em]"
          >
            CONTINUE BROWSING
          </button>
        </div>
      </div>
    </div>
  );
};
