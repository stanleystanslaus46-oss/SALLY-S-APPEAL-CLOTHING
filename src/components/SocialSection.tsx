import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/products';

export const SocialSection: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F9F8F6] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-6 border-b border-black/5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2">
              05 / SOCIAL
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight font-normal">
              Follow the collection.
            </h2>
          </div>

          <a
            href="https://instagram.com/legal___apparel"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#1A1A1A] hover:opacity-60 transition-opacity group"
          >
            {/* Real Instagram Mark */}
            <svg
              className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="font-semibold text-xs">@legal___apparel</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* 6 Real Apparel Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((post, idx) => (
            <a
              key={idx}
              href="https://instagram.com/legal___apparel"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-neutral-100 border border-black/5 block"
              aria-label={`View Instagram post: ${post.caption}`}
            >
              <img
                src={post.image}
                alt="Sally's Legal Apparel Instagram Feed"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay with Real Instagram Mark and Engagement */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#D4AF37]">@legal___apparel</span>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-white text-white" />
                    <span className="text-[10px]">{post.likes}</span>
                  </div>
                </div>

                <p className="text-[10px] text-white/90 line-clamp-3 leading-relaxed font-light">
                  {post.caption}
                </p>

                <div className="text-[9px] font-mono tracking-widest uppercase text-white/60">
                  TAP TO VIEW ON IG
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
