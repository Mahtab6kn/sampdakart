import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function RefundPolicy() {
  return (
    <div className="w-4/5 mx-auto my-10 p-6 border bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <div className="text-4xl font-semibold text-blue-500 border-b pb-4">
        Return & Refund Policy
      </div>
      <div className="text-gray-700 leading-relaxed">
        Once we receive and inspect your return, we’ll notify you whether your
        refund request has been approved. If approved, the refund will be
        processed automatically using your original payment method. Please allow
        some time for your bank or credit card provider to complete the
        transaction.
      </div>

      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          Customers can request a return within 24 hours of receiving their
          order.
        </li>
        <li className="flex items-center gap-2">
          Refunds are typically processed within 7 to 15 business days.
        </li>
      </ul>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-teal-500" />
          Address: 1st Floor, S/460 , Bashant vihar Market, near Panch Shiv
          Mandir, Kankarbagh Colony, Patna, Bihar 800020
        </li>
        <li className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-teal-500" />
          Phone: +91111222333
        </li>
        <li className="flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-teal-500" />
          Email: ghostingtech@gmail.com
        </li>
      </ul>
    </div>
  );
}
