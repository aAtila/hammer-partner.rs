import { createCookie, redirect } from '@remix-run/node';

const secret = process.env.COOKIE_SECRET || 'my-secret';
if (secret === 'my-secret') {
	console.warn(
		'🚨 No COOKIE_SECRET set, the app is insecure. See https://remix.run/url/env-vars',
	);
}

export const loginUser = (email: string, password: string) => {
	if (!email.endsWith('@hammer-partner.rs'))
		throw new Error('Invalid email or password');

	if (password !== process.env.TEMP_PASSWORD)
		throw new Error('Invalid email or password');

	return { email };
};

export const authCookie = createCookie('auth', {
	path: '/',
	maxAge: 60 * 60 * 24 * 30,
	httpOnly: true,
	sameSite: 'lax',
	secrets: [secret],
	secure: process.env.NODE_ENV === 'production',
});

export const requireAuthCookie = async (request: Request) => {
	const user = await authCookie.parse(request.headers.get('Cookie'));
	const url = new URL(request.url);

	if (!user)
		throw redirect(`/prijava?next=${encodeURIComponent(url.pathname)}`);

	return user;
};
