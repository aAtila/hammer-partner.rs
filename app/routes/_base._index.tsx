import type { MetaFunction } from '@remix-run/node';
import Hero from '~/components/layout/Hero';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Hammer-Partner - Sve za Vašu kuću i dvorište Subotica' },
		{
			name: 'description',
			content:
				'Naša ponuda obuhvata široki asortiman vrhunskih proizvoda, od alata i materijala do sudopera, slavina i gvožđarske robe.',
		},
	];
};

export default function Index() {
	return (
		<>
			<Hero />
		</>
	);
}
