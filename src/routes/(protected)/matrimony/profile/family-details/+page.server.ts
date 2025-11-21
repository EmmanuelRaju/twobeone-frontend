import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SFamily } from '$lib/schemas';
import { getProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	const profile = await getProfile(userId);

	let form;

	if (profile?.family) {
		form = await superValidate(profile.family, zod4(SFamily));
	} else {
		form = await superValidate(zod4(SFamily));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, fetch, locals }) => {
		const userId = locals.user!.id;
		const form = await superValidate(request, zod4(SFamily));
		try {
			if (!form.valid) return fail(400, { form });

			const res = await fetch('/api/matrimony/profile/family-details', {
				method: 'POST',
				body: JSON.stringify(form.data)
			});

			const out = await res.json();

			if (!out.success) {
				return fail(400, { form, message: out.error ?? 'Failed to save data.' });
			}

			const refreshedProfile = await getProfile(userId);

			const updatedForm = await superValidate(refreshedProfile!.family, zod4(SFamily));

			return {
				form: updatedForm,
				message: out.message,
				success: out.success,
				posted: true
			};
		} catch (error) {
			console.error('Error in family information', error);
			return fail(400, { form, message: 'Something went wrong, try again later' });
		}
	}
};
