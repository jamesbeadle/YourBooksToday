export type ResultPeriod = 'monthly' | 'yearly' | 'weekly';

export const resultPeriodOptions: { period: ResultPeriod; label: string; noun: string; periodsPerYear: number }[] = [
	{ period: 'monthly', label: 'Monthly', noun: 'month', periodsPerYear: 12 },
	{ period: 'yearly', label: 'Yearly', noun: 'year', periodsPerYear: 1 },
	{ period: 'weekly', label: 'Weekly', noun: 'week', periodsPerYear: 52 }
];

export const monthsPerYear = 12;

export function resultPeriodOption(period: ResultPeriod) {
	return resultPeriodOptions.find((option) => option.period === period) ?? resultPeriodOptions[0];
}

export function perPeriod(annualAmount: number, period: ResultPeriod): number {
	return annualAmount / resultPeriodOption(period).periodsPerYear;
}
