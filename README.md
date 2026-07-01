# Seguimiento ROCD

App web (PWA) para llevar un registro de bienestar, TOC de relación y sueño,
y ver la evolución en gráficas minimalistas.

## Qué hace

- **Entradas arbitrarias**: añade un registro cuando quieras con el botón *Nueva entrada*.
- Cada entrada tiene **bienestar** de −10 a +10, **TOC** de 0 a 10, **sueño** de 0 a 10, una **fecha/hora** y un **comentario opcional**.
- **Gráficas** separadas para bienestar, TOC y sueño, más una lectura simple de cómo sueño se relaciona con TOC y bienestar.
- **Lista de registros** para revisar, editar o borrar cualquier entrada.
- Funciona **offline** y se instala como app en el móvil (PWA).

## Almacenamiento

Es **offline-first**: todo se guarda al instante en el dispositivo (`localStorage`)
y se sincroniza con tu proyecto de Supabase para acceder desde cualquier
dispositivo, **sin pantalla de login**.

### Activar la sincronización (una sola vez)

En el **SQL Editor** de tu proyecto de Supabase, ejecuta:

```sql
create table if not exists public.rocd_entries (
  id uuid primary key,
  at timestamptz not null,
  value int2 not null,
  toc int2,
  sleep int2,
  comment text,
  updated_at timestamptz not null default now()
);
alter table public.rocd_entries add column if not exists toc int2;
alter table public.rocd_entries add column if not exists sleep int2;
alter table public.rocd_entries enable row level security;
create policy "anon full access" on public.rocd_entries
  for all to anon using (true) with check (true);
```

Si la tabla aún no existe, la app sigue funcionando solo en el dispositivo y te
avisa en el menú → *Configurar sincronización* (donde también puedes copiar este SQL).

## Uso

Abre `index.html` (o sírvelo desde cualquier hosting estático / GitHub Pages).
No requiere build ni dependencias.
