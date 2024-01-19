import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
	return { message: `Hello from ${params.category} page!` };
};

export default function CategoryPage() {
	const { message } = useLoaderData<typeof loader>();
	const params = useParams();

	return (
		<>
			<h1>{params.category} page</h1>
			<p>{message}</p>
		</>
	);
}
