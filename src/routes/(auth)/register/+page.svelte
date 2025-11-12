<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SCommonRegistration } from '$lib/schemas';
	import { commonRegistrationFormFields } from './data';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4(SCommonRegistration)
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Create your account</h1>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		<!-- <form
		method="POST"
		class="mx-auto flex max-w-md flex-col gap-5"
		use:enhance={{
			onResult: ({ result }) => {
				if (result.type == 'success') {
					setTimeout(() => goto('/matrimony/home'));
					console.log('here');
				}
			}
		}}
	> -->
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
