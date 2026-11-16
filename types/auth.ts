export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Exact payload shape returned by your backend API on successful authorization.
 */

export interface Admin {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
  permissions: string[];
  isActive?: boolean;
}
export interface AuthUserResponse {
  data: {
    token: string;
    admin: Admin;
  };
  success: boolean;
  message: string;
}

/**
 * Unified schema for standard backend validation/error message payloads.
 * Helps type safety when catching errors in TanStack Query.
 */
export interface ApiErrorPayload {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>; // Captures field-specific errors (e.g., email: ["Invalid email"])
}
