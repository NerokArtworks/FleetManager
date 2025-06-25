import React, { useState } from "react";
import { vehicleSchema, type VehicleFormData } from "../../schemas/vehicle";
import { vehicleStatuses } from "../../types/Vehicle";
import Button from "../ui/button";
import { FormField } from "../ui/form-field";
import { FormSelect } from "../ui/form-select";

interface CreateVehicleFormProps {
	onClose: () => void;
	onSubmit: (data: VehicleFormData) => Promise<void>;
}

export const CreateVehicleForm = ({ onClose, onSubmit }: CreateVehicleFormProps) => {
	const [formData, setFormData] = useState<VehicleFormData>({
		plateNumber: "",
		make: "",
		model: "",
		year: new Date().getFullYear(),
		status: vehicleStatuses[0],
		kilometers: 0,
		vin: "",
		lastInspectionDate: "",
		nextInspectionDue: "",
		lastUpdated: "",
		location: "",
		notes: "",
	});

	const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormData, string>>>({});

	const handleChange = (field: keyof VehicleFormData, value: string) => {
		let val: any = value;
		if (field === "year" || field === "kilometers") {
			val = Number(value);
		}
		setFormData((prev) => ({
			...prev,
			[field]: val,
		}));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = vehicleSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<Record<keyof VehicleFormData, string>> = {};
			for (const err of result.error.errors) {
				if (err.path[0]) {
					fieldErrors[err.path[0] as keyof VehicleFormData] = err.message;
				}
			}
			setErrors(fieldErrors);
			return;
		}

		await onSubmit(result.data);
		onClose();
	};

	return (
		<div className="max-h-[90vh] overflow-y-auto p-6 w-full">
			<h2 id="modal-title" className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
				Create New Vehicle
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6" noValidate>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Plate Number */}
					<FormField
						id="plateNumber"
						label="Plate Number"
						error={errors.plateNumber}
						value={formData.plateNumber}
						onChange={(val) => handleChange("plateNumber", val)}
						placeholder="ABC-1234"
					/>

					{/* VIN */}
					<FormField
						id="vin"
						label="VIN"
						error={errors.vin}
						value={formData.vin}
						onChange={(val) => handleChange("vin", val)}
						placeholder="1HGCM82633A004352"
					/>

					{/* Make */}
					<FormField
						id="make"
						label="Make"
						error={errors.make}
						value={formData.make}
						onChange={(val) => handleChange("make", val)}
						placeholder="Toyota"
					/>

					{/* Model */}
					<FormField
						id="model"
						label="Model"
						error={errors.model}
						value={formData.model}
						onChange={(val) => handleChange("model", val)}
						placeholder="Corolla"
					/>

					{/* Year */}
					<FormField
						id="year"
						label="Year"
						type="number"
						error={errors.year}
						value={formData.year}
						onChange={(val) => handleChange("year", val)}
						placeholder="2023"
						min={1900}
						max={new Date().getFullYear()}
					/>

					{/* Status */}
					<FormSelect
						id="status"
						label="Status"
						value={formData.status}
						options={vehicleStatuses.map((status) => ({ label: status, value: status }))}
						onChange={(val) => handleChange("status", val)}
						error={errors.status}
					/>

					{/* Kilometers */}
					<FormField
						id="kilometers"
						label="Kilometers"
						type="number"
						error={errors.kilometers}
						value={formData.kilometers}
						onChange={(val) => handleChange("kilometers", val)}
						placeholder="100000"
					/>

					{/* Location */}
					<FormField
						id="location"
						label="Location"
						value={formData.location || ""}
						onChange={(val) => handleChange("location", val)}
						placeholder="Madrid Garage"
					/>

					{/* Last Inspection */}
					<FormField
						id="lastInspectionDate"
						label="Last Inspection Date"
						type="date"
						value={formData.lastInspectionDate || ""}
						onChange={(val) => handleChange("lastInspectionDate", val)}
					/>

					{/* Next Inspection */}
					<FormField
						id="nextInspectionDue"
						label="Next Inspection Due"
						type="date"
						value={formData.nextInspectionDue || ""}
						onChange={(val) => handleChange("nextInspectionDue", val)}
					/>

					{/* Last Updated */}
					<FormField
						id="lastUpdated"
						label="Last Updated"
						type="date"
						value={formData.lastUpdated || ""}
						onChange={(val) => handleChange("lastUpdated", val)}
					/>
				</div>

				{/* Notes */}
				<div>
					<label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Notes
					</label>
					<textarea
						id="notes"
						placeholder="Any additional notes"
						value={formData.notes || ""}
						onChange={(e) => handleChange("notes", e.target.value)}
						className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-end space-x-3 pt-4">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" variant="primary">
						Create
					</Button>
				</div>
			</form>

		</div>
	);
};