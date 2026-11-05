import { ActionsMenuProps } from "@/types/verification";
import { MoreVertical } from "lucide-react";

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
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
                onAction("Review");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              Review
            </button>
            {/* <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("Flag");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50  flex items-center gap-2 cursor-pointer"
            >
              Flag
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("Reject");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-[#E7000B] flex items-center gap-2 cursor-pointer"
            >
              Reject
            </button> */}
          </div>
        </>
      )}
    </div>
  );
};