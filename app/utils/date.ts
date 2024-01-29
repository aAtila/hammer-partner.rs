export const formatDate = (
	date: string,
	locale: string = 'sr-Latn-RS',
): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};
	return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};
