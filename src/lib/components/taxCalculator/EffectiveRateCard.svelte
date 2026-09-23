<script lang="ts">
	import { formatPercentage } from '$lib/data/taxCalculator/taxCalculatorFormatting';
	import InfoPanel from './InfoPanel.svelte';

	let { effectiveTaxRate }: { effectiveTaxRate: number } = $props();

	const effectiveRateFractionDigits = 1;
	const rate = $derived(formatPercentage(effectiveTaxRate, effectiveRateFractionDigits));
</script>

<InfoPanel heading={`Your effective tax rate: ${rate}`} tone="reassuring">
	<p>
		Income tax and Class 4 National Insurance as a share of your profit. Put {rate} of every payment
		you receive aside and the tax will be there when it’s due.
	</p>
</InfoPanel>
