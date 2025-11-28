// routes/(auth)/login/+page.server.ts
import { loginUser } from '$lib/server/models/UserModel.js';
import { getLucia } from '$lib/server/lucia/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { SEmailLogin } from '$lib/schemas';

export const load = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/home');

	const form = await superValidate(zod4(SEmailLogin));
	return { form };
};

export const actions = {
	default: async ({ request, cookies, url }) => {
		const form = await superValidate(request, zod4(SEmailLogin));
		if (!form.valid) return fail(400, { form });

		const redirectTo = url.searchParams.get('redirectTo') || '/home';

		try {
			const userId = await loginUser(form.data.email, form.data.password);
			const lucia = await getLucia();

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
		} catch (error) {
			console.error('Login page', error);
			return fail(400, {
				form,
				message: 'Invalid credentials'
			});
		}
		throw redirect(303, redirectTo);
	}
};
