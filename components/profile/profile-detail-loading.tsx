export function ProfileDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-200 animate-pulse h-48"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
              <div className="bg-gray-200 animate-pulse w-32 h-32 rounded-full border-4 border-white -mt-20 mb-4"></div>
              <div className="bg-gray-200 animate-pulse h-8 w-48 rounded mb-1"></div>
              <div className="bg-gray-200 animate-pulse h-5 w-32 rounded mb-4"></div>

              <div className="flex gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-gray-200 animate-pulse h-6 w-16 rounded mb-1"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-12 rounded"></div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-200 animate-pulse h-6 w-16 rounded mb-1"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-12 rounded"></div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-200 animate-pulse h-6 w-16 rounded mb-1"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-12 rounded"></div>
                </div>
              </div>

              <div className="bg-gray-200 animate-pulse h-10 w-full md:w-32 rounded-full mb-6"></div>

              <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                <div className="bg-gray-200 animate-pulse h-6 w-24 rounded mb-2"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-4"></div>
                <div className="bg-gray-200 animate-pulse h-4 w-32 rounded"></div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                <div className="bg-gray-200 animate-pulse h-6 w-24 rounded mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-200 animate-pulse h-8 w-32 rounded-full"></div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg w-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-gray-200 animate-pulse h-6 w-24 rounded"></div>
                  <div className="bg-gray-200 animate-pulse h-6 w-16 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="bg-gray-200 animate-pulse h-4 w-16 rounded"></div>
                  <div className="bg-gray-200 animate-pulse h-5 w-8 rounded"></div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 mt-8 md:mt-0 md:pl-8">
              <div className="flex border-b">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-gray-200 animate-pulse h-10 w-24 mx-1 rounded-t"></div>
                ))}
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-200 animate-pulse h-48 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
