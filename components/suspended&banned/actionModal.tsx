import { useState } from "react";
import { ActionWithReasonModal } from "../verification/actionWithReason";
import { MoreHorizontal } from "lucide-react";
import { HistoryModal } from "./historyModal";
import { useSuspendSellerAccount } from "@/lib/queries";

interface ActionsMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onAction: (action: string) => void;
  id: number;
  businessName: string
}

const mockActionHistory = [
  {
    id: 1,
    title: "Warning issued",
    date: "2024-06-10",
    actor: "Admin Fatima",
    description: "First notice for listing irregularities",
  },
  {
    id: 2,
    title: "Review initiated",
    date: "2024-06-11",
    actor: "System",
    description: "Automated fraud detection triggered",
  },
  {
    id: 3,
    title: "Account suspended",
    date: "2024-06-12",
    actor: "Admin Fatima",
    description: "Confirmed fraudulent listings; pending investigation",
  },
  {
    id: 4,
    title: "Seller responded",
    date: "2024-06-20",
    actor: "Seller",
    description: "Submitted appeal with documentation",
  },
];

export const ActionsSuspend: React.FC<ActionsMenuProps> = ({
  onAction,
  isOpen,
  onToggle,
  id,
  businessName
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track state using the single composite data contract type layout
  const [selectedSellerHistory, setSelectedSellerHistory] = useState<
    any | null
  >(null);
  const [modalConfig, setModalConfig] = useState<{
    type: string | null;
    title: string;
    description: string;
    placeholder?: string;
    color?: string;
    label: string;
  }>({
    type: null,
    title: "",
    description: "",
    placeholder: "",
    color: "",
    label: "",
  });
  const openReasonModal = (type: string) => {
    if (type === "Reinstate") {
      setModalConfig({
        type: "Reinstate",
        title: "Reinstate Seller Account",
        description: `You are about to reinstate ${businessName}. Please provide a reason for reinstatement..`,
        placeholder: "Enter reinstatement reason...",
        color: "bg-[#FB3636] border-[#FB3636]",
        label: "Reinstate",
      });
    } else if (type === "Escalate") {
      setModalConfig({
        type: "Escalate",
        title: "Escalate to Permanent Ban",
        description: ` You are about to permanently ban ${businessName}. This action will remove all active listings, void pending payouts, and prevent the seller from creating a new account. This cannot be undone.`,

        color: "bg-[#E7000B] border-[#E7000B]",
        label: "Ban Account",
      });
    }
  };
  const suspendSellerAccout = useSuspendSellerAccount();
  const handleActionConfirmSubmit = (reasonText: string, type: string) => {
  
    if (type.toLowerCase() === "escalate") {
      suspendSellerAccout.mutate({
        id: id,
        status: "banned",
      });
    }
    else if (type.toLowerCase() === "reinstate") {
      suspendSellerAccout.mutate({
        id: id,
        status: "active",
      });
    }

    setModalConfig((prev) => ({ ...prev, type: null })); // Close reason handler sheet frame
  };

  // Single dynamic click handler receiving a single data profile wrapper
  const handleOpenHistory = (sellerRecord: any) => {
    setSelectedSellerHistory(sellerRecord);
    setIsModalOpen(true);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Three-dots contextual button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents underlying row click routing when opening menu
          onToggle();
        }}
        className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <>
          {/* Transparent click-away layer to close menu safely */}
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation(); // Prevents row click action when clicking outside
              onToggle();
            }}
          />

          {/* Dropdown Menu Overlay Panel */}
          <div className="absolute right-0 mt-1 w-40 shadow-md bg-white border border-lightborder rounded-xl z-20 py-1 text-sm text-dark font-medium animate-in fade-in slide-in-from-top-1 duration-100">
            {/* Action Item: Reinstate */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // CRITICAL: Isolates action from row click routing
                openReasonModal("Reinstate");

                onAction("Reinstate");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer "
            >
              Reinstate seller
            </button>
            {/* Action Item: View Profile */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // CRITICAL: Isolates action from row click routing
                handleOpenHistory({
                  businessName: "Chukwuemeka Obi Ltd",
                  actionHistory: [
                    {
                      id: 1,
                      title: "Warning issued",
                      date: "2024-06-10",
                      actor: "Admin Fatima",
                      description: "First notice for listing irregularities",
                    },
                    {
                      id: 2,
                      title: "Account suspended",
                      date: "2024-06-12",
                      actor: "Admin Fatima",
                      description: "Confirmed fraudulent listings",
                    },
                  ],
                });

                onAction("View history");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              View history
            </button>

            {/* Action Item: Permanent Ban */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // CRITICAL: Isolates action from row click routing
                openReasonModal("Escalate");

                onAction("Escalate");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-[#E7000B]"
            >
              Escalate to ban
            </button>
          </div>
        </>
      )}
      <HistoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSellerHistory(null); // Clean up context on close
        }}
        sellerData={selectedSellerHistory}
      />
      <ActionWithReasonModal
        isOpen={modalConfig.type !== null}
        onClose={() => setModalConfig((prev) => ({ ...prev, type: null }))}
        onConfirm={handleActionConfirmSubmit}
        title={modalConfig.title}
        type={modalConfig.type ?? ""}
        description={modalConfig.description}
        placeholderText={modalConfig?.placeholder ?? ""}
        confirmButtonColor={modalConfig?.color ?? ""}
        confirmLabel={modalConfig.label}
      />
    </div>
  );
};
