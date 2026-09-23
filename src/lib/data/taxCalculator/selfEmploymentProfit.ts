import { roundToPence } from '$lib/data/accounting/money';
import { claimHomeWorking, claimMileage, type HomeWorkingClaim, type MileageClaim } from './allowableClaims';
import { hasSelfEmployment, type TakeHomeInputs } from './takeHomeInputs';
import type { TaxYearRules } from './taxRuleTypes';

export type SelfEmploymentProfit = {
	income: number;
	expenses: number;
	mileage: MileageClaim;
	homeWorking: HomeWorkingClaim;
	profit: number;
	taxableProfit: number;
	cisDeductions: number;
	pensionGrossContribution: number;
	pensionNetCost: number;
};

const percent = 100;

export function selfEmploymentProfitFor(inputs: TakeHomeInputs, rules: TaxYearRules): SelfEmploymentProfit | null {
	if (!hasSelfEmployment(inputs)) return null;
	const trade = inputs.selfEmployment;
	const mileage = claimMileage(trade.vehicleType, trade.annualBusinessMiles, rules.mileage);
	const homeWorking = claimHomeWorking(trade.homeWorkingBand, rules.homeWorking);
	const profit = roundToPence(trade.annualIncome - trade.annualExpenses - mileage.amount - homeWorking.amount);
	const taxableProfit = Math.max(0, profit);
	const pensionGrossContribution = pensionFromProfit(inputs, taxableProfit);
	return {
		income: trade.annualIncome,
		expenses: trade.annualExpenses,
		mileage,
		homeWorking,
		profit,
		taxableProfit,
		cisDeductions: trade.tradingStatus === 'cisSubcontractor' ? trade.annualCisDeductions : 0,
		pensionGrossContribution,
		pensionNetCost: roundToPence(pensionGrossContribution * (1 - rules.incomeTax.pensionReliefAtSourceRate))
	};
}

function pensionFromProfit(inputs: TakeHomeInputs, taxableProfit: number): number {
	if (inputs.earningType !== 'selfEmployed') return 0;
	return roundToPence((taxableProfit * inputs.pensionPercentage) / percent);
}
