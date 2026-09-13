export type BookkeepingFeature = {
	id: string;
	name: string;
	tagline: string;
	description: string;
};

export const bookkeepingFeatures: BookkeepingFeature[] = [
	{
		id: 'invoices',
		name: 'Invoices',
		tagline: 'Raise it, issue it, watch it settle',
		description:
			'Draft an invoice against a client, add lines, issue it and record the payment. Each step posts the journal behind it, so the ledger is right without you thinking about the ledger.'
	},
	{
		id: 'expenses',
		name: 'Expenses',
		tagline: 'What you spent, against what it was for',
		description:
			'Record a cost, put it to a cost centre, mark it paid. Nothing is filed anywhere it cannot be found again.'
	},
	{
		id: 'journals',
		name: 'Journals',
		tagline: 'Double entry, kept honest',
		description:
			'Every posting is a balanced journal you can open and read. Accruals and prepayments are journals too, released when the period says so.'
	},
	{
		id: 'reports',
		name: 'Reports',
		tagline: 'Profit and loss, balance sheet, any month',
		description:
			'Both statements are built from the entries themselves, not from a summary kept alongside them. If the balance sheet does not balance, it tells you.'
	}
];
