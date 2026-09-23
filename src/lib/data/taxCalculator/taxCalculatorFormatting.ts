import { formatMoney } from '$lib/data/accounting/money';

const britishLocale = 'en-GB';
const penceInPound = 100;
const percentInWhole = 100;

const wholePoundsFormatter = new Intl.NumberFormat(britishLocale, {
	style: 'currency',
	currency: 'GBP',
	maximumFractionDigits: 0
});

const countFormatter = new Intl.NumberFormat(britishLocale);

export { formatMoney };

export function formatWholePounds(amount: number): string {
	return wholePoundsFormatter.format(amount);
}

export function formatPencePerMile(poundsPerMile: number): string {
	return `${Math.round(poundsPerMile * penceInPound)}p`;
}

export function formatPercentage(rate: number, fractionDigits = 0): string {
	return `${(rate * percentInWhole).toFixed(fractionDigits)}%`;
}

export function formatMiles(miles: number): string {
	return `${countFormatter.format(miles)} miles`;
}

export function deducted(amount: number): string {
	return `−${formatMoney(amount)}`;
}
