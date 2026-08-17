import { useAuthStore } from "@/store/authStore";
import { LoginFormData } from "@/types/auth";
import { AdminDashboardResponse } from "@/types/dashboard";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://autopart-backend-production-2b3b.up.railway.app/api/v1";

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

export async function fetchDashboardItems(token: string | null):Promise<AdminDashboardResponse> {
  
  const res = await fetch(`${BASE_URL}/admin/dashboard`,{
    method: "GET",
    headers: getHeader(token)
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data
}
