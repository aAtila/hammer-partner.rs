import { Tab } from '@headlessui/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { cn } from '~/lib/utils';
import { StarIcon } from 'lucide-react';
import prisma from '~/db/db.server';
import { useLoaderData } from '@remix-run/react';
import { toCurrency } from '~/utils/number';
import { Button } from '~/components/ui/button';
import Markdown from 'react-markdown';
import { CDN, CDN_FOLDER } from '~/config/constants';

const defaultProduct = {
	rating: 5,
	images: [
		{
			id: 1,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
			selected: true,
		},
		{
			id: 2,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 3,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
		{
			id: 4,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
			alt: 'Angled front view with bag zipped and handles upright.',
		},
	],
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const category = params.category;
	const slug = params.productSlug;

	const product = await prisma.product.findFirst({
		where: {
			slug: slug,
			category: {
				slug: category,
			},
		},
		include: {
			category: true,
			images: true,
		},
	});

	return { product } as const;
};

export default function ProductPage() {
	const { product } = useLoaderData<typeof loader>();

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
					{/* Image gallery */}
					<Tab.Group as="div" className="flex flex-col-reverse">
						{/* Image selector */}
						<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
							<Tab.List className="grid grid-cols-4 gap-6">
								{product?.images?.map((image) => (
									<Tab
										key={image.id}
										className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
									>
										{({ selected }) => (
											<>
												<span className="sr-only">{image.alt}</span>
												<span className="absolute inset-0 overflow-hidden rounded-md">
													<img
														src={`${CDN}/w_130,h_93,c_fill,q_90/${CDN_FOLDER}/${product.id}/${image.url}`}
														alt=""
														className="size-full object-cover object-center"
													/>
												</span>
												<span
													className={cn(
														selected ? 'ring-indigo-500' : 'ring-transparent',
														'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</Tab>
								))}
							</Tab.List>
						</div>

						<Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
							{product?.images?.map((image) => (
								<Tab.Panel
									key={image.id}
									className="bg-pattern flex items-center border border-gray-100 sm:min-h-[592px] sm:overflow-hidden sm:rounded-lg"
								>
									<img
										src={`${CDN}/w_592,h_592,c_fit,q_99/${CDN_FOLDER}/${product.id}/${image.url}`}
										alt={image.alt ?? ''}
										className="size-full object-cover object-center"
									/>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>

					{/* Product info */}
					<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
							{product?.name}
						</h1>

						<div className="mt-3">
							<h2 className="sr-only">Detalji proizvoda</h2>
							<p className="text-3xl tracking-tight text-gray-900">
								{toCurrency(product?.price ?? '')}
							</p>
						</div>

						{/* Reviews */}
						<div className="mt-3">
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center">
								<div className="flex items-center">
									{[0, 1, 2, 3, 4].map((rating) => (
										<StarIcon
											key={rating}
											className={cn(
												defaultProduct.rating > rating
													? 'text-blue-500'
													: 'text-gray-300',
												'h-5 w-5 flex-shrink-0',
											)}
											aria-hidden="true"
										/>
									))}
								</div>
								<p className="sr-only">{defaultProduct.rating} od 5 zvezdica</p>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">Opis</h3>

							<div
								className="space-y-6 text-base text-gray-700"
								dangerouslySetInnerHTML={{
									__html: product?.shortDescription ?? '',
								}}
							/>
						</div>

						<form className="mt-6">
							{/* Colors */}
							{/* <div>
								<h3 className="text-sm text-gray-600">Color</h3>

								<RadioGroup
									value={selectedColor}
									onChange={setSelectedColor}
									className="mt-2"
								>
									<RadioGroup.Label className="sr-only">
										Choose a color
									</RadioGroup.Label>
									<span className="flex items-center space-x-3">
										{defaultProduct.colors.map((color) => (
											<RadioGroup.Option
												key={color.name}
												value={color}
												className={({ active, checked }) =>
													cn(
														color.selectedColor,
														active && checked ? 'ring ring-offset-1' : '',
														!active && checked ? 'ring-2' : '',
														'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
													)
												}
											>
												<RadioGroup.Label as="span" className="sr-only">
													{color.name}
												</RadioGroup.Label>
												<span
													aria-hidden="true"
													className={cn(
														color.bgColor,
														'h-8 w-8 rounded-full border border-black border-opacity-10',
													)}
												/>
											</RadioGroup.Option>
										))}
									</span>
								</RadioGroup>
							</div> */}

							<div className="mt-10 flex sm:flex-col">
								<Button
									type="submit"
									className="w-full max-w-xs bg-blue-600 font-medium hover:bg-blue-700"
								>
									Dodaj u korpu
								</Button>

								{/* <button
									type="button"
									className="ml-4 flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
								>
									<HeartIcon
										className="size-6 flex-shrink-0"
										aria-hidden="true"
									/>
									<span className="sr-only">Add to favorites</span>
								</button> */}
							</div>
						</form>

						<section aria-labelledby="details-heading" className="mt-12">
							<h2 id="details-heading" className="sr-only">
								Additional details Additional details
							</h2>

							<div className="divide-y divide-gray-200 border-t py-12">
								{/* {defaultProduct.details.map((detail) => (
									<Disclosure as="div" key={detail.name}>
										{({ open }) => (
											<>
												<h3>
													<Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
														<span
															className={cn(
																open ? 'text-indigo-600' : 'text-gray-900',
																'text-sm font-medium',
															)}
														>
															{detail.name}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusIcon
																	className="block size-6 text-indigo-400 group-hover:text-indigo-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusIcon
																	className="block size-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="prose prose-sm pb-6"
												>
													<ul role="list">
														{detail.items.map((item) => (
															<li key={item}>{item}</li>
														))}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))} */}
								<div className="space-y-5">
									<h2 className="font-medium">Detaljan opis</h2>
									<div className="prose">
										<Markdown>{product?.description}</Markdown>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
