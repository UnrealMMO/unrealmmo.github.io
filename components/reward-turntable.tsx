"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Model = {
  angle: number;
  meshes: { texture: string; positions: number[]; uvs: number[] }[];
};
export function RewardTurntable({ id, label }: { id: string; label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const control = useRef<((running: boolean) => void) | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    pausedRef.current = paused;
    control.current?.(!paused);
  }, [paused]);
  useEffect(() => {
    const container = host.current!;
    const abort = new AbortController();
    let cancelled = false;
    let dispose = () => {};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    pausedRef.current = reduced.matches;
    setPaused(reduced.matches);
    setReady(false);
    const preference = () => {
      pausedRef.current = reduced.matches;
      setPaused(reduced.matches);
    };
    reduced.addEventListener("change", preference);
    void (async () => {
      try {
        const [T, response] = await Promise.all([
          import("three"),
          fetch(`/season/models/${id}.json`, { signal: abort.signal }),
        ]);
        if (!response.ok) throw new Error("Model unavailable");
        const model: Model = await response.json();
        if (cancelled) return;
        const textures: import("three").Texture[] = [];
        dispose = () => textures.forEach((texture) => texture.dispose());
        for (const mesh of model.meshes) {
          const texture = await new T.TextureLoader().loadAsync(mesh.texture);
          if (cancelled) {
            texture.dispose();
            return;
          }
          textures.push(texture);
        }
        const scene = new T.Scene(),
          group = new T.Group();
        const geometries: import("three").BufferGeometry[] = [];
        const materials: import("three").MeshLambertMaterial[] = [];
        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
        } catch (error) {
          textures.forEach((texture) => texture.dispose());
          throw error;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute("aria-label", `${label}, 3D model`);
        model.meshes.forEach((mesh, index) => {
          const geometry = new T.BufferGeometry();
          geometry.setAttribute(
            "position",
            new T.Float32BufferAttribute(mesh.positions, 3),
          );
          geometry.setAttribute(
            "uv",
            new T.Float32BufferAttribute(mesh.uvs, 2),
          );
          geometry.computeVertexNormals();
          const texture = textures[index];
          texture.colorSpace = T.SRGBColorSpace;
          texture.magFilter = T.NearestFilter;
          texture.minFilter = T.NearestFilter;
          const material = new T.MeshLambertMaterial({
            map: texture,
            side: T.DoubleSide,
            alphaTest: 0.05,
          });
          geometries.push(geometry);
          materials.push(material);
          group.add(new T.Mesh(geometry, material));
        });
        const bounds = new T.Box3().setFromObject(group),
          center = bounds.getCenter(new T.Vector3());
        const radius = bounds.getSize(new T.Vector3()).length() / 2;
        group.children.forEach((child) => child.position.sub(center));
        group.rotation.y = T.MathUtils.degToRad(model.angle);
        scene.add(group, new T.HemisphereLight(0xffffff, 0x67756b, 2));
        const light = new T.DirectionalLight(0xffffff, 2);
        light.position.set(-5, 10, -8);
        scene.add(light);
        const extent = radius * 1.25;
        const camera = new T.OrthographicCamera(
          -extent,
          extent,
          extent,
          -extent,
          0.01,
          radius * 12,
        );
        camera.position.set(0, radius * 1.24, -radius * 3.8);
        camera.lookAt(0, 0, 0);
        let frame = 0,
          previous = 0,
          running = !pausedRef.current;
        const render = () => renderer.render(scene, camera);
        const animate = (now: number) => {
          frame = 0;
          if (cancelled || !running || document.hidden) return;
          if (previous)
            group.rotation.y +=
              (Math.min((now - previous) / 1000, 0.1) * Math.PI) / 12;
          previous = now;
          render();
          frame = requestAnimationFrame(animate);
        };
        const update = () => {
          cancelAnimationFrame(frame);
          frame = 0;
          previous = 0;
          if (running && !document.hidden && !cancelled)
            frame = requestAnimationFrame(animate);
        };
        control.current = (value) => {
          running = value;
          update();
        };
        const resize = new ResizeObserver(() => {
          const size = container.clientWidth;
          renderer.setSize(size, size);
          render();
        });
        resize.observe(container);
        document.addEventListener("visibilitychange", update);
        container.appendChild(renderer.domElement);
        dispose = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          document.removeEventListener("visibilitychange", update);
          control.current = null;
          geometries.forEach((g) => g.dispose());
          materials.forEach((m) => m.dispose());
          textures.forEach((t) => t.dispose());
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        };
        setReady(true);
        update();
      } catch {
        dispose();
        /* Retain the static preview if WebGL or the model is unavailable. */
      }
    })();
    return () => {
      cancelled = true;
      abort.abort();
      reduced.removeEventListener("change", preference);
      dispose();
    };
  }, [id, label]);
  return (
    <>
      <div className="reward-live-model" ref={host}>
        {!ready && (
          <img
            src={`/season/rewards/${id}-0.webp`}
            width={360}
            height={360}
            alt={label}
          />
        )}
      </div>
      {ready && (
        <div className="reward-turn">
          <button
            aria-label={paused ? "Resume rotation" : "Pause rotation"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}{" "}
            {paused ? "Rotate" : "Pause"}
          </button>
        </div>
      )}
    </>
  );
}
