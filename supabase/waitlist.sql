-- 1. Jadval: telefon unikal (dublikat oldini oladi), source UTM uchun
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  phone      text not null unique,
  source     text default 'direct',
  created_at timestamptz default now()
);

-- 2. RLS yoqish — anon kalit bazani himoyasiz o'qiy olmasligi uchun majburiy
alter table public.waitlist enable row level security;

-- 3. Faqat INSERT ruxsati: raqam qo'shiladi, lekin ro'yxat o'qib bo'linmaydi
create policy waitlist_insert_only
  on public.waitlist
  for insert
  to anon
  with check (true);

-- 4. Jadval darajasidagi GRANT — RLS policy yetarli emas, anon role'ga
--    aniq INSERT huquqi berilmasa "permission denied for table" xatosi chiqadi
grant insert on public.waitlist to anon;
