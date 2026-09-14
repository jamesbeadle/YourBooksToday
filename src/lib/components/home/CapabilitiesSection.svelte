<script lang="ts">
	import CapabilityCard from './CapabilityCard.svelte';
	import { platformCapabilities } from '$lib/data/platformCapabilities';
</script>

<section class="mx-auto max-w-6xl px-6 py-16">
	<div class="flex flex-col gap-2">
		<p class="font-mono text-sm tracking-widest text-signal uppercase">One platform</p>
		<h2 class="font-display text-3xl font-medium">Not a ledger and four subscriptions</h2>
		<p class="max-w-prose text-chalk/70">
			Most businesses run their books on an accounting package, a receipt capture tool, a
			reconciliation add-on and a spreadsheet holding the bits none of them cover — each syncing
			to the others overnight, each with its own idea of the truth. All of this is one platform,
			over one ledger. Here is where it has got to.
		</p>
	</div>
	<div class="mt-10 grid gap-6 md:grid-cols-2">
		{#each platformCapabilities as capability (capability.id)}
			<CapabilityCard {capability} />
		{/each}
	</div>
</section>
