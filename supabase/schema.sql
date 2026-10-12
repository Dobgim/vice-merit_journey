-- Merit Leaders — database schema and security rules.
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement checks whether the object already exists.

-- ------------------------------------------------------------------ Admins
-- Only emails listed here can use the admin dashboard. After running this
-- file, add yourself (see the last statement) and create the same email as
-- a user under Authentication → Users → Add user.
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- --------------------------------------------------- Consultation requests
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  study_level text,
  country text,
  message text,
  status text not null default 'new',
  notes text not null default '',
  created_at timestamptz not null default now()
);
alter table public.consultations enable row level security;

drop policy if exists "anyone can submit" on public.consultations;
create policy "anyone can submit" on public.consultations
  for insert to anon, authenticated with check (status = 'new');

drop policy if exists "admins manage" on public.consultations;
create policy "admins manage" on public.consultations
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------- Subscribers
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  study_level text,
  created_at timestamptz not null default now()
);
alter table public.subscribers enable row level security;

drop policy if exists "anyone can subscribe" on public.subscribers;
create policy "anyone can subscribe" on public.subscribers
  for insert to anon, authenticated with check (true);

drop policy if exists "admins manage" on public.subscribers;
create policy "admins manage" on public.subscribers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------- Scholarships, grants and internships
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  slug text not null,
  published boolean not null default true,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  unique (kind, slug)
);
alter table public.opportunities enable row level security;

-- Allowed types (re-runnable, so older databases pick up new types too)
alter table public.opportunities drop constraint if exists opportunities_kind_check;
alter table public.opportunities add constraint opportunities_kind_check
  check (kind in ('scholarships', 'grants', 'internships', 'fellowships', 'competitions'));

drop policy if exists "public reads published" on public.opportunities;
create policy "public reads published" on public.opportunities
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "admins manage" on public.opportunities;
create policy "admins manage" on public.opportunities
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- -------------------------------------- Site settings (contact, prices…)
create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;

drop policy if exists "public reads settings" on public.settings;
create policy "public reads settings" on public.settings
  for select to anon, authenticated using (true);

drop policy if exists "admins manage" on public.settings;
create policy "admins manage" on public.settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- -------------------------------------------------------- Add yourself
-- Replace the email below with your own, then run this line.
-- insert into public.admins (email) values ('you@example.com') on conflict do nothing;

-- ------------------------------------------------- Flyer image uploads
insert into storage.buckets (id, name, public)
values ('flyers', 'flyers', true)
on conflict (id) do nothing;

drop policy if exists "public reads flyers" on storage.objects;
create policy "public reads flyers" on storage.objects
  for select to anon, authenticated using (bucket_id = 'flyers');

drop policy if exists "admins upload flyers" on storage.objects;
create policy "admins upload flyers" on storage.objects
  for insert to authenticated with check (bucket_id = 'flyers' and public.is_admin());

drop policy if exists "admins change flyers" on storage.objects;
create policy "admins change flyers" on storage.objects
  for update to authenticated using (bucket_id = 'flyers' and public.is_admin());

drop policy if exists "admins delete flyers" on storage.objects;
create policy "admins delete flyers" on storage.objects
  for delete to authenticated using (bucket_id = 'flyers' and public.is_admin());
