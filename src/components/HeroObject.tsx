import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellMat = useRef<any>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    target.current.x = y * 0.5;
    target.current.y = x * 0.8;

    if (group.current) {
      group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.05;
      group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.05 + delta * 0.06;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.15;
      wireRef.current.rotation.y += delta * 0.2;
    }
    if (shellMat.current) {
      shellMat.current.distort = 0.32 + Math.sin(t * 0.6) * 0.06;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.6) * 0.05;
      coreRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Warm golden inner energy core — always visible */}
      <Sphere ref={coreRef} args={[0.52, 48, 48]}>
        <meshBasicMaterial color="#ffd27a" toneMapped={false} />
      </Sphere>

      {/* Soft golden halo */}
      <Sphere args={[0.72, 40, 40]}>
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.28}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Glass / crystal distorted shell */}
      <Icosahedron ref={shellRef} args={[1.3, 4]}>
        <MeshDistortMaterial
          ref={shellMat}
          color="#7aa2ff"
          emissive="#4c6ef5"
          emissiveIntensity={0.55}
          roughness={0.08}
          metalness={0.35}
          transparent
          opacity={0.55}
          distort={0.34}
          speed={1.1}
        />
      </Icosahedron>

      {/* Outer wireframe lattice */}
      <Icosahedron ref={wireRef} args={[1.55, 2]}>
        <meshBasicMaterial
          color="#8ab4ff"
          wireframe
          transparent
          opacity={0.28}
          toneMapped={false}
        />
      </Icosahedron>
    </group>
  );
}

export function HeroObject() {
  return (
    <Canvas
  dpr={[1, 2]}
  camera={{ position: [0, 0, 3.6], fov: 45 }}
  gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
  style={{
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  }}
>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} color="#7ee8ff" />
      <directionalLight position={[-4, -2, -2]} intensity={0.9} color="#a78bfa" />
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#ffb347" distance={4} />
      <pointLight position={[2, -1, 2]} intensity={0.8} color="#22d3ee" />
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
        <Core />
      </Float>
      <Environment preset="night" />
    </Canvas>
  );
}
