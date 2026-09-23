export type AmountPeriod = 'annual' | 'quarterly' | 'monthly';

export const amountPeriodOptions: { period: AmountPeriod; label: string; periodsPerYear: number }[] = [
	{ period: 'annual', label: 'Annual', periodsPerYear: 1 },
	{ period: 'quarterly', label: 'Quarterly', periodsPerYear: 4 },
	{ period: 'monthly', label: 'Monthly', periodsPerYear: 12 }
];

export const quartersPerYear = 4;

export function periodsPerYearOf(period: AmountPeriod): number {
	return amountPeriodOptions.find((option) => option.period === period)?.periodsPerYear ?? 1;
}
