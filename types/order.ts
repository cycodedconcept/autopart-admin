export type status = "all" | "pending_payment" | "confirmed" | "picked_up" | "in_transit" | "delivered" | "cancelled" | "disputed"

export interface Buyer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  id: number;
  label: string; // e.g., "Workshop", "Home"
  street: string;
  city: string;
  state: string;
  phone: string;
}

export interface OrderItemSeller {
  id: number;
  businessName: string;
  rating: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  title: string;
  partNumber: string;
  condition: 'new' | 'used' | 'refurbished' | string;
  location: string;
  quantity: number;
  unitPriceKobo: number;
  lineTotalKobo: number;
  itemStatus: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'cancelled' | string;
  primaryImageUrl: string;
  seller: OrderItemSeller;
} 

export interface Order {
  id: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | string;
  paymentMethod: 'paystack' | 'card' | 'transfer' | string;
  paymentReference: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | string;
  subtotalKobo: number; // Values in Kobo (Multiply by 100 for Naira)
  deliveryFeeKobo: number;
  totalKobo: number;
  totalItems: number;
  sellerCount: number;
  buyer: Buyer;
  // New Seller metrics for split orders/dashboards
  sellerLineItems: number; 
  sellerTotalItems: number;
  sellerTotalKobo: number;

  // Newly added details blocks
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrderFilters {
  status: string;
  paymentStatus: string;
  search: string;
}

export interface OrderListData {
  orders: Order[];
  pagination: Pagination;
  filters: OrderFilters;
}

export interface OrderListApiResponse {
  success: boolean;
  data: OrderListData;
  message: string;
}
