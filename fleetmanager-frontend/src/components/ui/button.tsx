import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline' | 'danger';
}

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
	const baseStyles =
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2';

	const variants = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
		outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-400',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
	};

	return (
		<button
			className={cn(baseStyles, variants[variant], className)}
			{...props}
		/>
	);
};

export default Button;