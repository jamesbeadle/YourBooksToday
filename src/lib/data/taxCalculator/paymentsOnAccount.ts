import { roundToPence } from '$lib/data/accounting/money';
import { paymentsOnAccountRules } from './sharedRules';
import type { TaxEstimate } from './taxEstimate';

export type PaymentsOnAccount = {
	eachPayment: number;
	firstDueOn: string;
	secondDueOn: string;
};

const numberOfPaymentsOnAccount = 2;

export function paymentsOnAccountFor(estimate: TaxEstimate): PaymentsOnAccount | null {
	if (!isAskedForPaymentsOnAccount(estimate)) return null;
	return {
		eachPayment: roundToPence(estimate.balanceDue / numberOfPaymentsOnAccount),
		firstDueOn: estimate.rules.balancingPaymentDueOn,
		secondDueOn: estimate.rules.secondPaymentOnAccountDueOn
	};
}

function isAskedForPaymentsOnAccount(estimate: TaxEstimate): boolean {
	if (estimate.outcome !== 'taxDue') return false;
	if (estimate.balanceDue < paymentsOnAccountRules.smallestBillThatNeedsThem) return false;
	const exemptingDeductions = roundToPence(
		estimate.taxAndNationalInsurance * paymentsOnAccountRules.shareCollectedAtSourceThatExempts
	);
	return estimate.inputs.annualCisDeductions < exemptingDeductions;
}
