import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SLocation } from '$lib/schemas';
import {
	getProfile,
	updateLocation,
	createProfile,
	isLocationComplete
} from '$lib/server/services/matrimony/profile';

export const load = async ({ locals: { safeGetSession } }) => {
	const { user } = await safeGetSession();
	const userId = user!.id;
	let profile = await getProfile(userId);

	if (!profile) {
		profile = await createProfile(userId);
	}

	let form;

	if (profile?.location && isLocationComplete(profile.location)) {
		form = await superValidate(profile.location, zod4(SLocation));
	} else {
		form = await superValidate(zod4(SLocation));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, locals: { safeGetSession } }) => {
		const { user } = await safeGetSession();
		const userId = user!.id;
		const form = await superValidate(request, zod4(SLocation));

		if (!form.valid) return fail(400, { form });

		try {
			await updateLocation(userId, form.data);

			return {
				form,
				message: 'Location updated successfully.',
				success: true,
				posted: true
			};
		} catch (error) {
			console.error('Error in location information', error);
			return fail(500, { form, message: 'Something went wrong, try again later' });
		}
	}
};
