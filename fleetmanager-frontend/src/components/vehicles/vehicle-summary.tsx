import { CarFront, Route, Wrench } from "lucide-react";
import { vehicleStatuses, type Vehicle } from "../../types/Vehicle";
import VehicleSummaryCard from "./vehicle-summary-card";

export const VehicleSummary = ({ vehicles }: { vehicles: Vehicle[] }) => {
	const summary = [
		{
			label: "Active",
			count: vehicles.filter((v) => v.status === vehicleStatuses[0]).length,
			icon: <CarFront className="w-5 h-5 text-green-500" />,
			color: "text-green-600",
		},
		{
			label: "Inactive",
			count: vehicles.filter((v) => v.status === vehicleStatuses[1]).length,
			icon: <Route className="w-5 h-5 text-yellow-500" />,
			color: "text-yellow-600",
		},
		{
			label: "Maintenance",
			count: vehicles.filter((v) => v.status === vehicleStatuses[2]).length,
			icon: <Wrench className="w-5 h-5 text-red-500" />,
			color: "text-red-600",
		},
	];

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{summary.map((s) => (
				<VehicleSummaryCard key={s.label} {...s} />
			))}
		</div>
	);
};