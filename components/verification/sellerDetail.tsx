import { AlertTriangle, ArrowLeft, CheckCircle, FileText, XCircle } from "lucide-react";
import { ConfirmationModal } from "./confirmationModal";
import { DocumentPreviewModal } from "./documentModal";
import { useState } from "react";
import { BusinessDetails } from "@/types/verification";
import { ActionWithReasonModal } from "./actionWithReason";

const mockBusinessData: BusinessDetails = {
  id: '1',
  registeredName: 'Chukwuemeka Auto Parts',
  rcNumber: 'BN-1234567',
  address: '14 Apapa Road, Lagos Island',
  phone: '0801 234 5678',
  businessType: 'Sole Proprietor',
  status: 'Pending CAC',
  submittedDate: '2024-06-10',
  bankName: 'First Bank',
  accountNumber: '3012345678',
  accountName: 'Chukwuemeka Obiora',
};

export const SellerDetailProfile: React.FC<{setOpen: (open: boolean) => void}> = ({setOpen}) => {
  const [business, setBusiness] = useState<BusinessDetails>(mockBusinessData);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState<string>('');
 const [modalConfig, setModalConfig] = useState<{
    type: 'Flag' | 'Reject'| "Approved" | null;
    title: string;
    description: string;
    placeholder?: string;
    color?: string;
    label: string;
  }>({
    type: null,
    title: '',
    description: '',
    placeholder: '',
    color: '',
    label: '',
  });

  // useEffect(() => {
  //   const fetchSellerData = async () => {
  //     setIsLoading(true);
  //     setError(null);
      
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/api/sellers/${sellerId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Add authorization tokens if your backend endpoints are protected:
  //           // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch vendor (Status: ${response.status})`);
  //       }

  //       const data: BusinessDetails = await response.json();
  //       setBusiness(data);
  //     } catch (err: any) {
  //       setError(err.message || "An unexpected network error occurred.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (sellerId) {
  //     fetchSellerData();
  //   }
  // }, [sellerId]);

  const handleApprove = () => {
    setBusiness(prev => ({ ...prev, status: 'Approved' }));
  };

  const handleConfirmFlag = () => {
    setBusiness(prev => ({ ...prev, status: 'Flagged' }));
    setIsFlagModalOpen(false);
  };

  const handleReject = () => {
    setBusiness(prev => ({ ...prev, status: 'Pending review' }));
  };

  const handleOpenDocPreview = (title: string) => {
    setSelectedDocTitle(title);
    setIsPreviewModalOpen(true);
  };

  const openReasonModal = (type: 'Flag' | 'Reject' | "Approved") => {
    if (type === 'Flag') {
      setModalConfig({
        type: 'Flag',
        title: 'Flag for Review',
        description: 'This seller will be flagged for further review.',
        color: 'bg-aorange border-aorange',
        label: 'Flag',
      });
    } else if(type === "Reject") {
      setModalConfig({
        type: 'Reject',
        title: 'Reject Seller',
        description: 'Provide a reason for rejection. The seller will be notified.',
        placeholder: 'Enter reason...',
        color: 'bg-[#E7000B] border-[#E7000B]',
        label: 'Reject',
      });
    }else {
      setModalConfig({
        type: 'Approved',
        title: 'Approve Seller',
        description: 'Are you sure you want to approve this seller?',
        color: 'bg-aorange border-aorange',
        label: 'Approve',
      });
    }
  };

   const handleActionConfirmSubmit = (reasonText: string) => {
    
    
    setBusiness(prev => ({
      ...prev,
      status: modalConfig.type === 'Flag' ? 'Flagged' : 'Pending review'
    }));

    setModalConfig(prev => ({ ...prev, type: null })); // Close reason handler sheet frame
  };

  return (
    <div className="flex-1 overflow-y-auto antialiased text-left">
      {/* Back Navigation Button */}
      <button className="inline-flex items-center gap-2 text-sm text-navgray hover:text-gray-800 font-medium mb-3 transition-colors cursor-pointer" onClick={() => setOpen(false) }>
        <ArrowLeft size={14} />
        <span>Back to queue</span>
      </button>

      {/* Main Form Split Grid System */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Data Content Sections */}
        <div className="flex-1 w-full space-y-4">
          
          {/* Card Module 1: Business Information Grid */}
          <section className="bg-white border border-lightborder rounded-lg p-4 ">
            <h2 className="text-lg font-medium text-dark mb-4 ">Business Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm mb-1">
              <div>
                <p className="text-sm text-lighttext mb-0.5">Registered Name</p>
                <p className="font-medium text-dark">{business.registeredName}</p>
              </div>
              <div>
                <p className="text-sm text-lighttext mb-0.5">RC Number</p>
                <p className="font-medium text-dark">{business.rcNumber}</p>
              </div>
              <div>
                <p className="text-sm text-lighttext mb-0.5">Address</p>
                <p className="font-medium text-dark">{business.address}</p>
              </div>
              <div>
                <p className="text-sm text-lighttext mb-0.5">Phone</p>
                <p className="font-medium text-dark">{business.phone}</p>
              </div>
              <div>
                <p className="text-sm text-lighttext mb-0.5">Business Type</p>
                <p className="font-medium text-dark">{business.businessType}</p>
              </div>
              <div>
                <p className="text-sm text-lighttext mb-0.5">Status</p>
                <span className={`inline-block font-medium text-xs px-2.5 py-0.5 rounded-full ${
                  business.status === 'Pending CAC' ? 'text-[#BB4D00] bg-[#FEF3C6]' :
                  business.status === 'Flagged' ? 'text-[#C10007] bg-[#FFE2E2]' : 'text-[#008236] bg-[#DCFCE7]'
                }`}>
                  {business.status}
                </span>
              </div>
            </div>
          </section>
{/* Card Module 2: Documents Manager Vault */}
          <section className="bg-white  border border-lightborder rounded-lg p-4 ">
            <h2 className="text-lg font-medium text-dark mb-4">Documents</h2>
            
            <div className="space-y-2">
              {[
                { name: 'CAC Certificate' },
                { name: 'Utility Bill' },
                { name: 'Government-issued ID' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#F5F7FA]  rounded-lg group hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-lighttext group-hover:text-gray-500" />
                    <span className="text-sm text-dark">{doc.name}</span>
                  </div>
                  <button 
                    onClick={() => handleOpenDocPreview(doc.name)}
                    className="text-xs font-medium text-navgray bg-white border border-lightborder px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>

                    {/* Card Module 3: Bank Details Grid */}
          <section className="bg-white  border border-lightborder rounded-lg p-4 text-left">
            <h2 className="text-lg font-medium text-dark mb-4">Bank Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
              <div>
                <p className="text-sm text-lighttext mb-0.5">Bank Name</p>
                <p className="font-medium text-dark">{business.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-lighttext mb-0.5">Account Number</p>
                <p className="font-medium text-dark tracking-wide">{business.accountNumber}</p>
              </div>
              <div>
                <p className="ttext-sm text-lighttext mb-0.5">Account Name</p>
                <p className="font-medium text-dark">{business.accountName}</p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar Control Actions Panel */}
        <div className="w-full lg:w-64 space-y-4 text-left">
          
          {/* Actions Management Core Card */}
          <div className="bg-white border border-lightborder rounded-lg p-4 space-y-2">
            <p className="text-xs font-medium text-lighttext uppercase mb-2">Actions</p>
            
            <button 
              // onClick={() => setBusiness(prev => ({ ...prev, status: 'Approved' }))}
              onClick={() => openReasonModal('Approved')}

              className="w-full flex items-center gap-2 bg-[#00A63E] hover:bg-[#009040] text-white text-sm py-2.5 px-4 rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle size={13} />
              <span>Approve Seller</span>
            </button>
            
            <button 
              onClick={() => openReasonModal('Flag')}
              className="w-full flex items-center gap-2 bg-[#FE9A00] hover:bg-[#E0A800] text-white text-sm py-2.5 px-4 rounded-lg shadow-sm transition-colors"
            >
              <AlertTriangle size={13} />
              <span>Flag for Review</span>
            </button>
            
            <button 
              onClick={() => openReasonModal('Reject')}
              className="w-full flex items-center gap-2 bg-[#E7000B] hover:bg-[#A00000] text-white  text-sm py-2.5 px-4 rounded-lg shadow-sm transition-colors"
            >
              <XCircle size={13} />
              <span>Reject Seller</span>
            </button>
          </div>

          {/* Submission Timestamp Card */}
          <div className="bg-white border border-lightborder rounded-lg p-4 text-sm text-left">
            <p className="text-xs font-medium text-lighttext uppercase mb-2">Submission</p>
            <p className="text-navgray">Submitted on</p>
            <p className="font-medium text-dark mt-0.5">{business.submittedDate}</p>
          </div>

        </div>
      </div>

      {/* Shared Text Justification Entry Action Dialog Overlay Component Panel */}
      <ActionWithReasonModal
        isOpen={modalConfig.type !== null}
        onClose={() => setModalConfig(prev => ({ ...prev, type: null }))}
        onConfirm={handleActionConfirmSubmit}
        title={modalConfig.title}
        description={modalConfig.description}
        placeholderText={modalConfig?.placeholder ?? ""}
        confirmButtonColor={modalConfig?.color ?? ""}
        confirmLabel={modalConfig.label}
      />
    </div>
  );
};

