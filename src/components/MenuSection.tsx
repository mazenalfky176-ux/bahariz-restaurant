import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import {
  Search,
  Plus,
  Check,
  Flame,
  Star,
  Sparkles,
  SlidersHorizontal,
  X,
  Info,
} from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemCounts: Record<string, number>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  cartItemCounts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search query
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Special tags filter
      let matchesTag = true;
      if (selectedTag === 'popular') matchesTag = !!item.isPopular;
      if (selectedTag === 'signature') matchesTag = !!item.isSignature;
      if (selectedTag === 'spicy') matchesTag = !!item.isSpicy;

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  const handleAddItem = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <section id="menu" className="py-24 sm:py-32 relative bg-[#0B0B0E] border-t border-white/5">
      
      {/* Subtle background glow */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / منيو بهاريز الرسمي</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            قائمة الطعام <span className="text-[#F59E0B]">بالأسعار الرسمية</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            تصفح جميع أصناف الفراخ، اللحوم، سطلانة بهاريز الخاصة، والمكسات السورية واطلب طازة الآن.
          </p>
        </div>

        {/* Search & Quick Tag Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن ساندوتش، سطلانة، أو صوص..."
              className="w-full pr-11 pl-10 py-3 rounded-full bg-[#151519] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#F59E0B] transition-colors text-right"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setSelectedTag(selectedTag === 'popular' ? null : 'popular')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedTag === 'popular'
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                  : 'bg-[#151519] text-neutral-300 border-white/10 hover:border-amber-500/40'
              }`}
            >
              <Star className="w-3 h-3" />
              <span>الأكثر مبيعاً</span>
            </button>

            <button
              onClick={() => setSelectedTag(selectedTag === 'signature' ? null : 'signature')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedTag === 'signature'
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                  : 'bg-[#151519] text-neutral-300 border-white/10 hover:border-amber-500/40'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>توقيع بهاريز</span>
            </button>

            <button
              onClick={() => setSelectedTag(selectedTag === 'spicy' ? null : 'spicy')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedTag === 'spicy'
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-[#151519] text-neutral-300 border-white/10 hover:border-red-500/40'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>سبايسي حار</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Scrollable horizontally on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#F59E0B] text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                    : 'bg-[#151519] text-neutral-300 border border-white/10 hover:bg-[#1C1C22] hover:text-white'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#121216] rounded-3xl border border-white/5">
            <SlidersHorizontal className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <div className="text-lg font-bold text-white mb-1">لا توجد أصناف مطابقة للبحث</div>
            <p className="text-sm text-neutral-400">جرب البحث بكلمة أخرى أو اختر تصنيفاً مختلفاً.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold bg-[#F59E0B] text-black"
            >
              عرض كامل المنيو
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const inCartCount = cartItemCounts[item.id] || 0;
              const isJustAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-[#131317] rounded-2xl border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg hover:-translate-y-1"
                >
                  {/* Top Image & Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-transparent to-black/30 pointer-events-none" />

                    {/* Tag / Badge */}
                    {item.badge && (
                      <div className="absolute top-3 right-3 bg-[#F59E0B] text-black font-black text-[11px] px-2.5 py-0.5 rounded-md shadow-md">
                        {item.badge}
                      </div>
                    )}

                    {/* Spicy Badge */}
                    {item.isSpicy && !item.badge && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>سبايسي</span>
                      </div>
                    )}

                    {/* Quick Info Button */}
                    <button
                      onClick={() => setActiveItemModal(item)}
                      aria-label="تفاصيل الصنف"
                      className="absolute top-3 left-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-right">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 block font-medium">السعر</span>
                        <div className="text-xl font-black text-[#F59E0B] font-heading">
                          {item.price} <span className="text-xs font-bold text-neutral-300">ج.م</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {inCartCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[#F59E0B] text-xs font-black border border-amber-500/30">
                            {inCartCount} بالطلب
                          </span>
                        )}

                        <button
                          onClick={() => handleAddItem(item)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[#1D1D22] hover:bg-[#F59E0B] text-white hover:text-black border border-white/10 active:scale-95'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>تم</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>أضف للطلب</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Detail Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#151519] border border-white/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-right">
            
            <button
              onClick={() => setActiveItemModal(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-black/60 text-white hover:bg-black z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full">
              <img
                src={activeItemModal.image}
                alt={activeItemModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151519] via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-white">
                  {activeItemModal.name}
                </div>
                <div className="text-2xl font-black text-[#F59E0B]">
                  {activeItemModal.price} <span className="text-sm text-white">ج.م</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeItemModal.description}
              </p>

              <div className="bg-[#1A1A20] p-4 rounded-2xl border border-white/5 space-y-2">
                <span className="text-xs font-bold text-neutral-300 block">إضافات مقترحة:</span>
                <div className="text-xs text-neutral-400 space-y-1">
                  <div>• ثومية أصلية بـ 5 ج.م</div>
                  <div>• جبنة موتزاريلا إكسترا بـ 5 ج.م</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleAddItem(activeItemModal);
                    setActiveItemModal(null);
                  }}
                  className="w-full py-3.5 rounded-xl font-bold bg-[#F59E0B] hover:bg-[#FBBF24] text-black text-center shadow-lg transition-colors cursor-pointer"
                >
                  أضف إلى سلة الطلبات ({activeItemModal.price} ج.م)
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
