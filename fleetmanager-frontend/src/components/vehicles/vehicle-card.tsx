import { Pencil, Trash2 } from "lucide-react";
import { vehicleStatuses, type Vehicle } from "../../types/Vehicle";
import { Badge } from "../ui/badge";
import Button from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Props {
	vehicle: Vehicle;
	onEdit: (vehicle: Vehicle) => void;
	onDelete: (vehicle: Vehicle) => void;
}

const formatDate = (dateString?: string | null) => {
	if (!dateString) return "-";
	const date = new Date(dateString);
	return date.toLocaleDateString();
};

const VehicleCard = ({ vehicle, onEdit, onDelete }: Props) => {
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
					<TooltipProvider delayDuration={200} skipDelayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="primary" size="icon" onClick={() => onEdit(vehicle)}>
									<Pencil className="w-4 h-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Edit vehicle</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="destructive" size="icon" onClick={() => onDelete(vehicle)}>
									<Trash2 className="w-4 h-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent variant="destructive">Delete vehicle</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</td>
		</tr>
	);
};

export default VehicleCard;