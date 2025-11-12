<script lang="ts">
	import { toasts, type TToast } from '$lib/stores/toast';
	import { LucideX } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let toastList: TToast[] = [];
	const unsubscribe = toasts.subscribe((val) => (toastList = val));
</script>

<div class="toast toast-center w-80 space-y-3 sm:toast-end">
	{#each toastList as toast (toast.id)}
		<div
			in:fade={{ duration: 150 }}
			out:fade={{ duration: 150 }}
			class={`alert flex items-start justify-between alert-soft shadow-md ${
				toast.type === 'success'
					? 'alert-success'
					: toast.type === 'error'
						? 'alert-error'
						: toast.type === 'warning'
							? 'alert-warning'
							: 'alert-info'
			}`}
		>
			<span class="pr-2">{toast.message}</span>
			<button
				on:click={() => toasts.removeToast(toast.id)}
				class="flex size-5 cursor-pointer items-center"
			>
				<LucideX></LucideX>
			</button>
		</div>
	{/each}
</div>

<style>
	.alert {
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
	}
</style>
