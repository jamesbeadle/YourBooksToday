import type { SupabaseClient } from '@supabase/supabase-js';

export type McpRole = 'bookkeeper' | 'none';

export type AccountStanding = {
	accountId: string;
	email: string;
	role: McpRole;
	isAdmin: boolean;
};

export async function resolveAccountStanding(
	supabase: SupabaseClient,
	accountId: string
): Promise<AccountStanding> {
	const { data, error } = await supabase
		.from('profiles')
		.select('email, is_staff, is_admin, is_restricted')
		.eq('id', accountId)
		.maybeSingle();
	if (error) throw error;
	const email = data?.email ?? '';
	if (data?.is_restricted === true) return nobody(accountId, email);
	const keepsTheBooks = data?.is_staff === true || data?.is_admin === true;
	if (!keepsTheBooks) return nobody(accountId, email);
	return { accountId, email, role: 'bookkeeper', isAdmin: data.is_admin === true };
}

function nobody(accountId: string, email: string): AccountStanding {
	return { accountId, email, role: 'none', isAdmin: false };
}
