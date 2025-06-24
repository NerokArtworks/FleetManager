import { ChevronLeft, ChevronRight, Home, Settings, Truck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside
            style={{ willChange: 'width' }}
            className={cn(
                'h-full border-r border-gray-200 rounded-tr-2xl shadow bg-white transition-[width] duration-300 ease-in-out flex flex-col',
                isExpanded ? 'w-64' : 'w-16'
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    'flex items-center pt-3 pb-4 transition-all',
                    isExpanded 
                        ? 'justify-between px-4' 
                        : 'justify-center px-2'
                )}
            >
                <span
                    className={cn(
                        'text-xl font-bold select-none whitespace-nowrap transition-all duration-300 ease-in-out flex-grow',
                        isExpanded
                            ? 'opacity-100 max-w-xs ml-2'
                            : 'opacity-0 max-w-0 overflow-hidden m-0 p-0'
                    )}
                >
                    FleetManager
                </span>

                <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md rounded-tr-xl text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <ChevronLeft className={cn(
                        'w-5 h-5 transition-transform duration-300 ease-out',
                        isExpanded
                            ? ''
                            : 'rotate-180'
                    )} />
                </button>
            </div>

            {/* Navigation */}
            {/* <nav className="flex-1 flex flex-col gap-1 px-2"> */}
            <nav className={cn(
                'flex-1 flex flex-col gap-1 transition-all',
                isExpanded
                    ? 'px-4'
                    : 'px-2'
            )}>
                <SidebarItem to="/dashboard" icon={Home} label="Dashboard" isExpanded={isExpanded} />
                <SidebarItem to="/vehicles" icon={Truck} label="Vehicles" isExpanded={isExpanded} />
                <SidebarItem to="/settings" icon={Settings} label="Settings" isExpanded={isExpanded} />
            </nav>
        </aside>
    );
};

export default Sidebar;