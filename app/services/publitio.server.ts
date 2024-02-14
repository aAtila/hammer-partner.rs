import crypto from 'crypto';

const PUBLITIO_API_KEY = process.env.PUBLITIO_API_KEY ?? '';
const PUBLITIO_API_SECRET = process.env.PUBLITIO_API_SECRET ?? '';

export const uploadImage = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);

	const api_timestamp = Math.floor(Date.now() / 1000);
	const api_nonce = Math.floor(Math.random() * 99999999)
		.toString()
		.padStart(8, '0');
	const signatureString = `${api_timestamp}${api_nonce}${PUBLITIO_API_SECRET}`;
	const api_signature = crypto
		.createHash('sha1')
		.update(signatureString)
		.digest('hex');
	const url = `https://api.publit.io/v1/files/create?api_key=${PUBLITIO_API_KEY}&api_nonce=${api_nonce}&api_signature=${api_signature}&api_timestamp=${api_timestamp}`;

	fetch(url, {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((json) => console.log({ json }))
		.catch((error) => console.log({ error }));
};
