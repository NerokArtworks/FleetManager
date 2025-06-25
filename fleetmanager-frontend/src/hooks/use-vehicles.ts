import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import type { VehicleListFilters, VehiclesSummary } from '../types/Vehicle';

// Resumen para dashboard
export const useVehiclesSummary = () => {
	return useQuery<VehiclesSummary>({
		queryKey: ['vehicles', 'summary'],
		queryFn: async () => {
			const { data } = await api.get('/vehicle/summary');
			return data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
};

// Lista paginada
export const useVehiclesList = ({
	page,
	pageSize = 10,
	status,
	search,
	sortBy,
	sortDesc = false,
}: VehicleListFilters) => {
	return useQuery({
		queryKey: ['vehicles', 'list', page, pageSize, status, search, sortBy, sortDesc],
		queryFn: async () => {
			const { data } = await api.get('/vehicle', {
				params: { page, pageSize, status, search, sortBy, sortDesc },
			});
			return data;
		},
	});
};

// Prefetch (opcional)
export const useVehiclesPrefetch = () => {
	const queryClient = useQueryClient();

	return ({
		page,
		pageSize = 10,
		status,
		search,
		sortBy,
		sortDesc = false,
	}: VehicleListFilters) => {
		queryClient.prefetchQuery({
			queryKey: ['vehicles', 'list', page, pageSize, status, search, sortBy, sortDesc],
			queryFn: () =>
				api
					.get('/vehicle', {
						params: { page, pageSize, status, search, sortBy, sortDesc },
					})
					.then((res) => res.data),
		});
	};
};