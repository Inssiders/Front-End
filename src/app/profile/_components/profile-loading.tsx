import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex justify-center">
        <div className="w-full max-w-3xl rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          <div className="grid grid-cols-5 gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  );
}
