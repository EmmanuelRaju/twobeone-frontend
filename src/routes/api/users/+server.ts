import { json } from '@sveltejs/kit';
import { createUser, listUsers } from '$lib/server/models/UserModel';
import { SCommonRegistration } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';

// POST → Create new user
export const POST = async ({ request }) => {
	const form = await superValidate(request, zod4(SCommonRegistration));

	if (!form.valid) {
		return json(form, { status: 400 });
	}

	const id = await createUser(form.data);
	return json({ success: true, id });
};

// GET → Fetch all users
export const GET = async () => {
	const users = await listUsers();
	return json(users);
};
