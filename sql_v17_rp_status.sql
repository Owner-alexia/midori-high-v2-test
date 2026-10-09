-- Midori High V17 — statuts RP évolutifs + migration WL
-- À exécuter après le SQL V16/V16.1.

alter table public.profiles
  add column if not exists rp_status text not null default 'normal';

alter table public.students
  add column if not exists rp_status text not null default 'normal';

alter table public.profiles
  drop constraint if exists profiles_rp_status_check;
alter table public.profiles
  add constraint profiles_rp_status_check
  check (rp_status in ('normal','delinquant','parfait'));

alter table public.students
  drop constraint if exists students_rp_status_check;
alter table public.students
  add constraint students_rp_status_check
  check (rp_status in ('normal','delinquant','parfait'));

alter table public.profiles
  add column if not exists discord_username text,
  add column if not exists roblox_username text;

create index if not exists profiles_discord_username_idx on public.profiles(discord_username);
create index if not exists profiles_roblox_username_idx on public.profiles(roblox_username);

create table if not exists public.midori_rp_status_history (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  old_status text,
  new_status text not null,
  reason text,
  changed_by uuid references public.profiles(id) on delete set null,
  changed_at timestamptz not null default now()
);

create index if not exists midori_rp_status_history_profile_idx
  on public.midori_rp_status_history(profile_id, changed_at desc);

alter table public.midori_rp_status_history enable row level security;
drop policy if exists midori_rp_status_history_staff_read on public.midori_rp_status_history;
create policy midori_rp_status_history_staff_read
on public.midori_rp_status_history for select to authenticated
using (public.midori_is_wl_staff() or exists (
  select 1 from public.profiles p where p.id=auth.uid() and p.role='admin' and p.active=true
));

-- Les anciens profils commencent en Normal. Aucun élève existant n'est perdu.
update public.students s
set rp_status = coalesce(p.rp_status, 'normal')
from public.profiles p
where p.student_id = s.id;

create or replace function public.midori_sync_student_rp_status()
returns trigger
language plpgsql security definer set search_path=public
as $$
begin
  if new.student_id is not null then
    update public.students
    set rp_status = coalesce(new.rp_status, 'normal')
    where id = new.student_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_midori_profile_rp_status on public.profiles;
create trigger trg_midori_profile_rp_status
after insert or update of rp_status, student_id on public.profiles
for each row execute function public.midori_sync_student_rp_status();

create or replace function public.midori_set_rp_status(
  p_profile_id uuid,
  p_status text,
  p_reason text default null
)
returns public.profiles
language plpgsql security definer set search_path=public
as $$
declare
  v_profile public.profiles%rowtype;
  v_old text;
  v_new text := lower(trim(p_status));
begin
  if not public.midori_is_wl_staff() then
    raise exception 'Accès réservé aux recruteurs WL et administrateurs';
  end if;
  if v_new not in ('normal','delinquant','parfait') then
    raise exception 'Statut RP invalide';
  end if;
  select * into v_profile from public.profiles where id=p_profile_id for update;
  if not found then raise exception 'Profil introuvable'; end if;
  if coalesce(v_profile.profile_kind, v_profile.role) <> 'student' then raise exception 'Le statut Normal / Délinquant / Parfait concerne les profils élèves.'; end if;
  v_old := coalesce(v_profile.rp_status,'normal');
  update public.profiles set rp_status=v_new where id=p_profile_id returning * into v_profile;
  if v_old is distinct from v_new then
    insert into public.midori_rp_status_history(profile_id,old_status,new_status,reason,changed_by)
    values(p_profile_id,v_old,v_new,nullif(trim(p_reason),''),auth.uid());
  end if;
  return v_profile;
end;
$$;
grant execute on function public.midori_set_rp_status(uuid,text,text) to authenticated;

