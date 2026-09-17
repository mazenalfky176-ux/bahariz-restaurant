import React, { useState, useEffect } from 'react';
import { BaharizLogo } from './BaharizLogo';
import {
  ShoppingBag,
  Phone,
  Menu as MenuIcon,
  X,
  MapPin,
  ChevronLeft,
  ChefHat,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenQuickBranch: () => void;
  onOpenKitchenMonitor?: () => void;
  activeOrder?: Order | null;
  onViewActiveOrder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenQuickBranch,
  onOpenKitchenMonitor,
  activeOrder,
  onViewActiveOrder,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'عن بهاريز', href: '#about' },
    { label: 'الأكثر طلباً', href: '#featured' },
    { label: 'المنيو', href: '#menu' },
    { label: 'الفروع', href: '#branches' },
    { label: 'تواصل معنا', href: '#footer' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E0E11]/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-white/5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center"
          >
            <BaharizLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#151518]/70 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10 shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions: Kitchen Monitor, Active Order, Cart & CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Kitchen Orders Screen Trigger ("تسمع عندهم") */}
            {onOpenKitchenMonitor && (
              <button
                onClick={onOpenKitchenMonitor}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group shadow-sm"
                title="فتح شاشة متابعة طلبات الفرع والمطبخ (Live)"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
                <span className="hidden sm:inline">شاشة استقبال الفرع</span>
                <span className="sm:hidden text-[11px]">الفرع Live</span>
              </button>
            )}

            {/* Active Order Pill Trigger */}
            {activeOrder && onViewActiveOrder && (
              <button
                onClick={onViewActiveOrder}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  activeOrder.status === 'cancelled'
                    ? 'bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20'
                    : 'bg-amber-500/10 text-[#F59E0B] border-amber-500/30 hover:bg-amber-500/20'
                }`}
              >
                {activeOrder.status === 'cancelled' ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
                <span>طلبك #{activeOrder.orderNumber}</span>
              </button>
            )}

            {/* Quick Branch button */}
            <button
              onClick={onOpenQuickBranch}
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-neutral-300 bg-[#1A1A1E] border border-white/10 hover:border-[#F59E0B]/50 hover:text-[#F59E0B] transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>6 فروع</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="سلة الطلبات"
              className="relative p-2.5 rounded-full bg-[#1A1A1E] border border-white/10 hover:border-[#F59E0B]/60 text-white hover:text-[#F59E0B] transition-all duration-200 cursor-pointer group shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-black font-black text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-[0_0_10px_rgba(245,158,11,0.7)] animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* CTA Order Now */}
            <button
              onClick={() => handleNavClick('#menu')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>اطلب الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-[#1A1A1E] border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs text-neutral-400 font-medium">قائمة التنقل</span>
              <span className="text-xs text-[#F59E0B] font-bold">بهاريز | ملوك السوري</span>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-right py-3.5 px-4 rounded-xl text-lg font-bold text-neutral-200 hover:text-[#F59E0B] hover:bg-white/5 flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ChevronLeft className="w-5 h-5 text-neutral-500" />
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            {activeOrder && onViewActiveOrder && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onViewActiveOrder();
                }}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm border cursor-pointer ${
                  activeOrder.status === 'cancelled'
                    ? 'bg-red-500/10 text-red-300 border-red-500/30'
                    : 'bg-amber-500/10 text-[#F59E0B] border-amber-500/30'
                }`}
              >
                {activeOrder.status === 'cancelled' ? (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
                <span>متابعة أو إلغاء الطلب #{activeOrder.orderNumber}</span>
              </button>
            )}

            {onOpenKitchenMonitor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKitchenMonitor();
                }}
                className="w-full py-3 rounded-xl font-bold bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>شاشة استقبال طلبات الفرع والمطبخ (Live)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('#menu');
              }}
              className="w-full py-3.5 rounded-xl font-bold bg-[#F59E0B] text-black text-center text-base shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            >
              تصفح المنيو واطلب
            </button>

            <a
              href="#menu"
              className="w-full py-3 rounded-xl font-medium bg-[#1A1A1E] border border-white/10 text-white flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span>بيانات الدليفري متاحة عند النشر</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
