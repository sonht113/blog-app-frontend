"use client";

import { useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook for managing URL query parameters
 * Provides methods to set, update, delete, and reset query params
 */
export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Set a single query parameter (preserves other params)
   * @param key - The query parameter key
   * @param value - The query parameter value
   */
  const setParam = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set(key, value.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  /**
   * Set multiple query parameters at once (preserves other params)
   * @param paramsObj - Object containing key-value pairs to set
   */
  const setParams = useCallback(
    (paramsObj: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      Object.entries(paramsObj).forEach(([key, value]) => {
        params.set(key, value.toString());
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  /**
   * Delete a single query parameter
   * @param key - The query parameter key to delete
   */
  const deleteParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.delete(key);
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : window.location.pathname);
    },
    [router, searchParams]
  );

  /**
   * Delete multiple query parameters
   * @param keys - Array of query parameter keys to delete
   */
  const deleteParams = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      keys.forEach((key) => params.delete(key));
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : window.location.pathname);
    },
    [router, searchParams]
  );

  /**
   * Update query parameters (sets new values, optionally deletes specified params)
   * @param paramsToSet - Object containing key-value pairs to set
   * @param paramsToDelete - Array of keys to delete
   */
  const updateParams = useCallback(
    (
      paramsToSet?: Record<string, string | number>,
      paramsToDelete?: string[]
    ) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      // Delete specified params
      if (paramsToDelete) {
        paramsToDelete.forEach((key) => params.delete(key));
      }

      // Set new params
      if (paramsToSet) {
        Object.entries(paramsToSet).forEach(([key, value]) => {
          params.set(key, value.toString());
        });
      }

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : window.location.pathname);
    },
    [router, searchParams]
  );

  /**
   * Get a single query parameter value
   * @param key - The query parameter key
   * @returns The parameter value or null
   */
  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams?.get(key) || null;
    },
    [searchParams]
  );

  /**
   * Get all query parameters as an object
   * @returns Object containing all query parameters
   */
  const getAllParams = useCallback((): Record<string, string> => {
    const params: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },
  [searchParams]
  );

  /**
   * Reset all query parameters (clears the URL)
   */
  const resetParams = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  return {
    setParam,
    setParams,
    deleteParam,
    deleteParams,
    updateParams,
    getParam,
    getAllParams,
    resetParams,
  };
};
