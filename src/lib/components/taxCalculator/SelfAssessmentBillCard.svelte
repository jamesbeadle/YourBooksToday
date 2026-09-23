<script lang="ts">
	import { planPayment, shareOfProfitToSetAside } from '$lib/data/taxCalculator/paymentPlan';
	import type { SelfAssessmentBill } from '$lib/data/taxCalculator/selfAssessmentBill';
	import { selfAssessmentRows } from '$lib/data/taxCalculator/selfAssessmentRows';
	import { formatLongDate } from '$lib/data/taxCalculator/taxDates';
	import { formatMoney, formatPercentage } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import type { TaxYearRules } from '$lib/data/taxCalculator/taxRuleTypes';
	import BreakdownTable from './BreakdownTable.svelte';
	import WidgetIcon from './WidgetIcon.svelte';
	import { widgetCardClasses } from './calculatorStyles';

	let { bill, rules, hasPayroll }: { bill: SelfAssessmentBill; rules: TaxYearRules; hasPayroll: boolean } = $props();

	const setAsideFractionDigits = 1;
	const plan = $derived(planPayment(bill, rules.balancingPaymentDueOn, new Date()));
	const setAsideShare = $derived(shareOfProfitToSetAside(bill));
</script>

<article class={`${widgetCardClasses} md:row-span-2`}>
	<WidgetIcon name="calendar" toneClasses="bg-caution/15 text-caution" />
	<h3 class="font-display text-xl font-medium">What you owe HMRC, and when</h3>
	{#if plan}
		<p class="text-chalk/75">
			<strong class="font-display text-3xl font-medium text-chalk">{formatMoney(plan.amountDue)}</strong><br />
			due by <strong class="text-chalk">{formatLongDate(plan.dueOn)}</strong>
			{#if plan.isOverdue}<span class="text-caution"> — overdue, so penalties and interest may apply</span>{/if}
		</p>
		{#if !plan.isOverdue}
			<div class="grid grid-cols-2 gap-3">
				<div class="rounded-2xl bg-night/60 p-4">
					<p class="font-display text-xl text-chalk">{formatMoney(plan.monthlySetAside)}</p>
					<p class="text-xs text-chalk/55">a month for {plan.monthsRemaining} months</p>
				</div>
				{#if setAsideShare !== null}
					<div class="rounded-2xl bg-night/60 p-4">
						<p class="font-display text-xl text-chalk">{formatPercentage(setAsideShare, setAsideFractionDigits)}</p>
						<p class="text-xs text-chalk/55">of your profit to put by</p>
					</div>
				{/if}
			</div>
		{/if}
	{:else}
		<p class="text-chalk/75">
			{bill.balanceDue < 0 ? 'On these figures HMRC owes you money back.' : 'Nothing to pay through Self Assessment on these figures.'}
		</p>
	{/if}
	<BreakdownTable rows={selfAssessmentRows(bill, hasPayroll)} label="Self Assessment bill" />
</article>
