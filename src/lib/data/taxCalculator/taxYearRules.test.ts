import { describe, expect, it } from 'vitest';
import { earliestMakingTaxDigitalRules, paymentsOnAccountRules } from './sharedRules';
import { currentTaxYear, taxYearNames, taxYearRules } from './taxYearRules';

const govUkPage = /^https:\/\/www\.gov\.uk\//;

describe('taxYearRules', () => {
	it.each(taxYearNames)('cites a gov.uk page for every group of %s rates', (taxYear) => {
		const rules = taxYearRules[taxYear];
		const ruleGroups = [
			rules.incomeTax,
			rules.class4,
			rules.class2,
			rules.mileage,
			rules.homeWorking,
			rules.makingTaxDigital
		];
		ruleGroups.forEach((ruleGroup) => expect(ruleGroup.sourceUrl).toMatch(govUkPage));
	});

	it('cites gov.uk for the rules shared across years', () => {
		expect(paymentsOnAccountRules.sourceUrl).toMatch(govUkPage);
		expect(earliestMakingTaxDigitalRules.sourceUrl).toMatch(govUkPage);
	});
});

describe('currentTaxYear', () => {
	it('is 2025/26 up to 5 April 2026 and 2026/27 from 6 April 2026', () => {
		expect(currentTaxYear(new Date(2026, 3, 5))).toBe('2025/26');
		expect(currentTaxYear(new Date(2026, 3, 6))).toBe('2026/27');
	});
});
