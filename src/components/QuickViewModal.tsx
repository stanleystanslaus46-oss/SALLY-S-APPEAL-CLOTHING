import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, ArrowRight, MessageSquare } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  currency: 'TZS' | 'USD';
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onViewFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onBuyNow,
  onViewFullDetail,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colours[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(
    product.colours[0]?.image || product.images[0]
  );
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // When product or colour changes, update active image
  useEffect(() => {
    if (selectedColor?.image) {
      setActiveImage(selectedColor.image);
    } else {
      setActiveImage(product.images[0]);
    }
  }, [selectedColor, product]);

  // Reset state when a new product is selected
  useEffect(() => {
    setSelectedColor(product.colours[0]);
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
    setActiveImage(product.colours[0]?.image || product.images[0]);
    setAddedNotice(false);
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatPrice = () => {
    if (currency === 'USD') {
      return `$${product.priceUSD.toLocaleString()}`;
    }
    return `TSh ${product.priceTZS.toLocaleString()}`;
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  const handleOrderWhatsApp = () => {
    const formattedPrice =
      currency === 'USD'
        ? `$${(product.priceUSD * quantity).toLocaleString()}`
        : `TSh ${(product.priceTZS * quantity).toLocaleString()}`;

    const message = `Hello Sally's Legal Apparel, I would like to order:
${product.name}
Colour: ${selectedColor.name}
Size: ${selectedSize}
Quantity: ${quantity}
Total: ${formattedPrice}`;

    const phone = '255687262017';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E10]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#D5CFBF] shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="quickview-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FAF8F5]/80 hover:bg-[#0E0E10] hover:text-[#FAF8F5] transition-colors border border-[#E5E0D8]"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Large Product Image */}
          <div className="bg-[#F0EDE6] p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E5E0D8]">
            <div className="relative w-full aspect-[3/4] max-h-[480px] overflow-hidden bg-white border border-[#E0DBD0]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-12 h-14 border transition-all overflow-hidden shrink-0 ${
                      activeImage === img
                        ? 'border-[#0E0E10] ring-1 ring-[#0E0E10]'
                        : 'border-[#D4D4D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Information & Interactive Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-[#71717A] mb-2">
                <span>{product.category}</span>
                {product.tag && (
                  <span className="text-[#8C6D37] font-semibold">{product.tag}</span>
                )}
              </div>

              {/* Title */}
              <h3 id="quickview-title" className="font-serif text-2xl sm:text-3xl text-[#0E0E10] font-normal leading-tight mb-1">
                {product.name}
              </h3>
              {product.subtitle && (
                <p className="text-xs text-[#52525B] font-sans mb-3">{product.subtitle}</p>
              )}

              {/* Price */}
              <div className="text-xl font-sans font-semibold text-[#0E0E10] mb-4 pb-4 border-b border-[#E5E0D8]">
                {formatPrice()}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Colour Selection - Mandatory Functional */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                  <span className="text-[#1C1C1C] font-semibold">COLOUR:</span>
                  <span className="text-[#71717A] font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colours.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`group relative flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                        selectedColor.name === col.name
                          ? 'ring-2 ring-[#0E0E10] ring-offset-2 scale-105'
                          : 'border-[#D4D4D8] hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                      aria-label={`Select colour ${col.name}`}
                    >
                      {selectedColor.name === col.name && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            col.hex === '#FFFFFF' || col.hex === '#F9F6F0' || col.hex === '#FAF9F6'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                  <span className="text-[#1C1C1C] font-semibold">SIZE:</span>
                  <span className="text-[#71717A]">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-sans tracking-wide transition-all ${
                        selectedSize === sz
                          ? 'bg-[#0E0E10] text-[#FAF8F5] font-semibold'
                          : 'bg-white border border-[#D5CFBF] text-[#27272A] hover:border-[#0E0E10]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1C1C1C] font-semibold">
                  QUANTITY:
                </span>
                <div className="inline-flex items-center border border-[#D5CFBF] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#52525B] hover:text-[#0E0E10] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-mono font-semibold text-[#0E0E10] min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#52525B] hover:text-[#0E0E10] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#E5E0D8]">
              {/* WhatsApp Ordering */}
              <button
                id="quickview-order-whatsapp-btn"
                onClick={handleOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  id="quickview-add-to-bag-btn"
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FAF8F5] border border-[#0E0E10] text-[#0E0E10] hover:bg-[#F2EFE9] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
                </button>

                <button
                  id="quickview-buy-now-btn"
                  onClick={handleBuy}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0E0E10] text-[#FAF8F5] hover:bg-[#252528] text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
                >
                  <span>BUY NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onViewFullDetail(product);
                  }}
                  className="text-xs text-[#8C6D37] hover:underline font-medium tracking-wide"
                >
                  View full court specifications &amp; fabric details →
                </button>
                <span className="text-[10px] font-mono text-[#71717A]">
                  LIPA NO. 50777411
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
