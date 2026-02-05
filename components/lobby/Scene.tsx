"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Node() {
  return (
    <mesh rotation={[0.3, 0.4, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color="#3f3f46" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

export function LobbyScene() {
  return (
    <Canvas camera={{ position: [2.4, 1.6, 2.8], fov: 55 }}>
      <color attach="background" args={["#09090b"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.4} />
      <Node />
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
