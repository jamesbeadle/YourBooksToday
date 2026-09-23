<script lang="ts">
	import type { TaxCalculatorForm } from '$lib/client/taxCalculatorForm.svelte';
	import { formatMoney } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import BigAmountField from './BigAmountField.svelte';
	import ExpenseExamples from './ExpenseExamples.svelte';
	import PeriodAmountField from './PeriodAmountField.svelte';
	import ToggleSwitch from './ToggleSwitch.svelte';

	let { form }: { form: TaxCalculatorForm } = $props();

	const incomeHelp = 'Money actually paid to you for your self-employed work — not what you have invoiced.';
	const sliderMaximum = 150000;
	let isCisSubcontractor = $derived(form.tradingStatus === 'cisSubcontractor');
</script>

<div class="flex flex-col gap-5">
	{#if form.earningType === 'selfEmployed'}
		<BigAmountField
			id="self-employment-income"
			label="What does your business take in?"
			helperText={incomeHelp}
			suffix="before expenses"
			periodAmount={form.selfEmploymentIncome}
			{sliderMaximum}
		/>
	{:else}
		<PeriodAmountField id="self-employment-income" label="Self-employed income" helperText={incomeHelp} periodAmount={form.selfEmploymentIncome} formatAnnual={formatMoney} />
	{/if}
	<PeriodAmountField
		id="expenses"
		label="Business expenses"
		helperText="Anything wholly and exclusively for the business. Mileage and working from home go under “Make it more accurate”."
		periodAmount={form.expenses}
		formatAnnual={formatMoney}
	/>
	<ExpenseExamples />
	<ToggleSwitch
		label="I work under CIS"
		description="Contractors take 20% (or 30% if unregistered) off your labour before paying you."
		isOn={isCisSubcontractor}
		onToggle={(isOn) => (form.tradingStatus = isOn ? 'cisSubcontractor' : 'soleTrader')}
	/>
	{#if isCisSubcontractor}
		<PeriodAmountField
			id="cis-deductions"
			label="CIS deducted from your payments"
			helperText="The total on your CIS deduction statements."
			periodAmount={form.cisDeductions}
			formatAnnual={formatMoney}
		/>
	{/if}
</div>
