<script lang="ts">
	const quarterlyDeadlines = [
		{ quarter: 'Quarter 1', period: '6 April to 5 July', dueBy: '7 August' },
		{ quarter: 'Quarter 2', period: '6 July to 5 October', dueBy: '7 November' },
		{ quarter: 'Quarter 3', period: '6 October to 5 January', dueBy: '7 February' },
		{ quarter: 'Quarter 4', period: '6 January to 5 April', dueBy: '7 May' },
		{ quarter: 'Final declaration', period: 'the whole tax year', dueBy: '31 January' }
	];
</script>

<ul class="flex flex-col gap-1 text-sm">
	{#each quarterlyDeadlines as deadline (deadline.quarter)}
		<li>
			<strong class="text-chalk">{deadline.quarter}</strong> ({deadline.period}): due by {deadline.dueBy}
		</li>
	{/each}
</ul>
