import type { EstimateOutcome, TaxEstimate } from './taxEstimate';
import { formatMoney } from './taxCalculatorFormatting';

export type EstimateHeadline = {
	outcome: EstimateOutcome;
	label: string;
	amount: number;
};

const labelByOutcome: Record<EstimateOutcome, string> = {
	taxDue: 'Estimated tax due to HMRC',
	refund: 'Estimated refund due from HMRC',
	loss: 'Estimated trading loss'
};

export function headlineOf(estimate: TaxEstimate): EstimateHeadline {
	const amount = estimate.outcome === 'loss' ? estimate.profit : estimate.balanceDue;
	return { outcome: estimate.outcome, label: labelByOutcome[estimate.outcome], amount: Math.abs(amount) };
}

export function announcementOf(estimate: TaxEstimate | null): string {
	if (estimate === null) return '';
	const headline = headlineOf(estimate);
	return `${headline.label}: ${formatMoney(headline.amount)}`;
}
