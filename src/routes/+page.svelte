<main class="container-width mx-auto prose p-5">
	<h1 class="text-center">TWOBEONE</h1>

	<section id="hero">
		<h2>No more</h2>
		<ul>
			<li>Paying huge subscription fees</li>
			<li>Doubts about profile authenticity</li>
			<li>Limits on viewing profiles</li>
		</ul>
	</section>

	<section id="problem-statement">
		<h3>Been there, done that</h3>
		<div class="text-justify">
			<p>
				We’ve seen how tedious, frustrating, and costly finding a spouse can be. The toll it takes
				on everyone involved — candidates, parents, and loved ones — is hard to describe.
			</p>
			<p>
				Though we know and acknowledge that life-altering decisions like these take time, and it's
				God's will that has to be realised in lives, that feeling of helplessness and loneliness
				cannot be shrugged away.
			</p>
			<p>
				Let us be clear, we don’t want to play God! We just want to be of service to his creation in
				every which way we can, starting with this matchmaking issue…
			</p>
		</div>
	</section>

	<section id="hero-animation" class="text-center italic">
		<blockquote class="text-2xl font-semibold text-primary">
			“...And the <strong>TWO</strong> shall <strong>BE</strong>come <strong>ONE</strong>...”
		</blockquote>
		<cite class="mt-2 block text-sm text-neutral">Genesis 2:24</cite>
	</section>

	<section id="assurance">
		<h3>Help us help you</h3>
		<div class="text-justify">
			<p>
				God willing, if you give us a chance, we would love to be your sojourner. Not just in
				finding a match, but to assist you in building a godly family.
			</p>
			<p>
				We have a clear vision: to bring Christ back to the center of relationships and marriage.
				This isn’t just another matrimony service — it’s a ministry.
			</p>
		</div>
	</section>

	{#snippet callToActionCard(/** @type {{ title: any; btn: any; }} */ props)}
		<div
			class="col-span-full flex w-full flex-col gap-5 rounded-box bg-base-200 p-5 shadow-md transition duration-200 hover:shadow-lg sm:col-span-1"
		>
			<h4 class="text-center leading-none">{props.title}</h4>
			<button class="btn btn-primary">{props.btn.label}</button>
		</div>
	{/snippet}

	<section id="call-to-action">
		<h3>Let us begin</h3>
		<div class="grid grid-cols-3 gap-5">
			{@render callToActionCard({
				title: 'Looking for a match?',
				btn: { label: 'Create your profile' }
			})}
			{@render callToActionCard({
				title: 'Know someone who is?',
				btn: { label: 'Refer a friend in need' }
			})}
			{@render callToActionCard({
				title: 'Want to do things right?',
				btn: { label: 'Explore godly guidance' }
			})}
		</div>
	</section>
</main>
