import { superValidate } from 'sveltekit-superforms/server';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SContact } from '$lib/schemas';
import { getProfile, updateContactDetails, createProfile } from '$lib/server/services/matrimony/profile';

export const load = async ({ locals }) => {
	const userId = locals.user!.id;
	let profile = await getProfile(userId);

	if (!profile) {
		profile = await createProfile(userId);
	}

	let form;

	if (profile?.contact) {
		form = await superValidate(profile.contact, zod4(SContact));
	} else {
		form = await superValidate(zod4(SContact));
	}

	return { form, verified: profile?.state === 'verified', profileState: profile?.state };
};

export const actions = {
	default: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const form = await superValidate(request, zod4(SContact));
		
		if (!form.valid) return fail(400, { form });

		try {
			await updateContactDetails(userId, form.data);

			return {
				form,
				message: 'Contact details updated successfully.',
				success: true,
				posted: true
			};
		} catch (error) {
			console.error('Error in contact information', error);
			return fail(500, { form, message: 'Something went wrong, try again later' });
		}
	}
};
