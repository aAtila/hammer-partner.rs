import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="relative z-10">
			<nav aria-label="Top">
				{/* Top navigation */}
				<div className="bg-gray-900">
					<div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
						<p className="p-3 text-center text-sm font-medium text-white lg:flex-none">
							Besplatna isporuka za sve porudžbine preko 3000 dinara
						</p>
					</div>
				</div>

				{/* Secondary navigation */}
				<div className="bg-white">
					<div className="border-b border-gray-200">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 items-center justify-between">
								{/* Logo (lg+) */}
								<div className="hidden lg:flex lg:items-center">
									<a href="#">
										<span className="sr-only">Your Company</span>
										<img
											className="h-8 w-auto"
											src="/assets/images/logos/hammer-partner-logo.jpg"
											alt=""
										/>
									</a>
								</div>

								{/* Mobile menu and search (lg-) */}
								<div className="flex flex-1 items-center lg:hidden">
									<button
										type="button"
										className="-ml-2 rounded-md bg-white p-2 text-gray-400"
										onClick={() => setMobileMenuOpen(true)}
									>
										<span className="sr-only">Open menu</span>
										<Menu className="h-6 w-6" aria-hidden="true" />
									</button>

									{/* Search */}
									<a
										href="#"
										className="ml-2 p-2 text-gray-400 hover:text-gray-500"
									>
										<span className="sr-only">Search</span>
										<Search className="h-6 w-6" aria-hidden="true" />
									</a>
								</div>

								{/* Logo (lg-) */}
								<a href="#" className="lg:hidden">
									<span className="sr-only">Your Company</span>
									<img
										src="/assets/images/logos/hammer-partner-logo.jpg"
										alt=""
										className="h-8 w-auto"
									/>
								</a>

								<div className="flex flex-1 items-center justify-end">
									<div className="flex items-center lg:ml-8">
										<div className="flex space-x-8">
											<div className="hidden lg:flex">
												<a
													href="#"
													className="-m-2 p-2 text-gray-400 hover:text-gray-500"
												>
													<span className="sr-only">Search</span>
													<Search className="h-6 w-6" aria-hidden="true" />
												</a>
											</div>

											<div className="flex">
												<a
													href="#"
													className="-m-2 p-2 text-gray-400 hover:text-gray-500"
												>
													<span className="sr-only">Account</span>
													<User className="h-6 w-6" aria-hidden="true" />
												</a>
											</div>
										</div>

										<span
											className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
											aria-hidden="true"
										/>

										<div className="flow-root">
											<a href="#" className="group -m-2 flex items-center p-2">
												<ShoppingCart
													strokeWidth={2}
													className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true"
												/>
												<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
													0
												</span>
												<span className="sr-only">items in cart, view bag</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
