<script lang="ts">
	import { FormErrorText } from '$lib/components';
	import { Eye, EyeOff } from '@lucide/svelte';

	let { label, name, type, form = $bindable(), errors = $bindable() } = $props();

	let _type = $state(type);

	const toggleVisibility = () => {
		if (_type === 'password') {
			_type = 'text';
		} else {
			_type = 'password';
		}
	};
</script>

<div>
	<label class="label" for={name}>{label}</label>
	<div class="relative">
		<input
			id={name}
			type={_type}
			{name}
			aria-invalid={errors[name] ? 'true' : undefined}
			class="input-bordered input w-full pr-10"
			bind:value={form[name]}
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
