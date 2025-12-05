<script lang="ts">
	import { ImageUploader } from '$lib/components';
	import { enhance } from '$app/forms';
	import { toasts } from '$lib/stores/toast';
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	let profileImage = $state(data.profileImage);
	let galleryImages = $state(data.galleryImages);

	$effect(() => {
		if (form?.success) {
			toasts.addToast({ type: 'success', message: 'Images saved successfully' });
		} else if (form?.message) {
			toasts.addToast({ type: 'error', message: form.message });
		}
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Manage images</h1>
	
	<form
		method="POST"
		use:enhance={() => {
			return async ({ update }) => {
				await update();
			};
		}}
		class="flex flex-col gap-10"
	>
		<div class="flex flex-col items-center justify-center gap-5">
			<h2 class="!m-0 text-center">Main Profile Photo</h2>
			<p class="text-sm text-gray-500">Upload a clear photo of yourself.</p>
			<!-- Profile image is single, but uploader works with array. Max 1. -->
			<ImageUploader bind:value={profileImage} max={1} userId={data.user.id} supabase={data.supabase} />
			<input type="hidden" name="profileImage" value={profileImage[0] || ''} />
		</div>

		<div class="flex flex-col items-center justify-center gap-5">
			<h2 class="!m-0 text-center">Gallery</h2>
			<p class="text-sm text-gray-500">Add up to 3 more photos to your gallery.</p>
			<ImageUploader bind:value={galleryImages} max={3} userId={data.user.id} supabase={data.supabase} />
			<input type="hidden" name="galleryImages" value={JSON.stringify(galleryImages)} />
		</div>

		<div class="flex justify-center pt-5">
			<button type="submit" class="btn btn-primary min-w-[200px]">Save Changes</button>
		</div>
	</form>
</main>
