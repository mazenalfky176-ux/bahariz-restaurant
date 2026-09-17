import React, { useState } from 'react';
import { Order } from '../types';
import { orderService } from '../services/orderService';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Send,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface CancelOrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderCancelled?: (updatedOrder: Order) => void;
}

const CANCEL_REASONS = [
  'طلبت الأصناف عن طريق الخطأ',
  'تأخر وقت التوصيل المتوقع',
  'أرغب في تغيير الأصناف أو العنوان',
  'ظرف طارئ ولم أعد في المنزل',
  'سبب آخر',
];

export const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderCancelled,
}) => {
  const [selectedReason, setSelectedReason] = useState(CANCEL_REASONS[0]);
  const [customNote, setCustomNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [cancelledOrder, setCancelledOrder] = useState<Order | null>(null);

  if (!isOpen || !order) return null;

  const handleConfirmCancel = () => {
    const finalReason = selectedReason === 'سبب آخر' && customNote.trim()
      ? customNote.trim()
      : selectedReason;

    const result = orderService.cancelOrder(order.id, finalReason, 'customer');
    if (result) {
      setCancelledOrder(result);
      setIsSuccess(true);
      if (onOrderCancelled) {
        onOrderCancelled(result);
      }
    }
  };

  const handleSendWhatsAppNotice = () => {
    if (!cancelledOrder) return;
    const url = orderService.generateWhatsAppCancelUrl(cancelledOrder);
    window.open(url, '_blank');
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    setSelectedReason(CANCEL_REASONS[0]);
    setCustomNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-right">
      {/* Backdrop */}
      <div
        onClick={handleModalClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-[#141419] border border-red-500/30 rounded-3xl shadow-[0_20px_60px_rgba(239,68,68,0.25)] p-6 sm:p-8 text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          aria-label="إغلاق النافذة"
          className="absolute top-5 left-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          /* Confirmation Form */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  إلغاء الطلب <span className="text-red-400">#{order.orderNumber}</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  الفرع المسؤول: <strong className="text-white">{order.branchName}</strong>
                </p>
              </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4 text-xs text-red-200 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-red-300">
                <ShieldAlert className="w-4 h-4" />
                <span>تنبيه هام بخصوص الإلغاء:</span>
              </div>
              <p className="leading-relaxed text-neutral-300">
                عند تأكيدك، سيتم إرسال إشعار فوري لسيستم مطبخ الفرع وإصدار صوت تنبيهي لوقف تجهيز الوجبات قبل تحرك الدليفري.
              </p>
            </div>

            {/* Order Summary Snapshot */}
            <div className="bg-[#1A1A22] rounded-2xl p-4 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>العميل:</span>
                <span className="text-white font-medium">{order.customerName} ({order.phoneNumber})</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>إجمالي الطلب:</span>
                <span className="text-[#F59E0B] font-bold font-mono text-sm">{order.total} ج.م</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>عدد الأصناف:</span>
                <span className="text-white">{order.items.length} أصناف</span>
              </div>
            </div>

            {/* Cancellation Reason Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-300 block">
                برجاء تحديد سبب الإلغاء لمساعدة إدارة المطعم:
              </label>
              
              <div className="space-y-2">
                {CANCEL_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedReason === reason
                        ? 'bg-red-500/10 border-red-500 text-white font-bold'
                        : 'bg-[#181820] border-white/5 text-neutral-300 hover:bg-[#202028]'
                    }`}
                  >
                    <span>{reason}</span>
                    <input
                      type="radio"
                      name="cancel_reason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-red-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              {selectedReason === 'سبب آخر' && (
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="اكتب سبب الإلغاء بالتفصيل..."
                  rows={2}
                  className="w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500 text-right mt-2"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="py-3 px-4 rounded-xl text-xs font-bold bg-[#22222C] hover:bg-[#2A2A36] text-white transition-colors cursor-pointer"
              >
                تراجع، أريد استمرار الطلب
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                className="py-3 px-4 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>تأكيد الإلغاء فوراً</span>
              </button>
            </div>
          </div>
        ) : (
          /* Cancellation Succeeded Screen */
          <div className="py-4 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-red-400 uppercase tracking-wider">
                تم تسجيل الإلغاء بنجاح
              </span>
              <h3 className="text-2xl font-black text-white">
                تم إلغاء الطلب #{cancelledOrder?.orderNumber}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                تم تحديث حالة الطلب في السيستم وتنبيه طاقم <strong className="text-white">{cancelledOrder?.branchName}</strong> بوقف التحضير.
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-[#181822] rounded-2xl p-4 border border-white/5 text-right space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>سبب الإلغاء المسجل:</span>
                <span className="font-bold text-red-300">{cancelledOrder?.cancellationReason}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>توقيت الإلغاء:</span>
                <span className="font-mono text-white">
                  {cancelledOrder?.cancelledAt ? new Date(cancelledOrder.cancelledAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : 'الآن'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>رقم دليفري الفرع:</span>
                <a href={`tel:${cancelledOrder?.branchPhone}`} className="text-[#F59E0B] font-mono font-bold hover:underline">
                  {cancelledOrder?.branchPhone}
                </a>
              </div>
            </div>

            {/* Instant Notification Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsAppNotice}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال برقية الإلغاء لواتساب الفرع</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${cancelledOrder?.branchPhone}`}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#22222C] hover:bg-[#2A2A36] text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>اتصال بالفرع</span>
                </a>

                <button
                  type="button"
                  onClick={handleModalClose}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
                >
                  <span>إغلاق والمتابعة</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
