import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SEducationOccupation } from '$lib/schemas';
import { getProfile, updateEducationOccupation, createProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	let profile = await getProfile(userId);

	if (!profile) {
		profile = await createProfile(userId);
	}

	let form;

	if (profile?.educationOccupation) {
		form = await superValidate(profile.educationOccupation, zod4(SEducationOccupation));
	} else {
		form = await superValidate(zod4(SEducationOccupation));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const form = await superValidate(request, zod4(SEducationOccupation));
		
		if (!form.valid) return fail(400, { form });

		try {
			await updateEducationOccupation(userId, form.data);

			// Refresh profile to get updated data if needed, or just return success
			const refreshedProfile = await getProfile(userId);
			const updatedForm = await superValidate(
				refreshedProfile!.educationOccupation,
				zod4(SEducationOccupation)
			);

			return {
				form: updatedForm,
				message: 'Education & Occupation updated successfully.',
				success: true,
				posted: true
			};
		} catch (error) {
			console.error('Error in education occupation', error);
			return fail(500, { form, message: 'Something went wrong, try again later' });
		}
	}
};
