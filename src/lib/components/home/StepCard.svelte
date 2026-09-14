<script lang="ts">
	import type { HowItWorksStep } from '$lib/data/howItWorksSteps';

	let { step }: { step: HowItWorksStep } = $props();
</script>

<article class="flex flex-col gap-3">
	<p class="font-mono text-sm tracking-widest text-signal">{step.number}</p>
	<h3 class="font-display text-lg font-medium">{step.name}</h3>
	<p class="text-sm text-chalk/70">{step.description}</p>
</article>
