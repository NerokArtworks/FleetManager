export type VehicleStatus = "Active" | "Inactive" | "Maintenance" | "Retired";

export interface Vehicle {
	id: string;
	plateNumber: string;
	make: string;
	model: string;
	year: number;
	status: VehicleStatus;
	kilometers: number;
	vin: string;
	createdAt: string; // ISO date string
	lastInspectionDate?: string;
	nextInspectionDue?: string;
	lastUpdated?: string;
	location?: string;
	notes?: string;
}