<script lang="ts">
	import type { PaymentsOnAccount } from '$lib/data/taxCalculator/paymentsOnAccount';
	import { paymentsOnAccountRules } from '$lib/data/taxCalculator/sharedRules';
	import { formatLongDate } from '$lib/data/taxCalculator/taxDates';
	import { formatMoney, formatWholePounds } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import InfoPanel from './InfoPanel.svelte';

	let { payments }: { payments: PaymentsOnAccount } = $props();
</script>

<InfoPanel heading="Heads up: payments on account" tone="caution">
	<p>
		Your bill is {formatWholePounds(paymentsOnAccountRules.smallestBillThatNeedsThem)} or more and CIS hasn’t covered most of it, so HMRC will also ask for two
		advance payments towards next year’s tax — each half of this year’s bill:
	</p>
	<ul class="flex list-disc flex-col gap-1 pl-5">
		<li>
			<strong class="text-chalk">{formatMoney(payments.eachPayment)}</strong> by {formatLongDate(payments.firstDueOn)},
			on top of the balance due that day
		</li>
		<li><strong class="text-chalk">{formatMoney(payments.eachPayment)}</strong> by {formatLongDate(payments.secondDueOn)}</li>
	</ul>
	<p class="text-sm">
		These aren’t included in the figures above. If you expect next year’s profit to be lower, you can
		ask HMRC to reduce them.
	</p>
</InfoPanel>
