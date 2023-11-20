export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-slate-700 p-3">
			<div className="mx-auto flex max-w-7xl justify-center py-4 text-center text-slate-400">
				© {year} Hammer-Partners DOO, Sva prava zadržana
			</div>
		</footer>
	);
}
