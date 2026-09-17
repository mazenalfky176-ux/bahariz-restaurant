export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isSignature?: boolean;
  isSpicy?: boolean;
  badge?: string;
}

export type MenuCategory =
  | 'all'
  | 'chicken'
  | 'meat'
  | 'sattalana_chicken'
  | 'sattalana_meat'
  | 'sattalana_cheese'
  | 'variety'
  | 'bahariz_mixes'
  | 'extras';

export interface CategoryInfo {
  id: MenuCategory;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  hours: string;
  isOpen: boolean;
  deliveryAvailable: boolean;
  mapQuery: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedAddons?: { name: string; price: number }[];
}

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  branchId: string;
  deliveryAddress: string;
  notes: string;
}

export type OrderStatus =
  | 'received'      // تم استلام الطلب
  | 'preparing'     // جاري التجهيز بالمطبخ
  | 'on_the_way'    // مع مندوب التوصيل
  | 'delivered'     // تم التوصيل بنجاح
  | 'cancelled';    // ملغي

export interface Order {
  id: string;
  orderNumber: string; // e.g. BHR-491204
  customerName: string;
  phoneNumber: string;
  branchId: string;
  branchName: string;
  branchPhone: string;
  deliveryAddress: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: number; // timestamp ms
  status: OrderStatus;
  statusTextArabic: string;
  estTime: string;
  cancelledAt?: number;
  cancellationReason?: string;
  cancelledBy?: 'customer' | 'branch';
}
