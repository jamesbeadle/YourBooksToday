import { ruleSources } from './ruleSources';
import { sharedHomeWorkingRules, sharedIncomeTaxRules, sharedClass4Rules } from './sharedRules';
import type { TaxYearRules } from './taxYearRules';

export const rulesFor2025To2026: TaxYearRules = {
	taxYear: '2025/26',
	label: '2025/26 tax year (6 April 2025 to 5 April 2026)',
	datesCovered: '6 April 2025 to 5 April 2026',
	startsOn: '2025-04-06',
	balancingPaymentDueOn: '2027-01-31',
	secondPaymentOnAccountDueOn: '2027-07-31',
	verifiedOn: '2026-09-23',
	incomeTax: sharedIncomeTaxRules,
	class4: sharedClass4Rules,
	class2: {
		weeklyRate: 3.5,
		smallProfitsThreshold: 6845,
		sourceUrl: ruleSources.nationalInsurance
	},
	mileage: {
		carOrVanFirstMiles: 10000,
		carOrVanFirstMilesRate: 0.45,
		carOrVanLaterMilesRate: 0.25,
		motorcycleRate: 0.24,
		bicycleRate: 0.2,
		sourceUrl: ruleSources.approvedMileageRates
	},
	homeWorking: sharedHomeWorkingRules,
	makingTaxDigital: {
		qualifyingIncomeThreshold: 30000,
		appliesFrom: '2027-04-06',
		sourceUrl: ruleSources.makingTaxDigital
	}
};
