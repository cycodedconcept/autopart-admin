export type VerificationStatus = 'Pending CAC' | 'Pending review' | 'Flagged' | 'Approved';
export type BusinessType = 'Sole Proprietor' | 'Limited Company' | 'Partnership';

export interface SellerRequest {
  id: string;
  businessName: string;
  type: BusinessType;
  location: string;
  submittedDate: string;
  status: VerificationStatus;
}

export interface ActionsMenuProps {
  onAction: (action: 'Review' | 'Flag' | 'Reject') => void;
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

export interface ActionWithReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  description: string;
  placeholderText: string;
  confirmButtonColor: string;
  confirmLabel: string;
}