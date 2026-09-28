export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'approved' | 'suspended'; // Adjusted based on summary counts
  approvedBy: number | null;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Filters {
  status: 'all' | 'pending' | 'approved' | 'suspended';
  search: string | null;
}

export interface CompanySummary {
  totalCompaniesCount: number;
  pendingCount: number;
  approvedCount: number;
  suspendedCount: number;
}

export interface ApiResponseData {
  companies: Company[];
  pagination: Pagination;
  filters: Filters;
  summary: CompanySummary;
}

export interface FetchCompaniesResponse {
  success: boolean;
  data: ApiResponseData;
  message: string;
}

export interface OnboardPartnerPayload {
  companyName: string;
  city: string;
  contactName: string;
  phone: string;
  email: string;
  contractType: string;
  commissionRate: number;
}

