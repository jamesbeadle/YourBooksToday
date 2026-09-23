import { sliceBetween, sumOfSlices, type BandSlice } from './bandSlice';
import type { Class4Rules } from './taxYearRules';

export type Class4Calculation = {
	mainRate: BandSlice;
	additionalRate: BandSlice;
	total: number;
};

export function calculateClass4(profit: number, rules: Class4Rules): Class4Calculation {
	const mainRate = sliceBetween(profit, rules.lowerProfitsLimit, rules.upperProfitsLimit, rules.mainRate);
	const additionalRate = sliceBetween(
		profit,
		rules.upperProfitsLimit,
		Number.POSITIVE_INFINITY,
		rules.additionalRate
	);
	return { mainRate, additionalRate, total: sumOfSlices([mainRate, additionalRate]) };
}
