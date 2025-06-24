import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
	data: { name: string; value: number; color: string }[];
}

const VehicleStatusChart = ({ data }: Props) => (
	<div className="bg-white p-6 rounded-xl shadow">
		<h2 className="text-lg font-semibold mb-4">Status Distribution</h2>
		<ResponsiveContainer width="100%" height={250}>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={80}
					label
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</ResponsiveContainer>
	</div>
);

export default VehicleStatusChart;