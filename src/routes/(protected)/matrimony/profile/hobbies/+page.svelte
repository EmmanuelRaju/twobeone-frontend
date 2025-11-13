<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SInterests } from '$lib/schemas';
	import { interestsFormFields } from './data';

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4(SInterests),
		dataType: 'json'
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Hobbies & Interests</h1>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		{#each interestsFormFields as field}
			<FormField
				label={field.label}
				name={field.name}
				type={field.type}
				options={field.options}
				mode={field.mode}
				bind:form={$form}
				bind:errors={$errors}
			/>
		{/each}
		<button class="btn mt-2 w-full btn-primary" type="submit">Save</button>
	</form>
</main>
