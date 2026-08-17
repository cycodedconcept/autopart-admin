import React from 'react';

// Strict Type Definition for Seller Records
export interface SellerItem {
  rank: number;
  name: string;
  location: string;
  gmv: string;
  orders: number;
  rating: number;
}

interface TopSellersTableProps {
  sellers: SellerItem[];
}

const TopSellersTable: React.FC<TopSellersTableProps> = ({ sellers }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-lightborder w-full">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-dark">Top Sellers</h3>
        
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E1E4EA] text-lighttext font-medium uppercase tracking-wider">
              <th className="pb-3 font-medium w-12 text-center">#</th>
              <th className="pb-3 font-medium">Business Name</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium text-right">GMV</th>
              <th className="pb-3 font-medium text-right">Orders</th>
              <th className="pb-3 font-medium text-right pr-2">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-dark text-sm font-medium">
            {sellers.map((seller) => (
              <tr key={seller.rank} className="hover:bg-gray-50/50 transition-colors duration-150 border-b border-[#F5F7FA] last:border-0 ">
                <td className="py-3 text-center text-navgray ">{seller.rank}</td>
                <td className="py-3  ">{seller.name}</td>
                <td className="py-3 text-navgray font-normal">{seller.location}</td>
                <td className="py-3 text-right">{seller.gmv}</td>
                <td className="py-3 text-right font-normal text-navgray">{seller.orders}</td>
                <td className="py-3 text-right text-[#FE9A00] pr-2">
                  <span className=" mr-0.5">★</span>
                  {seller.rating.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellersTable;
