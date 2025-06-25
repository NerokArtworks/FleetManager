import { z } from "zod";
import { vehicleStatuses } from "../types/Vehicle";

export const vehicleSchema = z.object({
	plateNumber: z.string().min(1, "Plate number is required"),
	make: z.string().min(1, "Make is required"),
	model: z.string().min(1, "Model is required"),
	year: z
		.number()
		.int("Year must be an integer")
		.min(1900, "Year must be 1900 or later")
		.max(new Date().getFullYear(), `Year can't be in the future`),
	status: z.enum(vehicleStatuses, {
		errorMap: () => ({ message: "Status is required and must be valid" }),
	}),
	kilometers: z.number().int("Kilometers must be an integer").min(0, "Kilometers can't be negative"),
	vin: z.string().min(1, "VIN is required"),
	lastInspectionDate: z
		.string()
		.optional()
		.refine((val) => !val || !isNaN(Date.parse(val)), {
			message: "Last inspection date must be a valid date",
		}),
	nextInspectionDue: z
		.string()
		.optional()
		.refine((val) => !val || !isNaN(Date.parse(val)), {
			message: "Next inspection due must be a valid date",
		}),
	lastUpdated: z.string().optional(),
	location: z.string().optional(),
	notes: z.string().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;