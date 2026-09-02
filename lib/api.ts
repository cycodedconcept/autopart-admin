import { useAuthStore } from "@/store/authStore";
import { LoginFormData } from "@/types/auth";
import { CategoryApiResponse } from "@/types/category";
import { AdminDashboardResponse } from "@/types/dashboard";
import { DisputeResponse } from "@/types/dispute";
import { OrderListApiResponse } from "@/types/order";
import {
  SellerApi,
  SellerApiResponse,
  SellerReviewQueueData,
  SellerReviewQueueResponse,
  UserListApiResponse,
} from "@/types/seller";

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
  if (!res.ok) throw new Error("Invalid credentials");
  const result = await res.json();
  return result;
}

export async function fetchDashboardItems(
  token: string | null,
): Promise<AdminDashboardResponse> {
  const res = await fetch(`${BASE_URL}/admin/dashboard`, {
    method: "GET",
    headers: getHeader(token),
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
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

  if (!response.ok) {
    throw new Error(`Server returned error status code: ${response.status}`);
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error(`Server returned error status code: ${response.status}`);
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error(`Server returned error status code: ${response.status}`);
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error(`Server returned error status code: ${response.status}`);
  }

  return response.json();
};

export const fetchDisputes = async (
  token: string | null,
  page?: number,
  status?: string,
  search?: string,
  raisedBy?: string,
): Promise<DisputeResponse> => {
  const params = {
    page: page?.toString(),
    limit: "10",
    status: status,
    search: search,
    raisedBy: raisedBy,
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

  if (!response.ok) {
    throw new Error(`Server returned error status code: ${response.status}`);
  }

  return response.json();
};
