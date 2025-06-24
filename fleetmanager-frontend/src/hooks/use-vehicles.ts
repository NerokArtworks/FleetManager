import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import type { Vehicle } from '../types/Vehicle';

export interface VehiclesSummary {
	active: number;
	inactive: number;
	maintenance: number;
}

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
export const useVehiclesList = (page: number, pageSize: number = 10) => {
	return useQuery<{
		data: Vehicle[];
		total: number;
		page: number;
		pageSize: number;
	}>({
		queryKey: ['vehicles', 'list', page, pageSize],
		queryFn: async () => {
			const { data } = await api.get('/vehicle', {
				params: { page, pageSize },
			});
			return data;
		}
	});
};

// Prefetch (opcional)
export const useVehiclesPrefetch = () => {
	const queryClient = useQueryClient();
	return (page: number, pageSize: number = 10) => {
		queryClient.prefetchQuery({
			queryKey: ['vehicles', 'list', page, pageSize],
			queryFn: () => {
				api.get('/vehicles', { params: { page, pageSize } }).then((res) => res.data)
			}
		});
	};
};
