import { redirect } from '@remix-run/node';
import PageTitle from './admin/components/page-title';

export const loader = async () => {
	return redirect('/admin/proizvodi');
};

export default function AdminPage() {
	return (
		<>
			<PageTitle title="Početna" />
		</>
	);
}
