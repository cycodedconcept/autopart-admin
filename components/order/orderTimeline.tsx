import React from 'react';
import { Check, Circle, CircleCheck, CircleCheckBig } from 'lucide-react';
import { OrderStatusHistoryNode } from '@/types/order';
import { formatDateLabelYear, formatDateLabelYearTime } from '../atoms/formatDate';

export const OrderTimeline = ({order}: {order: OrderStatusHistoryNode[]}) => {
  if (!order) return <div>No order data available.</div>;
  return (
    <div className="bg-white border border-lightborder rounded-lg p-4">
      <h3 className="text-sm font-medium text-dark pb-5 ">
        Order Timeline
      </h3>

      <div className="relative pl-6 flex flex-col gap-8">
        {order?.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col gap-0.5">
            {/* Connection Line Track */}
            {idx !== order.length - 1 && (
              <div 
                className={`absolute -left-4.25 top-6 w-0.5 h-[calc(100%+1.5rem)] ${
                  step.status ? 'bg-aorange' : 'bg-lightborder'
                }`}
              />
            )}

            {/* Stepper Status Node Icon */}
            <div 
              className={`absolute -left-6.25 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 z-10 ${
                step.status 
                  ? 'bg-aorange border-aorange text-white' 
                  : 'bg-[#F5F7FA] border-lightborder'
              }`}
            >
              {step.status ? <CircleCheckBig className="text-white" size={10} /> : <Circle className="text-lighttext" size={10}/>}
            </div>

            {/* Label Data Text */}
            <span className={`text-sm font-medium capitalize ${step.status ? 'text-dark' : 'text-lighttext'}`}>
              {step.status}
            </span>
            {step.createdAt && (
              <span className="text-xs text-navgray font-normal">
                {formatDateLabelYearTime(step.createdAt)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
