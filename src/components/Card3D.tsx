import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Points, Point, Environment } from '@react-three/drei';
import { MathUtils } from 'three';
// Import the store's hook to get state
import { useAppStore } from '../store/appStore';

// --- Monolith Component ---
const Monolith = () => {
  const groupRef = useRef<THREE.Group>(null!);
  // Get the 'scroll' value directly from the global store
  const scroll = useAppStore((state) => state.scroll);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);
    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.5;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[7.5, 12, 0.8]} radius={0.2} bevel={0.05}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
      </RoundedBox>
    </group>
  );
};

// --- Main 3D Scene Wrapper ---
const Card3D = () => {
  const sceneRef = useRef<THREE.Group>(null!);
  // Get the 'mouse' value directly from the global store
  const mouse = useAppStore((state) => state.mouse);

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, mouse.x * 0.1, 0.1);
      sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, -mouse.y * 0.1, 0.1);
    }
  });

  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        <group ref={sceneRef}>
          <Monolith />
        </group>
      </Canvas>
    </div>
  );
};

export default Card3D;