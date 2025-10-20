import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { SForgotPassword } from '$lib/schemas';

export const load = async () => {
	const form = await superValidate(zod4(SForgotPassword));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(SForgotPassword));
		if (!form.valid) return fail(400, { form });

		const { email } = form.data;

		const userExists = false;
		if (userExists) return fail(400, { form, message: 'Email already registered' });

		console.log('Mail sent', { email });

		throw redirect(303, '/welcome');
	}
};
