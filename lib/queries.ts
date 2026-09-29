"use client";

import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
  UseQueryOptions,
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
  fetchSingleOrder,
  platformAnalytics,
  updateOrderStatus,
  fetchSingleDispute,
  updateDisputeStatus,
  fetchCompaniesRiders,
  fetchCompanies,
  onboardPartnerRequest,
  approveLogisticCompany,
  getPayouts,
  updatePayout,
  getBlogs,
} from "./api";
import { useAuthStore } from "@/store/authStore";
import { ApiErrorPayload, AuthUserResponse, LoginFormData } from "@/types/auth";
import { toast } from "react-toastify";
import { FetchRidersResponse } from "@/types/rider";
import { FetchCompaniesResponse, OnboardPartnerPayload } from "@/types/company";

// 🔑 Centralized cache tracking keys
export const QUERY_KEYS = {
  inventory: ["inventory"] as const,
  dashboard: ["dashboard"] as const,
  warehouseDetails: (id: string) => ["inventory", id] as const,
  platformAnalytics: (token: string | null) =>
    ["platformAnalytics", token] as const,
};

// AUTH
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

// Dashboard
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

export function usePlatformAnalyticsQuery(
  period: string,
  topSellersLimit: number | null,
) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["platformAnalytics", { token, period, topSellersLimit }],

    // Pass the token safely into the function execution
    queryFn: () => platformAnalytics(token, period, topSellersLimit),

    // 🛑 BLOCKER: Prevents the API request from running if token is null
    enabled: !!token,

    staleTime: 1000 * 60 * 5,
  });
}

// Sellers
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

// Categories
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

// Orders
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

export const useSingleOrderQuery = (orderId: number) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["orders", { orderId }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchSingleOrder(token, orderId),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useOrderStatusQuery = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: ({
      orderId,
      status,
      note,
    }: {
      orderId: number;
      status: string;
      note: string;
    }) => updateOrderStatus(token, orderId, status, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

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

export const useDisputesQuery = (
  page?: number,
  status?: string,
  search?: string,
  raisedBy?: string,
  sellerId?: string,
  dateFrom?: string,
  dateTo?: string,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: [
      "disputes",
      { page, status, search, raisedBy, sellerId, dateFrom, dateTo },
    ],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () =>
      fetchDisputes(
        token,
        page!,
        status!,
        search!,
        raisedBy!,
        sellerId!,
        dateFrom!,
        dateTo!,
      ),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useSingleDisputeQuery = (disputeId: number) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["disputes", { disputeId }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchSingleDispute(token, disputeId),

    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useDisputeStatusQuery = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: ({
      disputeId,
      status,
      note,
    }: {
      disputeId: number;
      status: string;
      note: string;
    }) => updateDisputeStatus(token, disputeId, status, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });

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

// Riders and Logistics
export const useCompanyQuery = (
  page?: number,
  status?: string,
  search?: string,
  options?: Omit<
    UseQueryOptions<FetchCompaniesResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["logistics", { page, status, search }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchCompanies(token, page!, status!, search!),
    ...options,
    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useCompanyRiderQuery = (
  page?: number,
  status?: string,
  companyId?: string | null,
  options?: Omit<
    UseQueryOptions<FetchRidersResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["riders", { page, status, companyId }],

    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => fetchCompaniesRiders(token, page!, status!, companyId!),
    ...options,
    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,

    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useOnboardPartnerMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (data: OnboardPartnerPayload) =>
      onboardPartnerRequest(data, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["logistics"] });

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

export const useApproveLogisticCompany = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    // Receive variables dynamically right here 🎯
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      approveLogisticCompany({ token, id, status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["logistics"] });

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

// Payouts
export const usePayoutsQuery = (
  page?: number,
  status?: string,
  payeeType?: string,
  search?: string,
  companyId?: number | null,
  sellerId?: number | null,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: [
      "payouts",
      { page, status, payeeType, search, companyId, sellerId },
    ],
    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () =>
      getPayouts({
        token,
        page,
        status,
        payeeType,
        search,
        companyId,
        sellerId,
      }),
    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,
    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};

export const useUpdatePayoutMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    // Receive variables dynamically right here 🎯
    mutationFn: ({
      id,
      status,
      note,
    }: {
      id: number;
      status: string;
      note?: string;
    }) => updatePayout(token, id, status, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payouts"] });

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

// Blogs

export const useBlogsQuery = (
  page?: number,
  per_page?: number,
  sort?: string,
  search?: string,
) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    // 1. Sync Driver: The key registers variables as absolute dependencies
    queryKey: ["blogs", { page, per_page, sort, search }],
    // 2. Resolver: Automatically passes changing keys into your API client call
    queryFn: () => getBlogs({ token, page, per_page, sort, search }),
    // 3. UX Optimization: Prevents the UI layout from flickering/blanking out during fetches
    placeholderData: keepPreviousData,
    enabled: !!token,
    // Optional: Tailor cache lifetimes based on how fluid your queue data shifts
    staleTime: 5000,
  });
};
