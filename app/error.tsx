"use client"; // Error boundaries must be Client Components
import { useRouter } from "next/navigation";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 max-w-lg bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-red-400">Oops!</h1>
        <p className="text-xl mt-4 text-gray-700">
          Unfortunately, there was a problem loading the page.
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Please try again later or use the links below to navigate to other
          pages.
        </p>

        <div className="mt-6 space-x-4">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 text-white bg-primary-color hover:bg-blue-300 rounded-md"
          >
            Go to Home
          </button>
          <button
            onClick={() => reset()}
            className="px-6 py-2 text-white bg-tertiary-color hover:bg-green-300 rounded-md"
          >
            Refresh
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          If this problem persists, please reach out to support.
        </p>
      </div>
    </div>
  );
}
