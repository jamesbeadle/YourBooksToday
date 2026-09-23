<script lang="ts">
	import InfoPanel from './InfoPanel.svelte';

	let { isAllowanceTapered }: { isAllowanceTapered: boolean } = $props();

	const reason = $derived(
		isAllowanceTapered
			? 'your personal allowance is being tapered and you are paying higher-rate tax'
			: 'you are paying higher-rate tax'
	);
</script>

<InfoPanel heading="Your situation has more moving parts than this estimate covers" tone="caution">
	<p>
		Because {reason}, things like pension contributions, payments on account, dividends, rental income
		or capital allowances can change the figure a lot. It’s worth speaking to an accountant before
		relying on it.
	</p>
</InfoPanel>
