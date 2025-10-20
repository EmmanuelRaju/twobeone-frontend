<script lang="ts">
	let { children } = $props();
</script>

{#if children}
	<small class="text-error">{@render children()}</small>
{/if}
