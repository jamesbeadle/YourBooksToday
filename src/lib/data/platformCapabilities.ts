export type CapabilityState = 'live' | 'building';

export type PlatformCapability = {
	id: string;
	name: string;
	state: CapabilityState;
	tagline: string;
	description: string;
};

export const platformCapabilities: PlatformCapability[] = [
	{
		id: 'ledger',
		name: 'The ledger',
		state: 'live',
		tagline: 'Every figure traces back to where it came from',
		description:
			'Invoices, expenses, journals, accruals and prepayments, a chart of accounts and cost centres. Every posting anything makes — you, a rule, or an assistant — is a balanced journal you can open and read.'
	},
	{
		id: 'reports',
		name: 'Reports',
		state: 'live',
		tagline: 'Profit and loss, balance sheet, any period',
		description:
			'Both statements are built by summing the entries, never from a total kept alongside them. A balance sheet that does not balance says so rather than rounding.'
	},
	{
		id: 'mailbox',
		name: 'The mailbox',
		state: 'building',
		tagline: 'Bills arrive where they always did',
		description:
			'Connect the address your suppliers already invoice. Scheduled work reads what came in, pulls the supplier, date, net, VAT and reference off the document, and files it. Nothing to forward, nothing to drag anywhere.'
	},
	{
		id: 'receipts',
		name: 'Receipts',
		state: 'building',
		tagline: 'Capture without the separate subscription',
		description:
			'Photograph it, forward it, or let it come in with the post. Extraction and coding are part of the platform rather than a second product you pay for and sync overnight.'
	},
	{
		id: 'bank',
		name: 'Bank reconciliation',
		state: 'building',
		tagline: 'Matched on its own, queried when it cannot be',
		description:
			'The feed comes in, lines are matched against invoices, bills and expenses already posted, and what genuinely needs a human is the only thing that reaches you.'
	},
	{
		id: 'returns',
		name: 'Period end',
		state: 'building',
		tagline: 'The quarter closes without a scramble',
		description:
			'VAT, accruals released on schedule, the year rolled over. The work that currently piles up into three bad days becomes something that happened continuously.'
	}
];
