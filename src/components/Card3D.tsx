import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';

const CardModel = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/facecard-texture.jpg');

  // Interactive mouse-based tilt
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
  
  // Animate based on scroll
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -mouse.y.get() * 0.2;
      meshRef.current.rotation.y = mouse.x.get() * 0.4;
    }
  });

  // Use framer-motion's motion component for three.js objects
  const MotionMesh = motion.mesh;

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#40E0D0" />
        
        <MotionMesh
          ref={meshRef}
          scale={useTransform(scrollYProgress, [0, 0.2, 0.3, 0.8, 0.9], [0, 1.2, 1, 1, 1.2])}
          rotation-x={useTransform(scrollYProgress, [0, 0.2], [Math.PI / 2, 0])}
          position-x={useTransform(scrollYProgress, [0.3, 0.8, 0.9], [window.innerWidth / 4, window.innerWidth / 4, 0])}
          position-y={useTransform(scrollYProgress, [0.3, 0.8], [window.innerHeight / 4, window.innerHeight / 4])}
        >
          <planeGeometry args={[7.5, 12]} /> {/* Vertical card ratio */}
          <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} />
        </MotionMesh>
      </Canvas>
    </div>
  );
};

export default CardModel;