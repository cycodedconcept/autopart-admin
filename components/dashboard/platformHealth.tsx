import CurrencyFormat from "../atoms/currencyFormat";
import { CardWrapper } from "../ui/cardWrapper";

interface RevenueMix {
  label: string;
  amountKobo: number;
  percentage: number;
}
export interface PlatformHealth {
  status: string;
  revenueMix: RevenueMix[];
  metrics: {
    disputeResolutionRatePercent: number;
    payoutCompletionRatePercent: number;
    sellerApprovalRatePercent: number;
  };
}

export const PlatformHealth = ({ metrics = [] }: {metrics: RevenueMix[]}) => {
  return (
    <CardWrapper title="Platform health">
      <div className="flex flex-col divide-y divide-[#F5F7FA]">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0"
          >
            <span className="text-[11px] text-lighttext font-normal">
              {metric.label}
            </span>
            <span className="text-sm text-dark font-medium">
              {CurrencyFormat().format(metric.amountKobo)}
            </span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};
