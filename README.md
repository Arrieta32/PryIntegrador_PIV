# THE KINGPINS — Portal de Resultados PIV 2026

Hall of Fame temática **GTA VI / Vice City** para publicar los resultados del **Proyecto Integrador de Programación IV (UniNorte · 2026)**.

- Todos los equipos con **30/30** en el muro *Mission Passed*
- El docente elige **2 ganadores absolutos** (*THE KINGPINS*)
- Filtro de fotos estilo GTA VI 100% en el navegador (Canvas)
- Sitio estático, listo para **GitHub Pages**

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí la URL que muestra Vite (incluye el base path `/PryIntegrador_PIV/`).

```bash
npm run build
npm run preview
```

## Flujo docente (resultados oficiales)

1. Abrí el sitio y usá **Editar Resultados / Subir Fotos**.
2. Cargá equipos, fotos (filtro GTA ajustable) y asigná slots **#1 / #2**.
3. **Exportar JSON** → obtenés `hof-config.json`.
4. Reemplazá el array `seedTeams` en `src/data/seedTeams.js` con esos datos (o importá el JSON en el Studio y versioná el resultado en el repo).
5. Commit + push a `main` → GitHub Actions publica en Pages.

El `localStorage` es solo borrador en tu navegador. Los estudiantes ven lo que está **commiteado** en el seed.

## GitHub Pages

1. Repo → **Settings → Pages** → Source: **GitHub Actions**.
2. El workflow `.github/workflows/deploy-pages.yml` construye y despliega en cada push a `main`.
3. URL esperada: `https://Arrieta32.github.io/PryIntegrador_PIV/`

Si el repo cambia de nombre, actualizá `base` / `VITE_BASE` en `vite.config.js` y en el workflow.

## Stack

React + Vite + Tailwind CSS · Canvas API · Web Audio API · `html-to-image` (póster PNG) · sin backend ni APIs de pago.
