import { describe, expect, it } from 'vitest';
import { class2PositionFor } from './class2Position';
import { makingTaxDigitalPositionFor } from './makingTaxDigitalPosition';
import { planPayment } from './paymentPlan';
import { paymentsOnAccountFor } from './paymentsOnAccount';
import { estimateTax } from './taxEstimate';
import type { TaxEstimateInputs } from './taxEstimateInputs';
import type { TaxYearName } from './taxYearRules';

const estimateFor = (taxYear: TaxYearName, annualIncome: number, annualCisDeductions = 0) =>
	estimateTax({
		taxYear,
		tradingStatus: annualCisDeductions > 0 ? 'cisSubcontractor' : 'soleTrader',
		annualIncome,
		annualExpenses: 0,
		annualCisDeductions,
		annualBusinessMiles: 0,
		vehicleType: 'none',
		homeWorkingBand: 'under25Hours'
	} satisfies TaxEstimateInputs);

describe('planPayment', () => {
	const twentyThirdSeptember2026 = new Date(2026, 8, 23);

	it('spreads £4,531.80 due 31/01/2027 over the 4 months left: £1,132.95 a month', () => {
		const plan = planPayment(estimateFor('2025/26', 30000), twentyThirdSeptember2026);
		expect(plan?.monthsRemaining).toBe(4);
		expect(plan?.monthlySetAside).toBe(1132.95);
		expect(plan?.isOverdue).toBe(false);
	});

	it('has no plan when a refund is due', () => {
		expect(planPayment(estimateFor('2025/26', 30000, 6000), twentyThirdSeptember2026)).toBeNull();
	});

	it('is overdue after the 31 January deadline', () => {
		const plan = planPayment(estimateFor('2025/26', 30000), new Date(2027, 1, 1));
		expect(plan?.isOverdue).toBe(true);
	});
});

describe('paymentsOnAccountFor', () => {
	it('asks for two halves of a £4,531.80 bill: £2,265.90 each', () => {
		const payments = paymentsOnAccountFor(estimateFor('2026/27', 30000));
		expect(payments).toEqual({ eachPayment: 2265.9, firstDueOn: '2028-01-31', secondDueOn: '2028-07-31' });
	});

	it('is not asked for below a £1,000 bill (£16,000 profit owes £686 + £205.80)', () => {
		expect(paymentsOnAccountFor(estimateFor('2026/27', 16000))).toBeNull();
	});

	it('is not asked for when CIS covered 80% or more of the tax', () => {
		expect(paymentsOnAccountFor(estimateFor('2026/27', 60000, 11110.88))).toBeNull();
		expect(paymentsOnAccountFor(estimateFor('2026/27', 60000, 11000))).not.toBeNull();
	});
});

describe('class2PositionFor', () => {
	it('credits automatically at the £7,105 small profits threshold in 2026/27', () => {
		expect(class2PositionFor(estimateFor('2026/27', 7105))).toBe('creditedAutomatically');
		expect(class2PositionFor(estimateFor('2026/27', 7104))).toBe('belowSmallProfitsThreshold');
	});
});

describe('makingTaxDigitalPositionFor', () => {
	it('brings in 2025/26 income over £30,000 from 6 April 2027', () => {
		const position = makingTaxDigitalPositionFor(estimateFor('2025/26', 30001));
		expect(position.isBroughtInByThisIncome).toBe(true);
		expect(position.appliesFrom).toBe('2027-04-06');
	});

	it('brings in 2026/27 income over £20,000 from 6 April 2028', () => {
		expect(makingTaxDigitalPositionFor(estimateFor('2026/27', 20001)).appliesFrom).toBe('2028-04-06');
		expect(makingTaxDigitalPositionFor(estimateFor('2026/27', 20000)).isBroughtInByThisIncome).toBe(false);
	});
});
