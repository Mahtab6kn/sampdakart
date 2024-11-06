"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center max-w-lg p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl mt-4">Oops! Something went wrong.</h2>
        <button
          className="mt-6 px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
