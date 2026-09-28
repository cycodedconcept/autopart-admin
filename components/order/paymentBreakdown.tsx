import React from 'react';
import CurrencyFormat from '../atoms/currencyFormat';
import { OrderItem, OrderItemNode } from '@/types/order';

export const PaymentBreakdown = ({payment}: {payment: OrderItemNode}) => {
  
  if (!payment) return <div>No order payment data available.</div>;
  
  const pricingLines = [
    { label: 'Total', amount: payment?.lineTotalKobo },
    { label: 'Subtotal', amount: payment?.unitPriceKobo },
    { label: 'Delivery Fee', amount: payment?.deliveryFeeKobo },
    
  ];
  return (
    <div className="bg-white border border-lightborder rounded-lg p-4 flex flex-col gap-3">
      <h3 className="text-sm font-medium text-dark pb-2">
        Payment Breakdown
      </h3>

      {pricingLines.map((line, idx) => (
        idx !==0 && <div key={line.label} className="flex justify-between items-center text-sm">
          <span className="text-navgray ">{line.label}</span>
          <span className=" text-dark">{CurrencyFormat(line.amount)}</span>
        </div>
      ))}

      {/* Aggregate Financial Sum Line */}
      <div className="flex justify-between items-center pt-3 border-t  border-lightborder mt-1 text-sm text-dark font-medium">
        <span className="">Total</span>
        <span className="">{CurrencyFormat(pricingLines[0]?.amount)}</span>
      </div>
    </div>
  );
};
