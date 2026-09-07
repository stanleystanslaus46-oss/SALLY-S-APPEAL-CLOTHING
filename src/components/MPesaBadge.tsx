import React from 'react';

interface MPesaBadgeProps {
  className?: string;
  showLipaNo?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MPesaBadge: React.FC<MPesaBadgeProps> = ({
  className = '',
  showLipaNo = true,
  size = 'md'
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Official M-PESA Red Brand Badge */}
      <div className="flex items-center bg-[#E60000] text-white font-sans font-bold px-2 py-0.5 rounded-[3px] text-[11px] tracking-wide shadow-xs select-none">
        <span className="mr-0.5">M-PESA</span>
      </div>
      {showLipaNo && (
        <span className={`font-mono font-semibold tracking-wider ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          LIPA NO. 50777411
        </span>
      )}
    </div>
  );
};

export const MPesaLogoOfficial: React.FC<{ className?: string }> = ({ className = 'h-7' }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-[#E60000] text-white rounded-[4px] shadow-sm select-none ${className}`}>
      {/* Vodacom red M-Pesa icon silhouette */}
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07c-2.83-.48-4-2.54-4-4.43h2.15c.1 1.05.69 2.5 2.85 2.5 1.74 0 2.68-.81 2.68-1.97 0-1.38-1.16-1.84-3.32-2.31C8.01 10.2 6.5 9.07 6.5 7.15c0-1.8 1.45-3.32 3.5-3.65V2.5h2v1c2.25.35 3.55 1.85 3.73 3.5h-2.13c-.15-.85-.82-1.7-2.6-1.7-1.6 0-2.4.8-2.4 1.75 0 1.25 1.13 1.67 3.2 2.15 2.58.58 4.2 1.63 4.2 3.8 0 1.83-1.37 3.5-3.9 3.93z" />
      </svg>
      <span className="font-extrabold tracking-tight text-white text-sm">M-PESA</span>
    </div>
  );
};
