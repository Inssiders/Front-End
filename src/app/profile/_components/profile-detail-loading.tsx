export function ProfileDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="h-48 animate-pulse bg-gray-200"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center md:w-1/3 md:items-start">
              <div className="-mt-20 mb-4 size-32 animate-pulse rounded-full border-4 border-white bg-gray-200"></div>
              <div className="mb-1 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
              <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200"></div>

              <div className="mb-6 flex gap-4">
                <div className="text-center">
                  <div className="mb-1 h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="text-center">
                  <div className="mb-1 h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="text-center">
                  <div className="mb-1 h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>

              <div className="mb-6 h-10 w-full animate-pulse rounded-full bg-gray-200 md:w-32"></div>

              <div className="mb-6 w-full rounded-lg bg-gray-50 p-4">
                <div className="mb-2 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="mb-4 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
              </div>

              <div className="mb-6 w-full rounded-lg bg-gray-50 p-4">
                <div className="mb-3 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-32 animate-pulse rounded-full bg-gray-200"></div>
                  ))}
                </div>
              </div>

              <div className="w-full rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-5 w-8 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-2/3 md:pl-8">
              <div className="flex border-b">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="mx-1 h-10 w-24 animate-pulse rounded-t bg-gray-200"></div>
                ))}
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
