
import { CardWrapper } from '../ui/cardWrapper';

export interface OpenDisputeItem {
  orderId: string;
  reason: string;
  time:  number; // e.g., "2 hours ago" or status
  status:  string; // e.g., "2 hours ago" or status
}
export interface OpenDisputesCardProps {
  data: OpenDisputeItem[];
  onViewAll?: () => void;
}

export const OpenDisputes = ({ data = [], onViewAll }: OpenDisputesCardProps) => {
  const getBadgeStyle = (status: string) => {
    if (status?.toLowerCase() === 'in review') return 'bg-[#E8EFF9] text-[#0C447C]';
    return 'bg-[#FFF1F1] text-[#791F1F]'; // Fallback for time-sensitive elements
  };

  return (
    
    <CardWrapper title="Seller verification queue" actionLabel="View all" onActionClick={onViewAll}>
      <table className="w-full text-left border-collapse min-w-125">
        <thead>
          <tr className="text-[10px] uppercase font-medium text-lighttext border-b border-[#F5F7FA]">
            <th className="pb-3 font-medium">Order</th>
            <th className="pb-3 font-medium">Reason</th>
            <th className="pb-3 font-medium">Time / Status</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-navgray">
          {data.map((item, idx) => (
            <tr key={idx} className={`border-b border-[#F5F7FA] last:border-0 hover:bg-gray-50/50  ${item.time < 5 ? "bg-[#FB363608]" : "bg-white"}`}>
              <td className="py-3 font-medium text-dark">{item.orderId}</td>
              <td className="py-3">{item.reason}</td>
            
              <td className="py-3">
                <span className={`text-[11px] pr-2 ${item.time < 5 ? "text-[#FB3636]" : "text-aorange"}`}>{item.time}h left</span>
                <span className={`px-2 py-1 rounded-[20px] text-[11px] font-medium capitalize ${getBadgeStyle(item.status)} `}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardWrapper>
  );
};
