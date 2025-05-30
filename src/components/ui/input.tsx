import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-input bg-main-50 dark:bg-sub-50 px-4 py-3 text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-400 focus-visible:border-main-400 focus-visible:bg-white dark:focus-visible:bg-gray-900 shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
