import React from "react";

interface FormFieldProps {
	id: string;
	label: string;
	type?: string;
	value: string | number;
	onChange: (value: string) => void;
	error?: string;
	placeholder?: string;
	min?: number;
	max?: number;
	disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
	id,
	label,
	type = "text",
	value,
	onChange,
	error,
	placeholder,
	min,
	max,
	disabled = false,
}) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
				{label}
			</label>
			<input
				id={id}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				min={min}
				max={max}
				disabled={disabled}
				className={`rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${error
						? "border-red-500 ring-red-400"
						: "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
					} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
			/>
			{error && <span className="mt-1 text-xs text-red-500">{error}</span>}
		</div>
	);
};