export function PointsDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-200 animate-pulse w-24 h-24 rounded-full mb-4"></div>
                <div className="bg-gray-200 animate-pulse h-8 w-48 rounded mb-1"></div>
                <div className="bg-gray-200 animate-pulse h-5 w-24 rounded mb-4"></div>

                <div className="bg-gray-100 w-full h-4 rounded-full mb-2">
                  <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded-full"></div>
                </div>
                <div className="bg-gray-200 animate-pulse h-4 w-48 rounded mb-6"></div>

                <div className="bg-blue-50 p-4 rounded-lg w-full mb-6">
                  <div className="flex justify-between items-center">
                    <div className="bg-gray-200 animate-pulse h-5 w-24 rounded"></div>
                    <div className="bg-gray-200 animate-pulse h-8 w-32 rounded"></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg w-full">
                  <div className="bg-gray-200 animate-pulse h-5 w-16 rounded mb-3"></div>
                  <div className="bg-gray-200 animate-pulse h-10 w-24 mx-auto rounded"></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="mb-8">
                <div className="bg-gray-200 animate-pulse h-7 w-32 rounded mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="bg-gray-200 animate-pulse h-12 w-12 rounded-full mx-auto mb-2"></div>
                      <div className="bg-gray-200 animate-pulse h-5 w-32 mx-auto rounded mb-1"></div>
                      <div className="bg-gray-200 animate-pulse h-4 w-24 mx-auto rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-gray-200 animate-pulse h-7 w-32 rounded mb-4"></div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3">
                    <div className="flex">
                      <div className="bg-gray-200 animate-pulse h-5 w-24 rounded flex-1 mx-1"></div>
                      <div className="bg-gray-200 animate-pulse h-5 w-32 rounded flex-1 mx-1"></div>
                      <div className="bg-gray-200 animate-pulse h-5 w-24 rounded flex-1 mx-1"></div>
                    </div>
                  </div>
                  <div className="p-3 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex">
                        <div className="bg-gray-200 animate-pulse h-5 w-24 rounded flex-1 mx-1"></div>
                        <div className="bg-gray-200 animate-pulse h-5 w-32 rounded flex-1 mx-1"></div>
                        <div className="bg-gray-200 animate-pulse h-5 w-24 rounded flex-1 mx-1"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <div className="bg-gray-200 animate-pulse h-5 w-32 rounded inline-block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-gray-200 animate-pulse h-7 w-48 rounded mb-4"></div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-16 w-full rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
