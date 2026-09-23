import type { SelfAssessmentBill } from './selfAssessmentBill';
import type { NationalInsuranceRules } from './taxRuleTypes';

export type Class2Position = 'creditedAutomatically' | 'belowSmallProfitsThreshold' | 'tradingLoss';

export function class2PositionFor(bill: SelfAssessmentBill, rules: NationalInsuranceRules): Class2Position {
	if (bill.outcome === 'loss') return 'tradingLoss';
	if (bill.profit >= rules.smallProfitsThreshold) return 'creditedAutomatically';
	return 'belowSmallProfitsThreshold';
}
