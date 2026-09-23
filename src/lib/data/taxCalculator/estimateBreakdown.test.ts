import { describe, expect, it } from 'vitest';
import { estimateBreakdown } from './estimateBreakdown';
import { estimateTax } from './taxEstimate';

const estimateOn = (annualIncome: number) =>
	estimateTax({
		taxYear: '2026/27',
		tradingStatus: 'soleTrader',
		annualIncome,
		annualExpenses: 0,
		annualCisDeductions: 0,
		annualBusinessMiles: 12000,
		vehicleType: 'carOrVan',
		homeWorkingBand: 'under25Hours'
	});

describe('estimateBreakdown', () => {
	it('shows each mileage rate on its own line for the year', () => {
		const labels = estimateBreakdown(estimateOn(40000), 'annual').map((row) => row.label);
		expect(labels).toContain('Less: mileage at 55p');
		expect(labels).toContain('Less: mileage at 25p');
	});

	it('explains the tapered allowance above £100,000', () => {
		const rows = estimateBreakdown(estimateOn(116000), 'annual');
		expect(rows.some((row) => row.label.includes('shrinks by £1 for every £2'))).toBe(true);
	});

	it('divides every figure by four in the quarterly view: £40,000 income is £10,000', () => {
		const firstRow = estimateBreakdown(estimateOn(40000), 'quarterly')[0];
		expect(firstRow).toEqual({ label: 'Income received', amount: '£10,000.00', kind: 'line' });
	});

	it('ends on the balance due', () => {
		const lastRow = estimateBreakdown(estimateOn(40000), 'annual').at(-1);
		expect(lastRow?.kind).toBe('total');
		expect(lastRow?.label).toBe('Balance due to HMRC');
	});
});
