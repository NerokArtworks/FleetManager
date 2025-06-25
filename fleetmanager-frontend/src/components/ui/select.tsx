import { forwardRef, type LabelHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    icon?: ReactNode;
    labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, icon, className, children, labelProps, ...props }, ref) => {
        return (
            <div className="space-y-1">
                {label && (
                    <label
                        {...labelProps}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <select
                        ref={ref}
                        className={`w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${icon ? "pl-10" : ""
                            } ${className || ""}`}
                        {...props}
                    >
                        {children}
                    </select>
                </div>
            </div>
        );
    }
);

Select.displayName = "Select";
export default Select;