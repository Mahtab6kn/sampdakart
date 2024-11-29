export default function ShippingPolicy() {
  return (
    <div className="w-4/5 mx-auto my-10 p-6 border bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <div className="text-4xl font-semibold text-blue-500 border-b pb-4">
        Shipping Policy
      </div>
      <div className="text-gray-700 leading-relaxed">
        We use Delhivery /Bluedart/Ekart/Xpressbees to deliver all our goods.
      </div>
      <div className="text-gray-700 leading-relaxed">
        We offer the fastest "ORDER TO DELIVERY" time in the industry.
      </div>
      <div className="text-gray-700 leading-relaxed">
        We take Pride in the fact that we have over 99.98% on or before time
        deliveries.
      </div>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          - Takes 5-6 days to delivery the product
        </li>
        <li className="flex items-center gap-2">
          - One Day Delivery for NCR on request.
        </li>
        <li className="flex items-center gap-2">
          - For Metro Cities Delivery Time 3-5 Days
        </li>
        <li className="flex items-center gap-2">
          - For Tier II Cities Delivery Time 4-7 Days
        </li>
        <li className="flex items-center gap-2">
          - For Villages Delivery Time 7-10 Days
        </li>
        <li className="flex items-center gap-2">
          - We are not liable for delays caused by the courier service.
        </li>
      </ul>
      <div className="text-gray-700 leading-relaxed">
        If courier company delays shipment we are not responsible If the
        shipment is returned back to us you need to pay for shipping charges
        again.
      </div>
    </div>
  );
}
