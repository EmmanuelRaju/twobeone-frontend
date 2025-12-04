import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SInterests } from '$lib/schemas';
import { getProfile, updateInterests, createProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	let profile = await getProfile(userId);

	if (!profile) {
		profile = await createProfile(userId);
	}

	let form;

	if (profile?.interests) {
		form = await superValidate(profile.interests, zod4(SInterests));
	} else {
		form = await superValidate(zod4(SInterests));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const form = await superValidate(request, zod4(SInterests));
		
		if (!form.valid) return fail(400, { form });

		try {
			await updateInterests(userId, form.data);

			return {
				form,
				message: 'Interests updated successfully.',
				success: true,
				posted: true
			};
		} catch (error) {
			console.error('Error in interests information', error);
			return fail(500, { form, message: 'Something went wrong, try again later' });
		}
	}
};
