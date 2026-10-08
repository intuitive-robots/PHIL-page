# PHIL website maintenance

- Use the upstream academic project template. Do not add project-specific CSS or custom layout components.
- Maintain English content in `src/paper.mdx`, including authors, links, tables, figures, and short videos.
- Original LaTeX and the source video are read-only. Work only on independent website copies.
- Preserve experimental scope: X-VLA covers three tasks; SR and TCS are different metrics; recovery analysis concerns ten successful episodes per condition.
- Use the template Header, Figure, Picture, Video, Table, Wide, and HighlightedSection components.
- Use six separate clips with controls and inline playback. Do not autoplay or embed the full source video.
- Use Node.js 24. Run `npm run lint` and `npm run build`, then check layout and video playback.
- The standard template workflow deploys pushes to `main` through GitHub Pages.
