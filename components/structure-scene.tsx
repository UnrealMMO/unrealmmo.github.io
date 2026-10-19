"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { OrbitControls as Controls } from "three-stdlib";
import { palette, type Structure } from "@/content/game";
function Camera({
  view,
  reset,
  claim,
  exploded,
  tree,
}: {
  view: string;
  reset: number;
  claim: boolean;
  exploded: boolean;
  tree: boolean;
}) {
  const { camera, invalidate, size } = useThree();
  const controls = useRef<Controls>(null);
  useEffect(() => {
    const d =
      (claim ? 30 : exploded ? 13 : 10) / Math.min(1, size.width / size.height);
    const positions: Record<string, [number, number, number]> = {
      isometric: [d, d * 0.7, d],
      front: [0, d * 0.15, d],
      side: [d, d * 0.15, 0],
      top: [0, d, 0.001],
    };
    camera.position.set(...positions[view]);
    controls.current?.target.set(
      0,
      claim ? 0 : tree ? (exploded ? 3.2 : 2) : 0,
      0,
    );
    controls.current?.update();
    camera.updateProjectionMatrix();
    invalidate();
  }, [
    camera,
    view,
    reset,
    claim,
    exploded,
    tree,
    size.width,
    size.height,
    invalidate,
  ]);
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping={false}
      minDistance={4}
      maxDistance={45}
      maxPolarAngle={Math.PI * 0.9}
    />
  );
}
export default function StructureScene({
  structure,
  layer,
  exploded,
  air,
  claim,
  view,
  reset,
  selected,
  onSelect,
}: {
  structure: Structure;
  layer: number;
  exploded: boolean;
  air: boolean;
  claim: boolean;
  view: string;
  reset: number;
  selected: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.6]}
      camera={{ position: [10, 7, 10], fov: 38 }}
      aria-label={`Interactive 3D model of ${structure.name}`}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute("data-viewer-ready", "true");
      }}
    >
      <color attach="background" args={["#122c27"]} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 12, 8]} intensity={2.3} />
      <directionalLight
        position={[-6, 4, -3]}
        intensity={1.1}
        color="#8acdb1"
      />
      <Camera
        view={view}
        reset={reset}
        claim={claim}
        exploded={exploded}
        tree={structure.kind === "tree"}
      />
      <group>
        {structure.blocks.map((b, i) => {
          if (b.y > layer || (b.role === "air" && !air)) return null;
          const isAir = b.role === "air";
          return (
            <mesh
              key={i}
              position={[b.x, b.y * (exploded ? 1.6 : 1), b.z]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
            >
              <boxGeometry args={[0.97, 0.97, 0.97]} />
              <meshStandardMaterial
                color={selected === i ? "#fff0a3" : palette[b.material]}
                roughness={0.65}
                metalness={isAir ? 0 : 0.25}
                transparent={isAir}
                opacity={isAir ? 0.12 : 1}
              />
              <Edges
                color={
                  selected === i ? "#fff7cf" : isAir ? "#c5dcb3" : "#233e34"
                }
              />
            </mesh>
          );
        })}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]}>
          <planeGeometry args={[claim ? 22 : 10, claim ? 22 : 10]} />
          <meshStandardMaterial color="#234137" roughness={1} />
        </mesh>
        <gridHelper
          args={[claim ? 22 : 10, claim ? 22 : 10, "#425d4c", "#2f493e"]}
          position={[0, -0.51, 0]}
        />
        {claim && (
          <mesh>
            <boxGeometry args={[17, 17, 17]} />
            <meshBasicMaterial
              color="#c8d995"
              transparent
              opacity={0.035}
              depthWrite={false}
            />
            <Edges color="#d6e5b1" />
          </mesh>
        )}
      </group>
    </Canvas>
  );
}
