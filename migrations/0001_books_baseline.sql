-- The books as they stand on the day this repository was split out of Your Business Today.
-- Applied to the YourBooksToday Supabase project on 13 September 2026.

create table public.profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	email text not null,
	created_at timestamptz not null default now(),
	is_admin boolean not null default false,
	is_restricted boolean not null default false,
	is_staff boolean not null default false,
	display_name text not null default ''
);

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
	insert into profiles (id, email, is_admin)
	values (new.id, coalesce(new.email, ''),
		coalesce(new.email, '') = 'jamesbeadle1989@gmail.com');
	return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create function public.assert_admin() returns void
language plpgsql stable security definer set search_path to 'public' as $$
begin
	if not exists (select 1 from profiles where id = auth.uid() and is_admin) then
		raise exception 'not_an_administrator';
	end if;
end;
$$;

create function public.is_accounting_admin() returns boolean
language sql stable security definer set search_path to 'public' as $$
	select exists (select 1 from profiles where id = auth.uid() and is_admin and not is_restricted);
$$;

create function public.set_display_name(new_display_name text) returns void
language sql security definer set search_path to 'public' as $$
	update public.profiles set display_name = trim(new_display_name) where id = auth.uid();
$$;

create table public.oauth_clients (
	client_id text primary key,
	client_secret_hash text,
	client_name text not null default '',
	redirect_uris text[] not null default '{}'::text[],
	created_at timestamptz not null default now()
);

create table public.oauth_authorization_codes (
	code_hash text primary key,
	client_id text not null references public.oauth_clients(client_id) on delete cascade,
	account_id uuid not null references auth.users(id) on delete cascade,
	redirect_uri text not null,
	code_challenge text not null,
	code_challenge_method text not null default 'S256',
	expires_at timestamptz not null,
	used_at timestamptz,
	created_at timestamptz not null default now()
);

create table public.oauth_tokens (
	id uuid primary key default gen_random_uuid(),
	token_hash text not null unique,
	kind text not null check (kind in ('access', 'refresh')),
	client_id text not null references public.oauth_clients(client_id) on delete cascade,
	account_id uuid not null references auth.users(id) on delete cascade,
	expires_at timestamptz,
	revoked_at timestamptz,
	last_used_at timestamptz,
	created_at timestamptz not null default now()
);

create index oauth_tokens_account_id_idx on public.oauth_tokens (account_id);

create table public.clients (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	contact_name text not null default '',
	email text not null default '',
	address text not null default '',
	is_archived boolean not null default false,
	created_at timestamptz not null default now()
);

create table public.accounting_settings (
	id boolean primary key default true check (id),
	company_name text not null default '',
	company_address text not null default '',
	company_email text not null default '',
	payment_instructions text not null default '',
	payment_terms_days integer not null default 30,
	financial_year_start_month integer not null default 4
		check (financial_year_start_month between 1 and 12),
	invoice_prefix text not null default 'INV',
	next_invoice_number integer not null default 1,
	bank_account_name text not null default '',
	bank_account_number text not null default '',
	bank_sort_code text not null default '',
	updated_at timestamptz not null default now()
);

create table public.ledger_accounts (
	id uuid primary key default gen_random_uuid(),
	code text not null unique,
	name text not null,
	account_type text not null
		check (account_type in ('asset', 'liability', 'equity', 'income', 'expense')),
	is_system boolean not null default false,
	is_archived boolean not null default false,
	created_at timestamptz not null default now()
);

create table public.cost_centres (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	is_archived boolean not null default false,
	created_at timestamptz not null default now()
);

create table public.journals (
	id uuid primary key default gen_random_uuid(),
	journal_date date not null,
	description text not null,
	kind text not null check (kind in ('manual', 'invoice', 'invoice_void', 'invoice_payment',
		'expense', 'expense_payment', 'accrual', 'accrual_reversal', 'prepayment_release')),
	reverses_journal_id uuid references public.journals(id) on delete set null,
	created_at timestamptz not null default now()
);

