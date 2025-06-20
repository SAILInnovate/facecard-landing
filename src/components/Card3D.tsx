import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { motion } from 'framer-motion'; 
import { useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';

import cardTextureUrl from '../assets/facecard-texture.jpg';
import { useWindowSize } from '../hooks/useWindowSize';

interface MouseProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

interface Card3DProps {
  scrollYProgress: MotionValue<number>;
  mouse: MouseProps;
}

// --- COMPONENT 1: The 3D Scene ---
const CardModel = ({ scrollYProgress, mouse }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(cardTextureUrl);
  const { width, height } = useWindowSize();

  // Apply mouse rotation on every frame update
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mouse.x.get() * 0.4;
      meshRef.current.rotation.x = -mouse.y.get() * 0.2;
    }
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.8, 0.9], [1, 1.2, 1, 1, 1.2]);
  const rotationX = useTransform(scrollYProgress, [0, 0.2], [Math.PI / 2, 0]);
  const positionX = useTransform(scrollYProgress, [0.3, 0.8, 0.9], [width > 768 ? width / 4 : 0, width > 768 ? width / 4 : 0, 0]);
  const positionY = useTransform(scrollYProgress, [0.3, 0.8], [height > 768 ? height / 4 : 0, height > 768 ? height / 4 : 0]);

  return (
    <motion.mesh
      ref={meshRef}
      scale={scale}
      rotation-x={rotationX}
      position-x={positionX}
      position-y={positionY}
    >
      <planeGeometry args={[7.5, 12]} />
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} />
    </motion.mesh>
  );
};

// --- COMPONENT 2: The Main Wrapper ---
const Card3D = ({ scrollYProgress, mouse }: Card3DProps) => {
  return (
    // The div no longer needs event handlers
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#40E0D0" />
        
        <CardModel scrollYProgress={scrollYProgress} mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default Card3D;
