export const vehicleStatuses = ["Active", "Inactive", "Maintenance", "Retired"] as const;
export type VehicleStatus = typeof vehicleStatuses[number];

export interface Vehicle {
	id: string;
	plateNumber: string;
	make: string;
	model: string;
	year: number;
	status: VehicleStatus;
	kilometers: number;
	vin: string;
	createdAt: string;
	lastInspectionDate?: string;
	nextInspectionDue?: string;
	lastUpdated?: string;
	location?: string;
	notes?: string;
}

export interface VehiclesSummary {
	total: number;
	active: number;
	inactive: number;
	maintenance: number;
	retired: number;
}

export interface VehicleListFilters {
	page: number;
	pageSize?: number;
	status?: VehicleStatus;
	search?: string;
	sortBy?: string;
	sortDesc?: boolean;
}