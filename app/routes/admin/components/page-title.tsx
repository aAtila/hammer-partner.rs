import type { ReactNode } from 'react';

export default function PageTitle({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children?: ReactNode;
}) {
	return (
		<div className="flex items-center justify-between border-b pb-5">
			<div>
				<h1 className="text-2xl font-medium">{title}</h1>
				{description ? (
					<p className="text-sm text-muted-foreground">{description}</p>
				) : null}
			</div>
			{children}
		</div>
	);
}
