import PageTitle from './admin/components/page-title';
import { Link, Outlet, useFetcher, useLoaderData } from '@remix-run/react';
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
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Intent } from './admin.kategorije';
import type { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const productId = String(formData.get('id'));
	const intent = String(formData.get('intent'));

	if (intent === Intent.Delete) {
		await prisma.product.update({
			where: { id: productId },
			data: { deletedAt: new Date() },
		});
	}

	return { status: 'deleted' };
};

export const loader = async () => {
	const products = await prisma.product.findMany({
		where: { deletedAt: null },
		include: { category: { select: { name: true } } },
	});

	return { products };
};

export default function ProductPage() {
	const { products } = useLoaderData<typeof loader>();
	const fetcher = useFetcher();

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
								<TableHead>Kategorija</TableHead>
								<TableHead>Cena</TableHead>
								<TableHead>Dostupnost</TableHead>
								<TableHead>#</TableHead>
								<TableHead>Kreiran</TableHead>
								<TableHead className="text-right"></TableHead>
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
									<TableCell>{formatDate(product.createdAt)}</TableCell>
									<TableCell className="text-right">
										<div className="flex gap-2">
											<fetcher.Form method="post">
												<input
													type="text"
													name="id"
													defaultValue={product.id}
													hidden
												/>
												<button
													type="submit"
													name="intent"
													value={Intent.Delete}
												>
													<Trash2Icon className="size-4 transition-colors hover:text-destructive" />
												</button>
											</fetcher.Form>
										</div>
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
