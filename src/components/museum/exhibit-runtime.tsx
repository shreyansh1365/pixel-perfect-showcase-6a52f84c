import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { Artifact } from "./exhibits";

type Registered = { artifact: Artifact; position: THREE.Vector3 };

type ExhibitState = {
  /** artifact the visitor is standing next to, if any */
  nearby: Artifact | null;
  /** artifact whose information panel is open */
  active: Artifact | null;
  open: (a: Artifact) => void;
  close: () => void;
  register: (r: Registered) => () => void;
  registry: React.MutableRefObject<Registered[]>;
  setNearby: (a: Artifact | null) => void;
};

const Ctx = createContext<ExhibitState | null>(null);

export function useExhibitState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExhibitState must be used inside <ExhibitProvider>");
  return ctx;
}

export function ExhibitProvider({ children }: { children: ReactNode }) {
  const [nearby, setNearby] = useState<Artifact | null>(null);
  const [active, setActive] = useState<Artifact | null>(null);
  const registry = useRef<Registered[]>([]);

  const value = useMemo<ExhibitState>(
    () => ({
      nearby,
      active,
      open: (a) => setActive(a),
      close: () => setActive(null),
      registry,
      setNearby,
      register: (r) => {
        registry.current.push(r);
        return () => {
          registry.current = registry.current.filter((x) => x !== r);
        };
      },
    }),
    [nearby, active]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const INTERACT_RADIUS = 4.2;
