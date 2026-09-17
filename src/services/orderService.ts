import { Order, CartItem, Branch } from '../types';
import { soundManager } from './soundEffects';

const STORAGE_ORDERS_KEY = 'bahariz_restaurant_orders_v1';
const STORAGE_ACTIVE_ORDER_ID_KEY = 'bahariz_active_order_id_v1';
const CHANNEL_NAME = 'bahariz_orders_sync_channel';

// Default initial order for demonstration if empty so the user can test cancellation immediately
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'bhr-demo-1',
    orderNumber: 'BHR-819240',
    customerName: 'عميل تجريبي',
    phoneNumber: '',
    branchId: 'br-jaish',
    branchName: 'فرع شارع الجيش - دمنهور',
    branchPhone: '',
    deliveryAddress: 'عنوان تجريبي غير حقيقي',
    notes: 'ثومية زيادة ومحمص على الجريل بدون شطة',
    items: [
      {
        item: {
          id: 'sat-ch-1',
          name: 'سطلانة شاورما فراخ',
          category: 'sattalana_chicken',
          price: 58,
          description: 'شاورما فراخ سوري متبلة غرقانة صوص وثومية وموتزاريلا سايحة وبطاطس',
          image: '',
        },
        quantity: 1,
      },
      {
        item: {
          id: 'mix-4',
          name: 'ساندوتش بهاريز',
          category: 'bahariz_mixes',
          price: 80,
          description: 'السندوتش الملكي: شاورما، استربس، كفتة، جبنة موتزاريلا وصوص الشيدر السري',
          image: '',
        },
        quantity: 1,
      },
    ],
    subtotal: 138,
    deliveryFee: 15,
    total: 153,
    createdAt: Date.now() - 1000 * 60 * 4, // 4 mins ago
    status: 'preparing',
    statusTextArabic: 'جاري التجهيز بالمطبخ',
    estTime: '30 - 45 دقيقة',
  },
];

class OrderService {
  private channel: BroadcastChannel | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        if ('BroadcastChannel' in window) {
          this.channel = new BroadcastChannel(CHANNEL_NAME);
          this.channel.onmessage = (event) => {
            if (event.data?.type === 'ORDER_CANCELLED') {
              soundManager.playCancelAlertSound();
            } else if (event.data?.type === 'ORDER_CREATED') {
              soundManager.playNewOrderSound();
            }
            this.notifyListeners();
          };
        }

        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_ORDERS_KEY || e.key === STORAGE_ACTIVE_ORDER_ID_KEY) {
            this.notifyListeners();
          }
        });
      } catch {
        // Fallback for environments where BroadcastChannel is blocked
      }
    }
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('Order listener error:', err);
      }
    });
  }

  public getOrders(): Order[] {
    if (typeof window === 'undefined') return INITIAL_DEMO_ORDERS;
    try {
      const stored = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
        return INITIAL_DEMO_ORDERS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  }

  public saveOrders(orders: Order[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
      this.notifyListeners();
    } catch (err) {
      console.error('Error saving orders:', err);
    }
  }

  public getActiveOrderId(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(STORAGE_ACTIVE_ORDER_ID_KEY);
    } catch {
      return null;
    }
  }

  public setActiveOrderId(orderId: string | null) {
    if (typeof window === 'undefined') return;
    try {
      if (orderId) {
        localStorage.setItem(STORAGE_ACTIVE_ORDER_ID_KEY, orderId);
      } else {
        localStorage.removeItem(STORAGE_ACTIVE_ORDER_ID_KEY);
      }
      this.notifyListeners();
    } catch (err) {
      console.error('Error setting active order ID:', err);
    }
  }

  public getActiveOrder(): Order | null {
    const activeId = this.getActiveOrderId();
    if (!activeId) return null;
    const orders = this.getOrders();
    return orders.find((o) => o.id === activeId || o.orderNumber === activeId) || null;
  }

  public createOrder(data: {
    customerName: string;
    phoneNumber: string;
    branch: Branch;
    deliveryAddress: string;
    notes?: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }): Order {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `BHR-${randomNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}-${randomNum}`,
      orderNumber,
      customerName: data.customerName,
      phoneNumber: data.phoneNumber,
      branchId: data.branch.id,
      branchName: data.branch.name,
      branchPhone: data.branch.phone || '',
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
      items: [...data.items],
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee,
      total: data.total,
      createdAt: Date.now(),
      status: 'preparing',
      statusTextArabic: 'جاري التجهيز بالمطبخ',
      estTime: '30 - 45 دقيقة',
    };

    const currentOrders = this.getOrders();
    const updated = [newOrder, ...currentOrders];
    this.saveOrders(updated);
    this.setActiveOrderId(newOrder.id);

    // Play chime sound
    soundManager.playNewOrderSound();

    // Broadcast event
    if (this.channel) {
      this.channel.postMessage({ type: 'ORDER_CREATED', order: newOrder });
    }

    return newOrder;
  }

  public cancelOrder(orderIdOrNumber: string, reason: string, cancelledBy: 'customer' | 'branch' = 'customer'): Order | null {
    const orders = this.getOrders();
    let targetIndex = -1;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === orderIdOrNumber || orders[i].orderNumber === orderIdOrNumber) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) return null;

    const updatedOrder: Order = {
      ...orders[targetIndex],
      status: 'cancelled',
      statusTextArabic: 'تم الإلغاء',
      cancelledAt: Date.now(),
      cancellationReason: reason,
      cancelledBy,
    };

    orders[targetIndex] = updatedOrder;
    this.saveOrders(orders);

    // Audio alert tone to notify the staff/customer
    soundManager.playCancelAlertSound();

    // Broadcast across tabs
    if (this.channel) {
      this.channel.postMessage({ type: 'ORDER_CANCELLED', order: updatedOrder, reason });
    }

    return updatedOrder;
  }

  public generateWhatsAppCancelUrl(order: Order, reason?: string): string {
    const reasonText = reason || order.cancellationReason || 'طلب إلغاء من قِبل العميل';
    const msg = `🚨 *إشعار إلغاء عاجل لطلب بهاريز* 🚨
---------------------------------
رقم الطلب: *#${order.orderNumber}*
👤 العميل: ${order.customerName}
📱 الموبايل: ${order.phoneNumber}
📍 الفرع: ${order.branchName}
🏠 العنوان: ${order.deliveryAddress}
---------------------------------
⚠️ *سبب الإلغاء:* ${reasonText}
⏰ *وقت الإلغاء:* ${new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
---------------------------------
❗ *يرجى إيقاف تحضير الأوردر فوراً وعدم إرسال الدليفري.*
شكراً لتفهمكم ومتابعتكم.`;

    const branchPhoneClean = order.branchPhone ? order.branchPhone.replace(/^0/, '20') : '';
    return `https://wa.me/${branchPhoneClean}?text=${encodeURIComponent(msg)}`;
  }
}

export const orderService = new OrderService();
