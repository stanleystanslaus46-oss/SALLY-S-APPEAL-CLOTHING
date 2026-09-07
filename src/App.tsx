import React, { useState, useEffect } from 'react';
import { ActivePage, CartItem, Product, ProductColor } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CollectionsGrid } from './components/CollectionsGrid';
import { TheEdit } from './components/TheEdit';
import { QuickViewModal } from './components/QuickViewModal';
import { TheIdentity } from './components/TheIdentity';
import { Lookbook } from './components/Lookbook';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AccountModal } from './components/AccountModal';
import { BusinessPolicyModal, PolicyTab } from './components/BusinessPolicyModal';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OurStoryPage } from './components/OurStoryPage';

export default function App() {
  // Navigation & View State
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Currency State
  const [currency, setCurrency] = useState<'TZS' | 'USD'>('TZS');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [accountModalTab, setAccountModalTab] = useState<'account' | 'tracking'>('account');
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab>('contact');

  const handleOpenAccountModal = (tab: 'account' | 'tracking' = 'account', orderNum: string = '') => {
    setAccountModalTab(tab);
    setTrackingOrderNumber(orderNum);
    setIsAccountOpen(true);
  };

  const handleOpenPolicy = (tab: PolicyTab = 'contact') => {
    setPolicyModalTab(tab);
    setIsPolicyModalOpen(true);
  };

  // Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sallys_legal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage Persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sallys_legal_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sallys_legal_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sallys_legal_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlistIds]);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  // Navigation Handler
  const handleNavigate = (page: ActivePage, category?: string) => {
    if (category) {
      setShopCategory(category);
    } else if (page === 'shop') {
      setShopCategory('All');
    }
    setActivePage(page);
  };

  // Product Selection Handler
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number = 1
  ) => {
    handleAddToCart(product, color, size, quantity);
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1C1C] font-sans antialiased selection:bg-[#0E0E10] selection:text-[#FAF8F5]">
      {/* Editorial Announcement Banner with Official Lipa Till & Currency Switcher */}
      <div className="w-full bg-[#0E0E10] text-[#E4E4E7] text-[11px] font-mono py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#252528]">
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-[#C5A880] tracking-wider uppercase font-semibold">
            LEGAL OUTFITTERS
          </span>
          <span className="text-[#71717A]">•</span>
          <span className="text-[#A1A1AA] tracking-wide">
            DAR ES SALAAM ATELIER • HIGH COURT &amp; BAR ATTIRE
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#A1A1AA]">OFFICIAL M-PESA TILL:</span>
            <span className="text-white font-bold tracking-widest bg-[#1F1F24] px-2 py-0.5 border border-[#33333A]">
              50777411
            </span>
          </div>

          <div className="flex items-center gap-1 border-l border-[#2E2E35] pl-3">
            <button
              onClick={() => setCurrency('TZS')}
              className={`px-1.5 py-0.5 text-[10px] tracking-wider ${
                currency === 'TZS' ? 'text-white font-bold bg-[#2A2A30]' : 'text-[#71717A] hover:text-white'
              }`}
            >
              TZS
            </button>
            <span className="text-[#52525B]">/</span>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 text-[10px] tracking-wider ${
                currency === 'USD' ? 'text-white font-bold bg-[#2A2A30]' : 'text-[#71717A] hover:text-white'
              }`}
            >
              USD
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => handleOpenAccountModal('account')}
        onOpenTracking={() => handleOpenAccountModal('tracking')}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'TZS' ? 'USD' : 'TZS'))}
      />

      {/* Dynamic View Content */}
      <main className="flex-1 w-full">
        {activePage === 'home' && (
          <>
            <Hero
              onExploreCollection={() => handleNavigate('shop', 'All')}
              onExploreRobes={() => handleNavigate('shop', 'Court Robes')}
              onShopClick={() => handleNavigate('shop', 'All')}
              onExploreEditClick={() => {
                document.getElementById('the-edit-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onViewProductDetail={(id) => {
                const p = PRODUCTS.find((item) => item.id === id);
                if (p) handleSelectProduct(p);
                else handleNavigate('shop', 'All');
              }}
            />
            <TrustStrip />
            <CollectionsGrid onSelectCategory={(cat) => handleNavigate('shop', cat)} />
            <TheEdit
              products={PRODUCTS}
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onViewAllShop={() => handleNavigate('shop', 'All')}
            />
            <TheIdentity onDiscoverStory={() => handleNavigate('our-story')} />
            <Lookbook />
            <SocialSection />
          </>
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            initialCategory={shopCategory}
            currency={currency}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
          />
        )}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            currency={currency}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            onBackToShop={() => handleNavigate('shop', selectedProduct.category)}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            currency={currency}
            onBackToCart={() => setIsCartOpen(true)}
            onClearCart={handleClearCart}
            onContinueShopping={() => handleNavigate('shop', 'All')}
            onTrackOrder={(orderNum) => handleOpenAccountModal('tracking', orderNum)}
          />
        )}

        {activePage === 'our-story' && (
          <OurStoryPage onExploreShop={() => handleNavigate('shop', 'All')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracking={() => handleOpenAccountModal('tracking')}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Floating WhatsApp Button (hidden during checkout view to guarantee zero collision) */}
      <WhatsAppButton hidden={activePage === 'checkout'} />

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setActivePage('checkout');
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={(p, c, s) => {
          handleAddToCart(p, c, s, 1);
          setIsWishlistOpen(false);
        }}
        onSelectProduct={handleSelectProduct}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onViewFullProduct={handleSelectProduct}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={handleSelectProduct}
        onViewAllResults={(query) => {
          handleNavigate('shop', 'All');
        }}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialTab={accountModalTab}
        initialOrderNumber={trackingOrderNumber}
        currency={currency}
      />

      <BusinessPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        initialTab={policyModalTab}
      />
    </div>
  );
}
