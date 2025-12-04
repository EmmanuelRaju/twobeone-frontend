import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SFamily } from '$lib/schemas';
import { getProfile, updateFamilyInformation, createProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	let profile = await getProfile(userId);

	if (!profile) {
		profile = await createProfile(userId);
	}

	let form;

	if (profile?.family) {
		form = await superValidate(profile.family, zod4(SFamily));
	} else {
		form = await superValidate(zod4(SFamily));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const form = await superValidate(request, zod4(SFamily));
		
		if (!form.valid) return fail(400, { form });

		try {
			await updateFamilyInformation(userId, form.data);

			const refreshedProfile = await getProfile(userId);
			const updatedForm = await superValidate(refreshedProfile!.family, zod4(SFamily));

			return {
				form: updatedForm,
				message: 'Family details updated successfully.',
				success: true,
				posted: true
			};
		} catch (error) {
			console.error('Error in family information', error);
			return fail(500, { form, message: 'Something went wrong, try again later' });
		}
	}
};
