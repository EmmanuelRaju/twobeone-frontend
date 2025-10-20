<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { commonRegistrationSchema } from '$lib/schemas';
	import { commonRegistrationFormFields } from './data';

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4(commonRegistrationSchema)
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Create your account</h1>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		{#each commonRegistrationFormFields as field, i (i)}
			<FormField
				label={field.label}
				name={field.name}
				type={field.type}
				bind:form={$form}
				bind:errors={$errors}
			/>
		{/each}
		<button class="btn mt-2 w-full btn-primary" type="submit">Register</button>
	</form>
</main>
