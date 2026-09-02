'use client';

import React, { useEffect } from 'react';
import { Dot, X } from 'lucide-react';

interface TimelineEvent {
  id: string | number;
  title: string;
  date: string;
  actor: string;
  description: string;
}

// Single data object structure passed to the modal
interface SellerHistoryData {
  businessName: string;
  actionHistory: TimelineEvent[];
}

interface ActionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Receives one single complex data payload structure
  sellerData: SellerHistoryData | null; 
}

export const HistoryModal: React.FC<ActionHistoryModalProps> = ({
  isOpen,
  onClose,
  sellerData,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !sellerData) return null;

  // 👈 Destructure the single data object directly inside the component body
  const { businessName, actionHistory } = sellerData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur element layer */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Card Layout */}
      <div className="bg-white border border-lightborder rounded-lg p-6 relative w-full max-w-lg z-10 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        <button onClick={onClose} className="absolute top-5 right-5 p-1.5 rounded-lg text-lighttext hover:bg-gray-50">
          <X size={18} />
        </button>

        <div className="mb-6 text-left">
          <h2 className="text-md font-medium text-dark ">{businessName}</h2>
          <p className="text-sm text-lighttext mt-0.5">Action history</p>
        </div>

        {/* Timeline Axis Elements */}
        <div className="relative pl-1">
          {actionHistory?.length === 0 ? (
            <p className="text-xs text-lighttext text-center py-4">No history logs found.</p>
          ) : (
            actionHistory?.map((event, index) => {
              const isLastItem = index === actionHistory.length - 1;
              return (
                <div key={event.id} className="relative flex gap-4 pb-6 last:pb-1 text-left">
                  <span className="absolute left-1.25 top-3.5 bottom-0 w-px bg-lightborder" />
                  <div className="relative z-10 flex items-start pt-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-aorange block shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-medium text-dark">{event.title}</h4>
                    <div className="flex items-center text-xs text-lighttext ">
                      <span>{event.date}</span>
                      <span><Dot/></span>
                      <span>{event.actor}</span>
                    </div>
                    <p className="text-xs text-navgray  leading-relaxed">{event.description}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
