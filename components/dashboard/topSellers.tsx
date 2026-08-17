import CurrencyFormat from "../atoms/currencyFormat";
import { CardWrapper } from "../ui/cardWrapper";

export interface TopSellersItem {
  rank: number;
  sellerId: number;
  userId: number;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalItems: number;
  grossSalesKobo: number;
}

export const TopSellers = ({ data = [] }: { data: TopSellersItem[] }) => {
  return (
    <CardWrapper title="Top sellers this month">
      <div className="flex flex-col divide-y divide-gray-50">
        {data.map((seller, idx) => {
            const getSeller = seller.fullName.split(" ")
            let initials;
            if (getSeller.length > 1){
                const first = getSeller[0][0]
                const second = getSeller[1][0]
                initials = first + second
            }
          return (
            <div
              key={idx}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E8EFF9] flex items-center justify-center font-bold text-[10px] text-[#0C447C">
                  {idx + 1}
                </div>
                <div className="w-7 h-7 rounded-full bg-[#F5F7FA] flex items-center justify-center font-bold text-[10px] text-[#525866]">
                  {initials}
                </div>
                <div className="flex flex-col pr-3">
                  <span className="text-sm w-full max-w-24 2xl:max-w-full  truncate font-medium text-dark">
                    {seller.businessName}
                  </span>
                  <span className="text-[10px] text-lighttext">
                    {seller.phone}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-lighter-green">
                {CurrencyFormat().format(seller.grossSalesKobo ?? 0)}
              </span>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
};
