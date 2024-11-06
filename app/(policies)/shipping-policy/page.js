export default function ShippingPolicy() {
  return (
    <div className="w-4/5 mx-auto my-10 p-6 border bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <div className="text-4xl font-semibold text-blue-500 border-b pb-4">
        Shipping Policy
      </div>
      <div className="text-gray-700 leading-relaxed">
        We partner with Delhivery, Bluedart, Ekart, and Xpressbees for all our
        deliveries.
      </div>
      <div className="text-gray-700 leading-relaxed">
        We pride ourselves on offering one of the quickest "ORDER TO DELIVERY"
        times in the industry.
      </div>
      <div className="text-gray-700 leading-relaxed">
        Our commitment to timely service is reflected in our over 99.98% on-time
        delivery rate.
      </div>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          - Delivery typically takes 5-6 days.
        </li>
        <li className="flex items-center gap-2">
          - One-Day Delivery is available for NCR upon request.
        </li>
        <li className="flex items-center gap-2">
          - Delivery Time for Metro Cities is 3-5 Days.
        </li>
        <li className="flex items-center gap-2">
          - For Tier II Cities, expect delivery in 4-7 Days.
        </li>
        <li className="flex items-center gap-2">
          - Delivery to Villages may take 7-10 Days.
        </li>
        <li className="flex items-center gap-2">
          - We are not liable for delays caused by the courier service.
        </li>
      </ul>
      <div className="text-gray-700 leading-relaxed">
        If a shipment is returned, you will be responsible for the shipping
        charges to resend the order.
      </div>
    </div>
  );
}
