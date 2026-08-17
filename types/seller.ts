export interface User {
  id: number;
  role: 'seller' | string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

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
  provider: 'dojah' | string;
  response: CacVerificationResponse;
  status: 'completed' | string;
}

export interface SellerDocument {
  id: number;
  type: 'cac' | 'proof_of_address' | string;
  filePath: string;
  uploadedAt: string; // ISO Date String
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface SellerProfile {
  id: number;
  userId: number;
  businessName: string;
  rating: number;
  contactPhone: string;
  contactEmail: string;
  address: string;
  cacNumber: string;
  verificationStatus: 'pending' | 'verified' | 'rejected' | string;
  rejectionReason: string | null;
  cacVerification: CacVerification | null;
  verifiedBy: number | null;
  verifiedAt: string | null; // ISO Date String
  documents: SellerDocument[];
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

export interface SellerApiResponse {
  success: boolean;
  data: {
    user: User;
    sellerProfile: SellerProfile;
  };
  message: string;
}
