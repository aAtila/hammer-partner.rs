import { json, useFetcher, useLoaderData } from '@remix-run/react';
import PageTitle from './admin/components/page-title';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import type { ActionFunctionArgs } from '@remix-run/node';
import { categoryFormSchema } from './admin/schemas';
import { prisma } from '~/db/db.server';
import FormErrors from './admin/components/form-errors';
import { useEffect, useRef, useState } from 'react';
import type { Category } from '@prisma/client';
import type { HttpResponse } from '~/services/http';
import { HttpResponses } from '~/services/http';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { flushSync } from 'react-dom';

const Intent = {
	Create: 'create',
	Update: 'update',
	Delete: 'delete',
} as const;

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const categoryId = String(formData.get('id'));
	const data = Object.fromEntries(formData);

	const parsedData = categoryFormSchema.safeParse(data);

	if (!parsedData.success) {
		return json(
			{ errors: parsedData.error.flatten().fieldErrors },
			{
				status: 400,
			},
		);
	}

	const categoryData = parsedData.data;

	let category: Category;
	let statusCode: HttpResponse = HttpResponses.Ok;

	switch (data.intent) {
		case Intent.Create:
			category = await prisma.category.create({
				data: categoryData,
			});
			statusCode = HttpResponses.Created;
			break;
		case Intent.Update:
			category = await prisma.category.update({
				where: { id: categoryId },
				data: { name: categoryData.name, slug: categoryData.slug },
			});
			break;
		case Intent.Delete:
			category = await prisma.category.update({
				where: { id: categoryId },
				data: { deletedAt: new Date() },
			});
			break;
		default:
			return json('Something went wrong', { status: HttpResponses.BadRequest });
	}

	return json({ category }, { status: statusCode });
};

export const loader = async () => {
	const categories = await prisma.category.findMany({
		select: {
			id: true,
			name: true,
			products: {
				select: {
					id: true,
				},
			},
		},
		where: {
			deletedAt: null,
		},
	});

	return { categories };
};

export default function CategoriesPage() {
	const { categories } = useLoaderData<typeof loader>();
	const fetcher = useFetcher();
	const [edit, setEdit] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<PageTitle
				title="Kategorije"
				description="Lista svih dostupnih kategorija"
			/>
			<section className="max-w-lg space-y-8 p-8 text-muted-foreground">
				<div className="rounded border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="min-w-[250px]">Naziv</TableHead>
								<TableHead className="text-center">Proizvodi</TableHead>
								<TableHead className="text-right">Akcije</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories.map(({ id, name, products }) => (
								<TableRow key={id}>
									<TableCell className="font-medium">
										<EditableText
											fieldName="name"
											id={id}
											value={name}
											isEditing={edit === id}
											onClose={() => setEdit(null)}
										/>
									</TableCell>
									<TableCell className="text-center">
										{products.length}
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-4">
											<PencilIcon
												type="submit"
												className="size-4 cursor-pointer transition-colors hover:text-sky-600"
												onClick={() => {
													flushSync(() => {
														setEdit(id);
													});
													inputRef.current?.focus();
												}}
											/>
											<fetcher.Form method="post">
												<input type="text" name="id" defaultValue={id} hidden />
												<input
													type="text"
													name="name"
													defaultValue={name}
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
				<div className="bg-white">
					<CreateCategoryForm />
				</div>
			</section>
		</>
	);
}

const CreateCategoryForm = () => {
	const createFetcher = useFetcher();
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
				className="mt-16 grid gap-4"
				method="post"
				ref={formRef}
			>
				<Label htmlFor="name" className="text-lg text-foreground">
					Dodaj novu kategoriju
				</Label>
				<Input type="text" name="name" placeholder="Naziv nove kategorije" />
				<div className="col-span-full text-right">
					<Button
						type="submit"
						disabled={createFetcher.state === 'submitting'}
						value={Intent.Create}
						name="intent"
					>
						Dodaj
					</Button>
				</div>
			</createFetcher.Form>
		</div>
	);
};

const EditableText = ({
	fieldName,
	value,
	id,
	isEditing,
	onClose,
}: {
	fieldName: string;
	value: string;
	id: string;
	isEditing: boolean;
	onClose: () => void;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const fetcher = useFetcher();

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
	}, [isEditing]);

	if (fetcher.formData?.get('name')) {
		value = fetcher.formData.get('name') as string;
	}

	return isEditing ? (
		<fetcher.Form method="post">
			<input type="text" name="intent" defaultValue={Intent.Update} hidden />
			<input type="text" name="id" defaultValue={id} hidden />
			<Input
				type="text"
				name={fieldName}
				defaultValue={value}
				className="-my-2 h-8"
				ref={inputRef}
				onBlur={onClose}
				onKeyDown={(event) => {
					switch (event.key) {
						case 'Escape':
							onClose();
							break;
						case 'Enter':
							fetcher.submit(event.currentTarget.form);
							onClose();
							break;
					}
				}}
			/>
		</fetcher.Form>
	) : (
		value
	);
};
