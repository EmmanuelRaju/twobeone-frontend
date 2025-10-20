<script lang="ts"></script>

<section class="space-y-6">
	<h2 class="text-xl font-semibold">Education & Occupation</h2>

	<div>
		<label class="label" for="educationLevel">Highest Education</label>
		<select id="educationLevel" name="educationLevel" class="select-bordered select w-full">
			<option value="">Select</option>
			{#each ['Doctorate (Ph.D)', 'Post Graduate', 'Graduate', 'Diploma', 'Higher Secondary', 'Secondary', 'Others'] as level}
				<option value={level}>{level}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="label" for="educationField">Field of Study</label>
		<select id="educationField" name="educationField" class="select-bordered select w-full">
			<option value="">Select Field</option>
			{#each ['Engineering', 'Medicine', 'Arts', 'Science', 'Commerce', 'Law', 'Education', 'Theology', 'Management', 'Computer Science', 'Others'] as field}
				<option value={field}>{field}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="label" for="occupation">Occupation</label>
		<select id="occupation" name="occupation" class="select-bordered select w-full">
			<option value="">Select Occupation</option>
			{#each ['Software Professional', 'Teacher', 'Engineer', 'Doctor', 'Nurse', 'Accountant', 'Manager', 'Clergy', 'Missionary', 'Business', 'Self Employed', 'Student', 'Others'] as occ}
				<option value={occ}>{occ}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="label" for="employer">Employer / Organization</label>
		<input id="employer" name="employer" type="text" class="input-bordered input w-full" />
	</div>

	<div>
		<label class="label" for="income">Annual Income (INR)</label>
		<select id="income" name="income" class="select-bordered select w-full">
			<option value="">Select</option>
			{#each ['Below 1 Lakh', '1-2 Lakhs', '2-5 Lakhs', '5-10 Lakhs', '10-20 Lakhs', '20-50 Lakhs', '50 Lakhs - 1 Crore', 'Above 1 Crore'] as range}
				<option value={range}>{range}</option>
			{/each}
		</select>
	</div>
</section>
