import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function ReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Return Policy</h1>
      <p className="text-gray-600 mb-6">
        At <strong className="text-gray-800">Sampdakart</strong>, we aim to
        ensure your satisfaction with every purchase. If you’re not completely
        happy with your order, you may initiate a return following the
        guidelines below:
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Return Window
      </h2>
      <p className="text-gray-600 mb-6">
        You can request a return within{" "}
        <strong className="text-gray-800">7 days</strong> of receiving your
        order.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Condition Requirements
      </h2>
      <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Items must be returned in their original, unused condition.</li>
        <li>
          Products should be in the original packaging with all tags attached.
        </li>
        <li>
          Proof of purchase (receipt or order confirmation) must be provided.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Process
      </h2>
      <p className="text-gray-600 mb-4">
        To initiate a return, please contact our support team within the
        specified <strong className="text-gray-800">days</strong> at:
      </p>
      <p className="text-gray-800 mb-6">
        <strong>Email:</strong> sampdakart@gmail.com
        <br />
        <strong>Phone:</strong> +9120053008
      </p>
      <p className="text-gray-600 mb-6">
        After your return is approved, we will provide instructions on where and
        how to send the item.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Return Shipping
      </h2>
      <p className="text-gray-600 mb-6">
        Customers are responsible for return shipping costs unless the product
        is defective or an incorrect item was sent.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Return Address
      </h2>
      <p className="text-gray-800 mb-6">
        PNB Road Near Maniramdas Chhawani,
        <br />
        Chhoti Chhawani, Ayodhya, Uttar Pradesh 224123
      </p>

      <p className="text-gray-700 font-semibold">
        For any questions or assistance, please contact us at{" "}
        <strong className="text-blue-600">sampdakart@gmail.com</strong> or call{" "}
        <strong className="text-blue-600">+9120053008</strong>.
      </p>
    </div>
  );
}
