<script lang="ts">
	import { scaleFor } from '$lib/data/taxCalculator/breakdownRow';
	import { incomeTaxBandRows } from '$lib/data/taxCalculator/incomeTaxBandRows';
	import { resultPeriodOption, type ResultPeriod } from '$lib/data/taxCalculator/resultPeriods';
	import type { TakeHomeEstimate } from '$lib/data/taxCalculator/takeHomeEstimate';
	import { takeHomeBreakdown } from '$lib/data/taxCalculator/takeHomeBreakdown';
	import BreakdownTable from './BreakdownTable.svelte';
	import DisclosureMarker from './DisclosureMarker.svelte';
	import { disclosureSummaryClasses, widgetCardClasses } from './calculatorStyles';

	let { estimate, period }: { estimate: TakeHomeEstimate; period: ResultPeriod } = $props();

	const periodOption = $derived(resultPeriodOption(period));
	const scale = $derived(scaleFor(periodOption.periodsPerYear));
	const periodAdjective = $derived(period === 'yearly' ? 'annual' : period);
</script>

<article class={widgetCardClasses}>
	<div class="flex items-center justify-between gap-3">
		<h3 class="font-display text-xl font-medium">Your {periodAdjective} breakdown</h3>
		<span class="rounded-md border border-hairline px-2 py-1 font-mono text-xs text-chalk/60">{estimate.rules.taxYear}</span>
	</div>
	<BreakdownTable rows={takeHomeBreakdown(estimate, scale)} label={`Your ${periodAdjective} breakdown`} />
	<details class="group border-t border-hairline pt-4 text-sm">
		<summary class={disclosureSummaryClasses}>Show income tax bands <DisclosureMarker /></summary>
		<div class="mt-3">
			<BreakdownTable rows={incomeTaxBandRows(estimate, scale)} label="Income tax by band" />
		</div>
	</details>
</article>
