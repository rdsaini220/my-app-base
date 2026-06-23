import { httpClient as apiClient } from '@/core/lib/axios';
import { toast } from '@/components/primitives/toast';
import {
    InfiniteData,
    QueryKey,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions
} from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

// ✅ Standard API Response Interface
export interface ApiResponse<T = unknown> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    error: Record<string, unknown> | null;
}

// ✅ Helper to extract error message
const getErrorMessage = (error: unknown): string => {
    const axiosError = error as AxiosError<{ message?: string, error?: any }>;
    const data = axiosError.response?.data;
    
    if (data?.error && Array.isArray(data.error) && data.error.length > 0) {
        // Validation Errors
        const firstError = data.error[0];
        return `${firstError.field}: ${firstError.message}`;
    }
    
    return data?.message || axiosError.message || "Something went wrong";
};

// --------------------------------------------------------------
// 🔍 1. useAppQuery (GET Requests)
// --------------------------------------------------------------
interface UseAppQueryOptions<TData> {
    queryKey: QueryKey;
    endpoint: string;
    apiOptions?: AxiosRequestConfig;
    queryOptions?: Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'>;
    showErrorToast?: boolean; // New Config
}

export function useAppQuery<TData = unknown>(opts: UseAppQueryOptions<TData>) {
    const {
        queryKey,
        endpoint,
        apiOptions,
        queryOptions,
        showErrorToast = false // Default true
    } = opts;

    return useQuery<TData, Error>({
        queryKey,
        queryFn: async () => {
            try {
                const response = await apiClient.get<ApiResponse<TData>>(endpoint, apiOptions);
                const resData = response.data;

                if (!resData.success) {
                    throw new Error(resData.message || "Request failed logically");
                }
                return resData.data;
            } catch (error: unknown) {
                const msg = getErrorMessage(error);
                console.log("Error in useAppQuery", msg);

                if (showErrorToast) {
                    toast.error(msg);
                }
                throw new Error(msg);
            }
        },
        retry: false,
        ...queryOptions,
    });
}

// --------------------------------------------------------------
// 🔥 2. useAppMutation (POST, PUT, DELETE) - IMPROVED!
// --------------------------------------------------------------
interface UseAppMutationOptions<TData, TVariables> {
    // Endpoint ab STRING ya FUNCTION ho sakta hai (Dynamic URL ke liye)
    endpoint?: string | ((variables: TVariables) => string);
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    mutationOptions?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>;
    showErrorToast?: boolean;
    showSuccessToast?: boolean; // Success toast option
    successMessage?: string;    // Custom success message
}

export function useAppMutation<TData = unknown, TVariables = unknown>(
    opts: UseAppMutationOptions<TData, TVariables> = {}
) {
    const {
        endpoint,
        method = 'POST',
        mutationOptions,
        showErrorToast = false,
        showSuccessToast = false,
        successMessage
    } = opts;

    return useMutation<TData, Error, TVariables>({
        ...mutationOptions,
        mutationFn: async (variables) => {
            try {
                // ✅ Dynamic URL Calculation
                const finalEndpoint = typeof endpoint === 'function'
                    ? endpoint(variables)
                    : endpoint;

                if (!finalEndpoint) throw new Error("Endpoint is required");

                const response = await apiClient.request<ApiResponse<TData>>({
                    url: finalEndpoint,
                    method: method,
                    data: variables,
                });

                const resData = response.data;

                if (!resData.success) {
                    throw new Error(resData.message || "Action failed");
                }

                // ✅ Handle Success Toast here directly
                if (showSuccessToast) {
                    toast.success(successMessage || resData.message || "Operation successful");
                }

                return resData.data;

            } catch (error: unknown) {
                const msg = getErrorMessage(error);
                console.log("Error in useAppMutation", msg);

                if (showErrorToast) {
                    toast.error(msg);
                }
                throw new Error(msg);
            }
        },
    });
}

// --------------------------------------------------------------
// ♾️ 3. useAppInfiniteQuery (Pagination/Load More) - NEW!
// --------------------------------------------------------------
interface UseAppInfiniteQueryOptions<TData> {
    queryKey: QueryKey;
    endpoint: string;
    limit?: number;
    apiOptions?: AxiosRequestConfig;
    // 👇 Fix: Explicitly define the generics sequence for options
    // <TQueryFnData, TError, TData, TQueryKey, TPageParam>
    queryOptions?: Omit<
        UseInfiniteQueryOptions<TData, Error, InfiniteData<TData>, QueryKey, number>,
        'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >;
}

export function useAppInfiniteQuery<TData = unknown>(opts: UseAppInfiniteQueryOptions<TData>) {
    const { queryKey, endpoint, limit = 10, apiOptions, queryOptions } = opts;

    // React Query handles generics better through inference in v5
    return useInfiniteQuery({
        queryKey: queryKey || [],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            try {
                // Ensure pageParam is treated as number
                const page = typeof pageParam === 'number' ? pageParam : 1;

                const response = await apiClient.get<ApiResponse<TData>>(endpoint, {
                    ...apiOptions,
                    params: { skip: (page - 1) * limit, page, limit, ...apiOptions?.params },
                });

                if (!response.data.success) throw new Error(response.data.message);

                // Returns TData (Single Page)
                return response.data.data;
            } catch (error: unknown) {
                const msg = getErrorMessage(error);
                toast.error(msg);
                throw new Error(msg);
            }
        },
        getNextPageParam: (lastPage: any, allPages) => {
            if (!lastPage) return undefined;

            // Support object-based pagination like { items: [], page: 1, pages: 5 }
            if (typeof lastPage === 'object' && 'page' in lastPage && 'pages' in lastPage) {
                return lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined;
            }
            
            // Backup logic for arrays
            if (Array.isArray(lastPage)) {
                return (lastPage?.length === limit) ? (allPages?.length || 0) + 1 : undefined;
            }
            return undefined;
        },
        ...queryOptions,
    });
}
