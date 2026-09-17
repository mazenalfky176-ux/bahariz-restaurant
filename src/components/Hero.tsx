import React from 'react';
import { HERO_ASSETS } from '../data/menuData';
import { ArrowDownLeft, Flame, Sparkles, PhoneCall, ChevronLeft, Award } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCart: () => void;
  onSelectBranches: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenCart,
  onSelectBranches,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-noise"
    >
      {/* Cinematic Golden Amber Radial Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#F59E0B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Hero Content (Arabic RTL) */}
          <div className="lg:col-span-7 text-right flex flex-col items-start lg:items-start">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1A1E]/90 border border-[#F59E0B]/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#F59E0B] animate-ping" />
              <span className="text-xs sm:text-sm font-bold text-[#F59E0B] tracking-wide">
                👑 بهاريز • ملوك السوري في مصر
              </span>
              <span className="text-neutral-500 text-xs">|</span>
              <span className="text-neutral-300 text-xs font-medium">منيو جديد 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.15] tracking-tight mb-6">
              طعم ليه <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]">مـزاج</span>
              <br />
              وحكاية سوري صح!
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-8 font-normal">
              في <strong className="text-white font-bold">بهاريز</strong>، الشاورما مش مجرد ساندوتش.. دي لفّة صاج مقمر على الجريل، مع تتبيلتنا السرية، غرقانة بالثومية والموتزاريلا، وسرفيس <span className="text-[#F59E0B] font-bold">السطلانة</span> الأسطوري اللي مكسّر الدنيا.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreMenu}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-black text-base bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
              >
                <span>شوف المنيو والأسعار</span>
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCart}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-base bg-[#18181C] hover:bg-[#202026] text-white border border-white/15 hover:border-[#F59E0B]/50 transition-all cursor-pointer"
              >
                <span>اطلب أونلاين</span>
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              </button>

              <button
                onClick={onSelectBranches}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>أرقام دليفري الفروع</span>
              </button>
            </div>

            {/* Key Value Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-10 mt-8 border-t border-white/10 w-full max-w-xl">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-white font-heading">
                  6 <span className="text-[#F59E0B]">فروع</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 mt-0.5">جاهزين لخدمتكم</div>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-white font-heading">
                  100% <span className="text-[#F59E0B]">بلدي</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 mt-0.5">فراخ ولحوم طازجة</div>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-white font-heading">
                  80 <span className="text-[#F59E0B]">ج.م</span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 mt-0.5">سندوتش بهاريز الملكي</div>
              </div>
            </div>

          </div>

          {/* Left Column: Visual Cinematic Food Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Main Stage Frame */}
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#141417] shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
              
              <img
                src={HERO_ASSETS.heroShawarma}
                alt="شاورما بهاريز السوري"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
              />

              {/* Dark subtle gradient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* In-Frame Brand Caption */}
              <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between z-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#F59E0B] mb-1">
                    <Flame className="w-3.5 h-3.5" />
                    شاورما فراخ سوري أصلية
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-white">
                    عيش صاج مقمر بالثومية
                  </div>
                </div>
                <div className="bg-[#F59E0B] text-black px-3.5 py-1.5 rounded-full font-black text-base shadow-lg">
                  40 ج.م
                </div>
              </div>
            </div>

            {/* Floating Card 1: Sattalana (Top Left) */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 bg-[#1A1A1E]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15 shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-float-slow z-20">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/30">
                <img
                  src={HERO_ASSETS.sattalanaDish}
                  alt="سطلانة بهاريز"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-[#F59E0B] flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>سطلانة بهاريز</span>
                </div>
                <div className="text-sm font-bold text-white">شاورما فراخ وموتزاريلا</div>
                <div className="text-xs font-extrabold text-amber-300">58 ج.م فقط</div>
              </div>
            </div>

            {/* Floating Card 2: Bahariz Special 80 EGP (Bottom Right) */}
            <div
              onClick={onExploreMenu}
              className="cursor-pointer absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-[#1A1A1E]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#F59E0B]/40 shadow-[0_15px_35px_rgba(245,158,11,0.2)] flex items-center gap-3 z-20 hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#F59E0B]">
                <img
                  src={HERO_ASSETS.baharizSpecial}
                  alt="سندوتش بهاريز مكس"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <div className="inline-block px-1.5 py-0.5 rounded text-[10px] font-black bg-[#F59E0B] text-black">
                  النجم الأكبر 👑
                </div>
                <div className="text-sm font-bold text-white">سندوتش بهاريز مكس</div>
                <div className="text-xs font-semibold text-neutral-400">لحوم وفراخ • 80 ج.م</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
