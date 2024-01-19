import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { requireAuthCookie } from '~/auth';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await requireAuthCookie(request);

	return json({ user });
};

export default function AdminLayout() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div className="flex-grow bg-gray-200">
			<header className="flex justify-between border-b border-dashed border-gray-400/80">
				<Link
					to="/admin"
					className="border-r border-dashed border-gray-400/80 px-8 py-3 transition-colors hover:bg-gray-300"
				>
					Admin
				</Link>
				{user ? (
					<form action="/odjava" method="post">
						<button
							type="submit"
							className="border-l border-dashed border-gray-400/80 px-8 py-3 transition-colors hover:bg-gray-300"
						>
							{user}
						</button>
					</form>
				) : null}
			</header>
			<main className="mt-5 flex-grow">
				<Outlet />
			</main>
		</div>
	);
}
