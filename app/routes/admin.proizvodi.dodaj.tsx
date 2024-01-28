import { Form, json, useActionData } from '@remix-run/react';
import PageTitle from './admin/components/page-title';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import type { ActionFunctionArgs } from '@remix-run/node';
import { productFormSchema } from './admin/schemas';
import { prisma } from '~/db/db.server';

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = Object.fromEntries(await request.formData());

	const validated = productFormSchema.safeParse(data);

	if (!validated.success) {
		return json(
			{ errors: validated.error.flatten().fieldErrors },
			{
				status: 400,
			},
		);
	}

	const productData = validated.data;

	const product = await prisma.product.create({
		data: {
			...productData,
			category: { connect: { id: productData.category } },
		},
	});

	console.log(product);

	return json({ product }, { status: 201 });
};

export default function CreateProductPage() {
	const actionData = useActionData<typeof action>();

	return (
		<>
			<PageTitle
				title="Dodaj proizvod"
				description="Dodaj novi proizvod u bazu podataka"
			/>
			<section className="mt-8 space-y-8 text-muted-foreground">
				<FormErrors errors={actionData?.errors} />
				<Form
					className="mx-auto grid max-w-2xl grid-cols-[auto_1fr] items-center gap-3"
					method="post"
				>
					<Label htmlFor="name">Naziv proizvda:</Label>
					<Input type="text" name="name" />

					<Label htmlFor="sku">ID proizvoda/SKU:</Label>
					<Input type="text" name="sku" />

					<Label htmlFor="category">Kategorija:</Label>
					<Select name="category">
						<SelectTrigger>
							<SelectValue placeholder="Izaberi kategoriju" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Kategorije</SelectLabel>
								<SelectItem value="clrwym3x40001r9ldj0l4h2mg">Alati</SelectItem>
								<SelectItem value="clrwwr4hj0000r9lds0bcwggp">
									Električni
								</SelectItem>
								<SelectItem value="plumbing">Vodovodni</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Label htmlFor="price">Cena:</Label>
					<Input type="number" name="price" step="0.01" />
					<Label htmlFor="costPrice">Nabavna Cena:</Label>
					<Input type="number" name="costPrice" step="0.01" />

					<Label htmlFor="quantity">Količina na zalihi:</Label>
					<Input type="number" name="quantity" />

					<Label htmlFor="description" className="">
						Opis proizvoda:
					</Label>
					<Textarea name="description"></Textarea>

					<Label htmlFor="manufacturer">Proizvođač/Brend:</Label>
					<Input type="text" name="manufacturer" />

					<Label htmlFor="image">Slika proizvoda:</Label>
					<Input type="file" name="image" accept="image/*" />

					<Label htmlFor="warranty">Informacije o garanciji:</Label>
					<Textarea name="warranty"></Textarea>

					<Label htmlFor="shippingInfo">Informacije o dostavi:</Label>
					<Textarea name="shippingInfo"></Textarea>

					<Label htmlFor="availability">Dostupnost:</Label>
					<Select name="availability">
						<SelectTrigger>
							<SelectValue placeholder="Izaberi opciju" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="in-stock">Na stanju</SelectItem>
							<SelectItem value="out-of-stock">Nema na stanju</SelectItem>
							<SelectItem value="pre-order">Preorder</SelectItem>
						</SelectContent>
					</Select>

					<div className="col-span-full text-right">
						<Button type="submit">Dodaj proizvod</Button>
					</div>
				</Form>
			</section>
		</>
	);
}

function FormErrors({ errors }: { errors?: any }) {
	if (!errors) return null;

	return (
		<div className="mx-auto max-w-2xl rounded bg-red-400/20 p-5">
			<ul className="list-inside list-disc text-red-500">
				{Object.entries(errors).map(([key, value]) => (
					<li key={key}>{value[0]}</li>
				))}
			</ul>
		</div>
	);
}
