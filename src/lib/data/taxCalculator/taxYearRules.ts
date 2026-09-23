import { rulesFor2025To2026 } from './rulesFor2025To2026';
import { rulesFor2026To2027 } from './rulesFor2026To2027';
import { localDateFrom } from './taxDates';

export type TaxYearName = '2025/26' | '2026/27';

export type HomeWorkingBand = 'under25Hours' | '25To50Hours' | '51To100Hours' | '101HoursOrMore';

export type SourcedRules = { sourceUrl: string };

export type IncomeTaxRules = SourcedRules & {
	personalAllowance: number;
	personalAllowanceTaperThreshold: number;
	basicRateBand: number;
	additionalRateThreshold: number;
	basicRate: number;
	higherRate: number;
	additionalRate: number;
};

export type Class4Rules = SourcedRules & {
	lowerProfitsLimit: number;
	upperProfitsLimit: number;
	mainRate: number;
	additionalRate: number;
};

export type Class2Rules = SourcedRules & {
	weeklyRate: number;
	smallProfitsThreshold: number;
};

export type MileageRules = SourcedRules & {
	carOrVanFirstMiles: number;
	carOrVanFirstMilesRate: number;
	carOrVanLaterMilesRate: number;
	motorcycleRate: number;
	bicycleRate: number;
};

export type HomeWorkingRules = SourcedRules & {
	monthlyAmountByBand: Record<HomeWorkingBand, number>;
};

export type MakingTaxDigitalRules = SourcedRules & {
	qualifyingIncomeThreshold: number;
	appliesFrom: string;
};

export type TaxYearRules = {
	taxYear: TaxYearName;
	label: string;
	datesCovered: string;
	startsOn: string;
	balancingPaymentDueOn: string;
	secondPaymentOnAccountDueOn: string;
	verifiedOn: string;
	incomeTax: IncomeTaxRules;
	class4: Class4Rules;
	class2: Class2Rules;
	mileage: MileageRules;
	homeWorking: HomeWorkingRules;
	makingTaxDigital: MakingTaxDigitalRules;
};

export const taxYearRules: Record<TaxYearName, TaxYearRules> = {
	'2025/26': rulesFor2025To2026,
	'2026/27': rulesFor2026To2027
};

export const taxYearNames = Object.keys(taxYearRules) as TaxYearName[];

export function rulesFor(taxYear: TaxYearName): TaxYearRules {
	return taxYearRules[taxYear];
}

export function currentTaxYear(today: Date): TaxYearName {
	const startedYears = taxYearNames.filter((taxYear) => localDateFrom(rulesFor(taxYear).startsOn) <= today);
	return startedYears.at(-1) ?? taxYearNames[0];
}
