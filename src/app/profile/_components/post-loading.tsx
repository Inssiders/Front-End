import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PostsLoadingProps {
  layout?: "grid" | "list" | "masonry";
  columns?: number;
  count?: number;
  className?: string;
}

export default function PostsLoading({
  layout = "grid",
  columns = 4,
  count = 8,
  className = "",
}: PostsLoadingProps) {
  const getGridColumns = () => {
    if (layout === "list") return "grid-cols-1";
    if (layout === "masonry") return "sm:grid-cols-2 md:grid-cols-3";

    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "sm:grid-cols-2";
      case 3:
        return "sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case 5:
        return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      case 6:
        return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
      default:
        return "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  return (
    <div className={cn("container mx-auto px-4 py-8", className)}>
      <div className={cn("grid gap-6", getGridColumns())}>
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "bg-white dark:bg-gray-900 rounded-lg overflow-hidden",
              layout === "list" ? "flex" : ""
            )}
          >
            <Skeleton
              className={cn(
                layout === "grid"
                  ? "w-full aspect-square"
                  : layout === "list"
                  ? "w-48 h-32 flex-shrink-0"
                  : "w-full aspect-square"
              )}
            />
            <div className={cn("p-4", layout === "list" ? "flex-1" : "")}>
              <Skeleton className="h-5 w-3/4 mb-2" />
              <div className="flex items-center mb-3">
                <Skeleton className="h-6 w-6 rounded-full mr-2" />
                <Skeleton className="h-3 w-20" />
              </div>
              {layout !== "list" && (
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
