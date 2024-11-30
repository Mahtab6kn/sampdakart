import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Refund Policy</h1>
      <p className="text-gray-600 mb-6">
        We understand the importance of timely refunds and work diligently to
        process them smoothly:
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Inspection & Approval
      </h2>
      <p className="text-gray-600 mb-6">
        Once we receive your returned item, our team will inspect it. We will
        notify you via email or phone regarding the approval status of your
        refund.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Credit Processing
      </h2>
      <p className="text-gray-600 mb-6">
        If approved, refunds will be issued as a{" "}
        <strong className="text-gray-800">credit</strong> to your original
        payment method.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Timeline
      </h2>
      <p className="text-gray-600 mb-6">
        The credit will typically be processed within{" "}
        <strong className="text-gray-800">7 to 15 business days</strong>.
        However, please remember that it may take additional time for your bank
        or credit card company to reflect the refund in your account.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Partial Refunds
      </h2>
      <p className="text-gray-600 mb-6">
        In some cases (e.g., items not in their original condition or missing
        parts), partial refunds may be granted at our discretion.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Need Help?
      </h2>
      <p className="text-gray-600 mb-4">
        For any questions or concerns about our return and refund policy, please
        contact us at:
      </p>
      <p className="text-gray-800 font-medium">
        <strong>Email:</strong> sampdakart@gmail.com
        <br />
        <strong>Phone:</strong> +9120053008
      </p>

      <p className="mt-6 text-gray-700 font-semibold">
        We value your trust and are committed to providing a hassle-free
        experience. Thank you for choosing{" "}
        <strong className="text-blue-600">Sampdakart</strong>!
      </p>
    </div>
  );
}
