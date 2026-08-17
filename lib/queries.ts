"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { loginUser, fetchDashboardItems } from "./api";
import { useAuthStore } from "@/store/authStore";
import { ApiErrorPayload, AuthUserResponse, LoginFormData } from "@/types/auth";

// 🔑 Centralized cache tracking keys
export const QUERY_KEYS = {
  inventory: ["inventory"] as const,
  dashboard: ["dashboard"] as const,
  warehouseDetails: (id: string) => ["inventory", id] as const,
};

export function login() {
  const { setSession } = useAuthStore();
 

  return useMutation<AuthUserResponse, ApiErrorPayload, LoginFormData>({
    mutationFn: (data) => loginUser(data),
    onSuccess: (result) => {
      // Extract the user data and token from the result
      const user = result.data.admin;
      const token = result.data.token;

      setSession(user, token);
    },

    onError: (error) => {
      // handle error
      console.error("Login failed:", error.message);
    },
  });
}

// --- DATA FETCHING QUERIES ---
export function useDashboardQuery() {
  // ✅ VALID: Hooks are perfectly fine at the top level of a custom hook!
  const token = useAuthStore((state) => state.token); 

  return useQuery({
    // Include token in the key so it instantly triggers a refetch when a user logs in
    queryKey: [...QUERY_KEYS.dashboard, token], 
    
    // Pass the token safely into the function execution
    queryFn: () => fetchDashboardItems(token), 
    
    // 🛑 BLOCKER: Prevents the API request from running if token is null
    enabled: !!token, 
    
    staleTime: 1000 * 60 * 5,
  });
}


