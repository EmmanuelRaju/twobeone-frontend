import { json } from '@sveltejs/kit';
import { createUser } from '$lib/server/services/user';
import { SCommonRegistration } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';

export const POST = async ({ request }) => {
	const form = await superValidate(request, zod4(SCommonRegistration));
	if (!form.valid) return json(form, { status: 400 });

	try {
		const { name, email, mobile, password } = form.data;
		const id = await createUser({ name, email, mobile, password });
		return json({ success: true, id });
	} catch (err) {
		if (err.message.includes('Email already exists')) {
			form.errors.email = ['This email is already registered.'];
			return json(form, { status: 400 });
		}
		console.error(err);
		return json({ error: 'Something went wrong' }, { status: 500 });
	}
};
