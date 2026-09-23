import { roundToPence } from '$lib/data/accounting/money';
import { employmentPayFor, type EmploymentPay } from './employmentPay';
import {
	bandsExtendedByPensionRelief,
	calculateIncomeTax,
	fullPersonalAllowanceFor,
	type IncomeTaxCalculation
} from './incomeTax';
import { calculateNationalInsurance, type NationalInsuranceCalculation } from './nationalInsurance';
import { selfAssessmentBillFor, type SelfAssessmentBill } from './selfAssessmentBill';
import { selfEmploymentProfitFor, type SelfEmploymentProfit } from './selfEmploymentProfit';
import { repayStudentLoans, totalOf, type StudentLoanRepayment } from './studentLoans';
import type { TakeHomeInputs } from './takeHomeInputs';
import { rulesFor } from './taxYearRules';
import type { TaxBand, TaxYearRules } from './taxRuleTypes';

export type TakeHomeEstimate = {
	inputs: TakeHomeInputs;
	rules: TaxYearRules;
	bands: TaxBand[];
	employment: EmploymentPay;
	selfEmployment: SelfEmploymentProfit | null;
	grossEarnings: number;
	adjustedNetIncome: number;
	personalAllowanceUsed: number;
	taxableIncome: number;
	incomeTax: IncomeTaxCalculation;
	class1: NationalInsuranceCalculation;
	class4: NationalInsuranceCalculation;
	studentLoans: StudentLoanRepayment[];
	pensionCost: number;
	takeHome: number;
	selfAssessment: SelfAssessmentBill | null;
};

export function estimateTakeHome(inputs: TakeHomeInputs): TakeHomeEstimate {
	const rules = rulesFor(inputs.taxYear);
	const employment = employmentPayFor(inputs);
	const selfEmployment = selfEmploymentProfitFor(inputs, rules);
	const taxableProfit = selfEmployment?.taxableProfit ?? 0;
	const incomeTaxPosition = incomeTaxPositionFor(inputs, rules, employment.taxablePay + taxableProfit, selfEmployment);
	const class1 = calculateNationalInsurance(employment.grossPay, rules.nationalInsurance.class1);
	const class4 = calculateNationalInsurance(taxableProfit, rules.nationalInsurance.class4);
	const studentLoans = repayStudentLoans(employment.grossPay + taxableProfit, inputs.studentLoans, rules.studentLoans);
	const pensionCost = roundToPence(employment.pensionContribution + (selfEmployment?.pensionNetCost ?? 0));
	const deductions = incomeTaxPosition.incomeTax.total + class1.total + class4.total + totalOf(studentLoans) + pensionCost;
	const earningsInHand = employment.grossPay + (selfEmployment?.profit ?? 0);
	const estimate = {
		inputs,
		rules,
		employment,
		selfEmployment,
		...incomeTaxPosition,
		grossEarnings: roundToPence(employment.grossPay + taxableProfit),
		class1,
		class4,
		studentLoans,
		pensionCost,
		takeHome: roundToPence(earningsInHand - deductions)
	};
	return { ...estimate, selfAssessment: selfAssessmentBillFor(estimate) };
}

function incomeTaxPositionFor(
	inputs: TakeHomeInputs,
	rules: TaxYearRules,
	incomeBeforeAllowance: number,
	selfEmployment: SelfEmploymentProfit | null
) {
	const totalIncome = roundToPence(incomeBeforeAllowance);
	const reliefAtSource = selfEmployment?.pensionGrossContribution ?? 0;
	const adjustedNetIncome = roundToPence(totalIncome - reliefAtSource);
	const personalAllowanceUsed = Math.min(totalIncome, fullPersonalAllowanceFor(adjustedNetIncome, rules.incomeTax));
	const taxableIncome = roundToPence(totalIncome - personalAllowanceUsed);
	const bands = bandsFor(inputs, rules, reliefAtSource);
	return { bands, adjustedNetIncome, personalAllowanceUsed, taxableIncome, incomeTax: calculateIncomeTax(taxableIncome, bands) };
}

function bandsFor(inputs: TakeHomeInputs, rules: TaxYearRules, reliefAtSource: number): TaxBand[] {
	const regionalBands = rules.incomeTax.bandsByRegion[inputs.taxRegion];
	return bandsExtendedByPensionRelief(regionalBands, reliefAtSource, rules.incomeTax.pensionReliefAtSourceRate);
}
