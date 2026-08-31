import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, OrbitControls, Text, Environment } from "@react-three/drei";
import * as THREE from "three";

import {
  GALLERIES,
  CORRIDOR_HALF_WIDTH as HW,
  GALLERY_W,
  GALLERY_D,
  WALL_H,
  CORRIDOR_START,
  CORRIDOR_END,
} from "./museum-data";
import { EXHIBITS } from "./exhibits";
import { ExhibitProvider, useExhibitState } from "./exhibit-runtime";
import { ArtifactExhibit, WallExhibitFrame, ExhibitWatcher } from "./Exhibits3D";
import ArtifactPanel from "./ArtifactPanel";


/* ---------------- materials (shared, light museum palette) ---------------- */

const ivory = new THREE.MeshStandardMaterial({ color: "#f4efe6", roughness: 0.92 });
const marble = new THREE.MeshStandardMaterial({ color: "#e9e3d7", roughness: 0.55, metalness: 0.02 });
const sandstone = new THREE.MeshStandardMaterial({ color: "#e6d9c3", roughness: 0.85 });
const stoneDark = new THREE.MeshStandardMaterial({ color: "#cbbda3", roughness: 0.8 });
const plaster = new THREE.MeshStandardMaterial({ color: "#fbf7f0", roughness: 0.95 });
const canvasMat = new THREE.MeshStandardMaterial({ color: "#efe7d8", roughness: 0.9 });
const frameMat = new THREE.MeshStandardMaterial({ color: "#b99a63", roughness: 0.5, metalness: 0.35 });

/* ---------------- primitives ---------------- */

function Box({
  position,
  size,
  material = ivory,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  material?: THREE.Material;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} material={material} castShadow receiveShadow>
      <boxGeometry args={size} />
    </mesh>
  );
}

/** Wall along the Z axis at a fixed X, spanning [z1, z2]. */
function WallZ({ x, z1, z2, h = WALL_H, t = 0.4, material = ivory }: {
  x: number; z1: number; z2: number; h?: number; t?: number; material?: THREE.Material;
}) {
  const len = Math.abs(z2 - z1);
  if (len < 0.01) return null;
  return <Box position={[x, h / 2, (z1 + z2) / 2]} size={[t, h, len]} material={material} />;
}

/** Wall along the X axis at a fixed Z, spanning [x1, x2]. */
function WallX({ z, x1, x2, h = WALL_H, t = 0.4, material = ivory }: {
  z: number; x1: number; x2: number; h?: number; t?: number; material?: THREE.Material;
}) {
  const len = Math.abs(x2 - x1);
  if (len < 0.01) return null;
  return <Box position={[(x1 + x2) / 2, h / 2, z]} size={[len, h, t]} material={material} />;
}

/** Simple Indian-influenced arch: two piers, a lintel, and a shallow semicircular head. */
function Arch({
  position,
  rotationY = 0,
  width = 6,
  height = 5,
}: {
  position: [number, number, number];
  rotationY?: number;
  width?: number;
  height?: number;
}) {
  const r = width / 2;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Box position={[-r - 0.3, height / 2, 0]} size={[0.6, height, 1]} material={sandstone} />
      <Box position={[r + 0.3, height / 2, 0]} size={[0.6, height, 1]} material={sandstone} />
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]} material={sandstone} castShadow>
        <torusGeometry args={[r + 0.3, 0.3, 8, 24, Math.PI]} />
      </mesh>
      <Box position={[0, height + WALL_H * 0 + 1.0, 0]} size={[width + 1.8, 0.35, 1]} material={stoneDark} />
    </group>
  );
}

function Pedestal({ position, h = 1.1 }: { position: [number, number, number]; h?: number }) {
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]} material={marble} castShadow receiveShadow>
        <boxGeometry args={[1.2, h, 1.2]} />
      </mesh>
      <mesh position={[0, h + 0.05, 0]} material={stoneDark} castShadow>
        <boxGeometry args={[1.45, 0.1, 1.45]} />
      </mesh>
    </group>
  );
}

