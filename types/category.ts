export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  status: 'active' | 'inactive' | string; // Adjusted to literal or string based on API rules
  children: Category[];
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface ApiResponseFilters {
  status: string;
}

export interface ApiResponseData {
  categories: Category[];
  filters: ApiResponseFilters;
}

export interface CategoryApiResponse {
  success: boolean;
  data: ApiResponseData;
  message: string;
}
