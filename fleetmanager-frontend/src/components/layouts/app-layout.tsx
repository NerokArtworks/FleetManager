import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

const AppLayout = () => {
    return (
        <div className="max-w-dvw min-w-dvw flex h-dvh bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-tl-2xl shadow-inner">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;