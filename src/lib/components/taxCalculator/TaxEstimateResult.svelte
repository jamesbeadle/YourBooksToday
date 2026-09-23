<script lang="ts">
	import { class2PositionFor } from '$lib/data/taxCalculator/class2Position';
	import { isPayingHigherRates, isPersonalAllowanceTapered } from '$lib/data/taxCalculator/highIncomeSignals';
	import { makingTaxDigitalPositionFor } from '$lib/data/taxCalculator/makingTaxDigitalPosition';
	import { planPayment } from '$lib/data/taxCalculator/paymentPlan';
	import { paymentsOnAccountFor } from '$lib/data/taxCalculator/paymentsOnAccount';
	import { effectiveTaxRateOf, type TaxEstimate } from '$lib/data/taxCalculator/taxEstimate';
	import Class2Panel from './Class2Panel.svelte';
	import EffectiveRateCard from './EffectiveRateCard.svelte';
	import EstimateBreakdown from './EstimateBreakdown.svelte';
	import EstimateExclusions from './EstimateExclusions.svelte';
	import EstimateHeadline from './EstimateHeadline.svelte';
	import HighIncomeNotice from './HighIncomeNotice.svelte';
	import MakingTaxDigitalPanel from './MakingTaxDigitalPanel.svelte';
	import PaymentTimeline from './PaymentTimeline.svelte';
	import PaymentsOnAccountPanel from './PaymentsOnAccountPanel.svelte';
	import PlainEnglishExplanations from './PlainEnglishExplanations.svelte';

	let { estimate }: { estimate: TaxEstimate } = $props();

	const plan = $derived(planPayment(estimate, new Date()));
	const effectiveTaxRate = $derived(effectiveTaxRateOf(estimate));
	const paymentsOnAccount = $derived(paymentsOnAccountFor(estimate));
	const makingTaxDigital = $derived(makingTaxDigitalPositionFor(estimate));
	const canViewQuarterly = $derived(estimate.outcome === 'taxDue' && makingTaxDigital.isBroughtInByThisIncome);
	const isCisSubcontractor = $derived(estimate.inputs.tradingStatus === 'cisSubcontractor');
</script>

<div class="flex flex-col gap-4">
	<EstimateHeadline {estimate} />
	<EstimateExclusions />
	{#if plan}
		<PaymentTimeline {plan} {isCisSubcontractor} />
	{/if}
	<EstimateBreakdown {estimate} {canViewQuarterly} />
	{#if effectiveTaxRate !== null && effectiveTaxRate > 0}
		<EffectiveRateCard {effectiveTaxRate} />
	{/if}
	{#if paymentsOnAccount}
		<PaymentsOnAccountPanel payments={paymentsOnAccount} />
	{/if}
	<PlainEnglishExplanations class4Rules={estimate.rules.class4} />
	<Class2Panel position={class2PositionFor(estimate)} rules={estimate.rules.class2} taxYear={estimate.rules.taxYear} />
	<MakingTaxDigitalPanel position={makingTaxDigital} taxYear={estimate.rules.taxYear} />
	{#if isPayingHigherRates(estimate)}
		<HighIncomeNotice isAllowanceTapered={isPersonalAllowanceTapered(estimate)} />
	{/if}
</div>
