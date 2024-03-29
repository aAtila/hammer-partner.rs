import { json, redirect } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import prisma from '~/db/db.server';
import { Dialog, Transition } from '@headlessui/react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Fragment, useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Loader2Icon, XIcon } from 'lucide-react';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { productFormSchema } from './admin/schemas';
import { cn } from '~/lib/utils';

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = Object.fromEntries(await request.formData());
	const productId = String(data.id);

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

	await prisma.product.update({
		where: { id: productId },
		data: {
			...productData,
			category: { connect: { id: productData.category } },
		},
	});

	return redirect(`/admin/proizvodi`);
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const slug = params.slug;

	const product = await prisma.product.findUnique({
		where: { slug },
		include: { category: true },
	});

	if (!product) {
		throw redirect('/admin/proizvodi', { status: 404 });
	}

	const categories = await prisma.category.findMany({
		where: { deletedAt: null },
		select: { id: true, name: true },
	});

	return json({ product, categories });
};

export default function ProductDetailsPage() {
	const { product, categories } = useLoaderData<typeof loader>();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const fetcher = useFetcher();
	const isLoading = fetcher.state === 'submitting';

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
									<div className="mt-[1px] flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
										<Input type="hidden" name="id" value={product.id} />
										<div className="bg-white px-8 py-5">
											<div className="flex items-center justify-between bg-white">
												<Dialog.Title className="text-xl font-medium leading-6">
													Izmeni proizvod
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
													Ažuriraj detalje proizvoda
												</p>
											</div>
										</div>
										<fetcher.Form
											method="post"
											className="flex items-center gap-4 px-8 py-4"
											action="/admin/slike"
											encType="multipart/form-data"
										>
											<input
												type="hidden"
												name="folderId"
												defaultValue={product.publitioFolderId ?? undefined}
											/>
											<input
												type="hidden"
												name="productId"
												defaultValue={product.id}
											/>
											<Input
												type="file"
												name="image"
												accept="image/*"
												multiple
												className="max-w-xs"
												disabled={isLoading}
											/>
											<Button
												value="images"
												type="submit"
												disabled={isLoading}
												className="relative"
											>
												<Loader2Icon
													className={cn([
														isLoading ? 'opacity-100' : 'opacity-0',
														'absolute size-5 animate-spin',
													])}
												/>
												<span
													className={isLoading ? 'opacity-0' : 'opacity-100'}
												>
													Dodaj slike
												</span>
											</Button>
										</fetcher.Form>
										<Form
											id="updateProductForm"
											method="post"
											className="flex-grow space-y-4 overflow-y-auto px-4 py-6 sm:px-8"
										>
											{/* <FormErrors errors={actionData?.errors} /> */}
											<input type="hidden" name="id" value={product.id} />
											<div className="mx-auto grid grid-cols-[auto_1fr] items-baseline gap-3">
												<Label htmlFor="name">Naziv proizvoda:</Label>
												<Input
													type="text"
													name="name"
													defaultValue={product.name}
												/>

												<Label htmlFor="sku">Šifra proizvoda:</Label>
												<Input
													type="text"
													name="sku"
													defaultValue={product.sku ?? undefined}
												/>

												<Label htmlFor="ean">EAN broj/Barkod:</Label>
												<Input
													type="text"
													name="ean"
													defaultValue={product.ean ?? undefined}
												/>

												<Label htmlFor="category">Kategorija:</Label>
												<Select
													name="category"
													defaultValue={product.categoryId ?? undefined}
												>
													<SelectTrigger>
														<SelectValue placeholder="Izaberi kategoriju" />
													</SelectTrigger>
													<SelectContent defaultValue={product.categoryId}>
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
												<Input
													type="number"
													name="price"
													step="0.01"
													defaultValue={product.price}
												/>
												<Label htmlFor="costPrice">Veleprodajna Cena:</Label>
												<Input
													type="number"
													name="costPrice"
													step="0.01"
													defaultValue={product.costPrice ?? undefined}
												/>

												<Label htmlFor="quantity">Količina na zalihi:</Label>
												<Input
													type="number"
													name="quantity"
													defaultValue={product.quantity ?? undefined}
												/>

												<Label htmlFor="description" className="">
													Opis proizvoda:
												</Label>
												<Textarea
													name="description"
													defaultValue={product.description ?? undefined}
												></Textarea>

												<Label htmlFor="shortDescription">
													Kratak opis proizvoda:
												</Label>
												<Textarea
													name="shortDescription"
													defaultValue={product.shortDescription ?? undefined}
												></Textarea>

												<Label htmlFor="manufacturer">Proizvođač/Brend:</Label>
												<Input
													type="text"
													name="manufacturer"
													defaultValue={product.manufacturer ?? undefined}
												/>
												<Label htmlFor="warranty">
													Informacije o garanciji:
												</Label>
												<Textarea
													rows={2}
													name="warranty"
													className="min-h-min"
													defaultValue={product.warranty ?? undefined}
												/>

												<Label htmlFor="shippingInfo">
													Informacije o dostavi:
												</Label>
												<Textarea
													rows={2}
													name="shippingInfo"
													className="min-h-min"
													defaultValue={product.shippingInfo ?? undefined}
												/>

												<Label htmlFor="availability">Dostupnost:</Label>
												<Select
													name="availability"
													defaultValue={product.availability ?? undefined}
												>
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
										</Form>
										<div className="flex flex-shrink-0 justify-end gap-2 px-8 py-4">
											<Button
												variant="ghost"
												type="button"
												onClick={closeDialog}
											>
												Otkaži
											</Button>
											<Button
												form="updateProductForm"
												type="submit"
												value="update"
												disabled={isLoading}
											>
												Izmeni
											</Button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
