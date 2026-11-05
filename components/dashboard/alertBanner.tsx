import { DashboardAlerts } from "@/types/dashboard";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AlertBanner({
  data,
}: {
  data: DashboardAlerts | undefined;
}) {
  const router = useRouter();
  const handleReview = () => {
    if (!!data?.pendingVerifications?.count) {
      router.push("/sellers/verification-queue");
    } else if (!!data?.openDisputes.urgentCount) {
      router.push("/orders/disputes");
    } else {
      router.push("/finance/payout-approvals");
    }
  };

  return (
    (!!data?.pendingVerifications.count ||
      !!data?.openDisputes.urgentCount ||
      !!data?.payoutRequests.count) && (
      <>
        <div className="flex items-center justify-between bg-[#FCEBEB] border border-[#F7C1C1] rounded-lg p-3 text-xs text-[#791F1F]">
          {/* Alert Content Items */}
          <div className="flex items-center gap-2">
            <Info size={15} className="text-[#791F1F] shrink-0" />
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {!!data?.openDisputes?.urgentCount && (
                <>
                  <span className="flex items-center gap-1">
                    <p>{data?.openDisputes?.urgentCount} open disputes</p>{" "}
                    require admin ruling within 24 hours.
                  </span>
                  <span className="text-red-300 hidden md:inline">|</span>
                </>
              )}
              {!!data?.pendingVerifications?.count && (
                <>
                  <span>
                    <span>
                      {data?.pendingVerifications?.count} seller applications
                    </span>{" "}
                    pending CAC verification.
                  </span>
                  <span className="text-red-300 hidden md:inline">|</span>
                </>
              )}
              {!!data?.payoutRequests?.count && (
                <span>
                  <span>{data?.payoutRequests?.count} payout requests</span>{" "}
                  awaiting approval.
                </span>
              )}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            className="text-xs font-medium text-[#A32D2D] underline hover:text-red-500 transition-colors shrink-0 ml-4 cursor-pointer"
            onClick={handleReview}
          >
            Review now
          </button>
        </div>
      </>
    )
  );
}
