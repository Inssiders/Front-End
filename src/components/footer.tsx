import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 InSSider. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/terms"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
