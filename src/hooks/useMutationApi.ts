import {
  useMutation,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { toast, type ToastOptions } from "react-toastify";

type MessageGenerator<TData, TVariables> =
  | string
  | ((data: TData | undefined, variables: TVariables | undefined) => string);

type ErrorMessageGenerator<TError, TVariables> =
  | string
  | ((
      error: TError | null | undefined,
      variables: TVariables | undefined
    ) => string);

export type UseMutationApiOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & {
    successMessageCustom?: MessageGenerator<TData, TVariables>;
    errorMessageCustom?: ErrorMessageGenerator<TError, TVariables>;
    toastOptions?: ToastOptions;
    invalidateQueries?: QueryKey | QueryKey[];
  };

export function useMutationApi<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationApiOptions<TData, TError, TVariables, TContext>
) {
  const {
    successMessageCustom,
    errorMessageCustom,
    toastOptions,
    ...restOptions
  } = options || {};
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...restOptions,
    onSuccess(data, variables, _context) {
      try {
        if (successMessageCustom) {
          const msg =
            typeof successMessageCustom === "function"
              ? successMessageCustom(data, variables)
              : successMessageCustom;
          toast.success(msg, toastOptions);
        }
      } catch {
        // swallow toast errors
      }
    },
    onError(error, variables, _context) {
      try {
        if (errorMessageCustom) {
          const msg =
            typeof errorMessageCustom === "function"
              ? errorMessageCustom(error as any, variables)
              : errorMessageCustom;
          toast.error(msg, toastOptions);
        } else {
          // default behaviour: try to show a useful message
          const defaultMsg = (error as any)?.message || "An error occurred";
          toast.error(defaultMsg, toastOptions);
        }
      } catch {
        // swallow toast errors
      }
    },
  });
}

export default useMutationApi;
