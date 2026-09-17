import React from 'react';
import { Flame, Sparkles, Star, Crown } from 'lucide-react';

export const TickerMarquee: React.FC = () => {
  const items = [
    { text: 'ملوك السوري في مصر', icon: Crown },
    { text: 'سطلانة بهاريز الأسطورية', icon: Flame },
    { text: 'شاورما فراخ ولحوم بلدي', icon: Star },
    { text: 'خبز صاج مقرمش 100%', icon: Sparkles },
    { text: 'تتبيلة سورية بمزاج عالي', icon: Flame },
    { text: 'أسرع دليفري لـ 6 فروع', icon: Crown },
    { text: 'سندوتش بهاريز مكس 80 ج', icon: Star },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#121215] via-[#1A1A1E] to-[#121215] border-y border-[#F59E0B]/20 py-3 select-none">
      <div className="flex w-max animate-marquee space-x-reverse space-x-8">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm sm:text-base font-bold text-neutral-200"
            >
              <Icon className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>{item.text}</span>
              <span className="text-[#F59E0B]/40 mr-4 font-mono">•</span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
