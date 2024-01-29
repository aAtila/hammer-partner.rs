import { Link } from '@remix-run/react';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function CreateButton({
	to,
	children,
}: {
	to?: string;
	children?: React.ReactNode;
}) {
	return (
		<Button asChild>
			<Link to={to || 'dodaj'} className="flex gap-2">
				<PlusCircleIcon className="size-4" />
				{children}
			</Link>
		</Button>
	);
}
