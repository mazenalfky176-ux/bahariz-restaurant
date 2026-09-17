import React from 'react';
import { BaharizLogo } from './BaharizLogo';
import { BRANCHES_DATA } from '../data/menuData';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Send,
  Heart,
  ChevronLeft,
} from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenKitchenMonitor?: () => void;
  onViewActiveOrder?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollTo,
  onOpenKitchenMonitor,
  onViewActiveOrder,
}) => {
  return (
    <footer id="footer" className="bg-[#08080A] text-neutral-400 border-t border-white/10 pt-20 pb-12 relative overflow-hidden text-right">
      
      {/* Decorative subtle background ambient light */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <BaharizLogo size="lg" />
            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              بهاريز - ملوك السوري في مصر. أشهى ساندوتشات الصاج المقرمشة، سطلانة بهاريز الغرقانة بالجبن والموتزاريلا، والمكسات الملكية بأعلى جودة تتبيل.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="صفحتنا على فيسبوك"
                className="w-10 h-10 rounded-full bg-[#15151A] border border-white/10 hover:border-[#F59E0B] text-neutral-300 hover:text-[#F59E0B] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="صفحتنا على انستغرام"
                className="w-10 h-10 rounded-full bg-[#15151A] border border-white/10 hover:border-[#F59E0B] text-neutral-300 hover:text-[#F59E0B] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#menu"
                target="_blank"
                rel="noreferrer"
                aria-label="تواصل واتساب"
                className="w-10 h-10 rounded-full bg-[#15151A] border border-white/10 hover:border-emerald-500 text-neutral-300 hover:text-emerald-400 flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onScrollTo('#hero')}
                  className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>الرئيسية</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('#about')}
                  className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>عن بهاريز وحكايتنا</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('#featured')}
                  className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>الأطباق الأكثر طلباً</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('#menu')}
                  className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>المنيو الكامل والأسعار</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('#branches')}
                  className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>أرقام وعناوين الفروع</span>
                </button>
              </li>
              {onViewActiveOrder && (
                <li>
                  <button
                    onClick={onViewActiveOrder}
                    className="hover:text-amber-400 text-amber-300/90 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                    <span>تتبع أو إلغاء الطلب الحالي</span>
                  </button>
                </li>
              )}
              {onOpenKitchenMonitor && (
                <li>
                  <button
                    onClick={onOpenKitchenMonitor}
                    className="hover:text-emerald-400 text-emerald-400/90 flex items-center gap-1.5 transition-colors cursor-pointer font-bold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-emerald-400" />
                    <span>شاشة استلام وإدارة طلبات الفرع (Live)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Branches Hotlines */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              أرقام دليفري الفروع المباشرة
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {BRANCHES_DATA.map((b) => (
                <div
                  key={b.id}
                  className="p-2.5 rounded-xl bg-[#121217] border border-white/5 space-y-1"
                >
                  <div className="font-bold text-white">{b.name}</div>
                  {b.phone ? (
                    <a
                      href={`tel:${b.phone}`}
                      className="text-[#F59E0B] font-mono font-bold flex items-center gap-1 hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{b.phone}</span>
                    </a>
                  ) : (
                    <span className="text-neutral-500">صالة واستلام بالمجمع</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright & Signoff */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 BAHARIZ بهاريز - جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <span>صُنع بحب ومزاج لملوك الأكل السوري</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
