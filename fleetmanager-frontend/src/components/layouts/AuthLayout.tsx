import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<main className="min-w-screen flex h-screen bg-gray-50 text-gray-800">
			<Outlet />
		</main>
	);
};

export default AuthLayout;