import api from '../api/axios';
import type { VehicleStatus } from '../types/Vehicle';

interface ExportFilters {
    status?: VehicleStatus;
    search?: string;
    sortBy: string;
    sortDesc: boolean;
}

export const useExportVehicles = (filters: ExportFilters) => {
    const exportCSV = async () => {
        const response = await api.get('/vehicle/export', {
            params: filters,
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'text/csv' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'vehicles.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);

        return true;
    };

    return { exportCSV };
};