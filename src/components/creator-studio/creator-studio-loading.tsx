import { Skeleton } from "@/components/ui/skeleton"

export default function CreatorStudioLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-3xl">
          <div className="grid grid-cols-4 gap-1">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
