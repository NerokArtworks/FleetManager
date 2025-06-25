import {
	CarFront,
	Route,
	Wrench
} from "lucide-react";
import { useState } from "react";
import DashboardLoader from "../../../components/loaders/dashboard-loader";
import Button from "../../../components/ui/button";
import VehicleList from "../../../components/vehicles/vehicle-list";
import VehicleSummaryCard from "../../../components/vehicles/vehicle-summary-card";
import VehiclesFilters from "../../../components/vehicles/vehicles-filters";
import VehiclesToolbar from "../../../components/vehicles/vehicles-toolbar";
import { useAuth } from "../../../context/AuthContext";
import { useVehiclesInfiniteList } from "../../../hooks/use-vehicles-infinite-list";
import type { Vehicle, VehicleStatus } from "../../../types/Vehicle";
import { toast } from "sonner";
import { useExportVehicles } from "../../../hooks/use-export-vehicles";

const VehiclesPage = () => {
	const { loading } = useAuth();
	const pageSize = 6;

	const [statusFilter, setStatusFilter] = useState<VehicleStatus | "">("");
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("createdAt");
	const [sortDesc, setSortDesc] = useState(true);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	} = useVehiclesInfiniteList({
		status: statusFilter || undefined,
		search: search || undefined,
		sortBy,
		sortDesc,
		pageSize,
	});

	const vehicles = data?.pages.flatMap(page => page.data) ?? [];

	// Summary basado en vehicles
	const statusSummary = [
		{
			label: "Active",
			count: vehicles.filter((v) => v.status === 0).length,
			icon: <CarFront className="w-5 h-5 text-green-500" />,
			color: "text-green-600",
		},
		{
			label: "Inactive",
			count: vehicles.filter((v) => v.status === 1).length,
			icon: <Route className="w-5 h-5 text-yellow-500" />,
			color: "text-yellow-600",
		},
		{
			label: "Maintenance",
			count: vehicles.filter((v) => v.status === 2).length,
			icon: <Wrench className="w-5 h-5 text-red-500" />,
			color: "text-red-600",
		},
	];

	const handleCreate = () => console.log("Create vehicle");
	const handleEdit = (v: Vehicle) => console.log("Edit", v);
	const handleDelete = (v: Vehicle) => {
		// Idealmente deberías hacer refetch o mutación
		// Aquí una forma rápida: filtrar localmente
		// Pero cuidado porque al cargar siguiente página puede reaparecer
	};
	const handleExportCSV = async () => {
		try {
			// TODO EXPORT CSV
			useExportVehicles(statusFilter, search, sortBy, sortDesc)
			toast.success('CSV exportado')
		} catch (error) {
			console.error(error);
			toast.error('CSV exportation failed')
		}
	};

	const handlePrint = () => console.log("Print");

	if (loading) return <DashboardLoader />;
	if (error) return <div>Error fetching vehicles</div>;

	return (
		<div className="p-4 sm:p-6 space-y-8">
			{/* Header */}
			<VehiclesToolbar
				onCreate={handleCreate}
				onExportCSV={handleExportCSV}
				onPrint={handlePrint}
			/>

			{/* Filtros */}
			<VehiclesFilters
				search={search}
				setSearch={setSearch}
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				sortBy={sortBy}
				setSortBy={setSortBy}
				sortDesc={sortDesc}
				setSortDesc={setSortDesc}
			/>

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

			{/* Botón cargar más */}
			{hasNextPage && (
				<div className="flex justify-center mt-4">
					<Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
					</Button>
				</div>
			)}

			{isLoading && <p className="mt-2 text-sm text-gray-500">Actualizando datos...</p>}
		</div>
	);
};

export default VehiclesPage;