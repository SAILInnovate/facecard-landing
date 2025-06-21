import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
// THIS IS THE CORRECTED IMPORT. We get 'motion' from the main package.
import { motion, useScroll, useTransform } from 'framer-motion';

import cardTextureUrl from '../assets/facecard-texture.jpg';

const CardModel = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(cardTextureUrl);
  const { scrollYProgress } = useScroll();
  
  const rotationY = useTransform(scrollYProgress, [0, 0.15], [Math.PI / 2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [2.5, 1]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
      meshRef.current.position.y = Math.cos(time * 0.7) * 0.1;
    }
  });

  return (
    // We use motion.mesh, which Framer Motion provides for 3D objects.
    <motion.mesh
      ref={meshRef}
      rotation-y={rotationY}
      scale={scale}
    >
      <planeGeometry args={[7.5, 12]} />
      <meshStandardMaterial map={texture} metalness={0.6} roughness={0.3} />
    </motion.mesh>
  );
};

const EclipseLight = () => {
    const { scrollYProgress } = useScroll();
    const intensity = useTransform(scrollYProgress, [0.01, 0.1], [0, 25]);
    const scale = useTransform(scrollYProgress, [0, 0.1], [0.5, 5]);

    return (
        // motion.pointLight for animating the light source.
        <motion.pointLight 
            position={[0, 0, -2]} 
            color="#40E0D0" 
            distance={10}
            intensity={intensity}
            scale={scale}
        />
    );
};

const Card3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <CardModel />
        <EclipseLight />

      </Canvas>
    </div>
  );
};

export default Card3D;
