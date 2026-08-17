
import { CardWrapper } from '../ui/cardWrapper';

export interface SellerVerificationItem {
  name: string;
  type: string;
  location: string;
  status: 'Pending CAC' | 'Pending Review' | 'Flagged' | string;
} 

export interface SellerVerificationCardProps {
  data: SellerVerificationItem[];
  onViewAll?: () => void;
}

export const SellerVerification = ({ data = [], onViewAll }: SellerVerificationCardProps) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending cac':
      case 'pending review':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'flagged':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <CardWrapper title="Seller verification queue" actionLabel="View all" onActionClick={onViewAll}>
      <table className="w-full text-left border-collapse min-w-125">
        <thead>
          <tr className="text-[10px] uppercase font-medium text-lighttext border-b border-[#F5F7FA]">
            <th className="pb-3 font-medium">Business Name</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium">Location</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-navgray">
          {data.map((item, idx) => (
            <tr key={idx} className="border-b border-[#F5F7FA] last:border-0 hover:bg-gray-50/50">
              <td className="py-3 font-medium text-dark">{item.name}</td>
              <td className="py-3">{item.type}</td>
              <td className="py-3">{item.location}</td>
              <td className="py-3">
                <span className={`px-2 py-1 w-full block rounded-[20px] text-[11px] font-medium text-[#633806] bg-[#FAEEDA] `}>
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
