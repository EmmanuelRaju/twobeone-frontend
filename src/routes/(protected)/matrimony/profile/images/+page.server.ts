import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
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
