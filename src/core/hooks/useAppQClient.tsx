import { InfiniteData, useQueryClient, QueryKey, QueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

// ✅ Types
type ActionType = 'add' | 'update' | 'delete';

// ✅ 1. BaseItem Interface
export interface BaseItem {
    id?: string | number;
    [key: string]: any;
}

export interface CacheAction<T> {
    type: ActionType;
    queryKey: QueryKey;
    data: T | string | number; // Object for Add/Update, ID string for Delete
    isInfinite?: boolean;
}

type PageStructure<T> = T[] | { data?: T[]; items?: T[];[key: string]: any };

// ✅ 2. Helper: Get ID safely (Checks id first)
const getId = (item: any): string | number => {
    if (item.id !== undefined) return item.id;
    throw new Error("Item must have 'id' property");
};

// ✅ Helper: Check for Infinite Data
function isInfiniteData<T>(data: any): data is InfiniteData<PageStructure<T>> {
    return data && typeof data === 'object' && 'pages' in data && Array.isArray(data.pages);
}

// ✅ Helper: Extract List & Key from a Page
function getPageListDetails<T>(page: PageStructure<T>) {
    const isArray = Array.isArray(page);
    const pageObj = page as Record<string, any>;

    // Key dhundo (data vs items vs record)
    const listKey = isArray ? null : (pageObj.data ? 'data' : (pageObj.items ? 'items' : 'data'));

    // List nikalo
    const list: T[] = isArray ? (page as T[]) : (pageObj[listKey!] || []);

    return { isArray, listKey, list, pageObj };
}

// Pure function for updating cache, usable outside React hooks/components
export function updateQueryCache<T extends BaseItem>(
    queryClient: QueryClient,
    action: CacheAction<T>
) {
    const { type, queryKey, data, isInfinite } = action;

    // ✅ Target ID Nikalo:
    // Agar 'delete' hai to data khud ID h.
    // Agar 'add/update' hai to object ke andar se ID (id) nikalo.
    const targetId = (typeof data === 'object' && data !== null) ? getId(data) : data;

    queryClient.setQueryData(queryKey, (oldData: T[] | InfiniteData<PageStructure<T>> | undefined) => {
        // ---------------------------------------------------------
        // 🛡️ 1. EMPTY CACHE HANDLING
        // ---------------------------------------------------------
        if (!oldData) {
            if (type === 'add') {
                if (isInfinite) {
                    return {
                        pages: [{
                            items: [data as T],
                            data: [data as T],
                            total: 1,
                            page: 1,
                            size: 50,
                            pages: 1
                        }],
                        pageParams: [1],
                    } as InfiniteData<PageStructure<T>>;
                }
                return [data as T];
            }
            return [];
        }

        // ---------------------------------------------------------
        // 🔄 2. INFINITE SCROLL HANDLING
        // ---------------------------------------------------------
        if (isInfiniteData<T>(oldData)) {
            // Rare: Pages array is empty
            if (oldData.pages.length === 0 && type === 'add') {
                return { ...oldData, pages: [{
                    items: [data as T],
                    data: [data as T],
                    total: 1,
                    page: 1,
                    size: 50,
                    pages: 1
                }] };
            }

            // A. Update/Delete logic on ALL pages
            const newPages = oldData.pages.map((page) => {
                const { isArray, listKey, list, pageObj } = getPageListDetails<T>(page);

                let newList = [...list];

                if (type === 'delete') {
                    newList = list.filter((item) => getId(item) !== targetId);
                }
                else if (type === 'update') {
                    newList = list.map((item) => getId(item) === targetId ? (data as T) : item);
                }

                if (isArray) return newList;
                return { ...pageObj, [listKey!]: newList };
            });

            // B. Add Logic (Only on First Page)
            if (type === 'add') {
                if (newPages.length > 0) {
                    const firstPage = newPages[0];
                    const { isArray, listKey, list: currentList, pageObj } = getPageListDetails<T>(firstPage);

                    const exists = currentList.some(item => getId(item) === targetId);

                    if (!exists) {
                        if (isArray) {
                            newPages[0] = [data as T, ...currentList];
                        } else {
                            newPages[0] = {
                                ...pageObj,
                                [listKey!]: [data as T, ...currentList]
                            };
                        }
                    }
                } else {
                    // @ts-ignore
                    newPages.push([data as T]);
                }
            }

            return { ...oldData, pages: newPages };
        }

        // ---------------------------------------------------------
        // 📄 3. FLAT LIST HANDLING (Handles both Array and wrapped Objects)
        // ---------------------------------------------------------
        const { isArray, listKey, list, pageObj } = getPageListDetails<T>(oldData as PageStructure<T>);
        let newList = [...list];

        switch (type) {
            case 'add':
                const exists = list.some(item => getId(item) === targetId);
                if (exists) return oldData; // No change if already exists
                newList = [data as T, ...list];
                break;

            case 'update':
                newList = list.map((item) =>
                    getId(item) === targetId ? (data as T) : item
                );
                break;

            case 'delete':
                newList = list.filter((item) => getId(item) !== targetId);
                break;
        }

        if (isArray) return newList;
        return { ...pageObj, [listKey!]: newList };
    });
}

export const useAppQClient = () => {
    const queryClient = useQueryClient();

    const updateCache = useCallback(<T extends BaseItem>(action: CacheAction<T>) => {
        updateQueryCache(queryClient, action);
    }, [queryClient]);

    const invalidateCache = useCallback((queryKey: QueryKey) => {
        queryClient.invalidateQueries({ queryKey });
    }, [queryClient]);

    return {
        updateCache,
        invalidateCache
    };
};
