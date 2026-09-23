<script lang="ts">
	import type { BreakdownRowKind } from '$lib/data/taxCalculator/breakdownRow';
	import { estimateBreakdown, type BreakdownView } from '$lib/data/taxCalculator/estimateBreakdown';
	import type { TaxEstimate } from '$lib/data/taxCalculator/taxEstimate';
	import BreakdownViewToggle from './BreakdownViewToggle.svelte';
	import InfoPanel from './InfoPanel.svelte';

	let { estimate, canViewQuarterly }: { estimate: TaxEstimate; canViewQuarterly: boolean } = $props();

	let chosenView = $state<BreakdownView>('annual');
	const view = $derived<BreakdownView>(canViewQuarterly ? chosenView : 'annual');
	const rows = $derived(estimateBreakdown(estimate, view));

	const rowClasses: Record<BreakdownRowKind, string> = {
		line: 'text-chalk/80',
		detail: 'text-xs text-chalk/50',
		subtotal: 'border-t border-hairline font-medium text-chalk',
		total: 'border-t-2 border-signal/60 font-display text-lg font-medium text-chalk'
	};
</script>

<InfoPanel heading="How we worked it out">
	{#if canViewQuarterly}
		<BreakdownViewToggle bind:view={chosenView} dueOn={estimate.rules.balancingPaymentDueOn} />
	{/if}
	<table class="w-full text-sm" aria-label="Calculation breakdown">
		<tbody>
			{#each rows as row, rowIndex (rowIndex)}
				<tr class={rowClasses[row.kind]}>
					{#if row.amount === undefined}
						<td colspan="2" class="pb-2 pl-3">{row.label}</td>
					{:else}
						<td class="py-2 pr-4">{row.label}</td>
						<td class="py-2 text-right font-mono whitespace-nowrap">{row.amount}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</InfoPanel>
