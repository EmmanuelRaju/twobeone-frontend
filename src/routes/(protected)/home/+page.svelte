<script lang="ts">
	import { Navbar } from '$lib/components';
	import { appNavlinks } from '$lib/data/layout/navbar';

	let { data } = $props();

	let navItems = [
		{
			title: 'Matrimony profile',
			href: '/matrimony/home'
		},
		{
			title: 'Affiliates',
			href: '/coming-soon'
		},
		{
			title: 'Courses',
			href: '/coming-soon'
		}
	];
</script>

<Navbar navLinks={appNavlinks}></Navbar>

<div class="grid h-[calc(100vh-60px)] place-content-center">
	<main class="container-width mx-auto prose p-5 text-center">
		<h1>Hi <span class="capitalize">{data.user?.name || 'there!'}</span></h1>
		<h2>What do you want to manage?</h2>

		<div class="grid grid-cols-3 gap-5">
			{#each navItems as item, i (i)}
				{@render dashboardCard(item)}
			{/each}
		</div>

		{#snippet dashboardCard({ href, title }: { href: string; title: string })}
			<a
				class="col-span-full flex h-30 w-full items-center justify-center gap-5 rounded-box bg-primary p-5 text-center text-xl text-primary-content no-underline shadow-md transition duration-200 hover:shadow-lg sm:col-span-1"
				{href}
			>
				{title}
			</a>
		{/snippet}
	</main>
</div>
