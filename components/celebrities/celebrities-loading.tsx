import { Skeleton } from "@/components/ui/skeleton"

export default function CelebritiesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <Skeleton className="w-full h-32" />
            <div className="p-5 pt-12 relative">
              <div className="absolute -top-10 left-5">
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32 mb-1" />
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-16 w-full rounded-md mb-4" />
              <div className="flex justify-between mb-4">
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-24" />
              </div>
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