create index journals_journal_date_idx on public.journals (journal_date);

create table public.journal_lines (
	id uuid primary key default gen_random_uuid(),
	journal_id uuid not null references public.journals(id) on delete cascade,
	account_id uuid not null references public.ledger_accounts(id),
	cost_centre_id uuid references public.cost_centres(id) on delete set null,
	debit numeric(12,2) not null default 0 check (debit >= 0),
	credit numeric(12,2) not null default 0 check (credit >= 0),
	position integer not null default 0,
	check (debit = 0 or credit = 0)
);

create index journal_lines_journal_id_idx on public.journal_lines (journal_id);
create index journal_lines_account_id_idx on public.journal_lines (account_id);

create table public.invoices (
	id uuid primary key default gen_random_uuid(),
	client_id uuid not null references public.clients(id),
	invoice_number integer not null unique,
	status text not null default 'draft'
		check (status in ('draft', 'issued', 'paid', 'void')),
	issue_date date not null,
	due_date date not null,
	reference text not null default '',
	notes text not null default '',
	issued_journal_id uuid references public.journals(id) on delete set null,
	created_at timestamptz not null default now()
);

create index invoices_client_id_idx on public.invoices (client_id);

create table public.invoice_lines (
	id uuid primary key default gen_random_uuid(),
	invoice_id uuid not null references public.invoices(id) on delete cascade,
	description text not null,
	quantity numeric(12,2) not null default 1,
	unit_price numeric(12,2) not null default 0,
	income_account_id uuid not null references public.ledger_accounts(id),
	cost_centre_id uuid references public.cost_centres(id) on delete set null,
	position integer not null default 0
);

create index invoice_lines_invoice_id_idx on public.invoice_lines (invoice_id);

create table public.invoice_payments (
	id uuid primary key default gen_random_uuid(),
	invoice_id uuid not null references public.invoices(id) on delete cascade,
	paid_on date not null,
	amount numeric(12,2) not null check (amount > 0),
	journal_id uuid references public.journals(id) on delete set null,
	created_at timestamptz not null default now()
);

create index invoice_payments_invoice_id_idx on public.invoice_payments (invoice_id);

create table public.expenses (
	id uuid primary key default gen_random_uuid(),
	expense_date date not null,
	supplier text not null,
	description text not null default '',
	amount numeric(12,2) not null check (amount > 0),
	expense_account_id uuid not null references public.ledger_accounts(id),
	cost_centre_id uuid references public.cost_centres(id) on delete set null,
	paid_on date,
	recorded_journal_id uuid references public.journals(id) on delete set null,
	payment_journal_id uuid references public.journals(id) on delete set null,
	created_at timestamptz not null default now()
);

create index expenses_expense_date_idx on public.expenses (expense_date);

create view public.ledger_entries with (security_invoker = true) as
select journal_lines.id,
	journals.id as journal_id,
	journals.journal_date,
	journals.description,
	journals.kind,
	ledger_accounts.id as account_id,
	ledger_accounts.code as account_code,
	ledger_accounts.name as account_name,
	ledger_accounts.account_type,
	journal_lines.cost_centre_id,
	journal_lines.debit,
	journal_lines.credit
from journal_lines
join journals on journals.id = journal_lines.journal_id
join ledger_accounts on ledger_accounts.id = journal_lines.account_id;

create function public.allocate_invoice_number() returns integer
language sql security definer set search_path to 'public' as $$
	update accounting_settings
	set next_invoice_number = next_invoice_number + 1, updated_at = now()
	where id and is_accounting_admin()
	returning next_invoice_number - 1;
$$;

create function public.admin_list_users()
returns table(email text, is_admin boolean, is_restricted boolean, joined_at timestamptz)
language plpgsql security definer set search_path to 'public' as $$
begin
	perform public.assert_admin();
	return query
	select p.email, p.is_admin, p.is_restricted, p.created_at
	from profiles p
	order by p.created_at desc;