/** Minimal placeholder sculpture — abstract stacked stone forms. */
function PlaceholderSculpture({ position, variant = 0 }: { position: [number, number, number]; variant?: number }) {
  return (
    <group position={position}>
      {variant % 3 === 0 && (
        <>
          <mesh position={[0, 0.55, 0]} material={sandstone} castShadow>
            <cylinderGeometry args={[0.28, 0.36, 1.1, 12]} />
          </mesh>
          <mesh position={[0, 1.25, 0]} material={sandstone} castShadow>
            <sphereGeometry args={[0.32, 16, 12]} />
          </mesh>
        </>
      )}
      {variant % 3 === 1 && (
        <>
          <mesh position={[0, 0.6, 0]} material={stoneDark} castShadow>
            <boxGeometry args={[0.5, 1.2, 0.5]} />
          </mesh>
          <mesh position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]} material={stoneDark} castShadow>
            <octahedronGeometry args={[0.38, 0]} />
          </mesh>
        </>
      )}
      {variant % 3 === 2 && (
        <mesh position={[0, 0.75, 0]} material={sandstone} castShadow>
          <torusGeometry args={[0.5, 0.16, 10, 28]} />
        </mesh>
      )}
    </group>
  );
}

/** Empty framed display panel mounted on a wall. */
function FramePanel({
  position,
  rotationY = 0,
  w = 2.4,
  h = 1.7,
}: {
  position: [number, number, number];
  rotationY?: number;
  w?: number;
  h?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh material={frameMat} castShadow>
        <boxGeometry args={[w + 0.18, h + 0.18, 0.08]} />
      </mesh>
      <mesh position={[0, 0, 0.06]} material={canvasMat}>
        <boxGeometry args={[w, h, 0.04]} />
      </mesh>
    </group>
  );
}

/* ---------------- gallery zone ---------------- */

