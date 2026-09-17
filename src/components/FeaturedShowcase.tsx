import React, { useState } from 'react';
import { MenuItem } from '../types';
import { HERO_ASSETS } from '../data/menuData';
import { Sparkles, Plus, Check, Flame, Award, ChevronLeft } from 'lucide-react';

interface FeaturedShowcaseProps {
  onAddToCart: (item: MenuItem) => void;
}

interface ShowcaseItem {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  categoryName: string;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  badge: string;
  menuItemId: string;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ onAddToCart }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'showcase-1',
      num: '01',
      name: 'سطلانة بهاريز شاورما فراخ',
      subtitle: 'صينية الرولز السوري الغرقانة',
      categoryName: 'سطلانه فرخ',
      price: 58,
      description: 'سرفيس سوري ملكي مقطع رولز محشوة شاورما صدور دجاج طازجة، مغطاة بطبقة وفيرة من الموتزاريلا الذائبة ومحمرة في الفرن مع رشة بهارات خاصة.',
      ingredients: ['عيش صاج مقرمش', 'شاورما دجاج متبل', 'جبنة موتزاريلا سايحة', 'ثومية أصلية', 'فلفل ألوان مشوي'],
      image: HERO_ASSETS.sattalanaDish,
      badge: 'الأعلى طلباً 👑',
      menuItemId: 'sat-ch-1',
    },
    {
      id: 'showcase-2',
      num: '02',
      name: 'سندوتش بهاريز مكس لحوم وفراخ',
      subtitle: 'نجم المنيو والأضخم على الإطلاق',
      categoryName: 'مكسات بهاريز',
      price: 80,
      description: 'السندوتش الأسطوري من بهاريز! يجمع شاورما الفراخ، استربس الدجاج الكرسبي، السجق البلدي، الكفتة المشوية، ومكس أجبان صوص شيدر وموتزاريلا.',
      ingredients: ['شاورما فراخ', 'استربس كرسبي', 'سجق بلدي', 'كفتة حاتي', 'مكس جبن ودوبل ثومية'],
      image: HERO_ASSETS.baharizSpecial,
      badge: 'النجم الحصري 80 ج',
      menuItemId: 'mix-4',
    },
    {
      id: 'showcase-3',
      num: '03',
      name: 'شاورما فراخ سوري بالثومية',
      subtitle: 'الكلاسيكو السوري بالمزاج الصح',
      categoryName: 'قسم الفراخ',
      price: 40,
      description: 'شرائح صدور الدجاج المتبلة بتتبيلتنا السورية الأصيلة، ملفوفة في عيش صاج محمص على الصاج مع ثومية بهاريز الناعمة والخيار المخلل المقرمش.',
      ingredients: ['صدور دجاج متبلة', 'عيش صاج سوري', 'ثومية كريمية', 'مخلل خيار', 'تحميص على الجريل'],
      image: HERO_ASSETS.heroShawarma,
      badge: 'كلاسيك بهاريز',
      menuItemId: 'ch-1',
    },
    {
      id: 'showcase-4',
      num: '04',
      name: 'بطاطس سوري موزاريلا مكس جبن',
      subtitle: 'قرمشة ومطة جبنة ملهاش حل',
      categoryName: 'قسم متنوعات',
      price: 25,
      description: 'أصابع بطاطس فريسكاس ذهبية محمصة ملفوفة مع تشكيلة ثلاثية من الموتزاريلا والشيدر والرومي وصوص الثومية الفاخر.',
      ingredients: ['بطاطس مقلية ذهبية', 'موتزاريلا سايحة', 'مكس شيدر ورومي', 'ثومية بهاريز', 'توابل فريسكاس'],
      image: HERO_ASSETS.cheesyFries,
      badge: 'عشاق المطة',
      menuItemId: 'var-3',
    },
  ];

  const current = showcaseItems[activeIdx];

  const handleAdd = (item: ShowcaseItem) => {
    const menuItem: MenuItem = {
      id: item.menuItemId,
      name: item.name,
      category: 'bahariz_mixes',
      price: item.price,
      description: item.description,
      image: item.image,
      badge: item.badge,
    };
    onAddToCart(menuItem);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="featured" className="py-24 sm:py-32 relative bg-[#09090B] overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute left-1/4 top-1/3 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>02 / الأكثر طلباً</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              أطباق بنعملها <span className="text-[#F59E0B]">بمـزاج عالي</span> كل يوم
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              اخترنا لك الأطباق اللي علّمت مع زباين بهاريز وحققت أعلى تقييمات في كل الفروع.
            </p>
          </div>

          {/* Selector Tabs (Numbered buttons like reference video) */}
          <div className="flex items-center gap-2 bg-[#141418] p-1.5 rounded-full border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            {showcaseItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeIdx === idx
                    ? 'bg-[#F59E0B] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.num}</span>
                <span className="hidden sm:inline">{item.categoryName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Big Showcase Box */}
        <div className="bg-[#121216] rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Frame */}
            <div className="lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={current.image}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-[#F59E0B] text-black font-black text-xs px-3 py-1 rounded-full shadow-lg">
                  {current.badge}
                </div>

                {/* Number Watermark */}
                <div className="absolute bottom-3 left-4 text-6xl font-black text-white/10 font-heading select-none pointer-events-none">
                  {current.num}
                </div>
              </div>
            </div>

            {/* Content & Details */}
            <div className="lg:col-span-6 text-right space-y-6 order-1 lg:order-2">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block">
                  {current.subtitle}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-snug">
                  {current.name}
                </h3>
              </div>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Ingredients Pills */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-neutral-400 block">
                  مكونات الطبق:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#1A1A20] text-neutral-300 border border-white/5"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">السعر</span>
                  <div className="text-3xl font-black text-[#F59E0B] font-heading">
                    {current.price} <span className="text-sm font-bold text-white">ج.م</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(current)}
                  className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all cursor-pointer ${
                    addedId === current.id
                      ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'bg-[#F59E0B] hover:bg-[#FBBF24] text-black shadow-[0_10px_25px_rgba(245,158,11,0.35)] active:scale-95'
                  }`}
                >
                  {addedId === current.id ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>تمت الإضافة للطلب!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>أضف هذا الطبق للطلب</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
