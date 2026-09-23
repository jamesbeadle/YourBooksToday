<script lang="ts">
	import type { PeriodAmount } from '$lib/client/periodAmount.svelte';
	import { inputClasses, selectClasses } from '$lib/components/site/formStyles';
	import { amountPeriodOptions } from '$lib/data/taxCalculator/amountPeriods';
	import { fieldLabelClasses, helperTextClasses } from './taxCalculatorStyles';

	let {
		id,
		label,
		helperText,
		periodAmount,
		formatAnnual,
		wholeNumbersOnly = false
	}: {
		id: string;
		label: string;
		helperText: string;
		periodAmount: PeriodAmount;
		formatAnnual: (annualAmount: number) => string;
		wholeNumbersOnly?: boolean;
	} = $props();

	const errorId = $derived(`${id}-error`);
	const isShowingAnnualEquivalent = $derived(periodAmount.period !== 'annual' && periodAmount.hasAmount);
</script>

<div class="flex flex-col gap-2">
	<label for={id} class={fieldLabelClasses}>{label}</label>
	<p class={helperTextClasses}>{helperText}</p>
	<div class="flex gap-2">
		<input
			{id}
			type="number"
			min="0"
			step={wholeNumbersOnly ? '1' : '0.01'}
			inputmode={wholeNumbersOnly ? 'numeric' : 'decimal'}
			placeholder="0"
			bind:value={periodAmount.amount}
			aria-invalid={periodAmount.errorMessage !== null}
			aria-describedby={periodAmount.errorMessage ? errorId : undefined}
			class={`min-h-12 min-w-0 flex-1 ${inputClasses}`}
		/>
		<select
			bind:value={periodAmount.period}
			aria-label={`${label} — period`}
			class={`min-h-12 w-36 ${selectClasses}`}
		>
			{#each amountPeriodOptions as option (option.period)}
				<option value={option.period}>{option.label}</option>
			{/each}
		</select>
	</div>
	{#if isShowingAnnualEquivalent}
		<p class="font-mono text-xs text-go">= {formatAnnual(periodAmount.annualAmount)} a year</p>
	{/if}
	{#if periodAmount.errorMessage}
		<p id={errorId} class="text-sm text-caution">⚠ {periodAmount.errorMessage}</p>
	{/if}
</div>
