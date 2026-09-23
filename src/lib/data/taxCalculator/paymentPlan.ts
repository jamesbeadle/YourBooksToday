import { roundToPence } from '$lib/data/accounting/money';
import { averageDaysPerMonth, daysBetween, endOfDayOn } from './taxDates';
import type { TaxEstimate } from './taxEstimate';

export type PaymentPlan = {
	amountDue: number;
	dueOn: string;
	isOverdue: boolean;
	daysRemaining: number;
	monthsRemaining: number;
	monthlySetAside: number;
	quarterlySetAside: number;
};

const monthsPerQuarter = 3;
const fewestMonthsToSpreadOver = 1;

export function planPayment(estimate: TaxEstimate, today: Date): PaymentPlan | null {
	if (estimate.outcome !== 'taxDue' || estimate.balanceDue <= 0) return null;
	const dueOn = estimate.rules.balancingPaymentDueOn;
	const daysRemaining = daysBetween(today, endOfDayOn(dueOn));
	const monthsRemaining = Math.round(daysRemaining / averageDaysPerMonth);
	const monthsToSpreadOver = Math.max(fewestMonthsToSpreadOver, monthsRemaining);
	const monthlySetAside = roundToPence(estimate.balanceDue / monthsToSpreadOver);
	return {
		amountDue: estimate.balanceDue,
		dueOn,
		isOverdue: daysRemaining < 0,
		daysRemaining: Math.max(1, Math.ceil(daysRemaining)),
		monthsRemaining,
		monthlySetAside,
		quarterlySetAside: roundToPence(monthlySetAside * monthsPerQuarter)
	};
}
