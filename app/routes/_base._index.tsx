import type { DataFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import Contact from '~/components/layout/Contact';
import Hero from '~/components/layout/Hero';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Hammer-Partner - Sve za Vašu kuću i dvorište Subotica' },
		{
			name: 'description',
			content:
				'Naša ponuda obuhvata široki asortiman vrhunskih proizvoda, od alata i materijala do sudopera, slavina i gvožđarske robe.',
		},
	];
};

export const action = async () => {
	return json({ message: 'success' });
};

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
		name: 'Aspiratori',
		description: 'Efikasni i stilski aspiratori za modernu kuhinju',
		imageSrc: '/assets/images/featured/aspiratori.webp',
		imageAlt:
			'Moderan aspirator visokog kvaliteta u fokusu, sa naprednim funkcijama, postavljen iznad šporeta u luksuznoj kuhinji sa tamnim elementima.',
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
// aluminijumske merdevine i metalne police, granitne sudopere, stolari, testere
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

const values = [
	{
		name: 'Kvalitet i zadovoljstvo.',
		description:
			'Verujemo u kvalitet, a kvalitet veruje u nas. Zato pažljivo biramo svaki proizvod koji uđe u naš asortiman. Vaše zadovoljstvo nije samo naša ambicija, već i naša najveća nagrada. Ne želimo samo da vas opremimo potrebnim alatima, želimo da budete zadovoljni i da se uvek ponovo vratite.',
		icon: CheckCircleIcon,
	},
	{
		name: 'Kamen temeljac u Subotici.',
		description:
			'Naša radnja se nalazi u samom srcu Subotice, što nas čini idealnom destinacijom za sve lokalne majstore, entuzijaste i profesionalce. Kao lokalna trgovina, razumemo specifične potrebe i izazove naše zajednice i trudimo se da im u svakom momentu izađemo u susret.',
		icon: CheckCircleIcon,
	},
	{
		name: 'Prednosti lokalne kupovine.',
		description:
			'Kupovinom kod nas, ne samo da ćete dobiti proizvode vrhunskog kvaliteta, već ćete i podržati lokalnu ekonomiju i održivost naše zajednice. Pružamo brzu i efikasnu uslugu, uz mogućnost ličnog kontakta i razumevanje koje često nedostaje u velikim lancima.',
		icon: CheckCircleIcon,
	},
];

