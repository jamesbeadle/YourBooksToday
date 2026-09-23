import { ruleSources } from './ruleSources';
import { sharedHomeWorkingRules, sharedIncomeTaxRules, sharedClass4Rules } from './sharedRules';
import type { TaxYearRules } from './taxYearRules';

export const rulesFor2026To2027: TaxYearRules = {
	taxYear: '2026/27',
	label: '2026/27 tax year (6 April 2026 to 5 April 2027)',
	datesCovered: '6 April 2026 to 5 April 2027',
	startsOn: '2026-04-06',
	balancingPaymentDueOn: '2028-01-31',
	secondPaymentOnAccountDueOn: '2028-07-31',
	verifiedOn: '2026-09-23',
	incomeTax: sharedIncomeTaxRules,
	class4: sharedClass4Rules,
	class2: {
		weeklyRate: 3.65,
		smallProfitsThreshold: 7105,
		sourceUrl: ruleSources.nationalInsurance
	},
	mileage: {
		carOrVanFirstMiles: 10000,
		carOrVanFirstMilesRate: 0.55,
		carOrVanLaterMilesRate: 0.25,
		motorcycleRate: 0.24,
		bicycleRate: 0.2,
		sourceUrl: ruleSources.approvedMileageRates
	},
	homeWorking: sharedHomeWorkingRules,
	makingTaxDigital: {
		qualifyingIncomeThreshold: 20000,
		appliesFrom: '2028-04-06',
		sourceUrl: ruleSources.makingTaxDigital
	}
};
