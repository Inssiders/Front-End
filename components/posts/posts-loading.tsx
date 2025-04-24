import { Skeleton } from "@/components/ui/skeleton"

export default function PostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-6 w-6 rounded-full mr-2" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex space-x-3">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
