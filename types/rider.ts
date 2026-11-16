export interface Zone {
  id: number;
  name: string;
  state: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'approved' | 'pending' | 'rejected' | string; // Adjusted to handle potential status enums
  approvedBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rider {
  id: number;
  companyId: number;
  zoneId: number;
  fullName: string;
  phone: string;
  email: string;
  vehicleType: 'bike' | 'car' | 'van' | string; // Adjusted for common vehicle enums
  status: 'available' | 'on_delivery' | 'unavailable' | string; 
  accountStatus: 'active' | 'inactive' | string;
  createdAt: string;
  updatedAt: string;
  zone: Zone;
  company: Company;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Filters {
  companyId: number | null;
  status: string;
  search: string | null;
}

export interface Summary {
  totalRidersCount: number;
  availableCount: number;
  onDeliveryCount: number;
  unavailableCount: number;
  inactiveCount: number;
}

export interface FetchRidersData {
  riders: Rider[];
  pagination: Pagination;
  filters: Filters;
  summary: Summary;
}

export interface FetchRidersResponse {
  success: boolean;
  data: FetchRidersData;
  message: string;
}
