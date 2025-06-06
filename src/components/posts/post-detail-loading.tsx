export function PostDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="p-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-2/3">
              <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>

              <div className="mb-4 flex items-center">
                <div className="mr-3 size-10 animate-pulse rounded-full bg-gray-200"></div>
                <div>
                  <div className="mb-1 h-5 w-32 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>

              <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
              <div className="mb-6 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>

              <div className="mb-6 flex flex-wrap gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg bg-gray-50 p-3 text-center">
                    <div className="mx-auto mb-1 h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                    <div className="mx-auto h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200"></div>
                <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
