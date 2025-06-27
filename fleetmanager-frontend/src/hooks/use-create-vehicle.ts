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
		const optimisticId = `optimistic-${Date.now()}`;
		const optimisticVehicle: Vehicle = {
			id: optimisticId,
			plateNumber: data.plateNumber,
			make: data.make,
			model: data.model,
			year: data.year,
			status: data.status,
			kilometers: data.kilometers,
			vin: data.vin,
			lastInspectionDate: data.lastInspectionDate,
			nextInspectionDue: data.nextInspectionDue,
			location: data.location,
			notes: data.notes
		};

		// Optimistic insert
		queryClient.setQueryData(
			["vehicles", "infinite-list", ...Object.values(filters)],
			(oldData: any) => {
				if (!oldData) return oldData;
				const newPages = [...oldData.pages];
				newPages[0] = {
					...newPages[0],
					data: [optimisticVehicle, ...newPages[0].data],
				};
				return { ...oldData, pages: newPages };
			}
		);

		// Create vehicle request
		try {
			const response = await api.post("/vehicle", {
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
			});
			const createdVehicle: Vehicle = response.data;

			// Replace the optimistic vehicle with the real one
			queryClient.setQueryData(
				["vehicles", "infinite-list", ...Object.values(filters)],
				(oldData: any) => {
					if (!oldData) return oldData;

					const newPages = oldData.pages.map((page: any) => {
						const updatedData = page.data.map((v: Vehicle) =>
							v.id === optimisticId ? createdVehicle : v
						);
						return { ...page, data: updatedData };
					});

					return { ...oldData, pages: newPages };
				}
			);

			toast.success("Vehicle created!");
			onSuccess?.();
		} catch (err) {
			console.error(err);
			toast.error("Error creating vehicle");

			// Rollback: remove the optimistic vehicle if it failed
			queryClient.setQueryData(
				["vehicles", "infinite-list", ...Object.values(filters)],
				(oldData: any) => {
					if (!oldData) return oldData;
					const newPages = oldData.pages.map((page: any) => {
						const updatedData = page.data.filter((v: Vehicle) => v.id !== optimisticId);
						return { ...page, data: updatedData };
					});
					return { ...oldData, pages: newPages };
				}
			);
		}
	};

	return { createVehicle };
};