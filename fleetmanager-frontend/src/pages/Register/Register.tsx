import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import type { RegisterParams } from '../../types/Auth';

const registerSchema = z
	.object({
		firstname: z.string().min(1, 'First name is required'),
		lastname: z.string().min(1, 'Last name is required'),
		companyName: z.string().optional(),
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(6, 'Confirm password is required'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

const Register = () => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState<Record<string, string>>({});

	const { loading, register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = registerSchema.safeParse({
			firstname,
			lastname,
			companyName,
			email,
			password,
			confirmPassword,
		});

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			result.error.errors.forEach(err => {
				if (err.path.length > 0) {
					fieldErrors[err.path[0]] = err.message;
				}
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});

		try {
			const params: RegisterParams = {
				email,
				password,
				firstname,
				lastname,
				companyName
			}
			await register(params);
			toast.success('Account created successfully');
			navigate('/login');
		} catch (err: any) {
			toast.error('Failed to register. Please try again.');
		}
	};

	if (loading)
		return (
			<div className="text-center mt-8 text-gray-500 dark:text-gray-400">
				Loading...
			</div>
		);

	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md w-full max-w-md"
				aria-label="register form"
				noValidate
			>
				<h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
					Create your account
				</h2>
				<p className="text-center text-gray-500 dark:text-gray-400 mb-8">
					Join FleetManager today
				</p>

				<div className="space-y-5">
					<div>
						<input
							type="text"
							placeholder="First name"
							className={`w-full px-4 py-3 rounded-xl border ${errors.firstname ? 'border-red-500' : 'border-gray-300'
								} dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600`}
							value={firstname}
							onChange={e => setFirstname(e.target.value)}
							aria-label="first name"
							required
						/>
						{errors.firstname && (
							<p className="mt-1 text-sm text-red-500">{errors.firstname}</p>
						)}
					</div>

					<div>
						<input
							type="text"
							placeholder="Last name"
							className={`w-full px-4 py-3 rounded-xl border ${errors.lastname ? 'border-red-500' : 'border-gray-300'
								} dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600`}
							value={lastname}
							onChange={e => setLastname(e.target.value)}
							aria-label="last name"
							required
						/>
						{errors.lastname && (
							<p className="mt-1 text-sm text-red-500">{errors.lastname}</p>
						)}
					</div>

					<div>
						<input
							type="text"
							placeholder="Company name (optional)"
							className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
							value={companyName}
							onChange={e => setCompanyName(e.target.value)}
							aria-label="company name"
						/>
					</div>

					<div>
						<input
							type="email"
							placeholder="Email"
							className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'
								} dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600`}
							value={email}
							onChange={e => setEmail(e.target.value)}
							aria-label="email"
							required
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-500">{errors.email}</p>
						)}
					</div>

					<div>
						<input
							type="password"
							placeholder="Password"
							className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'
								} dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600`}
							value={password}
							onChange={e => setPassword(e.target.value)}
							aria-label="password"
							required
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-500">{errors.password}</p>
						)}
					</div>

					<div>
						<input
							type="password"
							placeholder="Confirm password"
							className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
								} dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600`}
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							aria-label="confirm password"
							required
						/>
						{errors.confirmPassword && (
							<p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400"
					>
						Register
					</button>
				</div>

				<div className="mt-6 text-center">
					<span className="text-gray-600 dark:text-gray-400">Already have an account?</span>{' '}
					<Link to="/login" className="text-blue-600 hover:underline font-medium">
						Sign in
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;