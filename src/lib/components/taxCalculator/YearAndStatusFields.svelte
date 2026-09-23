<script lang="ts">
	import type { TaxCalculatorForm } from '$lib/client/taxCalculatorForm.svelte';
	import { selectClasses } from '$lib/components/site/formStyles';
	import { taxYearNames, rulesFor } from '$lib/data/taxCalculator/taxYearRules';
	import CalculatorCard from './CalculatorCard.svelte';
	import { choiceTileClasses, fieldLabelClasses, helperTextClasses } from './taxCalculatorStyles';

	let { form }: { form: TaxCalculatorForm } = $props();

	const tradingStatusOptions = [
		{ status: 'soleTrader', label: 'Sole trader (no CIS)' },
		{ status: 'cisSubcontractor', label: 'Sole trader with CIS deductions' }
	] as const;
</script>

<CalculatorCard stepNumber={1} heading="Tax year and status">
	<div class="flex flex-col gap-2">
		<label for="tax-year" class={fieldLabelClasses}>Tax year</label>
		<select id="tax-year" bind:value={form.taxYear} class={`min-h-12 w-full min-w-0 ${selectClasses}`}>
			{#each taxYearNames as taxYear (taxYear)}
				<option value={taxYear}>{taxYear} tax year</option>
			{/each}
		</select>
		<p class={helperTextClasses}>{rulesFor(form.taxYear).datesCovered}</p>
	</div>
	<fieldset class="flex min-w-0 flex-col gap-2">
		<legend class={`mb-2 ${fieldLabelClasses}`}>How you work</legend>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each tradingStatusOptions as option (option.status)}
				<label class={choiceTileClasses}>
					<input type="radio" value={option.status} bind:group={form.tradingStatus} class="accent-go" />
					{option.label}
				</label>
			{/each}
		</div>
		<p class={helperTextClasses}>
			If only some of your work is under CIS, choose CIS. Enter your income from all your
			self-employed work, and the CIS deducted across all of it.
		</p>
	</fieldset>
</CalculatorCard>
