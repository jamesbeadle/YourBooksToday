import { roundToPence } from '$lib/data/accounting/money';
import { periodsPerYearOf, type AmountPeriod } from '$lib/data/taxCalculator/amountPeriods';

const largestSensibleAnnualAmount = 10_000_000;

export type RememberedPeriodAmount = { amount: number | null; period: AmountPeriod };

export class PeriodAmount {
	amount = $state<number | null>(null);
	period = $state<AmountPeriod>('annual');

	get isNegative(): boolean {
		return (this.amount ?? 0) < 0;
	}

	get isImplausiblyLarge(): boolean {
		return this.annualAmount > largestSensibleAnnualAmount;
	}

	get annualAmount(): number {
		return roundToPence(Math.max(0, this.amount ?? 0) * periodsPerYearOf(this.period));
	}

	get hasAmount(): boolean {
		return this.annualAmount > 0;
	}

	get errorMessage(): string | null {
		if (this.isNegative) return 'This can’t be negative.';
		if (this.isImplausiblyLarge) return 'This looks unusually high for a sole trader — please check it.';
		return null;
	}

	remembered(): RememberedPeriodAmount {
		return { amount: this.amount, period: this.period };
	}

	restore(remembered: RememberedPeriodAmount | undefined): void {
		if (remembered === undefined) return;
		this.amount = remembered.amount;
		this.period = remembered.period;
	}

	clear(): void {
		this.amount = null;
		this.period = 'annual';
	}
}
