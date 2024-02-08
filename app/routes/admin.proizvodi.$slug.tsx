import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/db/db.server';
import PageTitle from './admin/components/page-title';
import { toCurrency } from '~/utils/number';
import { formatDate } from '~/utils/date';
import Markdown from 'react-markdown';

import type { HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const slug = params.slug;

	const product = await prisma.product.findUnique({
		where: { slug },
		include: { category: true },
	});

	if (!product) {
		throw redirect('/admin/proizvodi', { status: 404 });
	}

	return json({ product });
};

export default function ProductDetailsPage() {
	const { product } = useLoaderData<typeof loader>();

	return (
		<>
			<PageTitle
				title="Detalji proizvoda"
				description="Pregledaj i ažuriraj detalje proizvoda"
			/>
			<dl className="max-w-2x mx-auto">
				<DataListItem label="Naziv" value={product.name} />
				<DataListItem label="Proizvođač" value={product.manufacturer} />
				<DataListItem label="Cena" value={toCurrency(product.price)} />
				<DataListItem
					label="Nabavna cena"
					value={product.costPrice ? toCurrency(product.costPrice) : null}
				/>
				<DataListItem label="Kategorija" value={product.category.name} />
				<DataListItem label="Količina" value={product.quantity.toString()} />
				<DataListItem label="Kreiran" value={formatDate(product.createdAt)} />
				<DataListItem label="Ažuriran" value={formatDate(product.updatedAt)} />
				<DataListItem
					label="Opis"
					value={product.description}
					wrapWithMarkdown={true}
				/>
				<DataListItem label="Slika" value={product.image} />
			</dl>
		</>
	);
}

type DataListItemProps = {
	label: string;
	value: string | null;
	className?: string;
	wrapWithMarkdown?: boolean;
};

const DataListItem = ({
	label,
	value,
	className,
	wrapWithMarkdown,
}: DataListItemProps) => {
	return (
		<div
			className={cn(
				className,
				'grid grid-cols-[auto_1fr] p-5 hover:rounded hover:bg-slate-50',
			)}
		>
			<dt className="min-w-48 font-medium">{label}</dt>
			<dd className="space-y-3 text-muted-foreground">
				{wrapWithMarkdown ? <Markdown>{value}</Markdown> : value}
			</dd>
		</div>
	);
};
