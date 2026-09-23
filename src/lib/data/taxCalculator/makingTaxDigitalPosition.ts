import { earliestMakingTaxDigitalRules } from './sharedRules';
import type { TaxEstimate } from './taxEstimate';

export type MakingTaxDigitalPosition = {
	isBroughtInByThisIncome: boolean;
	appliesFrom: string;
	qualifyingIncomeThreshold: number;
	isOverEarliestThreshold: boolean;
};

export function makingTaxDigitalPositionFor(estimate: TaxEstimate): MakingTaxDigitalPosition {
	const qualifyingIncome = estimate.inputs.annualIncome;
	const rules = estimate.rules.makingTaxDigital;
	return {
		isBroughtInByThisIncome: qualifyingIncome > rules.qualifyingIncomeThreshold,
		appliesFrom: rules.appliesFrom,
		qualifyingIncomeThreshold: rules.qualifyingIncomeThreshold,
		isOverEarliestThreshold: qualifyingIncome > earliestMakingTaxDigitalRules.qualifyingIncomeThreshold
	};
}
