import { useAuthStore } from "@/store/authStore";
import { LoginFormData } from "@/types/auth";
import { CategoryApiResponse } from "@/types/category";
import { FetchCompaniesResponse, OnboardPartnerPayload } from "@/types/company";
import { AdminDashboardResponse } from "@/types/dashboard";
import {
  Dispute,
  DisputeDetailsResponse,
  DisputeResponse,
} from "@/types/dispute";
import { OrderDetailsResponse, OrderListApiResponse } from "@/types/order";
import { FetchPayoutsResponse, PayoutRecord } from "@/types/payout";
import { PlatformAnalyticsResponse } from "@/types/platform";
import { FetchRidersResponse } from "@/types/rider";
import { SellerApi, UserListApiResponse } from "@/types/seller";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://autoparts.zubitechnologies.com/api/v1";

export const getHeader = (token: string | null) => {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function loginUser(data: LoginFormData) {
  const newData = {
    email: data?.email,
    password: data?.password,
  };
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error.message || "Failed to login");

  return result;
}

//dashboard
export async function fetchDashboardItems(
  token: string | null,
): Promise<AdminDashboardResponse> {
  const res = await fetch(`${BASE_URL}/admin/dashboard`, {
    method: "GET",
    headers: getHeader(token),
  });
  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Failed to fetch dashboard data");

  return result;
}

export async function platformAnalytics(
  token: string | null,
  period: string,
  topSellersLimit: number | null,
): Promise<PlatformAnalyticsResponse> {
  const params = {
    period: period,
    topSellersLimit: topSellersLimit?.toString(),
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });
  const res = await fetch(
    `${BASE_URL}/admin/analytics/platform?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );
  const result = await res.json();
  if (!res.ok)
    throw new Error(
      result.error.message || "Failed to fetch platform analytics data",
    );

  return result;
}

// sellers
export const fetchAllSellers = async (
  token: string | null,
  page?: number,
  status?: string,
  search?: string,
  role?: string,
): Promise<UserListApiResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    search: search,
    role: role,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const response = await fetch(
    `${BASE_URL}/admin/users?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Failed to fetch sellers");

  return result;
};

export const fetchVerification = async (
  token: string | null,
  page?: number,
  status?: string,
): Promise<SellerApi> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    // search: search,
    // role: role,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });
  const response = await fetch(
    `${BASE_URL}/admin/sellers?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );

  const result = await response.json();
  if (!response.ok)
    throw new Error(
      result.error.message || "Failed to fetch sellers verification data",
    );

  return result;
};

export const suspendAccount = async ({
  token,
  id,
  status,
}: {
  token: string | null;
  id: number;
  status: string;
}) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}/status`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ status }),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Unable to suspend account");

  return result;
};

export const approveSeller = async ({
  token,
  id,
  verificationStatus,
}: {
  token: string | null;
  id: number;
  verificationStatus: string;
}) => {
  const res = await fetch(`${BASE_URL}/admin/sellers/${id}/verification`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ verificationStatus }),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Unable to suspend account");

  return result;
};

export const rejectSeller = async ({
  token,
  id,
  verificationStatus,
  reason,
}: {
  token: string | null;
  id: number;
  verificationStatus: string;
  reason: string;
}) => {
  const res = await fetch(`${BASE_URL}/admin/sellers/${id}/verification`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ verificationStatus, rejectionReason: reason }),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Unable to suspend account");

  return result;
};

//categories
export const fetchCategories = async (
  token: string | null,
  status: string,
): Promise<CategoryApiResponse> => {
  const queryParams = new URLSearchParams({
    status: status,
  });

  const response = await fetch(
    `${BASE_URL}/admin/categories?${queryParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );
  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch categories");

  return result;
};

// orders
export const fetchOrders = async (
  token: string | null,
  page?: number,
  status?: string,
  search?: string,
  paymentStatus?: string,
): Promise<OrderListApiResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    search: search,
    paymentStatus: paymentStatus,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const response = await fetch(
    `${BASE_URL}/admin/orders?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );
  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch orders");

  return result;
};

