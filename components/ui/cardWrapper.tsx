import {  ChevronRight } from "lucide-react";

export interface CardProps {
  title: string;
  // Make action optional since some cards (like Recent Orders) don't have actions
  actionLabel?: string; 
  // typed as a standard click event block handler
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  children: React.ReactNode;
}

export const CardWrapper: React.FC<CardProps> = ({ 
  title, 
  actionLabel, 
  onActionClick, 
  children 
}) => {
  return (
    <div className="bg-white px-4 py-5 rounded-lg border border-lightborder  flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-dark text-sm font-medium tracking-wide">{title}</h3>
        {actionLabel && (
            <div className="flex items-center gap-x-0.5 cursor-pointer">

                <button 
                  onClick={onActionClick}
                  className="text-xs text-aorange font-medium hover:underline cursor-pointer focus:outline-none"
                >
                  {actionLabel}
                </button>
                  <ChevronRight size={12} className=" text-aorange"/>
            </div>
        )}
      </div>
      <div className="flex-1 overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
