<script lang="ts">
	import type { Class2Position } from '$lib/data/taxCalculator/class2Position';
	import type { Class2Rules, TaxYearName } from '$lib/data/taxCalculator/taxYearRules';
	import { formatMoney, formatWholePounds } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import InfoPanel from './InfoPanel.svelte';

	let { position, rules, taxYear }: { position: Class2Position; rules: Class2Rules; taxYear: TaxYearName } =
		$props();

	const threshold = $derived(formatWholePounds(rules.smallProfitsThreshold));
</script>

{#if position === 'creditedAutomatically'}
	<InfoPanel heading="Class 2 National Insurance" tone="reassuring">
		<p>
			Nothing to pay. Your profit is at or above the Small Profits Threshold ({threshold}), so you get
			National Insurance credits towards your State Pension automatically.
		</p>
	</InfoPanel>
{:else}
	<InfoPanel heading="Voluntary Class 2 National Insurance" tone="caution">
		<p>
			{#if position === 'tradingLoss'}
				With a trading loss you won’t get National Insurance credits automatically.
			{:else}
				Your profit is below the Small Profits Threshold ({threshold}), so you won’t get National
				Insurance credits automatically.
			{/if}
			You can choose to pay voluntary Class 2 at {formatMoney(rules.weeklyRate)} a week for {taxYear}
			to protect your State Pension. Check your National Insurance record, or ask an adviser, first.
		</p>
		<p class="text-sm">This is separate from, and not included in, the tax figure above.</p>
	</InfoPanel>
{/if}