function Gallery({ n, title, years, side, z }: (typeof GALLERIES)[number]) {
  const innerX = side * HW;
  const outerX = side * (HW + GALLERY_W);
  const z1 = z - GALLERY_D / 2;
  const z2 = z + GALLERY_D / 2;
  const cx = side * (HW + GALLERY_W / 2);
  const doorHalf = 3.2;
  const labelX = side * (HW - 0.35);

  return (
    <group>
      {/* room shell */}
      <WallZ x={outerX} z1={z1} z2={z2} material={plaster} />
      <WallX z={z1} x1={innerX} x2={outerX} material={plaster} />
      <WallX z={z2} x1={innerX} x2={outerX} material={plaster} />

      {/* inner wall with the doorway gap */}
      <WallZ x={innerX} z1={z1} z2={z - doorHalf} material={ivory} />
      <WallZ x={innerX} z1={z + doorHalf} z2={z2} material={ivory} />
      <Box position={[innerX, WALL_H - 0.9, z]} size={[0.4, 1.8, doorHalf * 2]} material={ivory} />

      {/* ceiling with a skylight strip */}
      <Box position={[cx, WALL_H, z]} size={[GALLERY_W, 0.3, GALLERY_D]} material={plaster} />
      <mesh position={[cx, WALL_H - 0.05, z]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[GALLERY_W * 0.45, GALLERY_D * 0.35]} />
        <meshBasicMaterial color="#fffaf0" />
      </mesh>
      <pointLight position={[cx, WALL_H - 1, z]} intensity={45} distance={26} decay={2} color="#fff4e0" />

      {/* doorway arch */}
      <Arch position={[innerX, 0, z]} rotationY={Math.PI / 2} width={doorHalf * 2} height={4.6} />

      {/* entrance signage */}
      <Text
        position={[labelX, 5.0, z]}
        rotation={[0, side === -1 ? Math.PI / 2 : -Math.PI / 2, 0]}
        fontSize={0.62}
        color="#7a4a32"
        anchorX="center"
        anchorY="middle"
      >
        {`${n}  ${title}`}
      </Text>
      <Text
        position={[labelX, 4.35, z]}
        rotation={[0, side === -1 ? Math.PI / 2 : -Math.PI / 2, 0]}
        fontSize={0.3}
        color="#8a8070"
        anchorX="center"
        anchorY="middle"
      >
        {years}
      </Text>

      {/* display furniture — populated from the exhibit system where data exists */}
      {(() => {
        const exhibits = EXHIBITS[n];
        const wallRotY = side === -1 ? Math.PI / 2 : -Math.PI / 2;
        const wallX = outerX - side * 0.3;
        const wallSlots = {
          "wall-a": { position: [wallX, 3, z - 4] as [number, number, number], rotationY: wallRotY, w: 2.4, h: 1.7 },
          "wall-b": { position: [wallX, 3, z] as [number, number, number], rotationY: wallRotY, w: 3, h: 2 },
          "wall-c": { position: [wallX, 3, z + 4] as [number, number, number], rotationY: wallRotY, w: 2.4, h: 1.7 },
        };
        const artifactSlots = {
          "pedestal-left": [cx - 4, 1.15, z - 3] as [number, number, number],
          "pedestal-right": [cx + 4, 1.15, z + 3] as [number, number, number],
          "case-center": [cx, 0.9, z] as [number, number, number],
        };
        const filledWalls = new Set(exhibits?.walls.map((w) => w.slot) ?? []);
        const filledPlinths = new Set(exhibits?.artifacts.map((a) => a.slot) ?? []);

        return (
          <>
            {(Object.keys(wallSlots) as (keyof typeof wallSlots)[]).map((slot) => {
              const cfg = wallSlots[slot];
              const ex = exhibits?.walls.find((w) => w.slot === slot);
              return ex ? (
                <WallExhibitFrame key={slot} exhibit={ex} {...cfg} />
              ) : filledWalls.size > 0 && slot !== "wall-b" ? null : (
                <FramePanel key={slot} {...cfg} />
              );
            })}
            <FramePanel position={[cx, 3, z1 + 0.3]} />
            <FramePanel position={[cx, 3, z2 - 0.3]} rotationY={Math.PI} />

            <Pedestal position={[cx - 4, 0, z - 3]} />
            <Pedestal position={[cx + 4, 0, z + 3]} />
            <Pedestal position={[cx, 0, z]} h={0.8} />

            {exhibits?.artifacts.map((a) => (
              <ArtifactExhibit key={a.id} artifact={a} position={artifactSlots[a.slot]} />
            ))}
            {!filledPlinths.has("pedestal-left") && (
              <PlaceholderSculpture position={[cx - 4, 1.15, z - 3]} variant={Number(n)} />
            )}
            {!filledPlinths.has("pedestal-right") && (
              <PlaceholderSculpture position={[cx + 4, 1.15, z + 3]} variant={Number(n) + 1} />
            )}
          </>
        );
      })()}

    </group>
  );
}

/* ---------------- corridor & entrance hall ---------------- */

