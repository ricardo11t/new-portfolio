import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "Portfolio-src.html");
const html = fs.readFileSync(htmlPath, "utf8");
const m = html.match(/<style>([\s\S]*?)<\/style>/);
if (!m) throw new Error("no <style> in Portfolio-src.html");

let css = m[1];

css = css.replace(/:root\s*\{/g, ".obs-portfolio {");
css = css.replace(
  /\* \{ margin: 0; padding: 0; box-sizing: border-box; \}/g,
  ".obs-portfolio, .obs-portfolio * { box-sizing: border-box; }\n  .obs-portfolio * { margin: 0; padding: 0; }",
);
css = css.replace(/html, body \{ background: var\(--bg\); color: var\(--fg\); \}/g, "");
css = css.replace(
  /body \{ font-family: var\(--sans\); -webkit-font-smoothing: antialiased; overflow-x: hidden; \}/g,
  "",
);
css = css.replace(/html, body \{ cursor: none; font-family: var\(--mono\); font-size: 14px; \}/g, "");
css = css.replace(/body \{ display: flex; flex-direction: column; min-height: 100vh; \}/g, "");
css = css.replace(/::selection/g, ".obs-portfolio ::selection");
css = css.replace(/\.grain::before/g, ".obs-portfolio.grain::before");
css = css.replace(/#skyCanvas/g, ".sky-canvas");
css = css.replace(
  /a \{ color: inherit; text-decoration: none; \}/g,
  ".obs-portfolio a { color: inherit; text-decoration: none; }",
);
css = css.replace(
  /button \{ border: none; background: none; font: inherit; color: inherit; cursor: pointer; \}/g,
  ".obs-portfolio button { border: none; background: none; font: inherit; color: inherit; cursor: pointer; }",
);
css = css.replace(/ul \{ list-style: none; \}/g, ".obs-portfolio ul { list-style: none; }");
css = css.replace(
  /@media \(pointer: coarse\) \{ \.cursor-dot/g,
  "@media (pointer: coarse) { .obs-portfolio .cursor-dot",
);
css = css.replace(/\.cursor-ring \{ display: none; \}/g, ".obs-portfolio .cursor-ring { display: none; }");
css = css.replace(/\.cursor-dot, \.cursor-ring/g, ".obs-portfolio .cursor-dot, .obs-portfolio .cursor-ring");
css = css.replace(/\.cursor-dot \{/g, ".obs-portfolio .cursor-dot {");
css = css.replace(/\.cursor-ring \{/g, ".obs-portfolio .cursor-ring {");
css = css.replace(/\.cursor-ring\.hover/g, ".obs-portfolio .cursor-ring.hover");
css = css.replace(
  /@media \(max-width: 900px\) \{\s*html, body \{ cursor: auto; \}/g,
  "@media (max-width: 900px) {\n    .obs-portfolio { cursor: auto; }",
);

const header = `.obs-portfolio {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--mono);
  font-size: 14px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  cursor: none;
}
`;

const outDir = path.join(root, "app", "components", "observatorio");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "observatorio.css");
fs.writeFileSync(
  outPath,
  "/* Scoped observatorio theme — extracted from Portfolio-src.html */\n" + header + css,
);
console.log("wrote", outPath);
