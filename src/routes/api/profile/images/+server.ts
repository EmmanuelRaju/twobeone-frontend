import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/client';
import { profiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) {
		throw error(401, 'Unauthorized');
	}

	const { type, url } = await request.json();

	if (!url || !['profile', 'gallery'].includes(type)) {
		throw error(400, 'Invalid request data');
	}

	try {
		const profile = await db.query.profiles.findFirst({
			where: eq(profiles.userId, user.id)
		});

		if (!profile) {
			throw error(404, 'Profile not found');
		}

		if (type === 'profile') {
			// If there's an existing profile image, we should ideally delete it from storage
			// But we'll handle that cleanup separately or let the client handle it?
			// The plan said: "Update profileImage, delete old image from Storage (if exists)."

			if (profile.profileImage && profile.profileImage !== url) {
				// Extract path from URL to delete
				const oldPath = getPathFromUrl(profile.profileImage);
				if (oldPath) {
					await locals.supabase.storage.from('profile-images').remove([oldPath]);
				}
			}

			await db
				.update(profiles)
				.set({ profileImage: url, updatedAt: new Date() })
				.where(eq(profiles.userId, user.id));
		} else if (type === 'gallery') {
			const currentGallery = profile.galleryImages || [];
			if (currentGallery.length >= 3) {
				throw error(400, 'Gallery limit reached');
			}

			await db
				.update(profiles)
				.set({
					galleryImages: [...currentGallery, url],
					updatedAt: new Date()
				})
				.where(eq(profiles.userId, user.id));
		}

		return json({ success: true });
	} catch (e) {
		console.error('Error saving image', e);
		throw error(500, 'Failed to save image');
	}
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) {
		throw error(401, 'Unauthorized');
	}

	const { type, url } = await request.json();

	if (!url || !['profile', 'gallery'].includes(type)) {
		throw error(400, 'Invalid request data');
	}

	try {
		const profile = await db.query.profiles.findFirst({
			where: eq(profiles.userId, user.id)
		});

		if (!profile) {
			throw error(404, 'Profile not found');
		}

		// Delete from Storage
		const path = getPathFromUrl(url);
		if (path) {
			const { error: storageError } = await locals.supabase.storage
				.from('profile-images')
				.remove([path]);

			if (storageError) {
				console.error('Error removing file from storage', storageError);
				// Continue to remove from DB even if storage fails, to keep DB clean
			}
		}

		if (type === 'profile') {
			await db
				.update(profiles)
				.set({ profileImage: null, updatedAt: new Date() })
				.where(eq(profiles.userId, user.id));
		} else if (type === 'gallery') {
			const currentGallery = profile.galleryImages || [];
			const newGallery = currentGallery.filter((img) => img !== url);

			await db
				.update(profiles)
				.set({
					galleryImages: newGallery,
					updatedAt: new Date()
				})
				.where(eq(profiles.userId, user.id));
		}

		return json({ success: true });
	} catch (e) {
		console.error('Error deleting image', e);
		throw error(500, 'Failed to delete image');
	}
};

function getPathFromUrl(url: string) {
	try {
		const urlObj = new URL(url);
		const pathParts = urlObj.pathname.split('/profile-images/');
		if (pathParts.length > 1) {
			return decodeURIComponent(pathParts[1]);
		}
		return null;
	} catch (e) {
		return null;
	}
}
