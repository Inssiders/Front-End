import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-white dark:bg-gray-900">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="mb-2 h-5 w-3/4" />
              <div className="mb-3 flex items-center">
                <Skeleton className="mr-2 size-6 rounded-full" />
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
  );
}