create or replace function public.midori_get_rp_status_history(p_profile_id uuid)
returns table(id uuid, old_status text, new_status text, reason text, changed_by uuid, changed_at timestamptz)
language sql stable security definer set search_path=public
as $$
  select h.id,h.old_status,h.new_status,h.reason,h.changed_by,h.changed_at
  from public.midori_rp_status_history h
  where h.profile_id=p_profile_id
    and (public.midori_is_wl_staff() or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin' and p.active=true))
  order by h.changed_at desc;
$$;
grant execute on function public.midori_get_rp_status_history(uuid) to authenticated;

-- Finalise une WL nouvellement créée : sépare les identifiants RP du compte portail.
create or replace function public.midori_finalize_wl_profile(
  p_registry_id uuid,
  p_discord_username text,
  p_roblox_username text,
  p_rp_status text default 'normal',
  p_reason text default null
)
returns uuid
language plpgsql security definer set search_path=public
as $$
declare
  v_profile_id uuid;
  v_old text;
begin
  if not public.midori_is_wl_staff() then raise exception 'Accès réservé aux recruteurs WL et administrateurs'; end if;
  select profile_id into v_profile_id from public.wl_registry where id=p_registry_id for update;
  if not found then raise exception 'WL introuvable'; end if;

  update public.wl_registry
  set discord_username=nullif(trim(p_discord_username),''),
      roblox_username=nullif(trim(p_roblox_username),'')
  where id=p_registry_id;

  update public.profiles
  set discord_username=nullif(trim(p_discord_username),''),
      roblox_username=nullif(trim(p_roblox_username),'')
  where id=v_profile_id;

  select coalesce(rp_status,'normal') into v_old from public.profiles where id=v_profile_id;
  perform public.midori_set_rp_status(v_profile_id, coalesce(p_rp_status,'normal'), p_reason);
  return v_profile_id;
end;
$$;
grant execute on function public.midori_finalize_wl_profile(uuid,text,text,text,text) to authenticated;

-- Le registre WL peut être corrigé par Admin + Recruteur WL.
drop policy if exists wl_registry_staff_read on public.wl_registry;
drop policy if exists wl_registry_staff_insert on public.wl_registry;
drop policy if exists wl_registry_staff_update on public.wl_registry;
drop policy if exists wl_registry_staff_delete on public.wl_registry;
create policy wl_registry_staff_read on public.wl_registry for select to authenticated using (public.midori_is_wl_staff());
create policy wl_registry_staff_insert on public.wl_registry for insert to authenticated with check (public.midori_is_wl_staff());
create policy wl_registry_staff_update on public.wl_registry for update to authenticated using (public.midori_is_wl_staff()) with check (public.midori_is_wl_staff());
create policy wl_registry_staff_delete on public.wl_registry for delete to authenticated using (public.midori_is_wl_staff());

-- Migration : Admin + Recruteur WL.
drop policy if exists midori_profile_migrations_admin on public.midori_profile_migrations;
create policy midori_profile_migrations_staff
on public.midori_profile_migrations for all to authenticated
using (public.midori_is_wl_staff()) with check (public.midori_is_wl_staff());

create or replace function public.midori_migrate_link_profile(
  p_profile_id uuid,
  p_target_person_id uuid
)
returns uuid
language plpgsql security definer set search_path=public
as $$
declare v_old_person uuid; v_id uuid;
begin
  if not public.midori_is_wl_staff() then raise exception 'Accès réservé aux recruteurs WL et administrateurs'; end if;
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
  p_discord_username text,
  p_roblox_username text,
  p_class_name text,
  p_profile_kind text,
  p_is_alt boolean,
  p_school_email text
)
returns void
language plpgsql security definer set search_path=public
as $$
begin
  if not public.midori_is_wl_staff() then raise exception 'Accès réservé aux recruteurs WL et administrateurs'; end if;
  if not exists (select 1 from public.profiles where id=p_profile_id) then raise exception 'Profil introuvable'; end if;
  if p_profile_kind not in ('student','professor','surveillant','psychologue','infirmiere') then raise exception 'Type de profil invalide'; end if;
  update public.profiles
  set full_name=coalesce(nullif(trim(p_full_name),''),full_name),
      discord_username=nullif(trim(p_discord_username),''),
      roblox_username=nullif(trim(p_roblox_username),''),
      class_name=nullif(trim(p_class_name),''),
      profile_kind=p_profile_kind,
      is_alt=coalesce(p_is_alt,false),
      school_email=nullif(lower(trim(p_school_email)),'')
  where id=p_profile_id;

  update public.wl_registry
  set discord_username=nullif(trim(p_discord_username),''),
      roblox_username=nullif(trim(p_roblox_username),'')
  where profile_id=p_profile_id and active=true;
end;
$$;
grant execute on function public.midori_migrate_update_profile(uuid,text,text,text,text,text,boolean,text) to authenticated;

