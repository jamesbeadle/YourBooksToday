<script lang="ts">
	import { disclosureClasses, disclosureSummaryClasses } from './taxCalculatorStyles';

	const exclusions = [
		{ name: 'Student loan repayments', effect: 'collected through Self Assessment on top of your tax.' },
		{ name: 'Pension contributions', effect: 'can lower the tax you pay.' },
		{ name: 'Capital allowances', effect: 'relief on bigger purchases such as vans and machinery.' },
		{ name: 'Other income', effect: 'a PAYE job, dividends, rent, savings interest or foreign income.' },
		{ name: 'Marriage Allowance', effect: 'moving part of a personal allowance between spouses.' },
		{ name: 'Scottish income tax', effect: 'Scotland has its own rates and bands.' }
	];
</script>

<details class={disclosureClasses}>
	<summary class={disclosureSummaryClasses}>What this estimate doesn’t include</summary>
	<ul class="mt-3 flex list-disc flex-col gap-1 pl-5">
		{#each exclusions as exclusion (exclusion.name)}
			<li><strong class="text-chalk">{exclusion.name}</strong> — {exclusion.effect}</li>
		{/each}
	</ul>
	<p class="mt-3">If any of these apply, your real bill will differ. An accountant can give you the full picture.</p>
</details>
