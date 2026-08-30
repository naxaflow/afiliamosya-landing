-- ============================================================================
-- ¡Afiliamos Ya! — Panel interno (CRM ligero)
-- ----------------------------------------------------------------------------
-- Corre este archivo en el SQL Editor de tu proyecto Supabase (el mismo que ya
-- usa app/api/leads/route.js). No se ejecuta automáticamente desde el código —
-- es responsabilidad tuya aplicarlo y revisarlo antes de correrlo en producción.
--
-- ANTES DE CORRER NADA: confirma el schema real de la tabla "leads" con:
--
--   select column_name, data_type, column_default
--   from information_schema.columns
--   where table_schema = 'public' and table_name = 'leads'
--   order by ordinal_position;
--
-- Este script asume la convención estándar de Supabase (id uuid primary key
-- default gen_random_uuid(), columna created_at). Ajusta nombres si difieren.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. profiles — usuarios del panel interno + rol
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'lectura'
    check (role in ('admin', 'operaciones', 'lectura')),
  activo boolean not null default true,
  creado_en timestamptz not null default now()
);

-- Crea el profile automáticamente cuando se invita/crea un usuario en auth.users.
-- El rol inicial viene en user_metadata (lo setea la Server Action de invitación).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'lectura')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
-- Sin policies permisivas: profiles solo se lee/escribe desde el servidor con
-- la service_role key (mismo patrón que ya usa app/api/leads/route.js). RLS
-- queda habilitado como defensa en profundidad, no como mecanismo de
-- autorización — la autorización real vive en lib/dal.js.

-- ----------------------------------------------------------------------------
-- 2. leads — columnas nuevas + constraints
-- ----------------------------------------------------------------------------
alter table public.leads
  add column if not exists correo text,
  add column if not exists actualizado_en timestamptz not null default now();

-- Pipeline de estado. NOT VALID + VALIDATE para no reventar filas existentes
-- si hoy hay algún valor fuera de la lista (revisa antes con un
-- "select distinct estado from leads").
alter table public.leads drop constraint if exists leads_estado_check;
alter table public.leads
  add constraint leads_estado_check
  check (estado in ('nuevo', 'contactado', 'cotizado', 'afiliado', 'descartado'))
  not valid;
alter table public.leads validate constraint leads_estado_check;

-- Nota deliberada: "origen" queda como texto libre, SIN check constraint en la
-- base de datos. El allow-list vive en código (lib/origenes.js) porque crece
-- cada vez que se agrega una página nueva del sitio — fijar un enum aquí
-- obligaría a migrar la base cada vez.

create index if not exists leads_telefono_idx on public.leads (telefono);
create index if not exists leads_correo_idx on public.leads (lower(correo)) where correo is not null;
create index if not exists leads_estado_idx on public.leads (estado);
create index if not exists leads_origen_idx on public.leads (origen);
-- Ajusta "created_at" si tu columna de fecha de creación se llama distinto.
create index if not exists leads_creado_idx on public.leads (created_at desc);

create or replace function public.set_actualizado_en()
returns trigger language plpgsql as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

drop trigger if exists leads_set_actualizado_en on public.leads;
create trigger leads_set_actualizado_en
  before update on public.leads
  for each row execute function public.set_actualizado_en();

alter table public.leads enable row level security; -- si no lo está ya
-- Sin policies nuevas: sigue escribiendo/leyendo solo el service_role desde
-- el servidor (endpoint público y panel interno).

-- ----------------------------------------------------------------------------
-- 3. lead_events — historial de captura + cambios de estado + notas
-- ----------------------------------------------------------------------------
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  tipo text not null check (tipo in ('captura', 'cambio_estado', 'nota')),
  origen text,              -- solo si tipo = 'captura'
  estado_anterior text,     -- solo si tipo = 'cambio_estado'
  estado_nuevo text,        -- solo si tipo = 'cambio_estado'
  nota text,                -- solo si tipo = 'nota'
  actor_id uuid references auth.users(id), -- null = evento automático (formulario público)
  creado_en timestamptz not null default now()
);

create index if not exists lead_events_lead_idx on public.lead_events (lead_id, creado_en desc);

alter table public.lead_events enable row level security;
-- Mismo patrón: sin policies, solo service_role.
