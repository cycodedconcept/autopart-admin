export interface DisputeResponse {
  success: boolean;
  data: DisputeData;
  message: string;
}

export interface DisputeData {
  disputes: Dispute[];
  pagination: Pagination;
  filters: DisputeFilters;
}

export interface Dispute {
  id: number;
  orderId: number;
  raisedBy: 'buyer' | 'seller'; // Add other actors if applicable
  reason: string;
  status: 'open' | 'resolved' | 'closed'; // Extend based on your workflow
  resolutionNote: string | null;
  refundReference: string | null;
  refundAmountKobo: number | null;
  resolvedBy: number | null;
  resolvedAt: string | null; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  order: DisputeOrder;
  buyer: DisputeBuyer;
  raisedBySeller: DisputeSeller | null;
  resolvedByAdmin: any | null; // Replace 'any' if you have an admin structure
  sellers: DisputeSeller[];
}

export interface DisputeOrder {
  id: number;
  status: string; // e.g., "pending_payment"
  paymentMethod: 'paystack' | string; 
  paymentReference: string | null;
  paymentStatus: 'pending' | 'success' | 'failed';
  totalKobo: number;
  createdAt: string;
  updatedAt: string;
}

export interface DisputeBuyer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface DisputeSeller {
  id: number;
  userId: number;
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DisputeFilters {
  status: string | null;
  raisedBy: string | null;
  search: string | null;
}
