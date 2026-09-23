import { roundToPence } from '$lib/data/accounting/money';
import type { SelfAssessmentBill } from './selfAssessmentBill';
import { averageDaysPerMonth, daysBetween, endOfDayOn } from './taxDates';

export type PaymentPlan = {
	amountDue: number;
	dueOn: string;
	isOverdue: boolean;
	daysRemaining: number;
	monthsRemaining: number;
	monthlySetAside: number;
};

const fewestMonthsToSpreadOver = 1;

export function planPayment(bill: SelfAssessmentBill, dueOn: string, today: Date): PaymentPlan | null {
	if (bill.outcome !== 'taxDue' || bill.balanceDue <= 0) return null;
	const daysRemaining = daysBetween(today, endOfDayOn(dueOn));
	const monthsRemaining = Math.round(daysRemaining / averageDaysPerMonth);
	const monthsToSpreadOver = Math.max(fewestMonthsToSpreadOver, monthsRemaining);
	return {
		amountDue: bill.balanceDue,
		dueOn,
		isOverdue: daysRemaining < 0,
		daysRemaining: Math.max(1, Math.ceil(daysRemaining)),
		monthsRemaining,
		monthlySetAside: roundToPence(bill.balanceDue / monthsToSpreadOver)
	};
}

export function shareOfProfitToSetAside(bill: SelfAssessmentBill): number | null {
	if (bill.profit <= 0) return null;
	return Math.max(0, bill.balanceDue) / bill.profit;
}
