import { actionsFor, areasFor } from './actionRegistry';
import type { McpCaller } from './resolveMcpCaller';

export function describeContext(caller: McpCaller): string {
	return [
		`Signed in as ${caller.email}.`,
		standingLine(caller),
		`Areas you can reach: ${areasFor(caller).join(', ')}.`,
		`${actionsFor(caller, null).length} actions are available to you — call list_actions to see them.`
	].join('\n');
}

function standingLine(caller: McpCaller): string {
	const standing = caller.isAdmin ? 'an administrator' : 'a bookkeeper';
	return `You are ${standing} at Your Books Today, so you are keeping the books: invoices, expenses, journals and the reports that come out of them.`;
}
