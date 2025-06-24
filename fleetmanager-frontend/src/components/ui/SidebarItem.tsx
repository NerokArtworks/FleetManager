import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

const SidebarItem = ({
    to,
    icon: Icon,
    label,
    isExpanded,
}: {
    to: string;
    icon: LucideIcon;
    label: string;
    isExpanded: boolean;
}) => {
    const { pathname } = useLocation();
    const isActive = pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors select-none',
                isActive ? 'bg-gray-200 font-semibold text-gray-900' : 'hover:bg-gray-100 text-gray-700'
            )}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />

            {/* Siempre renderizamos el span, controlamos visibilidad con clases */}
            <span
                className={cn(
                    'truncate overflow-hidden transition-[opacity,max-width] duration-300 ease-in-out whitespace-nowrap ml-1',
                    isExpanded
                        ? 'opacity-100 max-w-[200px]'
                        : 'opacity-0 max-w-0'
                )}
                aria-hidden={!isExpanded}
            >
                {label}
            </span>
        </Link>
    );
};

export default SidebarItem;