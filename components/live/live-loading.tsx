import { Skeleton } from "@/components/ui/skeleton"

export default function LiveLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <Skeleton className="w-full aspect-video" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
