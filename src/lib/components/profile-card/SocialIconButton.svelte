<script lang="ts">
	import {
		Facebook,
		Globe,
		Instagram,
		Linkedin,
		Mail,
		MessageCircle,
		Twitter,
		Youtube
	} from '@lucide/svelte';

	let { href, kind }: { href: string; kind: string } = $props();
</script>

<a
	{href}
	class="flex size-10 items-center justify-center rounded-box border transition-colors duration-200 hover:bg-accent hover:text-accent-content"
>
	{#if kind == 'facebook'}
		<Facebook></Facebook>
	{:else if kind == 'linkedin'}
		<Linkedin></Linkedin>
	{:else if kind == 'instagram'}
		<Instagram></Instagram>
	{:else if kind == 'website'}
		<Globe></Globe>
	{:else if kind == 'twitter'}
		<Twitter></Twitter>
	{:else if kind == 'youtube'}
		<Youtube></Youtube>
	{:else if kind == 'whatsapp'}
		<MessageCircle></MessageCircle>
	{:else if kind == 'email'}
		<Mail></Mail>
	{/if}
</a>
