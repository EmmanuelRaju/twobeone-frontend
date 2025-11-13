<script lang="ts">
	import { introCards } from './data';
</script>

<main class="container-width mx-auto prose p-5">
	{@render introCard(introCards['create'])}
	<!-- {@render introCard(introCards['complete'])}
	{@render introCard(introCards['verifying'])}
	{@render introCard(introCards['paymentPending'])}
	{@render introCard(introCards['expired'])} -->
</main>

{#snippet introCard(props: {
	id: string;
	title: string;
	desc: string[];
	actions?: {
		label: string;
		href: string;
		secondary?: boolean;
	}[];
})}
	<div class="card bg-base-200 card-border">
		<div class="card-body">
			<h2 class="!m-0 card-title">{props.title}</h2>
			{#each props.desc as item, i (i)}
				<p class="!m-0">
					{item}
				</p>
			{/each}

			<div class="card-actions justify-end">
				{#each props.actions as action, i (i)}
					<a class="btn {action.secondary ? 'btn-ghost' : 'btn-primary'}" href={action.href}
						>{action.label}</a
					>
				{/each}
			</div>
		</div>
	</div>
{/snippet}
