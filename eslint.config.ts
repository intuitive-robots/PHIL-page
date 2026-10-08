import js from "@eslint/js";
import globals from "globals";
import typescript from "typescript-eslint";
import astro from "eslint-plugin-astro";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { tailwind4 } from "tailwind-csstree";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist/**",
    ".astro/**",
    ".vscode/**",
    "package-lock.json",
    "verification/**",
    // Upstream Tailwind @apply syntax is validated by the production build.
    "src/styles/global.css",
  ]),
  {
    files: ["**/*.{js,mjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  { files: ["**/*.ts"], extends: [typescript.configs.recommended] },
  {
    files: ["**/*.astro"],
    plugins: { astro },
    extends: [astro.configs.recommended],
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: [json.configs.recommended],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: [markdown.configs.recommended],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    languageOptions: { customSyntax: tailwind4 },
    extends: [css.configs.recommended],
    rules: { "css/no-invalid-at-rules": "off", "css/use-baseline": "off" },
  },
]);
