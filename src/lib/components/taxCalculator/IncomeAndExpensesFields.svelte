<script lang="ts">
	import type { TaxCalculatorForm } from '$lib/client/taxCalculatorForm.svelte';
	import { formatMoney } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import CalculatorCard from './CalculatorCard.svelte';
	import ExpenseExamples from './ExpenseExamples.svelte';
	import PeriodAmountField from './PeriodAmountField.svelte';

	let { form }: { form: TaxCalculatorForm } = $props();
</script>

<CalculatorCard stepNumber={2} heading="Income and expenses">
	<PeriodAmountField
		id="income"
		label="Income received"
		helperText="Money actually paid to you for your self-employed work in the tax year — not what you have invoiced."
		periodAmount={form.income}
		formatAnnual={formatMoney}
	/>
	{#if form.isCisSubcontractor}
		<PeriodAmountField
			id="cis-deductions"
			label="CIS deducted from your payments"
			helperText="The total on your CIS deduction statements. CIS is normally taken from labour only, not materials: 20% if you are registered, 30% if not, nothing with gross payment status."
			periodAmount={form.cisDeductions}
			formatAnnual={formatMoney}
		/>
	{/if}
	<PeriodAmountField
		id="expenses"
		label="Business expenses paid"
		helperText="Tools, materials, phone, insurance, accountant fees — anything wholly and exclusively for the business. Leave out mileage and working from home; they come next."
		periodAmount={form.expenses}
		formatAnnual={formatMoney}
	/>
	<ExpenseExamples />
</CalculatorCard>
