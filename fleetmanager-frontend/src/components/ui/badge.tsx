import { cn } from "../../lib/utils";

export function Badge({
    children,
    variant = "default",
    className,
}: {
    children: React.ReactNode;
    variant?: "default" | "secondary" | "destructive";
    className?: string;
}) {
    const variants = {
        default: "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-800",
        destructive: "bg-red-500 text-white",
    };

    return (
        <span
            className={cn(
                "text-xs font-medium px-2.5 py-0.5 rounded",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}