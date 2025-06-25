import React from "react";

interface Option {
	label: string;
	value: string;
}

interface FormSelectProps {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: Option[];
	error?: string;
	disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
	id,
	label,
	value,
	onChange,
	options,
	error,
	disabled = false,
}) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
				className={`rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${error
						? "border-red-500 ring-red-400"
						: "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
					} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
			>
				<option value="">-- Select --</option>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && <span className="mt-1 text-xs text-red-500">{error}</span>}
		</div>
	);
};