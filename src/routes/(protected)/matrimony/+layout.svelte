<script lang="ts">
	import { Navbar } from '$lib/components';
	import { appNavlinks } from '$lib/data/layout/navbar';

	let { children } = $props();
</script>

<Navbar navLinks={appNavlinks} classes="mb-5"></Navbar>
{@render children?.()}
