import { describe, expect, it } from 'vitest';
import { calculateIncomeTax, fullPersonalAllowanceFor, personalAllowanceUsedBy } from './incomeTax';
import { sharedIncomeTaxRules } from './sharedRules';

const incomeTaxOnProfit = (profit: number) =>
	calculateIncomeTax(profit - personalAllowanceUsedBy(profit, sharedIncomeTaxRules), sharedIncomeTaxRules)
		.total;

describe('fullPersonalAllowanceFor', () => {
	it('keeps the whole £12,570 up to £100,000', () => {
		expect(fullPersonalAllowanceFor(100000, sharedIncomeTaxRules)).toBe(12570);
	});

	it('loses nothing for a single pound over, because it goes £1 for every whole £2', () => {
		expect(fullPersonalAllowanceFor(100001, sharedIncomeTaxRules)).toBe(12570);
		expect(fullPersonalAllowanceFor(100002, sharedIncomeTaxRules)).toBe(12569);
	});

	it('is £7,570 at £110,000 (£12,570 less half of £10,000)', () => {
		expect(fullPersonalAllowanceFor(110000, sharedIncomeTaxRules)).toBe(7570);
	});

	it('is gone at £125,140', () => {
		expect(fullPersonalAllowanceFor(125140, sharedIncomeTaxRules)).toBe(0);
	});
});

describe('personalAllowanceUsedBy', () => {
	it('uses no more allowance than there is profit', () => {
		expect(personalAllowanceUsedBy(5000, sharedIncomeTaxRules)).toBe(5000);
	});
});

describe('income tax on profit, England, Wales and Northern Ireland', () => {
	it('is nothing at the personal allowance', () => {
		expect(incomeTaxOnProfit(12570)).toBe(0);
	});

	it('is £3,486 at £30,000 (20% of £17,430)', () => {
		expect(incomeTaxOnProfit(30000)).toBe(3486);
	});

	it('is £7,540 at £50,270, the top of the basic rate band (20% of £37,700)', () => {
		expect(incomeTaxOnProfit(50270)).toBe(7540);
	});

	it('is £11,432 at £60,000 (£7,540 + 40% of £9,730)', () => {
		expect(incomeTaxOnProfit(60000)).toBe(11432);
	});

	it('is £27,432 at £100,000 (£7,540 + 40% of £49,730)', () => {
		expect(incomeTaxOnProfit(100000)).toBe(27432);
	});

	it('is £33,432 at £110,000: the basic band stays £37,700 when the allowance tapers', () => {
		expect(incomeTaxOnProfit(110000)).toBe(33432);
	});

	it('is £42,516 at £125,140 (£7,540 + 40% of £87,440)', () => {
		expect(incomeTaxOnProfit(125140)).toBe(42516);
	});

	it('is £44,703 at £130,000 (£42,516 + 45% of £4,860)', () => {
		expect(incomeTaxOnProfit(130000)).toBe(44703);
	});
});
