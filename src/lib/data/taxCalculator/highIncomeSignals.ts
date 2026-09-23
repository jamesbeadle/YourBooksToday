import type { TaxEstimate } from './taxEstimate';

export function isPersonalAllowanceTapered(estimate: TaxEstimate): boolean {
	return estimate.profit > estimate.rules.incomeTax.personalAllowanceTaperThreshold;
}

export function isPayingHigherRates(estimate: TaxEstimate): boolean {
	return estimate.incomeTax.higherRate.amount > 0;
}
