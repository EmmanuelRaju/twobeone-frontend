<script lang="ts"></script>

<section class="space-y-6">
	<h2 class="text-xl font-semibold">Hobbies & Interests</h2>

	<div>
		<label class="label" for="hobbies">Hobbies</label>
		<select id="hobbies" name="hobbies" multiple size="6" class="select-bordered select w-full">
			{#each ['Reading', 'Music', 'Singing', 'Cooking', 'Traveling', 'Photography', 'Gardening', 'Sports', 'Writing', 'Drawing', 'Dancing', 'Others'] as hobby}
				<option value={hobby}>{hobby}</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="label" for="interests">Interests</label>
		<select id="interests" name="interests" multiple size="6" class="select-bordered select w-full">
			{#each ['Bible Study', 'Volunteering', 'Church Activities', 'Technology', 'Fitness', 'Movies', 'Nature', 'Adventure', 'Social Service', 'Others'] as interest}
				<option value={interest}>{interest}</option>
			{/each}
		</select>
	</div>
</section>
