import { Building2Icon, MailIcon, PhoneIcon } from 'lucide-react';

export default function Example() {
	return (
		<div className="relative isolate bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
				<div className="relative bg-slate-100/20 p-8 lg:static">
					<div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
						<div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden rounded bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
							<svg
								className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
										width={200}
										height={200}
										x="100%"
										y={-1}
										patternUnits="userSpaceOnUse"
									>
										<path d="M130 200V.5M.5 .5H200" fill="none" />
									</pattern>
								</defs>
								<rect width="100%" height="100%" strokeWidth={0} fill="white" />
								<svg x="100%" y={-1} className="overflow-visible fill-gray-50">
									<path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
								</svg>
								<rect
									width="100%"
									height="100%"
									strokeWidth={0}
									fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
								/>
							</svg>
						</div>
						<h2 className="text-3xl font-bold tracking-tight text-slate-900">
							Kontaktirajte nas
						</h2>
						<p className="mt-6 text-lg leading-8 text-slate-600">
							Ukoliko imate bilo kakvih pitanja ili vam je potreban savet,
							slobodno nas kontaktirajte. Naš tim je uvek spreman da vam pruži
							podršku i pomoć.
						</p>
						<dl className="mt-10 space-y-4 text-base leading-7 text-slate-600">
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Adresa</span>
									<Building2Icon
										className="h-7 w-6 text-slate-400"
										aria-hidden="true"
									/>
								</dt>
								<dd>
									Arsenija Čarnojevića 80
									<br />
									Subotica, 24000
								</dd>
							</div>
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Telefon</span>
									<PhoneIcon
										className="h-7 w-6 text-slate-400"
										aria-hidden="true"
									/>
								</dt>
								<dd className="flex items-end">
									<a className="hover:text-slate-900" href="tel:+381658052022">
										065 8052022
									</a>
								</dd>
							</div>
							<div className="flex gap-x-4">
								<dt className="flex-none">
									<span className="sr-only">Email</span>
									<MailIcon
										className="h-7 w-6 text-slate-400"
										aria-hidden="true"
									/>
								</dt>
								<dd className="flex items-end">
									<a
										className="hover:text-slate-900"
										href="mailto:info@hammer-partner.rs"
									>
										info@hammer-partner.rs
									</a>
								</dd>
							</div>
						</dl>
					</div>
				</div>
				<form action="#" method="POST" className="px-8 py-24">
					<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div>
								<label
									htmlFor="first-name"
									className="block text-sm font-semibold leading-6 text-slate-900"
								>
									Ime
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="first-name"
										id="first-name"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="last-name"
									className="block text-sm font-semibold leading-6 text-slate-900"
								>
									Prezime
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autoComplete="family-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="email"
									className="block text-sm font-semibold leading-6 text-slate-900"
								>
									Email
								</label>
								<div className="mt-2.5">
									<input
										type="email"
										name="email"
										id="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="phone-number"
									className="block text-sm font-semibold leading-6 text-slate-900"
								>
									Broj telefona
								</label>
								<div className="mt-2.5">
									<input
										type="tel"
										name="phone-number"
										id="phone-number"
										autoComplete="tel"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="message"
									className="block text-sm font-semibold leading-6 text-slate-900"
								>
									Poruka
								</label>
								<div className="mt-2.5">
									<textarea
										name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										defaultValue={''}
									/>
								</div>
							</div>
						</div>
						<div className="mt-8 flex justify-end">
							<button
								type="submit"
								className="rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Pošalji
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
