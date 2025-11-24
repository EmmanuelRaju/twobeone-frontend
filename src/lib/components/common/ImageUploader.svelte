<script lang="ts">
	let { value = $bindable([]), max = 1 } = $props();

	let uploading = $state(false);
	let pendingPreviews = $state<Array<{ file: File; preview: string }>>([]);

	async function uploadFile(file: File) {
		uploading = true;

		// Step 1: Get signed upload URL
		const res = await fetch('/api/images/get-upload-url', { method: 'POST' });
		const { uploadURL, imageId } = await res.json();

		// Step 2: Upload file directly
		const fd = new FormData();
		fd.append('file', file);

		await fetch(uploadURL, { method: 'POST', body: fd });

		// Step 3: Update local state
		value = [...value, imageId];

		uploading = false;
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
		const { file } = pendingPreviews[index];
		pendingPreviews = pendingPreviews.filter((_, i) => i !== index);
		await uploadFile(file);
	}

	function rejectPreview(index: number) {
		pendingPreviews = pendingPreviews.filter((_, i) => i !== index);
	}

	let totalImages = $derived(value.length + pendingPreviews.length);
	let canAddMore = $derived(totalImages < max);
</script>

<div class="space-y-4">
	<!-- Upload Button -->
	{#if canAddMore}
		<label
			class="flex h-24 w-24 cursor-pointer items-center justify-center rounded border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400 hover:bg-gray-50"
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

	<!-- Pending Previews -->
	{#if pendingPreviews.length > 0}
		<div class="space-y-2">
			<p class="text-sm font-semibold text-gray-700">Pending Review:</p>
			<div class="flex flex-wrap gap-3">
				{#each pendingPreviews as { preview }, index}
					<div class="relative flex flex-col gap-2">
						<img class="h-24 w-24 rounded object-cover" alt="preview" src={preview} />
						<div class="flex justify-center gap-1">
							<button
								class="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
								onclick={() => approvePreview(index)}
								disabled={uploading}
								title="Approve"
							>
								✓
							</button>
							<button
								class="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
								onclick={() => rejectPreview(index)}
								disabled={uploading}
								title="Reject"
							>
								✕
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Uploading State -->
	{#if uploading}
		<div class="flex items-center gap-2 text-sm text-gray-600">
			<svg class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			<span>Uploading...</span>
		</div>
	{/if}

	<!-- Uploaded Images -->
	{#if value.length > 0}
		<div class="space-y-2">
			<p class="text-sm font-semibold text-gray-700">Uploaded Images ({value.length}/{max}):</p>
			<div class="flex flex-wrap gap-3">
				{#each value as imgId}
					<div class="group relative">
						<img
							class="h-24 w-24 rounded object-cover"
							alt="uploaded"
							src={`https://imagedelivery.net/${import.meta.env.VITE_CF_IMAGES_HASH}/${imgId}/public`}
						/>
						<button
							class="absolute top-1 right-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-700"
							onclick={() => remove(imgId)}
							title="Remove"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
