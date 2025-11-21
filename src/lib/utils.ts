export function inputFiler(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
