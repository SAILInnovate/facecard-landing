import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Stars } from '@react-three/drei';
import { MathUtils, PointLight, Color } from 'three';

// --- This component is PURE React Three Fiber ---
interface CardModelProps {
  scroll: number;
}

const Monolith = ({ scroll }: CardModelProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // --- Animation Calculations ---
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 5);

    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.5;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);
    
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.cos(time * 0.7) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <RoundedBox args={[7.5, 12, 0.5]} radius={0.25}>
        <meshStandardMaterial color="#222831" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Inset Panel */}
      <RoundedBox args={[7, 11.5, 0.2]} radius={0.2} position-z={0.2}>
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* --- The NEW Energy Core --- */}
      {/* A thin, recessed, glowing line */}
      <mesh position={[0, 4, 0.31]}>
        <boxGeometry args={[2.5, 0.1, 0.1]} />
        <meshBasicMaterial color="#40E0D0" toneMapped={false} />
      </mesh>
    </group>
  );
};

const Effects = ({ scroll }: { scroll: number }) => {
    const lightRef = useRef<PointLight>(null!);

    // Animate the eclipse light
    useFrame(() => {
        if (lightRef.current) {
            lightRef.current.intensity = MathUtils.lerp(lightRef.current.intensity, Math.min(scroll / 0.1, 1) * 50, 0.1);
        }
    });

    return (
        <>
            {/* The Eclipse Light */}
            <pointLight ref={lightRef} position={[0, 0, 5]} color="#40E0D0" distance={20} />
            
            {/* The "Hopeful" God Rays */}
            <motion.group animate={{ y: [10, -10], opacity: [0, 0.5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <rectAreaLight
                    width={10}
                    height={30}
                    intensity={Math.min(scroll / 0.12, 1) * 3}
                    color="#20B2AA"
                    position={[0, 0, 10]}
                    rotation-z={-Math.PI / 4}
                />
            </motion.group>
        </>
    );
};

interface Card3DProps {
  scroll: number;
  mouse: { x: number, y: number };
}

const Card3D = ({ scroll, mouse }: Card3DProps) => {
  const sceneRef = useRef<THREE.Group>(null!);

  // Mouse parallax effect
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
        
        {/* The Starfield from @react-three/drei */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <group ref={sceneRef}>
            <Monolith scroll={scroll} />
            <Effects scroll={scroll} />
        </group>
      </Canvas>
    </div>
  );
};

export default Card3D;
