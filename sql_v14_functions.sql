-- Midori High V14 — fonctions portail (1 compte = plusieurs fonctions)
-- À exécuter dans Supabase SQL Editor.

create table if not exists public.midori_person_functions (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.midori_people(id) on delete cascade,
  function_code text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(person_id, function_code)
);

create index if not exists midori_person_functions_person_idx
  on public.midori_person_functions(person_id);

alter table public.midori_person_functions enable row level security;

-- Lecture uniquement des fonctions du compte connecté.
drop policy if exists midori_person_functions_read_own on public.midori_person_functions;
create policy midori_person_functions_read_own
on public.midori_person_functions
for select to authenticated
using (
  exists (
    select 1
    from public.midori_people mp
    where mp.id = midori_person_functions.person_id
      and mp.auth_user_id = auth.uid()
      and mp.active = true
  )
  or public.midori_is_admin()
);

-- Seul un administrateur peut attribuer une fonction portail.
drop policy if exists midori_person_functions_admin_write on public.midori_person_functions;
create policy midori_person_functions_admin_write
on public.midori_person_functions
for all to authenticated
using (public.midori_is_admin())
with check (public.midori_is_admin());

-- Retourne les fonctions réellement disponibles pour le compte connecté.
create or replace function public.midori_get_my_functions()
returns table (
  function_code text,
  label text,
  icon text
)
language sql stable security definer set search_path=public
as $$
  select
    f.function_code,
    case f.function_code
      when 'cpe' then 'CPE / Administration'
      when 'recruteur_wl' then 'Recruteur WL'
      else f.function_code
    end as label,
    case f.function_code
      when 'cpe' then '🏫'
      when 'recruteur_wl' then '📋'
      else '⚙️'
    end as icon
  from public.midori_person_functions f
  join public.midori_people mp on mp.id = f.person_id
  where mp.auth_user_id = auth.uid()
    and mp.active = true
    and f.active = true
  order by case f.function_code when 'cpe' then 1 when 'recruteur_wl' then 2 else 99 end;
$$;

grant execute on function public.midori_get_my_functions() to authenticated;

-- Permet à un administrateur d'ajouter/activer une fonction sur une personne.
create or replace function public.midori_set_person_function(
  p_person_id uuid,
  p_function_code text,
  p_active boolean default true
)
returns void
language plpgsql security definer set search_path=public
as $$
begin
  if not public.midori_is_admin() then
    raise exception 'Accès administrateur requis';
  end if;

  if p_function_code not in ('cpe','recruteur_wl') then
    raise exception 'Fonction portail inconnue';
  end if;

  if not exists (select 1 from public.midori_people where id=p_person_id and active=true) then
    raise exception 'Personne introuvable ou inactive';
  end if;

  insert into public.midori_person_functions(person_id,function_code,active)
  values(p_person_id,p_function_code,p_active)
  on conflict (person_id,function_code)
  do update set active=excluded.active;
end;
$$;

grant execute on function public.midori_set_person_function(uuid,text,boolean) to authenticated;

-- Initialisation des fonctions pour les comptes déjà existants.
-- Admin = CPE/Administration + Recruteur WL.
insert into public.midori_person_functions(person_id,function_code)
select p.person_id,'cpe'
from public.profiles p
where p.role='admin' and p.person_id is not null
on conflict do nothing;

insert into public.midori_person_functions(person_id,function_code)
select p.person_id,'recruteur_wl'
from public.profiles p
where p.role in ('admin','recruteur_wl') and p.person_id is not null
on conflict do nothing;

-- Contrôle pratique : doit retourner les deux fonctions pour un admin.
-- select * from public.midori_get_my_functions();

-- V16 — Migration manuelle des anciens profils.
create table if not exists public.midori_profile_migrations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  old_person_id uuid references public.midori_people(id) on delete set null,
  new_person_id uuid not null references public.midori_people(id) on delete cascade,
  migrated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.midori_profile_migrations enable row level security;
drop policy if exists midori_profile_migrations_admin on public.midori_profile_migrations;
create policy midori_profile_migrations_admin on public.midori_profile_migrations
for all to authenticated using (public.midori_is_admin()) with check (public.midori_is_admin());

create or replace function public.midori_migrate_link_profile(
  p_profile_id uuid,
  p_target_person_id uuid
)
returns uuid
language plpgsql security definer set search_path=public
as $$
declare
  v_old_person uuid;
  v_id uuid;
begin
  if not public.midori_is_admin() then raise exception 'Accès administrateur requis'; end if;
  if not exists (select 1 from public.profiles where id=p_profile_id) then raise exception 'Profil introuvable'; end if;
  if not exists (select 1 from public.midori_people where id=p_target_person_id and active=true) then raise exception 'Personne cible introuvable ou inactive'; end if;
  select person_id into v_old_person from public.profiles where id=p_profile_id for update;
  if v_old_person = p_target_person_id then raise exception 'Ce profil est déjà rattaché à cette personne'; end if;
  insert into public.midori_profile_migrations(profile_id,old_person_id,new_person_id,migrated_by)
  values(p_profile_id,v_old_person,p_target_person_id,auth.uid()) returning id into v_id;
  update public.profiles set person_id=p_target_person_id where id=p_profile_id;
  insert into public.midori_profile_links(person_id,profile_id) values(p_target_person_id,p_profile_id) on conflict do nothing;
  return v_id;
end;
$$;
grant execute on function public.midori_migrate_link_profile(uuid,uuid) to authenticated;

create or replace function public.midori_migrate_update_profile(
  p_profile_id uuid,
  p_full_name text,
  p_username text,
  p_email text,
  p_class_name text,
  p_profile_kind text,
  p_is_alt boolean,
  p_school_email text
)
returns void
language plpgsql security definer set search_path=public
as $$
begin
  if not public.midori_is_admin() then raise exception 'Accès administrateur requis'; end if;
  if not exists (select 1 from public.profiles where id=p_profile_id) then raise exception 'Profil introuvable'; end if;
  if p_profile_kind not in ('student','professor','surveillant','psychologue','infirmiere') then raise exception 'Type de profil invalide'; end if;
  update public.profiles
  set full_name=coalesce(nullif(trim(p_full_name),''),full_name),
      username=nullif(trim(p_username),''),
      email=nullif(trim(p_email),''),
      class_name=nullif(trim(p_class_name),''),
      profile_kind=p_profile_kind,
      is_alt=coalesce(p_is_alt,false),
      school_email=nullif(lower(trim(p_school_email)),'')
  where id=p_profile_id;
end;
$$;
grant execute on function public.midori_migrate_update_profile(uuid,text,text,text,text,text,boolean,text) to authenticated;

-- Recherche de profils pour la migration : strictement admin.
create or replace function public.midori_migration_search_profiles(p_search text default '')
returns table (
  profile_id uuid,
  person_id uuid,
  username text,
  full_name text,
  role text,
  profile_kind text,
  is_alt boolean,
  school_email text,
  access_status text,
  active boolean,
  class_name text
)
language sql stable security definer set search_path=public
as $$
  select p.id,p.person_id,p.username,p.full_name,p.role,p.profile_kind,p.is_alt,p.school_email,p.access_status,p.active,p.class_name
  from public.profiles p
  where public.midori_is_admin()
    and (
      nullif(trim(p_search),'') is null
      or lower(coalesce(p.full_name,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.username,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.email,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.school_email,'')) like '%'||lower(trim(p_search))||'%'
    )
  order by p.full_name nulls last, p.username nulls last
  limit 100;
$$;
grant execute on function public.midori_migration_search_profiles(text) to authenticated;
