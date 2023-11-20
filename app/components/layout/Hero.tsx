import { Link } from '@remix-run/react';

const offers = [
	{
		name: 'Kupujte veće, štedite više',
		description: 'Popusti na velike količine za majstore',
		href: '#',
	},
	{
		name: 'Garancija na kvalitet',
		description: 'Svi proizvodi prolaze stroge kontrole kvaliteta',
		href: '#',
	},
	{
		name: 'Pomoć stručnjaka',
		description: 'Besplatan savet za sve vaše projekte i izazove',
		href: '#',
	},
];
const trendingProducts = [
	{
		id: 1,
		name: 'Klešta',
		color: 'Metal',
		price: '1.250,00 RSD',
		href: '#',
		imageSrc: '/assets/images/products/klesta.png',
		imageAlt: 'Klesta',
		availableColors: [],
	},
	{
		id: 2,
		name: 'Trimmer',
		color: 'Metal',
		price: '49.990,00 RSD',
		href: '#',
		imageSrc: '/assets/images/products/trimmer.png',
		imageAlt: 'Trimmer',
		availableColors: [],
	},
	{
		id: 3,
		name: 'Šrafovi',
		color: 'Metal',
		price: '3,99 RSD / kom',
		href: '#',
		imageSrc: '/assets/images/products/saraf.png',
		imageAlt: 'Srafovi',
		availableColors: [],
	},
	{
		id: 4,
		name: 'Skalper',
		color: 'Metal',
		price: '750,00 RSD',
		href: '#',
		imageSrc: '/assets/images/products/skalper.png',
		imageAlt:
			'Black machined steel pen with hexagonal grip and small white logo at top.',
		availableColors: [],
	},
];

export default function Hero() {
	return (
		<>
			{/* Hero */}
			<div className="flex flex-col border-b border-gray-200 lg:border-0">
				<nav aria-label="Offers" className="order-last lg:order-first">
					<div className="mx-auto max-w-7xl lg:px-8">
						<ul
							role="list"
							className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
						>
							{offers.map((offer) => (
								<li key={offer.name} className="flex flex-col">
									<a
										href={offer.href}
										className="relative flex flex-1 flex-col justify-center bg-white px-4 py-6 text-center focus:z-10"
									>
										<p className="text-sm text-gray-500">{offer.name}</p>
										<p className="font-semibold text-gray-900">
											{offer.description}
										</p>
									</a>
								</li>
							))}
						</ul>
					</div>
				</nav>
				{/* Hero section */}
				<div className="relative bg-gray-900 p-2">
					{/* Decorative image and overlay */}
					<div aria-hidden="true" className="absolute inset-0 overflow-hidden">
						<img
							src="/assets/images/featured/hero-image-v2.png"
							alt=""
							className="h-full w-full object-cover object-center"
						/>
					</div>
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-gray-900 opacity-80"
					/>

					<div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
						<h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
							Vaš projekat, naša podrška
						</h1>
						<p className="mt-4 text-xl text-white">
							Zašto tražiti dalje kada imamo sve što vam treba da završite
							posao?
						</p>
						<Link
							to="#contact"
							className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
						>
							Posetite Radnju
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
