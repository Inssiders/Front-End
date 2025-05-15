export function PostDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <div className="bg-gray-200 animate-pulse w-full h-96 rounded-lg"></div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 animate-pulse h-8 w-3/4 rounded mb-4"></div>

              <div className="flex items-center mb-4">
                <div className="bg-gray-200 animate-pulse w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <div className="bg-gray-200 animate-pulse h-5 w-32 rounded mb-1"></div>
                  <div className="bg-gray-200 animate-pulse h-4 w-16 rounded"></div>
                </div>
              </div>

              <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-full rounded mb-2"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded mb-6"></div>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
                <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
                <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
                <div className="bg-gray-200 animate-pulse h-6 w-20 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-3 rounded-lg text-center"
                  >
                    <div className="bg-gray-200 animate-pulse h-6 w-16 mx-auto rounded mb-1"></div>
                    <div className="bg-gray-200 animate-pulse h-4 w-12 mx-auto rounded"></div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="bg-gray-200 animate-pulse h-10 rounded-lg flex-1"></div>
                <div className="bg-gray-200 animate-pulse h-10 rounded-lg flex-1"></div>
                <div className="bg-gray-200 animate-pulse h-10 rounded-lg flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-gray-200 animate-pulse h-8 w-48 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse h-24 w-full rounded-lg"
            ></div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-gray-200 animate-pulse h-8 w-48 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse h-48 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
