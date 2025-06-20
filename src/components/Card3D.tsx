import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { motion } from 'framer-motion'; 
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';

import cardTextureUrl from '../assets/facecard-texture.jpg';

// Import our new safe hook
import { useWindowSize } from '../hooks/useWindowSize';

// --- COMPONENT 1: The 3D Scene ---
const CardModel = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(cardTextureUrl);
  
  // Safely get window dimensions using our hook
  const { width, height } = useWindowSize();

  // Now, use these safe dimensions in the transforms
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.8, 0.9], [0, 1.2, 1, 1, 1.2]);
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
const Card3D = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const mouse = {
    x: useSpring(useMotionValue(0)),
    y: useSpring(useMotionValue(0)),
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouse.x.set(x);
    mouse.y.set(y);
  };

  const handleMouseLeave = () => {
    mouse.x.set(0);
    mouse.y.set(0);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#40E0D0" />
        
        <CardModel scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
};

export default Card3D;