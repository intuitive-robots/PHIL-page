# PHIL project page

Website: <https://intuitive-robots.github.io/PHIL-page/>

Based on [Roman Hauksson’s Academic Project Astro Template](https://github.com/RomanHauksson/academic-project-astro-template). The page uses the template’s typography, header, figures, tables, and video components. There is no additional project-specific stylesheet.

## Edit the page

Edit `src/paper.mdx` for the title, authors, homepage links, affiliation, corresponding-author note, text, tables, figures, and video captions. Empty resource links are hidden. Do not add a publication venue or paper link until confirmed.

- Author entries use `name`, optional `url`, and optional `notes` symbols. The `notes` list explains each symbol.
- `affiliation` is shown once below the authors.
- Figure sources are in `src/assets/phil/`; full-size copies are in `public/figures/`.
- Six independent video clips and posters are in `public/media/clips/`. See [VIDEOS.md](VIDEOS.md) for their source ranges and replacement instructions.
- Public asset links use `asset(...)` to include the GitHub Pages subpath.

The original LaTeX and video are read-only inputs. This site builds independently of the manuscript. [SOURCES.md](SOURCES.md) records content provenance. Table snapshots are retained in `src/data/tables/` for reference; results are plain Markdown tables in the page, with no build-time LaTeX parser.

## Preview locally

Use Node.js 24, matching GitHub Actions:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. To check a production build:

```sh
npm run lint
npm run build
npm run preview
```

## Deploy

GitHub Pages is already enabled for this repository. Commit and push the changes to `main`; the template’s standard `.github/workflows/astro.yml` builds and publishes the site automatically. No separate upload or deployment command is needed.

For a new repository, select **Settings → Pages → Source → GitHub Actions** once. The workflow derives the site address and base path from GitHub Pages. Local previews use the existing `site` and `base` settings in `astro.config.ts`.

## Template attribution

The template is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Keep the footer attribution and `LICENSE.md`. This copy uses template commit `0e90d4f36bad6ee0af330964bdf0002fe451283d`, retaining the working Astro/MDX versions. The only content-specific header extension is a shared affiliation field; the Picture component uses raster assets directly without PDF conversion.
