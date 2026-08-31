import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, useTexture } from "@react-three/drei";
import * as THREE from "three";

import type { Artifact, WallExhibit } from "./exhibits";
import { INTERACT_RADIUS, useExhibitState } from "./exhibit-runtime";

const frameMat = new THREE.MeshStandardMaterial({ color: "#b99a63", roughness: 0.5, metalness: 0.35 });
const mountMat = new THREE.MeshStandardMaterial({ color: "#fbf7f0", roughness: 0.95 });
const labelMat = new THREE.MeshStandardMaterial({ color: "#f7f2e8", roughness: 0.9 });

function useAspect(texture: THREE.Texture) {
  const img = texture.image as { width: number; height: number } | undefined;
  return img && img.height ? img.width / img.height : 1;
}

/* ---------------- artifact on a pedestal ---------------- */

export function ArtifactExhibit({
  artifact,
  position,
}: {
  artifact: Artifact;
  /** world position of the pedestal top */
  position: [number, number, number];
}) {
  const texture = useTexture(artifact.image);
  const aspect = useAspect(texture);
  const group = useRef<THREE.Group>(null);
  const spot = useRef<THREE.SpotLight>(null);
  const { camera } = useThree();
  const { register, nearby, active, open } = useExhibitState();

  const h = artifact.height;
  const w = h * aspect;

  useEffect(() => {
    const entry = { artifact, position: new THREE.Vector3(...position) };
    return register(entry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artifact.id]);

  useEffect(() => {
    if (spot.current) spot.current.target.position.set(position[0], position[1], position[2]);
  }, [position]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    // billboard on the Y axis only, so the artifact always reads correctly
    const dx = camera.position.x - position[0];
    const dz = camera.position.z - position[2];
    g.rotation.y = Math.atan2(dx, dz);
  });

  const highlighted = nearby?.id === artifact.id || active?.id === artifact.id;
  const prompt = nearby?.id === artifact.id && !active;

  return (
    <group>
      <spotLight
        ref={spot}
        position={[position[0], position[1] + 4.2, position[2] + 0.6]}
        angle={0.42}
        penumbra={0.85}
        intensity={highlighted ? 34 : 20}
        distance={12}
        decay={2}
        color="#fff6e6"
        castShadow
      />
      <group ref={group} position={[position[0], position[1] + h / 2, position[2]]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            open(artifact);
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.35}
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* soft contact shadow on the plinth */}
        <mesh position={[0, -h / 2 + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[Math.max(w, 0.5) * 0.45, 20]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.12} />
        </mesh>
      </group>

      <ArtifactLabel artifact={artifact} position={position} highlighted={prompt} />
    </group>
  );
}

function ArtifactLabel({
  artifact,
  position,
  highlighted,
}: {
  artifact: Artifact;
  position: [number, number, number];
  highlighted: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const dx = camera.position.x - position[0];
    const dz = camera.position.z - position[2];
    g.rotation.y = Math.atan2(dx, dz);
  });

  return (
    <group ref={group} position={[position[0], position[1] - 0.42, position[2] + 0.0]}>
      <group position={[0, 0, 0.78]} rotation={[-0.35, 0, 0]}>
        <mesh material={labelMat} castShadow>
          <boxGeometry args={[1.05, 0.56, 0.03]} />
        </mesh>
        <Text position={[0, 0.185, 0.03]} fontSize={0.075} color="#5c3a26" anchorX="center" anchorY="middle" letterSpacing={0.08}>
          {artifact.label[0]}
        </Text>
        <Text position={[0, 0.07, 0.03]} fontSize={0.058} color="#8a8070" anchorX="center" anchorY="middle">
          {artifact.label[1]}
        </Text>
        <Text position={[0, -0.035, 0.03]} fontSize={0.055} color="#8a8070" anchorX="center" anchorY="middle">
          {artifact.label[2]}
        </Text>
        {highlighted && (
          <Text position={[0, -0.18, 0.03]} fontSize={0.055} color="#a35b2f" anchorX="center" anchorY="middle" letterSpacing={0.1}>
            PRESS E TO EXPLORE
          </Text>
        )}
      </group>
    </group>
  );
}

/* ---------------- framed wall exhibit ---------------- */

export function WallExhibitFrame({
  exhibit,
  position,
  rotationY = 0,
  w = 2.4,
  h = 1.7,
}: {
  exhibit: WallExhibit;
  position: [number, number, number];
  rotationY?: number;
  w?: number;
  h?: number;
}) {
  const texture = useTexture(exhibit.image);
  const aspect = useAspect(texture);

  // cover-fit the artwork inside the frame opening
  const map = useMemo(() => {
    const t = texture.clone();
    t.needsUpdate = true;
    const frameAspect = w / h;
    if (aspect > frameAspect) {
      t.repeat.set(frameAspect / aspect, 1);
      t.offset.set((1 - frameAspect / aspect) / 2, 0);
    } else {
      t.repeat.set(1, aspect / frameAspect);
      t.offset.set(0, (1 - aspect / frameAspect) / 2);
    }
    return t;
  }, [texture, aspect, w, h]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh material={frameMat} castShadow>
        <boxGeometry args={[w + 0.18, h + 0.18, 0.08]} />
      </mesh>
      <mesh position={[0, 0, 0.055]} material={mountMat}>
        <boxGeometry args={[w, h, 0.04]} />
      </mesh>
      <mesh position={[0, 0.14, 0.08]}>
        <planeGeometry args={[w - 0.18, h - 0.46]} />
        <meshStandardMaterial map={map} roughness={0.9} />
      </mesh>
      <Text
        position={[0, -h / 2 + 0.21, 0.08]}
        fontSize={0.088}
        color="#5c3a26"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        maxWidth={w - 0.3}
      >
        {exhibit.title.toUpperCase()}
      </Text>
      <Text
        position={[0, -h / 2 + 0.1, 0.08]}
        fontSize={0.066}
        color="#8a8070"
        anchorX="center"
        anchorY="middle"
        maxWidth={w - 0.3}
      >
        {exhibit.caption}
      </Text>
      {/* discreet picture light */}
      <pointLight position={[0, h / 2 + 0.5, 0.9]} intensity={5} distance={5} decay={2} color="#fff4e0" />
    </group>
  );
}

/* ---------------- proximity + focus ---------------- */

export function ExhibitWatcher() {
  const { registry, setNearby, nearby, active } = useExhibitState();
  const { camera } = useThree();
  const focus = useRef(new THREE.Quaternion());

  useFrame((_, delta) => {
    let best: { artifact: Artifact; d: number } | null = null;
    for (const entry of registry.current) {
      const d = camera.position.distanceTo(entry.position);
      if (d < INTERACT_RADIUS && (!best || d < best.d)) best = { artifact: entry.artifact, d };
    }
    const id = best?.artifact.id ?? null;
    if (id !== (nearby?.id ?? null)) setNearby(best?.artifact ?? null);

    // when a panel is open, gently turn the camera toward the artifact
    if (active) {
      const entry = registry.current.find((e) => e.artifact.id === active.id);
      if (entry) {
        const m = new THREE.Matrix4().lookAt(camera.position, entry.position, camera.up);
        focus.current.setFromRotationMatrix(m);
        camera.quaternion.slerp(focus.current, Math.min(1, delta * 2.5));
      }
    }
  });

  return null;
}
