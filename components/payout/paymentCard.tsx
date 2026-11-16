"use client";

import CurrencyFormat from "../atoms/currencyFormat";
interface PayoutBreakdownCardProps {
  grossAmountKobo: number;
  commissionKobo: number;
}

export function PaymentCard({
  grossAmountKobo,
  commissionKobo,
}: PayoutBreakdownCardProps) {
  const netAmountKobo = grossAmountKobo - commissionKobo;

  return (
    <div className="w-full bg-white border border-lightborder rounded-lg p-4">
      <h3 className="text-lg font-medium text-dark mb-3">Payout Breakdown</h3>
      <div className="space-y-3 text-sm text-navgray">
        <div className="flex justify-between items-center">
          <span>Gross amount</span>
          <span className="text-dark">{CurrencyFormat(grossAmountKobo)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Commission deducted</span>
          <span className="text-[#791F1F]">
            -{CurrencyFormat(commissionKobo)}
          </span>
        </div>
        <div className="border-t border-lightborder pt-3 flex justify-between items-center text-sm text-dark font-medium">
          <span className="">Net payout</span>
          <span className="">{CurrencyFormat(netAmountKobo)}</span>
        </div>
      </div>
    </div>
  );
}
