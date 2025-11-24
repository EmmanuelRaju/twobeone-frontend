<script lang="ts">
	import { Country, State, City, type IState, type ICity } from 'country-state-city';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { SLocation } from '$lib/schemas';
	import { FormErrorText } from '$lib/components';
	import { toasts } from '$lib/stores/toast';

	let { data } = $props();

	const { form, errors, enhance, delayed } = superForm(data.form, {
		delayMs: 0,
		multipleSubmits: 'abort',
		validators: zod4(SLocation),
		dataType: 'json',
		resetForm: false,
		onResult: ({ result }) => {
			if (result.type === 'success' && result.data) {
				toasts.addToast({
					message: result.data.message,
					type: 'success'
				});
			} else if (result.type === 'failure' && result.data) {
				toasts.addToast({
					message: result.data.message,
					type: 'error'
				});
			}
		}
	});

	const countries = Country.getAllCountries();

	const states = $derived.by<IState[]>(() => {
		if ($form.country) {
			return State.getStatesOfCountry($form.country);
		}
		return [];
	});
	const cities = $derived.by<ICity[]>(() => {
		if ($form.country && $form.country) {
			return City.getCitiesOfState($form.country, $form.state);
		}
		return [];
	});

	const handleCountryChange = () => {
		if ($form.country) {
			form.update((f) => {
				f.state = '';
				f.city = '';
				return f;
			});
		}
	};

	const handleStateChange = () => {
		if ($form.state && $form.country) {
			form.update((f) => {
				f.city = '';
				return f;
			});
		}
	};

	let disableSubmit = $derived.by(() => {
		if (!$form.country || !$form.state || !$form.city || !$form.citizenship) {
			return true;
		}
		return false;
	});
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Location Details</h1>

	<form method="POST" class="mx-auto flex max-w-md flex-col gap-5" use:enhance>
		<!-- Country -->
		<div>
			<label class="label" for="country">Country living in</label>
			<select
				id="country"
				class="select-bordered select w-full"
				bind:value={$form.country}
				aria-invalid={$errors.country ? 'true' : undefined}
				onchange={handleCountryChange}
			>
				{#each countries as country}
					<option value={country.isoCode}>{country.name}</option>
				{/each}
			</select>
			<FormErrorText>
				{$errors.country}
			</FormErrorText>
		</div>

		<!-- State -->
		{#if states.length > 0}
			<div>
				<label class="label" for="state">Residing state</label>
				<select
					id="state"
					class="select-bordered select w-full"
					bind:value={$form.state}
					aria-invalid={$errors.state ? 'true' : undefined}
					onchange={handleStateChange}
				>
					{#each states as state}
						<option value={state.isoCode}>{state.name}</option>
					{/each}
				</select>
				<FormErrorText>
					{$errors.state}
				</FormErrorText>
			</div>
		{/if}

		<!-- City -->
		{#if cities.length > 0}
			<div>
				<label class="label" for="city">Residing district / city</label>
				<select
					id="city"
					class="select-bordered select w-full"
					bind:value={$form.city}
					aria-invalid={$errors.city ? 'true' : undefined}
				>
					{#each cities as city}
						<option value={city.name}>{city.name}</option>
					{/each}
				</select>
				<FormErrorText>
					{$errors.city}
				</FormErrorText>
			</div>
		{/if}

		<!-- Citizenship -->
		<div>
			<label class="label" for="citizenship">Citizenship</label>
			<select
				id="citizenship"
				class="select-bordered select w-full"
				bind:value={$form.citizenship}
				aria-invalid={$errors.citizenship ? 'true' : undefined}
			>
				{#each countries as country}
					<option value={country.name}>{country.name} Citizen</option>
				{/each}
			</select>
			<FormErrorText>
				{$errors.citizenship}
			</FormErrorText>
		</div>

		<button class="btn mt-2 w-full btn-primary" type="submit" disabled={disableSubmit || $delayed}>
			{#if $delayed}
				<span class="loading loading-md loading-spinner"></span>
			{/if}
			Save
		</button>
	</form>
</main>
