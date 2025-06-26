interface Props {
	label: string;
	count: number;
	color: string;
	icon: React.ReactNode;
}

const VehicleSummaryCard = ({ label, count, color, icon }: Props) => {
	return (
		<div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col md:flex-row items-center gap-2 md:gap-4`}>
			<div className={`p-2 md:p-3 rounded-full ${color} bg-opacity-10 dark:bg-opacity-20`}>{icon}</div>
			<div className="flex flex-col items-center md:block">
				<p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
				<p className="text-xl font-bold text-gray-900 dark:text-gray-100">{count}</p>
			</div>
		</div>
	);
};

export default VehicleSummaryCard;