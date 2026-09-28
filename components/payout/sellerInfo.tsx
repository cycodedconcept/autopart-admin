"use client";

import CurrencyFormat from "../atoms/currencyFormat";
import { StatusBadge } from "../atoms/statusBadge";
interface InfoProps {
  info: {} | null;
}

export function SellerInfo({ info }: InfoProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n, id, arr) => {
        return arr.length === 1 ? n[0] + n[1] : n[0];
      })
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-full bg-white border border-lightborder rounded-lg p-4">
      <h3 className="text-lg font-medium text-dark mb-3">Seller Info</h3>
      <div className="space-y-3 text-sm text-navgray">
        <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#FFF4EE] rounded-full flex items-center justify-center text-aorange font-bold text-sm tracking-wider shrink-0 select-none">
          {getInitials("A s u")}
        </div>
        <div className="min-w-0 space-y-0.5">
                            <h3 className="text-sm font-medium text-dark capitalize">
                                chi
                            </h3>
                            <StatusBadge status="pending"/>
                          </div>
                          </div>
        <div className="flex items-center">
          <span>Bank:</span>
          <span className="">Zenith</span>
        </div>

        <div className="flex items-center">
          <span>Account:</span>
          <span className="">Zenith</span>
        </div>
        <div className="flex items-center">
          <span>Request date:</span>
          <span className="">Zenith</span>
        </div>
      </div>
    </div>
  );
}
