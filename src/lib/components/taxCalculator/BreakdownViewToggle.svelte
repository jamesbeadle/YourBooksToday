<script lang="ts">
	import type { BreakdownView } from '$lib/data/taxCalculator/estimateBreakdown';
	import { formatLongDate } from '$lib/data/taxCalculator/taxDates';

	let { view = $bindable(), dueOn }: { view: BreakdownView; dueOn: string } = $props();

	const viewOptions: { view: BreakdownView; label: string }[] = [
		{ view: 'annual', label: 'Annual' },
		{ view: 'quarterly', label: 'Quarterly' }
	];
</script>

<div class="flex flex-wrap items-center gap-3 text-sm">
	<span class="text-chalk/60">View as:</span>
	<div class="flex rounded-full border border-hairline p-1" role="group" aria-label="Breakdown view">
		{#each viewOptions as option (option.view)}
			<button
				type="button"
				aria-pressed={view === option.view}
				onclick={() => (view = option.view)}
				class="min-h-10 rounded-full px-4 transition aria-pressed:bg-go aria-pressed:text-night"
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
{#if view === 'quarterly'}
	<p class="rounded-xl border border-caution/40 bg-caution/5 p-4 text-sm">
		<strong class="text-chalk">About the quarterly view:</strong> these are rough per-quarter figures to
		show what each Making Tax Digital update might look like, assuming income is spread evenly. You
		don’t pay tax quarterly — the bill is still due in one payment on {formatLongDate(dueOn)}.
	</p>
{/if}
