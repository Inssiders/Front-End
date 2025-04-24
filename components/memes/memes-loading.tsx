import { Skeleton } from "@/components/ui/skeleton"

export default function MemesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <Skeleton className="w-full aspect-square" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <div className="flex items-center mb-3">
                <Skeleton className="h-6 w-6 rounded-full mr-2" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
