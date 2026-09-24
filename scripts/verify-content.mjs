import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseHTML } from "linkedom";

const { document } = parseHTML(fs.readFileSync("dist/index.html", "utf8"));
const base = "/PHIL-page/";
const text = document.body.textContent.replace(/\s+/g, " ");
const tables = "src/data/tables/";
const table = (name) =>
  fs.readFileSync(path.join(tables, `${name}.tex`), "utf8");
const numbers = (row) =>
  row
    .split("&")
    .slice(1)
    .map((cell) => {
      const match = cell.match(/\d+(?:\.\d+)?/);
      return match ? Number(match[0]) : null;
    });
const mean = (values) =>
  (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
const diffRow = (method) =>
  table("beso_main_results")
    .split(/\\\\/)
    .find((row) => new RegExp(`(?:^|\\n)\\s*${method}\\s*\\n`).test(row));
const xvlaRows = table("xvla_comparison")
  .split("\n")
  .filter(
    (line) =>
      ["Base Policy", "HG-DAgger", "PHIL"].some((name) =>
        line.includes(name),
      ) && line.includes("&"),
  );
const values = xvlaRows.map((row) => numbers(row.slice(row.indexOf("&") + 1)));
const expected = [
  mean(numbers(diffRow("HG-DAgger")).slice(0, 12)),
  mean(numbers(diffRow("PHIL")).slice(0, 12)),
  ...["HG-DAgger", "PHIL"].map((method) =>
    mean(
      values.flatMap((row, i) =>
        xvlaRows[i].includes(method) ? row.filter((_, j) => j % 2 === 0) : [],
      ),
    ),
  ),
];
const metrics = [...document.querySelectorAll(".metric-values")].map((node) =>
  node.textContent.replace(/\s+/g, ""),
);
assert.equal(metrics[0], `${expected[0]}%→${expected[1]}%`);
assert.equal(metrics[1], `${expected[2]}%→${expected[3]}%`);
const carrot = {
  phil: numbers(diffRow("PHIL"))[6],
  baseline: numbers(diffRow("HG-DAgger"))[6],
  base: numbers(diffRow("Base Policy"))[6],
};
assert(
  text.includes(
    `PHIL reaches ${carrot.phil}% success, compared with ${carrot.baseline}% for HG-DAgger and ${carrot.base}% for the base policy.`,
  ),
);
assert(
  text.includes(
    `reaching ${values[8][4]}% full-task success on Lemon in the Drawer with 30 base demonstrations.`,
  ),
);
const renderedRows = [...document.querySelectorAll(".xvla-results tbody tr")];
assert.equal(renderedRows.length, values.length);
renderedRows.forEach((row, i) => {
  const displayed = [...row.querySelectorAll("td")].map((cell) =>
    cell.textContent === "—" ? null : Number(cell.textContent),
  );
  assert.deepEqual(displayed, values[i]);
});
assert.equal(document.querySelectorAll("h1").length, 1);
assert.equal(document.documentElement.lang, "en");
assert(
  !/Academic Project Page Template|Author Two|Conference Name|Coming soon|Anonymous Author/.test(
    text,
  ),
);
const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
const localUrls = [];
for (const node of document.querySelectorAll("[href],[src],[poster]")) {
  for (const attr of ["href", "src", "poster"]) {
    const value = node.getAttribute(attr);
    if (!value || /^(https?:|data:|mailto:)/.test(value)) continue;
    if (value.startsWith("#")) {
      assert(
        document.getElementById(value.slice(1)),
        `Missing anchor: ${value}`,
      );
    } else {
      assert(value.startsWith(base), `Asset missing project base: ${value}`);
      localUrls.push(value);
    }
  }
}
for (const node of document.querySelectorAll("[srcset]")) {
  for (const candidate of node.getAttribute("srcset").split(",")) {
    localUrls.push(candidate.trim().split(/\s+/)[0]);
  }
}
for (const url of localUrls) {
  assert(url.startsWith(base), `Asset missing base: ${url}`);
  assert(
    fs.existsSync(
      path.join("dist", decodeURIComponent(url.slice(base.length))),
    ),
    `Missing resource: ${url}`,
  );
}
for (const image of document.querySelectorAll("img"))
  assert(image.getAttribute("alt")?.length, "Missing alt text");
const video = document.querySelector("video");
assert(
  video && video.hasAttribute("controls") && video.hasAttribute("playsinline"),
);
assert(!video.hasAttribute("autoplay") && !video.hasAttribute("loop"));
assert.equal(video.getAttribute("preload"), "none");
assert(fs.statSync("dist/media/phil-overview.mp4").size > 18000000);
assert.equal(
  document.querySelector('link[rel="canonical"]').href,
  "https://intuitive-robots.github.io/PHIL-page/",
);
assert.equal(
  document.querySelector('meta[property="og:image"]').content,
  "https://intuitive-robots.github.io/PHIL-page/media/social-preview.jpg",
);
console.log(
  `Verified: ${renderedRows.length} X-VLA rows, both headline comparisons, ${new Set(localUrls).size} local assets, anchors, metadata and video configuration.`,
);