export default function Index() {
	return (
		<>
			<Hero />
			{/* Trending products */}
			{/*<section aria-labelledby="trending-heading" className="bg-white">*/}
			{/*	<div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">*/}
			{/*		<div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">*/}
			{/*			<h2*/}
			{/*				id="trending-heading"*/}
			{/*				className="text-2xl font-bold tracking-tight text-gray-900"*/}
			{/*			>*/}
			{/*				Popularni proizvodi*/}
			{/*			</h2>*/}
			{/*			<a*/}
			{/*				href="#"*/}
			{/*				className="hidden text-sm font-semibold text-slate-700 hover:text-slate-600 sm:block"*/}
			{/*			>*/}
			{/*				Pogledaj sve*/}
			{/*				<span aria-hidden="true"> &rarr;</span>*/}
			{/*			</a>*/}
			{/*		</div>*/}

			{/*		<div className="relative mt-8">*/}
			{/*			<div className="relative w-full overflow-x-auto">*/}
			{/*				<ul*/}
			{/*					role="list"*/}
			{/*					className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"*/}
			{/*				>*/}
			{/*					{trendingProducts.map((product) => (*/}
			{/*						<li*/}
			{/*							key={product.id}*/}
			{/*							className="inline-flex w-64 flex-col text-center lg:w-auto"*/}
			{/*						>*/}
			{/*							<div className="group relative">*/}
			{/*								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">*/}
			{/*									<img*/}
			{/*										src={product.imageSrc}*/}
			{/*										alt={product.imageAlt}*/}
			{/*										className="h-full w-full object-cover object-center group-hover:opacity-75"*/}
			{/*									/>*/}
			{/*								</div>*/}
			{/*								<div className="mt-6">*/}
			{/*									<p className="text-sm text-gray-500">{product.color}</p>*/}
			{/*									<h3 className="mt-1 font-semibold text-gray-900">*/}
			{/*										<a href={product.href}>*/}
			{/*											<span className="absolute inset-0" />*/}
			{/*											{product.name}*/}
			{/*										</a>*/}
			{/*									</h3>*/}
			{/*									<p className="mt-1 text-gray-900">{product.price}</p>*/}
			{/*								</div>*/}
			{/*							</div>*/}

			{/*							<h4 className="sr-only">Available colors</h4>*/}
			{/*							<ul*/}
			{/*								role="list"*/}
			{/*								className="mt-auto flex items-center justify-center space-x-3 pt-6"*/}
			{/*							>*/}
			{/*								/!*{product.availableColors.map((color) => (*!/*/}
			{/*								/!*	<li*!/*/}
			{/*								/!*		key={color.name}*!/*/}
			{/*								/!*		className="h-4 w-4 rounded-full border border-black border-opacity-10"*!/*/}
			{/*								/!*		style={{ backgroundColor: color.colorBg }}*!/*/}
			{/*								/!*	>*!/*/}
			{/*								/!*		<span className="sr-only">{color.name}</span>*!/*/}
			{/*								/!*	</li>*!/*/}
			{/*								/!*))}*!/*/}
			{/*							</ul>*/}
			{/*						</li>*/}
			{/*					))}*/}
			{/*				</ul>*/}
			{/*			</div>*/}
			{/*		</div>*/}

			{/*		<div className="mt-12 px-4 sm:hidden">*/}
			{/*			<a*/}
			{/*				href="#"*/}
			{/*				className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"*/}
			{/*			>*/}
			{/*				See everything*/}
			{/*				<span aria-hidden="true"> &rarr;</span>*/}
			{/*			</a>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}

			{/* Collections */}
			<section aria-labelledby="collections-heading" className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
						<h2
							id="collections-heading"
							className="text-3xl font-bold text-gray-900"
						>
							Šta vam je potrebno za vaš projekat?
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
										{/*<a href={collection.href}>*/}
										<span className="absolute inset-0" />
										{collection.name}
										{/*</a>*/}
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
							Iskoristite neverovatne popuste na alate i materijale! Ponuda važi
							samo ovog meseca!
						</p>
						<Button size="lg" asChild className="mt-8">
							<Link to="#contact" className="!text-lg">
								Kupi Odmah
							</Link>
						</Button>
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
							className="text-3xl font-bold tracking-tight text-gray-900"
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
										className="flex-shrink-0 text-slate-700"
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
			<div className="prose py-8 lg:mx-auto lg:max-w-5xl">
				{/* About us section */}
				<section className="pb-24">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
							Ko smo mi? Upoznajte našu radnju!
						</h2>
						<div className="grid items-center sm:grid-cols-2 sm:gap-16">
							<p className="mt-6 text-lg leading-8">
								Dragi ljubitelji kvalitetnih alata i opreme, sa velikim
								zadovoljstvom vam predstavljamo našu malu, ali izuzetno
								posvećenu radnju za prodaju alata i hardverske opreme! Nismo
								samo još jedna u nizu trgovina; mi smo porodični biznis koji je
								nedavno osnovan sa jednim jasnim ciljem - da vam pružimo
								najkvalitetnije proizvode i usluge koje zaslužujete.
							</p>
							<img
								src="/assets/images/hammer-partner-davor-boros.jpg"
								alt="Davor Boros Vlasnik Hammer Partner"
								className="rounded-lg"
							/>
						</div>
						<ul role="list" className="mt-8 space-y-8 text-gray-600">
							{values.map((value, idx) => (
								<li key={idx} className="flex gap-x-3">
									<CheckCircleIcon
										className="mt-1 h-5 w-5 flex-none text-indigo-600"
										aria-hidden="true"
									/>
									<span>
										<strong className="font-semibold text-gray-900">
											{value.name}
										</strong>{' '}
										{value.description}
									</span>
								</li>
							))}
						</ul>
					</div>
				</section>
				<section id="contact" className="lg:pb-24">
					<Contact />
				</section>
			</div>
		</>
	);
}
