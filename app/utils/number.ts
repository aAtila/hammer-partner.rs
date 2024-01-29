export const toCurrency = (
	value: number | string,
	currency: string = 'RSD',
) => {
	return new Intl.NumberFormat('sr-RS', {
		style: 'currency',
		currency,
		maximumFractionDigits: 0,
	}).format(Number(value));
};
