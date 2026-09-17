import React from 'react';
import { Order } from '../types';
import { orderService } from '../services/orderService';
import {
  X,
  Clock,
  MapPin,
  Phone,
  Send,
  AlertTriangle,
  CheckCircle2,
  Package,
  ShoppingBag,
  ChefHat,
  Bike,
} from 'lucide-react';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestCancel: (order: Order) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onRequestCancel,
}) => {
  if (!isOpen || !order) return null;

  const isCancelled = order.status === 'cancelled';

  const handleWhatsAppInquiry = () => {
    const msg = `مرحباً ${order.branchName}، بخصوص طلبي رقم #${order.orderNumber} باسم ${order.customerName}، أود الاستفسار عن حالة الطلب.`;
    const branchPhoneClean = order.branchPhone ? order.branchPhone.replace(/^0/, '20') : '';
    window.open(`https://wa.me/${branchPhoneClean}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-right">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-[#141419] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isCancelled ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-[#F59E0B] border border-amber-500/30'
            }`}>
              {isCancelled ? <AlertTriangle className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  طلب #{order.orderNumber}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  isCancelled
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : 'bg-amber-500/10 text-[#F59E0B] border-amber-500/20'
                }`}>
                  {order.statusTextArabic}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                توقيت الطلب: {new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper (Only if active) */}
        {!isCancelled && (
          <div className="py-6 border-b border-white/10">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="flex flex-col items-center gap-1.5 text-emerald-400">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="font-bold">تم استلام الطلب</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-[#F59E0B]">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold animate-pulse">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="font-bold">جاري التجهيز بالمطبخ</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-neutral-500">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold">
                  <Bike className="w-4 h-4" />
                </div>
                <span>خروج مع الدليفري</span>
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Notice Banner */}
        {isCancelled && (
          <div className="my-5 bg-red-950/40 border border-red-500/40 rounded-2xl p-4 text-xs text-red-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-red-300 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>هذا الطلب ملغي رسمياً</span>
            </div>
            <p className="text-neutral-300">
              سبب الإلغاء: <strong className="text-white">{order.cancellationReason || 'طلب من العميل'}</strong>
            </p>
            {order.cancelledAt && (
              <p className="text-neutral-400 text-[11px]">
                تاريخ وتوقيت الإلغاء: {new Date(order.cancelledAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        )}

        {/* Customer & Branch Info */}
        <div className="py-5 space-y-3 text-xs border-b border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#1A1A22] p-3 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 block text-[11px]">الفرع المنفذ:</span>
              <span className="font-bold text-white text-sm">{order.branchName}</span>
              <a href={`tel:${order.branchPhone}`} className="text-[#F59E0B] font-mono block hover:underline">
                {order.branchPhone}
              </a>
            </div>

            <div className="bg-[#1A1A22] p-3 rounded-xl border border-white/5 space-y-1">
              <span className="text-neutral-400 block text-[11px]">بيانات العميل:</span>
              <span className="font-bold text-white text-sm">{order.customerName}</span>
              <span className="text-neutral-300 font-mono block">{order.phoneNumber}</span>
            </div>
          </div>

          <div className="bg-[#1A1A22] p-3 rounded-xl border border-white/5 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="text-neutral-300 text-xs">
              <span className="text-neutral-400 block text-[10px]">عنوان التوصيل:</span>
              {order.deliveryAddress}
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="py-5 space-y-3 border-b border-white/10 max-h-48 overflow-y-auto">
          <span className="text-xs font-bold text-neutral-400 block">تفاصيل الوجبات:</span>
          {order.items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#24242E] flex items-center justify-center font-bold text-neutral-300 text-[11px]">
                  {it.quantity}x
                </span>
                <span className="text-white font-medium">{it.item.name}</span>
              </div>
              <span className="font-bold text-[#F59E0B] font-mono">
                {it.item.price * it.quantity} ج.م
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="py-4 space-y-1.5 text-xs text-neutral-300">
          <div className="flex justify-between">
            <span>المجموع الفرعي:</span>
            <span className="font-mono text-white">{order.subtotal} ج.م</span>
          </div>
          <div className="flex justify-between">
            <span>خدمة التوصيل:</span>
            <span className="font-mono text-emerald-400">{order.deliveryFee} ج.م</span>
          </div>
          <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
            <span>الإجمالي:</span>
            <span className="text-[#F59E0B] text-lg font-heading">{order.total} ج.م</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
          {!isCancelled ? (
            <>
              {/* Main Cancel Button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestCancel(order);
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-black bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>إلغاء هذا الطلب الآن</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>متابعة مع الفرع</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl text-xs font-bold bg-[#22222C] hover:bg-[#2A2A36] text-white transition-colors cursor-pointer"
            >
              إغلاق النافذة
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
