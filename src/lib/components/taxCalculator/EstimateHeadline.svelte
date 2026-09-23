<script lang="ts">
	import { headlineOf } from '$lib/data/taxCalculator/estimateHeadline';
	import type { EstimateOutcome, TaxEstimate } from '$lib/data/taxCalculator/taxEstimate';
	import { formatMoney } from '$lib/data/taxCalculator/taxCalculatorFormatting';

	let { estimate }: { estimate: TaxEstimate } = $props();

	const amountClassesByOutcome: Record<EstimateOutcome, string> = {
		taxDue: 'text-chalk',
		refund: 'text-go',
		loss: 'text-caution'
	};

	const headline = $derived(headlineOf(estimate));
	const cisRefundAfterLoss = $derived(estimate.outcome === 'loss' ? estimate.inputs.annualCisDeductions : 0);
</script>

<div class="flex flex-col gap-2 rounded-2xl border border-signal/40 bg-carriage p-6">
	<p class="font-mono text-xs tracking-widest text-chalk/60 uppercase">{headline.label}</p>
	<p class={`font-display text-5xl font-medium ${amountClassesByOutcome[headline.outcome]}`}>
		{formatMoney(headline.amount)}
	</p>
	<p class="text-sm text-chalk/60">For the {estimate.rules.label}.</p>
	{#if cisRefundAfterLoss > 0}
		<p class="text-chalk/80">
			<strong class="text-go">Plus an estimated CIS refund of {formatMoney(cisRefundAfterLoss)}.</strong>
			With a trading loss, all the CIS taken from your payments is normally refunded through
			Self Assessment.
		</p>
	{/if}
</div>
