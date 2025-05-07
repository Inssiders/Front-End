export function CelebrityDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 animate-pulse w-full h-80 rounded-lg"></div>
              <div className="mt-4 flex justify-between">
                <div>
                  <div className="bg-gray-200 animate-pulse h-6 w-20 rounded"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-16 rounded mt-1"></div>
                </div>
                <div>
                  <div className="bg-gray-200 animate-pulse h-6 w-20 rounded"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-16 rounded mt-1"></div>
                </div>
                <div>
                  <div className="bg-gray-200 animate-pulse h-10 w-24 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="bg-gray-200 animate-pulse h-10 w-48 rounded mb-2"></div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
                ))}
              </div>
              <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-6"></div>

              <div className="flex gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 animate-pulse h-6 w-24 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-gray-200 animate-pulse h-8 w-48 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
