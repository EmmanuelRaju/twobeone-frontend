<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SContact } from '$lib/schemas';
	import { contactFormFields } from './data';

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4(SContact),
		dataType: 'json'
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
		<button class="btn mt-2 w-full btn-primary" type="submit">Save</button>
	</form>
</main>
