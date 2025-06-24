import type { Vehicle } from "../../types/Vehicle";

interface Props {
	vehicles: Vehicle[];
}

const formatDate = (dateString?: string | null) => {
	if (!dateString) return "-";
	const date = new Date(dateString);
	return date.toLocaleDateString();
};

const VehicleTable = ({ vehicles }: Props) => {
	return (
		<div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
			<h2 className="text-lg font-semibold mb-4">Vehicle List</h2>
			<table className="min-w-full text-sm">
				<thead>
					<tr className="text-left text-xs text-muted-foreground uppercase border-b">
						<th className="p-2">License Plate</th>
						<th className="p-2">Make</th>
						<th className="p-2">Model</th>
						<th className="p-2">Year</th>
						<th className="p-2">Status</th>
						<th className="p-2">Kilometers</th>
						<th className="p-2">Location</th>
						<th className="p-2">Last Inspection</th>
						<th className="p-2">Next Inspection</th>
					</tr>
				</thead>
				<tbody>
					{vehicles.map((v) => (
						<tr key={v.id} className="border-b hover:bg-muted">
							<td className="p-2 font-mono">{v.plateNumber}</td>
							<td className="p-2">{v.make}</td>
							<td className="p-2">{v.model}</td>
							<td className="p-2">{v.year}</td>
							<td className="p-2 capitalize">{v.status}</td>
							<td className="p-2">{v.kilometers.toLocaleString()} km</td>
							<td className="p-2">{v.location ?? "-"}</td>
							<td className="p-2">{formatDate(v.lastInspectionDate)}</td>
							<td className="p-2">{formatDate(v.nextInspectionDue)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default VehicleTable;