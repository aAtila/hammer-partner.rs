import slugify from '@sindresorhus/slugify';
import { z } from 'zod';

export const productFormSchema = z
	.object({
		name: z.string().min(1, 'Naziv proizvoda je obavezan'),
		slug: z.string().optional(),
		sku: z.string().optional(),
		ean: z.string().optional(),
		category: z.string().min(1, 'Kategorija je obavezna'),
		price: z
			.string()
			.min(1, 'Cena je obavezna')
			.transform((str) => parseFloat(str)),
		// price: z.number().positive('Cena je obavezan i mora biti pozitivan broj'),
		costPrice: z
			.string()
			.optional()
			.transform((str) => (str ? parseFloat(str) : undefined)),
		quantity: z
			.string()
			.optional()
			.transform((str) => (str ? parseFloat(str) : undefined)),
		description: z.string().min(1, 'Opis proizvoda je obavezan'),
		shortDescription: z.string().optional(),
		manufacturer: z.string().min(1, 'Proizvođač/Brend je obavezan'),
		warranty: z.string().min(1, 'Informacije o garanciji je obavezan'),
		shippingInfo: z.string().optional(),
		availability: z.enum(['in-stock', 'out-of-stock', 'pre-order']),
	})
	.transform((data) => {
		return {
			...data,
			slug: data.slug ? slugify(data.slug) : slugify(data.name),
		};
	});

export const categoryFormSchema = z
	.object({
		name: z.string().min(1, 'Naziv kategorije je obavezan'),
		slug: z.string().optional(),
	})
	.transform((data) => {
		return {
			...data,
			slug: data.slug ? slugify(data.slug) : slugify(data.name),
		};
	});
