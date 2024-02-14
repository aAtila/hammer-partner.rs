import type { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { uploadImage } from '~/services/publitio.server';

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	console.log(formData.get('file'));
	for (const key of formData.keys()) {
		const value = formData.get(key);
		console.log(`Key: ${key}, Value: ${value}`);
	}

	const newData = new FormData();
	newData.append('file', formData.get('file') as Blob);

	await uploadImage(formData);

	return null;
};

export default function Slika() {
	return (
		<>
			<Form method="post">
				<Input type="file" name="file" accept="image/*" />
				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}
