"use client";

import { usePathname } from "next/navigation";

type ActiveOptions = {
  exact?: boolean;
};

type ClassPair = {
  active?: string;
  inactive?: string;
};

/**
 * useActiveRoute
 * - `isActive(path, { exact })` returns true when `path` matches the current pathname
 * - `activeClass(path, { active, inactive }, { exact })` returns the appropriate class string
 */
export default function useActiveRoute() {
  const pathname = usePathname() ?? "/";

  function isActive(path: string | string[], options?: ActiveOptions): boolean {
    const exact = options?.exact ?? false;
    if (!pathname) return false;

    if (Array.isArray(path)) {
      return path.some((p) => isActive(p, options));
    }

    if (exact) return pathname === path;

    // treat root specially
    if (path === "/") return pathname === "/";

    // match path prefix (so '/about' matches '/about' and '/about/team')
    if (pathname === path) return true;
    // ensure comparing segments: '/about' should match '/about/*' but not '/about-us'
    const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
    return pathname.startsWith(normalized + "/");
  }

  function activeClass(
    path: string | string[],
    classes: ClassPair = { active: "text-primary font-semibold", inactive: "text-gray-900 hover:text-primary" },
    options?: ActiveOptions
  ) {
    return isActive(path, options) ? classes.active ?? "" : classes.inactive ?? "";
  }

  return { pathname, isActive, activeClass } as const;
}
