import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: 'TZS' | 'USD';
  onSelectProduct: (product: Product) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E0E10]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#D5CFBF] shadow-2xl z-10 overflow-hidden">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#E5E0D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C6D37] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search robes, shirts, wigs, collar sizes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-base sm:text-lg font-serif placeholder:font-sans placeholder:text-xs placeholder:text-[#A1A1AA] text-[#0E0E10] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#71717A] hover:text-[#0E0E10] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono tracking-wider uppercase text-[#52525B] hover:text-[#0E0E10] pl-2 border-l border-[#E5E0D8]"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-[#71717A] mb-3">
                POPULAR SEARCHES
              </div>
              <div className="flex flex-wrap gap-2">
                {['Advocate Barathea Court Robe', 'Wing-Collar Tunic Shirt', 'Barrister Horsehair Wig', 'Pure Linen Bands', 'Full-Grain Counsel Bag'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-white border border-[#D5CFBF] text-xs text-[#27272A] hover:border-[#0E0E10]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717A]">
              No legal apparel found matching &quot;{query}&quot;. Try searching for &quot;Robe&quot;, &quot;Shirt&quot;, or &quot;Wig&quot;.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-2">
                <span>{results.length} results</span>
                <button
                  onClick={() => {
                    onViewAllResults(query);
                    onClose();
                  }}
                  className="text-[#8C6D37] hover:underline"
                >
                  View all in Shop →
                </button>
              </div>

              {results.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2.5 bg-white border border-[#E5E0D8] hover:border-[#0E0E10] cursor-pointer transition-colors"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-14 object-cover bg-[#F0EDE6]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase text-[#71717A]">
                      {product.category}
                    </div>
                    <div className="font-serif text-sm text-[#0E0E10] font-normal">
                      {product.name}
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#0E0E10]">
                    {currency === 'USD'
                      ? `$${product.priceUSD.toLocaleString()}`
                      : `TSh ${product.priceTZS.toLocaleString()}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
