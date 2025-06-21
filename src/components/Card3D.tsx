import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Points, Point, Environment } from '@react-three/drei';
import { MathUtils, PointLight } from 'three';

// --- Props Interface ---
interface Card3DProps {
  scroll: number;
  mouse: { x: number; y: number };
}

// --- Particle System Component ---
const FlowingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        x: MathUtils.randFloatSpread(5),
        y: MathUtils.randFloatSpread(10),
        z: MathUtils.randFloat(0.3, 0.4),
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.children.forEach((point) => {
        point.position.y += 0.02;
        if (point.position.y > 5.5) point.position.y = -5.5;
      });
    }
  });

  return (
    <Points ref={pointsRef}>
      <pointsMaterial color="#00FFFF" size={0.05} sizeAttenuation transparent opacity={0.7} />
      {particles.map((p, i) => <Point key={i} position={[p.x, p.y, p.z]} />)}
    </Points>
  );
};

// --- Monolith Component ---
const Monolith = ({ scroll }: { scroll: number }) => {
  const groupRef = useRef<THREE.Group>(null!);

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
      <FlowingParticles />
    </group>
  );
};

// --- Main 3D Scene Wrapper ---
const Card3D = ({ scroll, mouse }: Card3DProps) => {
  const sceneRef = useRef<THREE.Group>(null!);

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
        <pointLight position={[0, 0, 15]} color="#40E0D0" distance={40} intensity={Math.min(scroll / 0.1, 1) * 60} />
        <Environment preset="city" />
        <group ref={sceneRef}>
          <Monolith scroll={scroll} />
        </group>
      </Canvas>
    </div>
  );
};

export default Card3D;
