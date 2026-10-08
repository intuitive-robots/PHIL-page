import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://intuitive-robots.github.io",
  base: "/PHIL-page",
  trailingSlash: "always",
  output: "static",
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), mdx()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Noto Sans",
      cssVariable: "--font-noto-sans",
      weights: ["100 900"],
    },
  ],
  image: { responsiveStyles: true },
});
