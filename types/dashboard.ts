export interface AdminDashboardResponse {
  success: boolean;
  data: DashboardData;
  message: string;
}

export interface DashboardData {
  generatedAt: string; // ISO Date string
  commissionRatePercent: number;
  comparison: PeriodComparison;
  alerts: DashboardAlerts;
  overviewCards: OverviewCards;
  operationalCards: OperationalCards;
  sellerVerificationQueue: DataQueue<any>; // Replace 'any' with Seller type if available
  openDisputes: DisputeQueue;
  recentOrders: DataQueue<any>; // Replace 'any' with Order type if available
  topSellers: DataQueue<any>; // Replace 'any' with Seller type if available
  platformHealth: PlatformHealth;
  payoutQueue: PayoutQueue;
  recentActivity: any[];
}
export interface PeriodComparison {
  currentPeriod: DateRange;
  previousPeriod: DateRange;
}

export interface DateRange {
  dateFrom: string; // YYYY-MM-DD
  dateTo: string; // YYYY-MM-DD
}

export interface DashboardAlerts {
  openDisputes: DisputeAlert;
  pendingVerifications: BaseAlert;
  payoutRequests: PayoutAlert;
}

export interface BaseAlert {
  label: string;
  severity: 'healthy' | 'warning' | 'critical';
  count: number;
}

export interface DisputeAlert extends BaseAlert {
  count: number;
  urgentCount: number;
  reviewSlaHours: number;
}

export interface PayoutAlert extends BaseAlert {
  count: number;
  pendingAmountKobo: number;
  currency: string;
}

export interface OverviewCards {
  totalRevenue: FinancialMetricCard;
  activeSellers: CountMetricCard;
  ordersToday: CountMetricCard;
  platformGmv: FinancialMetricCard;
}

export interface TrendData {
  label: string;
  direction: 'up' | 'down' | 'flat';
  changePercent: number;
  delta: number;
  currentValue: number;
  previousValue: number;
}

export interface FinancialMetricCard {
  label: string;
  valueKobo: number;
  currency: string;
  trend: TrendData;
}

export interface CountMetricCard {
  label: string;
  value: number;
  trend: TrendData;
}

export interface OperationalCards {
  disputeRate: PercentOperationalCard;
  averagePayoutTime: PayoutTimeOperationalCard;
  verificationQueue: CountOperationalCard;
  failedPayouts: CountOperationalCard;
}

export interface PercentOperationalCard {
  label: string;
  valuePercent: number;
  status: string;
}

export interface PayoutTimeOperationalCard {
  label: string;
  valueDays: number | null;
  status: string;
}

export interface CountOperationalCard {
  label: string;
  value: number;
  status: string;
}

export interface PlatformHealth {
  status: string;
  revenueMix: RevenueMixItem[];
  metrics: PlatformHealthMetrics;
}

export interface RevenueMixItem {
  label: string;
  amountKobo: number;
  percentage: number;
}

export interface PlatformHealthMetrics {
  disputeResolutionRatePercent: number;
  payoutCompletionRatePercent: number;
  sellerApprovalRatePercent: number;
}

export interface DataQueue<T> {
  total: number;
  items: T[];
}

export interface DisputeQueue extends DataQueue<any> {
  reviewSlaHours: number;
}

export interface PayoutQueue extends DataQueue<any> {
  pendingAmountKobo: number;
  currency: string;
}
