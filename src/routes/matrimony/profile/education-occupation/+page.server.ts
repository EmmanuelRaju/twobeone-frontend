import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SEducationOccupation } from '$lib/schemas';

export const load = async () => {
	const form = await superValidate(zod4(SEducationOccupation));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(SEducationOccupation));
		console.log('Data submitted', form);
		if (!form.valid) return fail(400, { form });

		return { form };
	}
};
