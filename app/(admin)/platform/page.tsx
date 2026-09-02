"use client";

import { GmvChart } from "@/components/platform/chart";
import MetricCard from "@/components/dashboard/metricCard";
import AnalyticsHeader from "@/components/platform/analyticsHeader";
import OrderChart from "@/components/platform/orderChart";
import CategoryDistribution from "@/components/platform/categoryDistribution";
import TopSellersTable from "@/components/platform/topSellersTable";
import { useCategoryQuery, useDashboardQuery } from "@/lib/queries";
import CurrencyFormat from "@/components/atoms/currencyFormat";

const sellersData = [
  {
    rank: 1,
    name: "Chukwuemeka Auto Parts",
    location: "Lagos",
    gmv: "₦1,240,000",
    orders: 87,
    rating: 4.9,
  },
  {
    rank: 2,
    name: "Adeyemi Motors Ltd",
    location: "Ibadan",
    gmv: "₦980,000",
    orders: 64,
    rating: 4.7,
  },
  {
    rank: 3,
    name: "Nnamdi Spare Parts",
    location: "Enugu",
    gmv: "₦875,000",
    orders: 59,
    rating: 4.8,
  },
  {
    rank: 4,
    name: "Tunde & Sons Auto",
    location: "Abuja",
    gmv: "₦742,000",
    orders: 51,
    rating: 4.6,
  },
];

const Platform = () => {
  const { data, isPending, isError, error } = useDashboardQuery();
const {data: category} = useCategoryQuery("all")

  const handleViewAllSellers = () => {
    console.log("Navigating to full verification management view...");
  };
  const { activeSellers, ordersToday, platformGmv, totalRevenue } =
    data?.data?.overviewCards ?? {};

  return (
    <div className="space-y-4">
      {isPending ? (
        <div className="p-6 text-center animate-pulse">
          Loading platform metrics...
        </div>
      ) : isError ? (
        <div className="p-6 text-red-500">Error: {error?.message}</div>
      ) : (
      <>
      <AnalyticsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          // title={platformGmv?.label}
          title="gmv this month"
          value={CurrencyFormat(platformGmv?.currency).format(
            platformGmv?.trend.currentValue ?? 0,
          )}
          trendDirection={platformGmv?.trend?.direction}
          trendLabel={platformGmv?.trend?.label}
          changePercent={platformGmv?.trend?.changePercent}
          titleStyle="uppercase text-lighttext font-medium text-xs"
          divStyle=""
        />

        <MetricCard
          // title={ordersToday?.label}
          title="total orders"
          value={ordersToday?.value}
          trendLabel={ordersToday?.trend?.label}
          trendDirection={ordersToday?.trend?.direction}
          changePercent={ordersToday?.trend?.changePercent}
          titleStyle="uppercase text-lighttext font-medium text-xs"
          divStyle=""
        />

        <MetricCard
          title={activeSellers?.label}
          value={activeSellers?.value}
          trendLabel={activeSellers?.trend?.label}
          trendDirection={activeSellers?.trend?.direction}
          changePercent={activeSellers?.trend?.changePercent}
          titleStyle="uppercase text-lighttext font-medium text-xs"
          divStyle=""
        />

        <MetricCard
          title="Avg order value"
          value="15,355"
          trendDirection="down"
          changePercent="-2"
          trendLabel="vs last period"
          titleStyle="uppercase text-lighttext font-medium text-xs"
          divStyle=""
        />
      </div>
      <section className="h-125 lg:h-72 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GmvChart
          data={data?.data?.recentOrders?.items}
          title="GMV trend — Last 30 days"
          onFilterChange={handleViewAllSellers}
        />
        <OrderChart  data={data?.data?.recentOrders?.items} />
      </section>
      <section className="space-y-4">
        <CategoryDistribution />
        <TopSellersTable sellers={data?.data?.topSellers?.items} />
      </section>
      </>)}
    </div>
  );
};

export default Platform;
