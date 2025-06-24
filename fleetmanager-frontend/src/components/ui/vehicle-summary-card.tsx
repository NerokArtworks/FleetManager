interface Props {
	label: string;
	count: number;
	color: string;
	icon: React.ReactNode;
}

const VehicleSummaryCard = ({ label, count, color, icon }: Props) => {
	return (
		<div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
			<div className={`p-3 rounded-full ${color} bg-opacity-10`}>{icon}</div>
			<div>
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="text-xl font-bold">{count}</p>
			</div>
		</div>
	);
};

export default VehicleSummaryCard;