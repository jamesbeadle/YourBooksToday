import { roundToPence } from '$lib/data/accounting/money';
import { claimHomeWorking, claimMileage, type HomeWorkingClaim, type MileageClaim } from './allowableClaims';
import { calculateClass4, type Class4Calculation } from './class4NationalInsurance';
import { calculateIncomeTax, personalAllowanceUsedBy, type IncomeTaxCalculation } from './incomeTax';
import type { TaxEstimateInputs } from './taxEstimateInputs';
import { rulesFor, type TaxYearRules } from './taxYearRules';

export type EstimateOutcome = 'taxDue' | 'refund' | 'loss';

export type TaxEstimate = {
	inputs: TaxEstimateInputs;
	rules: TaxYearRules;
	mileage: MileageClaim;
	homeWorking: HomeWorkingClaim;
	profit: number;
	personalAllowanceUsed: number;
	taxableIncome: number;
	incomeTax: IncomeTaxCalculation;
	class4: Class4Calculation;
	taxAndNationalInsurance: number;
	balanceDue: number;
	outcome: EstimateOutcome;
};

export function estimateTax(inputs: TaxEstimateInputs): TaxEstimate {
	const rules = rulesFor(inputs.taxYear);
	const mileage = claimMileage(inputs.vehicleType, inputs.annualBusinessMiles, rules.mileage);
	const homeWorking = claimHomeWorking(inputs.homeWorkingBand, rules.homeWorking);
	const profit = roundToPence(
		inputs.annualIncome - inputs.annualExpenses - mileage.amount - homeWorking.amount
	);
	const taxableProfit = Math.max(0, profit);
	const personalAllowanceUsed = personalAllowanceUsedBy(taxableProfit, rules.incomeTax);
	const taxableIncome = roundToPence(taxableProfit - personalAllowanceUsed);
	const incomeTax = calculateIncomeTax(taxableIncome, rules.incomeTax);
	const class4 = calculateClass4(taxableProfit, rules.class4);
	const taxAndNationalInsurance = roundToPence(incomeTax.total + class4.total);
	const balanceDue = roundToPence(taxAndNationalInsurance - inputs.annualCisDeductions);
	return {
		inputs,
		rules,
		mileage,
		homeWorking,
		profit,
		personalAllowanceUsed,
		taxableIncome,
		incomeTax,
		class4,
		taxAndNationalInsurance,
		balanceDue,
		outcome: outcomeOf(profit, balanceDue)
	};
}

export function effectiveTaxRateOf(estimate: TaxEstimate): number | null {
	if (estimate.profit <= 0) return null;
	return estimate.taxAndNationalInsurance / estimate.profit;
}

function outcomeOf(profit: number, balanceDue: number): EstimateOutcome {
	if (profit < 0) return 'loss';
	if (balanceDue < 0) return 'refund';
	return 'taxDue';
}
