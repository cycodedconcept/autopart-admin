import { Company, Pagination, Rider, Zone } from "./rider";

export type DeliveryJobStatus =
  | "pending"
  | "assigned"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed"
  | "cancelled";

export interface DeliveryJob {
  id: number;
  jobCode: string;
  orderId: number;
  orderItemId: number;
  sellerId: number;
  zoneId: number | null;
  companyId: number | null;
  riderId: number | null;
  status: DeliveryJobStatus | string;
  failureReason: string | null;
  pickupAddress: string;
  assignedAt: string | null;
  pickedUpAt: string | null;
  inTransitAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  zone: Zone | null;
  order: {
    id: number;
    status: string;
    paymentMethod: string;
    paymentReference: string;
    paymentStatus: string;
    totalKobo: number;
    deliveryAddress: {
      id: number;
      label: string;
      street: string;
      city: string;
      state: string;
      phone: string;
    } | null;
  } | null;
  item: {
    id: number;
    productId: number;
    title: string;
    partNumber: string;
    quantity: number;
    lineTotalKobo: number;
    itemStatus: string;
  } | null;
  buyer: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
  } | null;
  seller: {
    id: number;
    userId: number;
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    fullName: string;
    email: string;
    phone: string;
  } | null;
  assignedCompany: Company | null;
  assignedRider: Rider | null;
}

export interface DeliveryJobsSummary {
  jobsByStatus: {
    total: number;
    pending: number;
    assigned: number;
    picked_up: number;
    in_transit: number;
    delivered: number;
    failed: number;
    cancelled: number;
  };
  deliveryMetrics: {
    totalJobsCount: number;
    unassignedJobsCount: number;
    activeJobsCount: number;
    deliveredJobsCount: number;
    failedJobsCount: number;
    completionRatePercent: number;
    deliveryFeesKobo: number;
    platformMarginKobo: number;
    companyShareKobo: number;
    averageDeliveryFeeKobo: number;
  };
}

export interface FetchDeliveryJobsResponse {
  success: boolean;
  data: {
    jobs: DeliveryJob[];
    pagination: Pagination;
    filters: {
      companyId: number | null;
      riderId: number | null;
      status: string | null;
      search: string | null;
    };
    summary: DeliveryJobsSummary;
  };
  message: string;
}

export interface AssignDeliveryJobPayload {
  riderId: number;
  note?: string;
}
