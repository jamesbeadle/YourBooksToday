import { accountingNavigationLinks } from '$lib/components/accounting/accountingNavigation';
import type { NavigationGroup, NavigationLink } from './navigationLink';

export type NavigationAccess = {
	isSignedIn: boolean;
	isBookkeeper: boolean;
	isAdmin: boolean;
};

export const primaryNavigationLinks: NavigationLink[] = [
	{ href: '/', label: 'Home' },
	{ href: '/contact', label: 'Contact' }
];

export function buildMenuGroups(access: NavigationAccess): NavigationGroup[] {
	const groups: NavigationGroup[] = [{ label: 'Explore', links: primaryNavigationLinks }];
	if (access.isBookkeeper) {
		groups.push({ label: 'Your books', links: bookkeepingLinks(access) });
	}
	groups.push({ label: 'Account', links: accountLinks(access) });
	return groups;
}

function bookkeepingLinks(access: NavigationAccess): NavigationLink[] {
	if (!access.isAdmin) return accountingNavigationLinks;
	return [...accountingNavigationLinks, { href: '/admin', label: 'Admin' }];
}

function accountLinks(access: NavigationAccess): NavigationLink[] {
	if (!access.isSignedIn) return [{ href: '/account/sign-in', label: 'Sign in' }];
	return [{ href: '/account', label: 'Account' }];
}
