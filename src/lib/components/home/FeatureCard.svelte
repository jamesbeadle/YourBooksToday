<script lang="ts">
	import type { BookkeepingFeature } from '$lib/data/bookkeepingFeatures';

	let { feature }: { feature: BookkeepingFeature } = $props();
</script>

<article class="flex flex-col gap-3 rounded-2xl border border-hairline bg-night p-6">
	<h3 class="font-display text-lg font-medium">{feature.name}</h3>
	<p class="font-mono text-sm text-signal">{feature.tagline}</p>
	<p class="text-sm text-chalk/70">{feature.description}</p>
</article>
