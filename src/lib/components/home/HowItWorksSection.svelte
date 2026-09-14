<script lang="ts">
	import StepCard from './StepCard.svelte';
	import { howItWorksSteps } from '$lib/data/howItWorksSteps';
</script>

<section class="border-y border-hairline bg-carriage/60">
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="flex flex-col gap-2">
			<p class="font-mono text-sm tracking-widest text-signal uppercase">How it works</p>
			<h2 class="font-display text-3xl font-medium">Three things, and then it runs</h2>
			<p class="max-w-prose text-chalk/70">
				Bookkeeping is mostly moving paper from where it arrived to where it belongs. That part
				is not a skill anyone should be spending an evening on.
			</p>
		</div>
		<div class="mt-10 grid gap-8 md:grid-cols-3">
			{#each howItWorksSteps as step (step.id)}
				<StepCard {step} />
			{/each}
		</div>
	</div>
</section>
