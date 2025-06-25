import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "../../lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipContentProps extends React.ComponentPropsWithRef<typeof TooltipPrimitive.Content> {
    variant?: "primary" | "outline" | "danger" | "ghost" | "destructive";
}

const variantStyles: Record<NonNullable<TooltipContentProps["variant"]>, string> = {
    primary: "bg-blue-700 text-white",
    outline: "bg-white text-gray-700 border border-gray-200 shadow-sm",
    danger: "bg-red-600 text-white",
    ghost: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
    destructive: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900 dark:text-red-200"
};

export const TooltipContent = React.forwardRef<
    HTMLDivElement,
    TooltipContentProps
>(({ className, sideOffset = 5, variant = "primary", ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md animate-fade-in",
                variantStyles[variant],
                className
            )}
            {...props}
        />
    </TooltipPrimitive.Portal>
));

TooltipContent.displayName = "TooltipContent";