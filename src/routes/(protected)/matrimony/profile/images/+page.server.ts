import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db/client';
import { profiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) {
		throw redirect(302, '/auth/login');
	}

	const profile = await db.query.profiles.findFirst({
		where: eq(profiles.userId, user.id)
	});

	if (!profile) {
		// Should ideally redirect to profile creation or handle gracefully
		throw error(404, 'Profile not found');
	}

	return {
		user,
		profileImage: profile.profileImage ? [profile.profileImage] : [],
		galleryImages: profile.galleryImages || []
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const profileImage = formData.get('profileImage') as string;
		const galleryImagesStr = formData.get('galleryImages') as string;

		let galleryImages: string[] = [];
		try {
			galleryImages = JSON.parse(galleryImagesStr);
		} catch (e) {
			console.error('Error parsing gallery images', e);
			return fail(400, { message: 'Invalid gallery images data' });
		}

		try {
			await db
				.update(profiles)
				.set({
					profileImage: profileImage || null,
					galleryImages: galleryImages,
					updatedAt: new Date()
				})
				.where(eq(profiles.userId, user.id));

			return { success: true };
		} catch (e) {
			console.error('Error saving images', e);
			return fail(500, { message: 'Failed to save images' });
		}
	}
};
