import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'TZS' | 'USD';
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colours[0]);
  const [isHovered, setIsHovered] = useState(false);

  // Active image based on selected color or hover
  const activeImage = selectedColor.image || product.images[0];

  const formatPrice = () => {
    if (currency === 'USD') {
      return `$${product.priceUSD.toLocaleString()}`;
    }
    return `TSh ${product.priceTZS.toLocaleString()}`;
  };

  return (
    <div
      className="group relative flex flex-col h-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/5">
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104 cursor-pointer"
          onClick={() => onSelectProduct(product)}
          referrerPolicy="no-referrer"
        />

        {/* Tag / Badge */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 bg-[#1A1A1A]/85 backdrop-blur-xs text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 pointer-events-none">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isWishlisted
              ? 'bg-[#1A1A1A] text-red-400'
              : 'bg-white/85 text-[#1A1A1A] hover:bg-white hover:text-black'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`}
            strokeWidth={1.75}
          />
        </button>

        {/* Action Overlay Bar - Slides up smoothly */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white text-[#1A1A1A] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase hover:bg-neutral-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedColor, product.sizes[0]);
            }}
            className="inline-flex items-center justify-center p-2 bg-[#1A1A1A] text-white hover:bg-neutral-800 transition-colors"
            title="Add default size to bag"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 pt-3 pb-1">
        {/* Category & Availability */}
        <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1 uppercase tracking-[0.2em] font-medium">
          <span>{product.category}</span>
          {product.inStock && (
            <span className="text-emerald-700 text-[10px] font-medium">In Stock</span>
          )}
        </div>

        {/* Product Title */}
        <h4
          onClick={() => onSelectProduct(product)}
          className="font-serif text-base sm:text-lg text-[#1A1A1A] font-normal hover:opacity-70 transition-opacity cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </h4>

        {/* Price */}
        <div className="text-sm font-sans font-semibold text-[#1A1A1A] mb-2 tracking-tight">
          {formatPrice()}
        </div>

        {/* Colour Swatches - Functional */}
        {product.colours && product.colours.length > 0 && (
          <div className="flex items-center gap-1.5 mt-auto pt-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono mr-1">
              Colours:
            </span>
            {product.colours.map((col) => (
              <button
                key={col.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(col);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === col.name
                    ? 'ring-2 ring-[#1A1A1A] ring-offset-1 scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Select ${col.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
