import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-3xl">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className="h-[600px] w-full rounded-lg" />
    </div>
  )
}
