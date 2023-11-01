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
const collections = [
	{
		name: 'Alati za početnike',
		description: 'Savršeno za one koji ulaze u svet majstorisanja',
		imageSrc: '/assets/images/featured/alati-za-pocetnike-v2.png',
		imageAlt:
			'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
		href: '#',
	},
	{
		name: 'Baštovanstvo',
		description: 'Ulepšajte svoje dvorište sa našim proizvodima',
		imageSrc: '/assets/images/featured/bastovanstvo-v2.png',
		imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
		href: '#',
	},
	{
		name: 'Alati za profesionalce',
		description: 'Visokokvalitetni alati za ozbiljne poslove',
		imageSrc: '/assets/images/featured/alati-za-profesionalce-v3.png',
		imageAlt:
			'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
		href: '#',
	},
	{
		name: 'Boje & Renovacije',
		description: 'Sve što vam je potrebno za farbanje i renovacije',
		imageSrc: '/assets/images/featured/boje-i-renovacija.png',
		imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
		href: '#',
	},
	{
		name: 'Osvetljenje',
		description: 'Sve što vam je potrebno za farbanje i renovacije',
		imageSrc: '/assets/images/featured/osvetljenje.png',
		imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
		href: '#',
	},
	{
		name: 'Kupatilski Luksuz',
		description: 'Pretvorite svoje kupatilo u pravi wellness centar',
		imageSrc: '/assets/images/featured/kupatilo-v2.png',
		imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
		href: '#',
	},
];
const testimonials = [
	{
		id: 1,
		quote:
			'Iskreno, očekivao sam običnu prodavnicu alata, ali ovo je pravi raj za majstore! Osoblje zna svoj posao, a izbor je ogroman. Više ne znam da li da završim kućne poslove ili da se igram sa novim alatima!',
		attribution: 'Majstor Peca',
	},
	{
		id: 2,
		quote:
			'Zaista nema potrebe da idem bilo gde drugde. Ova radnja mi je postala prva stanica za sve od baštenskog alata do električnih uređaja. Toplo preporučujem!',
		attribution: 'Ana',
	},
	{
		id: 3,
		quote:
			'Ko bi rekao da će poseta prodavnici alata postati moj vikend izlazak? Izvanredna usluga i sjajna atmosfera. Osećam se kao kod kuće!',
		attribution: 'Igor',
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
				<div className="relative bg-gray-900">
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
						<a
							href="#"
							className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
						>
							Posetite Radnju
						</a>
					</div>
				</div>
			</div>

			{/* Trending products */}
			<section aria-labelledby="trending-heading" className="bg-white">
				<div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
					<div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
						<h2
							id="trending-heading"
							className="text-2xl font-bold tracking-tight text-gray-900"
						>
							Popularni proizvodi
						</h2>
						<a
							href="#"
							className="hidden text-sm font-semibold text-slate-700 hover:text-slate-600 sm:block"
						>
							Pogledaj sve
							<span aria-hidden="true"> &rarr;</span>
						</a>
					</div>

					<div className="relative mt-8">
						<div className="relative w-full overflow-x-auto">
							<ul
								role="list"
								className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
							>
								{trendingProducts.map((product) => (
									<li
										key={product.id}
										className="inline-flex w-64 flex-col text-center lg:w-auto"
									>
										<div className="group relative">
											<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
												<img
													src={product.imageSrc}
													alt={product.imageAlt}
													className="h-full w-full object-cover object-center group-hover:opacity-75"
												/>
											</div>
											<div className="mt-6">
												<p className="text-sm text-gray-500">{product.color}</p>
												<h3 className="mt-1 font-semibold text-gray-900">
													<a href={product.href}>
														<span className="absolute inset-0" />
														{product.name}
													</a>
												</h3>
												<p className="mt-1 text-gray-900">{product.price}</p>
											</div>
										</div>

										<h4 className="sr-only">Available colors</h4>
										<ul
											role="list"
											className="mt-auto flex items-center justify-center space-x-3 pt-6"
										>
											{/*{product.availableColors.map((color) => (*/}
											{/*	<li*/}
											{/*		key={color.name}*/}
											{/*		className="h-4 w-4 rounded-full border border-black border-opacity-10"*/}
											{/*		style={{ backgroundColor: color.colorBg }}*/}
											{/*	>*/}
											{/*		<span className="sr-only">{color.name}</span>*/}
											{/*	</li>*/}
											{/*))}*/}
										</ul>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="mt-12 px-4 sm:hidden">
						<a
							href="#"
							className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
						>
							See everything
							<span aria-hidden="true"> &rarr;</span>
						</a>
					</div>
				</div>
			</section>

			{/* Collections */}
			<section aria-labelledby="collections-heading" className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
						<h2
							id="collections-heading"
							className="text-2xl font-bold text-gray-900"
						>
							Kolekcije
						</h2>

						<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
							{collections.map((collection) => (
								<div key={collection.name} className="group relative">
									<div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
										<img
											src={collection.imageSrc}
											alt={collection.imageAlt}
											className="h-full w-full object-cover object-center"
										/>
									</div>
									<h3 className="mt-6 text-sm text-gray-500">
										<a href={collection.href}>
											<span className="absolute inset-0" />
											{collection.name}
										</a>
									</h3>
									<p className="text-base font-semibold text-gray-900">
										{collection.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Sale and testimonials */}
			<div className="relative overflow-hidden border-b">
				{/* Decorative background image and gradient */}
				<div aria-hidden="true" className="absolute inset-0">
					<div className="absolute inset-0 mx-auto overflow-hidden">
						<img
							src="/assets/images/featured/hero-image.png"
							alt=""
							className="h-full w-full object-cover object-center"
						/>
					</div>
					<div className="absolute inset-0 bg-white bg-opacity-70" />
					<div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
				</div>
				{/* Sale */}
				<section
					aria-labelledby="sale-heading"
					className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
				>
					<div className="mx-auto max-w-2xl lg:max-w-none">
						<h2
							id="sale-heading"
							className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
						>
							Nova Akcija! Opremite Vaš Dom danas!
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
							Iskoristite neverovatne popuste na alatke i materijale! Ponuda
							važi samo ovog meseca!"
						</p>
						<a
							href="#"
							className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
						>
							Kupi odmah
						</a>
					</div>
				</section>
				{/* Testimonials */}
				<section
					aria-labelledby="testimonial-heading"
					className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
				>
					<div className="mx-auto max-w-2xl lg:max-w-none">
						<h2
							id="testimonial-heading"
							className="text-2xl font-bold tracking-tight text-gray-900"
						>
							Šta kažu naši klijenti
						</h2>

						<div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
							{testimonials.map((testimonial) => (
								<blockquote key={testimonial.id} className="sm:flex lg:block">
									<svg
										width={24}
										height={18}
										viewBox="0 0 24 18"
										aria-hidden="true"
										className="flex-shrink-0 text-gray-300"
									>
										<path
											d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
											fill="currentColor"
										/>
									</svg>
									<div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
										<p className="text-lg text-gray-600">{testimonial.quote}</p>
										<cite className="mt-4 block font-semibold not-italic text-gray-900">
											{testimonial.attribution}
										</cite>
									</div>
								</blockquote>
							))}
						</div>
					</div>
				</section>
			</div>
			<div className="prose py-8 sm:py-24 lg:mx-auto lg:max-w-5xl lg:px-8 lg:py-16">
				{/* About us */}
				<section className="text-slate-700">
					<h2 id="dobrodo-li-u-na-u-radnju-">Dobrodošli u našu radnju!</h2>
					<p>
						Dragi ljubitelji kvalitetnih alata i opreme, sa velikim
						zadovoljstvom vam predstavljamo našu malu, ali izuzetno posvećenu
						radnju za prodaju alata i hardverske opreme! Nismo samo još jedna u
						nizu trgovina; mi smo porodični biznis koji je nedavno osnovan sa
						jednim jasnim ciljem - da vam pružimo najkvalitetnije proizvode i
						usluge koje zaslužujete.
					</p>
					<h2 id="kvalitet-i-zadovoljstvo-klijenata-su-na-a-misija">
						Kvalitet i Zadovoljstvo Klijenata su naša Misija
					</h2>
					<p>
						Verujemo u kvalitet, a kvalitet veruje u nas. Zato pažljivo biramo
						svaki proizvod koji uđe u naš asortiman. Vaše zadovoljstvo nije samo
						naša ambicija, već i naša najveća nagrada. Ne želimo samo da vas
						opremimo potrebnim alatima, želimo da budete zadovoljni i da se uvek
						ponovo vratite.
					</p>
					<h2 id="kamen-temeljac-u-subotici">Kamen temeljac u Subotici</h2>
					<p>
						Naša radnja se nalazi u samom srcu Subotice, što nas čini idealnom
						destinacijom za sve lokalne majstore, entuzijaste i profesionalce.
						Kao lokalna trgovina, razumemo specifične potrebe i izazove naše
						zajednice i trudimo se da im u svakom momentu izađemo u susret.
					</p>
					<h2 id="prednosti-lokalne-kupovine">Prednosti Lokalne Kupovine</h2>
					<p>
						Kupovinom kod nas, ne samo da ćete dobiti proizvode vrhunskog
						kvaliteta, već ćete i podržati lokalnu ekonomiju i održivost naše
						zajednice. Pružamo brzu i efikasnu uslugu, uz mogućnost ličnog
						kontakta i razumevanje koje često nedostaje u velikim lancima.
					</p>
					<p>
						Toplo vas pozivamo da nas posetite i osetite razliku koju čini
						kupovina u radnji koja vam je bliska po mnogo više od same lokacije.
						Radujemo se što ćemo postati vaš pouzdani partner u svim vašim
						budućim projektima.
					</p>
				</section>
			</div>
		</>
	);
}
