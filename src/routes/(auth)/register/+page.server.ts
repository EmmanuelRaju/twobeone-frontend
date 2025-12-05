// routes/(auth)/register/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { SCommonRegistration } from '$lib/schemas';
import { db } from '$lib/server/db/client';
import { users } from '$lib/server/db/schema';

export const load = async ({ locals: { safeGetSession } }: { locals: App.Locals }) => {
	const { session } = await safeGetSession();
	if (session) {
		redirect(303, `/home`);
	}

	const form = await superValidate(zod4(SCommonRegistration));
	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase } }: { request: Request; locals: App.Locals }) => {
		const form = await superValidate(request, zod4(SCommonRegistration));
		if (!form.valid) return fail(400, { form });

		try {
			// 1. Sign up with Supabase Auth
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: form.data.email,
				password: form.data.password,
				options: {
					data: {
						name: form.data.name,
						mobile: form.data.mobile
					}
				}
			});

			if (authError) {
				console.error('Supabase Auth Error:', authError);
				return fail(400, {
					form,
					message: authError.message
				});
			}

			if (!authData.user) {
				return fail(500, {
					form,
					message: 'Registration failed: No user returned'
				});
			}

			// 2. Insert into public users table
			await db.insert(users).values({
				id: authData.user.id, // Use Supabase Auth ID
				email: form.data.email,
				name: form.data.name,
				mobile: form.data.mobile,
				emailVerified: false
			});

		} catch (error) {
			console.error('Registration error:', error);
			// If DB insert fails, we might want to delete the auth user or handle it.
			// For now, just return error.
			return fail(500, {
				form,
				message: error instanceof Error ? error.message : 'Registration failed'
			});
		}
		
		throw redirect(303, '/home');
	}
};
