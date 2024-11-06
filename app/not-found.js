import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = headers();

  const domain = headersList.get("host");
  //   const data = await getSiteData(domain);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
        <h2 className="text-3xl font-bold text-red-500 mb-4">404 Not Found</h2>

        <p className="mb-4">We couldn't find the page you were looking for.</p>

        <Link
          href="/"
          className="inline-block px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
