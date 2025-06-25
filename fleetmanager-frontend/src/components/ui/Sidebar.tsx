import { ChevronLeft, Home, Settings, Truck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import SidebarItem from './sidebar-item';
import Button from './button';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside
            style={{ willChange: 'width' }}
            className={cn(
                'h-full border-r border-gray-200 dark:border-gray-700 rounded-tr-2xl shadow bg-white dark:bg-gray-800 transition-[width] duration-300 ease-in-out flex flex-col',
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

                <Button
                    variant='primary'
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="flex-shrink-0 w-10 h-10 px-0 py-0 flex items-center justify-center rounded-md rounded-tr-xl transition-colors duration-300"
                    aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <ChevronLeft className={cn(
                        'w-5 h-5 transition-transform duration-300 ease-out',
                        isExpanded
                            ? ''
                            : 'rotate-180'
                    )} />
                </Button>
            </div>

            {/* Navigation */}
            {/* <nav className="flex-1 flex flex-col gap-1 px-2"> */}
            <nav className={cn(
                'flex-1 flex flex-col gap-1 transition-all',
                isExpanded
                    ? 'px-4'
                    : 'px-2'
            )}>
                <SidebarItem to="/panel/dashboard" icon={Home} label="Dashboard" isExpanded={isExpanded} />
                <SidebarItem to="/panel/vehicles" icon={Truck} label="Vehicles" isExpanded={isExpanded} />
                <SidebarItem to="/panel/settings" icon={Settings} label="Settings" isExpanded={isExpanded} />
            </nav>
        </aside>
    );
};

export default Sidebar;