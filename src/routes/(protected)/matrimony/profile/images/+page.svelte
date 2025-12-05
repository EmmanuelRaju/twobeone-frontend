<script lang="ts">
	import { ImageUploader } from '$lib/components';
	import { toasts } from '$lib/stores/toast';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	let profileImage = $state(data.profileImage);
	let galleryImages = $state(data.galleryImages);

	async function handleImageAction(type: 'profile' | 'gallery', action: 'add' | 'remove', url: string) {
		try {
			const method = action === 'add' ? 'POST' : 'DELETE';
			const res = await fetch('/api/profile/images', {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type, url })
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || 'Failed to update profile');
			}

			toasts.addToast({ 
				type: 'success', 
				message: action === 'add' ? 'Image saved successfully' : 'Image removed successfully' 
			});
		} catch (e) {
			console.error('Error updating profile image', e);
			toasts.addToast({ 
				type: 'error', 
				message: 'Failed to save changes. Please try again.' 
			});
			// Ideally revert optimistic UI here if needed, but for now we rely on user retry or reload
		}
	}
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Manage images</h1>
	
	<div class="flex flex-col gap-10">
		<div class="flex flex-col items-center justify-center gap-5">
			<h2 class="!m-0 text-center">Main Profile Photo</h2>
			<p class="text-sm text-gray-500">Upload a clear photo of yourself.</p>
			<!-- Profile image is single, but uploader works with array. Max 1. -->
			<ImageUploader 
				bind:value={profileImage} 
				max={1} 
				userId={data.user.id} 
				supabase={data.supabase}
				onUpload={(url) => handleImageAction('profile', 'add', url)}
				onRemove={(url) => handleImageAction('profile', 'remove', url)}
			/>
		</div>

		<div class="flex flex-col items-center justify-center gap-5">
			<h2 class="!m-0 text-center">Gallery</h2>
			<p class="text-sm text-gray-500">Add up to 3 more photos to your gallery.</p>
			<ImageUploader 
				bind:value={galleryImages} 
				max={3} 
				userId={data.user.id} 
				supabase={data.supabase}
				onUpload={(url) => handleImageAction('gallery', 'add', url)}
				onRemove={(url) => handleImageAction('gallery', 'remove', url)}
			/>
		</div>
	</div>
</main>
