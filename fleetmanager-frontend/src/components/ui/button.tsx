import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline" | "danger" | "ghost" | "destructive";
	size?: "default" | "icon" | "sm" | "lg";
}

const Button = ({
	className,
	variant = "primary",
	size = "default",
	...props
}: ButtonProps) => {
	const baseStyles =
		"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";

	const variants = {
		primary:
			"bg-blue-700 text-white hover:bg-blue-600 focus:ring-blue-500",
		outline:
			"border border-blue-400 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-400 dark:bg-gray-800 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900",
		danger:
			"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
		ghost:
			"bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300",
		destructive:
			"border border-red-500 text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-900"
	};

	const sizes = {
		default: "px-4 py-2",
		sm: "px-3 py-1.5 text-sm",
		icon: "w-8 h-8 p-1.5",
		lg: "py-3 px-1.5"
	};

	return (
		<button
			className={cn(baseStyles, variants[variant], sizes[size], className)}
			{...props}
		/>
	);
};

export default Button;