function Corridor() {
  const openings = useMemo(() => {
    const left: [number, number][] = [];
    const right: [number, number][] = [];
    for (const g of GALLERIES) (g.side === -1 ? left : right).push([g.z - 3.2, g.z + 3.2]);
    return { left, right };
  }, []);

  const segments = (holes: [number, number][]) => {
    const sorted = [...holes].sort((a, b) => b[0] - a[0]);
    const out: [number, number][] = [];
    let cursor = CORRIDOR_START;
    for (const [a, b] of sorted) {
      out.push([cursor, b]);
      cursor = a;
    }
    out.push([cursor, CORRIDOR_END]);
    return out.filter(([a, b]) => Math.abs(a - b) > 0.05);
  };

  return (
    <group>
      {segments(openings.left).map(([a, b], i) => (
        <WallZ key={`l${i}`} x={-HW} z1={a} z2={b} />
      ))}
      {segments(openings.right).map(([a, b], i) => (
        <WallZ key={`r${i}`} x={HW} z1={a} z2={b} />
      ))}

      {/* corridor ceiling with a continuous skylight slot */}
      <Box position={[0, WALL_H + 0.5, (CORRIDOR_START + CORRIDOR_END) / 2]} size={[HW * 2 + 1, 0.3, CORRIDOR_START - CORRIDOR_END]} material={plaster} />
      <mesh position={[0, WALL_H + 0.33, (CORRIDOR_START + CORRIDOR_END) / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, CORRIDOR_START - CORRIDOR_END - 6]} />
        <meshBasicMaterial color="#fffaf0" />
      </mesh>

      {/* rhythm of piers along the corridor */}
      {Array.from({ length: 10 }).map((_, i) => {
        const z = CORRIDOR_START - 4 - i * 9;
        return (
          <group key={i}>
            <Box position={[-HW + 0.45, WALL_H / 2, z]} size={[0.5, WALL_H, 0.5]} material={sandstone} />
            <Box position={[HW - 0.45, WALL_H / 2, z]} size={[0.5, WALL_H, 0.5]} material={sandstone} />
          </group>
        );
      })}

      {/* end wall */}
      <WallX z={CORRIDOR_END} x1={-HW} x2={HW} material={plaster} />
      <Text position={[0, 3.4, CORRIDOR_END + 0.4]} fontSize={0.55} color="#7a4a32" anchorX="center">
        The Living Timeline of Indian Art
      </Text>
    </group>
  );
}

function EntranceHall() {
  const zFront = CORRIDOR_START + 18;
  return (
    <group>
      <WallX z={zFront} x1={-16} x2={-4} material={plaster} />
      <WallX z={zFront} x1={4} x2={16} material={plaster} />
      <WallZ x={-16} z1={CORRIDOR_START} z2={zFront} material={plaster} />
      <WallZ x={16} z1={CORRIDOR_START} z2={zFront} material={plaster} />
      <WallX z={CORRIDOR_START} x1={-16} x2={-HW} material={ivory} />
      <WallX z={CORRIDOR_START} x1={HW} x2={16} material={ivory} />

      <Box position={[0, WALL_H + 1.5, (CORRIDOR_START + zFront) / 2]} size={[32, 0.3, zFront - CORRIDOR_START]} material={plaster} />
      <mesh position={[0, WALL_H + 1.33, (CORRIDOR_START + zFront) / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial color="#fffaf0" />
      </mesh>
      <pointLight position={[0, WALL_H, (CORRIDOR_START + zFront) / 2]} intensity={70} distance={34} decay={2} color="#fff4e0" />

      <Arch position={[0, 0, CORRIDOR_START]} width={9} height={5.6} />
      <Arch position={[0, 0, zFront]} width={7} height={5.2} />

      {/* hall columns */}
      {[-10, 10].map((x) =>
        [zFront - 5, zFront - 12].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, WALL_H / 2 + 0.7, z]} material={sandstone} castShadow>
            <cylinderGeometry args={[0.55, 0.7, WALL_H + 1.4, 14]} />
          </mesh>
        ))
      )}

      <Text position={[0, 6.2, CORRIDOR_START + 0.6]} fontSize={0.7} color="#7a4a32" anchorX="center">
        Enter the Timeline
      </Text>
      <Pedestal position={[-7, 0, zFront - 8]} />
      <PlaceholderSculpture position={[-7, 1.15, zFront - 8]} variant={2} />
      <Pedestal position={[7, 0, zFront - 8]} />
      <PlaceholderSculpture position={[7, 1.15, zFront - 8]} variant={0} />
    </group>
  );
}

/* ---------------- first-person controller ---------------- */

const keys: Record<string, boolean> = {};

