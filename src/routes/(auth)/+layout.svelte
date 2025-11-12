<script lang="ts">
	import { Navbar } from '$lib/components';
	let { children } = $props();
</script>

<Navbar navLinks={[]}></Navbar>

<div class="grid h-[calc(100vh-60px)] place-content-center">
	{@render children?.()}
</div>
