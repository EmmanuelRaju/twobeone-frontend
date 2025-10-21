<script lang="ts">
	import { FormErrorText, SelectField } from '$lib/components';
	import { Eye, EyeOff } from '@lucide/svelte';

	let {
		label,
		name,
		type,
		form = $bindable(),
		errors = $bindable(),
		options = [],
		mode = 'single',
		rows = 5,
		placeholder = ''
	} = $props();

	let _type = $state(type);

	const toggleVisibility = () => {
		if (_type === 'password') {
			_type = 'text';
		} else {
			_type = 'password';
		}
	};
</script>

{#if type === 'select'}
	<SelectField
		{label}
		{name}
		{options}
		{placeholder}
		multiple={mode === 'multi'}
		bind:form
		bind:errors
	/>
{:else if type === 'textarea'}
	<div>
		<label class="label" for={name}>{label}</label>
		<textarea
			{name}
			{rows}
			class="textarea-bordered textarea w-full"
			bind:value={form[name]}
			aria-invalid={errors[name] ? 'true' : undefined}
		></textarea>
		<FormErrorText>
			{errors[name]}
		</FormErrorText>
	</div>
{:else}
	<div>
		<label class="label" for={name}>{label}</label>
		<div class="relative">
			<input
				{name}
				type={_type}
				class="input-bordered input w-full"
				class:pr-10={type === 'password'}
				bind:value={form[name]}
				aria-invalid={errors[name] ? 'true' : undefined}
			/>
			{#if type === 'password'}
				<button
					type="button"
					class="absolute top-2 right-2 z-[1]"
					onclick={(e) => {
						e.preventDefault();
						toggleVisibility();
					}}
				>
					{#if _type === 'password'}
						<Eye opacity="20%"></Eye>
					{:else}
						<EyeOff opacity="20%"></EyeOff>
					{/if}
				</button>
			{/if}
		</div>
		<FormErrorText>
			{errors[name]}
		</FormErrorText>
	</div>
{/if}
