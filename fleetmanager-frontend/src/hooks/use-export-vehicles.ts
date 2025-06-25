import api from '../api/axios';
import type { VehicleStatus } from '../types/Vehicle';

export const useExportVehicles = (
    statusFilter: VehicleStatus | "",
    search: string,
    sortBy: string,
    sortDesc: boolean
) => {
    const exportCSV = async () => {
        try {
            const params = {
                status: statusFilter || undefined,
                search: search || undefined,
                sortBy,
                sortDesc,
            };

            const response = await api.get('/vehicles/export', {
                params,
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

            // Aquí podrías mostrar notificación de éxito
        } catch (error) {
            console.error('Error exporting CSV:', error);
            // Aquí puedes mostrar notificación de error
        }
    };

    return { exportCSV };
};
