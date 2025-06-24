const DashboardLoader = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="h-8 bg-gray-200 rounded w-1/3" />

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array(4).fill(null).map((_, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm space-y-3">
                        <div className="h-6 w-6 bg-gray-200 rounded-full" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-6 bg-gray-300 rounded w-1/2" />
                    </div>
                ))}
            </div>

            {/* Table skeleton */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="space-y-3">
                    {Array(3).fill(null).map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardLoader;