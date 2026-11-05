export interface MetricValue {
  value: number | null;
  changePercent: number | null;
}

export interface AnalyticsSummary {
  totalGmvKobo: MetricValue;
  totalOrders: MetricValue;
  activeSellers: MetricValue;
  avgOrderValueKobo: MetricValue;
}

export interface GmvSeriesNode {
  bucket: string; // Format: "YYYY-MM-DD"
  gmvKobo: number;
}

export interface OrdersByWeekNode {
  weekLabel: string; // Format: "YYYY-MM-DD"
  orderCount: number;
}

// Placeholder types for future structure updates
export interface CategoryBreakdownNode {
  category: string;
  count: number;
  [key: string]: any;
}

export interface RevenueByCategoryNode {
  category: string;
  revenueKobo: number;
  [key: string]: any;
}

export interface TopSellerNode {

  sellerName: string;
  totalVolumeKobo: number;
  [key: string]: any;
   rank?: number;
  businessName?: string;
  location?: string;
  gmvKobo?: number;
  orderCount?: number;
  rating?: number;
  sellerId?: number;
}

export interface AnalyticsDataPayload {
  period: '7d' | '30d' | '90d' | '1y' | string;
  timezone: string;
  dateFrom: string; // Format: "YYYY-MM-DD"
  dateToExclusive: string; // Format: "YYYY-MM-DD"
  summary: AnalyticsSummary;
  gmvSeries: GmvSeriesNode[];
  ordersByWeek: OrdersByWeekNode[];
  categoryBreakdown: CategoryBreakdownNode[];
  revenueByCategory: RevenueByCategoryNode[];
  topSellers: TopSellerNode[];
}

export interface PlatformAnalyticsResponse {
  success: boolean;
  data: AnalyticsDataPayload;
  message: string;
}
