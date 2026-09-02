import { OperationalCards, OverviewCards } from "@/types/dashboard";
import MetricCard from "./metricCard";
import CurrencyFormat from "../atoms/currencyFormat";
import {
  WalletIcon,
  ShoppingCartIcon,
  UsersIcon,
  WarningTriangleIcon,
} from "../atoms/Icons";

interface MetricData {
  title: string | undefined;
  value: string | undefined;

  trendType: "positive" | "negative" | "neutral";
  subtext?: string;
  subtextType?: "warning" | "neutral";
}

export default function MetricGrid({
  operational,
  overview,
}: {
  operational: OperationalCards | undefined;
  overview: OverviewCards | undefined;
}) {
  const { averagePayoutTime, disputeRate, failedPayouts, verificationQueue } =
    operational ?? {};

  const { activeSellers, ordersToday, platformGmv, totalRevenue } =
    overview ?? {};

  const grv = {
    imgg: { WalletIcon },
    imgColor: "#FF7101",
    bgColor: "bg-[#FFF4EE]",
  };
  const order = {
    imgg: { ShoppingCartIcon },
    imgColor: "#185FA5",
    bgColor: "bg-[#E8EFF9]",
  };
  const user = {
    imgg: { UsersIcon },
    imgColor: "#1DBF73",
    bgColor: "bg-[#E8FFF4]",
  };
  const dispute = {
    imgg: { WarningTriangleIcon },
    imgColor: "#FB3636",
    bgColor: "bg-[#FFF1F1]",
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* {metricsData.map((metric, index) => (
      ))} */}
      <MetricCard
        title={platformGmv?.label}
        value={CurrencyFormat(platformGmv?.currency).format(
          platformGmv?.trend.currentValue ?? 0,
        )}
        trendImage={grv}
        trendDirection={platformGmv?.trend?.direction}
        trendLabel={platformGmv?.trend?.label}
        subtext={platformGmv?.trend?.label}
        changePercent={platformGmv?.trend?.changePercent}
      />

      <MetricCard
        title={ordersToday?.label}
        value={ordersToday?.value}
        trendLabel={ordersToday?.trend?.label}
        trendImage={order}
        trendDirection={ordersToday?.trend?.direction}
        subtext={ordersToday?.trend?.label}
        changePercent={ordersToday?.trend?.changePercent}
      />
      <MetricCard
        title={averagePayoutTime?.label}
        value={averagePayoutTime?.valueDays ?? 0}
        status={averagePayoutTime?.status}
        trendImage={user}
      />
      <MetricCard
        title={disputeRate?.label}
        value={disputeRate?.valuePercent}
        status={disputeRate?.status}
        trendImage={dispute}
      />
      <MetricCard
        title={failedPayouts?.label}
        value={failedPayouts?.value}
        status={failedPayouts?.status}
      />
      <MetricCard
        title={verificationQueue?.label}
        value={verificationQueue?.value}
        status={verificationQueue?.status}
      />
      <MetricCard
        title={activeSellers?.label}
        value={activeSellers?.value}
        trendLabel={activeSellers?.trend?.label}
        trendDirection={activeSellers?.trend?.direction}
        subtext={activeSellers?.trend?.label}
        changePercent={activeSellers?.trend?.changePercent}
      />

      <MetricCard
        title={totalRevenue?.label}
        value={CurrencyFormat(totalRevenue?.currency).format(
          totalRevenue?.trend.currentValue ?? 0,
        )}
        trendLabel={totalRevenue?.trend?.label}
        trendDirection={totalRevenue?.trend?.direction}
        subtext={totalRevenue?.trend?.label}
        changePercent={totalRevenue?.trend?.changePercent}
      />
    </div>
  );
}
