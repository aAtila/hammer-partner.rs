import PageTitle from './admin/components/page-title';
import { Outlet, useLoaderData } from '@remix-run/react';
import { prisma } from '~/db/db.server';
import CreateButton from './admin/components/create-button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';
import { formatDate } from '~/utils/date';
import { toCurrency } from '~/utils/number';

export const loader = async () => {
	const products = await prisma.product.findMany({
		include: { category: { select: { name: true } } },
	});

	return { products };
};

export default function ProductPage() {
	const { products } = useLoaderData<typeof loader>();

	return (
		<>
			<PageTitle title="Proizvodi" description="Lista svih proizvoda" />
			<section className="p-8">
				<div className="text-right">
					<CreateButton to="dodaj">Dodaj proizvod</CreateButton>
				</div>
				<div className="mt-3 rounded border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">SKU</TableHead>
								<TableHead>Naziv</TableHead>
								<TableHead>Brend</TableHead>
								<TableHead>#</TableHead>
								<TableHead>Cena</TableHead>
								<TableHead>Dostupnost</TableHead>
								<TableHead className="text-right">Kreiran</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.id}>
									<TableCell className="font-medium">{product.sku}</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.category.name}</TableCell>
									<TableCell>{product.quantity}</TableCell>
									<TableCell>{toCurrency(product.price)}</TableCell>
									<TableCell>{product.availability}</TableCell>
									<TableCell className="text-right">
										{formatDate(product.createdAt)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</section>
			<Outlet />
		</>
	);
}
