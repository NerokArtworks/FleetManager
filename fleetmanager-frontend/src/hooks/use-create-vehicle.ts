import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../api/axios";
import { type VehicleFormData } from "../schemas/vehicle";
import { type Vehicle } from "../types/Vehicle";

export const useCreateVehicle = (
	filters: Record<string, any>,
	onSuccess?: () => void
) => {
	const queryClient = useQueryClient();

	const createVehicle = async (data: VehicleFormData) => {
		const normalizedData = {
			PlateNumber: data.plateNumber,
			Make: data.make,
			Model: data.model,
			Year: data.year,
			Status: data.status,
			Kilometers: data.kilometers,
			VIN: data.vin,
			LastInspectionDate: data.lastInspectionDate || null,
			NextInspectionDue: data.nextInspectionDue || null,
			Location: data.location || null,
			Notes: data.notes || null,
		};

		try {
			const response = await api.post("/vehicle", normalizedData);
			const createdVehicle: Vehicle = response.data;

			queryClient.setQueryData(
				["vehicles", "infinite-list", ...Object.values(filters)],
				(oldData: any) => {
					if (!oldData) return oldData;
					const newPages = [...oldData.pages];
					newPages[0] = {
						...newPages[0],
						data: [createdVehicle, ...newPages[0].data],
					};
					return { ...oldData, pages: newPages };
				}
			);

			toast.success("Vehicle created!");
			onSuccess?.();
		} catch (err) {
			console.error(err);
			toast.error("Error creating vehicle");
		}
	};

	return { createVehicle };
};