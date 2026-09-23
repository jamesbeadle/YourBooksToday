<script lang="ts">
	import type { Snippet } from 'svelte';

	type PanelTone = 'neutral' | 'caution' | 'reassuring';

	let { heading, tone = 'neutral', children }: { heading: string; tone?: PanelTone; children: Snippet } =
		$props();

	const toneClasses: Record<PanelTone, string> = {
		neutral: 'border-hairline bg-carriage',
		caution: 'border-caution/40 bg-caution/5',
		reassuring: 'border-go/40 bg-go/5'
	};
</script>

<section class={`flex flex-col gap-3 rounded-2xl border p-6 text-chalk/80 ${toneClasses[tone]}`}>
	<h3 class="font-display text-lg font-medium text-chalk">{heading}</h3>
	{@render children()}
</section>
