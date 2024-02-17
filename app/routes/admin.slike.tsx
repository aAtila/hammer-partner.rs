import { parseWithZod } from '@conform-to/zod';
import {
	unstable_parseMultipartFormData,
	unstable_createMemoryUploadHandler,
	json,
} from '@remix-run/node';
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { z } from 'zod';
import prisma from '~/db/db.server';
import { uploadFile } from '~/services/publitio.server';

const MAX_SIZE = 1024 * 1024 * 20; // 5MB

const singleImageSchema = z
	.instanceof(File)
	.refine((file) => file.size > 0, 'Image is required')
	.refine((file) => file.size <= MAX_SIZE, 'Image size must be less than 3MB');

const multipleImagesSchema = singleImageSchema.array();

const UploadImagesSchema = z.object({
	folderId: z.string().min(1, 'FolderId is required'),
	productId: z.string().min(1, 'ProductId is required'),
	image: z.union([singleImageSchema, multipleImagesSchema]),
});

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await unstable_parseMultipartFormData(
		request,
		unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE }),
	);

	console.log(`validating form data...`);

	const submission = await parseWithZod(formData, {
		schema: UploadImagesSchema.transform(async (data) => {
			if (Array.isArray(data.image)) {
				const validImages = data.image.filter((file) => file.size > 0);
				if (validImages.length === 0) return z.NEVER;

				return {
					images: validImages,
					folderId: data.folderId,
					productId: data.productId,
				};
			} else {
				if (data.image.size <= 0) return z.NEVER;

				return {
					images: [data.image],
					folderId: data.folderId,
					productId: data.productId,
				};
			}
		}),
		async: true,
	});

	if (submission.status !== 'success') {
		// handle error
		console.error(submission.error);
		return json({ success: false });
	}

	const { images, folderId, productId } = submission.value;

	const uploadAndAddToDb = async (image: File) => {
		let publitioImage;

		try {
			console.log(`uploading ${image.name} to publitio...`);
			publitioImage = await uploadFile(image, folderId);
		} catch (error) {
			console.error(error);
			throw error; // or handle error differently
		}

		if (publitioImage?.success) {
			console.log(`add ${image.name} to the db...`);
			console.log({ publitioImage });

			try {
				await prisma.image.create({
					data: {
						productId: productId,
						publitioId: publitioImage.id,
						folder: publitioImage.folder,
						folderId: publitioImage.folder_id,
						name: publitioImage.title,
						extension: publitioImage.extension,
						width: publitioImage.width,
						height: publitioImage.height,
						thumbnail: publitioImage.url_thumbnail,
					},
				});
				console.log(`${image.name} done...`);
			} catch (error) {
				console.error(error);
				throw error; // or handle error differently
			}
		}
	};

	// Use Promise.all to handle all images at the same time
	try {
		await Promise.all(images.map(uploadAndAddToDb));
	} catch (error) {
		console.error('An error occurred while processing images:', error);
	}

	return null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	if (request.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 });
	}

	return null;
};
