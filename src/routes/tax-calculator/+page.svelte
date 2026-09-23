<script lang="ts">
	import { onMount } from 'svelte';
	import { recallFromThisVisit, saveForThisVisit } from '$lib/client/rememberedTaxCalculatorForm';
	import { TaxCalculatorForm } from '$lib/client/taxCalculatorForm.svelte';
	import EmptyEstimatePrompt from '$lib/components/taxCalculator/EmptyEstimatePrompt.svelte';
	import IncomeAndExpensesFields from '$lib/components/taxCalculator/IncomeAndExpensesFields.svelte';
	import MileageAndHomeFields from '$lib/components/taxCalculator/MileageAndHomeFields.svelte';
	import TaxCalculatorDisclaimer from '$lib/components/taxCalculator/TaxCalculatorDisclaimer.svelte';
	import TaxCalculatorIntro from '$lib/components/taxCalculator/TaxCalculatorIntro.svelte';
	import TaxEstimateResult from '$lib/components/taxCalculator/TaxEstimateResult.svelte';
	import YearAndStatusFields from '$lib/components/taxCalculator/YearAndStatusFields.svelte';
	import { announcementOf } from '$lib/data/taxCalculator/estimateHeadline';
	import { rulesFor } from '$lib/data/taxCalculator/taxYearRules';

	const form = new TaxCalculatorForm();
	const estimate = $derived(form.estimate);
	let hasRecalledThisVisit = $state(false);

	onMount(() => {
		form.restore(recallFromThisVisit());
		hasRecalledThisVisit = true;
	});

	$effect(() => {
		const remembered = form.remembered();
		if (hasRecalledThisVisit) saveForThisVisit(remembered);
	});
</script>

<svelte:head>
	<title>Self-employed tax calculator — Your Books Today</title>
	<meta
		name="description"
		content="Free UK tax calculator for sole traders and CIS subcontractors. Estimate your income tax, Class 4 National Insurance, CIS refund and payment dates for 2025/26 and 2026/27."
	/>
</svelte:head>

<div class="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:py-16">
	<TaxCalculatorIntro />
	<noscript>
		<p class="rounded-xl border border-caution/40 p-4">This calculator needs JavaScript switched on.</p>
	</noscript>
	<div class="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
		<form class="flex min-w-0 flex-col gap-4" onsubmit={(event) => event.preventDefault()} novalidate>
			<YearAndStatusFields {form} />
			<IncomeAndExpensesFields {form} />
			<MileageAndHomeFields {form} />
		</form>
		<section aria-label="Your estimate">
			<p class="sr-only" aria-live="polite">{announcementOf(estimate)}</p>
			{#if estimate}
				<TaxEstimateResult {estimate} />
			{:else}
				<EmptyEstimatePrompt />
			{/if}
		</section>
	</div>
	<TaxCalculatorDisclaimer verifiedOn={rulesFor(form.taxYear).verifiedOn} />
</div>
