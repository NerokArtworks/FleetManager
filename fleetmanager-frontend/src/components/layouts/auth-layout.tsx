import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<main className="w-dvw max-w-dvw flex h-dvh bg-gray-50 text-gray-800">
			<Outlet />
		</main>
	);
};

export default AuthLayout;