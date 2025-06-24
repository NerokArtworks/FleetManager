import { CarFront, Plus, Route, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardLoader from "../../../components/loaders/dashboard-loader";
import Button from "../../../components/ui/button";
import VehicleCard from "../../../components/ui/vehicle-card";
import VehicleStatusChart from "../../../components/ui/vehicle-status-chart";
import VehicleSummaryCard from "../../../components/ui/vehicle-summary-card";
import VehicleTable from "../../../components/ui/vehicle-table";
import { useVehiclesList } from "../../../hooks/use-vehicles";
import type { Vehicle } from "../../../types/Vehicle";

const VehiclesPage = () => {
	const [page, setPage] = useState(1);
	const pageSize = 6;
	const { data, isLoading, error, isFetching } = useVehiclesList(page, pageSize);

	// Estado local para vehículos, resumen y chart
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [statusSummary, setStatusSummary] = useState<
		{ label: string; count: number; icon: React.ReactNode; color: string }[]
	>([]);
	const [chartData, setChartData] = useState<{ name: string; value: number; color: string }[]>([]);

	useEffect(() => {
		const newVehicles = data?.data ?? [];
		setVehicles(newVehicles);

		// TODO: fix vehicle statuses parsing in backend
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

		const chart = summary.map(({ label, count, color }) => ({
			name: label,
			value: count,
			color: color.replace("text", "#").replace("-600", "6"),
		}));

		setChartData(chart);
	}, [data]);

	const handleCreate = () => console.log("Create vehicle");
	const handleEdit = (id: string) => console.log("Edit", id);
	const handleDelete = (id: string) => {
		// Aquí podrías llamar a la API para eliminar y luego actualizar localmente el estado
		setVehicles((prev) => prev.filter((v) => v.id !== id));
	};

	if (isLoading || isFetching) {
		return <DashboardLoader />;
	}

	if (error) {
		return <div>Error fetching vehicles</div>;
	}

	return (
		<div className="p-6 space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold text-gray-800">Fleet Vehicles</h1>
				<Button variant="primary" onClick={handleCreate}>
					<Plus className="h-4 w-4 mr-2" />
					New Vehicle
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

			{/* Chart */}
			<VehicleStatusChart data={chartData} />

			{/* Cards */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{vehicles.map((v) => (
					<VehicleCard
						key={v.id}
						vehicle={v}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				))}
			</div>

			{/* Table */}
			<VehicleTable vehicles={vehicles} />

			<div className="flex justify-between items-center">
				<Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
					Anterior
				</Button>
				<span>
					Página {page} de {Math.ceil((data?.total ?? 0) / pageSize)}
				</span>
				<Button
					onClick={() =>
						setPage((p) =>
							p < Math.ceil((data?.total ?? 0) / pageSize) ? p + 1 : p
						)
					}
					disabled={page >= Math.ceil((data?.total ?? 0) / pageSize)}
				>
					Siguiente
				</Button>
			</div>

			{isFetching && <p className="mt-2 text-sm text-gray-500">Actualizando datos...</p>}
		</div>
	);
};

export default VehiclesPage;
