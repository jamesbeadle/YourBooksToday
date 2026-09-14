<script lang="ts">
	const askedQuestions = [
		'How did last month go against the one before it?',
		'What are we owed, and who is slowest to pay?',
		'Show me overheads by cost centre, year to date',
		'Which bank lines are still unmatched, and why?',
		'Raise the invoice for the Brookfield work and send it'
	];
</script>

<section class="border-y border-hairline bg-carriage/60">
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="grid items-start gap-10 md:grid-cols-2">
			<div class="flex flex-col gap-4">
				<p class="font-mono text-sm tracking-widest text-signal uppercase">Ask your books</p>
				<h2 class="font-display text-3xl font-medium">Reporting that answers back.</h2>
				<p class="max-w-prose text-chalk/70">
					A report is normally something you request, wait for, and read once. Here the question
					and the answer are the same moment — and the answer arrives as something to look at,
					a figure or a chart you can open a level deeper, rather than a PDF of how things
					stood on the day someone ran it.
				</p>
				<p class="max-w-prose text-chalk/70">
					It works the same way for the writing as for the reading. The books are exposed as a
					set of named actions: the ones that read, and the ones that post. Ask for an invoice
					and you get an invoice, with the journal behind it.
				</p>
			</div>
			<ul class="flex flex-col gap-3 rounded-2xl border border-hairline bg-night p-8">
				{#each askedQuestions as question (question)}
					<li class="flex gap-3 font-mono text-sm text-chalk/80">
						<span class="shrink-0 text-signal">&gt;</span>
						{question}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
