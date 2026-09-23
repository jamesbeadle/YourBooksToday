import type { BreakdownRow, BreakdownScale } from './breakdownRow';
import { detail, line } from './breakdownRow';
import type { TaxEstimate } from './taxEstimate';
import { deducted, formatMiles, formatMoney, formatPencePerMile } from './taxCalculatorFormatting';

export function claimBreakdownRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	return [
		line('Income received', formatMoney(scale.of(estimate.inputs.annualIncome))),
		...expenseRows(estimate, scale),
		...mileageRows(estimate, scale),
		...homeWorkingRows(estimate, scale)
	];
}

function expenseRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	if (estimate.inputs.annualExpenses <= 0) return [];
	return [line('Less: business expenses', deducted(scale.of(estimate.inputs.annualExpenses)))];
}

function mileageRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	if (estimate.mileage.amount <= 0) return [];
	if (scale.isQuarterly) {
		return [
			line('Less: mileage claim', deducted(scale.of(estimate.mileage.amount))),
			detail('The annual mileage claim divided by 4 — the rate per mile applies to the whole year.')
		];
	}
	return estimate.mileage.portions.flatMap((portion) => [
		line(`Less: mileage at ${formatPencePerMile(portion.ratePerMile)}`, deducted(portion.amount)),
		detail(`${formatMiles(portion.miles)} at ${formatPencePerMile(portion.ratePerMile)} a mile`)
	]);
}

function homeWorkingRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	if (estimate.homeWorking.amount <= 0) return [];
	const claimRow = line('Less: working from home flat rate', deducted(scale.of(estimate.homeWorking.amount)));
	if (scale.isQuarterly) return [claimRow];
	return [claimRow, detail(`12 months at ${formatMoney(estimate.homeWorking.monthlyAmount)} a month`)];
}