export const fetchSingleOrder = async (
  token: string | null,
  orderId: number,
): Promise<OrderDetailsResponse> => {
  const response = await fetch(`${BASE_URL}/admin/orders/${orderId}`, {
    method: "GET",
    headers: getHeader(token),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch order");

  return result;
};

export const updateOrderStatus = async (
  token: string | null,
  orderId: number,
  status: string,
  note: string,
): Promise<OrderDetailsResponse> => {
  const response = await fetch(`${BASE_URL}/admin/orders/${orderId}/status`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ status, note }),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to update order status");

  return result;
};

export const fetchDisputes = async (
  token: string | null,
  page?: number,
  status?: string,
  search?: string,
  raisedBy?: string,
  sellerId?: string,
  dateFrom?: string,
  dateTo?: string,
): Promise<DisputeResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    search: search,
    raisedBy: raisedBy,
    sellerId: sellerId,
    dateFrom: dateFrom,
    dateTo: dateTo,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const response = await fetch(
    `${BASE_URL}/admin/disputes?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch disputes");

  return result;
};

export const fetchSingleDispute = async (
  token: string | null,
  disputeId: number,
): Promise<DisputeDetailsResponse> => {
  const response = await fetch(`${BASE_URL}/admin/disputes/${disputeId}`, {
    method: "GET",
    headers: getHeader(token),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch dispute");

  return result;
};

export const updateDisputeStatus = async (
  token: string | null,
  disputeId: number,
  status: string,
  note: string,
): Promise<DisputeDetailsResponse> => {
  const response = await fetch(`${BASE_URL}/admin/disputes/${disputeId}`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ status, resolutionNote: note }),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to update dispute status");

  return result;
};

// riders and companies logistics
export const fetchCompanies = async (
  token: string | null,
  page?: number,
  status?: string,
  search?: string,
): Promise<FetchCompaniesResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    search: search,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const response = await fetch(
    `${BASE_URL}/admin/logistics/companies?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch companies");

  return result;
};

export const fetchCompaniesRiders = async (
  token: string | null,
  page?: number,
  status?: string,
  companyId?: string | null,
): Promise<FetchRidersResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    companyId: companyId,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const response = await fetch(
    `${BASE_URL}/admin/logistics/riders?${searchParams.toString()}`,
    {
      method: "GET",
      headers: getHeader(token),
    },
  );

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to fetch company's riders");

  return result;
};

export async function onboardPartnerRequest(
  payload: OnboardPartnerPayload,
  token: string | null,
): Promise<FetchCompaniesResponse> {
  const response = await fetch("/api/v1/logistics/companies/onboard", {
    method: "POST",
    headers: getHeader(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || "Failed to onboard partner company");
  }

  return response.json();
}

export const approveLogisticCompany = async ({
  token,
  id,
  status,
}: {
  token: string | null;
  id: number;
  status: string;
}) => {
  const res = await fetch(`${BASE_URL}/admin/logistics/companies/${id}/status`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ status }),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Unable to approve company");

  return result;
};

//payout approval

export const getPayouts = async ({
  token,
  companyId,
  payeeType,
  status,
  sellerId,
  search,
  page
}: {
  token: string | null;
  companyId?: number | null;
  sellerId?: number | null;
  payeeType?: string;
  status?: string;
  search?: string;
  page?: number;
}): Promise<FetchPayoutsResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    search: search,
    sellerId: sellerId?.toString(),
    payeeType: payeeType,
    companyId: companyId?.toString(),
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });
  const res = await fetch(`${BASE_URL}/admin/payouts?${searchParams.toString()} `, {
    method: "GET",
    headers: getHeader(token),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Unable to get payout");

  return result;
};

export const updatePayout = async (
  token: string | null,
  payoutId: number,
  status: string,
  note?: string,
): Promise<FetchPayoutsResponse> => {
  const response = await fetch(`${BASE_URL}/admin/payouts/${payoutId}`, {
    method: "PATCH",
    headers: getHeader(token),
    body: JSON.stringify({ status, rejectionReason: note }),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error.message || "Unable to update payout");

  return result;
};

//blog

export const getBlogs = async ({
  token,
  page,
  per_page,
  sort,
  search,
}: {
  token: string | null;
  page?: number | null;
  per_page?: number | null;
  sort?: string | null;
  search?: string | null;
}): Promise<BlogPostsResponse> => {
  const params = {
    page: page?.toString(),
    per_page: per_page?.toString() ,
    sort: sort,
    search: search,
  };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Only append if the value is not an empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });
  const res = await fetch(`${BASE_URL}/blog/posts?${searchParams.toString()} `, {
    method: "GET",
    headers: getHeader(token),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.error.message || "Unable to get blog posts");

  return result;
};