function FirstPerson({ enabled }: { enabled: boolean }) {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());

  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys[e.code] = true);
    const up = (e: KeyboardEvent) => (keys[e.code] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    if (!enabled) return;
    const speed = (keys["ShiftLeft"] ? 12 : 6) * delta;
    const dir = new THREE.Vector3();
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

    if (keys["KeyW"] || keys["ArrowUp"]) dir.add(forward);
    if (keys["KeyS"] || keys["ArrowDown"]) dir.sub(forward);
    if (keys["KeyD"] || keys["ArrowRight"]) dir.add(right);
    if (keys["KeyA"] || keys["ArrowLeft"]) dir.sub(right);

    if (dir.lengthSq() > 0) {
      dir.normalize().multiplyScalar(speed);
      velocity.current.copy(dir);
      camera.position.add(dir);
    }
    camera.position.y = 1.7;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -(HW + GALLERY_W) + 1, HW + GALLERY_W - 1);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, CORRIDOR_END + 1.5, CORRIDOR_START + 29);
  });

  return null;
}

/* ---------------- scene ---------------- */


function Scene({ firstPerson }: { firstPerson: boolean }) {
  const { active } = useExhibitState();
  return (
    <>
      <color attach="background" args={["#f7f2e9"]} />
      <fog attach="fog" args={["#f7f2e9", 45, 150]} />

      <hemisphereLight args={["#fffaf0", "#e3d9c6", 1.15]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[18, 34, 20]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-camera-far={140}
      />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]} receiveShadow material={marble}>
        <planeGeometry args={[80, 200]} />
      </mesh>
      {/* corridor runner in sandstone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -34]} receiveShadow material={sandstone}>
        <planeGeometry args={[6, 120]} />
      </mesh>

      <EntranceHall />
      <Corridor />
      {GALLERIES.map((g) => (
        <Gallery key={g.n} {...g} />
      ))}

      <ExhibitWatcher />

      <Environment preset="city" environmentIntensity={0.25} />

      {firstPerson ? (
        <>
          {!active && <PointerLockControls />}
          <FirstPerson enabled={!active} />
        </>
      ) : (
        <OrbitControls target={[0, 2, -20]} maxPolarAngle={Math.PI / 2.05} enableDamping enabled={!active} />
      )}
    </>
  );
}

export default function Museum() {
  return (
    <ExhibitProvider>
      <MuseumExperience />
    </ExhibitProvider>
  );
}

function MuseumExperience() {
  const [firstPerson, setFirstPerson] = useState(true);
  const { nearby, active, open, close } = useExhibitState();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "KeyE" && nearby && !active) {
        e.preventDefault();
        open(nearby);
      }
      if (e.code === "Escape" && active) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearby, active, open, close]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: 62, position: [0, 1.7, 38], near: 0.1, far: 250 }}
      >
        <Suspense fallback={null}>
          <Scene firstPerson={firstPerson} />
        </Suspense>
      </Canvas>

      {/* proximity prompt */}
      {nearby && !active && (
        <div className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 border border-border bg-background/85 px-4 py-2 backdrop-blur-sm">
          <span className="eyebrow">Press E to explore · {nearby.name}</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6">
        <div className="pointer-events-auto flex items-center gap-4 border border-border bg-background/85 px-5 py-3 backdrop-blur-sm">
          <span className="eyebrow">
            {firstPerson ? "Click to look · WASD to walk · Shift to stride · E to explore" : "Drag to orbit · scroll to zoom"}
          </span>
          <button
            onClick={() => setFirstPerson((v) => !v)}
            className="eyebrow border-b border-primary/50 pb-0.5 !text-primary transition-colors hover:border-primary"
          >
            {firstPerson ? "Orbit view" : "Walk inside"}
          </button>
        </div>
      </div>

      {firstPerson && !active && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/40" />
      )}

      {active && <ArtifactPanel artifact={active} onClose={close} />}
    </div>
  );
}

