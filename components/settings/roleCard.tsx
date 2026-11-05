import React from 'react';

interface RoleCardProps {
  title: string;
  count: number;
  statusText?: 'LOCKED' | string;
  onEdit?: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ title, count, statusText, onEdit }) => {
  return (
    <div className="flex-1 min-w-37.5 p-4 bg-white border border-lightborder rounded-lg ">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        <h3 className="text-xs font-medium text-navgray uppercase tracking-wider">{title}</h3>
      </div>
      <div className="text-2xl font-semibold text-dark mb-4">{count}</div>
      <div>
        {statusText === 'LOCKED' ? (
          <span className="text-xs font-bold text-aorange uppercase tracking-wider">LOCKED</span>
        ) : (
          <button 
            onClick={onEdit} 
            className="text-xs font-semibold text-aorange hover:underline transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
