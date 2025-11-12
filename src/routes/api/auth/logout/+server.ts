// routes/(auth)/logout/+server.ts
import { lucia } from '$lib/server/lucia/lucia.js';
import { apiResponse } from '$lib/server/utils/response.js';

export const POST = async ({ locals, cookies }) => {
	if (!locals.session) {
		return apiResponse.success('Logout successful');
	}

	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});

	return apiResponse.success('Logout successful');
};
