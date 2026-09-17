import React from 'react';

interface BaharizLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
}

export const BaharizLogo: React.FC<BaharizLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    hero: 'h-20 sm:h-24 md:h-28',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Visual Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={`${sizeClasses[size]} aspect-square filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)] transition-transform duration-300 hover:scale-105`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Glow Circle */}
          <circle cx="50" cy="50" r="46" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" className="opacity-40 animate-spin" style={{ animationDuration: '30s' }} />
          <circle cx="50" cy="50" r="42" fill="#141416" stroke="#26262b" strokeWidth="2" />
          
          {/* Crown Icon representing "ملوك السوري" */}
          <path
            d="M32 38L37 46L50 32L63 46L68 38L66 52H34L32 38Z"
            fill="#F59E0B"
          />
          <circle cx="50" cy="29" r="2.5" fill="#FACC15" />
          <circle cx="32" cy="35" r="2" fill="#FACC15" />
          <circle cx="68" cy="35" r="2" fill="#FACC15" />

          {/* Letter B / Flourish Stylized Base */}
          <path
            d="M30 58C30 58 40 54 50 54C60 54 70 58 70 58C72 63 67 72 50 72C33 72 28 63 30 58Z"
            fill="#F59E0B"
            className="opacity-90"
          />
          <text
            x="50"
            y="67"
            fill="#0B0B0C"
            fontSize="10"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="Cairo, sans-serif"
          >
            بهاريز
          </text>

          {/* Steam / Aroma Sparks */}
          <path d="M42 22C42 22 43 25 41 27" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M50 20C50 20 51 23 49 25" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <path d="M58 22C58 22 57 25 59 27" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-right">
        <div className="flex items-center gap-2">
          <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white leading-none">
            بهاريـ<span className="text-[#F59E0B]">ـز</span>
          </span>
          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-[#F59E0B] border border-amber-500/30">
            ملوك السوري
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-2 mt-1">
            <span className="font-brand-en text-[11px] font-bold text-neutral-400 tracking-[0.25em]">
              BAHARIZ
            </span>
            <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
            <span className="text-[10px] font-medium text-amber-300/80">
              طعم ليه مزاج
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
