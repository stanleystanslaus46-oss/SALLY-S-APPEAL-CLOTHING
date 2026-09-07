import React from 'react';
import { ShieldCheck, Award, Scale } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <div className="min-h-10 sm:h-12 bg-neutral-100 border-y border-black/5 flex flex-wrap items-center justify-around px-6 sm:px-10 py-2 sm:py-0 gap-y-2 gap-x-6">
      <div className="flex items-center space-x-2.5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">
        <ShieldCheck className="w-3.5 h-3.5 stroke-[1.5]" />
        <span>Professional Standard</span>
      </div>

      <div className="flex items-center space-x-2.5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">
        <Award className="w-3.5 h-3.5 stroke-[1.5]" />
        <span>Quality Materials</span>
      </div>

      <div className="flex items-center space-x-2.5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">
        <Scale className="w-3.5 h-3.5 stroke-[1.5]" />
        <span>Made For Bar &amp; Bench</span>
      </div>

      <div className="flex items-center space-x-2.5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">
        <span className="w-3.5 h-3.5 bg-[#D32F2F] rounded-full flex items-center justify-center text-[7px] text-white font-black leading-none">
          M
        </span>
        <span>M-PESA Available</span>
      </div>
    </div>
  );
};

