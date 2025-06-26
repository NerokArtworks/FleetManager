import { formatDate } from "../../lib/utils";
import { type Vehicle, vehicleStatuses } from "../../types/Vehicle";
import { Badge } from "../ui/badge";
import ActionButtons from "./vehicle-list-action-buttons";

interface VehicleCardMobileProps {
    vehicle: Vehicle;
    onEdit: (vehicle: Vehicle) => void;
    onDelete: (vehicle: Vehicle) => void;
}

const VehicleCardMobile = ({ vehicle, onEdit, onDelete }: VehicleCardMobileProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow my-2 w-full">
            <div className="flex justify-between items-center mb-2">
                <div className="font-mono font-semibold bg-muted rounded dark:bg-muted-dark">
                    {vehicle.plateNumber}
                </div>
                <Badge variant={vehicle.status === vehicleStatuses[0] ? "default" : "secondary"}>
                    {vehicle.status}
                </Badge>
            </div>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark mb-1">
                {vehicle.make} {vehicle.model} · {vehicle.year}
            </p>
            <p className="text-sm mb-1"><strong>Kilometers:</strong> {vehicle.kilometers.toLocaleString()} km</p>
            <p className="text-sm mb-1"><strong>Location:</strong> {vehicle.location ?? "-"}</p>
            <p className="text-sm mb-1"><strong>Last Inspection:</strong> {formatDate(vehicle.lastInspectionDate)}</p>
            <p className="text-sm mb-3"><strong>Next Due:</strong> {formatDate(vehicle.nextInspectionDue)}</p>

            <div className="flex justify-end gap-2">
                <ActionButtons onEdit={onEdit} onDelete={onDelete} vehicle={vehicle} />
            </div>
        </div>
    )
}

export default VehicleCardMobile;