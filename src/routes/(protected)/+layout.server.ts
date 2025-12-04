import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (!session) {
		redirect(303, `/login?redirectTo=${url.pathname}`);
	}
	return { session };
};
