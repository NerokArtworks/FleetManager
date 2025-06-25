import {
	ArrowDownAZ,
	ArrowUpAZ,
	CarFront,
	Plus,
	Route,
	Search,
	Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLoader from "../../../components/loaders/dashboard-loader";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Select from "../../../components/ui/select";
import VehicleList from "../../../components/vehicles/vehicle-list";
import VehicleSummaryCard from "../../../components/vehicles/vehicle-summary-card";
import { useAuth } from "../../../context/AuthContext";
import { useVehiclesList } from "../../../hooks/use-vehicles";
import type { Vehicle } from "../../../types/Vehicle";

const VehiclesPage = () => {
	const { loading } = useAuth();
	const [page, setPage] = useState(1);
	const pageSize = 10;

	const [statusFilter, setStatusFilter] = useState<"Active" | "Inactive" | "Maintenance" | "">("");
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("createdAt");
	const [sortDesc, setSortDesc] = useState(true);

	const { data, isLoading, error, isFetching } = useVehiclesList({
		page,
		pageSize,
		status: statusFilter || undefined,
		search: search || undefined,
		sortBy,
		sortDesc,
	});

	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [statusSummary, setStatusSummary] = useState<
		{ label: string; count: number; icon: React.ReactNode; color: string }[]
	>([]);

	useEffect(() => {
		const newVehicles: Vehicle[] = data?.data ?? [];
		setVehicles(newVehicles);

		const summary = [
			{
				label: "Active",
				count: newVehicles.filter((v) => v.status === 0).length,
				icon: <CarFront className="w-5 h-5 text-green-500" />,
				color: "text-green-600",
			},
			{
				label: "Inactive",
				count: newVehicles.filter((v) => v.status === 1).length,
				icon: <Route className="w-5 h-5 text-yellow-500" />,
				color: "text-yellow-600",
			},
			{
				label: "Maintenance",
				count: newVehicles.filter((v) => v.status === 2).length,
				icon: <Wrench className="w-5 h-5 text-red-500" />,
				color: "text-red-600",
			},
		];

		setStatusSummary(summary);
	}, [data]);

	const handleCreate = () => console.log("Create vehicle");
	const handleEdit = (v: Vehicle) => console.log("Edit", v);
	const handleDelete = (v: Vehicle) => {
		setVehicles((prev) => prev.filter((veh) => veh.id !== v.id));
	};

	if (loading) return <DashboardLoader />;
	if (error) return <div>Error fetching vehicles</div>;

	return (
		<div className="p-4 sm:p-6 space-y-8">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-50">Fleet Vehicles</h1>
				<Button variant="primary" onClick={handleCreate}>
					<Plus className="h-4 w-4 mr-2" />
					New Vehicle
				</Button>
			</div>

			{/* Filtros */}
			<div className="grid gap-4 grid-cols-1 md:grid-cols-4 items-end">
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search by name or plate"
					icon={<Search className="w-4 h-4" />}
				/>

				<Select
					label="Status"
					value={statusFilter}
					onChange={(e) =>
						setStatusFilter(e.target.value as "Active" | "Inactive" | "Maintenance" | "")
					}
				>
					<option value="">All</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
					<option value="Maintenance">Maintenance</option>
				</Select>

				<Select
					label="Sort by"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
				>
					<option value="createdAt">Created Date</option>
					<option value="name">Name</option>
				</Select>

				<Button
					variant="outline"
					onClick={() => setSortDesc((prev) => !prev)}
					className="w-full"
				>
					{sortDesc ? <ArrowDownAZ className="w-4 h-4 mr-2" /> : <ArrowUpAZ className="w-4 h-4 mr-2" />}
					{sortDesc ? "Descending" : "Ascending"}
				</Button>
			</div>

			{/* Summary Cards */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{statusSummary.map((s) => (
					<VehicleSummaryCard
						key={s.label}
						label={s.label}
						count={s.count}
						color={s.color}
						icon={s.icon}
					/>
				))}
			</div>

			{/* Lista de vehículos */}
			<VehicleList vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />

			{/* Paginación */}
			<div className="flex justify-between items-center">
				<Button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					disabled={page === 1}
					variant="outline"
				>
					Previous
				</Button>
				<span className="text-sm text-muted-foreground">
					Página {page} de {Math.ceil((data?.total ?? 0) / pageSize)}
				</span>
				<Button
					onClick={() =>
						setPage((p) =>
							p < Math.ceil((data?.total ?? 0) / pageSize) ? p + 1 : p
						)
					}
					disabled={page >= Math.ceil((data?.total ?? 0) / pageSize)}
					variant="outline"
				>
					Next
				</Button>
			</div>

			{isFetching && <p className="mt-2 text-sm text-gray-500">Actualizando datos...</p>}
		</div>
	);
};

export default VehiclesPage;