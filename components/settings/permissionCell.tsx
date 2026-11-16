import React from 'react';
import { Check } from 'lucide-react';

export type PermissionType = 'FULL' | 'VIEW_ONLY' | 'NONE';

interface PermissionCellProps {
  type: PermissionType;
  onClick: () => void; // Made mandatory
}

export const PermissionCell: React.FC<PermissionCellProps> = ({ type, onClick }) => {
  return (
    <td className="p-1 border-b border-lightborder text-center align-middle">
      <button
        type="button"
        onClick={onClick}
        className="w-full min-h-10 flex justify-center items-center rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20"
      >
        {type === 'FULL' && (
          <Check className="w-4 h-4 text-aorange stroke-3" />
        )}
        {type === 'VIEW_ONLY' && (
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded tracking-wide uppercase">
            View Only
          </span>
        )}
        {type === 'NONE' && (
          <span className="text-navgray font-light">—</span>
        )}
      </button>
    </td>
  );
};
