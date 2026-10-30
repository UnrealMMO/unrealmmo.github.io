import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdirSync, writeFileSync } from "node:fs";
import { structures } from "../content/game";
import { StructurePreview } from "../components/structure-preview";
mkdirSync("public/wiki/structures", { recursive: true });
for (const structure of structures) {
  const svg = renderToStaticMarkup(
    <StructurePreview structure={structure} />,
  ).replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  writeFileSync(`public/wiki/structures/${structure.id}.svg`, svg);
}
