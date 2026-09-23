<script lang="ts">
	import { formatLongDate } from '$lib/data/taxCalculator/taxDates';

	let { verifiedOn }: { verifiedOn: string } = $props();
</script>

<section class="flex max-w-prose flex-col gap-3 text-sm text-chalk/60" aria-labelledby="disclaimer-heading">
	<h2 id="disclaimer-heading" class="font-display text-base font-medium text-chalk/80">About this estimate</h2>
	<p>
		This is an estimate for guidance only, based on HMRC’s simplified rates and the figures you enter.
		It isn’t tax, legal or financial advice. For your own situation, speak to a qualified accountant or
		tax adviser. This tool isn’t connected to HMRC.
	</p>
	<p>
		Rates checked against gov.uk on {formatLongDate(verifiedOn)}. Always check gov.uk before you file.
		Nothing you type here leaves your browser.
	</p>
</section>
