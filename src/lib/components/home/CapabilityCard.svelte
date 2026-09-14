<script lang="ts">
	import type { PlatformCapability } from '$lib/data/platformCapabilities';

	let { capability }: { capability: PlatformCapability } = $props();

	const isLive = $derived(capability.state === 'live');
</script>

<article class="flex flex-col gap-3 rounded-2xl border border-hairline bg-night p-6">
	<div class="flex flex-wrap items-center gap-3">
		<h3 class="font-display text-lg font-medium">{capability.name}</h3>
		{#if isLive}
			<span class="rounded-full bg-go/15 px-2.5 py-0.5 font-mono text-xs text-go">live now</span>
		{:else}
			<span class="rounded-full bg-caution/15 px-2.5 py-0.5 font-mono text-xs text-caution">
				building
			</span>
		{/if}
	</div>
	<p class="font-mono text-sm text-signal">{capability.tagline}</p>
	<p class="text-sm text-chalk/70">{capability.description}</p>
</article>
