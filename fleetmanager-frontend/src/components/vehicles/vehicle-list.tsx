import type { Vehicle } from "../../types/Vehicle";
import VehicleCard from "./vehicle-card";
import VehicleListHeader from "./vehicle-list-header";

const VehicleList = ({ vehicles, onEdit, onDelete }: {
    vehicles: Vehicle[];
    onEdit: (v: Vehicle) => void;
    onDelete: (v: Vehicle) => void;
}) => {
    return (
        <div>
            <h2 className="text-xl mb-4 font-semibold text-gray-800 dark:text-gray-50">Vehicle List</h2>

            <table className="w-full border-separate border-spacing-y-2">
                <VehicleListHeader />
                <tbody>
                    {vehicles.map((v) => (
                        <VehicleCard
                            key={v.id}
                            vehicle={v}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleList;