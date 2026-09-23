import type { TakeHomeEstimate } from './takeHomeEstimate';

export function isPersonalAllowanceTapered(estimate: TakeHomeEstimate): boolean {
	return estimate.adjustedNetIncome > estimate.rules.incomeTax.personalAllowanceTaperThreshold;
}

export function isPayingHigherRates(estimate: TakeHomeEstimate): boolean {
	return estimate.incomeTax.slices.some((slice) => slice.isHigherRate && slice.amount > 0);
}

export function shareKept(estimate: TakeHomeEstimate): number {
	if (estimate.grossEarnings <= 0) return 0;
	return Math.max(0, estimate.takeHome) / estimate.grossEarnings;
}
