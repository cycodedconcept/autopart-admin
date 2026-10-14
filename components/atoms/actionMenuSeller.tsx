import { ActionsMenuProps } from "@/types/verification";
import { MoreHorizontal } from "lucide-react";
import { useRef } from "react";
import { useFloatingMenu } from "@/hooks/useFloatingMenu";

export const ActionsMenuSeller: React.FC<ActionsMenuProps> = ({
  onAction,
  isOpen,
  onToggle,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuStyle = useFloatingMenu(triggerRef, isOpen, onToggle, 50);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-1 hover:bg-gray-100 rounded-md text-lighttext hover:text-gray-600 transition-colors cursor-pointer"
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onToggle} />
          <div style={menuStyle} className="w-36 shadow-lg bg-white border border-lightborder rounded-lg z-20 py-1 text-sm text-dark font-medium">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("View profile");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              View Profile
            </button>
            {/* <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("Suspend");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-[#E7000B] flex items-center gap-2 cursor-pointer"
            >
              Suspend
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction("Change plan");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50  flex items-center gap-2 cursor-pointer"
            >
              Change plan
            </button> */}
            
          </div>
        </>
      )}
    </div>
  );
};