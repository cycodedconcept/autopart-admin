"use client";

import { CheckCircle } from "lucide-react";

interface DisputeProps {
  dispute: []
}

export function DisputeCard({
  dispute
}: DisputeProps) {
  
  return (
    <div className="w-full bg-white border border-lightborder rounded-lg p-4 min-h-40 ">
      <h3 className="text-lg font-medium text-dark mb-3">Dispute History</h3>
      
      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="w-10 text-[#085041]"/>
        <p className="text-sm text-lighttext">No open disputes</p>
      </div>
    </div>
  );
}
