import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import {
	Form,
	json,
	redirect,
	useActionData,
	useLoaderData,
	useNavigate,
} from '@remix-run/react';
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
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import prisma from '~/db/db.server';
import type { ActionFunctionArgs } from '@remix-run/node';
import { productFormSchema } from './admin/schemas';
import FormErrors from './admin/components/form-errors';
import { createFolder } from '~/services/publitio.server';

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

	// create the product
	const newProduct = await prisma.product.create({
		data: {
			...productData,
			category: { connect: { id: productData.category } },
		},
	});

	// create the folder for the product images
	const imageFolder = await createFolder(newProduct.id);

	// update the product with the image folder id
	await prisma.product.update({
		where: { id: newProduct.id },
		data: { publitioFolderId: imageFolder.id },
	});

	return redirect(`/admin/proizvodi`);
};

export const loader = async () => {
	const categories = await prisma.category.findMany({
		where: { deletedAt: null },
		select: { id: true, name: true },
	});

	return { categories };
};

export default function CreateProductPage() {
	const { categories } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const closeDialog = () => {
		setOpen(false);
		navigate('/admin/proizvodi');
	};

	useEffect(() => {
		setOpen(true);

		return () => {
			setOpen(false);
		};
	}, []);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeDialog}>
				<div className="fixed inset-0" />

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
									<Form
										method="post"
										className="mt-[1px] flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
									>
										<div className="bg-white px-8 py-5">
											<div className="flex items-center justify-between bg-white">
												<Dialog.Title className="text-xl font-medium leading-6">
													Dodaj novi proizvod
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="rounded-full"
														onClick={closeDialog}
													>
														<span className="sr-only">Close panel</span>
														<XIcon className="size-6" aria-hidden="true" />
													</Button>
												</div>
											</div>
											<div className="mt-1">
												<p className="text-sm text-muted-foreground">
													Dodaj novi proizvod u bazu podataka.
												</p>
											</div>
										</div>
										<div className="flex-grow space-y-4 overflow-y-auto px-4 py-6 sm:px-8">
											<FormErrors errors={actionData?.errors} />
											<div className="mx-auto grid grid-cols-[auto_1fr] items-baseline gap-3">
												<Label htmlFor="name">Naziv proizvoda:</Label>
												<Input type="text" name="name" />

												<Label htmlFor="sku">Šifra proizvoda/SKU:</Label>
												<Input type="text" name="sku" />

												<Label htmlFor="ean">EAN broj/Barkod:</Label>
												<Input type="text" name="ean" />

												<Label htmlFor="category">Kategorija:</Label>
												<Select name="category">
													<SelectTrigger>
														<SelectValue placeholder="Izaberi kategoriju" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Kategorije</SelectLabel>
															{categories.map(({ id, name }) => (
																<SelectItem key={id} value={id}>
																	{name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>

												<Label htmlFor="price">Maloprodajna cena:</Label>
												<Input type="number" name="price" step="0.01" />
												<Label htmlFor="costPrice">Veleprodajna cena:</Label>
												<Input type="number" name="costPrice" step="0.01" />

												<Label htmlFor="quantity">Količina na zalihi:</Label>
												<Input type="number" name="quantity" />

												<Label htmlFor="description" className="">
													Opis proizvoda:
												</Label>
												<Textarea name="description"></Textarea>

												<Label htmlFor="shortDescription" className="">
													Kratak opis proizvoda:
												</Label>
												<Textarea name="shortDescription"></Textarea>

												<Label htmlFor="manufacturer">Proizvođač/Brend:</Label>
												<Input type="text" name="manufacturer" />

												<Label htmlFor="warranty">
													Informacije o garanciji:
												</Label>
												<Textarea
													rows={2}
													name="warranty"
													className="min-h-min"
												/>

												<Label htmlFor="shippingInfo">
													Informacije o dostavi:
												</Label>
												<Textarea
													rows={2}
													name="shippingInfo"
													className="min-h-min"
												/>

												<Label htmlFor="availability">Dostupnost:</Label>
												<Select name="availability">
													<SelectTrigger>
														<SelectValue placeholder="Izaberi opciju" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="in-stock">Na stanju</SelectItem>
														<SelectItem value="out-of-stock">
															Nema na stanju
														</SelectItem>
														<SelectItem value="pre-order">Preorder</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="flex flex-shrink-0 justify-end gap-2 px-8 py-4">
											<Button
												variant="ghost"
												type="button"
												onClick={closeDialog}
											>
												Otkaži
											</Button>
											<Button type="submit">Dodaj</Button>
										</div>
									</Form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
