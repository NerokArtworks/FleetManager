import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/sidebar';

const AppLayout = () => {
    return (
        <div className="max-w-dvw min-w-dvw flex h-dvh bg-gray-50 text-gray-800">
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;