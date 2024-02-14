import crypto from 'crypto';

const PUBLITIO_API_KEY = process.env.PUBLITIO_API_KEY ?? '';
const PUBLITIO_API_SECRET = process.env.PUBLITIO_API_SECRET ?? '';
const PUBLITIO_PARENT_ID = 'AelL3Jjb';

export const uploadImage = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);

	const authParams = getAuthSignature();
	const url = `https://api.publit.io/v1/files/create?${authParams}`;

	fetch(url, {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((json) => console.log({ json }))
		.catch((error) => console.log({ error }));
};

type PublitioFolderResponse = {
	success: boolean;
	code: number;
	parent_id: null | string;
	parent_path: string;
	folders_count: number;
	folders: Array<{
		id: string;
		name: string;
		path: string;
		parent_id: null | string;
		created_at: string;
		updated_at: string;
	}>;
};

export const listFolders = async (): Promise<PublitioFolderResponse> => {
	const authParams = getAuthSignature();
	const url = `https://api.publit.io/v1/folders/list?parent_id=${PUBLITIO_PARENT_ID}&${authParams}`;

	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log({ error }));
};

type CreateFolderResponse = {
	success: boolean;
	code: number;
	message: string;
	id: string;
	name: string;
	path: string;
	parent_id: string | null;
	created_at: string;
	updated_at: string;
};

export const createFolder = async (
	name: string,
): Promise<CreateFolderResponse> => {
	const authParams = getAuthSignature();
	const url = `https://api.publit.io/v1/folders/create?parent_id=${PUBLITIO_PARENT_ID}&name=${name}&${authParams}`;

	return fetch(url, {
		method: 'POST',
	})
		.then((response) => response.json())
		.catch((error) => console.log({ error }));
};

const getAuthSignature = (): string => {
	const api_timestamp = Math.floor(Date.now() / 1000);
	const api_nonce = Math.floor(Math.random() * 99999999)
		.toString()
		.padStart(8, '0');
	const signatureString = `${api_timestamp}${api_nonce}${PUBLITIO_API_SECRET}`;
	const api_signature = crypto
		.createHash('sha1')
		.update(signatureString)
		.digest('hex');

	return `api_signature=${api_signature}&api_key=${PUBLITIO_API_KEY}&api_nonce=${api_nonce}&api_timestamp=${api_timestamp}`;
};
