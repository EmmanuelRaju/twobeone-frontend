<script lang="ts"></script>

<section class="space-y-6">
	<h2 class="text-xl font-semibold">Partner Preferences</h2>

	<div>
		<label class="label" for="preferredAge">Preferred Age Range</label>
		<div class="flex gap-2">
			<select name="ageMin" class="select-bordered select w-1/2">
				{#each Array.from({ length: 20 }, (_, i) => 20 + i) as age}
					<option value={age}>{age}</option>
				{/each}
			</select>
			<select name="ageMax" class="select-bordered select w-1/2">
				{#each Array.from({ length: 20 }, (_, i) => 25 + i) as age}
					<option value={age}>{age}</option>
				{/each}
			</select>
		</div>
	</div>

	<div>
		<label class="label" for="preferredDenomination">Denomination</label>
		<select
			id="preferredDenomination"
			name="preferredDenomination"
			multiple
			size="5"
			class="select-bordered select w-full"
		>
			{#each ['Roman Catholic', 'Syro Malabar', 'CSI', 'Pentecostal', 'Baptist', 'Orthodox', 'Marthoma', 'Evangelical', 'Independent', 'Lutheran', 'Others'] as denom}
				<option value={denom}>{denom}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="label" for="preferredEducation">Education</label>
		<select
			id="preferredEducation"
			name="preferredEducation"
			multiple
			size="5"
			class="select-bordered select w-full"
		>
			{#each ['Doctorate', 'Post Graduate', 'Graduate', 'Diploma', 'Higher Secondary'] as edu}
				<option value={edu}>{edu}</option>
			{/each}
		</select>
	</div>

	<fieldset>
		<legend class="label">Marital Status Preference</legend>
		<div class="flex gap-4">
			{#each ['Unmarried', 'Widow/Widower', 'Divorced', 'Separated'] as status}
				<label class="flex items-center gap-2">
					<input type="checkbox" name="preferredMaritalStatus" value={status} class="checkbox" />
					{status}
				</label>
			{/each}
		</div>
	</fieldset>

	<div>
		<label class="label" for="preferredLocation">Preferred Location</label>
		<input
			id="preferredLocation"
			name="preferredLocation"
			type="text"
			placeholder="City / State / Country"
			class="input-bordered input w-full"
		/>
	</div>
</section>
