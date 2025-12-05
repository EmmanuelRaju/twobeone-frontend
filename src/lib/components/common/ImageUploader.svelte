<script lang="ts">
	import { toasts } from '$lib/stores/toast';
	import type { SupabaseClient } from '@supabase/supabase-js';

	let {
		value = $bindable([]),
		max = 1,
		userId,
		supabase,
		onUpload,
		onRemove
	} = $props<{
		value?: string[];
		max?: number;
		userId: string;
		supabase: SupabaseClient;
		onUpload?: (url: string) => void;
		onRemove?: (url: string) => void;
	}>();

	let uploading = $state(false);
	let pendingPreviews = $state<Array<{ file: File; preview: string }>>([]);

	async function uploadFile(file: File) {
		uploading = true;

		try {
			if (!userId) throw new Error('User not found');

			const fileExt = file.name.split('.').pop();
			const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error: uploadError } = await supabase.storage
				.from('profile-images')
				.upload(filePath, file);

			if (uploadError) throw uploadError;

			const { data: { publicUrl } } = supabase.storage
				.from('profile-images')
				.getPublicUrl(filePath);

			value = [...value, publicUrl];
			onUpload?.(publicUrl);
			toasts.addToast({ type: 'success', message: 'Image uploaded successfully' });

		} catch (error) {
			console.error('Error while uploading image', error);
			toasts.addToast({ type: 'error', message: 'Error while uploading image, try again later' });
		} finally {
			uploading = false;
		}
	}

	async function remove(imageUrl: string) {
		try {
			// We delegate the actual deletion (storage + db) to the parent via onRemove
			// But we update local state immediately for optimistic UI
			value = value.filter((url: string) => url !== imageUrl);
			onRemove?.(imageUrl);
		} catch (error) {
			console.error('Error in remove function', error);
			toasts.addToast({ type: 'error', message: 'Error removing image' });
		}
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
		} catch (error) {
			console.error('Error while approving image upload', error);
		}
	}

	function rejectPreview(index: number) {
		pendingPreviews = pendingPreviews.filter((_, i) => i !== index);
	}

	let totalImages = $derived(value.length + pendingPreviews.length);
	let canAddMore = $derived(totalImages < max);
</script>

<div class="grid h-full w-full grid-cols-12 gap-2.5">
	{#each value as imageUrl}
		<div
			class="relative col-span-full flex flex-col gap-2.5 overflow-clip rounded-box border border-gray-300 bg-base-200 sm:col-span-6 lg:col-span-4"
		>
			<img
				class="w-full object-contain"
				alt="uploaded"
				src={imageUrl}
			/>
			<div class="flex items-center justify-center gap-2.5 pb-5">
				<button class="btn" onclick={() => remove(imageUrl)}> Remove </button>
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