end;
$$;

create function public.admin_list_staff_flags()
returns table(email text, is_staff boolean)
language plpgsql security definer set search_path to 'public' as $$
begin
	perform public.assert_admin();
	return query select profiles.email, profiles.is_staff from public.profiles;
end;
$$;

create function public.admin_set_staff(target_email text, staff boolean) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
	perform public.assert_admin();
	update public.profiles set is_staff = staff where email = target_email;
end;
$$;

create function public.admin_set_restriction(target_email text, restricted boolean) returns void
language plpgsql security definer set search_path to 'public' as $$
begin
	perform public.assert_admin();
	update profiles set is_restricted = restricted where email = target_email;
	if not found then
		raise exception 'unknown_user';
	end if;
end;
$$;

create function public.admin_delete_user(target_email text) returns void
language plpgsql security definer set search_path to 'public' as $$
declare
	target_id uuid;
	target_is_admin boolean;
begin
	perform public.assert_admin();
	select id, is_admin into target_id, target_is_admin
	from public.profiles
	where email = target_email;
	if target_id is null then
		raise exception 'user_not_found';
	end if;
	if target_is_admin then
		raise exception 'cannot_delete_admin';
	end if;
	delete from auth.users where id = target_id;
end;
$$;

alter table public.profiles enable row level security;
alter table public.oauth_clients enable row level security;
alter table public.oauth_authorization_codes enable row level security;
alter table public.oauth_tokens enable row level security;
alter table public.clients enable row level security;
alter table public.accounting_settings enable row level security;
alter table public.ledger_accounts enable row level security;
alter table public.cost_centres enable row level security;
alter table public.journals enable row level security;
alter table public.journal_lines enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_lines enable row level security;
alter table public.invoice_payments enable row level security;
alter table public.expenses enable row level security;

create policy "read own profile" on public.profiles
	for select using (auth.uid() = id);
create policy "people see their own connections" on public.oauth_tokens
	for select using (account_id = auth.uid());
create policy "people revoke their own connections" on public.oauth_tokens
	for update using (account_id = auth.uid()) with check (account_id = auth.uid());

create policy "Admins manage clients" on public.clients
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage accounting settings" on public.accounting_settings
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage ledger accounts" on public.ledger_accounts
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage cost centres" on public.cost_centres
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage journals" on public.journals
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage journal lines" on public.journal_lines
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage invoices" on public.invoices
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage invoice lines" on public.invoice_lines
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage invoice payments" on public.invoice_payments
	for all using (is_accounting_admin()) with check (is_accounting_admin());
create policy "Admins manage expenses" on public.expenses
	for all using (is_accounting_admin()) with check (is_accounting_admin());

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.assert_admin() from public, anon, authenticated;
revoke execute on function public.is_accounting_admin() from public, anon, authenticated;

revoke execute on function public.admin_delete_user(text) from public, anon;
revoke execute on function public.admin_list_users() from public, anon;
revoke execute on function public.admin_list_staff_flags() from public, anon;
revoke execute on function public.admin_set_staff(text, boolean) from public, anon;
revoke execute on function public.admin_set_restriction(text, boolean) from public, anon;
revoke execute on function public.allocate_invoice_number() from public, anon;
revoke execute on function public.set_display_name(text) from public, anon;

grant execute on function public.admin_delete_user(text) to authenticated;
grant execute on function public.admin_list_users() to authenticated;
grant execute on function public.admin_list_staff_flags() to authenticated;
grant execute on function public.admin_set_staff(text, boolean) to authenticated;
grant execute on function public.admin_set_restriction(text, boolean) to authenticated;
grant execute on function public.allocate_invoice_number() to authenticated;
grant execute on function public.set_display_name(text) to authenticated;

revoke all on public.oauth_clients from anon, authenticated;
revoke all on public.oauth_authorization_codes from anon, authenticated;

insert into public.accounting_settings (id) values (true);
