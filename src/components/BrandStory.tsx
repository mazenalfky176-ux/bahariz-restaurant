import React from 'react';
import kitchenAmbianceImg from '../assets/images/ambiance_kitchen_1789477245882.jpg';
import { Sparkles, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#0D0D10] overflow-hidden border-t border-white/5">
      {/* Background Accent Gradients */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-right max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / حكاية الملوك</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
            "في بهاريز، إحنا مش بنقدم أكلة وبس...{' '}
            <span className="text-[#F59E0B]">إحنا بنقدم طعم له شخصية ومزاج."</span>
          </h2>
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with frame */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                src={kitchenAmbianceImg}
                alt="كواليس مطبخ بهاريز"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quote Stamp */}
              <div className="absolute bottom-6 right-6 left-6 p-5 rounded-2xl bg-[#141418]/90 backdrop-blur-md border border-white/10">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-medium">
                  "كل رول سوري بيخرج من عندنا متقمر بحساب، والجبنة سايحة في توقيتها الصح.. علشان اللقمة الأولى تكون بمليون حكاية."
                </p>
                <div className="mt-2 text-xs font-bold text-[#F59E0B]">
                  — فريق طهاة بهاريز
                </div>
              </div>
            </div>

            {/* Decorative Golden Corner */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 border-l-2 border-b-2 border-[#F59E0B]/40 rounded-bl-3xl pointer-events-none hidden sm:block" />
          </div>

          {/* Right Column: Narrative Copy & Brand Pillars */}
          <div className="lg:col-span-6 text-right space-y-8 order-1 lg:order-2">
            <div className="space-y-5 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p>
                بدأت قصة <strong className="text-white font-bold">بهاريز</strong> من شغف حقيقي بالأكل السوري الأصلي وجمال العيش الصاج لما يلمس النار وياخد لون التقميرة المقرمشة. مكناش عاوزين نعمل مطعم عادي، كنا عاوزين نعمل عنوان للمزاج.
              </p>
              <p>
                عشان كده طورنا خلطات تتبيل خاصة جداً للفراخ واللحوم، وابتكرنا <span className="text-[#F59E0B] font-bold">سرفيس السطلانة</span> الشهير اللي بيجمع حلاوة الرولز السوري مع طبقات الجبنة الموتزاريلا الذائبة والتسوية المظبوطة على أصولها.
              </p>
            </div>

            {/* 3 Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#151518] border border-white/10 hover:border-[#F59E0B]/30 transition-colors text-right">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F59E0B] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-white mb-1">خامات 100% طازجة</div>
                <div className="text-xs text-neutral-400">لحوم ودواجن بلدي بتتبيلة يومية طازة</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#151518] border border-white/10 hover:border-[#F59E0B]/30 transition-colors text-right">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F59E0B] mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-white mb-1">سرعة في التحضير</div>
                <div className="text-xs text-neutral-400">طلبك بيوصل سخن ومقرمش في أسرع وقت</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#151518] border border-white/10 hover:border-[#F59E0B]/30 transition-colors text-right">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F59E0B] mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-base font-bold text-white mb-1">كرم في اللقمة</div>
                <div className="text-xs text-neutral-400">سندوتشات مليانة ومحشية للآخر</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
