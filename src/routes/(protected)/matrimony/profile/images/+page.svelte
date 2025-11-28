<script lang="ts">
	import { ImageUploader } from '$lib/components';
</script>

<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">Manage images</h1>
	<div class="flex flex-col gap-5">
		<div class="flex flex-col items-center justify-center gap-5">
			<h2 class="!m-0 text-center">Main</h2>
			<ImageUploader></ImageUploader>
		</div>
		<div class="flex flex-col items-center justify-center gap-5">
			<h2 class="!m-0 text-center">Gallery</h2>
			<ImageUploader max={3}></ImageUploader>
		</div>
	</div>
</main>
