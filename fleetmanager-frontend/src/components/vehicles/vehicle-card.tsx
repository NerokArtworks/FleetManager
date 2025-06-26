import { formatDate } from "../../lib/utils";
import { vehicleStatuses, type Vehicle } from "../../types/Vehicle";
import { Badge } from "../ui/badge";
import ActionButtons from "./vehicle-list-action-buttons";

interface VehicleCardProps {
	vehicle: Vehicle;
	onEdit: (vehicle: Vehicle) => void;
	onDelete: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onEdit, onDelete }: VehicleCardProps) => {
	return (
		<tr className="shadow-sm hover:shadow transition cursor-default">
			<td className="bg-white dark:bg-gray-800 pl-4 py-4 rounded-l-xl align-middle min-w-[220px]">
				<div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
					<div className="font-mono font-semibold bg-muted rounded px-2 py-1 w-fit dark:bg-muted-dark">
						{vehicle.plateNumber}
					</div>
					<div className="text-muted-foreground dark:text-muted-foreground-dark mt-1 sm:mt-0">
						{vehicle.make} {vehicle.model} · {vehicle.year}
					</div>
				</div>
			</td>

			<td className="bg-white dark:bg-gray-800 align-middle text-center">
				<Badge variant={vehicle.status === vehicleStatuses[0] ? "default" : "secondary"}>
					{vehicle.status}
				</Badge>
			</td>
			<td className="bg-white dark:bg-gray-800 align-middle text-center">{vehicle.kilometers.toLocaleString()} km</td>
			<td className="bg-white dark:bg-gray-800 align-middle text-center">{vehicle.location ?? "-"}</td>
			<td className="bg-white dark:bg-gray-800 align-middle text-center">{formatDate(vehicle.lastInspectionDate)}</td>
			<td className="bg-white dark:bg-gray-800 align-middle text-center">{formatDate(vehicle.nextInspectionDue)}</td>

			<td className="bg-white dark:bg-gray-800 pr-4 py-4 rounded-r-xl align-middle text-right">
				<div className="flex items-center justify-end gap-2">
					<ActionButtons onEdit={onEdit} onDelete={onDelete} vehicle={vehicle} />
				</div>
			</td>
		</tr>
	);
};

export default VehicleCard;