-- Recherche des personnes : les noms RP existants sont désormais visibles pour éviter les lignes "Discord non renseigné".
drop function if exists public.midori_search_people(text);
create function public.midori_search_people(p_search text default '')
returns table(person_id uuid, discord_username text, roblox_username text, active boolean, profile_count bigint, profile_names text)
language sql stable security definer set search_path=public
as $$
  select mp.id,
         mp.discord_username,
         mp.roblox_username,
         mp.active,
         count(p.id) as profile_count,
         coalesce(string_agg(p.full_name || case when p.is_alt then ' [ALT]' else ' [PRINCIPAL]' end, ' • ' order by p.is_alt, p.full_name), 'Aucun profil') as profile_names
  from public.midori_people mp
  left join public.profiles p on p.person_id=mp.id
  where public.midori_is_wl_staff()
    and mp.active=true
    and (
      nullif(trim(p_search),'') is null
      or lower(coalesce(mp.discord_username,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(mp.roblox_username,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.full_name,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.username,'')) like '%'||lower(trim(p_search))||'%'
    )
  group by mp.id,mp.discord_username,mp.roblox_username,mp.active
  order by max(p.created_at) desc nulls last
  limit 30;
$$;
grant execute on function public.midori_search_people(text) to authenticated;

-- Migration : recherche ciblée avec les vrais champs RP séparés.
create or replace function public.midori_migration_search_profiles(p_search text default '')
returns table(profile_id uuid,person_id uuid,username text,full_name text,role text,profile_kind text,is_alt boolean,school_email text,access_status text,active boolean,class_name text,discord_username text,roblox_username text,rp_status text)
language sql stable security definer set search_path=public
as $$
  select p.id,p.person_id,p.username,p.full_name,p.role,p.profile_kind,p.is_alt,p.school_email,p.access_status,p.active,p.class_name,p.discord_username,p.roblox_username,p.rp_status
  from public.profiles p
  where public.midori_is_wl_staff()
    and (nullif(trim(p_search),'') is null
      or lower(coalesce(p.full_name,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.username,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.discord_username,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.roblox_username,'')) like '%'||lower(trim(p_search))||'%'
      or lower(coalesce(p.school_email,'')) like '%'||lower(trim(p_search))||'%')
  order by p.full_name nulls last
  limit 100;
$$;
grant execute on function public.midori_migration_search_profiles(text) to authenticated;

-- Reprendre les identifiants RP déjà connus dans le registre WL, sans toucher à l'e-mail du compte.
update public.profiles p
set discord_username = coalesce(p.discord_username, w.discord_username),
    roblox_username = coalesce(p.roblox_username, w.roblox_username)
from public.wl_registry w
where w.profile_id=p.id;

-- V17.5 — Rattacher les anciens profils déjà WL au registre WL.
-- Les profils existants sont considérés comme des WL déjà validées.
-- Aucun profil n'est supprimé et aucune nouvelle personne n'est créée.
insert into public.wl_registry(
  profile_id, person_id, rp_last_name, rp_first_name,
  discord_username, roblox_username, school_year, section, class_name,
  profile_kind, is_alt, club, function_name, recruiter_profile_id,
  validated_at, active
)
select
  p.id,
  p.person_id,
  case
    when position(' ' in trim(coalesce(p.full_name,''))) > 0
      then split_part(trim(p.full_name), ' ', 1)
    else trim(coalesce(p.full_name, p.username, 'Profil'))
  end,
  case
    when position(' ' in trim(coalesce(p.full_name,''))) > 0
      then trim(substr(trim(p.full_name), position(' ' in trim(p.full_name)) + 1))
    else trim(coalesce(p.full_name, p.username, 'Profil'))
  end,
  p.discord_username,
  p.roblox_username,
  null,
  null,
  case when p.student_id is not null then s.class_name else null end,
  coalesce(p.profile_kind, p.role, 'student'),
  coalesce(p.is_alt, false),
  null,
  case when coalesce(p.profile_kind, p.role) = 'student' then null else coalesce(p.role, p.profile_kind) end,
  null,
  coalesce(p.created_at, now()),
  coalesce(p.active, true)
from public.profiles p
left join public.students s on s.id = p.student_id
where coalesce(p.role,'') in ('student','professor','surveillant','psychologue','infirmiere','admin','recruteur_wl')
  and not exists (
    select 1 from public.wl_registry w where w.profile_id = p.id
  );

-- Garantit qu'un profil ne peut avoir qu'une seule entrée WL active.
create unique index if not exists wl_registry_profile_unique_idx
  on public.wl_registry(profile_id);

-- Les corrections faites dans Gestion des profils doivent rester synchronisées avec le registre WL.
create or replace function public.midori_sync_wl_registry_from_profile()
returns trigger
language plpgsql security definer set search_path=public
as $$
begin
  update public.wl_registry w
  set person_id = new.person_id,
      rp_last_name = case
        when position(' ' in trim(coalesce(new.full_name,''))) > 0
          then split_part(trim(new.full_name), ' ', 1)
        else trim(coalesce(new.full_name, new.username, 'Profil'))
      end,
      rp_first_name = case
        when position(' ' in trim(coalesce(new.full_name,''))) > 0
          then trim(substr(trim(new.full_name), position(' ' in trim(new.full_name)) + 1))
        else trim(coalesce(new.full_name, new.username, 'Profil'))
      end,
      discord_username = nullif(trim(new.discord_username),''),
      roblox_username = nullif(trim(new.roblox_username),''),
      class_name = case when new.student_id is not null then (select s.class_name from public.students s where s.id=new.student_id) else null end,
      profile_kind = coalesce(new.profile_kind, new.role, 'student'),
      is_alt = coalesce(new.is_alt,false),
      school_email = coalesce(new.school_email, w.school_email)
  where w.profile_id = new.id and w.active = true;
  return new;
end;
$$;

-- La colonne school_email existe dans les versions récentes du registre; on la crée si nécessaire.
alter table public.wl_registry add column if not exists school_email text;

drop trigger if exists trg_midori_sync_wl_registry_from_profile on public.profiles;
create trigger trg_midori_sync_wl_registry_from_profile
after update of full_name, discord_username, roblox_username, class_name, profile_kind, is_alt, school_email, person_id, student_id
on public.profiles
for each row execute function public.midori_sync_wl_registry_from_profile();

-- Synchronisation immédiate des champs modifiables des anciens profils.
update public.wl_registry w
set school_email = p.school_email
from public.profiles p
where p.id = w.profile_id;
