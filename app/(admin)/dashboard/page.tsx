"use client";
import TopHeader from "@/components/layout/topHeader";
import AlertBanner from "@/components/dashboard/alertBanner";
import MetricGrid from "@/components/dashboard/metricGrid";
import { useDashboardQuery } from "@/lib/queries";
import {
  SellerVerification,
  SellerVerificationItem,
} from "@/components/dashboard/sellerVerification";
import {
  OpenDisputeItem,
  OpenDisputes,
} from "@/components/dashboard/openDisputes";
import RecentOrders from "@/components/dashboard/recentOrders";
import { TopSellers } from "@/components/dashboard/topSellers";
import { PlatformHealth } from "@/components/dashboard/platformHealth";
import { RecentActivity } from "@/components/dashboard/recentActivity";
import { PayoutQueue, PayoutQueueItem } from "@/components/dashboard/payoutQueue";
import { GmvChart, GmvDataPoint } from "@/components/dashboard/gmvChart";
// import VerificationQueue from "@/components/dashboard/VerificationQueue";
// import OpenDisputes from "@/components/dashboard/OpenDisputes";
// import RecentOrders from "@/components/dashboard/RecentOrders";
// import TopSellers from "@/components/dashboard/TopSellers";
// import PlatformHealth from "@/components/dashboard/PlatformHealth";
// import GmvTrendChart from "@/components/dashboard/GmvTrendChart";
// import RecentActivity from "@/components/dashboard/RecentActivity";
// import PayoutQueue from "@/components/dashboard/PayoutQueue";

