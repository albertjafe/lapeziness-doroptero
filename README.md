# Ritmo

App minimalista de mejora personal que une dos capas:

- **Estado**: bienestar, TOC, sueño, comentario, gráficas e historial.
- **Hábitos**: hábitos que quieres hacer, hábitos que quieres dejar, marcas diarias, recaídas, objetivos y archivo.

## Migración de datos

La app conserva las claves locales existentes:

- `rocd_entries_v1` para las entradas de Estado.
- `ritmo_state_v1` para hábitos, marcas y recaídas.

Si antes usabas Ritmo en el mismo origen del navegador, los hábitos aparecen automáticamente al abrir esta app. También puedes exportar/importar un JSON combinado desde el menú.

## Supabase

La sincronización usa el mismo proyecto de Supabase y añade las tablas de hábitos junto a `rocd_entries`:

- `rocd_entries`
- `ritmo_habits`
- `ritmo_logs`
- `ritmo_relapses`

Para activarlo, abre el menú de la app, entra en **Configurar sincronización**, copia el SQL combinado y ejecútalo una vez en el SQL Editor de Supabase.

## Uso

Abre `index.html` o publícalo como sitio estático/GitHub Pages. No requiere build ni dependencias locales.
