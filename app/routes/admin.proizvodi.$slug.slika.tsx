import {
	unstable_parseMultipartFormData,
	type ActionFunctionArgs,
	unstable_createMemoryUploadHandler,
	json,
} from '@remix-run/node';
import { z } from 'zod';
import { parseWithZod } from '@conform-to/zod';
import { uploadFile } from '~/services/publitio.server';

const MAX_SIZE = 1024 * 1024 * 3; // 3MB

const NewImageSchema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, 'Image is required')
		.refine(
			(file) => file.size <= MAX_SIZE,
			'Image size must be less than 3MB',
		),
});

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await unstable_parseMultipartFormData(
		request,
		unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE }),
	);

	const submission = await parseWithZod(formData, {
		schema: NewImageSchema.transform(async (data) => {
			if (data.image.size <= 0) return z.NEVER;
			return {
				image: data.image,
			};
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		// handle error
		return json({ success: false });
	}

	const { image } = submission.value;

	await uploadFile(image, folderId);

	console.log({ image });

	return null;
};

export const loader = async () => {
	// const folders = await listFolders('testfolder');

	return null;
};

export default function Slike() {
	// const [form, fields] = useForm({
	// 	onValidate({ formData }) {
	// 		return parseWithZod(formData, { schema: NewImageSchema });
	// 	},
	// });

	return (
		<>
			<form method="post" encType="multipart/form-data">
				<input type="file" name="image" accept="image/*" />
				<button type="submit">Dodaj sliku</button>
			</form>
		</>
	);
}
