import { z } from 'zod';

export const createProductFormSchema = z.object({
	name: z.string().min(1, 'Naziv proizvoda je obavezan'),
	sku: z.string().optional(),
	category: z.enum(['tools', 'electrical', 'plumbing'], {
		errorMap: (issue, ctx) => ({ message: 'Kategorija je obavezna' }),
	}),
	price: z.number().positive('Cena je obavezan i mora biti pozitivan broj'),
	costPrice: z
		.number()
		.positive('Nabavna Cena mora biti pozitivan broj')
		.optional(),
	quantity: z.number().min(0, 'Količina na zalihi mora da bude barem 0'),
	description: z.string().min(1, 'Opis proizvoda je obavezan'),
	manufacturer: z.string().min(1, 'Proizvođač/Brend je obavezan'),
	warranty: z.string().min(1, 'Informacije o garanciji je obavezan'),
	shippingInfo: z.string().optional(),
	availability: z.enum(['in-stock', 'out-of-stock', 'pre-order']),
});
