import { OrderDetailPayload, OrderItem } from "@/types/order";
import { StatusBadge } from "../atoms/statusBadge";
import { formatDateLabelYear } from "../atoms/formatDate";


export const OrderInfoCard = ({order}:{order: OrderDetailPayload}) => {
  
  if (!order) return <div>No order data available.</div>;
  
  const infoItems = [
    { label: 'Order ID', value: order?.id },
    { label: 'Date', value: formatDateLabelYear(order?.createdAt) },
    { label: 'Buyer', value: order?.buyer?.fullName },
    { label: 'Seller', value: order?.items[0]?.seller?.businessName },
    { label: 'Part', value: order?.items[0]?.partName },
    { label: 'Delivery Address', value: order?.deliveryAddress?.street },
  ];

  
  return (
    <div className="bg-white border border-lightborder rounded-lg p-4 flex flex-col gap-4">
      <h3 className="text-sm font-medium text-dark pb-1">
        Order Information
      </h3>
      
      <div className="flex flex-col gap-3">
        {infoItems.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <span className="text-xs text-lighttext">{item.label}</span>
            <span className={`text-sm font-medium text-dark `}>
              {item.value}
            </span>
          </div>
        ))}
        
        {/* Live Status Pill Section */}
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-xs text-lighttext">Status</span>
          <div className='capitalize'>
           <StatusBadge status={order?.items[0]?.status}/>
          </div>
        </div>
      </div>
    </div>
  );
};
