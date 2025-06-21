import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment } from '@react-three/drei';
import { MathUtils } from 'three';

// This component receives ONLY primitive numbers as props
interface CardModelProps {
  rotationY: number;
  scale: number;
}

const Monolith = ({ rotationY, scale }: CardModelProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  // We simply apply the calculated values from props
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[7.5, 12, 0.8]} radius={0.2} bevel={0.05}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
      </RoundedBox>
    </group>
  );
};

interface Card3DProps {
  rotationY: number;
  scale: number;
  mouse: { x: number; y: number };
}

const Card3D = ({ rotationY, scale, mouse }: Card3DProps) => {
  const sceneRef = useRef<THREE.Group>(null!);

  // The mouse parallax is also applied directly from props
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
          <Monolith rotationY={rotationY} scale={scale} />
        </group>
      </Canvas>
    </div>
  );
};

export default Card3D;
