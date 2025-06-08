import { Skeleton } from "@/components/ui/skeleton";
import styles from "./settings-loading.module.css";

export default function SettingsLoading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.tabSkeletonWrapper}>
        <div className={styles.tabSkeletonContainer}>
          <div className={styles.tabGrid}>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className={styles.tabSkeleton} />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className={styles.mainSkeleton} />
    </div>
  );
}
