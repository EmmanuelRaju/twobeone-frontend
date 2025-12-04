import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SBasicProfile } from '$lib/schemas';
import { getProfile, updateBasicInformation, createProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	let profile = await getProfile(userId);

	// Ensure profile exists
	if (!profile) {
		profile = await createProfile(userId);
	}

	let form;

	if (profile?.basicInformation) {
		form = await superValidate(profile.basicInformation, zod4(SBasicProfile));
	} else {
		form = await superValidate(zod4(SBasicProfile));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const form = await superValidate(request, zod4(SBasicProfile));
		
		if (!form.valid) return fail(400, { form });

		try {
			// Ensure profile exists (just in case)
			await createProfile(userId);

			await updateBasicInformation(userId, form.data);

			return {
				form,
				message: 'Profile updated successfully.',
				success: true,
				posted: true
			};
		} catch (error) {
			console.error('Error in basic information', error);
			return fail(500, { form, message: 'Something went wrong, try again later' });
		}
	}
};
