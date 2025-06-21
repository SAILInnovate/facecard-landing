import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere } from '@react-three/drei';
import { MathUtils, PointLight, MeshPhysicalMaterial } from 'three';

interface Card3DProps {
  scroll: number;
}

const CardModel = ({ scroll }: { scroll: number }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const neonRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth rotation and scale animations
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);

    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.5;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    // Subtle floating animation
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.2;
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;

    // Neon ball pulse effect
    if (neonRef.current) {
      const pulse = 0.3 + Math.sin(time * 2) * 0.05;
      neonRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main card body with higher resolution and better material */}
      <RoundedBox args={[7.5, 12, 0.5]} radius={0.25} smoothness={4}>
        <meshPhysicalMaterial
          color="#222831"
          metalness={0.9}
          roughness={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          reflectivity={0.9}
        />
      </RoundedBox>
      
      {/* Card inner layer with subtle sheen */}
      <RoundedBox args={[7, 11.5, 0.2]} radius={0.2} position-z={0.2} smoothness={4}>
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.6}
          roughness={0.3}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          envMapIntensity={1.5}
        />
      </RoundedBox>
      
      {/* Enhanced neon ball with glow */}
      <mesh ref={neonRef} position={[0, 4, 0.4]}>
        <Sphere args={[0.3, 64, 64]}>
          <meshPhysicalMaterial
            color="#40E0D0"
            emissive="#40E0D0"
            emissiveIntensity={2}
            roughness={0}
            metalness={0.2}
            transmission={0.5}
            thickness={0.5}
            envMapIntensity={2}
            toneMapped={false}
          />
        </Sphere>
      </mesh>
      
      {/* Additional decorative element */}
      <mesh position={[-2.5, -4, 0.3]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 2, 0.1]} />
        <meshPhysicalMaterial
          color="#40E0D0"
          emissive="#40E0D0"
          emissiveIntensity={1}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

const EclipseLight = ({ scroll }: { scroll: number }) => {
  const lightRef = useRef<PointLight>(null!);
  const secondaryLightRef = useRef<PointLight>(null!);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = MathUtils.lerp(lightRef.current.intensity, Math.min(scroll / 0.1, 1) * 50, 0.1);
    }
    if (secondaryLightRef.current) {
      secondaryLightRef.current.intensity = MathUtils.lerp(secondaryLightRef.current.intensity, Math.min(scroll / 0.1, 1) * 20, 0.1);
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 0, 5]}
        color="#40E0D0"
        distance={20}
        intensity={30}
      />
      <pointLight
        ref={secondaryLightRef}
        position={[5, 5, 5]}
        color="#20B2AA"
        distance={15}
        intensity={10}
      />
    </>
  );
};

const Card3D = ({ scroll }: Card3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        orthographic
        camera={{ zoom: 40, position: [0, 0, 100] }}
        gl={{ antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, 10, 10]} intensity={0.5} color="#40E0D0" />
        <CardModel scroll={scroll} />
        <EclipseLight scroll={scroll} />
      </Canvas>
    </div>
  );
};

export default Card3D;
