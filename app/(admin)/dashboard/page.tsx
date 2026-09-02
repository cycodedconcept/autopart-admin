"use client";

import AlertBanner from "@/components/dashboard/alertBanner";
import MetricGrid from "@/components/dashboard/metricGrid";
import { useDashboardQuery } from "@/lib/queries";
import {
  SellerVerification
} from "@/components/dashboard/sellerVerification";
import {
  OpenDisputeItem,
  OpenDisputes,
} from "@/components/dashboard/openDisputes";
import RecentOrders from "@/components/dashboard/recentOrders";
import { TopSellers } from "@/components/dashboard/topSellers";
import { PlatformHealth } from "@/components/dashboard/platformHealth";
import { RecentActivity } from "@/components/dashboard/recentActivity";
import {
  PayoutQueue,
  PayoutQueueItem,
} from "@/components/dashboard/payoutQueue";
import { GmvChart } from "@/components/dashboard/gmvChart";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const router = useRouter()
  // Fetch your data here at the page level
  const { data, isPending, isError, error } = useDashboardQuery();
  console.log(data);

  const handleViewAllSellers = () => {
    router.push("/sellers/verification-queue")
   
  };
  const mockDisputes: OpenDisputeItem[] = [
    {
      orderId: "#ORD-9921A",
      reason: "Wrong engine block size delivered",
      time: 2,
      status: "open",
    },
    {
      orderId: "#ORD-9844B",
      reason: "Damaged side mirror casing",
      time: 5,
      status: "open",
    },
    {
      orderId: "#ORD-9710F",
      reason: "Counterfeit break pads suspected",
      time: 9,
      status: "in review",
    },
    {
      orderId: "#ORD-9532C",
      reason: "Missing electrical wire harness",
      time: 48,
      status: "open",
    },
  ];

 
  const mockPayouts: PayoutQueueItem[] = [
    {
      id: "p-01",
      sellerName: "AutoFix Lagos",
      amount: 142000,
      status: "Pending",
    },
    {
      id: "p-02",
      sellerName: "Kamal Motors",
      amount: 98500,
      status: "Pending",
    },
    {
      id: "p-03",
      sellerName: "SpeedParts Abuja",
      amount: 71200,
      status: "Pending",
    },
    {
      id: "p-04",
      sellerName: "DriveFit Supplies",
      amount: 204000,
      status: "Held",
    },
    {
      id: "p-05",
      sellerName: "PartsPro Hub",
      amount: 55800,
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-4">
      {isPending ? (
        <div className="p-6 text-center animate-pulse">
          Loading dashboard metrics...
        </div>
      ) : isError ? (
        <div className="p-6 text-red-500">Error: {error?.message}</div>
      ) : (
        <>
          <AlertBanner data={data?.data?.alerts} />
          <MetricGrid
            operational={data?.data?.operationalCards}
            overview={data?.data?.overviewCards}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-3">
              <SellerVerification
                data={data?.data?.sellerVerificationQueue?.items}
                onViewAll={handleViewAllSellers}
              />
            </div>
            <div className="lg:col-span-2">
              <OpenDisputes
                data={mockDisputes}
                onViewAll={()=> router.push("/orders/disputes")}
              />
            </div>
          </div>

          {/* Row 2: Orders, Sellers, and Platform Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <RecentOrders data={data?.data?.recentOrders?.items} />
            <TopSellers data={data?.data?.topSellers?.items} />
            <PlatformHealth metrics={data?.data?.platformHealth?.revenueMix} />
          </div>

          {/* Row 3: Trends, Activity, and Payouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* <GmvTrendChart /> */}
            <div className="">

            <GmvChart
              data={data?.data?.recentOrders?.items}
              title="GMV trend (last 7 days)"
             
              onFilterChange={handleViewAllSellers}
            />
            </div>
            <RecentActivity activities={data?.data?.recentActivity} />
            <PayoutQueue
              data={mockPayouts}
              onViewAll={() => console.log("View all click event triggered")}
              onApprove={(id) =>
                console.log(`Approved payout row item matching ID: ${id}`)
              }
              onHoldAndFlag={(id) =>
                console.log(
                  `Flagged and held matching reference instance ID: ${id}`,
                )
              }
              onViewDetails={(id) =>
                console.log(
                  `Opening full item record panel layout view for ID: ${id}`,
                )
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
