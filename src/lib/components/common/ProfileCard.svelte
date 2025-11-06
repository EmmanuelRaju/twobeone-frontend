<script lang="ts">
	import { SocialIconButton, ProfileActions } from '$lib/components';
</script>

<div
	class="grid w-full grid-cols-12 overflow-clip rounded-box shadow-lg outline outline-neutral-200"
>
	<!-- Image -->
	<div
		class="col-span-full h-full max-h-[400px] w-full overflow-clip sm:col-span-4 sm:max-h-[300px]"
	>
		<img
			src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
			alt="Album"
			class="h-full w-full object-cover"
		/>
	</div>

	<!-- Details -->
	<div class="col-span-full flex h-full flex-col gap-5 p-5 sm:col-span-8">
		<!-- Bio -->
		<div>
			<h3>Name</h3>
			<div class="flex justify-between">
				<p>ID</p>
				<p class="text-right">Last seen</p>
			</div>
			<div class="flex flex-wrap gap-2.5">
				<p>age</p>
				<p>height</p>
				<p>weight</p>
				<p>single</p>
				<p>degree</p>
				<p>role</p>
				<p>salary</p>
				<p>place</p>
			</div>
		</div>

		<!-- Contact -->
		<div class="flex flex-wrap gap-2.5 text-accent">
			<SocialIconButton href="/" kind="facebook"></SocialIconButton>
			<SocialIconButton href="/" kind="linkedin"></SocialIconButton>
			<SocialIconButton href="/" kind="instagram"></SocialIconButton>
			<SocialIconButton href="/" kind="whatsapp"></SocialIconButton>
			<SocialIconButton href="/" kind="email"></SocialIconButton>
		</div>

		<!-- Actions -->
		<div class="mt-auto mb-2.5 flex flex-wrap justify-end gap-2.5 sm:mb-0">
			<ProfileActions mode=""></ProfileActions>
		</div>
	</div>
</div>
