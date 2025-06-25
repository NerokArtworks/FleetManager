const VehicleListHeader = () => {
    return (
        <thead>
            <tr className="text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                <th className="text-left pl-4 min-w-[220px]">Plate / Model</th>
                <th>Status</th>
                <th>KM</th>
                <th>Location</th>
                <th>Last</th>
                <th>Next</th>
                <th className="pr-4 w-20">Actions</th>
            </tr>
        </thead>
    );
};

export default VehicleListHeader;