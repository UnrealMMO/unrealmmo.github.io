import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const files = fs
  .readdirSync("out", { recursive: true })
  .filter((f) => f.endsWith(".html"));
let links = 0,
  images = 0;
for (const f of files) {
  const html = fs.readFileSync(path.join("out", f), "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const target = decodeURIComponent(url.split("?")[0]);
    assert.ok(
      fs.existsSync(path.join("out", target)) ||
        fs.existsSync(path.join("out", target, "index.html")),
      `${f}: missing ${target}`,
    );
    links++;
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok(/\balt=/.test(match[0]), `${f}: image lacks alt`);
    images++;
  }
  assert.ok(html.includes("<title>"), `${f}: missing title`);
  assert.ok(html.includes('id="main"'), `${f}: missing main landmark`);
  assert.ok(!html.includes("sentinel.smartify.ai"), `${f}: unrelated tracking`);
}
for (const skill of ["sneak", "farming", "mining", "woodcutting", "fishing"]) {
  const html = fs.readFileSync(`out/skills/${skill}/index.html`, "utf8");
  for (let level = 1; level <= 99; level++)
    assert.ok(
      html.includes(`id="level-${level}"`),
      `${skill} missing level ${level}`,
    );
}
assert.ok(fs.existsSync("out/404.html"));
console.log(
  `Verified ${files.length} exported HTML files, ${links} local asset/link references, ${images} image alt attributes, and all 495 pre-rendered level rows.`,
);
