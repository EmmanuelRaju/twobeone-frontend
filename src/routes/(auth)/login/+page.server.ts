// routes/(auth)/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { SEmailLogin } from '$lib/schemas';

export const load = async ({ locals: { safeGetSession } }: { locals: App.Locals }) => {
	const { session } = await safeGetSession();
	if (session) {
		redirect(303, `/home`);
	}

	const form = await superValidate(zod4(SEmailLogin));
	return { form };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }: { request: Request; url: URL; locals: App.Locals }) => {
		const form = await superValidate(request, zod4(SEmailLogin));
		if (!form.valid) return fail(400, { form });

		const redirectTo = url.searchParams.get('redirectTo') || '/home';

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: form.data.email,
				password: form.data.password
			});

			if (error) {
				console.error('Supabase Auth Error:', error);
				return fail(400, {
					form,
					message: error.message
				});
			}
		} catch (error) {
			console.error('Login page', error);
			return fail(500, {
				form,
				message: 'An unexpected error occurred'
			});
		}
		throw redirect(303, redirectTo);
	}
};
