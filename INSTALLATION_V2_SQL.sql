-- Midori High V2 : extension idempotente pour les modules complémentaires.
-- À exécuter dans Supabase > SQL Editor, sur le NOUVEAU projet V2 seulement.
-- Les tables existantes ne sont ni vidées ni supprimées.
-- Accès aux modules ajoutés : gérant Midori uniquement via midori_is_manager().

create table if not exists public.school_messages (
 id uuid primary key default gen_random_uuid(), sender_profile_id uuid references public.profiles(id) on delete set null,
 recipient_profile_id uuid references public.profiles(id) on delete set null, subject text not null default '', body text not null default '',
 is_read boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.school_message_attachments (
 id uuid primary key default gen_random_uuid(), message_id uuid references public.school_messages(id) on delete cascade,
 file_name text not null default '', file_url text not null default '', created_at timestamptz not null default now()
);
create table if not exists public.school_homework_submissions (
 id uuid primary key default gen_random_uuid(), homework_id uuid references public.school_homework(id) on delete set null,
 profile_id uuid references public.profiles(id) on delete cascade, submission_text text not null default '',
 status text not null default 'submitted', feedback text not null default '', submitted_at timestamptz not null default now()
);
create table if not exists public.school_points (
 id uuid primary key default gen_random_uuid(), profile_id uuid references public.profiles(id) on delete cascade,
 points integer not null default 0, reason text not null default '', awarded_by uuid references public.profiles(id) on delete set null,
 created_at timestamptz not null default now()
);
create table if not exists public.school_sanctions (
 id uuid primary key default gen_random_uuid(), profile_id uuid references public.profiles(id) on delete cascade,
 sanction_type text not null default 'avertissement', reason text not null default '', issued_by uuid references public.profiles(id) on delete set null,
 issued_at timestamptz not null default now(), status text not null default 'active', created_at timestamptz not null default now()
);
create table if not exists public.school_events (
 id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
 starts_at timestamptz, ends_at timestamptz, location text not null default '', created_at timestamptz not null default now()
);
create table if not exists public.school_activity_logs (
 id uuid primary key default gen_random_uuid(), actor_profile_id uuid references public.profiles(id) on delete set null,
 action text not null default '', target_type text not null default '', target_id text not null default '', details text not null default '',
 created_at timestamptz not null default now()
);
create table if not exists public.school_appointments (
 id uuid primary key default gen_random_uuid(), profile_id uuid references public.profiles(id) on delete cascade,
 staff_profile_id uuid references public.profiles(id) on delete set null, appointment_type text not null default 'entretien',
 scheduled_at timestamptz, reason text not null default '', status text not null default 'planned', created_at timestamptz not null default now()
);
create table if not exists public.school_supervisor_reports (
 id uuid primary key default gen_random_uuid(), profile_id uuid references public.profiles(id) on delete set null,
 author_profile_id uuid references public.profiles(id) on delete set null, report_type text not null default 'incident',
 description text not null default '', reported_at timestamptz not null default now(), status text not null default 'open', created_at timestamptz not null default now()
);
create table if not exists public.wl_registry (
 id uuid primary key default gen_random_uuid(), discord_username text not null default '', roblox_username text not null default '',
 display_name text not null default '', validated_by text not null default '', status text not null default 'validated', notes text not null default '',
 created_at timestamptz not null default now()
);

-- Droits de table, RLS et politiques idempotentes : seuls les gérants peuvent lire/écrire ces modules.
do $$ declare t text; begin
 foreach t in array array['school_messages','school_message_attachments','school_homework_submissions','school_points','school_sanctions','school_events','school_activity_logs','school_appointments','school_supervisor_reports','wl_registry'] loop
   execute format('alter table public.%I enable row level security', t);
   execute format('grant select, insert, update, delete on public.%I to authenticated', t);
   execute format('drop policy if exists manager_full_access on public.%I', t);
   execute format('create policy manager_full_access on public.%I for all to authenticated using (public.midori_is_manager()) with check (public.midori_is_manager())', t);
 end loop;
end $$;
