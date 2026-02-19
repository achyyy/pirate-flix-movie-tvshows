-- =============================================
--  PIRATEFLIX — SUPABASE DATABASE SETUP SQL
--  Run this in: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Create profiles table
create table if not exists public.profiles (
  id          uuid        references auth.users on delete cascade primary key,
  username    text        unique not null,
  created_at  timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Policy: users can read their own profile
create policy "Users can view own profile"
  on profiles
  for select
  using (auth.uid() = id);

-- 4. Policy: users can insert their own profile (during registration)
create policy "Users can insert own profile"
  on profiles
  for insert
  with check (auth.uid() = id);

-- 5. Policy: users can update their own profile
create policy "Users can update own profile"
  on profiles
  for update
  using (auth.uid() = id);

-- Done! Your database is ready for PirateFlix.
