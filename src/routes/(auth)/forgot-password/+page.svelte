<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SForgotPassword } from '$lib/schemas';
	import { forgotPasswordFormFields } from './data';

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4(SForgotPassword)
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Forgot password</h1>

	<p class="mx-auto max-w-md text-center">
		Please enter your registered email to receive further instructions
	</p>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		{#each forgotPasswordFormFields as field, i (i)}
			<FormField
				label={field.label}
				name={field.name}
				type={field.type}
				bind:form={$form}
				bind:errors={$errors}
			/>
		{/each}
		<button class="btn mt-2 w-full btn-primary" type="submit">Send</button>
	</form>
</main>
