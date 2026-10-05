export interface CategoryCommission {
  categoryId: number;
  ratePercent: number;
}

export interface SellerTierCommission {
  tier: 'gold' | 'silver' | 'bronze' | string; // Use string union for known tiers
  ratePercent: number;
}

export interface PlatformSettings {
  payoutBatchCutoffHour: number; // 24-hour format (e.g., 18 for 6:00 PM)
}

export interface PlatformConfigData {
  commissionRateDefault: number;
  commissionRatesByCategory: CategoryCommission[];
  commissionRatesBySellerTier: SellerTierCommission[];
  platformSettings: PlatformSettings;
}

export interface PlatformConfigResponse {
  success: boolean;
  data: PlatformConfigData;
  message: string;
}
