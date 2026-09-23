<script lang="ts">
	import { monthsPerYear } from '$lib/data/taxCalculator/resultPeriods';
	import type { TakeHomeEstimate } from '$lib/data/taxCalculator/takeHomeEstimate';
	import { formatMoney } from '$lib/data/taxCalculator/taxCalculatorFormatting';

	let { estimate }: { estimate: TakeHomeEstimate | null } = $props();

	const announcement = $derived(estimate ? `You keep ${formatMoney(estimate.takeHome / monthsPerYear)} a month` : '');
</script>

<svelte:head>
	<title>Take-home pay and tax calculator — Your Books Today</title>
	<meta
		name="description"
		content="Free UK take-home calculator for employees, sole traders and CIS subcontractors. See what you keep after income tax, National Insurance, student loans and pension — and what to put aside for Self Assessment."
	/>
</svelte:head>

<noscript>
	<p class="mx-4 mt-4 rounded-xl border border-caution/40 p-4 text-sm">This calculator needs JavaScript switched on.</p>
</noscript>
<p class="sr-only" aria-live="polite">{announcement}</p>
