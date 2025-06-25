import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../api/axios';
import type { VehicleListFilters } from '../types/Vehicle';

export const useVehiclesInfiniteList = ({
    status,
    search,
    sortBy,
    sortDesc = false,
    pageSize = 10,
}: Omit<VehicleListFilters, 'page'>) => {
    return useInfiniteQuery({
        queryKey: ['vehicles', 'infinite-list', status, search, sortBy, sortDesc],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await api.get('/vehicle', {
                params: {
                    page: pageParam,
                    pageSize,
                    status,
                    search,
                    sortBy,
                    sortDesc,
                },
            });
            return data;
        },
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
            if (lastPage.page < totalPages) return lastPage.page + 1;
            return undefined;
        },
        staleTime: 5 * 60 * 1000,
        initialPageParam: 1,  // <--- Aquí el valor inicial del pageParam
    });
};
