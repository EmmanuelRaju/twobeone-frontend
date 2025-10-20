<script lang="ts"></script>

<!-- Basic Information Form -->
<section class="prose space-y-6">
	<h2 class="text-xl font-semibold">Basic Information</h2>

	<!-- Profile Created By -->
	<div>
		<label class="label" for="createdBy">Profile Created By</label>
		<select id="createdBy" name="createdBy" class="select-bordered select w-full">
			<option value="">Select</option>
			<option>Self</option>
			<option>Parents</option>
			<option>Sibling</option>
			<option>Relative</option>
			<option>Friend</option>
		</select>
	</div>

	<!-- Name -->
	<div>
		<label class="label" for="name">Full Name</label>
		<input id="name" name="name" type="text" class="input-bordered input w-full" />
	</div>

	<!-- Date of Birth -->
	<div>
		<label class="label" for="dob">Date of Birth</label>
		<div class="grid grid-cols-3 gap-2">
			<select name="dob_day" class="select-bordered select">
				<option value="">DD</option>
				{#each Array.from({ length: 31 }, (_, i) => i + 1) as day}
					<option value={day}>{day}</option>
				{/each}
			</select>

			<select name="dob_month" class="select-bordered select">
				<option value="">MM</option>
				{#each ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as month}
					<option value={month}>{month}</option>
				{/each}
			</select>

			<select name="dob_year" class="select-bordered select">
				<option value="">YYYY</option>
				{#each Array.from({ length: 80 }, (_, i) => 2025 - i) as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Marital Status -->
	<fieldset>
		<legend class="label">Marital Status</legend>
		<div class="flex flex-wrap gap-4">
			{#each ['Unmarried', 'Widow/Widower', 'Divorced', 'Separated'] as status}
				<label class="flex items-center gap-2">
					<input type="radio" name="maritalStatus" value={status} class="radio" />
					{status}
				</label>
			{/each}
		</div>
	</fieldset>

	<!-- Height -->
	<div>
		<label class="label" for="height">Height</label>
		<div class="flex gap-2">
			<select name="height_feet" class="select-bordered select w-1/2">
				<option value="">Feet</option>
				{#each Array.from({ length: 4 }, (_, i) => i + 4) as ft}
					<option value={ft}>{ft}</option>
				{/each}
			</select>
			<select name="height_inches" class="select-bordered select w-1/2">
				<option value="">Inches</option>
				{#each Array.from({ length: 12 }, (_, i) => i) as inch}
					<option value={inch}>{inch}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Weight -->
	<div>
		<label class="label" for="weight">Weight (kg)</label>
		<input
			id="weight"
			name="weight"
			type="number"
			min="30"
			max="200"
			class="input-bordered input w-full"
		/>
	</div>

	<!-- Physical Status -->
	<fieldset>
		<legend class="label">Physical Status</legend>
		<div class="flex gap-4">
			<label class="flex items-center gap-2">
				<input type="radio" name="physicalStatus" value="Normal" class="radio" /> Normal
			</label>
			<label class="flex items-center gap-2">
				<input type="radio" name="physicalStatus" value="Physically Challenged" class="radio" /> Physically
				Challenged
			</label>
		</div>
	</fieldset>

	<!-- Denomination -->
	<div>
		<label class="label" for="denomination">Denomination</label>
		<select id="denomination" name="denomination" class="select-bordered select w-full">
			<option value="">Select Denomination</option>
			{#each ['Roman Catholic', 'Syro Malabar', 'Syro Malankara', 'CSI', 'CNI', 'Pentecostal', 'Baptist', 'Orthodox', 'Marthoma', 'Evangelical', 'Independent', 'Lutheran', 'Seventh Day Adventist', 'Others'] as denom}
				<option value={denom}>{denom}</option>
			{/each}
		</select>
	</div>

	<!-- Division -->
	<div>
		<label class="label" for="division">Division</label>
		<select id="division" name="division" class="select-bordered select w-full">
			<option value="">Select Division</option>
			{#each ['Latin', 'Syrian', 'Malayalam', 'Tamil', 'Telugu', 'Konkani', 'Goan', 'Mangalorean', 'Nadar', 'Nair', 'Reddy', 'Vellalar', 'Others'] as division}
				<option value={division}>{division}</option>
			{/each}
		</select>
	</div>

	<!-- Subcaste -->
	<div>
		<label class="label" for="subcaste">Subcaste</label>
		<input id="subcaste" name="subcaste" type="text" class="input-bordered input w-full" />
	</div>

	<!-- Mother Tongue -->
	<div>
		<label class="label" for="motherTongue">Mother Tongue</label>
		<select id="motherTongue" name="motherTongue" class="select-bordered select w-full">
			<option value="">Select Language</option>
			{#each ['Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Hindi', 'English', 'Konkani', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali', 'Odia', 'Assamese', 'Tulu', 'Others'] as lang}
				<option value={lang}>{lang}</option>
			{/each}
		</select>
	</div>

	<!-- Languages Known -->
	<div>
		<label class="label" for="languagesKnown">Languages Known</label>
		<select
			id="languagesKnown"
			name="languagesKnown"
			class="select-bordered select w-full"
			multiple
			size="5"
		>
			{#each ['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali', 'Konkani', 'Odia', 'Assamese', 'Tulu', 'Urdu'] as lang}
				<option value={lang}>{lang}</option>
			{/each}
		</select>
	</div>

	<!-- Habits -->
	<fieldset>
		<legend class="label">Eating / Smoking / Drinking Habits</legend>
		<div class="grid grid-cols-3 gap-3">
			<div>
				<span class="font-medium">Eating</span>
				{#each ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Occasionally Non-Vegetarian'] as habit}
					<label class="flex items-center gap-2">
						<input type="radio" name="eatingHabit" value={habit} class="radio" />
						{habit}
					</label>
				{/each}
			</div>
			<div>
				<span class="font-medium">Smoking</span>
				{#each ['No', 'Occasionally', 'Yes'] as option}
					<label class="flex items-center gap-2">
						<input type="radio" name="smokingHabit" value={option} class="radio" />
						{option}
					</label>
				{/each}
			</div>
			<div>
				<span class="font-medium">Drinking</span>
				{#each ['No', 'Occasionally', 'Yes'] as option}
					<label class="flex items-center gap-2">
						<input type="radio" name="drinkingHabit" value={option} class="radio" />
						{option}
					</label>
				{/each}
			</div>
		</div>
	</fieldset>

	<!-- About Me -->
	<div>
		<label class="label" for="about">About Me</label>
		<textarea id="about" name="about" rows="5" class="textarea-bordered textarea w-full"></textarea>
	</div>
</section>
