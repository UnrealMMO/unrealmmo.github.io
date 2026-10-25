"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { OrbitControls as Controls } from "three-stdlib";
import { palette, type Structure } from "@/content/game";
function LanternModel({ selected }: { selected: boolean }) {
  const frame = selected ? "#e6cd85" : "#424d50";
  return (
    <group>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial
          color={selected ? "#fff0a3" : "#ffd27c"}
          emissive="#ff9b32"
          emissiveIntensity={0.65}
          roughness={0.45}
        />
        <Edges color={selected ? "#fff7cf" : "#bd813b"} />
      </mesh>
      {[-0.2, 0.2].flatMap((x) =>
        [-0.2, 0.2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.25, z]}>
            <boxGeometry args={[0.04, 0.42, 0.04]} />
            <meshStandardMaterial
              color={frame}
              roughness={0.55}
              metalness={0.65}
            />
          </mesh>
        )),
      )}
      {[-0.46, -0.02].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[0.48, 0.08, 0.48]} />
          <meshStandardMaterial
            color={frame}
            roughness={0.55}
            metalness={0.65}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color={frame} roughness={0.55} metalness={0.65} />
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.17, 0]}>
          <boxGeometry args={[0.04, 0.14, 0.04]} />
          <meshStandardMaterial
            color={frame}
            roughness={0.55}
            metalness={0.65}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.24, 0.04, 0.04]} />
        <meshStandardMaterial color={frame} roughness={0.55} metalness={0.65} />
      </mesh>
    </group>
  );
}
function Camera({
  view,
  reset,
  claim,
  exploded,
  tree,
  claimSize,
  claimHeight,
  claimCenter,
  structureHeight,
}: {
  view: string;
  reset: number;
  claim: boolean;
  exploded: boolean;
  tree: boolean;
  claimSize: number;
  claimHeight: number;
  claimCenter: number;
  structureHeight: number;
}) {
  const { camera, invalidate, size } = useThree();
  const controls = useRef<Controls>(null);
  useEffect(() => {
    const d =
      (claim
        ? Math.max(claimSize, claimHeight) * 1.8
        : Math.max(
            exploded ? 13 : 10,
            structureHeight * (exploded ? 2.8 : 1.8),
          )) / Math.min(1, size.width / size.height);
    const positions: Record<string, [number, number, number]> = {
      isometric: [d, d * 0.7, d],
      front: [0, d * 0.15, d],
      side: [d, d * 0.15, 0],
      top: [0, d, 0.001],
    };
    const position = positions[view];
    camera.position.set(
      position[0],
      position[1] + (claim ? claimCenter : 0),
      position[2],
    );
    controls.current?.target.set(
      0,
      claim
        ? claimCenter
        : tree
          ? exploded
            ? 3.2
            : 2
          : structureHeight * (exploded ? 0.8 : 0.5),
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
    claimSize,
    claimHeight,
    claimCenter,
    structureHeight,
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
      maxDistance={Math.max(45, claimSize * 4, claimHeight * 4)}
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
      camera={{ position: [10, 7, 10], fov: 38, far: 5000 }}
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
        claimSize={structure.claimSize ?? 17}
        claimHeight={structure.claimHeight ?? structure.claimSize ?? 17}
        claimCenter={
          structure.fullWorldHeight
            ? structure.claimFloor! + (structure.claimHeight! - 1) / 2
            : 0
        }
        structureHeight={Math.max(...structure.blocks.map((b) => b.y))}
      />
      <group>
        {structure.blocks.map((b, i) => {
          if (b.y > layer || (b.role === "air" && !air)) return null;
          const isAir = b.role === "air";
          if (b.material === "LANTERN")
            return (
              <group
                key={i}
                position={[b.x, b.y * (exploded ? 1.6 : 1), b.z]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(i);
                }}
              >
                <LanternModel selected={selected === i} />
              </group>
            );
          return (
            <mesh
              key={i}
              position={[b.x, b.y * (exploded ? 1.6 : 1), b.z]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
            >
              {b.material === "FIRE" ? (
                <coneGeometry args={[0.42, 0.97, 4]} />
              ) : (
                <boxGeometry args={[0.97, 0.97, 0.97]} />
              )}
              <meshStandardMaterial
                color={selected === i ? "#fff0a3" : palette[b.material]}
                emissive={b.material === "FIRE" ? "#e76516" : "#000000"}
                emissiveIntensity={b.material === "FIRE" ? 0.8 : 0}
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
          <mesh
            position={
              structure.fullWorldHeight
                ? [
                    -0.5,
                    structure.claimFloor! + (structure.claimHeight! - 1) / 2,
                    -0.5,
                  ]
                : (structure.stage ?? 1) > 1
                  ? [-0.5, 0.5, -0.5]
                  : [0, 0, 0]
            }
          >
            <boxGeometry
              args={[
                structure.claimSize!,
                structure.claimHeight ?? structure.claimSize!,
                structure.claimSize!,
              ]}
            />
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
