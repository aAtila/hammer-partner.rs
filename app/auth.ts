import { createCookie } from '@remix-run/node';

const secret = process.env.COOKIE_SECRET || 'my-secret';
if (secret === 'my-secret') {
	console.warn(
		'🚨 No COOKIE_SECRET set, the app is insecure. See https://remix.run/url/env-vars',
	);
}

export const loginUser = (email: string, password: string) => {
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