export default function DashboardPage() {
  // Fetch your data here at the page level
  const { data, isPending, isError, error } = useDashboardQuery();
  console.log(data);
  const mockSellers: SellerVerificationItem[] = [
    {
      name: "Ladipo Auto Spares Ltd",
      type: "Corporate Entity",
      location: "Lagos, Nigeria",
      status: "Pending CAC",
    },
    {
      name: "Chidi & Sons Mechatronics",
      type: "Individual Trader",
      location: "Nnewi, Nigeria",
      status: "Pending Review",
    },
    {
      name: "Express Tokunbo Hub",
      type: "Corporate Entity",
      location: "Abuja, Nigeria",
      status: "Flagged",
    },
    {
      name: "Kano Motor Parts Plaza",
      type: "Individual Trader",
      location: "Kano, Nigeria",
      status: "Pending Review",
    },
  ];
  const handleViewAllSellers = () => {
    console.log("Navigating to full verification management view...");
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

  const myD = [
    {
      orderId: 6,
      orderCode: "#ORD-0006",
      sellerLabel: "Prime Auto Hub",
      sellerCount: 1,
      totalKobo: 15600000,
      status: "picked_up",
      paymentStatus: "paid",
      createdAt: "2026-07-05T12:08:44.000Z",
    },
    {
      orderId: 5,
      orderCode: "#ORD-0005",
      sellerLabel: "Prime Auto Hub",
      sellerCount: 1,
      totalKobo: 15600000,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2026-07-03T12:10:00.000Z",
    },
    {
      orderId: 4,
      orderCode: "#ORD-0004",
      sellerLabel: "Prime Auto Hub",
      sellerCount: 1,
      totalKobo: 3700000,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2026-07-01T07:43:56.000Z",
    },
    {
      orderId: 2,
      orderCode: "#ORD-0002",
      sellerLabel: "Northern Truck Parts +1 more",
      sellerCount: 2,
      totalKobo: 17450000,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2026-06-30T20:17:15.000Z",
    },
    {
      orderId: 1,
      orderCode: "#ORD-0001",
      sellerLabel: "Naija OEM Spares +1 more",
      sellerCount: 2,
      totalKobo: 4350000,
      status: "pending_payment",
      paymentStatus: "pending",
      createdAt: "2026-06-30T14:50:39.000Z",
    },
  ];
  const top = [
    {
      rank: 1,
      sellerId: 1,
      userId: 3,
      businessName: "Prime Auto Hub",
      fullName: "Uche Okafor",
      email: "zubitechinc@gmail.com",
      phone: "+2348012345678",
      totalOrders: 2,
      totalItems: 6,
      grossSalesKobo: 31200000,
    },
    {
      rank: 2,
      sellerId: 9005,
      userId: 9105,
      businessName: "Northern Truck Parts",
      fullName: "Yusuf Garba",
      email: "yusuf@northerntruckparts.ng",
      phone: "+2348012345605",
      totalOrders: 1,
      totalItems: 5,
      grossSalesKobo: 13750000,
    },
    {
      rank: 3,
      sellerId: 9001,
      userId: 9101,
      businessName: "Prime Auto Hub",
      fullName: "Uche Okafor",
      email: "uche@primeautohub.ng",
      phone: "+2348012345601",
      totalOrders: 2,
      totalItems: 4,
      grossSalesKobo: 7400000,
    },
  ];

  const rev = [
    {
      label: "Seller Net",
      amountKobo: 47115000,
      percentage: 90,
    },
    {
      label: "Platform Commission",
      amountKobo: 5235000,
      percentage: 10,
    },
    {
      label: "Pending Settlements",
      amountKobo: 0,
      percentage: 0,
    },
  ];

  const recent = [
    {
      auditLogId: 5,
      action: "dispute.resolved",
      targetType: "dispute",
      targetId: 1,
      actorName: "Super Admin",
      createdAt: "2026-07-12T09:31:39.000Z",
      summary: "Dispute #1 resolved.",
    },
    {
      auditLogId: 4,
      action: "payout.paid",
      targetType: "payout",
      targetId: 1,
      actorName: "Super Admin",
      createdAt: "2026-07-11T16:50:58.000Z",
      summary: "Payout #1 marked as paid.",
    },
    {
      auditLogId: 3,
      action: "payout.approved",
      targetType: "payout",
      targetId: 1,
      actorName: "Super Admin",
      createdAt: "2026-07-11T16:45:44.000Z",
      summary: "Payout #1 approved.",
    },
    {
      auditLogId: 2,
      action: "platform_config.updated",
      targetType: "platform_config",
      targetId: null,
      actorName: "Super Admin",
      createdAt: "2026-07-11T16:28:17.000Z",
      summary: "Platform configuration updated.",
    },
    {
      auditLogId: 1,
      action: "platform_config.updated",
      targetType: "platform_config",
      targetId: null,
      actorName: "Super Admin",
      createdAt: "2026-07-11T16:27:51.000Z",
      summary: "Platform configuration updated.",
    },
  ];
  const mockPayouts: PayoutQueueItem[] = [
  { id: "p-01", sellerName: "AutoFix Lagos", amount: 142000, status: "Pending" },
  { id: "p-02", sellerName: "Kamal Motors", amount: 98500, status: "Pending" },
  { id: "p-03", sellerName: "SpeedParts Abuja", amount: 71200, status: "Pending" },
  { id: "p-04", sellerName: "DriveFit Supplies", amount: 204000, status: "Held" },
  { id: "p-05", sellerName: "PartsPro Hub", amount: 55800, status: "Pending" }
];

const mockGmvHistory: GmvDataPoint[] = [
  { date: 'Jul 31', gmvValue: 24000000 },
  { date: 'Aug 01', gmvValue: 28500000 },
  { date: 'Aug 02', gmvValue: 21000000 },
  { date: 'Aug 03', gmvValue: 34000000 },
  { date: 'Aug 04', gmvValue: 29000000 },
  { date: 'Aug 05', gmvValue: 41000000 },
  { date: 'Aug 06', gmvValue: 42800000 }
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
                data={mockSellers}
                onViewAll={handleViewAllSellers}
              />
            </div>
            <div className="lg:col-span-2">
              <OpenDisputes
                data={mockDisputes}
                onViewAll={handleViewAllSellers}
              />
            </div>
          </div>

          {/* Row 2: Orders, Sellers, and Platform Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <RecentOrders data={myD} />
            <TopSellers data={top} />
            <PlatformHealth metrics={rev} />
          </div>

          {/* Row 3: Trends, Activity, and Payouts */} 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* <GmvTrendChart /> */}
        <GmvChart
        data={mockGmvHistory}
        title="GMV trend (last 7 days)"
        totalGmv="₦142.8M"
        percentageGrowth={14.6}
        onFilterChange={handleViewAllSellers}
      />
        <RecentActivity activities={recent} />
        <PayoutQueue
        data={mockPayouts}
        onViewAll={() => console.log("View all click event triggered")}
        onApprove={(id) => console.log(`Approved payout row item matching ID: ${id}`)}
        onHoldAndFlag={(id) => console.log(`Flagged and held matching reference instance ID: ${id}`)}
        onViewDetails={(id) => console.log(`Opening full item record panel layout view for ID: ${id}`)}
      />
      </div> 
        </>
      )}
    </div>
  );
}
