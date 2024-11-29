import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function RefundPolicy() {
  return (
    <div className="w-4/5 mx-auto my-10 p-6 border bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <div className="text-4xl font-semibold text-blue-500 border-b pb-4">
        Return & Refund Policy
      </div>
      <div className="text-gray-700 leading-relaxed">
        We will notify you once we’ve received and inspected your return, and
        let you know if the refund was approved or not. If approved, you’ll be
        automatically refunded on your original payment method. Please remember
        it can take some time for your bank or credit card company to process
        and post the refund too.
      </div>

      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          Customers can request a return within 24 hours of receiving their
          order.
        </li>
        <li className="flex items-center gap-2">
          It takes 7 to 15 Business Days to refund the amount{" "}
        </li>
      </ul>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-teal-500" />
          Address: PNB Road Near Maniramdas Chhawani Chhoti Chhawani Ayodhya,
          Uttar Pradesh 224123
        </li>
        <li className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-teal-500" />
          Phone: +9120053008
        </li>
        <li className="flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-teal-500" />
          Email: sampdakart@gmail.com
        </li>
      </ul>
    </div>
  );
}
