import { Skeleton } from "@/components/ui/skeleton"

export default function ChallengesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <Skeleton className="w-full aspect-video" />
            <div className="p-5">
              <Skeleton className="h-5 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />

              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-px w-full mb-4" />

              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
