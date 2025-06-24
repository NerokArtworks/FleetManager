import { Pencil, Trash2 } from 'lucide-react';
import type { Vehicle } from '../../types/Vehicle';
import Button from './button';

interface Props {
	vehicle: Vehicle;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

const statusColors = {
	active: 'text-green-600 bg-green-100',
	inactive: 'text-yellow-600 bg-yellow-100',
	maintenance: 'text-red-600 bg-red-100',
};

const VehicleCard = ({ vehicle, onEdit, onDelete }: Props) => {
	return (
		<div className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div>
				<h3 className="text-lg font-semibold">{vehicle.model}</h3>
				<p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
				<span className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded ${statusColors[vehicle.status]}`}>
					{vehicle.status}
				</span>
			</div>

			<div className="text-sm text-gray-500">
				Location: <span className="text-gray-700 font-medium">{vehicle.location}</span>
			</div>

			<div className="flex gap-2">
				<Button onClick={() => onEdit(vehicle.id)} variant="outline">
					<Pencil className="w-4 h-4 mr-1" /> Edit
				</Button>
				<Button onClick={() => onDelete(vehicle.id)} variant="danger">
					<Trash2 className="w-4 h-4 mr-1" /> Delete
				</Button>
			</div>
		</div>
	);
};

export default VehicleCard;