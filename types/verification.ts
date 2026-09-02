export type VerificationStatus = string;
// | "Pending CAC"
// | "Pending review"
// | "Flagged"
// | "Approved"
// | "Suspended"
// | "Pending"
// | "Active";
export type BusinessType =
  | "Sole Proprietor"
  | "Limited Company"
  | "Partnership";

export type PlanProps = |"Pro" | "Starter" | "Free";
export interface SellerRequest {
  id: string;
  businessName: string;
  type: BusinessType;
  location: string;
  submittedDate: string;
  status: VerificationStatus;
  plan?:string
  gmv?:string
  orders?:number
}

export interface ActionsMenuProps {
  onAction: (action: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
}

export interface BusinessDetails {
  id: string;
  registeredName: string;
  rcNumber: string;
  address: string;
  phone: string;
  businessType: string;
  status: VerificationStatus;
  submittedDate: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface DashboardVerificationSeller {
  businessName: string;
  cacNumber: string; // Corporate Affairs Commission registration number
  contactEmail: string;
  contactPhone: string;
  pendingSinceDays: number;
  sellerId: number;
  submittedAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  verificationStatus: 'pending' | 'approved' | 'rejected'; // Adjust enum options to match backend
}

export interface ActionWithReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, type: string) => void;
  title: string;
  description: string;
  type: string;
  placeholderText: string;
  confirmButtonColor: string;
  confirmLabel: string;
}
