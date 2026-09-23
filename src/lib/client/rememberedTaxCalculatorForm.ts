import { taxYearNames } from '$lib/data/taxCalculator/taxYearRules';
import type { RememberedTaxCalculatorForm } from './taxCalculatorForm.svelte';

const storageKey = 'ybt-tax-calculator';

export function saveForThisVisit(form: RememberedTaxCalculatorForm): void {
	try {
		sessionStorage.setItem(storageKey, JSON.stringify(form));
	} catch {
		return;
	}
}

export function recallFromThisVisit(): Partial<RememberedTaxCalculatorForm> {
	try {
		const remembered = JSON.parse(sessionStorage.getItem(storageKey) ?? '{}');
		return withKnownTaxYearOnly(remembered);
	} catch {
		return {};
	}
}

function withKnownTaxYearOnly(
	remembered: Partial<RememberedTaxCalculatorForm>
): Partial<RememberedTaxCalculatorForm> {
	if (remembered.taxYear === undefined || taxYearNames.includes(remembered.taxYear)) return remembered;
	return { ...remembered, taxYear: undefined };
}
