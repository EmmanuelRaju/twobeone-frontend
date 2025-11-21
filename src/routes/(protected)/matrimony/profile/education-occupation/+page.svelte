<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SEducationOccupation } from '$lib/schemas';
	import { educationOccupationFormFields } from './data';
	import { toasts } from '$lib/stores/toast';
	import { showField } from '$lib/utils/show-field';
	import { educationOccupationRules } from '$lib/rules/matrimony/education-occupation';

	let { data } = $props();

	const { form, errors, enhance, delayed } = superForm(data.form, {
		delayMs: 0,
		multipleSubmits: 'abort',
		validators: zod4(SEducationOccupation),
		dataType: 'json',
		resetForm: false,
		onResult: ({ result }) => {
			if (result.type === 'success' && result.data) {
				toasts.addToast({
					message: result.data.message,
					type: 'success'
				});
			} else if (result.type === 'failure' && result.data && result.data.message) {
				toasts.addToast({
					message: result.data.message,
					type: 'error'
				});
			}
		}
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Education & Occupation</h1>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		{#each educationOccupationFormFields as field}
			{#if showField(educationOccupationRules[field.name], $form)}
				<FormField
					label={field.label}
					name={field.name}
					type={field.type}
					options={field.options}
					mode={field.mode}
					bind:form={$form}
					bind:errors={$errors}
				/>
			{/if}
		{/each}
		<button class="btn mt-2 w-full btn-primary" type="submit" disabled={$delayed}>
			{#if $delayed}
				<span class="loading loading-md loading-spinner"></span>
			{/if}
			Save
		</button>
	</form>
</main>
