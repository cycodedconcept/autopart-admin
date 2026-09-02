"use client";

import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import {
  loginUser,
  fetchDashboardItems,
  fetchAllSellers,
  fetchCategories,
  fetchVerification,
  fetchOrders,
  suspendAccount,
  approveSeller,
  rejectSeller,
  fetchDisputes,
} from "./api";
import { useAuthStore } from "@/store/authStore";
import { ApiErrorPayload, AuthUserResponse, LoginFormData } from "@/types/auth";
import { toast } from "react-toastify";

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

// --- Dashboard
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

// sellers
export const useSellersQuery = (
  page?: number,
  status?: string,
  search?: string,
  role?: string,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["users", { page, status, search, role }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchAllSellers(token, page!, status!, search!, role!),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useVerificationQuery = (page?: number, status?: string) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["sellers", { page, status }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchVerification(token, page, status),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useSuspendSellerAccount = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    // Receive variables dynamically right here 🎯
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      suspendAccount({ token, id, status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (error: any) => {
      const errMsg = error?.message || "An error occurred";
      toast.error(errMsg);
    },
  });
};

export const useApproveVerification = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    // Receive variables dynamically right here 🎯
    mutationFn: ({
      id,
      verificationStatus,
    }: {
      id: number;
      verificationStatus: string;
    }) => approveSeller({ token, id, verificationStatus }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sellers"] });

      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (error: any) => {
      const errMsg = error?.message || "An error occurred";
      toast.error(errMsg);
    },
  });
};

export const useRejectVerification = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    // Receive variables dynamically right here 🎯
    mutationFn: ({
      id,
      verificationStatus,
      reason,
    }: {
      id: number;
      verificationStatus: string;
      reason: string;
    }) => rejectSeller({ token, id, verificationStatus, reason }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sellers"] });

      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (error: any) => {
      const errMsg = error?.message || "An error occurred";
      toast.error(errMsg);
    },
  });
};

//categories
export const useCategoryQuery = (status: string) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["categories", { status }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchCategories(token, status),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

//orders
export const useOrdersQuery = (
  page?: number,
  status?: string,
  search?: string,
  paymentStatus?: string,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["orders", { page, status, search, paymentStatus }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchOrders(token, page!, status!, search!, paymentStatus!),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useDisputesQuery = (
  page?: number,
  status?: string,
  search?: string,
  raisedBy?: string,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["disputes", { page, status, search, raisedBy }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchDisputes(token, page!, status!, search!, raisedBy!),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};
