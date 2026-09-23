import { ruleSources } from './ruleSources';
import type { Class4Rules, HomeWorkingRules, IncomeTaxRules } from './taxYearRules';

export const sharedIncomeTaxRules: IncomeTaxRules = {
	personalAllowance: 12570,
	personalAllowanceTaperThreshold: 100000,
	basicRateBand: 37700,
	additionalRateThreshold: 125140,
	basicRate: 0.2,
	higherRate: 0.4,
	additionalRate: 0.45,
	sourceUrl: ruleSources.incomeTax
};

export const sharedClass4Rules: Class4Rules = {
	lowerProfitsLimit: 12570,
	upperProfitsLimit: 50270,
	mainRate: 0.06,
	additionalRate: 0.02,
	sourceUrl: ruleSources.nationalInsurance
};

export const sharedHomeWorkingRules: HomeWorkingRules = {
	monthlyAmountByBand: {
		under25Hours: 0,
		'25To50Hours': 10,
		'51To100Hours': 18,
		'101HoursOrMore': 26
	},
	sourceUrl: ruleSources.workingFromHome
};

export const paymentsOnAccountRules = {
	smallestBillThatNeedsThem: 1000,
	shareCollectedAtSourceThatExempts: 0.8,
	sourceUrl: ruleSources.paymentsOnAccount
};

export const earliestMakingTaxDigitalRules = {
	qualifyingIncomeThreshold: 50000,
	measuredOnTaxYear: '2024/25',
	appliesFrom: '2026-04-06',
	sourceUrl: ruleSources.makingTaxDigital
};
