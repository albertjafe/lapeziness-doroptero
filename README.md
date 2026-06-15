# Seguimiento ROCD

App web (PWA) para llevar un registro de cómo te sientes respecto a tu ROCD
(TOC de relación) y ver tu evolución en una gráfica.

## Qué hace

- **Entradas arbitrarias**: añade un registro cuando quieras con el botón *Nueva entrada*.
- Cada entrada tiene un **valor de −10 (peor) a +10 (mejor)**, una **fecha/hora** (libre) y un **comentario opcional**.
- **Gráfica** de evolución: línea suave, zona verde por encima de 0 y roja por debajo, con los comentarios mostrados como notas sobre los puntos.
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
  comment text,
  updated_at timestamptz not null default now()
);
alter table public.rocd_entries enable row level security;
create policy "anon full access" on public.rocd_entries
  for all to anon using (true) with check (true);
```

Si la tabla aún no existe, la app sigue funcionando solo en el dispositivo y te
avisa en el menú → *Configurar sincronización* (donde también puedes copiar este SQL).

## Uso

Abre `index.html` (o sírvelo desde cualquier hosting estático / GitHub Pages).
No requiere build ni dependencias.
