import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface Props {
    data: { name: string; value: number }[];
    color?: string;
    title?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded shadow-md border border-gray-200 dark:border-gray-600">
                <p className="font-semibold">{payload[0].name}</p>
                <p>{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const VehicleBarChart = ({ data, color = "#155dfc", title = "Monthly Activity" }: Props) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default VehicleBarChart;