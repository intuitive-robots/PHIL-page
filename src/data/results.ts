import diffusionTable from "./tables/beso_main_results.tex?raw";
import xvlaTable from "./tables/xvla_comparison.tex?raw";

// Read the unchanged manuscript table snapshots at build time. Do not maintain
// a second hand-entered registry of experimental measurements.
function numbers(row: string): (number | null)[] {
  return row
    .split("&")
    .slice(1)
    .map((cell) => {
      const match = cell.match(/\d+(?:\.\d+)?/);
      return match ? Number(match[0]) : null;
    });
}

function diffusionValues(method: string): number[] {
  const row = diffusionTable
    .split(/\\\\/)
    .find((value) => new RegExp(`(?:^|\\n)\\s*${method}\\s*\\n`).test(value));
  if (!row) throw new Error(`Missing diffusion row: ${method}`);
  const values = numbers(row).slice(0, 12);
  if (values.length !== 12 || values.some((value) => value === null)) {
    throw new Error(`Incomplete diffusion success rates: ${method}`);
  }
  return values as number[];
}

const methods = ["Base Policy", "HG-DAgger", "PHIL"] as const;
const tasks = ["Towel Folding", "Cook the Carrot", "Lemon in the Drawer"];
const xvlaRows = xvlaTable
  .split("\n")
  .filter(
    (line) =>
      methods.some((method) => line.includes(method)) && line.includes("&"),
  );
if (xvlaRows.length !== 9) throw new Error("Expected nine X-VLA result rows.");

export const xvlaResults = tasks.map((task, taskIndex) => ({
  task,
  rows: methods.map((method, methodIndex) => {
    const row = xvlaRows[taskIndex * 3 + methodIndex];
    if (!row.includes(method))
      throw new Error(`Unexpected X-VLA method: ${method}`);
    const values = numbers(row.slice(row.indexOf("&") + 1));
    if (
      values.length !== 6 ||
      values.filter((_, i) => i % 2 === 0).some((v) => v === null)
    ) {
      throw new Error(`Incomplete X-VLA results: ${task}, ${method}`);
    }
    return { method, values };
  }),
}));

const mean = (values: number[]) =>
  (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);

function xvlaMean(method: string): string {
  const values = xvlaResults.flatMap(({ rows }) => {
    const row = rows.find((entry) => entry.method === method)!;
    return row.values.filter(
      (value, index) => index % 2 === 0 && value !== null,
    ) as number[];
  });
  return mean(values);
}

export const headlineResults = [
  {
    policy: "Diffusion Policy",
    baseline: mean(diffusionValues("HG-DAgger")),
    phil: mean(diffusionValues("PHIL")),
    scope: "4 tasks · 3 demonstration budgets",
  },
  {
    policy: "X-VLA",
    baseline: xvlaMean("HG-DAgger"),
    phil: xvlaMean("PHIL"),
    scope: "3 tasks · 3 demonstration budgets",
  },
];
