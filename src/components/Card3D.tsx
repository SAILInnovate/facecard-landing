import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
// 1. Import MathUtils from the core 'three' library
import { MathUtils } from 'three';

import cardTextureUrl from '../assets/facecard-texture.jpg';

// This component now takes a simple 'scroll' number as a prop
interface CardModelProps {
  scroll: number;
}

const CardModel = ({ scroll }: CardModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(cardTextureUrl);

  // useFrame is the core animation loop from react-three-fiber
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // --- We manually calculate the animations based on the scroll value ---
    
    // Eclipse Reveal: Rotate from edge-on to face-on
    const targetRotationY = (1 - Math.min(scroll / 0.15, 1)) * (Math.PI / 2);
    // 2. Use the correctly imported MathUtils.lerp
    meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, delta * 5);

    // Scale from close-up to normal
    const targetScale = 1 + (1 - Math.min(scroll / 0.15, 1)) * 1.5;
    meshRef.current.scale.set(targetScale, targetScale, targetScale);

    // Subtle float animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.cos(time * 0.7) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[7.5, 12]} />
      <meshStandardMaterial map={texture} metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

// The props for the main component
interface Card3DProps {
  scroll: number;
}

const Card3D = ({ scroll }: Card3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        {/* The Eclipse light is also animated manually */}
        <pointLight
            position={[0, 0, -2]} 
            color="#40E0D0" 
            distance={10}
            intensity={Math.min(scroll / 0.1, 1) * 25}
        />
        <CardModel scroll={scroll} />
      </Canvas>
    </div>
  );
};

export default Card3D;
