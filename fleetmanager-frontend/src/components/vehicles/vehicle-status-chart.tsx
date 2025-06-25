import { CarFront, Route, Wrench } from "lucide-react";
import type { JSX } from "react";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

interface Props {
	data: { name: string; value: number; color: string }[];
}

const ICONS: Record<string, JSX.Element> = {
	Active: <CarFront className="inline-block w-4 h-4 mr-1 text-green-500" />,
	Inactive: <Route className="inline-block w-4 h-4 mr-1 text-yellow-500" />,
	Maintenance: <Wrench className="inline-block w-4 h-4 mr-1 text-red-500" />,
};

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const entry = payload[0];
		return (
			<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 text-sm">
				<p className="font-semibold">{entry.payload.name}</p>
				<p>Vehicles: {entry.value}</p>
			</div>
		);
	}
	return null;
};

const VehicleStatusChart = ({ data }: Props) => {
	const total = data.reduce((acc, curr) => acc + curr.value, 0);

	return (
		<div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow transition-colors duration-300">
			<h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
				Fleet Status Distribution
			</h2>

			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={100}
						paddingAngle={6}
						labelLine={false}
						label={({ name, value = 0 }) =>
							`${name} (${((value / total) * 100).toFixed(0)}%)`
						}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.color}
								stroke="transparent"
								strokeWidth={2}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
					<Legend
						verticalAlign="bottom"
						formatter={(value: string) => (
							<span className="text-sm text-gray-700 dark:text-gray-300">
								{ICONS[value] ?? null}
								{value}
							</span>
						)}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default VehicleStatusChart;