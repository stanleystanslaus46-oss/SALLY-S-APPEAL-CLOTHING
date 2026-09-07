import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { MPesaBadge } from './MPesaBadge';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: 'TZS' | 'USD';
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotalTZS = cartItems.reduce(
    (acc, item) => acc + item.product.priceTZS * item.quantity,
    0
  );
  const subtotalUSD = cartItems.reduce(
    (acc, item) => acc + item.product.priceUSD * item.quantity,
    0
  );

  // Delivery estimation: Free delivery in Dar es Salaam for orders over TSh 300,000, else TSh 15,000
  const deliveryTZS = subtotalTZS > 300000 || subtotalTZS === 0 ? 0 : 15000;
  const deliveryUSD = subtotalUSD > 120 || subtotalUSD === 0 ? 0 : 6;

  const totalTZS = subtotalTZS + deliveryTZS;
  const totalUSD = subtotalUSD + deliveryUSD;

  const formatPrice = (tzs: number, usd: number) => {
    return currency === 'USD' ? `$${usd.toLocaleString()}` : `TSh ${tzs.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E10]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#E2DDD4]">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0E0E10]" />
            <h3 className="font-serif text-2xl text-[#0E0E10] font-normal">
              Your Shopping Bag
            </h3>
            <span className="text-xs font-mono bg-[#0E0E10] text-white px-2 py-0.5 rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            id="cart-drawer-close-btn"
            onClick={onClose}
            className="p-1.5 text-[#52525B] hover:text-[#0E0E10] transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#71717A]">
              <ShoppingBag className="w-12 h-12 stroke-[1.25] text-[#D4D4D8] mb-4" />
              <p className="font-serif text-xl text-[#1C1C1C] mb-2">Your bag is empty</p>
              <p className="text-xs max-w-xs leading-relaxed text-[#71717A] mb-6">
                Explore our collections of advocate robes, wing-collar shirts, and judicial wigs.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#0E0E10] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#252528] transition-colors"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const itemImg = item.selectedColor.image || item.product.images[0];
              return (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 pb-5 border-b border-[#E8E4DC] last:border-none"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#F0EDE6] border border-[#E0DBD0] shrink-0 overflow-hidden">
                    <img
                      src={itemImg}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm sm:text-base text-[#0E0E10] font-normal leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#A1A1AA] hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#71717A] mt-1 font-mono">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                        <span>•</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="inline-flex items-center border border-[#D5CFBF] bg-white">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="p-1.5 text-[#52525B] hover:text-[#0E0E10] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold text-[#0E0E10]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1.5 text-[#52525B] hover:text-[#0E0E10] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-semibold text-[#0E0E10]">
                        {formatPrice(
                          item.product.priceTZS * item.quantity,
                          item.product.priceUSD * item.quantity
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Subtotal, Delivery and Action Buttons */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[#F5F2EC] border-t border-[#E5E0D8] space-y-4">
            <div className="space-y-2 text-xs text-[#52525B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-[#0E0E10]">
                  {formatPrice(subtotalTZS, subtotalUSD)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-mono font-medium text-[#0E0E10]">
                  {deliveryTZS === 0 ? (
                    <span className="text-[#3A724B] font-semibold">FREE (Dar es Salaam)</span>
                  ) : (
                    formatPrice(deliveryTZS, deliveryUSD)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-semibold text-[#0E0E10] pt-2 border-t border-[#E5E0D8]">
                <span>Total</span>
                <span className="font-mono">{formatPrice(totalTZS, totalUSD)}</span>
              </div>
            </div>

            {/* M-PESA reminder */}
            <div className="flex items-center justify-between py-1 px-2.5 bg-white border border-[#E5E0D8] rounded-[2px]">
              <MPesaBadge size="sm" showLipaNo={true} />
              <span className="text-[10px] font-mono text-[#71717A]">INSTANT LIPA</span>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#0E0E10] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#252528] transition-colors shadow-sm"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 text-center text-xs font-semibold tracking-[0.16em] uppercase text-[#52525B] hover:text-[#0E0E10] transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
