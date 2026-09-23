<script lang="ts">
	import type { TaxCalculatorForm } from '$lib/client/taxCalculatorForm.svelte';
	import { selectClasses } from '$lib/components/site/formStyles';
	import { formatMiles } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import CalculatorCard from './CalculatorCard.svelte';
	import PeriodAmountField from './PeriodAmountField.svelte';
	import { fieldLabelClasses, helperTextClasses } from './taxCalculatorStyles';

	let { form }: { form: TaxCalculatorForm } = $props();

	const vehicleOptions = [
		{ vehicleType: 'none', label: 'No business mileage' },
		{ vehicleType: 'carOrVan', label: 'Car or van' },
		{ vehicleType: 'motorcycle', label: 'Motorcycle' },
		{ vehicleType: 'bicycle', label: 'Bicycle' }
	] as const;

	const homeWorkingOptions = [
		{ band: 'under25Hours', label: 'Under 25 hours' },
		{ band: '25To50Hours', label: '25 to 50 hours' },
		{ band: '51To100Hours', label: '51 to 100 hours' },
		{ band: '101HoursOrMore', label: '101 hours or more' }
	] as const;
</script>

<CalculatorCard stepNumber={3} heading="Mileage and working from home">
	<div class="flex flex-col gap-2">
		<label for="vehicle-type" class={fieldLabelClasses}>Vehicle used for business</label>
		<select id="vehicle-type" bind:value={form.vehicleType} class={`min-h-12 w-full min-w-0 ${selectClasses}`}>
			{#each vehicleOptions as option (option.vehicleType)}
				<option value={option.vehicleType}>{option.label}</option>
			{/each}
		</select>
	</div>
	{#if form.vehicleType !== 'none'}
		<PeriodAmountField
			id="business-miles"
			label="Business miles"
			helperText="Miles driven for the business in the tax year. Ordinary commuting to a regular workplace doesn’t count."
			periodAmount={form.businessMiles}
			formatAnnual={formatMiles}
			wholeNumbersOnly
		/>
	{/if}
	<div class="flex flex-col gap-2">
		<label for="home-working" class={fieldLabelClasses}>Hours worked from home each month</label>
		<select id="home-working" bind:value={form.homeWorkingBand} class={`min-h-12 w-full min-w-0 ${selectClasses}`}>
			{#each homeWorkingOptions as option (option.band)}
				<option value={option.band}>{option.label}</option>
			{/each}
		</select>
		<p class={helperTextClasses}>Uses HMRC’s simplified flat rate for working from home.</p>
	</div>
</CalculatorCard>
