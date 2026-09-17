import React, { useState, useEffect } from 'react';
import { Order, Branch } from '../types';
import { BRANCHES_DATA } from '../data/menuData';
import { orderService } from '../services/orderService';
import { soundManager } from '../services/soundEffects';
import {
  X,
  ChefHat,
  Volume2,
  VolumeX,
  Radio,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  RefreshCw,
  ShoppingBag,
  Bell,
  Filter,
} from 'lucide-react';

interface BranchKitchenMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCancelOrder: (order: Order) => void;
}

export const BranchKitchenMonitorModal: React.FC<BranchKitchenMonitorModalProps> = ({
  isOpen,
  onClose,
  onRequestCancelOrder,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastCancelledNotice, setLastCancelledNotice] = useState<Order | null>(null);

  const loadOrders = () => {
    const list = orderService.getOrders();
    setOrders([...list]);
  };

  useEffect(() => {
    loadOrders();
    const unsubscribe = orderService.subscribe(() => {
      loadOrders();
      // Check if there is an order recently cancelled
      const all = orderService.getOrders();
      const recentCancel = all.find(
        (o) => o.status === 'cancelled' && o.cancelledAt && Date.now() - o.cancelledAt < 10000
      );
      if (recentCancel) {
        setLastCancelledNotice(recentCancel);
        if (soundEnabled) {
          soundManager.playCancelAlertSound();
        }
      }
    });

    return () => unsubscribe();
  }, [soundEnabled]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    if (selectedBranchFilter === 'all') return true;
    return o.branchId === selectedBranchFilter;
  });

  const activeCount = orders.filter((o) => o.status !== 'cancelled').length;
  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

  const testSound = () => {
    soundManager.playCancelAlertSound();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 text-right">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-5xl bg-[#111116] border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-8 text-white z-10 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  شاشة استقبال طلبات الفرع والمطبخ
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  مباشر (Live Sync)
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                تسمع وترى هنا كافة الطلبات الواردة وإشعارات الإلغاء الفورية من العملاء في ثوانٍ.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) testSound();
              }}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-amber-500/10 border-amber-500/30 text-[#F59E0B]'
                  : 'bg-white/5 border-white/10 text-neutral-400'
              }`}
              title="تفعيل أو كتم صوت التنبيهات"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'صوت التنبيه مفعّل' : 'مكتوم'}</span>
            </button>

            {/* Test sound button */}
            <button
              onClick={testSound}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              تجربة صوت الإلغاء 🔊
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Cancel Alert Banner if any recent cancellation */}
        {lastCancelledNotice && (
          <div className="mt-4 p-4 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-between gap-3 text-red-200 animate-bounce duration-1000">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="font-black text-white text-sm">
                  🚨 تنبيه عاجل: تم إلغاء الطلب #{lastCancelledNotice.orderNumber}
                </div>
                <div className="text-xs text-red-300">
                  العميل: {lastCancelledNotice.customerName} ({lastCancelledNotice.phoneNumber}) • السبب: <strong className="text-white">{lastCancelledNotice.cancellationReason}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setLastCancelledNotice(null)}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-bold text-white transition-colors"
            >
              تم الاستلام وتأكيد الوقف
            </button>
          </div>
        )}

        {/* Stats & Branch Filter Bar */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium">عرض فرع:</span>
            <select
              value={selectedBranchFilter}
              onChange={(e) => setSelectedBranchFilter(e.target.value)}
              className="bg-[#181820] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
            >
              <option value="all">جميع الفروع ({orders.length})</option>
              {BRANCHES_DATA.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 font-bold">
              نشطة قيد التجهيز: {activeCount}
            </span>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
              طلبات ملغاة: {cancelledCount}
            </span>
          </div>
        </div>

        {/* Orders Cards List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-neutral-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600" />
              <div className="text-sm font-bold text-white">لا توجد طلبات مسجلة لهذا الفرع حالياً</div>
              <p className="text-xs text-neutral-500">
                اطلب أي وجبة من المنيو وستظهر هنا فوراً على شاشة المطبخ.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const isCancelled = ord.status === 'cancelled';

              return (
                <div
                  key={ord.id}
                  className={`rounded-2xl border p-5 transition-all duration-300 ${
                    isCancelled
                      ? 'bg-[#181214] border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                      : 'bg-[#16161D] border-white/10 hover:border-[#F59E0B]/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black font-mono text-white">
                        #{ord.orderNumber}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                          isCancelled
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCancelled ? 'bg-red-400' : 'bg-amber-400 animate-ping'
                          }`}
                        />
                        {isCancelled ? '⚠️ تم إلغاء الطلب من العميل' : 'جاري التجهيز في المطبخ'}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {new Date(ord.createdAt).toLocaleTimeString('ar-EG', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Cancel Alert Information if cancelled */}
                  {isCancelled && (
                    <div className="my-3 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-red-300">
                          إشعار الإلغاء: {ord.cancellationReason || 'طلب من العميل'}
                        </strong>
                        <span className="text-[11px] text-neutral-400">
                          توقيت الإلغاء:{' '}
                          {ord.cancelledAt
                            ? new Date(ord.cancelledAt).toLocaleTimeString('ar-EG', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'الآن'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Order Content */}
                  <div className="py-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-400 block mb-1">بيانات العميل والتوصيل:</span>
                      <div className="font-bold text-white text-sm">
                        {ord.customerName} -{' '}
                        <a href={`tel:${ord.phoneNumber}`} className="text-[#F59E0B] hover:underline font-mono">
                          {ord.phoneNumber}
                        </a>
                      </div>
                      <div className="text-neutral-300 text-xs mt-1 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                        <span>{ord.deliveryAddress}</span>
                      </div>
                      <div className="text-neutral-400 mt-1">
                        الفرع: <strong className="text-white">{ord.branchName}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-400 block mb-1">الوجبات المطلوبة:</span>
                      <div className="space-y-1 bg-[#121217] p-2.5 rounded-xl border border-white/5">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-neutral-300">
                            <span>
                              {it.quantity}× {it.item.name}
                            </span>
                            <span className="font-mono text-[#F59E0B]">
                              {it.item.price * it.quantity} ج.م
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer of Order Card */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="font-bold text-white">
                      الإجمالي المطلوب:{' '}
                      <span className="text-[#F59E0B] font-mono text-base font-heading">
                        {ord.total} ج.م
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${ord.phoneNumber}`}
                        className="py-1.5 px-3 rounded-lg bg-[#22222C] hover:bg-[#2A2A36] text-white flex items-center gap-1 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>اتصال بالعميل</span>
                      </a>

                      {!isCancelled && (
                        <button
                          onClick={() => onRequestCancelOrder(ord)}
                          className="py-1.5 px-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>إلغاء الطلب</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
