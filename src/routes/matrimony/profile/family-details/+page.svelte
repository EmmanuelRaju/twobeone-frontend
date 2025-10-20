<script lang="ts"></script>

<section class="space-y-6">
	<h2 class="text-xl font-semibold">Family Details</h2>

	<div>
		<label class="label" for="fatherOccupation">Father’s Occupation</label>
		<input
			id="fatherOccupation"
			name="fatherOccupation"
			type="text"
			class="input-bordered input w-full"
		/>
	</div>

	<div>
		<label class="label" for="motherOccupation">Mother’s Occupation</label>
		<input
			id="motherOccupation"
			name="motherOccupation"
			type="text"
			class="input-bordered input w-full"
		/>
	</div>

	<div>
		<label class="label" for="siblings">Siblings</label>
		<div class="grid grid-cols-2 gap-2">
			<input name="brothers" placeholder="Brothers" type="number" class="input-bordered input" />
			<input name="sisters" placeholder="Sisters" type="number" class="input-bordered input" />
		</div>
	</div>

	<fieldset>
		<legend class="label">Family Type</legend>
		<div class="flex gap-4">
			{#each ['Joint', 'Nuclear', 'Others'] as type}
				<label class="flex items-center gap-2">
					<input type="radio" name="familyType" value={type} class="radio" />
					{type}
				</label>
			{/each}
		</div>
	</fieldset>

	<div>
		<label class="label" for="familyValues">Family Values</label>
		<select id="familyValues" name="familyValues" class="select-bordered select w-full">
			<option value="">Select</option>
			{#each ['Traditional', 'Moderate', 'Liberal'] as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</div>
</section>
