<script lang="ts">
	import BrandWordmark from '../site/BrandWordmark.svelte';
</script>

<section class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
	<div class="flex flex-col gap-6">
		<p class="font-mono text-sm tracking-widest text-signal uppercase">
			Welcome to Your Books Today
		</p>
		<h1 class="font-display text-4xl leading-tight font-medium md:text-6xl">
			Books that keep<br />themselves.
		</h1>
		<p class="max-w-prose text-lg text-chalk/70">
			Bills, receipts and bank lines file themselves on a schedule, so nothing sits waiting for
			you to find an evening. And when you want to know how the business is doing, you ask — in
			the conversation you are already having — and the answer comes back while you are still
			in it.
		</p>
		<div class="flex flex-wrap items-center gap-4">
			<a
				href="/account/sign-in"
				class="rounded-full bg-signal px-7 py-3 font-display text-sm font-medium text-night
					transition hover:brightness-110"
			>
				Open your books
			</a>
			<a
				href="/contact"
				class="rounded-full border border-hairline px-7 py-3 font-display text-sm text-chalk/80
					transition hover:border-chalk/40 hover:text-chalk"
			>
				Talk to us
			</a>
		</div>
	</div>
	<div class="hidden items-center justify-center md:flex" aria-hidden="true">
		<BrandWordmark fontSize={150} />
	</div>
</section>
