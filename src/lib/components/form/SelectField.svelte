<script lang="ts">
	import Select from 'svelte-select';
	import { FormErrorText } from '$lib/components';
	import { browser } from '$app/environment';

	let {
		label,
		name,
		options = [],
		form = $bindable(),
		errors = $bindable(),
		multiple = false,
		placeholder,
		disabled = $bindable(false)
	} = $props();

	// Format options for svelte-select
	const formatOptions = (options: string[]) => {
		return options.map((option) => ({
			value: option,
			label: option
		}));
	};

	const handleMultiSelect = (selectedItems: Array<{ value: string }>) => {
		form[name] = selectedItems ? selectedItems.map((item) => item.value) : [];
	};

	const handleClear = (clearedItems: { value: string } | Array<{ value: string }>) => {
		Array.isArray(clearedItems)
			? (form[name] = [])
			: (form[name] = form[name].filter((it: string) => it !== clearedItems.value));
	};

	$effect(() => {
		if (multiple && !form[name]) {
			form[name] = [];
		}
	});
</script>

<div>
	<label class="label" for={name}>{label}</label>
	<div class="relative">
		{#if multiple}
			{#if browser}
				<Select
					{name}
					items={formatOptions(options)}
					value={Array.isArray(form[name])
						? form[name].map((val) => ({ value: val, label: val }))
						: undefined}
					on:change={({ detail }) => handleMultiSelect(detail)}
					on:clear={({ detail }) => handleClear(detail)}
					multiple
					clearable
					searchable
					{placeholder}
					{disabled}
				/>
			{/if}
		{:else}
			<select
				{name}
				class="select-bordered select w-full"
				bind:value={form[name]}
				aria-invalid={errors[name] ? 'true' : undefined}
				{disabled}
			>
				<!-- <option value="">{placeholder || `Select ${label}`}</option> -->
				{#each options as option}
					{#if typeof option === 'string'}
						<option value={option}>{option}</option>
					{:else}
						<optgroup label={option.groupName}>
							{#each option.children as item, i (i)}
								<option value={item}>{item}</option>
							{/each}
						</optgroup>
					{/if}
				{/each}
			</select>
		{/if}
	</div>
	<FormErrorText>
		{errors[name]}
	</FormErrorText>
</div>
