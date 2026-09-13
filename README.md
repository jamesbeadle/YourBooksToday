# Your Books Today (YBT)

Double-entry bookkeeping for a small business. Invoices, expenses, journals, a profit and
loss and a balance sheet, kept in one ledger — and an MCP server that lets an assistant
raise, post and explain any of them.

## Status

One company keeps its books here. The multi-tenant version comes later.

- Sign in with Google, or with an email address and a password;
  [docs/auth-setup.md](./docs/auth-setup.md) and
  [docs/google-login-setup.md](./docs/google-login-setup.md) cover the provider configuration.
- The books live at `/dashboard`, with `/invoices`, `/clients`, `/expenses`, `/journals`,
  `/reports`, `/cost-centres`, `/ledger` and `/settings` under it. Everything that posts
  writes a balanced journal; nothing keeps a second copy of a total.
- An assistant reaches the same ledger over MCP at `/api/mcp`, authorised by OAuth;
  [docs/mcp-architecture.md](./docs/mcp-architecture.md) is the design.
- `/admin` is where accounts are made bookkeepers, restricted or deleted;
  [docs/admin-runbook.md](./docs/admin-runbook.md) covers the day-to-day.

## The ledger

Every screen is a view onto `journals` and `journal_lines`, joined through the
`ledger_entries` view. An invoice, a payment, an expense, an accrual and its release are
each a journal of their own kind. The profit and loss and the balance sheet are built by
summing entries, never by reading a running total, so a balance sheet that does not balance
says so instead of rounding.

## Running it

```
npm install
npm run dev
```

`.env.example` lists what the app needs. `migrations/` holds the schema; apply a migration
by hand to the live database and label the pull request `migration-reviewed` — the
migration gate in CI refuses an unreviewed one.

## Conventions

[CLAUDE.md](./CLAUDE.md) is how the code is written here. Read it before changing anything.
