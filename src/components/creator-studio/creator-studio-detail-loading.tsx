export function CreatorStudioDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 animate-pulse w-full h-48 rounded-lg"></div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
                  <div className="bg-gray-200 animate-pulse h-5 w-24 rounded"></div>
                </div>

                <div className="bg-gray-200 animate-pulse h-7 w-full rounded mb-2"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-1"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-1"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-4"></div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-200 animate-pulse h-6 w-16 rounded-full"></div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-50 p-2 rounded">
                      <div className="bg-gray-200 animate-pulse h-4 w-16 rounded mb-1"></div>
                      <div className="bg-gray-200 animate-pulse h-5 w-20 rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="bg-gray-200 animate-pulse h-10 w-full rounded-lg"></div>
                  <div className="bg-gray-200 animate-pulse h-10 w-full rounded-lg"></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="border-b mb-6">
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-200 animate-pulse h-8 w-24 rounded-t-lg mx-1"></div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
                  ))}
                </div>

                <div className="bg-gray-200 animate-pulse h-64 w-full rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
