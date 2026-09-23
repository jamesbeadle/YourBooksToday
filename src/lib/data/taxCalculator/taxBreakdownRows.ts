import type { BandSlice } from './bandSlice';
import type { BreakdownRow, BreakdownScale } from './breakdownRow';
import { detail, line, subtotal, total } from './breakdownRow';
import { isPersonalAllowanceTapered } from './highIncomeSignals';
import type { TaxEstimate } from './taxEstimate';
import { deducted, formatMoney, formatPercentage, formatWholePounds } from './taxCalculatorFormatting';

export function taxBreakdownRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	const { incomeTax, class4 } = estimate;
	return [
		subtotal('Profit', formatMoney(scale.of(estimate.profit))),
		line('Less: personal allowance', deducted(scale.of(estimate.personalAllowanceUsed))),
		...taperRows(estimate, scale),
		subtotal('Taxable income', formatMoney(scale.of(estimate.taxableIncome))),
		...sliceRows('Income tax at', [incomeTax.basicRate, incomeTax.higherRate, incomeTax.additionalRate], scale),
		...sliceRows('Class 4 NI at', [class4.mainRate, class4.additionalRate], scale),
		subtotal('Income tax and Class 4 NI', formatMoney(scale.of(estimate.taxAndNationalInsurance))),
		...cisRows(estimate, scale),
		balanceRow(estimate, scale)
	];
}

export function lossBreakdownRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	const refund = estimate.inputs.annualCisDeductions;
	const lossRow = subtotal('Trading loss', deducted(scale.of(Math.abs(estimate.profit))));
	if (refund <= 0) return [lossRow];
	return [
		lossRow,
		line('CIS already deducted', formatMoney(scale.of(refund))),
		total('Estimated CIS refund', formatMoney(scale.of(refund)))
	];
}

function taperRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	if (scale.isQuarterly || !isPersonalAllowanceTapered(estimate)) return [];
	const rules = estimate.rules.incomeTax;
	return [
		detail(
			`Your profit is over ${formatWholePounds(rules.personalAllowanceTaperThreshold)}, so the ${formatWholePounds(rules.personalAllowance)} allowance shrinks by £1 for every £2 above it.`
		)
	];
}

function sliceRows(prefix: string, slices: BandSlice[], scale: BreakdownScale): BreakdownRow[] {
	return slices
		.filter((slice) => slice.amount > 0)
		.map((slice) =>
			line(
				`${prefix} ${formatPercentage(slice.rate)} on ${formatMoney(scale.of(slice.amount))}`,
				formatMoney(scale.of(slice.tax))
			)
		);
}

function cisRows(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow[] {
	if (estimate.inputs.annualCisDeductions <= 0) return [];
	return [line('Less: CIS already deducted', deducted(scale.of(estimate.inputs.annualCisDeductions)))];
}

function balanceRow(estimate: TaxEstimate, scale: BreakdownScale): BreakdownRow {
	const balance = formatMoney(scale.of(Math.abs(estimate.balanceDue)));
	if (estimate.outcome === 'refund') return total('Estimated refund from HMRC', balance);
	return total('Balance due to HMRC', balance);
}
