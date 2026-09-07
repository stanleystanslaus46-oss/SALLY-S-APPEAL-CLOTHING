import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Scale,
  Ruler,
  MessageSquare
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { MPesaBadge } from './MPesaBadge';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  currency: 'TZS' | 'USD';
  isWishlisted: boolean;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  currency,
  isWishlisted,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onBackToShop,
  onOpenSizeGuide,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colours[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(
    product.colours[0]?.image || product.images[0]
  );
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'payment' | 'returns'>('details');
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Sync state whenever viewing a new product & track in recently viewed
  useEffect(() => {
    setSelectedColor(product.colours[0]);
    setSelectedSize(product.sizes[0]);
    setActiveImage(product.colours[0]?.image || product.images[0]);
    setQuantity(1);

    try {
      const stored = localStorage.getItem('sallys_legal_recently_viewed');
      const ids: string[] = stored ? JSON.parse(stored) : [];

      // Extract previously viewed products excluding current product
      const previous = ids
        .filter((id) => id !== product.id)
        .map((id) => allProducts.find((p) => p.id === id))
        .filter((p): p is Product => !!p)
        .slice(0, 4);

      setRecentlyViewed(previous);

      // Prepend current product to history
      const updated = [product.id, ...ids.filter((id) => id !== product.id)].slice(0, 12);
      localStorage.setItem('sallys_legal_recently_viewed', JSON.stringify(updated));
    } catch {
      // Ignore local storage parse errors
    }
  }, [product.id, allProducts]);

  const formatPrice = () => {
    if (currency === 'USD') {
      return `$${product.priceUSD.toLocaleString()}`;
    }
    return `TSh ${product.priceTZS.toLocaleString()}`;
  };

  const handleColorChange = (col: ProductColor) => {
    setSelectedColor(col);
    if (col.image) {
      setActiveImage(col.image);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
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

  // 4 related products from the same category (or fallback to fill 4)
  const youMayAlsoLike = useMemo(() => {
    const sameCategory = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }
    const others = allProducts.filter(
      (p) => p.category !== product.category && p.id !== product.id
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [allProducts, product.id, product.category]);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-6 sm:py-10 border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#71717A] mb-8">
          <button onClick={onBackToShop} className="hover:text-[#0E0E10] transition-colors">
            Shop
          </button>
          <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
          <span className="text-[#52525B]">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
          <span className="text-[#0E0E10] font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* LEFT: Large Image Gallery (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Gallery Thumbnails List */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[580px] shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 bg-[#F0EDE6] border transition-all overflow-hidden shrink-0 ${
                      activeImage === img
                        ? 'border-[#0E0E10] ring-1 ring-[#0E0E10]'
                        : 'border-[#D5CFBF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] max-h-[640px] bg-[#F0EDE6] border border-[#E2DDD4] overflow-hidden group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {product.tag && (
                <div className="absolute top-4 left-4 bg-[#0E0E10]/90 backdrop-blur-xs text-[#FAF8F5] text-[10px] font-mono tracking-widest uppercase px-3 py-1">
                  {product.tag}
                </div>
              )}

              <div className="absolute bottom-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1C1C1C] text-[10px] font-mono tracking-widest uppercase px-3 py-1 border border-[#E5E0D8]">
                SALLY&apos;S COURT COLLECTION
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information & Purchase Controls (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Category & Badge */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#71717A] mb-2">
              <span>{product.category}</span>
              {product.inStock ? (
                <span className="text-[#3A724B] font-semibold">Available for Chamber Delivery</span>
              ) : (
                <span className="text-[#A1A1AA]">Made to Order (5 Days)</span>
              )}
            </div>

            {/* Product Name & Subtitle */}
            <h1 className="font-serif text-3xl sm:text-4xl text-[#0E0E10] font-normal leading-tight mb-2 tracking-tight">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-xs sm:text-sm font-sans text-[#71717A] font-light mb-4">
                {product.subtitle}
              </p>
            )}

            {/* Price */}
            <div className="text-2xl font-sans font-semibold text-[#0E0E10] mb-6 pb-4 border-b border-[#E5E0D8]">
              {formatPrice()}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Colour Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                <span className="text-[#1C1C1C] font-semibold">COLOUR:</span>
                <span className="text-[#71717A] font-medium">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colours.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => handleColorChange(col)}
                    className={`relative w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                      selectedColor.name === col.name
                        ? 'ring-2 ring-[#0E0E10] ring-offset-2 scale-105'
                        : 'border-[#D4D4D8] hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    aria-label={`Select ${col.name}`}
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

            {/* Size Selection & Size Guide */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-2">
                <span className="text-[#1C1C1C] font-semibold">SIZE:</span>
                <button
                  id="pdp-size-guide-btn"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE3] hover:bg-[#EBE2D2] text-[#8C6D37] border border-[#D5CFBF] text-[11px] font-mono tracking-wider uppercase transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>SIZE GUIDE</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 text-xs font-mono tracking-wide transition-all ${
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
                  className="px-3 py-2 text-[#52525B] hover:text-[#0E0E10] transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-mono font-semibold text-[#0E0E10]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#52525B] hover:text-[#0E0E10] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: WhatsApp Order, Add to Bag, Buy Now, Wishlist */}
            <div className="space-y-3 pt-2 mb-8">
              {/* WhatsApp Ordering (Prominent direct message button) */}
              <button
                id="pdp-order-whatsapp-btn"
                onClick={handleOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-[0.18em] transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="pdp-add-to-bag-btn"
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 bg-[#FAF8F5] border-2 border-[#0E0E10] text-[#0E0E10] hover:bg-[#F2EFE9] text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
                </button>

                <button
                  id="pdp-buy-now-btn"
                  onClick={() => onBuyNow(product, selectedColor, selectedSize, quantity)}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 bg-[#0E0E10] text-[#FAF8F5] hover:bg-[#252528] text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-sm"
                >
                  <span>BUY NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-full py-2.5 px-4 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border transition-colors ${
                  isWishlisted
                    ? 'border-[#0E0E10] bg-[#0E0E10] text-white'
                    : 'border-[#D5CFBF] text-[#52525B] hover:border-[#0E0E10] hover:text-[#0E0E10]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'SAVED IN WISHLIST' : 'SAVE TO WISHLIST'}</span>
              </button>
            </div>

            {/* Official M-PESA Box */}
            <div className="p-4 bg-white border border-[#E5E0D8] mb-8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#71717A]">
                  OFFICIAL M-PESA CHECKOUT
                </span>
                <span className="text-[10px] font-mono text-[#3A724B] font-semibold">
                  INSTANT VERIFICATION
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MPesaBadge size="md" showLipaNo={true} />
              </div>
              <p className="text-[11px] text-[#71717A] leading-relaxed">
                Pay instantly via Vodacom M-Pesa. Use Lipa No. 50777411 during checkout or on your mobile device.
              </p>
            </div>

            {/* Information Accordion Tabs */}
            <div className="border-t border-[#E5E0D8] divide-y divide-[#E5E0D8]">
              {/* Tab 1: Court Directives & Specifications */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'details' ? 'shipping' : 'details')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#0E0E10] hover:text-[#8C6D37] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#8C6D37]" />
                    Courtroom Specifications &amp; Fabric
                  </span>
                  <span>{activeTab === 'details' ? '−' : '+'}</span>
                </button>
                {activeTab === 'details' && (
                  <div className="pb-4 text-xs text-[#52525B] space-y-2 leading-relaxed">
                    <p>
                      <strong>Court Directives:</strong> {product.courtDetails || 'Manufactured in compliance with the High Court of Tanzania Practice Directions and Commonwealth Advocate standards.'}
                    </p>
                    <p>
                      <strong>Fabric Composition:</strong> {product.fabric || 'Super 140s pure wool / Egyptian cotton.'}
                    </p>
                    <p>
                      <strong>Atelier Note:</strong> Every robe yoke and sleeve fluting is hand-pleated to ensure enduring drape and dignity in open court.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 2: Shipping */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'shipping' ? 'details' : 'shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#0E0E10] hover:text-[#8C6D37] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8C6D37]" />
                    Shipping &amp; Chambers Delivery
                  </span>
                  <span>{activeTab === 'shipping' ? '−' : '+'}</span>
                </button>
                {activeTab === 'shipping' && (
                  <div className="pb-4 text-xs text-[#52525B] space-y-2 leading-relaxed">
                    <p>
                      <strong>Dar es Salaam:</strong> Same-day or next-day personal delivery to law firms, High Court registry, or judicial chambers.
                    </p>
                    <p>
                      <strong>Upcountry (Arusha, Dodoma, Mwanza, Mbeya, Zanzibar):</strong> 1 to 2 business days via express courier with real-time tracking.
                    </p>
                    <p>
                      <strong>East Africa (Kenya, Uganda, Rwanda):</strong> 2 to 4 business days for East African Court of Justice advocates.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 3: Returns & Adjustments */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'returns' ? 'details' : 'returns')}
                  className="w-full py-3.5 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#0E0E10] hover:text-[#8C6D37] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#8C6D37]" />
                    Fittings &amp; Tailoring Guarantee
                  </span>
                  <span>{activeTab === 'returns' ? '−' : '+'}</span>
                </button>
                {activeTab === 'returns' && (
                  <div className="pb-4 text-xs text-[#52525B] space-y-2 leading-relaxed">
                    <p>
                      We provide complimentary hem and sleeve adjustments at our Dar es Salaam atelier for any advocate robes within 14 days of purchase.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE Section (4 related products from same category) */}
        {youMayAlsoLike.length > 0 && (
          <div className="pt-14 border-t border-[#E2DDD4]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#8C6D37]">
                  FROM THE SAME CATEGORY ({product.category.toUpperCase()})
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0E0E10] font-normal mt-1">
                  YOU MAY ALSO LIKE
                </h3>
              </div>
              <button
                onClick={onBackToShop}
                className="text-xs font-mono uppercase tracking-wider text-[#0E0E10] hover:text-[#8C6D37] border-b border-[#0E0E10] pb-0.5"
              >
                View Full Collection
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {youMayAlsoLike.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(relProduct.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onSelectProduct}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onAddToCart={(p, c, s) => onAddToCart(p, c, s, 1)}
                />
              ))}
            </div>
          </div>
        )}

        {/* RECENTLY VIEWED Section */}
        {recentlyViewed.length > 0 && (
          <div className="pt-12 mt-12 border-t border-[#E5E0D8]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#71717A]">
                  CONTINUE BROWSING
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#0E0E10] font-normal mt-0.5">
                  RECENTLY VIEWED
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((recentItem) => (
                <ProductCard
                  key={`recent-${recentItem.id}`}
                  product={recentItem}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(recentItem.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onSelectProduct}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onAddToCart={(p, c, s) => onAddToCart(p, c, s, 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
