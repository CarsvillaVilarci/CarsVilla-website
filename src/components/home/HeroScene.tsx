"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, Lightformer } from "@react-three/drei";
import * as THREE from "three";

function AlloyWheel() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z -= delta * 0.35;
  });

  const spokes = Array.from({ length: 5 });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {/* Tyre */}
      <mesh castShadow>
        <torusGeometry args={[2.1, 0.62, 32, 96]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.75} metalness={0.2} />
      </mesh>
      {/* Rim outer ring */}
      <mesh>
        <torusGeometry args={[1.55, 0.16, 24, 80]} />
        <meshStandardMaterial color="#d7d9dd" roughness={0.18} metalness={1} />
      </mesh>
      {/* Rim face */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.35, 64]} />
        <meshStandardMaterial color="#3a3d44" roughness={0.35} metalness={0.9} />
      </mesh>
      {/* Spokes */}
      {spokes.map((_, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, (i / spokes.length) * Math.PI * 2]}
          position={[0, 0, 0.05]}
        >
          <boxGeometry args={[0.34, 1.4, 0.5]} />
          <meshStandardMaterial color="#e7e8ea" roughness={0.16} metalness={1} />
        </mesh>
      ))}
      {/* Hub cap */}
      <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.2, 48]} />
        <meshStandardMaterial color="#111114" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Brand centre */}
      <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.12, 32]} />
        <meshStandardMaterial
          color="#e11d2a"
          emissive="#e11d2a"
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

/** Studio reflections built in-scene — no external HDR file, so it never blocks. */
function StudioEnv() {
  return (
    <Environment resolution={256}>
      <Lightformer intensity={4} position={[0, 4, -6]} scale={[10, 6, 1]} color="#ffffff" />
      <Lightformer intensity={3} position={[-5, 1, 2]} scale={[6, 6, 1]} color="#7dd3fc" />
      <Lightformer intensity={5} position={[5, -1, 2]} scale={[6, 6, 1]} color="#e11d2a" />
      <Lightformer intensity={2} position={[0, -4, 2]} scale={[10, 4, 1]} color="#fbbf24" />
    </Environment>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[6, 6, 8]} angle={0.4} penumbra={1} intensity={2.4} color="#ffffff" />
      <spotLight position={[-7, -3, 4]} angle={0.5} penumbra={1} intensity={2.6} color="#e11d2a" />
      <pointLight position={[0, 3, 6]} intensity={1.4} color="#7dd3fc" />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.8}>
          <AlloyWheel />
        </Float>
        <ContactShadows position={[0, -2.7, 0]} opacity={0.5} scale={12} blur={2.6} far={4} />
        <StudioEnv />
      </Suspense>
    </Canvas>
  );
}
