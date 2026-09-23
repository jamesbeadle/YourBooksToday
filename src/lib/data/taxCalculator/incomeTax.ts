import { sliceBetween, sumOfSlices, type BandSlice } from './bandSlice';
import type { IncomeTaxRules } from './taxYearRules';

export type IncomeTaxCalculation = {
	basicRate: BandSlice;
	higherRate: BandSlice;
	additionalRate: BandSlice;
	total: number;
};

const poundsOfIncomePerPoundOfAllowanceLost = 2;

export function fullPersonalAllowanceFor(profit: number, rules: IncomeTaxRules): number {
	const incomeOverTaperThreshold = Math.max(0, profit - rules.personalAllowanceTaperThreshold);
	const allowanceLost = Math.floor(incomeOverTaperThreshold / poundsOfIncomePerPoundOfAllowanceLost);
	return Math.max(0, rules.personalAllowance - allowanceLost);
}

export function personalAllowanceUsedBy(profit: number, rules: IncomeTaxRules): number {
	return Math.min(Math.max(0, profit), fullPersonalAllowanceFor(profit, rules));
}

export function calculateIncomeTax(taxableIncome: number, rules: IncomeTaxRules): IncomeTaxCalculation {
	const basicRate = sliceBetween(taxableIncome, 0, rules.basicRateBand, rules.basicRate);
	const higherRate = sliceBetween(
		taxableIncome,
		rules.basicRateBand,
		rules.additionalRateThreshold,
		rules.higherRate
	);
	const additionalRate = sliceBetween(
		taxableIncome,
		rules.additionalRateThreshold,
		Number.POSITIVE_INFINITY,
		rules.additionalRate
	);
	return {
		basicRate,
		higherRate,
		additionalRate,
		total: sumOfSlices([basicRate, higherRate, additionalRate])
	};
}
