<script lang="ts">
	import type { Class4Rules } from '$lib/data/taxCalculator/taxYearRules';
	import { formatPercentage, formatWholePounds } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import { disclosureClasses, disclosureSummaryClasses } from './taxCalculatorStyles';

	let { class4Rules }: { class4Rules: Class4Rules } = $props();

	const explanations = $derived([
		{
			question: 'What’s the cash basis?',
			answer:
				'You count income when the money arrives and expenses when you pay them — not when you send or receive an invoice. It’s the default for most sole traders and subcontractors.'
		},
		{
			question: 'How is mileage worked out?',
			answer:
				'HMRC’s simplified rates: a flat amount per business mile that covers fuel, repairs, insurance and wear. You claim this instead of your actual vehicle costs.'
		},
		{
			question: 'What’s Class 4 National Insurance?',
			answer: `What the self-employed pay on profits: ${formatPercentage(class4Rules.mainRate)} between ${formatWholePounds(class4Rules.lowerProfitsLimit)} and ${formatWholePounds(class4Rules.upperProfitsLimit)}, then ${formatPercentage(class4Rules.additionalRate)} above that. It’s paid through Self Assessment with your income tax.`
		}
	]);
</script>

<div class="flex flex-col gap-2">
	<h3 class="font-display text-lg font-medium">In plain English</h3>
	{#each explanations as explanation (explanation.question)}
		<details class={disclosureClasses}>
			<summary class={disclosureSummaryClasses}>{explanation.question}</summary>
			<p class="mt-3">{explanation.answer}</p>
		</details>
	{/each}
</div>
