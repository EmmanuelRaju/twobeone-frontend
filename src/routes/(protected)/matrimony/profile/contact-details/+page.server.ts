import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SContact } from '$lib/schemas';
import { getProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	const profile = await getProfile(userId);

	let form;

	if (profile?.contact) {
		form = await superValidate(profile.contact, zod4(SContact));
	} else {
		form = await superValidate(zod4(SContact));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod4(SContact));
		try {
			if (!form.valid) return fail(400, { form });

			const res = await fetch('/api/matrimony/profile/contact', {
				method: 'POST',
				body: JSON.stringify(form.data)
			});

			const out = await res.json();

			if (!out.success) {
				return fail(400, { form, message: out.error ?? 'Failed to save data.' });
			}

			return {
				form,
				message: out.message,
				success: out.success,
				posted: true
			};
		} catch (error) {
			console.error('Error in contact information', error);
			return fail(400, { form, message: 'Something went wrong, try again later' });
		}
	}
};
