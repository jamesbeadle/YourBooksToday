<script lang="ts">
	import type { Snippet } from 'svelte';
	import { calculatorCardClasses } from './taxCalculatorStyles';

	let { stepNumber, heading, children }: { stepNumber: number; heading: string; children: Snippet } =
		$props();

	const headingId = $derived(`calculator-step-${stepNumber}`);
</script>

<section class={calculatorCardClasses} aria-labelledby={headingId}>
	<h2 id={headingId} class="flex items-baseline gap-3 font-display text-xl font-medium">
		<span class="font-mono text-sm text-signal">0{stepNumber}</span>
		{heading}
	</h2>
	{@render children()}
</section>
