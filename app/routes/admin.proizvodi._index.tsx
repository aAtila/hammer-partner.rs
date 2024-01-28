import { Button } from '~/components/ui/button';
import PageTitle from './admin/components/page-title';
import { PlusCircleIcon } from 'lucide-react';
import { Link, useLoaderData } from '@remix-run/react';
import { prisma } from '~/db/db.server';

export const loader = async () => {
	const products = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			manufacturer: true,
			price: true,
		},
	});

	return { products };
};

export default function ProductPage() {
	const { products } = useLoaderData<typeof loader>();
	return (
		<>
			<PageTitle title="Proizvodi" description="Lista svih proizvoda">
				<Button asChild>
					<Link to="dodaj" className="flex gap-2">
						<PlusCircleIcon className="size-4" />
						Dodaj proizvod
					</Link>
				</Button>
			</PageTitle>
			<section className="p-8">
				<ul>
					{products.map(({ id, name, price, manufacturer }) => (
						<Link key={id} to={`/proizvodi/${id}`} prefetch="intent">
							<li className="underline decoration-transparent decoration-1 underline-offset-4 transition-all after:content-['_↗'] hover:decoration-foreground">{`${name} | ${manufacturer} | ${price} RSD`}</li>
						</Link>
					))}
				</ul>
			</section>
		</>
	);
}
