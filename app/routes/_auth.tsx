import { Outlet } from '@remix-run/react';

export default function AuthLayout() {
	return (
		<>
			<main className="flex-grow bg-gray-200">
				<Outlet />
			</main>
		</>
	);
}
