import React, { useState } from 'react';
import { CartItem, Branch, MenuItem, Order } from '../types';
import { BRANCHES_DATA, MENU_ITEMS } from '../data/menuData';
import { orderService } from '../services/orderService';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onAddQuickExtra: (item: MenuItem) => void;
  selectedBranchId: string;
  onSelectBranchId: (id: string) => void;
  onOrderCreated?: (order: Order) => void;
  onRequestCancelOrder?: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddQuickExtra,
  selectedBranchId,
  onSelectBranchId,
  onOrderCreated,
  onRequestCancelOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal + deliveryFee;

  const selectedBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  // Up-sell extras from the real menu (ثومية 5 ج.م، موزاريلا 5 ج.م)
  const toumItem = MENU_ITEMS.find((m) => m.id === 'ext-1');
  const mozzaItem = MENU_ITEMS.find((m) => m.id === 'ext-2');

  const validateForm = () => {
    const errors: { name?: string; phone?: string; address?: string } = {};
    if (!customerName.trim()) errors.name = 'يرجى إدخال اسمك الكريم';
    if (!phoneNumber.trim() || phoneNumber.length < 10) errors.phone = 'يرجى إدخال رقم موبايل صحيح للتواصل';
    if (!deliveryAddress.trim()) errors.address = 'يرجى إدخال عنوان التوصيل بالتفصيل';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    if (!validateForm()) return;

    const created = orderService.createOrder({
      customerName,
      phoneNumber,
      branch: selectedBranch,
      deliveryAddress,
      notes,
      items: [...cart],
      subtotal,
      deliveryFee,
      total: grandTotal,
    });

    setOrderConfirmed(created);
    if (onOrderCreated) {
      onOrderCreated(created);
    }

    const itemsSummary = cart
      .map(
        (c) =>
          `• ${c.item.name} × ${c.quantity} = ${c.item.price * c.quantity} ج.م`
      )
      .join('\n');

    const msg = `👑 *طلب جديد من موقع بهاريز الرسمي* 👑
---------------------------------
رقم الطلب: *#${created.orderNumber}*
👤 *الاسم:* ${customerName}
📱 *الموبايل:* ${phoneNumber}
📍 *الفرع المختار:* ${selectedBranch.name}
🏠 *العنوان:* ${deliveryAddress}
📝 *ملاحظات:* ${notes || 'لا يوجد'}
---------------------------------
🍔 *تفاصيل الطلب:*
${itemsSummary}
---------------------------------
💰 *المجموع الفرعي:* ${subtotal} ج.م
🛵 *خدمة التوصيل:* ${deliveryFee} ج.م
⭐ *الإجمالي النهائي:* ${grandTotal} ج.م
---------------------------------
يرجى تأكيد استلام الطلب وتحديد الوقت التقريبي للوصول. شكراً لكم!`;

    const branchPhoneClean = selectedBranch.phone ? selectedBranch.phone.replace(/^0/, '20') : '';
    const encodedUrl = `https://wa.me/${branchPhoneClean}?text=${encodeURIComponent(msg)}`;
    window.open(encodedUrl, '_blank');
    onClearCart();
  };

  const handleDirectCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const created = orderService.createOrder({
      customerName,
      phoneNumber,
      branch: selectedBranch,
      deliveryAddress,
      notes,
      items: [...cart],
      subtotal,
      deliveryFee,
      total: grandTotal,
    });

    setOrderConfirmed(created);
    if (onOrderCreated) {
      onOrderCreated(created);
    }
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#111115] border-r border-white/10 shadow-2xl flex flex-col justify-between text-right text-white">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#15151A]">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                aria-label="إغلاق السلة"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
                  <span>سلة الطلبات</span>
                </h2>
                <span className="text-xs text-neutral-400">
                  {cart.length} أصناف في السلة
                </span>
              </div>
            </div>

            {cart.length > 0 && !orderConfirmed && (
              <button
                onClick={onClearCart}
                className="text-xs font-semibold text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>تفريغ السلة</span>
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {orderConfirmed ? (
              /* Success Confirmation Screen */
              <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black text-[#F59E0B] uppercase">تم استلام طلبك بنجاح!</span>
                  <h3 className="text-2xl font-black text-white">
                    طلب رقم #{orderConfirmed.orderNumber}
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                    شكراً لك يا {orderConfirmed.customerName}! يتم الآن تجهيز طلبك في <strong className="text-white">{orderConfirmed.branchName}</strong>.
                  </p>
                </div>

                <div className="bg-[#17171D] p-4 rounded-2xl border border-white/10 text-right space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>حالة الطلب:</span>
                    <span className={`font-bold ${orderConfirmed.status === 'cancelled' ? 'text-red-400' : 'text-[#F59E0B]'}`}>
                      {orderConfirmed.statusTextArabic}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>الوقت المتوقع لوصول الدليفري:</span>
                    <span className="font-bold text-emerald-400">{orderConfirmed.estTime}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>العنوان:</span>
                    <span className="font-medium text-white">{orderConfirmed.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs">
                    <span>الإجمالي عند الاستلام:</span>
                    <span className="font-black text-[#F59E0B] text-base">{orderConfirmed.total} ج.م</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 text-xs pt-2 border-t border-white/5">
                    <span>رقم دليفري الفرع للمتابعة:</span>
                    <a href={`tel:${orderConfirmed.branchPhone}`} className="font-bold text-[#F59E0B] hover:underline font-mono">
                      {orderConfirmed.branchPhone}
                    </a>
                  </div>
                </div>

                {/* Cancel Order Action */}
                {orderConfirmed.status !== 'cancelled' ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onRequestCancelOrder) {
                          onRequestCancelOrder(orderConfirmed);
                        }
                      }}
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span>إلغاء هذا الطلب (إخطار الفرع فوراً)</span>
                    </button>
                    <p className="text-[11px] text-neutral-400">
                      يمكنك إلغاء الطلب وسيقوم السيستم بإصدار تنبيه صوتي لمطبخ الفرع لوقف التجهيز فوراً.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
                    تم إلغاء هذا الطلب بنجاح وإخطار طاقم الفرع.
                  </div>
                )}

                <button
                  onClick={() => {
                    setOrderConfirmed(null);
                    onClose();
                  }}
                  className="w-full py-3.5 rounded-xl font-bold bg-[#F59E0B] text-black text-center shadow-lg cursor-pointer"
                >
                  العودة للرئيسية وتصفح المنيو
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart Screen */
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-500 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-lg font-bold text-white">سلة الطلبات فارغة</div>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  تصفح أشهى ساندوتشات بهاريز والسطلانة وأضف وجبتك المفضلة الآن.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#F59E0B] text-black shadow-md cursor-pointer"
                >
                  تصفح المنيو الآن
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-neutral-400 block">الأصناف المحددة:</span>
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="bg-[#17171D] p-3.5 rounded-2xl border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                        <div className="text-right">
                          <h4 className="text-sm font-bold text-white leading-tight">
                            {cartItem.item.name}
                          </h4>
                          <div className="text-xs font-black text-[#F59E0B] font-heading mt-1">
                            {cartItem.item.price * cartItem.quantity} ج.م
                            <span className="text-[10px] text-neutral-400 font-normal mr-1">
                              ({cartItem.item.price} × {cartItem.quantity})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#22222A] rounded-lg p-1 border border-white/5">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="p-1 hover:text-[#F59E0B] transition-colors"
                            aria-label="تقليل الكمية"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-white">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="p-1 hover:text-[#F59E0B] transition-colors"
                            aria-label="زيادة الكمية"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                          aria-label="حذف الصنف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Add Extras Section */}
                <div className="bg-[#16161C] p-4 rounded-2xl border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#F59E0B]">
                    <span>تحب تزوّد طعم المزاج؟</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {toumItem && (
                      <button
                        onClick={() => onAddQuickExtra(toumItem)}
                        className="py-2 px-3 rounded-xl bg-[#202028] hover:bg-[#282834] text-xs font-bold text-white border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>+ علبة ثومية</span>
                        <span className="text-[#F59E0B]">5 ج.م</span>
                      </button>
                    )}
                    {mozzaItem && (
                      <button
                        onClick={() => onAddQuickExtra(mozzaItem)}
                        className="py-2 px-3 rounded-xl bg-[#202028] hover:bg-[#282834] text-xs font-bold text-white border border-white/5 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>+ موتزاريلا إكسترا</span>
                        <span className="text-[#F59E0B]">5 ج.م</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Checkout Information Form */}
                <form onSubmit={handleDirectCheckout} className="space-y-4 pt-2">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F59E0B]" />
                    <span>بيانات التوصيل والفرع</span>
                  </div>

                  {/* Branch Selector */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      الفرع الأقرب إليك:
                    </label>
                    <select
                      value={selectedBranchId}
                      onChange={(e) => onSelectBranchId(e.target.value)}
                      className="w-full bg-[#1A1A20] border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F59E0B] text-right"
                    >
                      {BRANCHES_DATA.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} {b.phone ? `(${b.phone})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      الاسم بالكامل: *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: أحمد محمد"
                      className="w-full bg-[#1A1A20] border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F59E0B] text-right"
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      رقم الموبايل: *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="أدخل رقم التليفون عند الاستخدام الفعلي"
                      className="w-full bg-[#1A1A20] border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F59E0B] text-right font-mono"
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      العنوان بالتفصيل: *
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="المنطقة، اسم الشارع، رقم العمارة، رقم الشقة..."
                      className="w-full bg-[#1A1A20] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F59E0B] text-right"
                    />
                    {formErrors.address && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.address}</span>
                    )}
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">
                      ملاحظات خاصة بالطلب (اختياري):
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: ثومية زيادة، بدون شطة، الخبز مقمر زيادة..."
                      className="w-full bg-[#1A1A20] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F59E0B] text-right"
                    />
                  </div>
                </form>
              </>
            )}

          </div>

          {/* Footer Totals & CTA Actions */}
          {cart.length > 0 && !orderConfirmed && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-[#15151A] space-y-4">
              
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-white font-mono">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>خدمة التوصيل:</span>
                  <span className="font-bold text-emerald-400 font-mono">{deliveryFee} ج.م</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-[#F59E0B] text-xl font-heading">{grandTotal} ج.م</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp Order */}
                <button
                  type="button"
                  onClick={generateWhatsAppMessage}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>اطلب عبر واتساب</span>
                </button>

                {/* Direct Order Button */}
                <button
                  type="button"
                  onClick={handleDirectCheckout}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الطلب المباشر</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
