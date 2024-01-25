import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { PackageIcon, UngroupIcon } from 'lucide-react';
import { requireAuthCookie } from '~/auth';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await requireAuthCookie(request);

	return json({ user });
};

export default function AdminLayout() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div className="flex flex-grow flex-col bg-gray-100">
			<div className="flex w-full flex-grow">
				<aside className="min-w-[250px] px-4 py-8">
					<div className="px-4">
						<h1 className="text-3xl font-medium">Admin</h1>
						<p className="text-muted-foreground">{user}</p>
					</div>
					<nav className="mt-8 grid gap-2">
						<Link
							to="/admin/proizvodi"
							className="flex items-center gap-4 rounded px-4 py-2 text-foreground/80 transition-colors hover:bg-gray-300/80 hover:text-foreground"
						>
							<PackageIcon className="siz-4" />
							<span>Proizvodi</span>
						</Link>
						<Link
							to="/admin/kategorije"
							className="flex items-center gap-4 rounded px-4 py-2 text-foreground/80 transition-colors hover:bg-gray-300/80 hover:text-foreground"
						>
							<UngroupIcon className="siz-4" />
							<Link to="/admin/kategorije">Kategorije</Link>
						</Link>
					</nav>
				</aside>
				<main className="w-full flex-grow rounded-l-lg border border-gray-300/80 bg-white p-8 shadow-sm">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
