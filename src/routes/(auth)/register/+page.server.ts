import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { commonRegistrationSchema } from '$lib/schemas';

export const load = async () => {
	const form = await superValidate(zod4(commonRegistrationSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(commonRegistrationSchema));
		if (!form.valid) return fail(400, { form });

		const { name, email, mobile, password } = form.data;

		const userExists = false;
		if (userExists) return fail(400, { form, message: 'Email already registered' });

		const hashedPassword = await bcrypt.hash(password, 10);

		console.log('✅ New user registered:', { name, email, mobile, hashedPassword });

		throw redirect(303, '/welcome');
	}
};
