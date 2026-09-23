import type { TaxEstimate } from './taxEstimate';

export type Class2Position = 'creditedAutomatically' | 'belowSmallProfitsThreshold' | 'tradingLoss';

export function class2PositionFor(estimate: TaxEstimate): Class2Position {
	if (estimate.outcome === 'loss') return 'tradingLoss';
	if (estimate.profit >= estimate.rules.class2.smallProfitsThreshold) return 'creditedAutomatically';
	return 'belowSmallProfitsThreshold';
}
