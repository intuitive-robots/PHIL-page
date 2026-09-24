import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://intuitive-robots.github.io",
  base: "/PHIL-page",
  trailingSlash: "always",
  output: "static",
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx()],
  image: { responsiveStyles: true },
});
