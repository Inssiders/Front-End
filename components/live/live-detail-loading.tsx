export function LiveDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-200 animate-pulse rounded-lg overflow-hidden">
            <div className="relative pb-[56.25%]">
              <div className="absolute inset-0 w-full h-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md mt-4 p-6">
            <div className="bg-gray-200 animate-pulse h-8 w-3/4 rounded mb-2"></div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-gray-200 animate-pulse w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <div className="bg-gray-200 animate-pulse h-5 w-32 rounded mb-1"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-24 rounded"></div>
                </div>
              </div>
              <div className="bg-gray-200 animate-pulse h-10 w-24 rounded-full"></div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
              <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
              <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gray-200 animate-pulse h-5 w-16 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-5 w-16 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-5 w-24 rounded"></div>
            </div>

            <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded"></div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <div className="bg-gray-200 animate-pulse h-6 w-32 rounded"></div>
            </div>

            <div className="flex-1 p-4 space-y-3">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-gray-200 animate-pulse w-6 h-6 rounded-full mr-2"></div>
                    <div className="bg-gray-200 animate-pulse max-w-[80%] h-12 rounded-lg"></div>
                  </div>
                ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <div className="bg-gray-200 animate-pulse flex-1 h-10 rounded-full"></div>
                <div className="bg-gray-200 animate-pulse w-16 h-10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
