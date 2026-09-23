import { quartersPerYear } from './amountPeriods';
import type { BreakdownRow, BreakdownScale } from './breakdownRow';
import { claimBreakdownRows } from './claimBreakdownRows';
import { lossBreakdownRows, taxBreakdownRows } from './taxBreakdownRows';
import type { TaxEstimate } from './taxEstimate';

export type BreakdownView = 'annual' | 'quarterly';

export function estimateBreakdown(estimate: TaxEstimate, view: BreakdownView): BreakdownRow[] {
	const scale = scaleFor(view);
	const outcomeRows =
		estimate.outcome === 'loss' ? lossBreakdownRows(estimate, scale) : taxBreakdownRows(estimate, scale);
	return [...claimBreakdownRows(estimate, scale), ...outcomeRows];
}

function scaleFor(view: BreakdownView): BreakdownScale {
	if (view === 'quarterly') return { isQuarterly: true, of: (amount) => amount / quartersPerYear };
	return { isQuarterly: false, of: (amount) => amount };
}
