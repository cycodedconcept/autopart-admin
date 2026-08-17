"use client";

import { GmvChart, GmvDataPoint } from "@/components/platform/chart";
import MetricCard from "@/components/dashboard/metricCard";
import AnalyticsHeader from "@/components/platform/analyticsHeader";
import StatCard from "@/components/platform/statCard";
import OrderChart from "@/components/platform/orderChart";
import CategoryDistribution from "@/components/platform/categoryDistribution";
import TopSellersTable from "@/components/platform/topSellersTable";

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

const mockGmvHistory: GmvDataPoint[] = [
  { date: "Jul 31", gmvValue: 24000000 },
  { date: "Aug 01", gmvValue: 28500000 },
  { date: "Aug 02", gmvValue: 21000000 },
  { date: "Aug 03", gmvValue: 34000000 },
  { date: "Aug 04", gmvValue: 29000000 },
  { date: "Aug 05", gmvValue: 41000000 },
  { date: "Aug 06", gmvValue: 42800000 },
];
const Platform = () => {
  const handleViewAllSellers = () => {
    console.log("Navigating to full verification management view...");
  };

  return (
    <div className="space-y-4">
      <AnalyticsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="GMV this month"
          value="₦6.4M"
          trendDirection="up"
          changePercent="8"
          trendLabel="vs last period"
          titleStyle="uppercase text-lighttext font-medium text-xs"
          divStyle=""
        />
        <MetricCard
          title="Total orders"
          value="412"
          trendDirection="up"
          changePercent="34"
          trendLabel="vs last month"
          titleStyle="uppercase text-lighttext font-medium text-xs"
          divStyle=""
        />
        <MetricCard
          title="Active sellers"
          value="87"
          trendDirection="up"
          changePercent="8"
          trendLabel="vs last period"
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
          data={mockGmvHistory}
          title="GMV trend — Last 30 days"
          totalGmv="₦142.8M"
          percentageGrowth={14.6}
          onFilterChange={handleViewAllSellers}
        />
        <OrderChart />
      </section>
      <section className="space-y-4">
        <CategoryDistribution />
        <TopSellersTable sellers={sellersData} />
      </section>
    </div>
  );
};

export default Platform;
