export function ChallengeDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-200 animate-pulse w-full h-64 md:h-96"></div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-gray-200 animate-pulse h-10 w-64 rounded"></div>
            <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
          </div>

          <div className="flex items-center mb-6">
            <div className="bg-gray-200 animate-pulse w-10 h-10 rounded-full mr-3"></div>
            <div>
              <div className="bg-gray-200 animate-pulse h-5 w-32 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-16 rounded mt-1"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="bg-gray-200 animate-pulse h-4 w-16 rounded mb-1"></div>
                <div className="bg-gray-200 animate-pulse h-5 w-32 rounded"></div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="bg-gray-200 animate-pulse h-7 w-40 rounded mb-3"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded"></div>
          </div>

          <div className="mb-8">
            <div className="bg-gray-200 animate-pulse h-7 w-40 rounded mb-3"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex">
                  <div className="bg-gray-200 animate-pulse h-4 w-4 rounded-full mr-2"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-full rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-200 animate-pulse h-12 w-48 rounded-full"></div>
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
