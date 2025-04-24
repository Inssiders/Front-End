import { Skeleton } from "@/components/ui/skeleton"

export default function PostDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <Skeleton className="h-6 w-48 mb-6" />
      <Skeleton className="h-5 w-20 mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-3/4 mb-6" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full mr-3" />
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />

      <div className="space-y-4 mb-8">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      <div className="flex items-center justify-between border-t border-b py-4 my-8">
        <div className="flex items-center space-x-6">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}
