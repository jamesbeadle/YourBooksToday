import { describe, expect, it } from 'vitest';
import { effectiveTaxRateOf, estimateTax } from './taxEstimate';
import type { TaxEstimateInputs } from './taxEstimateInputs';

const soleTraderEarning = (annualIncome: number, changes: Partial<TaxEstimateInputs> = {}) =>
	estimateTax({
		taxYear: '2026/27',
		tradingStatus: 'soleTrader',
		annualIncome,
		annualExpenses: 0,
		annualCisDeductions: 0,
		annualBusinessMiles: 0,
		vehicleType: 'none',
		homeWorkingBand: 'under25Hours',
		...changes
	});

describe('estimateTax', () => {
	it('owes £4,531.80 on £30,000 profit: £3,486 income tax and £1,045.80 Class 4 (6% of £17,430)', () => {
		const estimate = soleTraderEarning(30000);
		expect(estimate.class4.total).toBe(1045.8);
		expect(estimate.balanceDue).toBe(4531.8);
		expect(estimate.outcome).toBe('taxDue');
	});

	it('charges 2% Class 4 above £50,270: £2,262 + £194.60 = £2,456.60 at £60,000', () => {
		expect(soleTraderEarning(60000).class4.total).toBe(2456.6);
	});

	it('takes expenses, mileage and home working off before tax', () => {
		const estimate = soleTraderEarning(40000, {
			annualExpenses: 3000,
			vehicleType: 'carOrVan',
			annualBusinessMiles: 12000,
			homeWorkingBand: '101HoursOrMore'
		});
		expect(estimate.mileage.amount).toBe(6000);
		expect(estimate.homeWorking.amount).toBe(312);
		expect(estimate.profit).toBe(30688);
	});

	it('refunds £1,468.20 when £6,000 of CIS covered a £4,531.80 bill', () => {
		const estimate = soleTraderEarning(30000, {
			tradingStatus: 'cisSubcontractor',
			annualCisDeductions: 6000
		});
		expect(estimate.outcome).toBe('refund');
		expect(estimate.balanceDue).toBe(-1468.2);
	});

	it('refunds all the CIS after a trading loss', () => {
		const estimate = soleTraderEarning(10000, { annualExpenses: 12000, annualCisDeductions: 2000 });
		expect(estimate.outcome).toBe('loss');
		expect(estimate.profit).toBe(-2000);
		expect(estimate.balanceDue).toBe(-2000);
	});

	it('owes nothing below the personal allowance', () => {
		expect(soleTraderEarning(12000).balanceDue).toBe(0);
	});

	it('gives an effective rate of 15.106% at £30,000 (£4,531.80 ÷ £30,000)', () => {
		expect(effectiveTaxRateOf(soleTraderEarning(30000))).toBeCloseTo(0.15106, 5);
	});

	it('has no effective rate without a profit', () => {
		expect(effectiveTaxRateOf(soleTraderEarning(1000, { annualExpenses: 1000 }))).toBeNull();
	});
});
