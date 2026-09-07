import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = false,
  size = 'md',
}) => {
  const isLight = variant === 'light';
  const fillColor = isLight ? '#FFFFFF' : '#1A1A1A';
  const subColor = isLight ? 'text-neutral-400' : 'text-neutral-500';
  const maskId = useId().replace(/:/g, '_') + '_sla_mask';

  // Sizing styles for the vector emblem
  const sizeClasses = {
    sm: 'h-7 sm:h-8 w-auto',
    md: 'h-9 sm:h-11 w-auto',
    lg: 'h-12 sm:h-14 w-auto',
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {/* Official Sally's Legal Apparel (SLA) Monogram & Wordmark */}
      <svg
        className={`${sizeClasses} max-w-full transition-transform duration-300 group-hover:opacity-85`}
        viewBox="0 0 1000 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Sally's Legal Apparel Official Logo"
      >
        <defs>
          {/* Horizontal cutout mask dividing the S, L, A emblem */}
          <mask id={maskId}>
            <rect width="1000" height="520" fill="white" />
            <rect x="30" y="225" width="940" height="70" fill="black" />
          </mask>
        </defs>

        {/* The 'SLA' Monogram with crisp horizontal separation */}
        <g mask={`url(#${maskId})`} fill={fillColor}>
          {/* Letter 'S' */}
          <path d="
            M 285 105 
            C 285 45 230 25 175 25 
            C 105 25 65 65 65 140 
            C 65 210 115 240 185 260 
            C 235 275 255 295 255 335 
            C 255 385 215 415 165 415 
            C 105 415 65 375 65 325 
            L 145 325 
            C 145 355 165 365 180 365 
            C 200 365 215 350 215 335 
            C 215 290 170 270 115 250 
            C 75 235 45 200 45 145 
            C 45 70 95 15 175 15 
            C 245 15 305 60 305 130 
            Z
          " />

          {/* Letter 'L' with bespoke upward-angled wedge foot */}
          <path d="
            M 415 20 
            H 510 
            V 325 
            L 635 260 
            V 415 
            H 415 
            Z
          " />

          {/* Letter 'A' triangular apex and balanced legs */}
          <path d="
            M 770 20 
            H 820 
            L 945 415 
            H 850 
            L 825 320 
            H 760 
            L 735 415 
            H 645 
            Z 
            M 795 110 
            L 775 240 
            H 815 
            Z
          " />
        </g>

        {/* Full Brand Name centered inside the horizontal cut */}
        <text
          x="500"
          y="267"
          textAnchor="middle"
          fontFamily="'Manrope', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="31"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={fillColor}
        >
          SALLY&apos;S LEGAL APPAREL
        </text>
      </svg>

      {showSubtitle && (
        <span
          className={`font-mono tracking-[0.24em] text-[9px] uppercase mt-1 ${subColor} font-medium`}
        >
          LEGAL OUTFITTERS • FOR THE BAR &amp; BENCH
        </span>
      )}
    </div>
  );
};
