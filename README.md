# PHIL project page

English project website for **Correct Robots Before They Make Mistakes: Proactive Human-in-the-Loop Intervention via Preference Learning**.

Target: <https://intuitive-robots.github.io/PHIL-page/>

This is an independent Astro website based on [Roman Hauksson’s academic project template](https://github.com/RomanHauksson/academic-project-astro-template). The Overleaf project and original video remain unchanged. Authors and unpublished resource links are intentionally omitted.

## Local development

Use Node.js **24.x**. If you use nvm, run `nvm install` and `nvm use` in the project directory.

```sh
cd /Users/xinkai/PHIL-page
npm ci
npm run dev
```

Open the address printed in the terminal, normally <http://localhost:4321/PHIL-page/>.

To check and preview the production build:

```sh
npm run lint
npm run build
npm run verify
npm run preview
```

`build` runs Astro type checking and generates the static site. `verify` compares the rendered results with the manuscript table snapshots and checks resource paths, anchors, video configuration, and metadata.

## Manual deployment to GitHub Pages

The target repository already exists: <https://github.com/intuitive-robots/PHIL-page>. Use a GitHub account with permission to push to the repository and configure its Pages settings.

### 1. Upload the source

The local directory is already initialized as an independent Git repository, with `main` as its branch and `origin` pointing to the target repository. For the first upload:

```sh
cd /Users/xinkai/PHIL-page
git add .
git commit -m "Build PHIL project website"
git push -u origin main
```

Complete authentication using your existing GitHub setup. GitHub does not accept account passwords for HTTPS Git pushes; use GitHub Desktop, a configured credential manager, or a personal access token. Never put a token in website files.

Alternatively, in GitHub Desktop, choose **File → Add Local Repository**, select this directory, commit the changes, and choose **Push origin**.

Upload the source and assets, including `.github/workflows/astro.yml`. Do not upload `node_modules`, `dist`, `.astro`, or `verification`; they are already excluded by `.gitignore`.

### 2. Enable GitHub Pages

Open <https://github.com/intuitive-robots/PHIL-page/settings/pages>.

1. Under **Build and deployment**, find **Source**.
2. Select **GitHub Actions**.

No publishing branch, `gh-pages` branch, or custom domain is required.

### 3. Run the initial deployment

Open the repository’s **Actions** tab and select **Deploy PHIL to GitHub Pages**.

If Pages was not enabled when you first pushed, that workflow run may fail. After enabling Pages, click **Run workflow**, select `main`, and start the workflow. You can also rerun the failed workflow.

When both `build` and `deploy` show green checks, visit:

<https://intuitive-robots.github.io/PHIL-page/>

Check the homepage, video playback, full-size figure links, and mobile layout. Use the Actions status to confirm that the initial deployment has completed.

### 4. Publish future updates

```sh
cd /Users/xinkai/PHIL-page
npm run lint
npm run build
npm run verify
git add .
git commit -m "Update PHIL project page"
git push
```

Every push to `main` automatically builds and deploys the site.

## Maintenance

| Content                                             | Location and notes                                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Main text, abstract, title, and method descriptions | `src/paper.mdx`                                                                                                                                                          |
| Authors and resource links                          | The `authors` and `links` arrays at the top of `src/paper.mdx`. Empty arrays are hidden. Authors accept `name`, `url`, and `institution`; links accept `name` and `url`. |
| Full video                                          | `public/media/phil-overview.mp4`. Use MP4/H.264 with fast-start metadata. Update the displayed duration and video description if the content changes.                    |
| Video poster                                        | `public/media/video-poster.jpg`                                                                                                                                          |
| Social preview                                      | `public/media/social-preview.jpg`, 1200 × 630 pixels                                                                                                                     |
| Layout and colors                                   | `src/styles/phil.css`                                                                                                                                                    |
| Optimized figure inputs                             | `src/assets/phil/`                                                                                                                                                       |
| Full-size figure downloads                          | `public/figures/`                                                                                                                                                        |
| Deployment URL                                      | `site` and `base` in `astro.config.ts`. `src/lib/paths.ts` prefixes asset URLs with the project path.                                                                    |

Keep all website text, source comments, and documentation in English.

## Experimental data and source material

`src/data/tables/` contains unchanged snapshots of the manuscript tables for independent, reproducible builds. These are not a separate manually maintained result registry. The original manuscript tables remain the single source of truth for measurements.

`src/data/results.ts` extracts headline means and X-VLA results from these snapshots at build time. When measurements change, copy the updated tables from the manuscript and refresh the corresponding figures. Do not manually alter experimental values in the website. `scripts/verify-content.mjs` compares the generated results against the table snapshots.

Preserve the experimental conditions and limits in result descriptions:

- Each condition uses 25 evaluation rollouts. Five correction episodes are collected per policy, task, and base-demonstration budget, with multiple interventions allowed per episode.
- PHIL uses proactive corrections; HG-DAgger and Residual Policy use reactive corrections in the main comparison.
- Diffusion Policy covers four tasks, while X-VLA covers three.
- SR and TCS are different metrics and must remain distinguishable.
- Recovery analysis uses ten successful episodes per condition and does not represent all attempted episodes.
- The zero-demonstration origins in the Diffusion Policy line plot are visual guides from the supplied manuscript figure, not additional experimental measurements.

See `SOURCES.md` for the content and asset mapping.

## Troubleshooting

- **The website returns 404:** confirm that Pages uses GitHub Actions and that the `deploy` job has succeeded. Use the exact project URL, including `/PHIL-page/`.
- **The first workflow fails at Configure Pages:** enable Pages as described above, then rerun the workflow.
- **Images or styles are missing:** keep `site`, `base`, and the shared asset-prefix helper consistent. The current configuration targets the exact URL above.
- **Push permission is denied:** authenticate with a GitHub account that has write access to `intuitive-robots/PHIL-page`.
- **A local build reports an unsupported Node version:** switch to Node.js 24, run `npm ci`, then rebuild.

## Template attribution

Based on Roman Hauksson’s [Academic Project Astro Template](https://github.com/RomanHauksson/academic-project-astro-template), itself adapted from the Nerfies project page. Template revision: `0e90d4f36bad6ee0af330964bdf0002fe451283d`.

The template adaptation is provided under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). This notice does not assign a new license to the research video, figures, or manuscript material; their rights remain with their respective owners.
