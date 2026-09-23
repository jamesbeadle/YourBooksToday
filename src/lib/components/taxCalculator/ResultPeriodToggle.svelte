<script lang="ts">
	import { resultPeriodOptions, type ResultPeriod } from '$lib/data/taxCalculator/resultPeriods';

	let { period = $bindable() }: { period: ResultPeriod } = $props();
</script>

<div class="inline-flex rounded-2xl border border-chalk/15 bg-night/30 p-1" role="group" aria-label="Show amounts">
	{#each resultPeriodOptions as option (option.period)}
		<button
			type="button"
			aria-pressed={period === option.period}
			onclick={() => (period = option.period)}
			class="min-h-10 rounded-xl px-4 text-sm text-chalk/70 transition hover:text-chalk aria-pressed:bg-go
				aria-pressed:font-medium aria-pressed:text-night"
		>
			{option.label}
		</button>
	{/each}
</div>
