export interface Permission {
  // Broadly typed as string, but you can turn this into a union type 
  // of your specific permissions (e.g., 'dashboard.read' | 'users.manage')
  type: string; 
}

export interface AdminProfileData {
  id: number;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: string[];
  permissions: string[];
  createdAt: string; // ISO 8601 Date String
  updatedAt: string; // ISO 8601 Date String
}

export interface AdminProfileResponse {
  success: boolean;
  data: AdminProfileData;
  message: string;
}
