import { Button } from '~/components/ui/button';
import PageTitle from './admin/components/page-title';
import { PlusCircleIcon } from 'lucide-react';
import { Link } from '@remix-run/react';

export default function ProductPage() {
	return (
		<>
			<PageTitle title="Proizvodi" description="Lista svih proizvoda">
				<Button asChild>
					<Link to="dodaj" className="flex gap-2">
						<PlusCircleIcon className="size-4" />
						Dodaj proizvod
					</Link>
				</Button>
			</PageTitle>
		</>
	);
}
