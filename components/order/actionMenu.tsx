import { ActionsMenuProps } from "@/types/verification";
import { MoreVertical } from "lucide-react";

export const ActionsMenuOrder: React.FC<ActionsMenuProps> = ({
  onAction,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-1 hover:bg-gray-100 rounded-md text-lighttext hover:text-gray-600 transition-colors cursor-pointer"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onToggle} />
          <div className="absolute right-0 mt-1 w-36 shadow-lg bg-white border border-lightborder rounded-lg z-20 py-1 text-sm text-dark font-medium">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("View profile");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              View details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("Suspend");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50  flex items-center gap-2 cursor-pointer"
            >
              Flag order
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("Change plan");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-[#E7000B] flex items-center gap-2 cursor-pointer"
            >
              Cancel order
            </button>
            
          </div>
        </>
      )}
    </div>
  );
};