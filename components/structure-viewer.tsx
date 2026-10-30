"use client";
import dynamic from "next/dynamic";
import { Component, useState, useEffect, useRef, type ReactNode } from "react";
import {
  Box,
  RotateCcw,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type Structure, title, materials, palette } from "@/content/game";
import { StructurePreview } from "./structure-preview";
const Scene = dynamic(() => import("./structure-scene"), {
  ssr: false,
  loading: () => (
    <p className="viewer-loading" role="status">
      Preparing the 3D model…
    </p>
  ),
});
class ViewerBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="viewer-fallback" role="status">
        <h3>3D is unavailable on this device.</h3>
        <p>The complete layer diagrams and materials below remain available.</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function StructureViewer({ structure: s }: { structure: Structure }) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const max = Math.max(...s.blocks.map((b) => b.y));
  const width =
    2 *
      Math.max(...s.blocks.map((b) => Math.max(Math.abs(b.x), Math.abs(b.z)))) +
    1;
  const [enabled, setEnabled] = useState(false),
    [layer, setLayer] = useState(max),
    [exploded, setExploded] = useState(false),
    [air, setAir] = useState(false),
    [claim, setClaim] = useState(false),
    [view, setView] = useState("isometric"),
    [reset, setReset] = useState(0),
    [selected, setSelected] = useState<number | null>(null),
    [share, setShare] = useState(""),
    [checked, setChecked] = useState<string[]>([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("layer");
    if (raw !== null) {
      const n = Number(raw);
      if (Number.isInteger(n) && n >= 0 && n <= max) setLayer(n);
    }
  }, [max]);
  function changeLayer(n: number) {
    setEnabled(true);
    setLayer(n);
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.set("layer", String(n));
    window.history.replaceState(null, "", url);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShare("Build link copied.");
    } catch {
      setShare("Copy this page’s address to share the current layer.");
    }
  }
  const selectedBlock = selected !== null ? s.blocks[selected] : null;
  return (
    <>
      <div
        ref={viewerRef}
        className="viewer-shell"
        style={{ scrollMarginTop: "100px" }}
      >
        <div className="viewer-topbar">
          <span>
            <Box size={17} /> {s.name} · Build explorer
          </span>
          <button onClick={copy}>
            <Share2 size={15} /> Share build
          </button>
        </div>
        <div className="viewer-canvas">
          {enabled ? (
            <ViewerBoundary>
              <Scene
                structure={s}
                layer={layer}
                exploded={exploded}
                air={air}
                claim={claim}
                view={view}
                reset={reset}
                selected={selected}
                onSelect={setSelected}
              />
            </ViewerBoundary>
          ) : (
            <div className="viewer-poster">
              <StructurePreview structure={s} />
              <button className="button" onClick={() => setEnabled(true)}>
                <Box size={18} /> Explore in 3D
              </button>
              <p>Rotate, inspect and build layer by layer</p>
            </div>
          )}
          <div className="viewer-keyboard-inspector">
            <label htmlFor="block-select">Inspect a block</label>
            <select
              id="block-select"
              value={selected ?? ""}
              onChange={(e) => {
                setSelected(e.target.value === "" ? null : +e.target.value);
                if (
                  e.target.value !== "" &&
                  s.blocks[+e.target.value].role === "air"
                )
                  setAir(true);
                setEnabled(true);
              }}
            >
              <option value="">Select a block or click the 3D model</option>
              {s.blocks
                .filter((b) => b.y <= layer)
                .map((b) => {
                  const i = s.blocks.indexOf(b);
                  return (
                    <option value={i} key={i}>
                      {title(b.material)} · {b.role} · ({b.x}, {b.y}, {b.z})
                    </option>
                  );
                })}
            </select>
          </div>
          <span className="viewer-tag">
            {width} × {max + 1} × {width} BLOCKS
          </span>
          {selectedBlock && (selectedBlock.role !== "air" || air) && (
            <div className="viewer-selection" role="status">
              <span>Selected block</span>
              <strong>{title(selectedBlock.material)}</strong>
            </div>
          )}
        </div>
        <div className="viewer-controls">
          <div
            className="camera-controls"
            role="group"
            aria-label="Camera view"
          >
            {["isometric", "top", "front", "side"].map((v) => (
              <button
                key={v}
                aria-pressed={view === v}
                onClick={() => {
                  setView(v);
                  setEnabled(true);
                }}
              >
                {v}
              </button>
            ))}
            <button
              aria-label="Reset camera"
              onClick={() => {
                setView("isometric");
                setReset((r) => r + 1);
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="viewer-options">
            {s.kind === "tree" ? (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={exploded}
                    onChange={(e) => {
                      setExploded(e.target.checked);
                      setEnabled(true);
                    }}
                  />{" "}
                  Exploded layers
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={air}
                    onChange={(e) => {
                      setAir(e.target.checked);
                      setEnabled(true);
                    }}
                  />{" "}
                  Output openings
                </label>
              </>
            ) : (
              <label>
                <input
                  type="checkbox"
                  checked={claim}
                  onChange={(e) => {
                    setClaim(e.target.checked);
                    setEnabled(true);
                  }}
                />{" "}
                {s.fullWorldHeight
                  ? `Show ${s.claimSize} × ${s.claimSize} territory · full world height`
                  : `Show ${s.claimSize} × ${s.claimSize} × ${s.claimSize} territory`}
              </label>
            )}
          </div>
        </div>
        <div className="layer-controls">
          <button
            aria-label="Previous layer"
            disabled={layer === 0}
            onClick={() => changeLayer(layer - 1)}
          >
            <ChevronLeft />
          </button>
          <label>
            BUILD THROUGH LAYER {layer + 1} OF {max + 1}
            <input
              aria-label="Build through layer"
              type="range"
              min="0"
              max={max || 1}
              value={layer}
              disabled={!max}
              onChange={(e) => changeLayer(+e.target.value)}
            />
          </label>
          <button
            aria-label="Next layer"
            disabled={layer === max}
            onClick={() => changeLayer(layer + 1)}
          >
            <ChevronRight />
          </button>
        </div>
        <p className="step-description">{s.steps[layer]}</p>

        <p className="share-status" role="status">
          {share}
        </p>
      </div>
      <section className="guide-split materials-section">
        <div>
          <h2>Your materials</h2>
          <p>Check off what you have. Counts include every solid block.</p>
          {s.blocks.some((b) => b.material === "FIRE") && (
            <p>
              Bring flint and steel to light the netherrack on the final layer.
            </p>
          )}
          <div className="materials-list">
            {Object.entries(materials(s)).map(([name, count]) => (
              <label
                key={name}
                className={checked.includes(name) ? "checked" : ""}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(name)}
                  onChange={(e) =>
                    setChecked((c) =>
                      e.target.checked
                        ? [...c, name]
                        : c.filter((n) => n !== name),
                    )
                  }
                />
                <span
                  className="material-swatch"
                  style={{ background: palette[name] }}
                />
                <span>{title(name)}</span>
                <strong>× {count}</strong>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h2>One layer at a time</h2>
          <p>
            Top-down diagrams. North is up. Empty dots are open space; outlined
            slots must remain air.
          </p>
          <div className="layer-diagrams">
            {Array.from({ length: max + 1 }, (_, y) => (
              <button
                key={y}
                className={`diagram ${y === layer ? "active" : ""}`}
                onClick={() => {
                  changeLayer(y);
                  viewerRef.current?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                    block: "start",
                  });
                }}
                aria-label={`Show layer ${y + 1}`}
              >
                <span>Layer {y + 1}</span>
                <div
                  className={`diagram-grid ${width === 3 ? "three" : ""}`}
                  style={{
                    gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: width * width }, (_, i) => {
                    const half = Math.floor(width / 2),
                      x = (i % width) - half,
                      z = Math.floor(i / width) - half;
                    const b = s.blocks.find(
                      (b) => b.x === x && b.z === z && b.y === y,
                    );
                    return (
                      <span
                        key={i}
                        title={
                          b ? `${title(b.material)}: ${b.role}` : "Empty space"
                        }
                        className={b?.role === "air" ? "required-air" : ""}
                        style={
                          b && b.role !== "air"
                            ? { background: palette[b.material] }
                            : {}
                        }
                      >
                        {b?.role === "core"
                          ? "C"
                          : b?.role === "air"
                            ? "○"
                            : b
                              ? ""
                              : "·"}
                      </span>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>
          <p className="small-note">
            C = core · ○ = required output air · layer 1 is the base.
          </p>
        </div>
      </section>
    </>
  );
}
