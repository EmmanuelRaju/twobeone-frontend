// routes/(auth)/register/+page.server.ts
import { registerUser } from '$lib/server/models/UserModel.js';
import { findUserById } from '$lib/server/models/UserModel.js';
import { lucia } from '$lib/server/lucia/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { SCommonRegistration } from '$lib/schemas';

export const load = async ({ locals }) => {
	// Redirect if already logged in
	if (locals.user) throw redirect(302, '/home');

	const form = await superValidate(zod4(SCommonRegistration));
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(SCommonRegistration));
		if (!form.valid) return fail(400, { form });

		try {
			// Create user
			const userId = await registerUser({
				name: form.data.name,
				email: form.data.email,
				mobile: form.data.mobile,
				password: form.data.password
			});

			// Verify user exists in database
			const userFromDb = await findUserById(userId);

			if (!userFromDb) {
				throw new Error('User was created but could not be found in database');
			}

			// Create session with Lucia - pass ObjectId as string for the adapter
			const userIdString = userId;
			const session = await lucia.createSession(userIdString, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});

			throw redirect(303, '/home');
		} catch (error) {
			// Re-throw SvelteKit errors (redirects, etc.)
			if (error && typeof error === 'object' && 'status' in error) {
				throw error;
			}
			console.error('Registration error:', error);
			return fail(500, {
				form,
				message: error instanceof Error ? error.message : 'Registration failed'
			});
		}
	}
};
