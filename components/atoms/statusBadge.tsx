import { VerificationStatus } from "@/types/verification";

// --- STATUS BADGE COMPONENT ---
interface StatusBadgeProps {
  status: VerificationStatus;
  width?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, width }) => {
  const styles: Record<VerificationStatus, string> = {
    "pending CAC": "bg-[#FEF3C6] text-[#BB4D00] ",
    "pending_review": "bg-[#DBEAFE] text-[#1447E6] ",
    "pending_payment": "bg-[#FEF3EB] text-[#633806] ",
    flagged: "bg-[#FFE2E2] text-[#C10007] ",
    approved: "bg-[#DCFCE7] text-[#008236] ",
    active: "bg-[#E8FFF4] text-[#085041] ",
    paid: "bg-[#E8FFF4] text-[#085041] ",
    banned: "bg-[#FFF1F1] text-[#791F1F] ",
    pending: "bg-[#FEF3EB] text-[#633806] ",
    delivered: "bg-[#DCFCE7] text-[#008236] ",
    "picked_up": "bg-[#DCFCE7] text-[#008236] ",
    verified: "bg-[#DCFCE7] text-[#008236] ",
    resolved: "bg-[#DCFCE7] text-[#008236] ",
    available: "bg-[#DCFCE7] text-[#008236] ",
    confirmed: "bg-[#DBEAFE] text-[#1447E6] ",
    "in_review": "bg-[#DBEAFE] text-[#1447E6] ",
    "in_transit": "bg-[#FEF3C6] text-[#BB4D00] ",
    "requested": "bg-[#FEF3C6] text-[#BB4D00] ",
    "on_delivery": "bg-[#FEF3C6] text-[#BB4D00] ",
    suspended: "bg-[#FEF3C6] text-[#BB4D00] ",
    unavailable: "bg-[#FEF3C6] text-[#BB4D00] ",
    escalated: "bg-[#FEF3C6] text-[#BB4D00] ",
    disputed: "bg-[#FFE2E2] text-[#C10007] ",
    rejected: "bg-[#FFE2E2] text-[#C10007] ",
    open: "bg-[#FFE2E2] text-[#C10007] ",
    cancelled: "bg-[#F3F4F6] text-[#4A5565]",
    inactive: "bg-[#F3F4F6] text-[#4A5565]",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${width}  ${styles[status.toLowerCase()]}`}
    >
      {status}
    </span>
  );
};