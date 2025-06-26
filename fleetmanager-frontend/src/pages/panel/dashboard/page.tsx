import {
    Archive,
    CarFront,
    LogOut,
    Route,
    Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardLoader from "../../../components/loaders/dashboard-loader";
import Button from "../../../components/ui/button";
import VehicleBarChart from "../../../components/vehicles/vehicle-bar-chart";
import VehicleStatusChart from "../../../components/vehicles/vehicle-status-chart";
import VehicleSummaryCard from "../../../components/vehicles/vehicle-summary-card";
import { useAuth } from "../../../context/AuthContext";
import { useVehiclesSummary } from "../../../hooks/use-vehicles";

const DashboardPage = () => {
    const { logout, loading } = useAuth();
    const { data: summaryData, isLoading, error } = useVehiclesSummary();

    const [statusSummary, setStatusSummary] = useState<
        { label: string; count: number; icon: React.ReactNode; color: string }[]
    >([]);
    const [chartData, setChartData] = useState<
        { name: string; value: number; color: string }[]
    >([]);

    const handleLogout = async () => {
        await logout();
        toast.success("Successfully logged out");
    };

    const barChartData = [
        { name: "Jan", value: 5 },
        { name: "Feb", value: 12 },
        { name: "Mar", value: 8 },
        { name: "Apr", value: 15 },
        { name: "May", value: 10 },
        { name: "Jun", value: 7 },
    ];

    useEffect(() => {
        const summary = [
            {
                label: "Active",
                count: summaryData?.active ?? 0,
                icon: <CarFront className="w-5 h-5 text-green-500" />,
                color: "#155dfc",
            },
            {
                label: "Inactive",
                count: summaryData?.inactive ?? 0,
                icon: <Route className="w-5 h-5 text-yellow-500" />,
                color: "#9df52a",
            },
            {
                label: "Maintenance",
                count: summaryData?.maintenance ?? 0,
                icon: <Wrench className="w-5 h-5 text-red-500" />,
                color: "#eb4f34",
            },
            {
                label: "Retired",
                count: summaryData?.retired ?? 0,
                icon: <Archive className="w-5 h-5 text-gray-500" />,
                color: "#6B7280",
            }
        ];

        setStatusSummary(summary);

        const chart = summary.map(({ label, count, color }) => ({
            name: label,
            value: count,
            color: color.replace("text", "#").replace("-600", "6"),
        }));

        setChartData(chart);
    }, [summaryData]);

    if (loading) return <DashboardLoader />;
    if (error) return <div>Error fetching summary data</div>;

    return (
        <div className="w-full bg-muted p-4 sm:p-6 text-foreground space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-semibold">Fleet Panel</h1>
                <Button variant="primary" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Log out
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {statusSummary.map((item) => (
                    <VehicleSummaryCard
                        key={item.label}
                        label={item.label}
                        count={item.count}
                        color={item.color}
                        icon={item.icon}
                    />
                ))}
            </div>

            {/* Gráfica de estado */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Vehicle Status Overview</h2>
                <VehicleStatusChart data={chartData} />
            </div>

            <VehicleBarChart data={barChartData} title="Monthly Maintenance Count" />
        </div>
    );
};

export default DashboardPage;