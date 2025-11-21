import * as React from "react"

import { cn } from "@/lib/utils"
import { error } from "console";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & {
  errorField?: boolean;
}>(
  ({ className, type, errorField = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          errorField ? "border-red-500" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
