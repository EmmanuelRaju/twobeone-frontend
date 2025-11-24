<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SContact } from '$lib/schemas';
	import { contactFormFields } from './data';
	import { toasts } from '$lib/stores/toast';

	let { data } = $props();

	const { form, errors, enhance, delayed } = superForm(data.form, {
		delayMs: 0,
		multipleSubmits: 'abort',
		validators: zod4(SContact),
		dataType: 'json',
		resetForm: false,
		onResult: ({ result }) => {
			if (result.type === 'success' && result.data) {
				toasts.addToast({
					message: result.data.message,
					type: 'success'
				});
			} else if (result.type === 'failure' && result.data) {
				toasts.addToast({
					message: result.data.message,
					type: 'error'
				});
			}
		}
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Contact Details</h1>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		{#each contactFormFields as field}
			<FormField
				label={field.label}
				name={field.name}
				type={field.type}
				bind:form={$form}
				bind:errors={$errors}
			/>
		{/each}
		<button class="btn mt-2 w-full btn-primary" type="submit" disabled={$delayed}>
			{#if $delayed}
				<span class="loading loading-md loading-spinner"></span>
			{/if}
			Save
		</button>
	</form>
</main>
