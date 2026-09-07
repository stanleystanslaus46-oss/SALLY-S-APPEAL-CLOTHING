import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  currency: 'TZS' | 'USD';
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string) => void;
}

const CATEGORY_TABS = [
  'All',
  'Court Robes',
  'Court Shirts',
  'Suits & Formalwear',
  'Wigs',
  'Bands',
  'Bags',
  'Accessories',
];

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'All',
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (activeCategory !== 'All' && product.category !== activeCategory) {
          return false;
        }
        // In stock filter
        if (inStockOnly && !product.inStock) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchSub = product.subtitle?.toLowerCase().includes(q) || false;
          if (!matchName && !matchCat && !matchDesc && !matchSub) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.priceTZS - b.priceTZS;
        }
        if (sortBy === 'price-high') {
          return b.priceTZS - a.priceTZS;
        }
        if (sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        }
        // Default featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeCategory, searchQuery, sortBy, inStockOnly]);

  return (
    <div className="w-full bg-[#F9F8F6] min-h-screen py-8 sm:py-12 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-black/5">
          <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2">
            ATELIER CATALOGUE
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal tracking-tight">
            The Complete Legal Collection
          </h1>
          <p className="mt-2 text-sm text-neutral-500 max-w-xl font-normal leading-relaxed">
            Bespoke court robes, silk judicial gowns, wing-collar tunic shirts, ceremonial wigs, and tailored attire made for the Bar &amp; the Bench.
          </p>
        </div>

        {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === tab
                  ? 'bg-[#1A1A1A] text-white font-semibold'
                  : 'bg-white border border-black/5 text-neutral-600 hover:border-black/20 hover:text-[#1A1A1A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search, Filter & Sort Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white/70 border border-black/5 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search robes, shirts, wigs, collar sizes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs font-sans bg-white border border-black/10 focus:outline-hidden focus:border-black"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1A1A1A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: In Stock & Sort */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {/* In-Stock Filter Toggle */}
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#1A1A1A]"
              />
              <span className="text-neutral-600 uppercase tracking-wider text-[11px]">
                In Stock Only
              </span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-black/10 text-xs font-sans py-1.5 px-2.5 focus:outline-hidden focus:border-black"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6 uppercase tracking-wider">
          <span>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
          {activeCategory !== 'All' && (
            <span className="text-neutral-800 font-medium">Category: {activeCategory}</span>
          )}
        </div>

        {/* 4-column (Desktop) / 3-column (Tablet) / 2-column (Mobile) Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-black/5 p-8">
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">No matching apparel found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
              We couldn&apos;t find any legal attire matching &quot;{searchQuery}&quot; in {activeCategory}. Try clearing your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </div>
  );
};
