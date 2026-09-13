<script lang="ts">
	const askedQuestions = [
		'Raise an invoice to Brookfield for two days of work at £850 a day',
		'What is owed to me, and how long has it been owed?',
		'Show me last month against the one before it',
		'Post the accrual for the November rent and release it in December'
	];
</script>

<section class="mx-auto max-w-6xl px-6 py-16">
	<div class="grid items-start gap-10 md:grid-cols-2">
		<div class="flex flex-col gap-4">
			<p class="font-mono text-sm tracking-widest text-signal uppercase">Ask your books</p>
			<h2 class="font-display text-3xl font-medium">The ledger answers for itself.</h2>
			<p class="max-w-prose text-chalk/70">
				Your books are exposed to an assistant as a set of named actions — read the ones that
				read, run the ones that post. It works on the same ledger the screens do, under the
				same rules, and every write it makes is a journal you can open afterwards.
			</p>
		</div>
		<ul class="flex flex-col gap-3 rounded-2xl border border-hairline bg-carriage p-8">
			{#each askedQuestions as question (question)}
				<li class="flex gap-3 font-mono text-sm text-chalk/80">
					<span class="shrink-0 text-signal">&gt;</span>
					{question}
				</li>
			{/each}
		</ul>
	</div>
</section>
