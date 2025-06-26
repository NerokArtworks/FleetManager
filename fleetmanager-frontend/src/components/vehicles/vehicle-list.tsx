import type { Vehicle } from "../../types/Vehicle";
import VehicleCard from "./vehicle-card";
import VehicleCardMobile from "./vehicle-card-mobile";
import VehicleListHeader from "./vehicle-list-header";

const VehicleList = ({
    vehicles,
    onEdit,
    onDelete,
}: {
    vehicles: Vehicle[];
    onEdit: (v: Vehicle) => void;
    onDelete: (v: Vehicle) => void;
}) => {
    return (
        <div className="w-full">
            <h2 className="text-xl mb-4 font-semibold text-gray-800 dark:text-gray-50">Vehicle List</h2>

            {/* Desktop Table */}
            <div className="w-full overflow-x-auto hidden sm:block">
                <table className="min-w-full border-separate border-spacing-y-2">
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

            {/* Mobile List */}
            <div className="sm:hidden flex flex-col gap-4">
                {vehicles.map((v) => (
                    <VehicleCardMobile
                        key={v.id}
                        vehicle={v}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default VehicleList;