import { Skeleton } from "@/components/ui/skeleton"

export default function TrendingDetailLoading() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      <Skeleton className="w-full h-[500px]" />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Skeleton className="h-12 w-12 rounded-full mr-4" />
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        <Skeleton className="h-8 w-3/4 mb-4" />

        <div className="flex gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>

        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-8" />

        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 mb-6">
          <div className="flex justify-between">
            <div className="flex space-x-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}
