<script lang="ts">
	import FeatureCard from './FeatureCard.svelte';
	import { bookkeepingFeatures } from '$lib/data/bookkeepingFeatures';
</script>

<section class="border-y border-hairline bg-carriage/60">
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="flex flex-col gap-2">
			<p class="font-mono text-sm tracking-widest text-signal uppercase">What it keeps</p>
			<h2 class="font-display text-3xl font-medium">A full set of books, not a spreadsheet</h2>
			<p class="max-w-prose text-chalk/70">
				Every screen here is a view onto one ledger. Raise an invoice and the journal is
				posted; record a payment and it is posted again. There is no second copy of the
				numbers to keep in step.
			</p>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each bookkeepingFeatures as feature (feature.id)}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</section>
