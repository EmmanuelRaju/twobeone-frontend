import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals: { safeGetSession } }) => {
	const { session,user } = await safeGetSession();
	// console.log('Session', session);
	if (!session) {
		redirect(303, `/login?redirectTo=${url.pathname}`);
	}
	return { session,user };
};
