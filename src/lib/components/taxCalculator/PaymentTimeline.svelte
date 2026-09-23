<script lang="ts">
	import type { PaymentPlan } from '$lib/data/taxCalculator/paymentPlan';
	import { formatLongDate } from '$lib/data/taxCalculator/taxDates';
	import { formatMoney } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import InfoPanel from './InfoPanel.svelte';

	let { plan, isCisSubcontractor }: { plan: PaymentPlan; isCisSubcontractor: boolean } = $props();

	const dueOn = $derived(formatLongDate(plan.dueOn));
	const timeLeft = $derived(
		plan.monthsRemaining >= 1 ? `${plan.monthsRemaining} months away` : `${plan.daysRemaining} days away`
	);
</script>

<InfoPanel heading="What you owe and when" tone={plan.isOverdue ? 'caution' : 'neutral'}>
	<p>
		<strong class="text-chalk">{formatMoney(plan.amountDue)}</strong> is due to HMRC by
		<strong class="text-chalk">{dueOn}</strong>
		{#if plan.isOverdue}<span class="font-medium text-caution">— overdue</span>{:else}({timeLeft}){/if}.
	</p>
	{#if plan.isOverdue}
		<p>If you haven’t filed or paid yet, speak to HMRC or your accountant — penalties and interest may apply.</p>
	{:else}
		<p>To have it ready in time, set aside:</p>
		<div class="grid grid-cols-2 gap-3">
			<div class="rounded-xl border border-hairline bg-night p-4">
				<p class="font-display text-2xl font-medium text-chalk">{formatMoney(plan.monthlySetAside)}</p>
				<p class="text-sm text-chalk/60">a month from now</p>
			</div>
			<div class="rounded-xl border border-hairline bg-night p-4">
				<p class="font-display text-2xl font-medium text-chalk">{formatMoney(plan.quarterlySetAside)}</p>
				<p class="text-sm text-chalk/60">a quarter from now</p>
			</div>
		</div>
	{/if}
	{#if isCisSubcontractor}
		<p class="text-sm">
			<strong class="text-chalk">For CIS subcontractors:</strong> this is only the shortfall left after
			the CIS already taken. While you stay in CIS most of your tax keeps being deducted at source, but
			setting aside 5–10% of your gross income is a sensible buffer.
		</p>
	{/if}
</InfoPanel>
