import { Order } from "@/types/order";
import { User } from "@/types/seller";


  const recentOrders = [
    { id: '#ORD-2841', productName: 'OEM Brake Pad Set', status: 'Delivered' },
    { id: '#ORD-2842', productName: 'OEM Brake Pad Set', status: 'Delivered' },
    { id: '#ORD-2843', productName: 'OEM Brake Pad Set', status: 'Delivered' },
  ];

const SellerListings = ({user, orders}: {user: User, orders: Order[]}) => {
    
  return (
    <div className="divide-y divide-gray-100">
        {orders.flatMap(each => each.items).map((order) => {

          return <div 
            key={order.id} 
            className="flex items-center justify-between py-3.5 text-sm transition-colors font-normal text-dark hover:bg-gray-50/40 capitalize"
          >
           

            {/* Product / Line Item Details */}
            <div className="w-2/4 text-center sm:text-left ">
              {order.title}
            </div>

            {/* Status Pills */}
            <div className="w-1/4 flex justify-end">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                order.itemStatus === 'Delivered' 
                  ? 'bg-[#EAF3DE] text-[#27500A]' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {order.itemStatus}
              </span>
            </div>
          </div>
})}
      </div>
  )
}

export default SellerListings
