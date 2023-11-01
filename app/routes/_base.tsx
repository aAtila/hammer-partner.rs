import { Outlet } from '@remix-run/react';
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

export default function BaseLayout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
