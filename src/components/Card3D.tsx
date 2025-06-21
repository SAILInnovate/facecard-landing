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

const CardModel = ({ scrollYProgress, mouse }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(cardTextureUrl);
  const { width, height } = useWindowSize();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = mouse.x.get() * 0.4;
      meshRef.current.rotation.x = -mouse.y.get() * 0.2;
    }
  });

  const scale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.8], [1, 1.2, 1, 1]);
  const rotationX = useTransform(scrollYProgress, [0, 0.1], [0, -Math.PI / 12]);
  const positionX = useTransform(scrollYProgress, [0.3, 0.8], [0, width > 768 ? width / 4.5 : 0]);
  const positionY = useTransform(scrollYProgress, [0.3, 0.8], [0, height > 768 ? height / 4.5 : 0]);
  
  // --- THIS IS THE FIX ---
  // The opacity now starts at 1, making the card visible on load.
  // It fades out at the end of the scroll.
  const opacity = useTransform(scrollYProgress, [0, 0.8, 0.9], [1, 1, 0]);

  return (
    <motion.mesh
      ref={meshRef}
      scale={scale}
      rotation-x={rotationX}
      position-x={positionX}
      position-y={positionY}
      opacity={opacity}
    >
      <planeGeometry args={[7.5, 12]} />
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} transparent />
    </motion.mesh>
  );
};

const Card3D = ({ scrollYProgress, mouse }: Card3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, 5]} intensity={0.5} color="#40E0D0" />
        
        <CardModel scrollYProgress={scrollYProgress} mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default Card3D;
