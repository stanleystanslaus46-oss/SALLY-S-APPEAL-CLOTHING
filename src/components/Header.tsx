import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, Sparkles, Truck } from 'lucide-react';
import { Logo } from './Logo';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, category?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenTracking?: () => void;
  currency: 'TZS' | 'USD';
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenTracking,
  currency,
  onToggleCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: ActivePage, category?: string) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Subtle Top Notification / Origin Bar */}
      <div className="bg-[#1A1A1A] text-neutral-300 text-[10px] sm:text-[11px] font-medium py-1.5 px-6 text-center tracking-[0.2em] uppercase flex items-center justify-center gap-2 select-none border-b border-black/10">
        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        <span>Tanzanian Legal Outfitters • Nationwide Delivery via M-PESA • Dar es Salaam Chambers</span>
      </div>

      <header
        id="main-header"
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-black/5 ${
          isScrolled ? 'h-14 shadow-xs' : 'h-16'
        } px-4 sm:px-8 lg:px-10 flex items-center`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Sally's Legal Apparel Logo */}
          <div className="flex-1">
            <button
              id="header-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-hidden group"
              aria-label="Sally's Legal Apparel - Return to Homepage"
            >
              <Logo size={isScrolled ? 'sm' : 'md'} />
            </button>
          </div>

          {/* CENTER: Desktop Immersive Navigation */}
          <nav className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-medium" aria-label="Main Navigation">
            <button
              id="nav-link-shop"
              onClick={() => handleNavClick('shop')}
              className={`transition-opacity duration-200 ${
                activePage === 'shop'
                  ? 'text-[#1A1A1A] font-bold border-b border-black pb-1'
                  : 'text-[#1A1A1A]/70 hover:opacity-50'
              }`}
            >
              Shop
            </button>
            <button
              id="nav-link-collections"
              onClick={() => {
                if (activePage !== 'home') {
                  handleNavClick('home');
                  setTimeout(() => {
                    document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#1A1A1A]/70 hover:opacity-50 transition-opacity"
            >
              Collections
            </button>
            <button
              id="nav-link-the-edit"
              onClick={() => {
                if (activePage !== 'home') {
                  handleNavClick('home');
                  setTimeout(() => {
                    document.getElementById('the-edit-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('the-edit-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#1A1A1A]/70 hover:opacity-50 transition-opacity"
            >
              The Edit
            </button>
            <button
              id="nav-link-our-story"
              onClick={() => handleNavClick('our-story')}
              className={`transition-opacity duration-200 ${
                activePage === 'our-story'
                  ? 'text-[#1A1A1A] font-bold border-b border-black pb-1'
                  : 'text-[#1A1A1A]/70 hover:opacity-50'
              }`}
            >
              Our Story
            </button>
          </nav>

          {/* RIGHT: Search, Currency, Account, Bag */}
          <div className="flex-1 flex items-center justify-end space-x-4 sm:space-x-6">
            {/* Currency Switcher */}
            <button
              id="currency-toggle-btn"
              onClick={onToggleCurrency}
              className="hidden sm:inline-flex text-[10px] font-mono tracking-wider px-2 py-0.5 border border-black/10 hover:border-black/30 rounded-xs text-[#1A1A1A] transition-colors"
              title="Toggle currency display"
            >
              {currency === 'TZS' ? 'TZS' : 'USD'}
            </button>

            {/* Search Icon */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-1 text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity focus:outline-hidden"
              aria-label="Search Legal Apparel"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Wishlist Icon */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-1 text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity focus:outline-hidden"
              aria-label="Saved Items"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#1A1A1A] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Track Consignment Button (Desktop) */}
            <button
              id="header-track-order-btn"
              onClick={onOpenTracking || onOpenAccount}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-[#1A1A1A] border border-black/10 hover:border-black/30 bg-[#FAF8F5] transition-colors"
              title="Track Consignment Status"
            >
              <Truck className="w-3.5 h-3.5 text-[#8C6D37]" />
              <span>Track Order</span>
            </button>

            {/* Account Icon (Desktop) */}
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="hidden sm:inline-flex p-1 text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity focus:outline-hidden"
              aria-label="Client Account / Chambers Service"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Shopping Bag Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 p-1 text-[#1A1A1A] opacity-70 hover:opacity-100 transition-opacity focus:outline-hidden"
              aria-label={`Shopping Bag, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="text-[10px] font-semibold font-mono tracking-tight bg-[#1A1A1A] text-white px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1 text-[#1A1A1A] opacity-80 hover:opacity-100 focus:outline-hidden"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0E0E10]/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col p-6 z-10 justify-between">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E0D8]">
                <Logo size="sm" />
                <button
                  id="mobile-menu-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#0E0E10] hover:opacity-75 focus:outline-hidden"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-8 flex flex-col space-y-5">
                <button
                  onClick={() => handleNavClick('shop')}
                  className="text-left font-serif text-2xl tracking-wide text-[#0E0E10] hover:text-[#B89758] transition-colors"
                >
                  Shop All Collections
                </button>
                <div className="pl-3 border-l-2 border-[#E5E0D8] flex flex-col space-y-3 py-1">
                  <button
                    onClick={() => handleNavClick('shop', 'Court Robes')}
                    className="text-left text-sm font-sans tracking-wider text-[#52525B] hover:text-[#0E0E10]"
                  >
                    Court Robes
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'Court Shirts')}
                    className="text-left text-sm font-sans tracking-wider text-[#52525B] hover:text-[#0E0E10]"
                  >
                    Court Shirts
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'Suits & Formalwear')}
                    className="text-left text-sm font-sans tracking-wider text-[#52525B] hover:text-[#0E0E10]"
                  >
                    Suits &amp; Formalwear
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'Wigs')}
                    className="text-left text-sm font-sans tracking-wider text-[#52525B] hover:text-[#0E0E10]"
                  >
                    Wigs &amp; Bands
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'Bags')}
                    className="text-left text-sm font-sans tracking-wider text-[#52525B] hover:text-[#0E0E10]"
                  >
                    Counsel Bags &amp; Accessories
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => {
                      document.getElementById('collections-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="text-left font-serif text-2xl tracking-wide text-[#0E0E10] hover:text-[#B89758] transition-colors"
                >
                  Collections Grid
                </button>

                <button
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => {
                      document.getElementById('the-edit-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="text-left font-serif text-2xl tracking-wide text-[#0E0E10] hover:text-[#B89758] transition-colors"
                >
                  The Edit
                </button>

                <button
                  onClick={() => handleNavClick('our-story')}
                  className="text-left font-serif text-2xl tracking-wide text-[#0E0E10] hover:text-[#B89758] transition-colors"
                >
                  Our Story
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTracking) onOpenTracking();
                    else onOpenAccount();
                  }}
                  className="text-left font-serif text-2xl tracking-wide text-[#0E0E10] hover:text-[#B89758] transition-colors flex items-center gap-2"
                >
                  <Truck className="w-5 h-5 text-[#B89758]" />
                  <span>Track Consignment</span>
                </button>
              </div>
            </div>

            {/* Bottom info in mobile drawer */}
            <div className="pt-6 border-t border-[#E5E0D8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#71717A]">Currency Display</span>
                <button
                  onClick={onToggleCurrency}
                  className="text-xs font-mono font-medium px-2 py-1 bg-[#F2EFE9] border border-[#D5CFBF] rounded-xs"
                >
                  {currency === 'TZS' ? 'TSh Tanzanian Shillings' : 'USD ($)'}
                </button>
              </div>
              <div className="text-xs text-[#71717A] leading-relaxed">
                <p className="font-medium text-[#0E0E10]">M-PESA LIPA NO. 50777411</p>
                <p>Dar es Salaam, Tanzania • @legal___apparel</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
