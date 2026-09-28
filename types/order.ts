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
   seller: OrderSeller;
  sellers: OrderSeller[];
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

//single order response
export interface OrderSeller {
  id: number;
  businessName: string;
  location: string;
}

export interface OrderBuyer {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
}

export interface OrderStatusHistoryNode {
  id: number;
  status: 'pending_payment' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  note: string;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface OrderItemNode {
  id: number;
  productId: number;
  partName: string;
  partNumber: string;
  quantity: number;
  unitPriceKobo: number;
  lineTotalKobo: number;
  deliveryFeeKobo: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | string;
  seller: OrderSeller;
  delivery: any | null; // Replace with specialized delivery tracking types if needed
}

export interface OrderDeliveryAddress {
  label: string; // e.g., "workshop", "home"
  street: string;
  city: string;
  state: string;
  phone: string;
}

export interface OrderDetailPayload {
  id: number;
  status: 'pending_payment' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  paymentMethod: 'paystack' | 'bank_transfer' | string;
  paymentReference: string;
  paymentStatus: 'paid' | 'unpaid' | 'refunded' | string;
  subtotalKobo: number;
  deliveryFeeKobo: number;
  totalKobo: number;
  totalItems: number;
  sellerCount: number;
  seller: OrderSeller;
  sellers: OrderSeller[];
  buyer: OrderBuyer;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  statusHistory: OrderStatusHistoryNode[];
  items: OrderItemNode[];
  deliveryStatus: 'not_created' | 'pending' | 'dispatched' | 'delivered' | string;
  deliveryAddress: OrderDeliveryAddress;
  disputeId: number | null;
  disputes: any[]; // Replace with specific dispute node interface if available
}

export interface OrderDetailsResponse {
  success: boolean;
  data: OrderDetailPayload;
  message: string;
}
