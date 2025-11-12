<script lang="ts">
	let { title, label, href }: { title: string; label: string; href: string } = $props();
</script>

<a
	class="col-span-full flex w-full flex-col gap-5 rounded-box bg-base-200 p-5 no-underline shadow-md transition duration-200 hover:shadow-lg sm:col-span-1"
	{href}
>
	<h4 class="text-center leading-none">{title}</h4>
	<button class="btn btn-primary">{label}</button>
</a>
