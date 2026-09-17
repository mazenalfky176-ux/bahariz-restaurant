import React, { useState, useMemo, useEffect } from 'react';
import { MenuItem, CartItem, Branch, Order } from './types';
import { BRANCHES_DATA } from './data/menuData';
import { orderService } from './services/orderService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerMarquee } from './components/TickerMarquee';
import { BrandStory } from './components/BrandStory';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { MenuSection } from './components/MenuSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BranchesSection } from './components/BranchesSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CancelOrderModal } from './components/CancelOrderModal';
import { OrderDetailsModal } from './components/OrderDetailsModal';
import { BranchKitchenMonitorModal } from './components/BranchKitchenMonitorModal';
import { ActiveOrderBanner } from './components/ActiveOrderBanner';
import { MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES_DATA[0].id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Order lifecycle & cancellation state
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isKitchenMonitorOpen, setIsKitchenMonitorOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // Initialize and subscribe to orderService
  useEffect(() => {
    setActiveOrder(orderService.getActiveOrder());

    const unsubscribe = orderService.subscribe(() => {
      const current = orderService.getActiveOrder();
      setActiveOrder(current);
    });

    return () => unsubscribe();
  }, []);

  // Cart counts by ID for instant badges
  const cartItemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    cart.forEach((c) => {
      counts[c.item.id] = c.quantity;
    });
    return counts;
  }, [cart]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`تمت إضافة ${item.name} إلى السلة!`);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddQuickExtra = (item: MenuItem) => {
    handleAddToCart(item);
  };

  const handleSelectBranchForOrder = (branch: Branch) => {
    setSelectedBranchId(branch.id);
    setIsCartOpen(true);
    showToast(`تم تحديد ${branch.name} للطلب والتوصيل`);
  };

  const handleOrderCreated = (order: Order) => {
    setActiveOrder(order);
    setIsBannerDismissed(false);
    showToast(`تم تسجيل طلبك #${order.orderNumber} وإرساله للمطبخ بنجاح!`);
  };

  const handleOpenCancelModal = (order: Order) => {
    setOrderToCancel(order);
    setIsCancelModalOpen(true);
  };

  const handleOrderCancelled = (cancelled: Order) => {
    setActiveOrder(cancelled);
    showToast(`تم تأكيد إلغاء الطلب #${cancelled.orderNumber} وإبلاغ الفرع.`);
  };

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col selection:bg-[#F59E0B] selection:text-black font-sans relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#F59E0B] text-black font-black text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuickBranch={() => handleScrollTo('#branches')}
        onOpenKitchenMonitor={() => setIsKitchenMonitorOpen(true)}
        activeOrder={activeOrder}
        onViewActiveOrder={() => setIsOrderDetailsOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => handleScrollTo('#menu')}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectBranches={() => handleScrollTo('#branches')}
        />

        {/* Continuous Ticker Ribbon */}
        <TickerMarquee />

        {/* Brand Story / About */}
        <BrandStory />

        {/* Featured Showcase (01, 02, 03, 04) */}
        <FeaturedShowcase onAddToCart={handleAddToCart} />

        {/* Full Digital Interactive Menu */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemCounts={cartItemCounts}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Real Branches & Hotlines */}
        <BranchesSection onSelectBranchForOrder={handleSelectBranchForOrder} />
      </main>

      {/* Website Footer */}
      <Footer
        onScrollTo={handleScrollTo}
        onOpenKitchenMonitor={() => setIsKitchenMonitorOpen(true)}
        onViewActiveOrder={activeOrder ? () => setIsOrderDetailsOpen(true) : undefined}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddQuickExtra={handleAddQuickExtra}
        selectedBranchId={selectedBranchId}
        onSelectBranchId={setSelectedBranchId}
        onOrderCreated={handleOrderCreated}
        onRequestCancelOrder={handleOpenCancelModal}
      />

      {/* Cancel Order Confirmation Modal */}
      <CancelOrderModal
        order={orderToCancel || activeOrder}
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setOrderToCancel(null);
        }}
        onOrderCancelled={handleOrderCancelled}
      />

      {/* Order Details & Tracking Modal */}
      <OrderDetailsModal
        order={activeOrder}
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        onRequestCancel={handleOpenCancelModal}
      />

      {/* Branch & Kitchen Live Orders Screen Modal ("شاشة الفرع واستقبال الطلبات") */}
      <BranchKitchenMonitorModal
        isOpen={isKitchenMonitorOpen}
        onClose={() => setIsKitchenMonitorOpen(false)}
        onRequestCancelOrder={handleOpenCancelModal}
      />

      {/* Floating Active Order Banner (with 1-click Cancel) */}
      {!isBannerDismissed && activeOrder && (
        <ActiveOrderBanner
          order={activeOrder}
          onViewDetails={() => setIsOrderDetailsOpen(true)}
          onCancelOrder={() => handleOpenCancelModal(activeOrder)}
          onDismiss={() => setIsBannerDismissed(true)}
        />
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-3">
        {/* WhatsApp Quick Chat */}
        <a
          href="#menu"
          target="_blank"
          rel="noreferrer"
          aria-label="تواصل واتساب"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          title="اطلب عبر واتساب"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Mobile Floating Cart Trigger when items in cart */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-13 h-13 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-[0_8px_25px_rgba(245,158,11,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer relative md:hidden"
            aria-label="فتح السلة"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-black text-[#F59E0B] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border border-[#F59E0B]">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>

    </div>
  );
}
