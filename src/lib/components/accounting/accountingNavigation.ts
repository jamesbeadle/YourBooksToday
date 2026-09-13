import type { NavigationLink } from '$lib/components/site/navigationLink';

export const accountingNavigationLinks: NavigationLink[] = [
	{ href: '/dashboard', label: 'Overview' },
	{ href: '/invoices', label: 'Invoices' },
	{ href: '/clients', label: 'Clients' },
	{ href: '/expenses', label: 'Expenses' },
	{ href: '/journals', label: 'Journals' },
	{ href: '/reports', label: 'Reports' },
	{ href: '/cost-centres', label: 'Cost centres' },
	{ href: '/ledger', label: 'Ledger' },
	{ href: '/settings', label: 'Settings' }
];

export function isAccountingLinkActive(linkHref: string, currentPath: string): boolean {
	if (linkHref === '/dashboard') return currentPath === '/dashboard';
	return currentPath.startsWith(linkHref);
}
