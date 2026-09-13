<script lang="ts">
	import AccountingPageHeader from '$lib/components/accounting/AccountingPageHeader.svelte';
	import InvoiceTable from '$lib/components/accounting/InvoiceTable.svelte';
	import SummaryTile from '$lib/components/accounting/SummaryTile.svelte';
	import { formatMonth } from '$lib/data/accounting/accountingPeriods';
	import { primaryButtonClasses } from '$lib/components/accounting/accountingFormStyles';

	let { data } = $props();

	const overview = $derived(data.overview);
</script>

<svelte:head>
	<title>Accounting — Your Books Today</title>
</svelte:head>

<div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
	<AccountingPageHeader
		title="Overview"
		description={`How ${formatMonth(overview.monthKey)} is going, what the bank holds, and who still owes you.`}
	>
		{#snippet actions()}
			<a href="/invoices?new=1" class={primaryButtonClasses}>Raise an invoice</a>
		{/snippet}
	</AccountingPageHeader>
	<section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<SummaryTile label="Income this month" amount={overview.profitAndLoss.totalIncome.period} href="/reports" />
		<SummaryTile label="Expenses this month" amount={overview.profitAndLoss.totalExpenses.period} href="/expenses" />
		<SummaryTile label="Profit this month" amount={overview.profitAndLoss.netProfit.period} tone="signed" href="/reports" />
		<SummaryTile label="Bank" amount={overview.bankBalance} tone="signed" href="/journals" />
		<SummaryTile label="Owed by clients" amount={overview.debtors} href="/invoices" />
		<SummaryTile label="Owed to suppliers" amount={overview.creditors} href="/expenses" />
	</section>
	<section class="flex flex-col gap-4">
		<h2 class="font-display text-lg font-medium">Outstanding invoices</h2>
		<InvoiceTable
			invoices={overview.outstandingInvoices}
			emptyMessage="Nothing outstanding — every issued invoice has been paid."
		/>
	</section>
</div>
