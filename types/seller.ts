// ==========================================
// 1. Shared & Reusable Base Interfaces
// ==========================================
export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface User {
  id: number;
  role: 'seller' | 'admin' | 'customer' | string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface SellerDocument {
  id: number;
  type: 'cac' | 'proof_of_address' | string;
  filePath: string;
  uploadedAt: string; // ISO Date String
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

// ==========================================
// 2. CAC & Verification Specific Interfaces
// ==========================================
export interface CacCompanyEntity {
  company_name: string;
  rc_number: string;
  type_of_company: string;
  date_of_registration: string; // ISO Date String
  address: string;
  status: string;
  state: string;
  city: string;
  email: string;
  business_number: string;
  lga: string;
}

export interface CacVerificationResponse {
  body: {
    entity: CacCompanyEntity;
  };
  httpStatusCode: number;
}

export interface CacVerification {
  checkedAt: string; // ISO Date String
  error: string | null;
  provider: 'dojah' | string | null;
  response: CacVerificationResponse | null;
  status: 'completed' | 'not_configured' | 'pending' | 'failed' | string;
}

// ==========================================
// 3. Core Seller Profile Interface
// ==========================================
export interface SellerProfile {
  id: number;
  userId: number;
  businessName: string;
  rating: number;
  contactPhone: string;
  contactEmail: string;
  address: string;
  cacNumber: string;
  verificationStatus: 'pending' | 'verified' | 'approved' | 'rejected' | string;
  rejectionReason: string | null;
  cacVerification: CacVerification | null;
  verifiedBy: number | null;
  verifiedAt: string | null; // ISO Date String
  documents: SellerDocument[];
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

// ==========================================
// 4. Pagination & Filtering Interfaces
// ==========================================
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SellerFilters {
  status: 'pending' | 'verified' | 'approved' | 'rejected' | string;
}

export interface SellerReviewItem {
  user: User;
  sellerProfile: SellerProfile;
}

export interface SellerReviewQueueData {
  sellers: SellerReviewItem[];
  pagination: Pagination;
  filters: SellerFilters;
}

// ==========================================
// 5. Final API Response Types
// ==========================================

// For single seller details fetch
export interface SellerApiResponse {
  success: boolean;
  data: {
    user: User;
    sellerProfile: SellerProfile;
  };
  message: string;
}
export interface SellerApi {
  success: boolean;
  data: SellerReviewQueueData;
  message: string;
}

// For the paginated admin verification queue list
export type SellerReviewQueueResponse = BaseResponse<SellerReviewQueueData>;


export interface UserProfile {
  id: number;
  userId: number;
  businessName: string;
  rating: number;
  contactPhone: string;
  contactEmail: string;
  cacNumber: string | null;
  verificationStatus: 'pending' | 'verified' | 'rejected' | string;
  rejectionReason: string | null;
  verifiedBy: number | null;
  verifiedAt: string | null; // ISO Date string or null
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface User {
  id: number;
  role: 'admin' | 'seller' | 'buyer' | string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  accountStatus: 'active' | 'suspended' | 'inactive' | string;
  sellerProfile:UserProfile | null; // Profile is present for sellers, null or optional for others
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserFilters {
  role: string;
  status: string;
  search: string;
}

export interface UserListData {
  users: User[];
  pagination: Pagination;
  filters: UserFilters;
}

export interface UserListApiResponse {
  success: boolean;
  data: UserListData;
  message: string;
}
