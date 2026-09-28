export interface PayoutLogisticsCompany {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'approved' | 'pending' | 'suspended' | string;
}

export interface PayoutItemBreakdown {
  id: number;
  payoutId: number;
  orderItemId: number;
  deliveryJobId: number;
  orderId: number;
  productId: number;
  quantity: number;
  grossAmountKobo: number;
  commissionAmountKobo: number;
  netAmountKobo: number;
  orderStatus: 'delivered' | string;
  deliveryJobStatus: 'delivered' | string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayoutRecord {
  id: number;
  payeeType: 'logistics_company' | 'seller' | string;
  grossAmountKobo: number;
  commissionAmountKobo: number;
  amountKobo: number;
  status: 'requested' | 'approved' | 'rejected' | 'settled' | string;
  approvedBy: number | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  bankAccountRef: string;
  itemCount: number;
  requestedAt: string;
  settledAt: string | null;
  createdAt: string;
  updatedAt: string;
  seller: any | null; 
  logisticsCompany: PayoutLogisticsCompany;
  items: PayoutItemBreakdown[];
}

export interface PayoutPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PayoutFilters {
  payeeType: 'logistics_company' | 'seller' | string;
  status: 'requested' | 'approved' | 'rejected' | 'settled' | string;
  search: string | null;
  companyId: number | null;
  sellerId: number | null;
}

export interface FetchPayoutsData {
  payouts: PayoutRecord[];
  pagination: PayoutPagination;
  filters: PayoutFilters;
}

export interface FetchPayoutsResponse {
  success: boolean;
  data: FetchPayoutsData;
  message: string;
}
