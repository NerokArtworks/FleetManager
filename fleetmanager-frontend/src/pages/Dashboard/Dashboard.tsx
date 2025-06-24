import {
    CarFront,
    LogOut,
    MapPin,
    Route,
    Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLoader from '../../components/loaders/DashboardLoader';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { logout, loading } = useAuth();

    const handleLogout = async () => {
        await logout();
        toast.success('Successfully logged out');
    }

    const summary = [
        {
            label: 'Vehicle count',
            value: 24,
            icon: <CarFront className="h-6 w-6 text-blue-500" />,
        },
        {
            label: 'On trip',
            value: 8,
            icon: <Route className="h-6 w-6 text-green-500" />,
        },
        {
            label: 'Inactives',
            value: 12,
            icon: <CarFront className="h-6 w-6 text-yellow-500" />,
        },
        {
            label: 'Maintenance',
            value: 4,
            icon: <Wrench className="h-6 w-6 text-red-500" />,
        },
    ];

    if (loading) {
        return <DashboardLoader />
    }

    return (
        <div className="min-h-screen bg-muted p-8 text-foreground">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold">Fleet Panel</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-destructive text-white px-5 py-2 rounded-xl hover:bg-destructive/80 transition"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {summary.map((item) => (
                    <div key={item.label} className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-full">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="text-xl font-bold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vehicles Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Vehicles</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-muted text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-4 py-3">License plate</th>
                                <th className="px-4 py-3">Model</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Last location</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="px-4 py-3">1234-ABC</td>
                                <td className="px-4 py-3">Peugeot Partner</td>
                                <td className="px-4 py-3 text-green-600 font-medium">Active</td>
                                <td className="px-4 py-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Madrid</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">5678-DEF</td>
                                <td className="px-4 py-3">Renault Kangoo</td>
                                <td className="px-4 py-3 text-yellow-600 font-medium">Inactive</td>
                                <td className="px-4 py-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Barcelona</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">9012-GHI</td>
                                <td className="px-4 py-3">Citroën Berlingo</td>
                                <td className="px-4 py-3 text-red-600 font-medium">Maintenance</td>
                                <td className="px-4 py-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Valencia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;