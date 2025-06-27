import { useState } from "react";
import { type VehicleStatus } from "../types/Vehicle";

export const useVehicleFilters = () => {
	const [statusFilter, setStatusFilter] = useState<VehicleStatus | "">("");
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("createdAt");
	const [sortDesc, setSortDesc] = useState(true);

	return {
		filters: { status: statusFilter || undefined, search: search || undefined, sortBy, sortDesc },
		statusFilter,
		setStatusFilter,
		search,
		setSearch,
		sortBy,
		setSortBy,
		sortDesc,
		setSortDesc,
	};
};