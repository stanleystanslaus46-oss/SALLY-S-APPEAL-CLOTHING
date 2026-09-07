import React from 'react';
import { ArrowRight, Scale, Award } from 'lucide-react';
import { ROBE_HERO } from '../data/products';

interface TheIdentityProps {
  onDiscoverStory: () => void;
}

export const TheIdentity: React.FC<TheIdentityProps> = ({ onDiscoverStory }) => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F9F8F6] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 border border-black/5">
              <img
                src={ROBE_HERO}
                alt="Advocate Robe Craftsmanship by Sally's Legal Apparel"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/85 backdrop-blur-xs text-white px-3 py-1.5 text-[9px] font-mono tracking-widest uppercase">
                HAND-PLEATED YOKE ARCHITECTURE
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-3">
              03 / THE IDENTITY
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal leading-[1.12] mb-6 tracking-tight">
              Presence begins with what you wear.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mb-8">
              <p>
                Sally&apos;s Legal Apparel exists to provide refined, professional apparel for advocates and legal professionals.
              </p>
              <p>
                In the courtroom, your attire communicates respect for the judicature, unwavering authority, and personal discipline. Every gown, wing collar tunic, and starched band is handcrafted to honor the storied tradition of the Bar and Bench while embracing modern ergonomic tailoring.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-5 border-y border-black/5 mb-8">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-base font-medium text-[#1A1A1A]">Court Directives</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Fully certified for High Court &amp; Court of Appeal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-base font-medium text-[#1A1A1A]">Heritage Fabrics</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Super 140s wool &amp; pure Egyptian two-ply cotton</p>
                </div>
              </div>
            </div>

            <div>
              <button
                id="discover-story-btn"
                onClick={onDiscoverStory}
                className="group inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
