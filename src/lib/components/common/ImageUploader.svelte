<script lang="ts">
	import { toasts } from '$lib/stores/toast';

	let { value = $bindable([]), max = 1 } = $props();

	let uploading = $state(false);
	let pendingPreviews = $state<Array<{ file: File; preview: string }>>([]);

	async function uploadFile(file: File) {
		uploading = true;

		try {
			// Step 1: Get signed upload URL
			const res = await fetch('/api/images/get-upload-url', { method: 'POST' });
			const { uploadURL, imageId } = await res.json();

			// Step 2: Upload file directly
			const fd = new FormData();
			fd.append('file', file);

			await fetch(uploadURL, { method: 'POST', body: fd });

			// Step 3: Update local state
			value = [...value, imageId];
		} catch (error) {
			console.error('Error while uploading image', error);
			toasts.addToast({ type: 'error', message: 'Error while uploading image, try again later' });
		} finally {
			uploading = false;
		}
	}

	async function remove(imageId: string) {
		await fetch(`/api/images/${imageId}`, { method: 'DELETE' });

		value = value.filter((id) => id !== imageId);
	}

	function handleFileSelect(e: Event) {
		const files = Array.from((e.target as HTMLInputElement).files ?? []);
		const availableSlots = max - value.length - pendingPreviews.length;
		const filesToPreview = files.slice(0, availableSlots);

		filesToPreview.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const preview = event.target?.result as string;
				pendingPreviews = [...pendingPreviews, { file, preview }];
			};
			reader.readAsDataURL(file);
		});

		// Reset input
		(e.target as HTMLInputElement).value = '';
	}

	async function approvePreview(index: number) {
		try {
			const { file } = pendingPreviews[index];
			pendingPreviews = pendingPreviews.filter((_, i) => i !== index);
			await uploadFile(file);
			toasts.addToast({ type: 'success', message: 'Image uploaded successfully' });
		} catch (error) {
			console.error('Error while approving image upload', error);
			toasts.addToast({
				type: 'error',
				message: 'Error while approving image upload, try again later'
			});
		}
	}

	function rejectPreview(index: number) {
		pendingPreviews = pendingPreviews.filter((_, i) => i !== index);
	}

	let totalImages = $derived(value.length + pendingPreviews.length);
	let canAddMore = $derived(totalImages < max);
</script>

<div class="grid h-full w-full grid-cols-12 gap-2.5">
	{#each value as imgId}
		<div
			class="relative col-span-full flex flex-col gap-2.5 overflow-clip rounded-box border border-gray-300 bg-base-200 sm:col-span-6 lg:col-span-4"
		>
			<img
				class="w-full object-contain"
				alt="uploaded"
				src={`https://imagedelivery.net/${import.meta.env.VITE_CF_IMAGES_HASH}/${imgId}/public`}
			/>
			<div class="flex items-center justify-center gap-2.5 pb-5">
				<button class="btn" onclick={() => remove(imgId)}> Remove </button>
			</div>
		</div>
	{/each}
	{#each pendingPreviews as { preview }, index}
		<div
			class="relative col-span-full flex flex-col gap-2.5 overflow-clip rounded-box border border-gray-300 bg-base-200 sm:col-span-6 lg:col-span-4"
		>
			<img class="w-full object-contain" alt="preview" src={preview} />
			<div class="flex items-center justify-center gap-2.5 pb-5">
				<button class="btn" onclick={() => rejectPreview(index)} disabled={uploading}>
					Reject
				</button>
				<button class="btn btn-primary" onclick={() => approvePreview(index)} disabled={uploading}>
					Approve
				</button>
			</div>
		</div>
	{/each}
	<!-- Upload Button -->
	{#if canAddMore}
		{#if uploading}
			<div class="col-span-full h-full min-h-40 skeleton sm:col-span-6 lg:col-span-4"></div>
		{:else}
			<label
				class="col-span-full flex h-full min-h-40 cursor-pointer items-center justify-center rounded-box border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400 hover:bg-gray-50 sm:col-span-6 lg:col-span-4"
			>
				<input type="file" accept="image/*" multiple class="hidden" onchange={handleFileSelect} />
				<div class="flex flex-col items-center gap-1">
					<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
					<span class="text-xs text-gray-500">Add</span>
				</div>
			</label>
		{/if}
	{/if}
</div>
