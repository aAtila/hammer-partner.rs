import { json, useFetcher, useLoaderData } from '@remix-run/react';
import PageTitle from './admin/components/page-title';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import type { ActionFunctionArgs } from '@remix-run/node';
import { categoryFormSchema } from './admin/schemas';
import { prisma } from '~/db/db.server';
import FormErrors from './admin/components/form-errors';
import { useEffect, useRef } from 'react';

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = Object.fromEntries(await request.formData());
	const parsedData = categoryFormSchema.safeParse(formData);

	if (!parsedData.success) {
		return json(
			{ errors: parsedData.error.flatten().fieldErrors },
			{
				status: 400,
			},
		);
	}

	const categoryData = parsedData.data;

	const category = await prisma.category.create({
		data: categoryData,
	});

	return json({ category });
};

export const loader = async () => {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				select: {
					id: true,
				},
			},
		},
	});

	return { categories };
};

export default function CategoriesPage() {
	const { categories } = useLoaderData<typeof loader>();

	return (
		<>
			<PageTitle
				title="Kategorije"
				description="Lista svih dostupnih kategorija"
			/>
			<section className="mt-8 space-y-8 text-muted-foreground">
				<CreateCategoryForm />
				<ul>
					{categories.map(({ id, name, slug, products }) => (
						<li key={id}>
							{name} ({products && products.length ? products.length : 0})
						</li>
					))}
				</ul>
			</section>
		</>
	);
}

const CreateCategoryForm = () => {
	const createFetcher = useFetcher({ key: 'createCategory' });
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (createFetcher.state === 'submitting') {
			formRef.current?.reset();
		}
	}, [createFetcher.state]);

	return (
		<div>
			<FormErrors errors={createFetcher.data?.errors} />
			<createFetcher.Form
				className="mx-auto mt-8 grid max-w-lg grid-cols-[auto_1fr] items-center gap-3"
				method="post"
				ref={formRef}
			>
				<Label htmlFor="name">Naziv kategorije:</Label>
				<Input type="text" name="name" />
				<Label htmlFor="slug">Url slug:</Label>
				<Input type="text" name="slug" />
				<div className="col-span-full text-right">
					<Button type="submit" disabled={createFetcher.state === 'submitting'}>
						Dodaj
					</Button>
				</div>
			</createFetcher.Form>
		</div>
	);
};
