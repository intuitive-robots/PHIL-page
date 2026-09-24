# PHIL website maintenance

This is a static Astro 7 + MDX project, adapted from Roman Hauksson's academic project template. Use Node.js 24 and the committed npm lockfile.

- Keep content in `src/paper.mdx`, layout in `src/pages/index.astro`, and styles in `src/styles/phil.css`.
- Prefix public assets through `src/lib/paths.ts`; deployment uses the `/PHIL-page/` base.
- Authors and external resource links are optional frontmatter arrays. Do not invent publication metadata or resource links.
- Original manuscript tables remain the source of truth. `src/data/tables` contains unchanged snapshots; the site parses these at build time. Update figures and text with any table refresh. Do not modify the original Overleaf project.
- Preserve experimental scope: separate SR and TCS, distinguish collection modes and training objectives, and qualify the recovery analysis as ten successful episodes per condition.
- Use the existing Figure, Picture, and Video wrappers. Full-size figures are available through accessible links.
- Keep the video user-initiated with controls, `playsinline`, no loop, and `preload="none"`.
- Validate with `npm run build`, `npm run verify`, and `npm run lint`. Review responsive layout and playback in a browser.
- Publishing is performed by the user. GitHub Actions deploys after a push to `main` once Pages is configured to use GitHub Actions.
