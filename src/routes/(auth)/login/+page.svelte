<script lang="ts">
	import { FormField } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SEmailLogin } from '$lib/schemas';
	import { emailLoginFormFields } from './data';
	import { toasts } from '$lib/stores/toast';

	let { data } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: zod4(SEmailLogin),

		onResult: ({ result }) => {
			if (result.type == 'redirect' || result.type == 'success') {
				toasts.addToast({ type: 'success', message: 'Successfully logged in!' });
			} else {
				toasts.addToast({
					type: 'error',
					message:
						result.type === 'failure' && result.data ? result.data.message : 'An error occurred.'
				});
			}
		}
	});
</script>

<main class="prose p-2.5">
	<h1 class="text-center">Login</h1>

	<form method="POST" class="mx-auto flex max-w-md min-w-2xs flex-col gap-5" use:enhance>
		{#each emailLoginFormFields as field, i (i)}
			<FormField
				label={field.label}
				name={field.name}
				type={field.type}
				bind:form={$form}
				bind:errors={$errors}
			/>
		{/each}
		<button class="btn mt-2 w-full btn-primary" type="submit">Login</button>

		<a href="/forgot-password" class="btn btn-ghost">Forgot password?</a>

		<a href="/register" class="btn btn-ghost">Don't have an account?</a>
	</form>
</main>
