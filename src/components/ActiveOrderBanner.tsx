import React from 'react';
import { Order } from '../types';
import { ShoppingBag, AlertTriangle, Eye, X, CheckCircle2, Clock } from 'lucide-react';

interface ActiveOrderBannerProps {
  order: Order | null;
  onViewDetails: () => void;
  onCancelOrder: () => void;
  onDismiss?: () => void;
}

export const ActiveOrderBanner: React.FC<ActiveOrderBannerProps> = ({
  order,
  onViewDetails,
  onCancelOrder,
  onDismiss,
}) => {
  if (!order) return null;

  const isCancelled = order.status === 'cancelled';

  return (
    <aside
      aria-label="حالة الطلب الحالي"
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 rounded-2xl border p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 text-right ${
        isCancelled
          ? 'bg-[#181315]/95 border-red-500/40 text-red-200'
          : 'bg-[#141419]/95 border-[#F59E0B]/40 text-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Status Indicator */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isCancelled
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/30'
            }`}
          >
            {isCancelled ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-mono text-white">
                #{order.orderNumber}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isCancelled
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCancelled ? 'bg-red-400' : 'bg-amber-400 animate-ping'
                  }`}
                />
                {order.statusTextArabic}
              </span>
            </div>

            <p className="text-xs text-neutral-300 mt-1 truncate">
              {isCancelled ? (
                <span>تم إخطار الفرع بإلغاء الطلب رسمياً</span>
              ) : (
                <span>{order.branchName} • الإجمالي: {order.total} ج.م</span>
              )}
            </p>
          </div>
        </div>

        {/* Dismiss if cancelled */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="إخفاء الإشعار"
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>تفاصيل الطلب</span>
        </button>

        {!isCancelled && (
          <button
            onClick={onCancelOrder}
            className="flex-1 py-2 px-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-xs font-black text-white flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>إلغاء الطلب</span>
          </button>
        )}
      </div>
    </aside>
  );
};
