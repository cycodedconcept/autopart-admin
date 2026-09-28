"use client";

import { GmvChart } from "@/components/platform/chart";
import MetricCard from "@/components/dashboard/metricCard";
import AnalyticsHeader from "@/components/platform/analyticsHeader";
import OrderChart from "@/components/platform/orderChart";
import CategoryDistribution from "@/components/platform/categoryDistribution";
import TopSellersTable from "@/components/platform/topSellersTable";
import {
  usePlatformAnalyticsQuery,
} from "@/lib/queries";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { useState } from "react";



const Platform = () => {
  const [period, setPeriod] = useState("7d");
  const [topSeller, setTopSeller] = useState(null);
  const { data, isPending, isError, error } = usePlatformAnalyticsQuery(
    period,
    topSeller,
  );

  const platform = data?.data;
 
  const handleFilterChange = (newRange: string) => {
    setPeriod(newRange);
  };

  const getDynamicTitle = () => {
    switch (period) {
      case "7d":
        return "GMV — Last 7 Days";
      case "30d":
        return "GMV — Last 30 Days";
      case "90d":
        return "GMV — Last 90 Days";
      case "1y":
        return "GMV — Last 1 Year";
      default:
        return "GMV";
    }
  };

  const getDynamicTitleOrder = () => {
    switch (period) {
      case "7d":
        return "Orders — Last 7 Days";
      case "30d":
        return "Orders — Last 30 Days";
      case "90d":
        return "Orders — Last 90 Days";
      case "1y":
        return "Orders — Last Year";
      default:
        return "Order";
    }
  };
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
          <AnalyticsHeader
            selectedFilter={period}
            onFilterChange={handleFilterChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              // title={platformGmv?.label}
              title="gmv this month"
              value={CurrencyFormat(
                platform?.summary?.totalGmvKobo?.value ?? 0,
              )}
              // trendDirection={platform?.summary?}
              // trendLabel={platformGmv?.trend?.label}
              changePercent={platform?.summary?.totalGmvKobo?.changePercent}
              titleStyle="uppercase text-lighttext font-medium text-xs"
              divStyle=""
            />

            <MetricCard
              // title={ordersToday?.label}
              title="total orders"
              value={platform?.summary?.totalOrders?.value}
              // trendLabel={ordersToday?.trend?.label}
              // trendDirection={ordersToday?.trend?.direction}
              changePercent={platform?.summary?.totalOrders?.changePercent}
              titleStyle="uppercase text-lighttext font-medium text-xs"
              divStyle=""
            />

            <MetricCard
              title="Active Sellers"
              value={platform?.summary?.activeSellers?.value}
              // trendLabel={activeSellers?.trend?.label}
              // trendDirection={activeSellers?.trend?.direction}
              changePercent={platform?.summary?.activeSellers?.changePercent}
              titleStyle="uppercase text-lighttext font-medium text-xs"
              divStyle=""
            />

            <MetricCard
              title="Avg order value"
              value={CurrencyFormat(
                platform?.summary?.avgOrderValueKobo?.value ?? 0,
              )}
              // trendDirection="down"
              changePercent={
                platform?.summary?.avgOrderValueKobo?.changePercent
              }
              // trendLabel="vs last period"
              titleStyle="uppercase text-lighttext font-medium text-xs"
              divStyle=""
            />
          </div>
          <section className="h-125 lg:h-72 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GmvChart
              data={platform?.gmvSeries || []}
              title={getDynamicTitle()}
              selectedFilter={period}
              onFilterChange={handleFilterChange}
            />
            <OrderChart
              data={platform?.ordersByWeek}
              title={getDynamicTitleOrder()}
              selectedFilter={period}

            />
          </section>
          <section className="space-y-4">
            <CategoryDistribution />
           {platform?.topSellers && <TopSellersTable sellers={platform?.topSellers || []} />}
          </section>
        </>
      )}
    </div>
  );
};

export default Platform;
