<script lang="ts">
	import type { MakingTaxDigitalPosition } from '$lib/data/taxCalculator/makingTaxDigitalPosition';
	import { earliestMakingTaxDigitalRules } from '$lib/data/taxCalculator/sharedRules';
	import { formatLongDate } from '$lib/data/taxCalculator/taxDates';
	import type { TaxYearName } from '$lib/data/taxCalculator/taxYearRules';
	import { formatWholePounds } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import InfoPanel from './InfoPanel.svelte';
	import QuarterlyDeadlines from './QuarterlyDeadlines.svelte';

	let { position, taxYear }: { position: MakingTaxDigitalPosition; taxYear: TaxYearName } = $props();

	const threshold = $derived(formatWholePounds(position.qualifyingIncomeThreshold));
	const earliest = earliestMakingTaxDigitalRules;
</script>

<InfoPanel heading="Making Tax Digital for Income Tax" tone={position.isBroughtInByThisIncome ? 'caution' : 'neutral'}>
	{#if position.isBroughtInByThisIncome}
		<p>
			Income over {threshold} in {taxYear} brings you into Making Tax Digital from
			<strong class="text-chalk">{formatLongDate(position.appliesFrom)}</strong>. From then you keep
			digital records in compatible software and send HMRC a short update every quarter.
		</p>
	{:else}
		<p>
			At this income, {taxYear} on its own doesn’t bring you into Making Tax Digital — that takes
			more than {threshold}.
		</p>
	{/if}
	<p class="text-sm">
		HMRC looks at your gross income from self-employment and property (before expenses) on each
		year’s tax return. If yours was over {formatWholePounds(earliest.qualifyingIncomeThreshold)} in
		{earliest.measuredOnTaxYear}, it has applied since {formatLongDate(earliest.appliesFrom)}.
	</p>
	{#if position.isBroughtInByThisIncome || position.isOverEarliestThreshold}
		<QuarterlyDeadlines />
		<p class="text-sm">
			Quarterly updates are summaries, not payments — your tax is still paid by 31 January each year.
			Your Books Today can keep the digital records for you;
			<a href="/contact" class="text-chalk underline underline-offset-4 hover:text-signal">talk to us</a>.
		</p>
	{/if}
</InfoPanel>
