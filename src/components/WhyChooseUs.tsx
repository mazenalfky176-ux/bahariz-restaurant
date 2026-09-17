import React from 'react';
import { Flame, Sparkles, Clock, ShieldCheck, MapPin, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: Flame,
      title: 'طعم سوري بمزاج عالي',
      description: 'تتبيلة سورية خاصة جداً مع عيش صاج محمص على الجريل لتستمتع بأصالة النكهة في كل لقمة.',
      stat: '100%',
      statLabel: 'نكهة أصلية',
    },
    {
      icon: ShieldCheck,
      title: 'خامات بلدي طازة يومياً',
      description: 'نستخدم أفضل قطعيات الفراخ واللحوم الطازجة والجبن الطبيعي بدون أي إضافات مصنعة.',
      stat: 'أعلى',
      statLabel: 'معايير جودة',
    },
    {
      icon: Clock,
      title: 'سرعة قياسية في التحضير',
      description: 'طاقم طهاة محترف يضمن تجهيز طلبك وتسليمه ساخناً مقرمشاً في أسرع وقت ممكن.',
      stat: '30-45',
      statLabel: 'دقيقة دليفري',
    },
    {
      icon: MapPin,
      title: '6 فروع لخدمتكم',
      description: 'انتشار مدروس في دمنهور، كفر الدوار، وأبو المطامير لتوصيل وجباتكم المفضلة أينما كنتم.',
      stat: '6',
      statLabel: 'فروع دليفري وصالة',
    },
  ];

  return (
    <section className="py-24 relative bg-[#09090C] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>04 / تجربة بهاريز</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            ليه زبايننا بيختاروا <span className="text-[#F59E0B]">بهاريز؟</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            معايير صارمة في الجودة والنظافة والسرعة عشان تكون كل زيارة تجربة لا تُنسى.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#121216] border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 text-right group flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F59E0B] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#F59E0B] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-[#F59E0B] font-heading">{item.stat}</span>
                  <span className="text-xs font-semibold text-neutral-400">{item.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
